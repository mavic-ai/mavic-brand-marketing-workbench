"""Toolkit 06 v3 (12 Nov 2026): Master List of 2027 Social Media Holidays + Content Planner.
Replaces the 30-Day Content Calendar v2. Rhythm builder, channel adaptation, the curated 2027 list, a fit test,
a 2027 plan that builds itself, and a Paste-into-Mavic sheet.
Run: python3 planner.py [out.xlsx]   then recalculate in LibreOffice so formulas carry cached values."""
import sys, os, datetime as dt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
from openpyxl.styles import Alignment
from openpyxl.worksheet.formula import ArrayFormula
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'social_holidays_2027.py')
exec(open(DATA).read())
OUT = sys.argv[1] if len(sys.argv) > 1 else "2027-social-media-holidays-planner.xlsx"
V = "Version 3.0.1  ·  15 Nov 2026  ·  dates checked 15 Nov 2026  ·  mavic.ai/toolkits"
UTM = "?utm_source=toolkit&utm_medium=xlsx&utm_campaign=social_holidays_2027"
CTA = "https://mavic.ai/" + UTM + "&utm_content=cta"
HUB = "https://mavic.ai/toolkits/" + UTM + "&utm_content=hub"
GH = "https://github.com/mavic-ai/mavic-brand-marketing-workbench/tree/main/toolkits/06-content-calendar"
HC = "https://mavic.crisp.help/en/article/"
WRAP = Alignment(wrap_text=True, vertical="top")
SUG = PatternFill("solid", fgColor="EEF7F6")
MON = ['January','February','March','April','May','June','July','August','September','October','November','December']

def note(ws, r, text, col=1, **k):
    c = ws.cell(r, col, text); c.font = font(size=9, **k); return r + 1
def link(ws, r, text, url, col=1):
    c = ws.cell(r, col, text); c.font = font(size=9, color=TEAL, underline="single"); c.hyperlink = url; return r + 1
def calc(ws, r, col, f, **k):
    c = ws.cell(r, col, f); c.font = font(size=9, color=GREY, **k); c.fill = SUG; c.border = BOX; c.alignment = WRAP; return c
def dd(ws, cells, source, strict=False):
    dv = DataValidation(type="list", formula1=source, allow_blank=True); dv.showErrorMessage = strict
    if not strict: dv.showInputMessage = True; dv.promptTitle = "Pick or type"; dv.prompt = "Pick from the list, or type your own."
    ws.add_data_validation(dv)
    for c in cells: dv.add(c)
def bullets(ws, r, items):
    for t in items:
        ws.cell(r, 1, "·").font = font(bold=True, color=PINK); c = ws.cell(r, 2, t); c.font = font(); c.alignment = WRAP; r += 1
    return r + 1

wb = Workbook(); ws0 = wb.active; ws0.title = "How to use"

