#!/usr/bin/env node
// Reads pack_content.json and produces the six Oolio GTM pack files
// alongside it: One-Pager (PPTX), Supporting Deck (PPTX), and the four
// playbooks / marketing pack (DOCX).
//
// Usage:
//   node build_pack.js <path to pack_content.json>
//
// Output files are written to the same directory as the input JSON,
// named 0N_<Template>_<version>.(pptx|docx).

const fs = require('fs');
const path = require('path');

const pptxgen = require('pptxgenjs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TabStopType, TabStopPosition,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak,
} = require('docx');

// ============================================================================
// 0. Brand and helpers
// ============================================================================

const PURPLE       = '673AB6';
const PURPLE_DARK  = '5E35B1';
const PURPLE_LIGHT = 'F9F8FC';
const ACCENT       = 'EDE7F6';
const TEXT_DARK    = '1F1A2E';
const TEXT_GREY    = '5A5566';
const TEXT_MUTE    = '8C879A';
const RULE         = 'D5D0E1';
const ZEBRA        = 'F5F1FA';
const HEADER_FILL  = 'EDE7F6';
const WHITE        = 'FFFFFF';

const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Render a value, marking GAPs visibly so they are caught in QA.
function show(v, fallback = '[TBC]') {
  if (v === undefined || v === null) return fallback;
  const s = String(v);
  if (s === '[GAP]' || s.trim() === '') return '[NOT YET FILLED]';
  return s;
}

function isFilled(v) {
  if (v === undefined || v === null) return false;
  const s = String(v).trim();
  return s !== '' && s !== '[GAP]';
}

// ----- DOCX atoms -----
const tr = (text, opts = {}) => new TextRun({
  text,
  font: 'Arial',
  size: opts.size ?? 22,
  color: opts.color ?? TEXT_DARK,
  bold: opts.bold ?? false,
  italics: opts.italic ?? false,
});

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
  alignment: opts.alignment,
  children: [tr(text, opts)],
});

const guidance = (text) => new Paragraph({
  spacing: { after: 160, before: 40 },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: PURPLE, space: 8 } },
  indent: { left: 200 },
  children: [tr(text, { italic: true, color: TEXT_GREY, size: 20 })],
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 180 },
  children: [tr(text, { size: 32, bold: true, color: PURPLE_DARK })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 120 },
  children: [tr(text, { size: 26, bold: true, color: PURPLE_DARK })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 220, after: 80 },
  children: [tr(text, { size: 22, bold: true })],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 80 },
  children: [tr(text)],
});

const numItem = (text) => new Paragraph({
  numbering: { reference: 'numbers', level: 0 },
  spacing: { after: 80 },
  children: [tr(text)],
});

const ruled = () => new Paragraph({
  spacing: { before: 80, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PURPLE, space: 1 } },
  children: [tr('')],
});

const cell = (kids, opts = {}) => new TableCell({
  width: { size: opts.width, type: WidthType.DXA },
  shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
  borders: {
    top:    { style: BorderStyle.SINGLE, size: 4, color: RULE },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    left:   { style: BorderStyle.SINGLE, size: 4, color: RULE },
    right:  { style: BorderStyle.SINGLE, size: 4, color: RULE },
  },
  margins: { top: 100, bottom: 100, left: 140, right: 140 },
  verticalAlign: VerticalAlign.TOP,
  children: kids.map(k => typeof k === 'string'
    ? new Paragraph({ children: [tr(k, { size: 20, color: opts.color ?? TEXT_DARK, bold: opts.bold ?? false, italic: opts.italic ?? false })] })
    : k),
});

// ============================================================================
// 1. Shared DOCX assemblers
// ============================================================================

function metadataTable(product) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [2400, 6960],
    rows: [
      new TableRow({ children: [
        cell(['Product'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.name)], { width: 6960 }),
      ]}),
      new TableRow({ children: [
        cell(['Owner (PM)'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.owner_pm?.name)], { width: 6960 }),
      ]}),
      new TableRow({ children: [
        cell(['GTM partner'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.gtm_partner?.name)], { width: 6960 }),
      ]}),
      new TableRow({ children: [
        cell(['Version'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.version, 'v0.1')], { width: 6960 }),
      ]}),
      new TableRow({ children: [
        cell(['Last reviewed'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.last_reviewed)], { width: 6960 }),
      ]}),
      new TableRow({ children: [
        cell(['Anchor Jira epic'], { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell([show(product.anchor_jira_epic)], { width: 6960 }),
      ]}),
    ],
  });
}

function buildDocx({ title, subtitle, kind, product, sections, fileName, outDir }) {
  const doc = new Document({
    creator: 'Oolio GTM Pack skill',
    title,
    description: subtitle,
    styles: {
      default: { document: { run: { font: 'Arial', size: 22, color: TEXT_DARK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 32, bold: true, font: 'Arial', color: PURPLE_DARK },
          paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 26, bold: true, font: 'Arial', color: PURPLE_DARK },
          paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 22, bold: true, font: 'Arial', color: TEXT_DARK },
          paragraph: { spacing: { before: 220, after: 80 }, outlineLevel: 2 } },
      ],
    },
    numbering: {
      config: [
        { reference: 'bullets', levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        ]},
        { reference: 'numbers', levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        ]},
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PURPLE, space: 4 } },
            children: [
              tr(`Oolio  /  ${kind}  /  ${show(product.name)}`, { size: 18, color: PURPLE, bold: true }),
              tr(`\t${show(product.version, 'v0.1')}  /  ${show(product.last_reviewed)}`, { size: 18, color: TEXT_GREY }),
            ],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 } },
            children: [
              tr('Oolio GTM & Product Enablement', { size: 18, color: TEXT_GREY }),
              tr('\tPage ', { size: 18, color: TEXT_GREY }),
              new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: TEXT_GREY }),
              tr(' of ', { size: 18, color: TEXT_GREY }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Arial', size: 18, color: TEXT_GREY }),
            ],
          })],
        }),
      },
      children: [
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [tr('OOLIO  /  GTM & PRODUCT ENABLEMENT', { size: 18, color: PURPLE, bold: true })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [tr(title, { size: 50, bold: true })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [tr(subtitle, { size: 24, color: TEXT_GREY, italic: true })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 280 },
          children: [tr(`For ${show(product.name)}  /  ${show(product.version, 'v0.1')}`, { size: 22, color: PURPLE_DARK, bold: true })],
        }),
        ruled(),
        h2('Document metadata'),
        metadataTable(product),
        new Paragraph({ children: [new PageBreak()] }),
        ...sections,
      ],
    }],
  });

  return Packer.toBuffer(doc).then(buf => {
    const out = path.join(outDir, fileName);
    fs.writeFileSync(out, buf);
    console.log('  Wrote ' + path.basename(out));
  });
}

