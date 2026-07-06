# Templates Catalogue

The six templates this skill fills in. They live in a `templates/` folder discovered at runtime (via the `GTM_TEMPLATES_DIR` env var, or by walking up from the working directory looking for `templates/` or `Templates/`). In the Insights project they live at `templates/` and are owned by the GTM Framework Proposal. The skill consumes them, it doesn't modify them.

For each template, this catalogue lists the sections, the JSON path in `pack_content.json` that feeds each section, and a one-line note on what good looks like.

If a template is updated (a section added, an existing one renamed), update three things in lockstep. The template file, the JSON schema in `references/content-schema.md`, and this catalogue.

---

## 01. One-Pager (PPTX, A4 portrait, single slide)

| Section | JSON path | What good looks like |
|---|---|---|
| Product name | `product.name` | Same as the folder name. No internal codenames. |
| Tagline | `one_pager.tagline` | Headline outcome in 8 to 14 plain English words. |
| What is it | `one_pager.what` | One sentence definition for a venue operator. |
| Who is it for | `one_pager.who` | One ICP segment named, one persona named. |
| The problem | `one_pager.problem` | Operator pain in their own words. |
| The outcome | `one_pager.outcome` | A number or named win. Not adjectives. |
| Proof point | `one_pager.proof` | One quotable result with a customer name or number. `[TBC]` allowed. |
| Metadata | `product.*` | Product, owner PM, version, last reviewed. |

## 02. Supporting Deck (PPTX, 16:9, 12 slides)

| Slide | JSON path | What good looks like |
|---|---|---|
| 1. Cover | `product.name`, `product.tagline_long`, `product.owner_pm`, `product.gtm_partner` | Title and tagline. |
| 2. What's in this deck | hard-coded | No content needed. |
| 3. The operator problem | `deck.problem.quote`, `deck.problem.context_bullets[]` | Big quote and 3 context bullets. |
| 4. Our point of view | `deck.pov.big_idea`, `deck.pov.supporting` | One repeatable big idea and supporting paragraph. |
| 5. Who it's for | `deck.icp.segments[]`, `deck.icp.personas[]` | 3 segments and 3 personas. Specific, not vague. |
| 6. What we built | `deck.capabilities[].name`, `deck.capabilities[].description` | 3 to 4 capabilities. Operator framing. |
| 7. Why it works | `deck.value_prop[]` | 3 rows of pain, feature, outcome, impact. |
| 8. Where we win | `deck.competitive.where_we_compete`, `where_we_win`, `where_we_dont` | 3 honest columns, including where we deliberately won't play. |
| 9. Proof | `deck.proof.stats[]`, `deck.proof.case_studies[]` | 3 stat callouts and 2 short case studies. `[TBC]` allowed. |
| 10. How to buy | `deck.buy_steps[]` | 5 steps from discovery to go-live. |
| 11. Summary and next steps | `deck.summary.takeaway`, `deck.summary.next_steps[]` | 3 sentence takeaway and 3 actions with owners and dates. |
| 12. Back cover | `deck.back_cover.promise`, `deck.back_cover.contacts[]` | One promise line and 3 contacts. |

## 03. Sales Playbook (DOCX)

| Section | JSON path | What good looks like |
|---|---|---|
| 1. Product summary | `sales.summary` | Same paragraph as the deck cover, in 4 to 6 sentences. |
| 2.1 Discovery questions | `sales.discovery_questions[]` | 5 to 8 questions, broad to specific. |
| 2.2 Qualification matrix | `sales.qualification[]` | 5 criteria with qualified-in and qualified-out for each. |
| 3. Demo flow | `sales.demo_steps[]` | 5 steps with timing. |
| 4. Objection handling | `sales.objections[]` | Top 5 objections with acknowledge, respond, prove. |
| 5. Pricing quick reference | `sales.pricing.packages[]`, `sales.pricing.discount_authority`, `sales.pricing.source_of_truth` | Packages summary, discount levels, link to canonical pricing. |
| 6. Close and handover | `sales.close_motion`, `sales.handover_checklist[]` | The handover is the part Sales most often gets wrong. Be specific. |
| 7. Appendix | links resolved automatically | Cross-links to the other artifacts. |

## 04. Account Management Playbook (DOCX)

| Section | JSON path | What good looks like |
|---|---|---|
| 1. Product summary for AMs | `am.summary`, `am.healthy_at_90d` | One paragraph plus one sentence on what 90-day-healthy looks like. |
| 2. Adoption signals and red flags | `am.adoption_signals[]` | 5 features with healthy signal and red flag for each. |
| 3. Expansion triggers | `am.expansion_triggers[]` | 4 triggers mapped to the next product. |
| 4. Renewal play | `am.renewal_timeline[]`, `am.renewal_artifacts[]` | T-12, -9, -6, -3 month plan and required artifacts. |
| 5. At-risk play | `am.at_risk_triggers[]`, `am.recovery_sequence[]` | When to escalate, who runs recovery, what we owe the customer. |
| 6. QBR template | `am.qbr_sections[]` | Standard 6-section QBR shape. |

## 05. Onboarding Playbook (DOCX)

| Section | JSON path | What good looks like |
|---|---|---|
| 1. Definition of done | `onboarding.definition_of_done[]` | 3 to 5 observable end states. |
| 2. Configuration checklist | `onboarding.config_checklist[]` | Every setting that must be touched. Owner per row. |
| 3. Data migration plan | `onboarding.migration.in_scope[]`, `migration.mapping_decisions`, `migration.validation[]` | Source data, mapping rules, validation steps. |
| 4. Staff training plan | `onboarding.training.manager[]`, `training.frontline[]`, `training.materials[]` | Manager and frontline distinction. |
| 5. Go-live validation | `onboarding.golive.preflight[]`, `golive.cutover[]`, `golive.postlive[]` | T-24h, T-0, T+24h. |
| 6. First-week health check | `onboarding.healthcheck[]` | 5 checks with pass criteria and fail action. |
| 7. Handover to AM | `onboarding.handover[]` | 1-pager, 15 minute call, 30-day check. |

## 06. Marketing Pack (DOCX)

| Section | JSON path | What good looks like |
|---|---|---|
| 1. Pack overview | `marketing.tier` | Tier 1, 2, or 3. Tier controls how much of the pack is required. |
| 2. Launch announcement | `marketing.launch.linkedin_long`, `linkedin_short`, `partner_channel` | 3 formats, same message different lengths. |
| 3. Social posts | `marketing.social_posts[]` | 3 to 5 posts with visual concepts. |
| 4.1 Prospect email sequence | `marketing.emails.prospect[]` | 3 emails with subject, pre-header, body, CTA. |
| 4.2 Customer email sequence | `marketing.emails.customer[]` | 2 emails framed as "what's new for you". |
| 5. Sales enablement note | `marketing.enablement_note` | Under 150 words. The thing that gets pinned in Slack. |
| 6. Campaign brief | `marketing.campaign_brief.*` | Required for Tier 1, optional for Tier 2. |