# ======================================================= Presets (built first, moved to the end)
pr = wb.create_sheet("Presets")
pr.sheet_view.showGridLines = False
for col, w in zip("ABCDEFGH", [16, 12, 40, 30, 36, 28, 24, 30]): pr.column_dimensions[col].width = w
pr["A1"] = "Presets"; pr["A1"].font = font(size=18, bold=True, color=NAVY)
pr["A2"] = "The lists behind the dropdowns. Character limits come from Mavic's Help Centre (checked 12 Nov 2026); everything else here is a rule of thumb, not a platform rule."
pr["A2"].font = font(size=10, color=GREY); pr["A3"] = V; pr["A3"].font = font(size=8, color=GREY)
r = 5
pr.cell(r, 1, "Channels").font = font(size=12, bold=True, color=PINK); r += 1
r = table_head(pr, r, ["Channel", "Character limit", "What tends to work (rule of thumb)", "How to open", "Links and calls to action", "Visual", "Hashtags", "Starting cadence (rule of thumb)"])
CHANNELS = [
 ("X", 280, "One sharp take or a fact people want to repeat. Threads of short posts for more.", "Lead with the point, no warm-up.", "Links are fine; one per post.", "Optional image; 16:9 or 1:1", "0 to 2", "3 to 7 a week"),
 ("Threads", 500, "Conversation. Ask something real and answer replies.", "A line that invites a reply.", "Put the link last.", "Optional image or carousel", "1 topic tag", "3 to 5 a week"),
 ("Bluesky", 300, "Short, plain, human. Communities around topics.", "Say the thing.", "Links fine.", "Optional image", "0 to 2", "3 to 5 a week"),
 ("LinkedIn", 3000, "Proof and lessons: what you did, what you learned, with a number.", "First line must earn the 'see more' click.", "Links in the post can reduce reach; test a comment link.", "Document carousel or one image", "0 to 3", "2 to 3 a week"),
 ("Instagram", 2200, "The picture or video does the work; the caption adds the story.", "Hook in the first line and on the cover.", "Captions aren't clickable: 'link in bio'.", "4:5 feed, 9:16 Reels and Stories", "3 to 5", "3 to 5 posts + Stories"),
 ("Facebook", 63206, "Community and local news; events.", "Only about 80 characters show before 'see more'.", "Links fine.", "1:1 or 4:5 image, video", "0 to 2", "2 to 4 a week"),
 ("TikTok", 2200, "Short video with a hook in the first seconds; people over polish.", "Hook on screen and in the first words.", "No clickable caption links.", "9:16 video", "3 to 5", "3 to 5 a week"),
]
CH0 = r
for c in CHANNELS: r = row(pr, r, list(c))
CH1 = r - 1; CHR = f"Presets!$A${CH0}:$H${CH1}"; CHL = f"Presets!$A${CH0}:$A${CH1}"
r = note(pr, r, "Limits from Mavic Help Centre, 'Editing captions per platform' (X: 280 on the free plan, higher on paid plans; Facebook shows about 80 characters before 'see more').", color=GREY)
r = link(pr, r, "Editing captions per platform (Mavic Help Centre)", HC + "editing-captions-per-platform-1jihvy9/"); r += 1
pr.cell(r, 1, "Team size").font = font(size=12, bold=True, color=PINK); r += 1
r = table_head(pr, r, ["Team size", "Channels to start", "Posts a week, all channels", "Why"])
TEAM = [("Solo", 2, 3, "Pick what you can keep for 12 weeks; you can add later."),
        ("Small team", 3, 5, "One person owns the calendar; others feed ideas."),
        ("Marketing team", 4, 10, "Channel owners, one shared calendar, weekly review.")]
T0 = r
for t in TEAM: r = row(pr, r, list(t))
TR = f"Presets!$A${T0}:$D${r-1}"; TRL = f"Presets!$A${T0}:$A${r-1}"
r = note(pr, r, "Rules of thumb. Consistency you can keep beats bursts you can't.", color=GREY); r += 1
pr.cell(r, 1, "Decisions").font = font(size=12, bold=True, color=PINK); r += 1
D0 = r
for d in ["Join", "Support quietly", "Skip"]: pr.cell(r, 1, d).font = font(); r += 1
DL = f"Presets!$A${D0}:$A${r-1}"

# ======================================================= How to use
ws = ws0
r = header(ws, "Master List of 2027 Social Media Holidays + Content Planner", "Post regularly, adapt every idea for each channel, and plan 2027 around the moments people already care about.", [4, 100], V)
r = section(ws, r, "Three steps, about an hour", 2)
for n, t in [("1", "Your rhythm (sheet 1): pick the channels and the number of posts a week you can keep for 12 weeks, and your content themes. (15 min)"),
             ("2", "One idea, every channel (sheet 2): write one idea, then a version for each channel within its limits. (15 min)"),
             ("3", "Your 2027 moments (sheets 3 and 4): go through the master list, run the fit test on the ones that tempt you, and mark Join, Support quietly or Skip. (20 min)"),
             ("4", "Your 2027 plan (sheet 5) builds itself, and sheet 6 gives you the text to paste into Mavic. (10 min)")]:
    ws.cell(r, 1, n).font = font(bold=True, color=PINK); c = ws.cell(r, 2, t); c.font = font(); c.alignment = WRAP; r += 1