// ============================================================================
// 2. DOCX section builders
// ============================================================================

function salesSections(content, product) {
  const s = content.sales || {};
  const out = [];
  out.push(h1('1. Product summary'));
  out.push(para(show(s.summary)));

  out.push(h1('2. Discovery'));
  out.push(h2('2.1  Discovery questions'));
  (s.discovery_questions || []).forEach(q => out.push(numItem(show(q))));

  out.push(h2('2.2  Qualification criteria'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [2400, 3480, 3480],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['Criterion'],     { width: 2400, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Qualified in'],  { width: 3480, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Qualified out'], { width: 3480, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(s.qualification || []).map((q, i) => new TableRow({
        children: [
          cell([show(q.criterion)],     { width: 2400, bold: true, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(q.qualified_in)],  { width: 3480, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(q.qualified_out)], { width: 3480, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('3. Demo flow and talk track'));
  (s.demo_steps || []).forEach((step, i) => {
    out.push(h3(`Step ${i + 1}. ${show(step.step)} (${step.minutes ?? '[TBC]'} min)`));
    out.push(para(`Show: ${show(step.what_to_show)}`, { italic: true, color: TEXT_GREY }));
    out.push(para(`Say: ${show(step.talk_track)}`));
  });

  out.push(h1('4. Objection handling'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3120, 6240],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['Objection'],            { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Response and proof'],   { width: 6240, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(s.objections || []).map((o, i) => new TableRow({
        children: [
          cell([show(o.objection)], { width: 3120, fill: i % 2 ? ZEBRA : undefined, bold: true }),
          cell([show(o.response)],  { width: 6240, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('5. Pricing and packaging quick reference'));
  out.push(h3('5.1  Packages'));
  (s.pricing?.packages || []).forEach(p => {
    out.push(para(`${show(p.name)}. For ${show(p.for)}. Includes ${show(p.includes)}. ${show(p.headline_price)}.`));
  });
  out.push(h3('5.2  Discounting authority'));
  out.push(para(show(s.pricing?.discount_authority)));
  out.push(h3('5.3  Source of truth'));
  out.push(para(show(s.pricing?.source_of_truth)));

  out.push(h1('6. Close and handover'));
  out.push(h3('6.1  Close motion'));
  out.push(para(show(s.close_motion)));
  out.push(h3('6.2  Handover checklist'));
  (s.handover_checklist || []).forEach(item => out.push(numItem(show(item))));

  out.push(h1('7. Appendix'));
  out.push(bullet(`Linked Supporting Deck: 02_Supporting_Deck_${show(product.version)}.pptx`));
  out.push(bullet(`Linked One-Pager: 01_One_Pager_${show(product.version)}.pptx`));
  out.push(bullet(`Linked Marketing Pack: 06_Marketing_Pack_${show(product.version)}.docx`));
  return out;
}

function amSections(content, product) {
  const a = content.am || {};
  const out = [];
  out.push(h1('1. Product summary for AMs'));
  out.push(para(show(a.summary)));
  out.push(para(`At 90 days post go-live: ${show(a.healthy_at_90d)}`, { italic: true, color: TEXT_GREY }));

  out.push(h1('2. Adoption signals and red flags'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [2700, 3330, 3330],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['Feature'],    { width: 2700, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Healthy'],    { width: 3330, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Red flag'],   { width: 3330, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(a.adoption_signals || []).map((row, i) => new TableRow({
        children: [
          cell([show(row.feature)],   { width: 2700, fill: i % 2 ? ZEBRA : undefined, bold: true }),
          cell([show(row.healthy)],   { width: 3330, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(row.red_flag)],  { width: 3330, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('3. Expansion triggers and upsell pathways'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['Trigger'],              { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Suggested next product'],{width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Talk track'],           { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(a.expansion_triggers || []).map((t, i) => new TableRow({
        children: [
          cell([show(t.trigger)],       { width: 3120, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(t.next_product)],  { width: 3120, fill: i % 2 ? ZEBRA : undefined, bold: true }),
          cell([show(t.talk_track)],    { width: 3120, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('4. Renewal play'));
  out.push(h3('4.1  Timeline'));
  (a.renewal_timeline || []).forEach(t => out.push(numItem(`${show(t.checkpoint)}: ${show(t.action)}`)));
  out.push(h3('4.2  Required artifacts'));
  (a.renewal_artifacts || []).forEach(it => out.push(bullet(show(it))));

  out.push(h1('5. At-risk play'));
  out.push(h3('5.1  Trigger criteria'));
  (a.at_risk_triggers || []).forEach(it => out.push(bullet(show(it))));
  out.push(h3('5.2  Recovery sequence'));
  (a.recovery_sequence || []).forEach(s => out.push(numItem(`${show(s.step)}: ${show(s.action)}`)));

  out.push(h1('6. Quarterly Business Review template'));
  (a.qbr_sections || []).forEach(s => out.push(numItem(show(s))));

  out.push(h1('7. Appendix'));
  out.push(bullet(`Linked Sales Playbook: 03_Sales_Playbook_${show(product.version)}.docx`));
  out.push(bullet(`Linked Onboarding Playbook: 05_Onboarding_Playbook_${show(product.version)}.docx`));
  return out;
}

function onboardingSections(content, product) {
  const o = content.onboarding || {};
  const out = [];

  out.push(h1('1. Definition of done'));
  (o.definition_of_done || []).forEach(it => out.push(bullet(show(it))));

  out.push(h1('2. Configuration checklist'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [600, 4560, 2100, 2100],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['#'],     { width: 600, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Step'],  { width: 4560, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Owner'], { width: 2100, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Done by'], { width: 2100, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(o.config_checklist || []).map((row, i) => new TableRow({
        children: [
          cell([String(i + 1)], { width: 600, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(row.step)], { width: 4560, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(row.owner)], { width: 2100, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(row.due)], { width: 2100, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('3. Data migration plan'));
  out.push(h3('3.1  In-scope data'));
  (o.migration?.in_scope || []).forEach(d => {
    out.push(bullet(`${show(d.domain)}: source ${show(d.source)}, ~${show(d.record_count)} records, owner ${show(d.owner)}`));
  });
  out.push(h3('3.2  Mapping decisions'));
  out.push(para(show(o.migration?.mapping_decisions)));
  out.push(h3('3.3  Validation'));
  (o.migration?.validation || []).forEach(it => out.push(numItem(show(it))));

  out.push(h1('4. Staff training plan'));
  out.push(h3('4.1  Manager training'));
  (o.training?.manager || []).forEach(it => out.push(bullet(show(it))));
  out.push(h3('4.2  Frontline staff training'));
  (o.training?.frontline || []).forEach(it => out.push(bullet(show(it))));
  out.push(h3('4.3  Materials provided'));
  (o.training?.materials || []).forEach(it => out.push(bullet(show(it))));

  out.push(h1('5. Go-live validation'));
  out.push(h3('5.1  Pre-flight (T-24h)'));
  (o.golive?.preflight || []).forEach(it => out.push(numItem(show(it))));
  out.push(h3('5.2  Cutover (T-0)'));
  (o.golive?.cutover || []).forEach(it => out.push(numItem(`${show(it.step)}. Owner ${show(it.owner)}. ETA ${show(it.eta)}.`)));
  out.push(h3('5.3  Post-live (T+24h)'));
  (o.golive?.postlive || []).forEach(it => out.push(numItem(show(it))));

  out.push(h1('6. First-week health check'));
  out.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3120, 3120, 3120],
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell(['Check'],            { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Pass criteria'],    { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
        cell(['Action if fail'],   { width: 3120, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
      ]}),
      ...(o.healthcheck || []).map((row, i) => new TableRow({
        children: [
          cell([show(row.check)],       { width: 3120, fill: i % 2 ? ZEBRA : undefined, bold: true }),
          cell([show(row.pass)],        { width: 3120, fill: i % 2 ? ZEBRA : undefined }),
          cell([show(row.fail_action)], { width: 3120, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    ],
  }));

  out.push(h1('7. Handover to AM'));
  (o.handover || []).forEach(it => out.push(numItem(show(it))));

  return out;
}

function marketingSections(content, product) {
  const m = content.marketing || {};
  const out = [];

  out.push(h1('1. Pack overview'));
  out.push(para(`Tier: ${show(m.tier, '2')}`));

  out.push(h1('2. Launch announcement'));
  out.push(h2('2.1  LinkedIn long-form'));
  out.push(para(show(m.launch?.linkedin_long)));
  out.push(h2('2.2  LinkedIn short-form'));
  out.push(para(show(m.launch?.linkedin_short)));
  out.push(h2('2.3  Partner channel announcement'));
  out.push(para(show(m.launch?.partner_channel)));

  out.push(h1('3. Social posts'));
  (m.social_posts || []).forEach((p, i) => {
    out.push(h3(`Post ${i + 1}`));
    out.push(para(show(p.body)));
    out.push(para(`Visual: ${show(p.visual)}`, { italic: true, color: TEXT_GREY }));
  });

  out.push(h1('4. Email sequences'));
  out.push(h2('4.1  Prospect sequence'));
  (m.emails?.prospect || []).forEach((e, i) => {
    out.push(h3(`Email ${i + 1}`));
    out.push(para(`Subject: ${show(e.subject)}`));
    out.push(para(`Pre-header: ${show(e.preheader)}`, { italic: true, color: TEXT_GREY }));
    out.push(para(show(e.body)));
    out.push(para(`CTA: ${show(e.cta)}`, { bold: true, color: PURPLE_DARK }));
  });
  out.push(h2('4.2  Customer sequence'));
  (m.emails?.customer || []).forEach((e, i) => {
    out.push(h3(`Email ${i + 1}`));
    out.push(para(`Subject: ${show(e.subject)}`));
    out.push(para(`Pre-header: ${show(e.preheader)}`, { italic: true, color: TEXT_GREY }));
    out.push(para(show(e.body)));
    out.push(para(`CTA: ${show(e.cta)}`, { bold: true, color: PURPLE_DARK }));
  });

  out.push(h1('5. Sales enablement note'));
  out.push(para(show(m.enablement_note)));

  out.push(h1('6. Campaign brief'));
  if (m.campaign_brief) {
    const cb = m.campaign_brief;
    const rows = [
      ['Campaign name',     cb.name],
      ['Objective',         cb.objective],
      ['Audience',          cb.audience],
      ['Headline message',  cb.headline_message],
      ['Channels',          Array.isArray(cb.channels) ? cb.channels.join(', ') : cb.channels],
      ['Budget',            cb.budget],
      ['Run dates',         cb.run_dates],
      ['Success metric',    cb.success_metric],
      ['Owner',             cb.owner],
    ];
    out.push(new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [2700, 6660],
      rows: rows.map(([k, v], i) => new TableRow({
        children: [
          cell([k], { width: 2700, fill: HEADER_FILL, bold: true, color: PURPLE_DARK }),
          cell([show(v)], { width: 6660, fill: i % 2 ? ZEBRA : undefined }),
        ],
      })),
    }));
  }

  return out;
}

// ============================================================================
// 3. PPTX builders
// ============================================================================

async function buildOnePagerPPTX(content, outDir, fileName) {
  const pres = new pptxgen();
  pres.author = 'Oolio GTM Pack skill';
  pres.title = `${content.product?.name || 'Product'} One-Pager`;
  pres.company = 'Oolio';
  pres.defineLayout({ name: 'A4_PORTRAIT', width: 8.27, height: 11.69 });
  pres.layout = 'A4_PORTRAIT';

  const W = 8.27, H = 11.69, M = 0.5, GAP = 0.25;
  const op = content.one_pager || {};
  const product = content.product || {};

  const slide = pres.addSlide();
  slide.background = { color: WHITE };

  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.55, fill: { color: PURPLE_DARK }, line: { color: PURPLE_DARK } });
  slide.addText(`OOLIO  /  ${(product.name || 'PRODUCT').toUpperCase()}  /  ONE-PAGER`, { x: M, y: 0.08, w: 5.5, h: 0.4, fontFace: 'Arial', fontSize: 11, bold: true, color: WHITE, charSpacing: 4, margin: 0 });
  slide.addText(`${show(product.version, 'v0.1')}  /  ${show(product.last_reviewed)}`, { x: W - 2.5 - M, y: 0.08, w: 2.5, h: 0.4, fontFace: 'Arial', fontSize: 10, color: WHITE, align: 'right', charSpacing: 3, margin: 0 });

  let y = 0.95;
  slide.addText(show(product.name, '[Product or Feature Name]'), { x: M, y, w: W - 2 * M, h: 0.7, fontFace: 'Arial', fontSize: 32, bold: true, color: TEXT_DARK, margin: 0 });
  y += 0.75;
  slide.addText(show(op.tagline), { x: M, y, w: W - 2 * M, h: 0.45, fontFace: 'Arial', fontSize: 14, italic: true, color: TEXT_GREY, margin: 0 });
  y += 0.55;
  slide.addShape(pres.shapes.RECTANGLE, { x: M, y, w: 1.4, h: 0.06, fill: { color: PURPLE }, line: { color: PURPLE } });

  y += 0.35;
  const blockW = (W - 2 * M - GAP) / 2;
  const blockH = 2.4;
  function block(x, y, label, value) {
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: blockW, h: blockH, fill: { color: WHITE }, line: { color: RULE, width: 1 } });
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: blockW, h: 0.08, fill: { color: PURPLE }, line: { color: PURPLE } });
    slide.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: y + 0.25, w: 2.2, h: 0.32, fill: { color: ACCENT }, line: { color: ACCENT } });
    slide.addText(label, { x: x + 0.25, y: y + 0.25, w: 2.2, h: 0.32, fontFace: 'Arial', fontSize: 10, bold: true, color: PURPLE_DARK, align: 'center', valign: 'middle', charSpacing: 3, margin: 0 });
    slide.addText(show(value), { x: x + 0.25, y: y + 0.7, w: blockW - 0.5, h: blockH - 0.9, fontFace: 'Arial', fontSize: 13, color: TEXT_DARK, valign: 'top', margin: 0 });
  }
  block(M, y, 'WHAT IS IT', op.what);
  block(M + blockW + GAP, y, 'WHO IS IT FOR', op.who);
  block(M, y + blockH + GAP, 'THE PROBLEM', op.problem);
  block(M + blockW + GAP, y + blockH + GAP, 'THE OUTCOME', op.outcome);

  y = y + 2 * blockH + GAP + 0.4;
  slide.addShape(pres.shapes.RECTANGLE, { x: M, y, w: W - 2 * M, h: 1.3, fill: { color: PURPLE_LIGHT }, line: { color: PURPLE, width: 1 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: M, y, w: 0.1, h: 1.3, fill: { color: PURPLE }, line: { color: PURPLE } });
  slide.addText('THE PROOF POINT', { x: M + 0.3, y: y + 0.15, w: W - 2 * M - 0.3, h: 0.3, fontFace: 'Arial', fontSize: 10, bold: true, color: PURPLE_DARK, charSpacing: 3, margin: 0 });
  slide.addText(show(op.proof), { x: M + 0.3, y: y + 0.5, w: W - 2 * M - 0.5, h: 0.7, fontFace: 'Arial', fontSize: 13, color: TEXT_DARK, margin: 0, valign: 'top' });

  // Footer metadata
  const metaY = H - 0.55;
  slide.addShape(pres.shapes.LINE, { x: M, y: metaY, w: W - 2 * M, h: 0, line: { color: RULE, width: 1 } });
  const colW = (W - 2 * M) / 4;
  const meta = [
    ['PRODUCT', product.name],
    ['OWNER', product.owner_pm?.name],
    ['VERSION', product.version],
    ['LAST REVIEWED', product.last_reviewed],
  ];
  meta.forEach(([label, value], i) => {
    const x = M + colW * i;
    slide.addText(label, { x, y: metaY + 0.1, w: colW, h: 0.18, fontFace: 'Arial', fontSize: 7, bold: true, color: PURPLE_DARK, charSpacing: 2, margin: 0 });
    slide.addText(show(value), { x, y: metaY + 0.28, w: colW, h: 0.22, fontFace: 'Arial', fontSize: 9, color: TEXT_DARK, margin: 0 });
  });

  await pres.writeFile({ fileName: path.join(outDir, fileName) });
  console.log('  Wrote ' + fileName);
}

async function buildDeckPPTX(content, outDir, fileName) {
  const pres = new pptxgen();
  pres.author = 'Oolio GTM Pack skill';
  pres.title = `${content.product?.name || 'Product'} Supporting Deck`;
  pres.company = 'Oolio';
  pres.layout = 'LAYOUT_WIDE';
  const W = 13.333, H = 7.5, M = 0.6;
  const TOTAL = 12;
  const product = content.product || {};
  const d = content.deck || {};

  function header(s, n, kicker) {
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.18, fill: { color: PURPLE }, line: { color: PURPLE } });
    s.addText(kicker, { x: M, y: 0.32, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 10, bold: true, color: PURPLE, charSpacing: 4, margin: 0 });
    s.addText(`${String(n).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`, { x: W - 2 - M, y: 0.32, w: 2, h: 0.3, fontFace: 'Arial', fontSize: 10, color: TEXT_MUTE, align: 'right', margin: 0 });
  }
  function footer(s) {
    s.addShape(pres.shapes.LINE, { x: M, y: H - 0.45, w: W - 2 * M, h: 0, line: { color: RULE, width: 1 } });
    s.addText(`Oolio  /  ${show(product.name)}  /  ${show(product.version, 'v0.1')}  /  ${show(product.last_reviewed)}`, { x: M, y: H - 0.4, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 9, color: TEXT_MUTE, margin: 0 });
  }
  function title(s, t) {
    s.addText(t, { x: M, y: 0.85, w: W - 2 * M, h: 0.7, fontFace: 'Arial', fontSize: 32, bold: true, color: TEXT_DARK, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.55, w: 1.2, h: 0.06, fill: { color: PURPLE }, line: { color: PURPLE } });
  }
  function chip(s, x, y, w, h, label) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: ACCENT }, line: { color: ACCENT } });
    s.addText(label, { x, y, w, h, fontFace: 'Arial', fontSize: 10, bold: true, color: PURPLE_DARK, align: 'center', valign: 'middle', charSpacing: 3, margin: 0 });
  }

  // Slide 1: Cover
  {
    const s = pres.addSlide();
    s.background = { color: PURPLE_DARK };
    s.addText('OOLIO  /  GTM & PRODUCT ENABLEMENT', { x: M, y: 0.6, w: W - 2 * M, h: 0.4, fontFace: 'Arial', fontSize: 12, bold: true, color: WHITE, charSpacing: 4, margin: 0 });
    s.addText(show(product.name, '[Product]'), { x: M, y: 2.4, w: W - 2 * M, h: 1.4, fontFace: 'Arial', fontSize: 60, bold: true, color: WHITE, margin: 0 });
    s.addText(show(product.tagline_long), { x: M, y: 3.95, w: W - 2 * M, h: 0.7, fontFace: 'Arial', fontSize: 22, italic: true, color: ACCENT, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 4.85, w: 1.4, h: 0.08, fill: { color: ACCENT }, line: { color: ACCENT } });
    s.addText(`Supporting Deck  /  ${show(product.version, 'v0.1')}  /  Standard Oolio format`, { x: M, y: H - 1.0, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 12, color: ACCENT, margin: 0 });
    s.addText(`Owned by ${show(product.owner_pm?.name)}  /  GTM partner ${show(product.gtm_partner?.name)}  /  Last reviewed ${show(product.last_reviewed)}`, { x: M, y: H - 0.65, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 11, color: ACCENT, italic: true, margin: 0 });
  }

  // Slide 2: agenda
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 2, 'WHAT IS IN THIS DECK');
    title(s, "What's in this deck");
    const items = [
      ['01', 'The operator problem we are solving'],
      ['02', 'Our point of view'],
      ['03', 'Who it is for'],
      ['04', 'What we built'],
      ['05', 'Why it works'],
      ['06', 'Where we win'],
      ['07', 'Proof'],
      ['08', 'How to buy and roll out'],
      ['09', 'Summary and next steps'],
    ];
    const colW = (W - 2 * M - 0.4) / 2;
    const itemH = 0.55;
    items.forEach((it, i) => {
      const col = Math.floor(i / 5), row = i % 5;
      const x = M + col * (colW + 0.4);
      const y = 2.0 + row * (itemH + 0.15);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h: itemH, fill: { color: ACCENT }, line: { color: ACCENT } });
      s.addText(it[0], { x, y, w: 0.55, h: itemH, fontFace: 'Arial', fontSize: 14, bold: true, color: PURPLE_DARK, align: 'center', valign: 'middle', margin: 0 });
      s.addText(it[1], { x: x + 0.7, y, w: colW - 0.7, h: itemH, fontFace: 'Arial', fontSize: 16, color: TEXT_DARK, valign: 'middle', margin: 0 });
    });
    footer(s);
  }

  // Slide 3: problem
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 3, 'SECTION 01  /  THE PROBLEM');
    title(s, 'The operator problem we are solving');
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: (W - 2 * M) * 0.55, h: 4.5, fill: { color: PURPLE_LIGHT }, line: { color: PURPLE, width: 1 } });
    s.addText('"', { x: M + 0.2, y: 1.95, w: 1, h: 1.2, fontFace: 'Georgia', fontSize: 90, bold: true, color: PURPLE, margin: 0 });
    s.addText(show(d.problem?.quote), { x: M + 0.5, y: 2.8, w: (W - 2 * M) * 0.55 - 0.7, h: 3.2, fontFace: 'Arial', fontSize: 22, italic: true, color: TEXT_DARK, margin: 0, valign: 'top' });

    const rightX = M + (W - 2 * M) * 0.55 + 0.3;
    const rightW = (W - 2 * M) * 0.45 - 0.3;
    chip(s, rightX, 2.0, 2.0, 0.32, 'CONTEXT');
    (d.problem?.context_bullets || []).slice(0, 3).forEach((b, i) => {
      s.addText(`• ${show(b)}`, { x: rightX, y: 2.6 + i * 0.85, w: rightW, h: 0.7, fontFace: 'Arial', fontSize: 16, color: TEXT_DARK, margin: 0, valign: 'top' });
    });
    footer(s);
  }

  // Slide 4: POV
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 4, 'SECTION 02  /  POINT OF VIEW');
    title(s, 'Our point of view');
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.4, w: W - 2 * M, h: 1.6, fill: { color: PURPLE_LIGHT }, line: { color: PURPLE, width: 1 } });
    s.addText(show(d.pov?.big_idea), { x: M + 0.3, y: 2.5, w: W - 2 * M - 0.6, h: 1.4, fontFace: 'Arial', fontSize: 22, bold: true, color: PURPLE_DARK, margin: 0, valign: 'middle' });
    s.addText(show(d.pov?.supporting), { x: M, y: 4.3, w: W - 2 * M, h: 2.0, fontFace: 'Arial', fontSize: 15, color: TEXT_DARK, margin: 0, valign: 'top' });
    footer(s);
  }

  // Slide 5: ICP & personas
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 5, 'SECTION 03  /  ICP & PERSONAS');
    title(s, 'Who it is for');
    const colW = (W - 2 * M - 0.4) / 2;
    chip(s, M, 2.0, colW, 0.45, 'TARGET SEGMENTS');
    chip(s, M + colW + 0.4, 2.0, colW, 0.45, 'BUYER PERSONAS');
    (d.icp?.segments || []).slice(0, 3).forEach((seg, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.7 + i * 1.25, w: colW, h: 1.05, fill: { color: PURPLE_LIGHT }, line: { color: RULE, width: 1 } });
      s.addText(show(seg.name), { x: M + 0.2, y: 2.8 + i * 1.25, w: colW - 0.4, h: 0.35, fontFace: 'Arial', fontSize: 14, bold: true, color: TEXT_DARK, margin: 0 });
      s.addText(show(seg.detail), { x: M + 0.2, y: 3.15 + i * 1.25, w: colW - 0.4, h: 0.6, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
    });
    (d.icp?.personas || []).slice(0, 3).forEach((p, i) => {
      const x = M + colW + 0.4;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.7 + i * 1.25, w: colW, h: 1.05, fill: { color: PURPLE_LIGHT }, line: { color: RULE, width: 1 } });
      s.addText(show(p.name), { x: x + 0.2, y: 2.8 + i * 1.25, w: colW - 0.4, h: 0.35, fontFace: 'Arial', fontSize: 14, bold: true, color: TEXT_DARK, margin: 0 });
      s.addText(show(p.detail), { x: x + 0.2, y: 3.15 + i * 1.25, w: colW - 0.4, h: 0.6, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
    });
    footer(s);
  }

  // Slide 6: capabilities
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 6, 'SECTION 04  /  PRODUCT OVERVIEW');
    title(s, 'What we built');
    const caps = (d.capabilities || []).slice(0, 4);
    const cardW = (W - 2 * M - 0.45) / 4;
    const cardY = 2.6, cardH = 3.6;
    for (let i = 0; i < 4; i++) {
      const x = M + i * (cardW + 0.15);
      const cap = caps[i] || {};
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: cardH, fill: { color: WHITE }, line: { color: RULE, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: 0.1, fill: { color: PURPLE }, line: { color: PURPLE } });
      s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.7, fontFace: 'Arial', fontSize: 32, bold: true, color: PURPLE, margin: 0 });
      s.addText('CAPABILITY', { x: x + 0.3, y: cardY + 1.1, w: cardW - 0.6, h: 0.3, fontFace: 'Arial', fontSize: 9, bold: true, color: TEXT_MUTE, charSpacing: 3, margin: 0 });
      s.addText(show(cap.name), { x: x + 0.3, y: cardY + 1.4, w: cardW - 0.6, h: 0.55, fontFace: 'Arial', fontSize: 14, bold: true, color: TEXT_DARK, margin: 0 });
      s.addText(show(cap.description), { x: x + 0.3, y: cardY + 2.0, w: cardW - 0.6, h: 1.4, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
    }
    footer(s);
  }

  // Slide 7: pain to outcome
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 7, 'SECTION 05  /  VALUE PROPOSITION');
    title(s, 'Why it works: pain to outcome');
    const cols = ['PAIN', 'FEATURE', 'OUTCOME', 'BUSINESS IMPACT'];
    const colW = (W - 2 * M) / 4;
    const headY = 2.4;
    cols.forEach((c, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: M + i * colW, y: headY, w: colW - 0.05, h: 0.45, fill: { color: PURPLE }, line: { color: PURPLE } });
      s.addText(c, { x: M + i * colW, y: headY, w: colW - 0.05, h: 0.45, fontFace: 'Arial', fontSize: 11, bold: true, color: WHITE, align: 'center', valign: 'middle', charSpacing: 3, margin: 0 });
    });
    const rows = (d.value_prop || []).slice(0, 3);
    for (let r = 0; r < 3; r++) {
      const rowY = headY + 0.55 + r * 1.3;
      const fill = r % 2 === 0 ? WHITE : PURPLE_LIGHT;
      const row = rows[r] || {};
      const vals = [show(row.pain), show(row.feature), show(row.outcome), show(row.impact)];
      vals.forEach((v, i) => {
        s.addShape(pres.shapes.RECTANGLE, { x: M + i * colW, y: rowY, w: colW - 0.05, h: 1.2, fill: { color: fill }, line: { color: RULE, width: 1 } });
        s.addText(v, { x: M + i * colW + 0.15, y: rowY + 0.1, w: colW - 0.3, h: 1.0, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
      });
    }
    footer(s);
  }

  // Slide 8: competitive
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 8, 'SECTION 06  /  COMPETITIVE POSITIONING');
    title(s, 'Where we win');
    const colW = (W - 2 * M - 0.4) / 3, colY = 2.0, colH = 4.6;
    const blocks = [
      { label: 'WHERE WE COMPETE',         text: d.competitive?.where_we_compete },
      { label: 'WHERE WE WIN',             text: d.competitive?.where_we_win },
      { label: 'WHERE WE WILL NOT PLAY',   text: d.competitive?.where_we_dont },
    ];
    blocks.forEach((b, i) => {
      const x = M + i * (colW + 0.2);
      s.addShape(pres.shapes.RECTANGLE, { x, y: colY, w: colW, h: colH, fill: { color: WHITE }, line: { color: RULE, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: colY, w: colW, h: 0.1, fill: { color: PURPLE }, line: { color: PURPLE } });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: colY + 0.35, w: colW - 0.5, h: 0.4, fill: { color: ACCENT }, line: { color: ACCENT } });
      s.addText(b.label, { x: x + 0.25, y: colY + 0.35, w: colW - 0.5, h: 0.4, fontFace: 'Arial', fontSize: 11, bold: true, color: PURPLE_DARK, align: 'center', valign: 'middle', charSpacing: 3, margin: 0 });
      s.addText(show(b.text), { x: x + 0.3, y: colY + 1.0, w: colW - 0.6, h: colH - 1.2, fontFace: 'Arial', fontSize: 13, color: TEXT_DARK, margin: 0, valign: 'top' });
    });
    footer(s);
  }

  // Slide 9: proof
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 9, 'SECTION 07  /  PROOF');
    title(s, 'Proof');
    const stats = (d.proof?.stats || []).slice(0, 3);
    const statW = (W - 2 * M - 0.5) / 3, statY = 2.2;
    for (let i = 0; i < 3; i++) {
      const x = M + i * (statW + 0.25);
      const st = stats[i] || {};
      s.addShape(pres.shapes.RECTANGLE, { x, y: statY, w: statW, h: 1.7, fill: { color: PURPLE_LIGHT }, line: { color: PURPLE, width: 1 } });
      s.addText(show(st.value, '[TBC]'), { x, y: statY + 0.1, w: statW, h: 0.85, fontFace: 'Arial', fontSize: 44, bold: true, color: PURPLE, align: 'center', valign: 'middle', margin: 0 });
      s.addText(show(st.label), { x: x + 0.2, y: statY + 1.05, w: statW - 0.4, h: 0.6, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, align: 'center', valign: 'top', margin: 0 });
    }
    const cs = (d.proof?.case_studies || []).slice(0, 2);
    const caseW = (W - 2 * M - 0.4) / 2, caseY = 4.2, caseH = 2.0;
    for (let i = 0; i < 2; i++) {
      const x = M + i * (caseW + 0.4);
      const c = cs[i] || {};
      s.addShape(pres.shapes.RECTANGLE, { x, y: caseY, w: caseW, h: caseH, fill: { color: WHITE }, line: { color: RULE, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: caseY, w: 0.1, h: caseH, fill: { color: PURPLE }, line: { color: PURPLE } });
      s.addText(`CASE STUDY ${i + 1}`, { x: x + 0.3, y: caseY + 0.15, w: caseW - 0.6, h: 0.3, fontFace: 'Arial', fontSize: 9, bold: true, color: PURPLE, charSpacing: 3, margin: 0 });
      s.addText(show(c.customer, '[TBC]'), { x: x + 0.3, y: caseY + 0.45, w: caseW - 0.6, h: 0.4, fontFace: 'Arial', fontSize: 14, bold: true, color: TEXT_DARK, margin: 0 });
      s.addText(show(c.story), { x: x + 0.3, y: caseY + 0.95, w: caseW - 0.6, h: 0.95, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
    }
    footer(s);
  }

  // Slide 10: How to buy
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 10, 'SECTION 08  /  HOW TO BUY');
    title(s, 'How to buy and roll out');
    const steps = (d.buy_steps || []).slice(0, 5);
    const defaults = ['DISCOVERY', 'DEMO', 'CONTRACT', 'ONBOARDING', 'GO LIVE'];
    const stepW = (W - 2 * M - 0.6) / 5, stepY = 2.4, stepH = 3.5;
    for (let i = 0; i < 5; i++) {
      const x = M + i * (stepW + 0.15);
      const step = steps[i] || {};
      s.addShape(pres.shapes.OVAL, { x: x + (stepW - 0.6) / 2, y: stepY, w: 0.6, h: 0.6, fill: { color: PURPLE }, line: { color: PURPLE } });
      s.addText(String(i + 1), { x: x + (stepW - 0.6) / 2, y: stepY, w: 0.6, h: 0.6, fontFace: 'Arial', fontSize: 22, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x, y: stepY + 0.85, w: stepW, h: stepH - 0.85, fill: { color: WHITE }, line: { color: RULE, width: 1 } });
      s.addText(show(step.name, defaults[i]), { x, y: stepY + 1.0, w: stepW, h: 0.4, fontFace: 'Arial', fontSize: 12, bold: true, color: PURPLE_DARK, align: 'center', charSpacing: 3, margin: 0 });
      s.addText(show(step.description), { x: x + 0.2, y: stepY + 1.5, w: stepW - 0.4, h: stepH - 1.7, fontFace: 'Arial', fontSize: 11, color: TEXT_DARK, margin: 0, valign: 'top' });
    }
    footer(s);
  }

  // Slide 11: summary
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    header(s, 11, 'SECTION 09  /  SUMMARY');
    title(s, 'Summary and next steps');
    const leftW = (W - 2 * M) * 0.55;
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: leftW, h: 4.5, fill: { color: PURPLE_LIGHT }, line: { color: PURPLE, width: 1 } });
    s.addText('THE TAKEAWAY', { x: M + 0.3, y: 2.2, w: leftW - 0.6, h: 0.4, fontFace: 'Arial', fontSize: 12, bold: true, color: PURPLE_DARK, charSpacing: 3, margin: 0 });
    s.addText(show(d.summary?.takeaway), { x: M + 0.3, y: 2.7, w: leftW - 0.6, h: 3.5, fontFace: 'Arial', fontSize: 18, color: TEXT_DARK, margin: 0, valign: 'top' });

    const rightX = M + leftW + 0.4;
    const rightW = W - 2 * M - leftW - 0.4;
    s.addText('NEXT STEPS', { x: rightX, y: 2.0, w: rightW, h: 0.4, fontFace: 'Arial', fontSize: 12, bold: true, color: PURPLE_DARK, charSpacing: 3, margin: 0 });
    (d.summary?.next_steps || []).slice(0, 3).forEach((a, i) => {
      const y = 2.6 + i * 1.0;
      s.addShape(pres.shapes.RECTANGLE, { x: rightX, y, w: rightW, h: 0.85, fill: { color: PURPLE_LIGHT }, line: { color: RULE, width: 1 } });
      s.addText(show(a.action), { x: rightX + 0.15, y: y + 0.1, w: rightW - 0.3, h: 0.4, fontFace: 'Arial', fontSize: 13, bold: true, color: TEXT_DARK, margin: 0 });
      s.addText(`Owner ${show(a.owner)}  /  Due ${show(a.due)}`, { x: rightX + 0.15, y: y + 0.5, w: rightW - 0.3, h: 0.3, fontFace: 'Arial', fontSize: 10, color: TEXT_GREY, italic: true, margin: 0 });
    });
    footer(s);
  }

  // Slide 12: back cover
  {
    const s = pres.addSlide();
    s.background = { color: PURPLE_DARK };
    s.addText('THANK YOU', { x: M, y: 1.5, w: W - 2 * M, h: 0.5, fontFace: 'Arial', fontSize: 14, bold: true, color: ACCENT, charSpacing: 6, margin: 0 });
    s.addText(show(d.back_cover?.promise), { x: M, y: 2.4, w: W - 2 * M, h: 1.2, fontFace: 'Arial', fontSize: 36, bold: true, color: WHITE, italic: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 4.0, w: 1.4, h: 0.08, fill: { color: ACCENT }, line: { color: ACCENT } });
    s.addText('GET IN TOUCH', { x: M, y: 4.5, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 11, bold: true, color: ACCENT, charSpacing: 4, margin: 0 });
    (d.back_cover?.contacts || []).slice(0, 3).forEach((c, i) => {
      s.addText(`${show(c.role)}: ${show(c.name)}, ${show(c.email)}`, { x: M, y: 4.9 + i * 0.4, w: W - 2 * M, h: 0.35, fontFace: 'Arial', fontSize: 14, color: WHITE, margin: 0 });
    });
    s.addText(`Oolio  /  ${show(product.name)}  /  Supporting Deck ${show(product.version, 'v0.1')}`, { x: M, y: H - 0.55, w: W - 2 * M, h: 0.3, fontFace: 'Arial', fontSize: 10, color: ACCENT, margin: 0 });
  }

  await pres.writeFile({ fileName: path.join(outDir, fileName) });
  console.log('  Wrote ' + fileName);
}

