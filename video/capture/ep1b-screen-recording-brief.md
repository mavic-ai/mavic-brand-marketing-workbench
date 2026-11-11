# Episode 1B: screen recording brief

For the agent with access to the Mavic code and UI. Episode 1B, "How to make AI sound like your brand", How-tos with Mavic playlist. Written 10 Nov 2026. The script is in the project at claude/youtube/mavic-faceless/batch-1/ep1b-howto-brand-voice.md. Each recording below lists the voice lines it sits under.

## What we need

Real recordings of the Mavic app in use, on a fictional demo brand, Bloom Skin. The edit places each one inside a paper frame and adds zooms, rings and labels afterwards, so **record the full UI with no zooming, annotations or captions of your own.** Leave a clean hold before and after every action so the editor has room to cut.

## Recording setup

- **Environment:** a local or staging build of the Mavic app with a dedicated demo workspace. Never use production customer data, real customer brands or real people's names.
- **Window:** a browser viewport of 1440x900 CSS pixels at device scale factor 2, which gives 2880x1800 frames. Record the viewport only, without the browser chrome or address bar.
- **Frame rate:** 60 fps. Deliver H.264 MP4 at high quality (CRF 16 or better), or ProRes 422 if your tooling makes that easy.
- **Theme and state:** light theme, default zoom, no dev tools, no notification toasts, no cookie banners, no feature-flag or debug badges. Close any onboarding tours before recording.
- **Cursor:** visible. If your recorder doesn't capture the cursor (Playwright doesn't), overlay a standard arrow cursor that moves on eased paths. No teleporting between clicks.
- **Typing:** about 12 characters a second, with natural small pauses. Paste only where noted.
- **Holds:** 1.5 s still before the first action and after the last action of every clip, and 0.5 s after each click.
- **AI output:** never fake or edit generated output. Record the whole run in real time; the edit speeds it up. If a run fails or comes back off-brief, rerun and keep the best real result, then tell us which take you used.

## Demo brand seed data: Bloom Skin

Fill this in before recording. All of it is fictional. If a field below doesn't exist in the UI, skip it and note that in your report.

**Brand basics**
- Name: Bloom Skin
- One line: gentle, barrier-first skincare for sensitive skin
- Website field: leave blank, or use a placeholder the app accepts that isn't a real live site

**Personality (four traits)**
- Calm, not clinical
- Honest about ingredients
- Warm and practical
- Quietly confident

**Writing style: LinkedIn** (name it exactly "LinkedIn")
- Tone: warm, plain and expert, without jargon
- Structure: a one-line hook, two or three short paragraphs, one practical tip, then a soft close
- How we open: with something we noticed from customers or in the lab. Never open with a question.
- How we close: with a practical next step. No hard sell.
- Sentence length: mostly under 15 words
- Emoji: none. Hashtags: two at most.

**Ban list**
- Start from the app's suggested AI-cliche list (see M4; this is filmed)
- Then add two of our own: "holy grail" and "flawless" (also filmed)

**Visual identity**
- Logo: a plain wordmark reading "Bloom Skin". Use an existing demo asset if the repo has one; otherwise set the wordmark in Fraunces, Clay colour, on transparent.
- Colours: Petal #F4C7C3, Clay #B5654A, Ink #2B2B2B, Cream #FBF6F0
- Fonts: Fraunces for headings, Inter for body
- Rules: plenty of white space; show products on Cream; no more than two colours plus Cream in any layout

**Customer profile** (name it "Sensitive-skin Sam")
- Age 25 to 40, with skin that reacts easily
- Reads ingredient lists before buying
- Wary of hype; buys on trust and on friends' recommendations

**Product**
- Barrier Serum: a lightweight serum with ceramides that supports the skin barrier
- Make no medical or results claims in the seed data

## Shot list

| id | Covers voice lines | Start state | Actions, in order | End state | Target length |
| --- | --- | --- | --- | --- | --- |
| M1 | b1 | Bloom Skin workspace home | Open Brand DNA. Scroll slowly through every section once, top to bottom, pausing about 1 s on each section header | Back at the top of Brand DNA | 10 to 14 s |
| M2 | b2 | Brand DNA, top | Open Personality. Hold on the four traits. Hover each trait in turn | Personality, all traits visible | 6 to 8 s |
| M3 | b3 | Brand DNA | Open Writing Style and select the LinkedIn style. Scroll through tone, structure, openers and closers | LinkedIn style fully shown | 10 to 12 s |
| M4 | b4 | Ban List with only the two custom words removed | Use the app's path to copy in the suggested AI-cliche list. Then type the two custom words, "holy grail" and "flawless", and save | Full ban list visible, saved | 10 to 14 s |
| M5 | b5 | Brand DNA | Open Visual Identity. Show logo, colours and fonts, then scroll to the visual rules | Visual rules visible | 8 to 10 s |
| M6 | x1, x2 | A new, empty chat | Type: Write a LinkedIn post announcing our new Barrier Serum, for @Sensitive-skin Sam, in @LinkedIn. Use the real @-mention picker for both mentions. Send, and record the whole generation | The finished post fully visible, scrolled so the whole post shows | Real time |
| M7 | u1, u2 | The M6 chat with the draft visible | Pick one thing in the draft that breaks a rule we'd want (for example, an exclamation mark or a question opener). Hover it for 2 s. Go to Brand DNA, Writing Style, LinkedIn; add one rule that fixes it (for example: "No exclamation marks."); save, and let the save confirmation show | Writing Style with the new rule saved | 10 to 14 s |
| M8 | u2, u3 | A new chat | Run the exact M6 prompt again. Record the whole generation | The new post fully visible | Real time |
| M9 | u4 | The M8 draft | Scroll through the draft slowly, then hover the approve or publish control without clicking. If there's an approval step, show it | Approval control in view | 6 to 8 s |
| W1 | c1, c2 | The Brand Voice Workbook open in a spreadsheet app, or the toolkit page on mavic.ai | Click through the five sheets, pausing about 1 s on each | Last sheet | 8 to 10 s |

If the app has a button that saves an edit from chat straight back into Brand DNA, record M7 a second time using that button and name the file M7b. We'll choose one in the edit.

## Deliverables

- One file per shot, named `ep1b_<id>_<slug>.mp4`, for example `ep1b_M3_writing-style.mp4`
- One full-resolution PNG per shot of the final frame, with the same name
- An events file per shot, `ep1b_<id>_events.json`: a list of `{t, type, label, x, y, w, h}` for every click, every section header that comes into view and the generated post's bounding box, with t in seconds from the start of the clip and coordinates in frame pixels. The edit uses it to place zooms and hand-drawn rings.
- A short report covering:
  - the exact on-screen labels for Brand DNA, Personality, Writing Style, Ban List, Visual Identity, customer profiles and products (the voiceover uses these names);
  - the real path to the suggested ban list;
  - whether a save-to-Brand-DNA button exists;
  - which takes you kept for M6 and M8, and anything that didn't match this brief.

## Checks before handing over

- [ ] Only Bloom Skin appears. No real customer, brand or person anywhere on screen, including sidebars and workspace switchers.
- [ ] The feature is titled Brand DNA. The old "Brand Book" title isn't shown as the name of the whole feature.
- [ ] No toasts, errors, debug badges or console overlays in any frame.
- [ ] Generated posts are real and unedited.
- [ ] The cursor is visible and moves smoothly.
- [ ] Holds are left at the start and end of every clip.