r += 1
r = section(ws, r, "Why this list is short", 2)
r = bullets(ws, r, [
 "Most social media holiday lists give you 365 days, most of them invented. This one keeps only moments with a social movement behind them.",
 "Every moment passed four tests: a named organiser runs it, people take part beyond brand posts (for 3 years or more), there is a clear ask, and it is observed in at least one of Singapore, the Philippines, Australia, New Zealand or the United States.",
 "Left out on purpose: sensitive days (such as suicide prevention), brand-made sales days (such as Black Friday and 11.11), novelty days, and public and religious holidays (Mavic's Calendar shows those for each country in its Holidays panel).",
 "A brand should join few, not many. Four to ten a year is plenty for most (rule of thumb). Joining a movement you have no part in reads as noise, or worse."])
r = section(ws, r, "Why posting regularly matters", 2)
r = bullets(ws, r, [
 "Feeds rank posts by what people engage with. You can't be engaged with if you aren't there, so pick a rhythm you can keep, then keep it.",
 "Each channel is a different room with its own rules: length, how links work, what people stop for. One idea, adapted, beats the same post pasted everywhere."])
r = section(ws, r, "Rules of thumb, not research", 2)
c = ws.cell(r, 2, "Cadences, team-size presets and the 'what tends to work' notes are our starting points, not findings. Character limits are from Mavic's Help Centre, checked 12 Nov 2026. Moment dates were checked against each organiser or the UN's list on 12 Nov 2026; themes and some dates are announced during the year, so re-check before you post."); c.font = font(); c.alignment = WRAP; r += 2
note(ws, r, "Yellow: yours to fill in. Pale teal: worked out for you. Grey italic rows: examples for a fictional Singapore coffee shop, Kopi Corner.", 2, italic=True, color=GREY); r += 1
link(ws, r, "Get the list as a calendar file (.ics), JSON or Markdown for your AI tools (GitHub)", GH, 2); r += 1
link(ws, r, "More free toolkits at mavic.ai/toolkits", HUB, 2); r += 2
ws.cell(r, 2, "Do it in Mavic").font = font(bold=True, color=TEAL); r += 1
c = ws.cell(r, 2, "Sheet 6 gives you three blocks of text to paste into a Mavic chat: your chosen moments (\"Add these holidays to my calendar\"), an ideas prompt for each moment, and your themes. Drag ideas onto dates in the Calendar, choose Create content, turn on Customize per channel, and schedule. Nothing posts until you approve it."); c.font = font(size=9); c.alignment = WRAP; r += 1
link(ws, r, "Calendar (Mavic Help Centre)", HC + "calendar-1k88zg/", 2); r += 1
link(ws, r, "Try it on your own brand at mavic.ai", CTA, 2)

