# Content Schema

The shape of `pack_content.json`. This is the single source of truth for one product's GTM pack. The build script reads this file and produces all six output files from it.

Anything not present in this file is not in the pack. Anything in this file but not used by any template is a code smell. Either add a template section that uses it, or remove it.

---

## Top-level shape

```json
{
  "product": { ... },
  "one_pager": { ... },
  "deck": { ... },
  "sales": { ... },
  "am": { ... },
  "onboarding": { ... },
  "marketing": { ... }
}
```

---

## product

Shared metadata used in every file's header, footer, and metadata block.

```json
{
  "name": "Product Report",
  "tagline_long": "One sentence used on the deck cover. Up to ~20 words.",
  "owner_pm": { "name": "Nga Thuy Nguyen", "email": "..." },
  "gtm_partner": { "name": "Niel Cody", "email": "..." },
  "version": "v1.0",
  "last_reviewed": "2026-05-15",
  "anchor_jira_epic": "OR-2417",
  "linked_confluence": "https://oolio.atlassian.net/wiki/spaces/in/pages/..."
}
```

## one_pager

```json
{
  "tagline": "8 to 14 words.",
  "what": "One sentence definition.",
  "who": "ICP segment + persona.",
  "problem": "Operator pain in their words.",
  "outcome": "Headline metric or qualitative win.",
  "proof": "One quotable result with customer name or number, or [TBC]."
}
```

## deck

```json
{
  "problem": {
    "quote": "1 to 2 sentences in operator words.",
    "context_bullets": ["Bullet 1", "Bullet 2", "Bullet 3"]
  },
  "pov": {
    "big_idea": "One repeatable sentence (12 to 18 words).",
    "supporting": "60 to 100 words. Operator framing."
  },
  "icp": {
    "segments": [
      { "name": "QSR", "detail": "who, how many, why now" },
      { "name": "...", "detail": "..." },
      { "name": "...", "detail": "..." }
    ],
    "personas": [
      { "name": "Owner / Operator", "detail": "what they care about, what they fear" },
      { "name": "...", "detail": "..." },
      { "name": "...", "detail": "..." }
    ]
  },
  "capabilities": [
    { "name": "Capability name (2-4 words)", "description": "1 to 2 sentences, operator framing." },
    { "name": "...", "description": "..." }
  ],
  "value_prop": [
    { "pain": "...", "feature": "...", "outcome": "...", "impact": "..." },
    { "pain": "...", "feature": "...", "outcome": "...", "impact": "..." },
    { "pain": "...", "feature": "...", "outcome": "...", "impact": "..." }
  ],
  "competitive": {
    "where_we_compete": "Categories and named players.",
    "where_we_win": "3 reasons buyers in our ICP pick us.",
    "where_we_dont": "Segments and use cases we deliberately do not chase."
  },
  "proof": {
    "stats": [
      { "value": "32%", "label": "Headline metric description (6 to 10 words)." },
      { "value": "[TBC]", "label": "..." },
      { "value": "...", "label": "..." }
    ],
    "case_studies": [
      { "customer": "Customer name and segment", "story": "2 sentence story." },
      { "customer": "...", "story": "..." }
    ]
  },
  "buy_steps": [
    { "name": "DISCOVERY",  "description": "What happens, who is involved, expected duration." },
    { "name": "DEMO",       "description": "..." },
    { "name": "CONTRACT",   "description": "..." },
    { "name": "ONBOARDING", "description": "..." },
    { "name": "GO LIVE",    "description": "..." }
  ],
  "summary": {
    "takeaway": "Three sentences max.",
    "next_steps": [
      { "action": "...", "owner": "...", "due": "..." },
      { "action": "...", "owner": "...", "due": "..." },
      { "action": "...", "owner": "...", "due": "..." }
    ]
  },
  "back_cover": {
    "promise": "Product promise in 8 words.",
    "contacts": [
      { "role": "Product Manager", "name": "...", "email": "..." },
      { "role": "Account Director", "name": "...", "email": "..." },
      { "role": "GTM partner", "name": "...", "email": "..." }
    ]
  }
}
```

## sales

```json
{
  "summary": "4 to 6 sentences for an internal Sales rep.",
  "discovery_questions": ["Q1", "Q2", "Q3", "Q4", "Q5"],
  "qualification": [
    { "criterion": "Segment", "qualified_in": "...", "qualified_out": "..." },
    { "criterion": "Venue size", "qualified_in": "...", "qualified_out": "..." },
    { "criterion": "Tech stack", "qualified_in": "...", "qualified_out": "..." },
    { "criterion": "Pain severity", "qualified_in": "...", "qualified_out": "..." },
    { "criterion": "Decision authority", "qualified_in": "...", "qualified_out": "..." }
  ],
  "demo_steps": [
    { "step": "Set the scene", "minutes": 2, "what_to_show": "...", "talk_track": "..." },
    { "step": "Moment of value", "minutes": 5, "what_to_show": "...", "talk_track": "..." },
    { "step": "Core flow", "minutes": 10, "what_to_show": "...", "talk_track": "..." },
    { "step": "Integration story", "minutes": 5, "what_to_show": "...", "talk_track": "..." },
    { "step": "Land the close", "minutes": 3, "what_to_show": "...", "talk_track": "..." }
  ],
  "objections": [
    { "objection": "...", "response": "Acknowledge → respond → prove. Up to 4 sentences." }
  ],
  "pricing": {
    "packages": [
      { "name": "...", "for": "...", "includes": "...", "headline_price": "..." }
    ],
    "discount_authority": "AE up to X%, Manager up to X%, beyond requires VP.",
    "source_of_truth": "https://..."
  },
  "close_motion": "How we close. Common stalls and how to unstick them.",
  "handover_checklist": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
}
```

