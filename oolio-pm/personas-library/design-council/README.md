# The Design Council

A standing council of fourteen design and research experts, convened as **lenses** to attack every new piece of Oolio functionality before it ships. It spans both craft (UI) and behaviour (UX), so a feature is judged on how it looks and how it works.

These are not user personas. The `uat-panel/` library answers "who are we building for". The Council answers "is what we built any good, and how do we know". Each lens is a design philosophy, inspired by the published work of a real practitioner. Their job is to disagree with each other, on purpose, so that a feature is stress-tested from a dozen directions before a customer ever touches it.

The Council does not replace the hospitality personas. It sits **alongside** them. The hospitality personas tell you whether a feature fits the reality of a Friday night service. The Council tells you whether the design itself is sound. A feature has to survive both.

---

## Why this exists

The Oolio Product Handbook expects ideas to be validated against personas, customer need, usage data, voice of customer, and measurable outcomes, not opinion alone. The problem with internal review is that it collapses into taste. The loudest person, or the most senior person, wins. That is not validation, it is theatre.

A named panel of lenses fixes this. When a reviewer says "I do not like this", that is opinion. When a reviewer says "this fails the Norman lens because the user cannot tell what action is possible", that is a defensible, repeatable critique tied to an established body of work. The lens depersonalises the disagreement and raises the standard of the argument.

---

## The panel

| Lens | The persona | What they bring | File |
|---|---|---|---|
| Simplicity and craft | Jony Ive | Has the complexity been hidden, or just removed | [jony-ive.md](jony-ive.md) |
| Human cognition and affordance | Don Norman | Can the user tell what is possible, and recover from error | [don-norman.md](don-norman.md) |
| Usability heuristics | Jakob Nielsen | Can a first-time user finish the task, is system status visible | [jakob-nielsen.md](jakob-nielsen.md) |
| Goal-directed workflow | Alan Cooper | Have we designed for goals, or exposed the database | [alan-cooper.md](alan-cooper.md) |
| Research to requirements | Kim Goodwin | Is this grounded in observed behaviour, can engineering build it | [kim-goodwin.md](kim-goodwin.md) |
| Design at scale | Irene Au | Will this pattern hold across the whole product portfolio | [irene-au.md](irene-au.md) |
| Behavioural data | Julie Zhuo | What behaviour should change, how will we know it worked | [julie-zhuo.md](julie-zhuo.md) |
| Inclusion and exclusion | Kat Holmes | Who does this exclude, can a nervous new casual use it | [kat-holmes.md](kat-holmes.md) |
| Mobile, forms and speed | Luke Wroblewski | Does it work one-handed, is the form too long | [luke-wroblewski.md](luke-wroblewski.md) |
| Responsive and device fluidity | Ethan Marcotte | Does it hold across terminal, tablet, phone, kiosk, web | [ethan-marcotte.md](ethan-marcotte.md) |
| Research sceptic | Erika Hall | What are we assuming, what question does this actually test | [erika-hall.md](erika-hall.md) |
| Delight and trust | Aarron Walter | Does this feel trustworthy, are the error and empty states human | [aarron-walter.md](aarron-walter.md) |
| Data and evidence display | Edward Tufte | Does the ink show the data, honestly and in context | [edward-tufte.md](edward-tufte.md) |
| Human-centred AI and control | Ben Shneiderman | Is the automation comprehensible, predictable, under human control | [ben-shneiderman.md](ben-shneiderman.md) |

---

## The Behavioural Alchemist, a cross-cutting contextual lens

Beyond the fourteen, one more lens can be convened here: Roy, the Behavioural Alchemist (`../behavioural-alchemist.md`). He is elevated and cross-cutting, not a standing member of this council, but on the design surfaces where perception is the product he earns a contextual seat. Pull him in on loyalty and engagement mechanics, guest-facing kiosk and ordering flows, onboarding and empty states, anything where the felt experience, a wait, a moment of reassurance, a sense of status, matters as much as the task. He pairs with Aarron Walter on delight and trust, and argues with Norman and Nielsen about when friction is a fault and when it is the point. Do not convene him on a pure back-office reporting or configuration screen; there is no perceived-value angle to add.

---

## How to run a Design Council review

Do not run every feature through every lens. Fourteen lenses on one feature is theatre, and it produces a contradictory mess no squad can act on. Assign **three mandatory lenses** and **two contextual lenses** per feature. Five voices, chosen for the surface.

### The assignment matrix

