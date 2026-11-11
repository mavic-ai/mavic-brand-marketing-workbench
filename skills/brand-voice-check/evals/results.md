# Eval results: brand-voice-check

Cases: `evals.json` (8 cases on the fictional Kopi Corner brand book).
How each run works: the skill, the brand book and one draft go to a fresh session with read-only file access. A case passes when every `must_flag` item is flagged, nothing in `must_not_flag` is flagged, nothing in `must_not_do` happens, and the verdict matches. Outputs were graded by hand against `evals.json`.

| Date | Skill version | Model | Tool | Passed | Notes |
| --- | --- | --- | --- | --- | --- |
| 12 Nov 2026 | 0.1.0 (first draft) | claude-sonnet-5-5 | Claude Code 2.1.322 | 7 of 8 | kc-07: verdict "Nearly" instead of "On voice" (flagged a missing place, which the brand book doesn't require) |
| 12 Nov 2026 | 0.1.0 (first draft) | claude-haiku-5-5 | Claude Code 2.1.322 | 5 of 8 | kc-01 and kc-07: flagged things no written rule covers, and treated the user's own hours and perks as unsourced claims. kc-06: caught "Singapore's best" as vague praise but didn't tie it to the banned "best in town" |
| 12 Nov 2026 | 0.1.1 | claude-sonnet-5-5 | Claude Code 2.1.322 | 8 of 8 | |
| 12 Nov 2026 | 0.1.1 | claude-haiku-5-5 | Claude Code 2.1.322 | 8 of 8 | |

## What changed between 0.1.0 and 0.1.1

Fixed the rules, not the tests:

- Flag only clear breaks of a rule the brand book writes down; taste goes under Rule to tighten.
- The user's own everyday details (hours, prices, dates, perks) are not unsourced claims; remind them to confirm instead.
- Close variants of a banned phrase count ("Singapore's best" echoes "best in town").
- Clear verdict definitions (On voice, Nearly, Off voice).
- Say "as named" when the user names the channel (both models sometimes said they had assumed it).

Full 0.1.1 outputs: `runs/2026-11-12/`.

## Noticed while testing

Both models pointed out that the Kopi Corner brand book's Instagram rule ("1 or 2 emoji") and the general Emoji rule ("2 at most") disagree on whether zero emoji is fine. A good catch, left in the example as a teaching point.

Found a case that fails on your model? Open an issue with the model, the date and what came back.
