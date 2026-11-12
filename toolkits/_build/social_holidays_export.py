import json, csv, datetime as dt, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(HERE, 'social_holidays_2027.py')).read())
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', '06-content-calendar')
os.makedirs(OUT, exist_ok=True)
BASE = '2027-social-media-holidays-master-list'
MON = ['January','February','March','April','May','June','July','August','September','October','November','December']

def nice(m):
    if not m['start']:
        return 'Date announced each year (' + m['date_note'] + ')'
    s = dt.date.fromisoformat(m['start']); e = dt.date.fromisoformat(m['end'])
    if s == e:
        out = s.strftime('%a %-d %b %Y')
    elif s.day == 1 and (e + dt.timedelta(days=1)).day == 1 and s.month == e.month:
        out = 'All of ' + s.strftime('%B %Y')
    else:
        out = s.strftime('%a %-d %b') + ' to ' + e.strftime('%a %-d %b %Y')
    return out + (f" ({m['date_note']})" if m['date_note'] else '')

def month_of(m):
    return dt.date.fromisoformat(m['start']).month if m['start'] else 7  # Earth Overshoot sits with July

ordered = sorted(M, key=lambda m: (month_of(m), m['start'] or '2027-07-31', m['name']))

# ---------- JSON ----------
json.dump({'title': 'Master List of 2027 Social Media Holidays', 'version': '1.0', 'checked': CHECKED,
           'publisher': 'Mavic (mavic.ai)', 'licence': 'CC BY 4.0',
           'curation_rule': 'Only moments with a social movement behind them: a named organiser, real public participation for 3+ years, a clear ask, observed in SG, PH, AU, NZ or US.',
           'left_out': LEFT_OUT, 'count': len(ordered),
           'holidays': [{**m, 'date_display': nice(m)} for m in ordered]},
          open(os.path.join(OUT, BASE + '.json'), 'w'), indent=1, ensure_ascii=False)