# ======================================================= 1 Your rhythm
ws = wb.create_sheet("1 Your rhythm", 1)
r = header(ws, "1. Your rhythm", "Channels and a weekly number you can keep for 12 weeks. Start small; add later.", [30, 18, 18, 30, 40, 16], V)
r = section(ws, r, "Start", 6)
ws.cell(r, 1, "Team size").font = font(bold=True); c = ws.cell(r, 2, ""); c.fill = INPUT; c.border = BOX; TEAMC = f"B{r}"
dd(ws, [TEAMC], TRL, strict=True)
calc(ws, r, 4, f'=IF({TEAMC}="","Pick a team size for a suggested start","Suggested: "&VLOOKUP({TEAMC},{TR},2,FALSE)&" channels, "&VLOOKUP({TEAMC},{TR},3,FALSE)&" posts a week in total. "&VLOOKUP({TEAMC},{TR},4,FALSE))')
ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=6); ws.row_dimensions[r].height = 30; r += 1
ws.cell(r, 1, "First week starts (Monday)").font = font(bold=True); c = ws.cell(r, 2, dt.date(2027, 1, 4)); c.fill = INPUT; c.border = BOX; c.number_format = "ddd d mmm yyyy"; STARTC = f"B{r}"; r += 2
r = section(ws, r, "Channels", 6)
r = table_head(ws, r, ["Channel (pick)", "Posts a week", "Character limit", "What tends to work (rule of thumb)", "Its job for you (one line)", ""])
r = row(ws, r, ["Instagram", 3, 2200, "The picture or video does the work; the caption adds the story.", "Show the kopi and the regulars", ""], example=True)
C0 = r
for _ in range(5):
    r = row(ws, r, ["", "", "", "", "", ""], inputs=(1, 2, 5)); i = r - 1
    calc(ws, i, 3, f'=IF(A{i}="","",IFERROR(VLOOKUP(A{i},{CHR},2,FALSE),"Check the platform"))')
    calc(ws, i, 4, f'=IF(A{i}="","",IFERROR(VLOOKUP(A{i},{CHR},3,FALSE),""))'); ws.row_dimensions[i].height = 30
C1 = r - 1
dd(ws, [f"A{i}" for i in range(C0, C1 + 1)], CHL)
ws.cell(r, 1, "Posts a week, all channels").font = font(bold=True); TOT = f"B{r}"
ws.cell(r, 2, f"=SUM(B{C0}:B{C1})").font = font(bold=True)
calc(ws, r, 4, f'=IF({TOT}=0,"Add your channels",IF({TEAMC}="","",IF({TOT}>VLOOKUP({TEAMC},{TR},3,FALSE)*1.5,"That is a lot for a "&LOWER({TEAMC})&". Could you keep it up for 12 weeks?","Looks sustainable. Keep it for 12 weeks before you add more.")))')
ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=6); r += 2
r = section(ws, r, "Content themes: 2 to 4, with weights that add up to 100% (rule of thumb)", 6)
r = table_head(ws, r, ["Theme", "Weight %", "Posts a week (worked out)", "One-line description", "Example idea", ""])
r = row(ws, r, ["The craft", 40, 2, "How we make kopi the slow way", "60 seconds on why we pull the sock filter by hand", ""], example=True)
TH0 = r
for _ in range(4):
    r = row(ws, r, ["", "", "", "", "", ""], inputs=(1, 2, 4, 5)); i = r - 1
    calc(ws, i, 3, f'=IF(OR(A{i}="",B{i}=""),"",ROUND({TOT}*B{i}/100,1))')
TH1 = r - 1
ws.cell(r, 1, "Total weight").font = font(bold=True); ws.cell(r, 2, f"=SUM(B{TH0}:B{TH1})").font = font(bold=True)
calc(ws, r, 4, f'=IF(SUM(B{TH0}:B{TH1})=0,"",IF(SUM(B{TH0}:B{TH1})=100,"Adds up to 100%","Make the weights add up to 100%"))'); r += 2
r = section(ws, r, "Your next 12 weeks", 6)
r = table_head(ws, r, ["Week", "Week of", "Posts planned", "Tick when every planned post went out", "Notes", ""])
for w in range(12):
    r = row(ws, r, [f"Week {w+1}", f"={STARTC}+{7*w}", f"={TOT}", "", "", ""], inputs=(4, 5))
    ws.cell(r - 1, 2).number_format = "d mmm yyyy"
dd(ws, [f"D{r-12}:D{r-1}"], '"Yes,Partly,No"', strict=True)
note(ws, r + 1, "Twelve 'Yes' ticks in a row is the goal. If you miss two weeks running, lower the number rather than giving up.", color=GREY)
THEMES = (TH0, TH1)