| Feature type | Mandatory lenses | Contextual lenses |
|---|---|---|
| POS order entry | Don Norman, Jakob Nielsen, Luke Wroblewski | Jony Ive, Kat Holmes |
| BackOffice reporting | Alan Cooper, Edward Tufte, Julie Zhuo | Kim Goodwin, Erika Hall |
| Dashboards and analytics | Edward Tufte, Julie Zhuo, Alan Cooper | Erika Hall, Jony Ive |
| AI suggestions, drafting, and recommendations | Ben Shneiderman, Erika Hall, Don Norman | Julie Zhuo, Aarron Walter |
| Kiosk or guest ordering | Jony Ive, Aarron Walter, Kat Holmes | Ethan Marcotte, Luke Wroblewski |
| Multi-venue configuration | Alan Cooper, Irene Au, Don Norman | Kim Goodwin, Jakob Nielsen |
| Migration from Bepoz, Idealpos, SwiftPOS, OrderMate or Deliverit | Don Norman, Kat Holmes, Alan Cooper | Irene Au, Erika Hall |
| Payments and checkout | Don Norman, Aarron Walter, Luke Wroblewski | Jakob Nielsen, Kat Holmes |
| KDS and kitchen flow | Don Norman, Kat Holmes, Jakob Nielsen | Alan Cooper, Ethan Marcotte |
| Onboarding and account setup | Jakob Nielsen, Luke Wroblewski, Aarron Walter | Erika Hall, Kat Holmes |

If a feature does not fit a row, pick the three lenses that map to its hardest design risk, and two that map to its likely failure under pressure. Always include at least one of Norman, Nielsen or Holmes on anything a frontline user touches during service. Always include Julie Zhuo or Erika Hall on anything where the team is confident but the evidence is thin. Always include Ben Shneiderman on anything that recommends, drafts, or acts on the operator's behalf. Tufte is a strong contextual pick on KDS work where the risk is information density under pressure.

### The steps

1. **Name the feature and the surface.** POS, Kiosk, BackOffice, Payments, KDS, Online Ordering, onboarding, migration.
2. **Name the hospitality personas it touches.** Primary, buyer, blocker. Pull them from the `uat-panel/` library.
3. **Assign three mandatory and two contextual lenses** from the matrix.
4. **Run each lens.** Read the lens file. Ask its signature challenge questions of the feature. Record where it passes and where it fails.
5. **Surface the clashes.** Where two lenses disagree, write the disagreement down. Do not paper over it.
6. **Apply the decision rule** to resolve each clash.
7. **Record the verdict** against each lens, and the actions that came out of it. That record is the validation artefact the Handbook asks for.

---

## The contradictions are the point

The lenses are chosen to disagree. That is the design, not a flaw.

Jony Ive pushes for fewer visible controls. Jakob Nielsen may argue that visible controls improve discoverability. Kat Holmes may challenge both, if the stripped-back interface excludes a nervous new casual who needs guidance. Julie Zhuo asks whether any of it moves a measurable behaviour. Erika Hall asks whether the whole debate rests on evidence or on taste.

That tension is healthy. A feature that survives it is genuinely better. A feature that only ever heard one voice was never tested.

---

## The decision rule

When the lenses clash, resolve the clash with a simple, fixed hierarchy. This is the tie-breaker, and it does not move from feature to feature.

1. **Operational correctness beats aesthetic purity.** If it is beautiful but it drops an order on a Friday night, it fails.
2. **Learnability beats novelty.** If a new casual cannot pick it up in one shift, a clever new pattern is the wrong pattern.
3. **Measurable user impact beats internal preference.** If we cannot say what behaviour it changes and how we would know, the strongest internal opinion does not win.

Operational reality is the floor. The hospitality personas hold that floor. The expert lenses raise the ceiling. Both have to be satisfied.

---

## House rules for this folder

These are in addition to the house rules in `../personas.md`.

1. **Lenses, not impersonations.** Each file represents a design philosophy. It is a tool, not a tribute.
2. **No invented quotes from real people.** The signature challenge questions represent what the lens asks in a review. They are never presented as direct quotations from the named individual. Do not attribute fabricated statements to a real, living person.
3. **The philosophy is the stable part.** Job titles and current roles drift. Update them when convenient. Never let a role change weaken the lens. The thinking is what we test against.
4. **Keep the panel balanced.** If you add a lens, name the gap it fills and the lens it argues with. A panel that all agrees is useless.

---

## Owner

Niel Cody (Product) owns the panel, as part of the persona library. Proposals to add, retire, or reweight a lens go through Product.
