import sys, datetime; sys.path.insert(0, '.')
from common import *
wb = Workbook()
CAL = "https://mavic.crisp.help/en/category/calendar-and-publishing-8tz47n/"
FORMATS = ["Teach", "Proof", "Short video", "Behind the scenes", "Offer"]
CHANNELS = ["Instagram", "LinkedIn", "Facebook", "TikTok", "X", "Threads", "Email", "Blog"]
PATTERNS = ["Contrarian", "List", "Personal story", "Surprising fact", "Question"]

ws = wb.active; ws.title = "How to use"
r = header(ws, "30-Day Content Calendar", "Plan a month in one sitting: one theme, a mix with a job for every post, and 30 hooks instead of 30 posts.", [4, 92])
r = section(ws, r, "Four steps, one afternoon", 2)
for n, t in [("1", "Month setup: pick one theme for the month and decide how many posts a week you can keep up. Consistency beats volume."),
             ("2", "Mix: give every post a job (teach, prove, reach, show the people, sell). The starter mix is a starting point, not a rule."),
             ("3", "Hooks: write one or two lines per post, not the whole post. Pick a hook pattern for each so the month does not sound the same every day."),
             ("4", "Generate, approve, schedule. Then at month end, review what worked and plan month two in the same sitting.")]:
    ws.cell(r, 1, n).font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); ws.cell(r, 2).alignment = Alignment(wrap_text=True); r += 1
r += 1
r = legend(ws, r)
footer(ws, r, "Use the prompts on the Prompts sheet in a Mavic chat. Posts land on the Calendar as drafts; nothing publishes until you approve it. Calendar > Export gives you the plan back as a spreadsheet.", CAL)

ws = wb.create_sheet("1 Month setup")
r = header(ws, "1. Month setup", "One theme, one cadence, one mix.", [30, 26, 16, 16, 40])
for label, val, note in [("First day of the month", datetime.date(2026, 12, 1), "Dates on the Hooks sheet follow from this"),
                         ("Theme for the month", "", "One loose container for the whole month"),
                         ("Theme type", "", "Pick from the list"),
                         ("Main channels", "", "Two at most to start"),
                         ("Posts per week you can sustain", 4, "Pick what you can keep for three months"),
                         ("What success looks like this month", "", "Something you control, e.g. publish every planned post")]:
    ws.cell(r, 1, label).font = font(bold=True)
    c = ws.cell(r, 2, val); c.fill = INPUT; c.border = BOX; c.font = font()
    if isinstance(val, datetime.date): c.number_format = "ddd d mmm yyyy"
    ws.cell(r, 5, note).font = font(size=9, color=GREY)
    r += 1
dv_list(ws, ["Customer stories", "Behind the build", "One trend a week", "A launch", "Teach one idea in four parts"], "B7")
r += 1
r = section(ws, r, "Content mix (posts per week)", 5)
r = table_head(ws, r, ["Format", "Its job", "Posts per week", "Share of mix", "Example"])
mix_start = r
for f, job, n, ex in [("Teach", "Earns saves and follows", 1, "A 5-slide carousel: three mistakes we see in [topic]"),
                      ("Proof", "Earns trust", 1, "A customer quote and the result in their words"),
                      ("Short video", "Reaches new people", 1, "30 seconds: one tip, shown not told"),
                      ("Behind the scenes", "Shows the people", 0.5, "How we packed 200 orders on launch day"),
                      ("Offer", "Asks for the sale", 0.5, "The product, the price, the deadline")]:
    ws.cell(r, 1, f).font = font(bold=True); ws.cell(r, 2, job).font = font()
    c = ws.cell(r, 3, n); c.fill = INPUT; c.border = BOX; c.font = font()
    ws.cell(r, 4, f"=IF($C${mix_start+5}=0,\"\",C{r}/$C${mix_start+5})").number_format = "0%"
    ws.cell(r, 5, ex).font = font(size=9, color=GREY)
    r += 1
ws.cell(r, 1, "Total").font = font(bold=True)
ws.cell(r, 3, f"=SUM(C{mix_start}:C{r-1})").font = font(bold=True)
ws.cell(r, 5, f'=IF(C{r}=B9,"Matches your cadence",IF(C{r}>B9,"More than you said you can sustain","Room for "&TEXT(B9-C{r},"0.#")&" more a week"))').font = font(bold=True, color=TEAL)
r += 2
ws.cell(r, 1, "The starter mix is our rule of thumb for a small team posting about four times a week. Change it once you have a month of your own results.").font = font(size=8, italic=True, color=GREY)

ws = wb.create_sheet("2 Hooks")
r = header(ws, "2. Hooks", "Write hooks, not posts: one or two lines each. Mark the days you will post.", [6, 14, 8, 10, 14, 18, 18, 52, 30, 14])
ws.cell(r, 1, "Planned posts").font = font(bold=True)
ws.cell(r, 3, '=COUNTIF(D9:D38,"Yes")').font = font(bold=True)
ws.cell(r, 5, "By format:").font = font(bold=True)
for i, f in enumerate(FORMATS):
    ws.cell(r, 6 + i if i < 5 else 6, None)