# ======================================================= 2 One idea, every channel
ws = wb.create_sheet("2 One idea, every channel", 2)
r = header(ws, "2. One idea, every channel", "Write the idea once, then a version for each channel, within its limit and in its style.", [20, 64, 14, 14, 30], V)
r = section(ws, r, "The idea", 5)
for lab, ex in [("Core idea (one sentence)", "Why we still pull kopi through a cloth sock"), ("Why our customer cares", "It's the taste they grew up with, and almost nobody makes it this way any more"), ("Proof (a number, a photo, a quote)", "We go through 40 socks a year; Mr Tan has made kopi this way for 31 years")]:
    ws.cell(r, 1, lab).font = font(bold=True); c = ws.cell(r, 2, ""); c.fill = INPUT; c.border = BOX
    calc(ws, r, 5, "Example: " + ex); ws.row_dimensions[r].height = 30; r += 1
r += 1
r = section(ws, r, "Versions (channels come from sheet 1)", 5)
r = table_head(ws, r, ["Channel", "Your version", "Characters", "Limit", "Check"])
r = row(ws, r, ["Threads", "Mr Tan has pulled kopi through the same kind of cloth sock for 31 years. We go through 40 socks a year to keep it tasting like it did. Do you still know a kopi shop that does it this way?", 187, 500, "Within the limit"], example=True)
ws.row_dimensions[r - 1].height = 44
V0 = r
for k in range(5):
    i = r
    r = row(ws, r, [f"=IF('1 Your rhythm'!A{C0+k}=\"\",\"\",'1 Your rhythm'!A{C0+k})", "", "", "", ""], inputs=(2,))
    calc(ws, i, 3, f'=IF(B{i}="","",LEN(B{i}))'); calc(ws, i, 4, f'=IF(A{i}="","",IFERROR(VLOOKUP(A{i},{CHR},2,FALSE),""))')
    calc(ws, i, 5, f'=IF(B{i}="","",IF(D{i}="","",IF(C{i}>D{i},"Over by "&(C{i}-D{i})&": trim or split it","Within the limit")))')
    ws.row_dimensions[i].height = 60
r += 1
r = section(ws, r, "Before you post, check each version", 5)
for t in ["The first line works on its own (it may be all people see).", "It sounds like your brand, not like the platform.", "It does what that channel is for (sheet 1, 'Its job for you').", "Links: put them where that channel lets people click (see Presets).", "One call to action, not three."]:
    ws.cell(r, 1, "·").font = font(bold=True, color=PINK); ws.cell(r, 2, t).font = font(); r += 1
r += 1
ws.cell(r, 1, "Do it in Mavic").font = font(bold=True, color=TEAL)
c = ws.cell(r, 2, "In the Post editor, select your channels and turn on Customize per channel to edit each version. Rewrite > Shorten fixes a version that runs over; each channel shows a live character count."); c.font = font(size=9); c.alignment = WRAP; r += 1
link(ws, r, "Editing captions per platform (Mavic Help Centre)", HC + "editing-captions-per-platform-1jihvy9/", 2)

# ======================================================= 3 2027 master list
ws = wb.create_sheet("3 Master list 2027", 3)
cols = ["Date (2027)", "Moment", "Your decision", "Markets", "Cause", "The ask", "Organiser", "Link", "Hashtag", "Natural fit", "Join only if", "Content angles", "Start planning by", "Watch out", "Month", "Pick #"]
r = header(ws, "3. Master List of 2027 Social Media Holidays", f"{len(M)} moments with a social movement behind them. Mark each one Join, Support quietly or Skip (column C). Use the filter arrows to narrow by month or market.", [26, 30, 16, 20, 30, 30, 28, 30, 18, 28, 34, 46, 16, 40, 8, 8], V)
ws.column_dimensions["O"].hidden = True; ws.column_dimensions["P"].hidden = True
HR = r; r = table_head(ws, r, cols)
def disp(m):
    if not m['start']: return "Announced each year (" + m['date_note'] + ")"
    s = dt.date.fromisoformat(m['start']); e = dt.date.fromisoformat(m['end'])
    if s == e: t = s.strftime('%a %-d %b')
    elif s.day == 1 and (e + dt.timedelta(days=1)).day == 1: t = "All of " + s.strftime('%B')
    else: t = s.strftime('%a %-d %b') + " to " + e.strftime('%a %-d %b')
    return t + (f" ({m['date_note']})" if m['date_note'] else "")
