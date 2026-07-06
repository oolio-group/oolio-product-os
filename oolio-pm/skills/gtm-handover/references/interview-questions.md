# Interview Questions, by Round

Six rounds. Each round opens with a recap of what's already known from ingest, then asks only about gaps. Use `AskUserQuestion` for choices and short structured open prompts. Use plain message replies for the longer narrative answers.

The phrasing below is a starting point. Adapt it to what you've already learned from ingest. Don't ask a question whose answer is sitting in the Confluence page you just read.

Voice. Every question, every framing, every recap follows `references/voice-rules.md`. No em dashes. No hedging. Direct, specific, calm.

---

## Round 1. Supporting Deck

The deck is the source of truth. It feeds the one-pager and shapes every other artifact. Get this right and the rest is fast.

Open with. "Let's start with the deck. From ingest I have [X, Y, Z]. I need answers on [N gaps]. Let's go through them in 5 minutes."

**The operator problem (slide 3)**

- "In 1 to 2 sentences, in your operator's actual words, what's the pain we're solving? Quote them, don't paraphrase."
- "Three pieces of context that frame why this matters now. Each one a sentence, ideally with a number or named segment."

**Our point of view (slide 4)**

- "What's the big idea. The one sentence your team should be able to repeat verbatim about why we built this."
- "Sixty to one hundred words of supporting paragraph. Operator framing, not technology framing. Derive from the company-level Oolio narrative if one exists."

**Who it's for (slide 5)**, use `AskUserQuestion`.

- Target segments, top 3. QSR, Casual Dining, Pubs & Hotels, Pizza or Delivery-first, Enterprise multi-site, Other.
- Buyer personas. Owner or Operator, Operations Manager, Finance or GM, IT lead, Other.
- For each picked segment and persona, one sentence on what they care about and what they fear.

**What we built (slide 6)**

- "Three to four core capabilities. For each, a 2 to 4 word name and a 1 to 2 sentence description. Operator outcomes, not technical features."

**Why it works (slide 7)**

- "Three rows of pain, feature, outcome, business impact. Pain in operator words. Outcome ideally measurable. Impact in revenue, cost, retention or risk terms."

**Where we win (slide 8)**

- "Where do we compete. Categories and named players we go up against."
- "Where do we win. The 3 reasons buyers in our ICP pick us. Honest, not aspirational."
- "Where will we deliberately not play. Be specific. This saves Sales cycles."

**Proof (slide 9)**

- "Three big stat callouts. Each one a number plus a 6 to 10 word headline. `[TBC]` is fine if proof isn't ready yet."
- "Two case study previews. Customer name plus segment plus a 2 sentence story. Starting state, what changed, measurable result."

**How to buy (slide 10)**

- "For each of the 5 standard steps (Discovery, Demo, Contract, Onboarding, Go Live), what happens, who's involved, expected duration."

**Summary (slide 11)**

- "Three sentences that sum it up. Headline outcome, headline proof, call to action."
- "Three next-step actions with owner and date."

**Back cover (slide 12)**

- "The product promise in 8 words."
- "Three contacts. PM, Account Director, GTM partner. Names and emails."

Save round to `pack_content.json` immediately. Confirm with user before moving on.

---

## Round 2. One-Pager

Most of this is a curation pass on the deck. Open with. "Most of the one-pager is distilled from the deck. Confirm or tweak the four blocks."

- Tagline, 8 to 14 words. Defaults to the back cover promise. Confirm.
- What is it. Defaults to a 1-sentence version of the POV. Confirm.
- Who is it for. Defaults to "1 segment and 1 persona". Pick the most important one via `AskUserQuestion`.
- The problem. 1 to 2 sentences from the deck quote. Confirm.
- The outcome. The strongest stat from the deck Proof slide. Confirm.
- The proof point. The quotable result. Confirm.

Round target. 2 minutes. Don't reopen deck conversations.

---

## Round 3. Sales Playbook

Open with. "Now Sales. Same product, different audience. Internal AEs, not external operators."

