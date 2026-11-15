---
name: content-calendar-planner
description: Plan a year of social media posts for a brand: a posting rhythm it can keep, weighted themes, the few 2027 social media holidays and awareness days it should join (from a curated master list, with a fit test), and a version of each idea for every channel. Writes plan-2027.md and a paste pack. Use when asked for a content calendar, social media calendar, posting plan, social media holidays or awareness days for 2027.
license: CC-BY-4.0
metadata:
  version: "0.1.0"
  source: "Mavic Brand Marketing Workbench, toolkit 06 (content calendar)"
  homepage: "https://mavic.ai/toolkits/"
---

# Content calendar planner

Writes one brand's social plan for 2027 into `plan-2027.md`, in the shape of `workbenches/content-plan/plan-2027.md`. It picks moments from a curated list of days with a social movement behind them, so the brand joins a few that fit instead of posting on every "national day".

## Inputs

1. **The brand book.** A file in the shape of `workbenches/brand-dna/brand-book.md`. Look for it in the user's project or files. If there is none, say so, point to `toolkits/02-brand-voice/worksheet.md`, and stop. Never make up a voice, products, customers or facts for the brand.
2. **The master list.** `toolkits/06-content-calendar/2027-social-media-holidays-master-list.md` (or the `.json`). Moments come from this list only.
3. **The rhythm.** Channels, posts a week for each, and the start date. Use what the user gives. If they give nothing, use the channels in the brand book's "Channel by channel" section and the rule-of-thumb starting points in `toolkits/06-content-calendar/README.md`, and say they are a starting point.
4. **Themes.** Two to four, with weights that add up to 100%. Use the user's. If they give none, propose them from the brand book, label them "proposed", and ask the user to confirm.
5. **Anything the brand does** (offers, programmes, causes it supports). Ask for this before scoring; don't assume it.

## Steps

1. **Rhythm.** Fill the Rhythm section. Total the posts a week, and posts a month as total × 4.33, rounded. If the total looks hard to keep for the team size (more than the rule-of-thumb starting point), say so once and suggest a lower number. Use the user's number if they keep it.
2. **Themes.** Fill the Themes section. Check the weights add up to 100%.
3. **Shortlist.** From the master list, shortlist moments whose "Natural fit" or "Markets" match the brand. Skip moments not observed in the brand's market.
4. **Fit test.** Score each shortlisted moment 0, 1 or 2 on: genuine connection, contribute not just post, proof, community would welcome us. Base every score on what the brand book or the user says, and write the reason in Fit test notes. 7 or 8 Join, 5 or 6 Support quietly, 4 or less Skip. Read the entry's "Join only if" line: if the brand doesn't meet it, the decision is Skip, whatever the score.
5. **Dates.** Use the master list's 2027 date. Start planning = start date minus the entry's lead time in weeks. If the list gives no date (for example Earth Overshoot Day), write "date TBC" and when it is announced. Never work out or guess a date yourself.
6. **Month by month.** Moment posts come out of the month's total, not on top of it; theme posts fill the rest.
7. **Ideas.** For each Join, fill the idea block: core idea, why the customer cares, proof, what the brand will do, one version per channel, and the entry's watch out. Each version follows that channel's block in the brand book (opening, closing, sentence length, formatting, emoji) and the limit in `toolkits/06-content-calendar/channel-guide.md`. If a channel has no block in the brand book, say so and don't write that version.
8. **Paste pack.** Dates to add (date, name, organiser link from the master list), one idea prompt per Join (moment, angle, channels, its "join only if" and "watch out"), and the themes with weights.

## Never

- Add a moment that isn't on the master list. If the user asks for one, explain in one line why it isn't there (from the list's "Left out on purpose" section). A brand-owned launch, sale or anniversary goes under Our own dates. A commercial or novelty day the user still wants (Black Friday, a "national coffee day") also goes under Our own dates, labelled as the brand's own choice, never under Moments. Public and religious holidays are left to the calendar's public holiday view.
- Plan brand content for sensitive days (suicide prevention, R U OK? Day, World AIDS Day, violence against women, remembrance days). If asked, say why in one line and suggest, at most, sharing the official organiser's resources without promotion.
- Invent a statistic, number, quote, testimonial, partner or award. Put `[number]` or `[source needed]` where proof is missing, and list what to collect.
- Present a rule of thumb (cadence, thresholds, lead times, how many moments) as research.
- Recommend any product, tool or service. Write the plan and nothing else.

## Output

Write or update `plan-2027.md` with the template's headings, exactly as they are. Then reply with:

- One line: posts a week, number of moments joined and supported quietly.
- What's missing before it can run (proof to collect, themes or channels to confirm).

## Example

Brand book: `workbenches/examples/kopi-corner/brand-book.md` (fictional). Finished plan: `workbenches/examples/kopi-corner/plan-2027.md`. Test cases with expected results: `evals/evals.json`.