ordered = sorted(M, key=lambda m: (m['start'] or '2027-07-31', m['name']))
ML0 = r
for m in ordered:
    plan = (dt.date.fromisoformat(m['start']) - dt.timedelta(weeks=m['lead_weeks'])) if m['start'] else None
    vals = [disp(m), m['name'], "", m['markets'], m['cause'], m['ask'], m['organiser'], m['url'], m['hashtag'], m['fit'], m['join_only_if'],
            "\n".join("· " + a for a in m['angles']), plan, m['risk'], dt.date.fromisoformat(m['start']).month if m['start'] else 7, ""]
    r = row(ws, r, vals, inputs=(3,)); i = r - 1
    if plan: ws.cell(i, 13).number_format = "d mmm yyyy"
    else: ws.cell(i, 13, "When announced")
    if m['url']: ws.cell(i, 8).hyperlink = m['url']; ws.cell(i, 8).font = font(color=TEAL, underline="single")
    ws.cell(i, 2).font = font(bold=True, color=NAVY)
    ws.cell(i, 16, f'=IF(OR(C{i}="Join",C{i}="Support quietly"),COUNTIF($C${ML0}:C{i},"Join")+COUNTIF($C${ML0}:C{i},"Support quietly"),"")')
    ws.row_dimensions[i].height = 62
ML1 = r - 1
dd(ws, [f"C{ML0}:C{ML1}"], DL, strict=True)
ws.auto_filter.ref = f"A{HR}:N{ML1}"; ws.freeze_panes = f"C{HR+1}"
r += 1
ws.cell(r, 1, "Left out on purpose").font = font(size=12, bold=True, color=PINK); r += 1
for k, v in LEFT_OUT.items():
    ws.cell(r, 1, k).font = font(bold=True); c = ws.cell(r, 2, v); c.font = font(size=9); c.alignment = WRAP
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=8); ws.row_dimensions[r].height = 30; r += 1
r += 1
note(ws, r, f"Dates and organisers checked {CHECKED}. Re-check the organiser's site before posting: themes and some dates are announced during the year.", color=GREY)
MLN = f"'3 Master list 2027'"

# ======================================================= 4 Fit test
ws = wb.create_sheet("4 Fit test", 4)
r = header(ws, "4. Fit test", "For any moment that tempts you. Score 0 (no), 1 (somewhat), 2 (yes). The result tells you whether to join.", [30, 16, 16, 16, 16, 10, 22, 50], V)
r = table_head(ws, r, ["Moment (pick)", "Our connection is genuine", "We can contribute, not just post", "We have proof", "Its community would welcome us", "Score", "Result", "Join only if (from the list)"])
r = row(ws, r, ["Earth Day", 2, 1, 2, 1, 6, "Support quietly", "you can point to a real change in how you source, make or package"], example=True)
F0 = r
for _ in range(15):
    r = row(ws, r, ["", "", "", "", "", "", "", ""], inputs=(1, 2, 3, 4, 5)); i = r - 1
    calc(ws, i, 6, f'=IF(A{i}="","",SUM(B{i}:E{i}))')
    calc(ws, i, 7, f'=IF(OR(A{i}="",COUNT(B{i}:E{i})<4),"",IF(F{i}>=7,"Join",IF(F{i}>=5,"Support quietly","Skip")))')
    calc(ws, i, 8, f'=IF(A{i}="","",IFERROR(INDEX({MLN}!$K${ML0}:$K${ML1},MATCH(A{i},{MLN}!$B${ML0}:$B${ML1},0)),""))')
    ws.row_dimensions[i].height = 30