## am

```json
{
  "summary": "From the deck cover, repurposed for AMs.",
  "healthy_at_90d": "At 90 days post go-live, a healthy account looks like this.",
  "adoption_signals": [
    { "feature": "...", "healthy": "...", "red_flag": "..." }
  ],
  "expansion_triggers": [
    { "trigger": "...", "next_product": "...", "talk_track": "Observation, value, ask in 3 sentences." }
  ],
  "renewal_timeline": [
    { "checkpoint": "T-12 months", "action": "QBR documents value to date." },
    { "checkpoint": "T-9 months", "action": "..." },
    { "checkpoint": "T-6 months", "action": "..." },
    { "checkpoint": "T-3 months", "action": "..." }
  ],
  "renewal_artifacts": ["Value delivered summary", "Renewal proposal", "Expansion proposal if applicable"],
  "at_risk_triggers": ["...", "...", "...", "..."],
  "recovery_sequence": [
    { "step": "Within 48 hours", "action": "..." },
    { "step": "Within 1 week", "action": "..." },
    { "step": "Weekly check-ins for 30 days", "action": "..." },
    { "step": "Day 30 status check", "action": "..." }
  ],
  "qbr_sections": [
    "Recap of last quarter goals",
    "Adoption and outcome metrics",
    "Wins, learnings and friction points",
    "Roadmap preview tied to their goals",
    "Goals for next quarter, agreed in the room",
    "Open actions and owners"
  ]
}
```

## onboarding

```json
{
  "definition_of_done": ["End state 1", "End state 2", "End state 3"],
  "config_checklist": [
    { "step": "...", "owner": "Onboarding lead", "due": "Day 3" }
  ],
  "migration": {
    "in_scope": [
      { "domain": "...", "source": "...", "record_count": "...", "owner": "..." }
    ],
    "mapping_decisions": "Where source schema does not match Oolio schema, the rule is...",
    "validation": ["Spot-check", "Reconcile counts", "Customer sign-off on sample"]
  },
  "training": {
    "manager": ["Topic 1", "Topic 2", "Topic 3"],
    "frontline": ["Topic 1", "Topic 2"],
    "materials": ["Quick reference card", "Video walkthroughs", "Help Centre articles"]
  },
  "golive": {
    "preflight": ["Item 1", "Item 2", "Item 3", "Item 4"],
    "cutover": [
      { "step": "...", "owner": "...", "eta": "..." }
    ],
    "postlive": ["Item 1", "Item 2", "Item 3"]
  },
  "healthcheck": [
    { "check": "Throughput / volume", "pass": "...", "fail_action": "..." },
    { "check": "Error rate", "pass": "...", "fail_action": "..." },
    { "check": "Staff confidence", "pass": "...", "fail_action": "..." },
    { "check": "Customer feedback", "pass": "...", "fail_action": "..." },
    { "check": "Open tickets", "pass": "...", "fail_action": "..." }
  ],
  "handover": [
    "Onboarding lead writes 1-page handover with X, Y, Z.",
    "15 minute handover call with AM.",
    "AM books first 30-day check-in within 1 week."
  ]
}
```

## marketing

```json
{
  "tier": 1,
  "launch": {
    "linkedin_long": "200 to 300 words. Hook, pain, what, proof, CTA.",
    "linkedin_short": "Under 80 words. Headline + 2 lines + link.",
    "partner_channel": "Plain text for partner newsletters."
  },
  "social_posts": [
    { "body": "30 to 50 words.", "visual": "Visual concept." }
  ],
  "emails": {
    "prospect": [
      { "subject": "Q-style subject line.", "preheader": "...", "body": "80 to 120 words.", "cta": "Specific single CTA." }
    ],
    "customer": [
      { "subject": "...", "preheader": "...", "body": "Framed as 'what is new for you'.", "cta": "..." }
    ]
  },
  "enablement_note": "Under 150 words. The thing that gets pinned in Slack.",
  "campaign_brief": {
    "name": "...",
    "objective": "Awareness / demand / adoption / retention.",
    "audience": "ICP segment, persona, geography.",
    "headline_message": "One sentence the audience should remember.",
    "channels": ["LinkedIn", "partner", "email"],
    "budget": "AUD with split.",
    "run_dates": "Start to end.",
    "success_metric": "Single primary metric and target.",
    "owner": "Marketing lead."
  }
}
```

---

## Conventions

- **`[TBC]`** is a valid value anywhere a string is expected. The build script renders it in muted text in the output. Use it when the answer is genuinely unknown rather than papering over the gap.
- **`[GAP]`** is for internal use during the interview phase only. It should not exist in `pack_content.json` once Phase 4 of the workflow is complete.
- Strings should follow Oolio writing style. No em dashes, no semicolons, limit colons and parentheses, no hedging.
- Don't add fields the templates don't render. They will silently disappear and you will wonder where your work went.