// ============================================================================
// 4. Main
// ============================================================================

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node build_pack.js <path to pack_content.json>');
    process.exit(1);
  }
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }
  const content = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const product = content.product || {};
  const version = product.version || 'v0.1';
  const outDir = path.dirname(path.resolve(inputPath));

  console.log(`Building pack for ${product.name || '[unknown]'} ${version}`);
  console.log(`Output dir: ${outDir}`);

  // PPTX
  await buildOnePagerPPTX(content, outDir, `01_One_Pager_${version}.pptx`);
  await buildDeckPPTX(content, outDir, `02_Supporting_Deck_${version}.pptx`);

  // DOCX
  await buildDocx({
    title: 'Sales Playbook',
    subtitle: 'Standard Oolio template. Discovery to handover.',
    kind: 'Sales Playbook',
    product,
    sections: salesSections(content, product),
    fileName: `03_Sales_Playbook_${version}.docx`,
    outDir,
  });
  await buildDocx({
    title: 'Account Management Playbook',
    subtitle: 'Standard Oolio template. Adoption, expansion, renewal.',
    kind: 'Account Management Playbook',
    product,
    sections: amSections(content, product),
    fileName: `04_Account_Management_Playbook_${version}.docx`,
    outDir,
  });
  await buildDocx({
    title: 'Onboarding Playbook',
    subtitle: 'Standard Oolio template. Configuration to first-week health check.',
    kind: 'Onboarding Playbook',
    product,
    sections: onboardingSections(content, product),
    fileName: `05_Onboarding_Playbook_${version}.docx`,
    outDir,
  });
  await buildDocx({
    title: 'Marketing Pack',
    subtitle: 'Standard Oolio template. Launch comms, social, email, enablement.',
    kind: 'Marketing Pack',
    product,
    sections: marketingSections(content, product),
    fileName: `06_Marketing_Pack_${version}.docx`,
    outDir,
  });

  console.log('\nDone. Six files written.');
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
