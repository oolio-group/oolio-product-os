# Product context briefs

One brief per Oolio product or major product surface, giving skills the product facts they are allowed to rely on. `write-prd`, the GTM skills, and the councils read from here; the no-fabrication rule means a skill that lacks a brief must flag the gap rather than invent product facts.

## Rules

- One file per product, kebab-case (`oolio-one.md`, `oolio-pay.md`, `leo1.md`).
- Follow `_template.md`. Every factual claim in a brief must be true at the date stamped in its header; briefs carry a **Last reviewed** date and go stale honestly.
- Facts only. Positioning and narrative live in the GTM pack for the product; personas live in `personas-library/`; company-level context lives in `personas-library/_framework/oolio-context.md`. A brief is the product-level layer between those.
- This folder ships in a public repo. No revenue figures, roadmaps, unreleased-feature detail, or customer names beyond what Oolio states publicly.
- Briefs are written or verified by the product owner. Skills may draft one from connected sources (Confluence, Jira), but it is not usable until a human confirms it.

## Current briefs

None yet. The folder was scaffolded in v0.7.0; briefs are added as product owners supply them. Known candidates: Oolio One, Oolio Pay, swiftpos, Leo1 (flagged by Niel, no source material in the system yet).