**Discovery questions**

- "5 to 8 questions, broad to specific. From operating context, to pain, to scale, to what they've tried, to budget or timing."

**Qualification matrix**, for each of the 5 standard criteria (Segment, Venue size, Tech stack, Pain severity, Decision authority), 1 sentence each on what good looks like and what disqualifies.

**Demo flow**

- "5 demo steps. Set the scene 2 min, Moment of value 5 min, Core flow 10 min, Integration story 5 min, Land the close 3 min. For each, what to show and what to say."

**Objection handling**

- "The 5 objections AEs will hear most. For each, acknowledge then respond then prove. No more than 4 sentences per objection."

**Pricing**

- "Package summaries. Name, who it's for, what's included, headline price."
- "Discounting authority. AE level, manager level, VP level."
- "Source-of-truth link to canonical pricing page or sheet."

**Close**

- "Close motion. How we close. Common stalls, how to unstick them."
- "Handover checklist. 5 things that must happen between contract signed and onboarding kickoff."

---

## Round 4. Account Management Playbook

Open with. "Now AM. Focus on the 90-days-and-beyond view of this product."

- Healthy at 90 days. "One sentence. At 90 days post go-live, a healthy account looks like this."
- Adoption signals. "5 features. For each, healthy signal (observable behaviour or metric) and red flag (with a threshold)."
- Expansion triggers. "4 triggers in the customer that signal readiness for the next Oolio product. For each, trigger, suggested next product, talk track in 3 sentences (observation, value, ask)."
- Renewal timeline. "T-12, -9, -6, -3 months. What happens, who runs it. Plus required artifacts (value summary, renewal proposal, expansion proposal if applicable)."
- At-risk. "Trigger criteria, 4 of them. Recovery sequence, 4 steps with timeframes."
- QBR sections. Defaults to the standard 6 (recap, metrics, wins/learnings, roadmap, next quarter goals, actions). Confirm or modify.

---

## Round 5. Onboarding Playbook

Open with. "Onboarding. The artifact most likely to make or break the relationship in week 1."

- Definition of done. "3 to 5 observable end states. Tie each to a metric or behaviour."
- Configuration checklist. "Every setting that must be touched before go-live. For each, step description, owner (Onboarding lead, customer admin, or PS), day in the plan."
- Data migration. In-scope data domains, mapping decisions, validation steps.
- Training. Manager training topics, plus frontline training topics, plus materials provided.
- Go-live. T-24h pre-flight (4 items), T-0 cutover (3 items with owners), T+24h post-live (3 items).
- First-week health check. 5 checks with pass criteria and fail action.
- Handover to AM. 3 steps.

---

## Round 6. Marketing Pack

Open with. "Last round. Marketing assets, derived mostly from the deck."

- Tier, via `AskUserQuestion`. Tier 1, 2, or 3. Tier controls how much of this round we do.

For Tier 1 and 2.

- LinkedIn long-form, 200 to 300 words. Hook, pain, what we built, proof, CTA. Posted from a named leader.
- LinkedIn short-form, under 80 words. Headline, 2 lines, link. Posted from company page.
- Partner channel announcement. Plain text, no Oolio jargon. What changes for partners.
- Three to five social posts. Each 30 to 50 words, tied to one operator pain or moment, with a visual concept named.
- Prospect email sequence, 3 emails (Problem, Story, Offer). Subject, pre-header, body, CTA.
- Customer email sequence, 2 emails (What's new, How to get the value).
- Sales enablement note. Under 150 words. The thing AEs pin in Slack.

For Tier 1 only.

- Campaign brief. Name, objective, audience, headline message, channels, budget, dates, success metric, owner.

For Tier 3.

- Customer emails and the enablement note only.

---

## Closing the interview

After Round 6, save `pack_content.json` once more and confirm with the user.

> "All six rounds done. I have N answers and M sections marked [TBC]. Ready to build the files?"

If anything feels rushed, offer to revisit a round before building.