ws.cell(r, 6, '="Teach "&COUNTIFS(F9:F38,"Teach",D9:D38,"Yes")&" · Proof "&COUNTIFS(F9:F38,"Proof",D9:D38,"Yes")&" · Video "&COUNTIFS(F9:F38,"Short video",D9:D38,"Yes")&" · BTS "&COUNTIFS(F9:F38,"Behind the scenes",D9:D38,"Yes")&" · Offer "&COUNTIFS(F9:F38,"Offer",D9:D38,"Yes")').font = font(color=TEAL, bold=True)
r += 1
ws.cell(r, 1, "Example").font = font(size=9, italic=True, color=GREY)
r += 1
r = table_head(ws, r, ["Day", "Date", "Day of week", "Post?", "Channel", "Format", "Hook pattern", "Hook (one or two lines)", "Notes", "Status"])
ex_row = r
r = row(ws, r, ["", "", "", "Yes", "LinkedIn", "Teach", "Contrarian", "Posting every day is why your content sounds tired. Here is the four-a-week mix we use instead.", "Carousel, 5 slides", "Idea"], example=True)
assert r == 9, r
for d in range(1, 31):
    vals = [d, f"='1 Month setup'!$B$5+A{r}-1", f'=TEXT(B{r},"ddd")', "", "", "", "", "", "", "Idea"]
    r = row(ws, r, vals, inputs=(4, 5, 6, 7, 8, 9, 10))
    ws.cell(r - 1, 2).number_format = "d mmm"
dv_list(ws, ["Yes", "No"], "D9:D38")
dv_list(ws, CHANNELS, "E9:E38")
dv_list(ws, FORMATS, "F9:F38")
dv_list(ws, PATTERNS, "G9:G38")
dv_list(ws, ["Idea", "Draft", "Scheduled", "Published"], "J9:J38")
r += 1
r = section(ws, r, "Hook patterns", 2)
for p, ex in [("Contrarian", "Say the common belief, then why you do the opposite."), ("List", "A number and a promise: five things we cut from our launch."),
              ("Personal story", "A near miss or a hard call, and what it taught you."), ("Surprising fact", "One sourced number and what changed because of it."),
              ("Question", "Why does [common problem] still happen?")]:
    ws.cell(r, 1, p).font = font(bold=True); ws.cell(r, 3, ex).font = font(size=9); r += 1

ws = wb.create_sheet("3 Prompts")
r = header(ws, "3. Prompts", "Copy into a Mavic chat. Replace the brackets; the @ items pull in what you have saved in Brand DNA.", [100])
for title, body in [
 ("Turn your hooks into posts", "Here are [number] hooks for this month's theme, [theme]. Each row has a date, channel and format. For each hook, write the full post for that channel and format, written for @[Customer profile], in @[Writing style]. Number every post. For carousels and short videos, add one line of image or shot direction."),
 ("Adapt your best post", "Take this LinkedIn post: [paste]. Turn it into a 5-slide Instagram carousel, a 30-second short video script and a 150-word email with a subject line. Keep the core point. Use @[Instagram writing style] and @[Email writing style] for those versions."),
 ("Make it a weekly habit", "Set up a recurring task: every [Monday], draft the coming week's posts from the hooks in my plan and add them to the Calendar as drafts for my approval."),
 ("Month-end review", "Here are last month's posts with reach, engagements and saves: [paste]. Which formats and topics did best and worst, and what should I keep, change or drop next month? Show your reasoning.")]:
    ws.cell(r, 1, title).font = font(bold=True, color=PINK); r += 1
    c = ws.cell(r, 1, body); c.font = font(); c.alignment = Alignment(wrap_text=True); c.fill = SUB; c.border = BOX
    ws.row_dimensions[r].height = 48; r += 2
footer(ws, r, "Recurring tasks are managed under Advanced > Tasks. Every draft waits on the Calendar until you approve it.", CAL)

ws = wb.create_sheet("4 Month-end review")
r = header(ws, "4. Month-end review", "30 minutes at month end. Keep what worked, drop what didn't, change one thing.", [12, 14, 16, 12, 14, 14, 16, 14])
r = table_head(ws, r, ["Date", "Channel", "Format", "Reach", "Engagements", "Saves and shares", "Engagement rate", "Verdict"])
first = r
r = row(ws, r, ["3 Dec", "LinkedIn", "Teach", 2400, 96, 31, "=IF(D6>0,E6/D6,\"\")", "Keep"], example=True)
ws.cell(first, 7).number_format = "0.0%"
for _ in range(30):
    r = row(ws, r, ["", "", "", "", "", "", f'=IF(N(D{r})>0,E{r}/D{r},"")', ""], inputs=(1, 2, 3, 4, 5, 6, 8))
    ws.cell(r - 1, 7).number_format = "0.0%"
dv_list(ws, FORMATS, f"C7:C{r-1}")
dv_list(ws, ["Keep", "Change", "Drop"], f"H7:H{r-1}")
r += 1
ws.cell(r, 1, "Engagement rate here = engagements divided by reach. Platforms define both differently, so compare a channel with itself, not across channels.").font = font(size=8, italic=True, color=GREY)
r += 2
r = section(ws, r, "Three patterns this month", 2)
for q in ["Which format earned the most saves and shares?", "Which topic or hook pattern beat the rest?", "What will you drop next month?"]:
    ws.cell(r, 1, q).font = font(bold=True)
    c = ws.cell(r, 4, ""); c.fill = INPUT; c.border = BOX
    ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=8); r += 1

for s in wb.worksheets:
    s.page_setup.orientation = "landscape"; s.page_setup.fitToWidth = 1
wb.save("/mnt/user-data/outputs/toolkits/Mavic_30-Day_Content_Calendar_v2.xlsx")
print("saved")