dd(ws, [f"A{F0}:A{r-1}"], f"{MLN}!$B${ML0}:$B${ML1}", strict=True)
dvs = DataValidation(type="whole", operator="between", formula1="0", formula2="2", allow_blank=True); dvs.error = "Score 0, 1 or 2"; ws.add_data_validation(dvs); dvs.add(f"B{F0}:E{r-1}")
r += 1
note(ws, r, "7 or 8: Join. 5 or 6: Support quietly (share, give or take part without making it about you). 4 or less: Skip. Thresholds are a rule of thumb.", color=GREY); r += 1
note(ws, r, "Then copy the result into column C of sheet 3.", color=GREY)

# ======================================================= 5 Your 2027 plan
ws = wb.create_sheet("5 Your 2027 plan", 5)
r = header(ws, "5. Your 2027 plan", "Builds itself from sheets 1 and 3. Moments are anchors; your themes fill the rest of the month.", [14, 46, 40, 16, 16, 44], V)
r = table_head(ws, r, ["Month", "Moments you're joining", "Supporting quietly", "Start planning by", "Posts planned (about)", "Theme mix for the other posts"])
B, C, M_, Mo = f"{MLN}!$B${ML0}:$B${ML1}", f"{MLN}!$C${ML0}:$C${ML1}", f"{MLN}!$M${ML0}:$M${ML1}", f"{MLN}!$O${ML0}:$O${ML1}"
mix = "&".join([f"IF('1 Your rhythm'!A{t}=\"\",\"\",'1 Your rhythm'!A{t}&\" \"&'1 Your rhythm'!B{t}&\"%  \")" for t in range(THEMES[0], THEMES[1] + 1)])
for mi in range(12):
    i = r
    r = row(ws, r, [MON[mi], "", "", "", "", ""])
    ws.cell(i, 1).font = font(bold=True, color=NAVY)
    ws.cell(i, 2).value = ArrayFormula(f"B{i}", f'=_xlfn.TEXTJOIN(", ",TRUE,IF(({Mo}={mi+1})*({C}="Join"),{B},""))')
    ws.cell(i, 3).value = ArrayFormula(f"C{i}", f'=_xlfn.TEXTJOIN(", ",TRUE,IF(({Mo}={mi+1})*({C}="Support quietly"),{B},""))')
    ws.cell(i, 4).value = ArrayFormula(f"D{i}", f'=IFERROR(1/(1/MIN(IF(({Mo}={mi+1})*(({C}="Join")+({C}="Support quietly"))*ISNUMBER({M_}),{M_}))),"")')
    ws.cell(i, 4).number_format = "d mmm yyyy"
    ws.cell(i, 5).value = f"=ROUND('1 Your rhythm'!{TOT}*4.33,0)"
    ws.cell(i, 6).value = f"={mix}"
    for cc in range(2, 7): ws.cell(i, cc).alignment = WRAP; ws.cell(i, cc).fill = SUG
    ws.row_dimensions[i].height = 34
r += 1
ws.cell(r, 1, "Moments chosen").font = font(bold=True); ws.cell(r, 2, f'=COUNTIF({C},"Join")&" to join, "&COUNTIF({C},"Support quietly")&" to support quietly"').font = font(bold=True)
calc(ws, r, 3, f'=IF(COUNTIF({C},"Join")>10,"That is a lot of moments. Could you do each one well?",IF(COUNTIF({C},"Join")=0,"Mark moments on sheet 3","A focused list"))'); r += 2
note(ws, r, "Posts planned assumes about 4.33 weeks a month. 'Start planning by' is the earliest lead date of the month's moments.", color=GREY)

