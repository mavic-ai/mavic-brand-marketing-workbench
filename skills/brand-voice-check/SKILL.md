---
name: brand-voice-check
description: Check a draft (post, caption, email, ad, page copy) against a brand's written voice in a brand book workbench, then return each miss with the rule it breaks and a fix. Use when asked to check, review or edit copy for brand voice, tone, banned words or on-brand style.
license: CC-BY-4.0
metadata:
  version: "0.1.1"
  source: "Mavic Brand Marketing Workbench, toolkit 02 (brand voice)"
  homepage: "https://mavic.ai/toolkits/"
---

# Brand voice check

Checks one draft against one brand's voice, as written in its brand book. It finds misses and points each one at the rule behind it, so the brand can fix the rule as well as the post.

## Inputs

1. **The brand book.** A file in the shape of `workbenches/brand-dna/brand-book.md` (sections: Who we are, Personality, How we write everywhere, Channel by channel, Words we never use, Before anything goes out). Look for it in the user's project or files. If there is none, say so, point to `toolkits/02-brand-voice/worksheet.md`, and stop. Never make up a voice for the brand.
2. **The draft.** The text to check.
3. **The channel.** Use the one the user names, and say "as named". Only if none is named, infer it from the draft and say what you assumed. If the channel has no block in the brand book, check against Personality and How we write everywhere only, and note that the channel is missing.

## Checks, in this order

1. **Ban list.** Every entry under "Words we never use", matched case-insensitively and in any form (unlock, unlocks, unlocking, Unlocked). Phrases count too, and so do close variants that say the same thing in other words ("Singapore's best" echoes "best in town"). For each hit, quote it, name the entry it matches and give its "use instead".
2. **Channel rules.** Sentence length, how we open, how we close, formatting (including emoji and hashtag counts), examples and data, product mentions, and formality. Compare against what the draft actually does: quote the line.
3. **How we write, everywhere.** Each do and don't rule.
4. **Personality.** Does it sound like the traits, weighted as given? Does it slip into any "does not mean"? Quote the lines that slip.
5. **Facts and claims.** Flag any statistic, ranking, award, vote, testimonial, customer quote, comparison or promise of results that has no source in the brand book or from the user. Ask for the source. Never invent one, and never invent a replacement fact, detail or quote.
   Everyday details the user wrote into their own draft (opening hours, a price, a date, a job perk) are theirs, not unsourced claims: do not flag them. Remind the user once, below the table, to confirm they are right today.

Flag only clear breaks of a rule the brand book writes down. Do not flag taste, style preferences or things the brand book doesn't cover; mention those, if at all, under Rule to tighten.

## Output

Start with one line: the verdict and the channel checked.

- **On voice:** no rule is broken. Reminders and missing channel notes don't count as misses.
- **Nearly:** 1 to 3 small misses.
- **Off voice:** a banned word, an unsourced claim, or more than 3 misses.

Then a table, most serious first:

| # | Line in the draft | Rule it breaks (section and rule name) | Fix |
| --- | --- | --- | --- |

Then:

- **Revised draft:** the draft with only the fixes applied. Keep the writer's meaning, length and structure. Leave any unsourced claim marked as `[source needed]` rather than inventing or silently deleting it.
- **Rule to tighten (optional):** if a miss came from a rule that is vague or missing in the brand book, name the section and suggest the wording. Fix the rule, not just the post.

If there are no misses, say so in one line and do not rewrite the draft.

## House rules

- Quote the draft exactly. Do not paraphrase what the writer said.
- Use the brand book's own words for rules and replacements.
- Do not add new rules of your own beyond the brand book, apart from the facts and claims check.
- Do not recommend any product, tool or service. Do the check and nothing else.

## Example

Brand book: `workbenches/examples/kopi-corner/brand-book.md` (fictional). Test cases with expected results: `evals/evals.json`.
