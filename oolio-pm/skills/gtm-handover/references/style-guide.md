# Oolio GTM Pack - Brand & Style Guidelines

> "Clarity of a boardroom. Craft of a product reveal."

These rules are enforced, not suggested. Treat any exception as a bug.

## 1. The standard

- **Why.** Operators make fast decisions under pressure. They need truth, not theatre.
- **How.** Strip to essentials. Show the work. Make the experience feel considered.
- **What.** Every pack uses the same six artefacts, built from one source, expressed with consistent design, language, and structure.

## 2. The blend - "McKinsey x Apple" in practice

| Principle | Consulting clarity | Product craft | Oolio rule |
|---|---|---|---|
| Structure | Pyramid, one idea per page | Narrative flow, reveal | Title is the answer. Page proves it. |
| Language | Precise, quantified | Human, direct | Numbers first. Plain words. |
| Visuals | Charts, tables | Space, restraint | Fewer elements. Larger impact. |
| Credibility | Sources, logic | Demonstration | Show data or show product. Prefer both. |
| Pace | Scannable | Memorable | 5 to 7 seconds to grasp a page. |

## 3. Slide system

### 3.1 Page anatomy

Every slide follows this order.

1. **Title** is the answer. Example. "Reduce order entry time by 27% in peak hour."
2. **Sub-line** (optional, one line). Context or constraint.
3. **Body** is proof. Chart, product UI, or 3 bullets max.
4. **Footnote** is source or [TBC].

If a slide needs more, split it.

### 3.2 Allowed slide types (use only these)

- **Insight.** One chart, one takeaway.
- **Before / After.** Left problem, right outcome, same scale.
- **Product reveal.** Clean UI shot, one label, no callout clutter.
- **Process.** 3 steps max, horizontal.
- **Proof.** Metric, customer quote, or usage stat.
- **Decision.** Options, trade-offs, recommendation.

## 4. Typography

- One font family only.
- Two weights max.
- Title large and dominant. Body readable at distance.
- No italics for emphasis. Use space and weight.

Test. Read from 2 metres. If it fails, it's wrong.

## 5. Colour

- Primary `#673AB6`. Dark `#5E35B1`. Light `#F9F8FC`.
- White first, colour second.
- One accent per slide.
- Charts use neutral greys plus one highlight.
- No gradients. No decorative colour blocks.

## 6. Layout

- 12-column grid mindset.
- Generous margins.
- Left align everything except covers.
- Density rule. If it feels full, remove one element.

## 7. Data and charts

- Bars over lines unless trend matters.
- Label directly, avoid legends.
- Round numbers, no false precision.
- Always answer "so what".
- Bad. "Orders increased." Good. "Orders +18% after menu restructure."

## 8. Product imagery

- Real UI only, no mockups.
- Crop tight, remove browser chrome unless needed.
- Highlight one action, not the whole screen.
- Pair with outcome, not feature.

## 9. Language - how voice shows up in slides

Titles state the outcome and include a number if possible.

Bullets, max 3 per slide, each 8 words or fewer, start with a verb or metric.

Banned. Leverage, seamless, powerful, robust, any filler. Replace with exact action and exact result.

## 10. Narrative arc (deck level)

Use this every time.

1. Set the scene. What operators deal with daily.
2. Define the problem. Cost of current behaviour.
3. Show the shift. What changes and why now.
4. Reveal the product. Simple, controlled.
5. Prove it. Data, usage, example.
6. Make it easy to act. How to buy or adopt.

## 11. The one-idea-per-slide test

Before finalising.

- Can a rep say this slide in one sentence?
- Would an operator understand it in 5 seconds?
- Is there a number or proof?

If any answer is no, rewrite.

## 12. Common failure modes

| Problem | Fix |
|---|---|
| Slide feels busy | Remove 30% of content. |
| Reads like marketing | Add a number or remove the line. |
| Too many ideas | Split into two slides. |
| Looks generic | Replace icons with real UI or data. |
| No clear takeaway | Rewrite the title as the answer. |

## 13. QA checklist (must pass before build)

- No em dashes or semicolons.
- British English throughout.
- No `[ ]` except `[TBC]`.
- Titles are outcomes, not topics.
- Each slide has one idea.
- At least 30% of slides show product or data.
- No slide exceeds 3 bullets.
- Colours follow rules exactly.

## 14. How to use this

- Apply at Phase 4 (deck round) first. Everything else inherits from it.
- Validate during Phase 6 visual check using the QA list.
- Treat any exception as a bug, not a preference.

## 15. KPIs

- Time to understand first 5 slides.
- Sales reuse rate of the deck.
- Conversion from demo to next step.
- Internal rework cycles per pack.
- Percent of slides with quantified claims.

## 16. Recommendation - lock into the system

- Bake slide types into the templates.
- Enforce title patterns in `pack_content.json`. Each deck slide has a `title` field that states an outcome.
- Add automated QA checks for bullet count, banned words, missing numbers, slide-type whitelist, and product-or-data percentage.
- Train once, then rely on the system.