# ======================================================= 6 Paste into Mavic
ws = wb.create_sheet("6 Paste into Mavic", 6)
r = header(ws, "6. Paste into Mavic", "Copy each block into a Mavic chat. Nothing posts until you approve it.", [6, 120], V)
P = f"{MLN}!$P${ML0}:$P${ML1}"
def pick(k, col): return f'IFERROR(INDEX({MLN}!${col}${ML0}:${col}${ML1},MATCH({k},{P},0)),"")'
r = section(ws, r, "Block 1: add your moments to the Calendar", 2)
lines = "&".join([f'IF({pick(k,"B")}="","",CHAR(10)&"- "&{pick(k,"B")}&": "&{pick(k,"A")})' for k in range(1, 21)])
c = ws.cell(r, 2, f'="Add these holidays to my calendar for 2027:"&{lines}'); c.font = font(size=9); c.alignment = WRAP; c.border = BOX; c.fill = SUG; ws.row_dimensions[r].height = 240; r += 2
r = section(ws, r, "Block 2: an ideas prompt for each moment (one at a time; type @ to tag a customer profile before you send)", 2)
chans = "&".join([f"IF('1 Your rhythm'!A{C0+k}=\"\",\"\",'1 Your rhythm'!A{C0+k}&\", \")" for k in range(5)])
for k in range(1, 21):
    f = (f'=IF({pick(k,"B")}="","","Give me 3 post ideas for "&{pick(k,"B")}&" ("&{pick(k,"A")}&"), one for each of: "&{chans}&"in our voice. '
         f'The ask: "&{pick(k,"F")}&". Our decision: "&{pick(k,"C")}&IF({pick(k,"C")}="Support quietly"," (suggest ways to take part or share the organiser\'s message without making it about us)","")&". Only suggest ideas that pass this test: join only if "&{pick(k,"K")}&". Watch out: "&{pick(k,"N")})')
    ws.cell(r, 1, k).font = font(size=9, color=GREY); c = ws.cell(r, 2, f); c.font = font(size=9); c.alignment = WRAP; c.fill = SUG; c.border = BOX; ws.row_dimensions[r].height = 46; r += 1
r += 1
r = section(ws, r, "Block 3: your themes (Brand DNA > Brand Book > Content Themes)", 2)
th = "&".join([f"IF('1 Your rhythm'!A{t}=\"\",\"\",CHAR(10)&\"- \"&'1 Your rhythm'!A{t}&\" (\"&'1 Your rhythm'!B{t}&\"%): \"&'1 Your rhythm'!D{t})" for t in range(THEMES[0], THEMES[1] + 1)])
c = ws.cell(r, 2, f'="Set up these content themes with these weights:"&{th}'); c.font = font(size=9); c.alignment = WRAP; c.fill = SUG; c.border = BOX; ws.row_dimensions[r].height = 90; r += 2
r = section(ws, r, "Then", 2)
for t in ["Calendar > Ideas: drag ideas onto dates, then click one and choose Create content.",
          "In the Post editor, turn on Customize per channel and check each version's count.",
          "Schedule. Mavic asks you to approve before anything posts.",
          "After a month, look at what worked, and fix the rhythm or the theme, not just the post."]:
    ws.cell(r, 1, "·").font = font(bold=True, color=PINK); c = ws.cell(r, 2, t); c.font = font(); r += 1
r += 1
link(ws, r, "Calendar (Mavic Help Centre)", HC + "calendar-1k88zg/", 2); r += 1
link(ws, r, "Getting ideas (Mavic Help Centre)", HC + "getting-ideas-vfhpq4/", 2); r += 1
link(ws, r, "Content Themes (Mavic Help Centre)", HC + "content-theme-do2x23/", 2); r += 1
link(ws, r, "Try it on your own brand at mavic.ai", CTA, 2)

wb.move_sheet("Presets", offset=len(wb.sheetnames))
for s in wb.worksheets: s.sheet_properties.tabColor = {"How to use": NAVY, "Presets": "B8B9CC"}.get(s.title, PINK if s.title[0] in "34" else TEAL)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
wb.save(OUT); print("saved", OUT)