# ---------- CSV ----------
with open(os.path.join(OUT, BASE + '.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    cols = ['id','name','start','end','date_display','type','organiser','url','cause','ask','hashtag','markets','fit','join_only_if','angle_1','angle_2','angle_3','lead_weeks','risk','source','checked']
    w.writerow(cols)
    for m in ordered:
        w.writerow([m['id'],m['name'],m['start'],m['end'],nice(m),m['type'],m['organiser'],m['url'],m['cause'],m['ask'],m['hashtag'],m['markets'],m['fit'],m['join_only_if'],*m['angles'],m['lead_weeks'],m['risk'],m['source'],m['checked']])

# ---------- ICS ----------
def esc(s): return s.replace('\\','\\\\').replace(';','\\;').replace(',','\\,').replace('\n','\\n')
def fold(line):
    b = line.encode('utf-8'); out = []
    while len(b) > 73:
        cut = 73
        while (b[cut] & 0xC0) == 0x80: cut -= 1
        out.append(b[:cut].decode()); b = b[cut:]
    out.append(b.decode()); return '\r\n '.join(out)
L = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Mavic//2027 Social Media Holidays//EN','CALSCALE:GREGORIAN','X-WR-CALNAME:2027 Social Media Holidays (Mavic)','X-WR-CALDESC:Curated: only moments with a social movement behind them. mavic.ai/toolkits']
stamp = '20261112T000000Z'
for m in ordered:
    if not m['start']: continue
    s = dt.date.fromisoformat(m['start']); e = dt.date.fromisoformat(m['end']) + dt.timedelta(days=1)
    desc = f"{m['cause']}. The ask: {m['ask']}. Organiser: {m['organiser']}. Join only if {m['join_only_if']}. Watch out: {m['risk']} {m['url']}"
    for x in ['BEGIN:VEVENT', f"UID:{m['id']}-2027@mavic.ai", f'DTSTAMP:{stamp}', f"DTSTART;VALUE=DATE:{s:%Y%m%d}", f"DTEND;VALUE=DATE:{e:%Y%m%d}",
              f"SUMMARY:{esc(m['name'])} {m['hashtag']}", f'DESCRIPTION:{esc(desc)}', 'TRANSP:TRANSPARENT', 'END:VEVENT']:
        L.append(fold(x))
L.append('END:VCALENDAR')
open(os.path.join(OUT, BASE + '.ics'), 'w', newline='').write('\r\n'.join(L) + '\r\n')

# ---------- Markdown ----------
o = []
o.append('# Master List of 2027 Social Media Holidays\n')
o.append(f'Version 1.0 · {len(ordered)} curated moments · dates checked {CHECKED} · by [Mavic](https://mavic.ai/toolkits/?utm_source=github&utm_medium=readme&utm_campaign=social_holidays_2027) · CC BY 4.0\n')
o.append('Most "social media holiday" lists give you 365 days, most of them invented. This one keeps only the moments with a **social movement behind them**: a named organiser, people taking part beyond brand posts, a clear ask, and observance in at least one of Singapore, the Philippines, Australia, New Zealand or the United States. Public and religious holidays are left out on purpose (Mavic\'s Calendar shows those for each country), and so are sensitive days and brand-made sales days. See `curation-rules.md`.\n')
o.append('## How to use this list (people and agents)\n')
o.append('1. Read your brand\'s Brand DNA or `workbenches/brand-dna/brand-book.md` first.')
o.append('2. For each moment, run the fit test in `README.md`: Join, Support quietly, or Skip. A brand should join few, not many. Four to ten a year is plenty for most.')
o.append('3. Respect each entry\'s **Join only if** and **Watch out** fields. They are the reason this list exists.')
o.append('4. Start planning at the **lead time** shown, then write one idea per channel.')
o.append('5. Re-check the organiser\'s site before posting: themes and some dates are announced during the year.\n')
o.append('Machine-readable copies: `' + BASE + '.json`, `' + BASE + '.csv`, and `' + BASE + '.ics` (import into Google or Apple Calendar).\n')
o.append('## At a glance\n')
o.append('| Date (2027) | Moment | Markets | Ask |\n| --- | --- | --- | --- |')
for m in ordered:
    o.append(f"| {nice(m)} | [{m['name']}](#{m['id']}) | {m['markets']} | {m['ask']} |")
cur = None
for m in ordered:
    mo = month_of(m)
    if mo != cur:
        o.append(f'\n## {MON[mo-1]}\n'); cur = mo
    o.append(f'<a id="{m["id"]}"></a>\n### {m["name"]}\n')
    o.append(f'- **Date:** {nice(m)}')
    o.append(f'- **Type:** {m["type"]}')
    o.append(f'- **Organiser:** {m["organiser"]}' + (f' ({m["url"]})' if m['url'] else ''))
    o.append(f'- **Cause:** {m["cause"]}')
    o.append(f'- **The ask:** {m["ask"]}')
    o.append(f'- **Hashtag:** {m["hashtag"]}')
    o.append(f'- **Markets:** {m["markets"]}')
    o.append(f'- **Natural fit:** {m["fit"]}')
    o.append(f'- **Join only if:** {m["join_only_if"]}')
    o.append(f'- **Content angles:** ' + '; '.join(m['angles']))
    o.append(f'- **Start planning:** ' + (f'{m["lead_weeks"]} weeks before' if m['lead_weeks'] else 'when the date is announced'))
    o.append(f'- **Watch out:** {m["risk"]}')
    o.append(f'- **Source:** {m["source"]} (checked {m["checked"]})\n')
o.append('## Left out on purpose\n')
for k, v in LEFT_OUT.items(): o.append(f'- **{k}:** {v}')
o.append('\n## Add it to Mavic\n')
o.append('Open a chat in [Mavic](https://mavic.ai/?utm_source=github&utm_medium=readme&utm_campaign=social_holidays_2027), paste the moments you chose, and ask: "Add these holidays to my calendar". Then ask for ideas around each one, drag the ideas onto dates in the Calendar, and choose Create content. Nothing posts until you approve it.')
open(os.path.join(OUT, BASE + '.md'), 'w').write('\n'.join(o) + '\n')
print('ok', len(ordered))
