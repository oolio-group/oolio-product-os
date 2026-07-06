#!/usr/bin/env python3
"""
QA validator for an Oolio GTM pack's pack_content.json.

Runs the rules in references/style-guide.md section 13 plus the voice rules.
Errors fail the build. Warnings are flagged but don't block.

Usage:
    python3 qa_check.py <path to pack_content.json>

Exit codes.
    0  All checks pass.
    1  One or more errors found.
    2  Argument or file error.
"""

import json
import os
import re
import sys


# ---- Hard rules ----

BANNED_WORDS = [
    r"\bleverage\b",
    r"\bsynergy\b",
    r"\bgame[-\s]?changing\b",
    r"\brobust\b",
    r"\bseamless\b",
    r"\bholistic\b",
    r"\butilise\b",
    r"\butilize\b",
    r"\bhowever\b",
    r"\bpotentially\b",
    r"\bpowerful\b",
]

# US spellings worth catching. British English is a rule.
US_SPELLINGS = {
    r"\boptimize\b": "optimise",
    r"\boptimization\b": "optimisation",
    r"\bprioritize\b": "prioritise",
    r"\borganize\b": "organise",
    r"\borganization\b": "organisation",
    r"\brealize\b": "realise",
    r"\banalyze\b": "analyse",
    r"\bsummarize\b": "summarise",
    r"\bcolor\b": "colour",
    r"\bbehavior\b": "behaviour",
    r"\bcatalog\b": "catalogue",
    r"\bcenter\b": "centre",
    r"\bfavor\b": "favour",
    r"\blicense\b": "licence (noun)",
}

# Brackets allowed. [TBC] anywhere. [SCREENSHOT TBC] is allowed only inside
# deck.product_reveals[*].screenshot_path. Anything else is an error.
ALLOWED_BRACKET_VALUES = {"[TBC]"}
ALLOWED_BRACKETS_AT_PATH = {
    re.compile(r"^deck\.product_reveals\[\d+\]\.screenshot_path$"): {"[SCREENSHOT TBC]"},
}

# Required keys in each deck.slide_titles entry.
REQUIRED_TITLE_KEYS = {
    "problem", "pov", "icp",
    "product_performance", "menu_engineering", "modifier_analysis",
    "competitive", "proof", "buy_steps", "summary",
}


def walk_strings(node, path=""):
    """Yield (path, string) for every string-valued leaf in a JSON tree."""
    if isinstance(node, dict):
        for k, v in node.items():
            sub = f"{path}.{k}" if path else k
            yield from walk_strings(v, sub)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk_strings(v, f"{path}[{i}]")
    elif isinstance(node, str):
        yield path, node


def find_brackets(s):
    """Return any [bracketed] tokens in the string."""
    return re.findall(r"\[[^\]]+\]", s)


def has_em_dash(s):
    return "—" in s or "–" in s


def has_semicolon(s):
    return ";" in s


def check_pack(content):
    errors = []
    warnings = []

    # 1. Walk every string and check for banned words, em dashes, semicolons,
    # US spellings, and disallowed brackets.
    for path, s in walk_strings(content):
        if has_em_dash(s):
            errors.append(f"em-dash or en-dash at {path}")
        if has_semicolon(s):
            errors.append(f"semicolon at {path}")
        for pat in BANNED_WORDS:
            if re.search(pat, s, re.IGNORECASE):
                errors.append(f"banned word /{pat}/ at {path}")
        for pat, suggest in US_SPELLINGS.items():
            if re.search(pat, s, re.IGNORECASE):
                warnings.append(f"possible US spelling /{pat}/ at {path}, prefer {suggest}")
        for tok in find_brackets(s):
            allowed = tok in ALLOWED_BRACKET_VALUES
            if not allowed:
                for rgx, extra in ALLOWED_BRACKETS_AT_PATH.items():
                    if rgx.match(path) and tok in extra:
                        allowed = True
                        break
            if not allowed:
                errors.append(f"disallowed bracket token {tok} at {path}, only [TBC] is allowed (or [SCREENSHOT TBC] in product_reveals)")

    # 2. Slide titles must exist and follow rules.
    deck = content.get("deck") or {}
    slide_titles = deck.get("slide_titles") or {}
    for key in REQUIRED_TITLE_KEYS:
        if key not in slide_titles:
            errors.append(f"missing deck.slide_titles.{key}")
            continue
        block = slide_titles[key]
        title = (block or {}).get("title", "").strip()
        if not title:
            errors.append(f"empty deck.slide_titles.{key}.title")
            continue
        # Length check, titles should fit a slide.
        if len(title) > 90:
            warnings.append(f"deck.slide_titles.{key}.title is {len(title)} chars, aim under 90")
        # Number-in-title heuristic. Style guide says include a number where possible.
        # Soft warn for slides where a number is realistic.
        wants_number = key in {"problem", "proof", "buy_steps", "summary"}
        if wants_number and not re.search(r"\d", title):
            warnings.append(f"deck.slide_titles.{key}.title has no number, consider adding one")

    # 3. Product reveals must include all three view IDs.
    reveals = deck.get("product_reveals") or []
    reveal_ids = {(r or {}).get("id") for r in reveals}
    expected_reveal_ids = {"product_performance", "menu_engineering", "modifier_analysis"}
    missing = expected_reveal_ids - reveal_ids
    if missing:
        errors.append(f"deck.product_reveals missing entries for: {sorted(missing)}")
    for i, r in enumerate(reveals):
        if not (r or {}).get("outcome"):
            errors.append(f"deck.product_reveals[{i}].outcome is empty")
        if not (r or {}).get("screenshot_path"):
            errors.append(f"deck.product_reveals[{i}].screenshot_path is empty")

    # 4. Bullet count rule. context_bullets max 3.
    cb = ((deck.get("problem") or {}).get("context_bullets") or [])
    if len(cb) > 3:
        errors.append(f"deck.problem.context_bullets has {len(cb)} entries, max 3")

    # 5. Marketing campaign brief tier check. Tier 2 should not include real
    # campaign content, but Tier 1 must.
    marketing = content.get("marketing") or {}
    tier = marketing.get("tier", 2)
    cb = marketing.get("campaign_brief") or {}
    if tier == 1:
        for k in ("name", "objective", "audience", "headline_message"):
            if cb.get(k, "[TBC]") == "[TBC]":
                warnings.append(f"Tier 1 pack but marketing.campaign_brief.{k} is [TBC]")

    # 6. No [GAP] left anywhere.
    for path, s in walk_strings(content):
        if "[GAP]" in s:
            errors.append(f"[GAP] marker remains at {path}, replace with content or [TBC]")

    return errors, warnings


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 qa_check.py <path to pack_content.json>", file=sys.stderr)
        sys.exit(2)
    path = sys.argv[1]
    if not os.path.exists(path):
        print(f"ERROR: File not found: {path}", file=sys.stderr)
        sys.exit(2)
    with open(path, "r", encoding="utf-8") as f:
        content = json.load(f)
    errors, warnings = check_pack(content)

    if warnings:
        print(f"\n{len(warnings)} warning(s):")
        for w in warnings:
            print(f"  ! {w}")
    if errors:
        print(f"\n{len(errors)} error(s):")
        for e in errors:
            print(f"  X {e}")
        print("\nQA check failed. Fix errors before building.")
        sys.exit(1)
    print(f"\nQA check passed{' with warnings' if warnings else ''}.")
    sys.exit(0)


if __name__ == "__main__":
    main()
