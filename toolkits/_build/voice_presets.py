"""Preset content for the Brand Voice Workbook (v2.2). Written in Mavic house style: no em dashes, no banned words
outside the ban-list packs themselves. Channel defaults are rules of thumb, not platform rules."""

ARCHETYPES = [
    ("The Trusted Guide", "We explain before we sell. We sound calm, clear and sure of our facts, and we admit what we don't know. People come to us to understand, then decide.", "Calm, Expert, Honest, Reassuring"),
    ("The Straight Talker", "We say it plainly and get to the point. We name the price, the catch and the trade-off before anyone has to ask. No fluff, no hype.", "Direct, Honest, Practical"),
    ("The Good Friend", "We sound like someone you'd text for advice: warm, easy to read, a little funny and always on your side. We never talk down.", "Warm, Down-to-earth, Playful"),
    ("The Expert", "We know this field deeply and it shows in the details. We are precise, we cite what we can and we explain the why. Confident, never showy.", "Expert, Precise, Confident"),
    ("The Challenger", "We question how things are usually done in our category and say so. Bold and a little provocative, always with a better way to offer.", "Bold, Rebellious, Witty"),
    ("The Maker", "We love the craft behind what we make. We show our work, name the materials and the steps, and take pride in small details.", "Curious, Precise, Thoughtful"),
    ("The Carer", "We put people's comfort first. Gentle, patient and reassuring, we make hard things feel manageable.", "Caring, Calm, Reassuring"),
    ("The Explorer", "We are always looking for what's next and we bring people along. Curious, energetic and happy to try things first.", "Curious, Energetic, Optimistic"),
    ("The Entertainer", "We make people smile while we make our point. Playful, quick and surprising, never at the customer's expense.", "Playful, Witty, Energetic"),
    ("The Refined", "We say less and choose every word. Calm, polished and understated: quality shows without being announced.", "Refined, Calm, Precise"),
    ("The Encourager", "We believe people can do more than they think, and we show them how. Upbeat and practical about the next step.", "Optimistic, Inspiring, Practical"),
    ("The Community Builder", "We talk with people, not at them. We ask questions, spotlight customers and share the mic.", "Inclusive, Warm, Curious"),
]

TRAITS = [
    ("Direct", "We get to the point and say the hard part first.", "Blunt, cold or rude."),
    ("Honest", "We name the trade-offs and say what we can't do.", "Negative or self-critical."),
    ("Warm", "We sound like a person who's glad you're here.", "Gushing, sugary or over-familiar."),
    ("Playful", "We enjoy words and leave room for a smile.", "Silly, or jokey about serious things."),
    ("Witty", "A sharp turn of phrase makes the point stick.", "Showing off or using in-jokes."),
    ("Calm", "Steady and unhurried, even when the topic is urgent.", "Flat, slow or detached."),
    ("Bold", "We take a clear stand and say it with conviction.", "Loud, arrogant or picking fights."),
    ("Confident", "We state what we know without hedging.", "Boastful, or unwilling to admit limits."),
    ("Curious", "We ask why, test things and share what we learn.", "Vague, unsure or rambling."),
    ("Expert", "We explain the why, with detail only a specialist would know.", "Jargon-heavy or lecturing."),
    ("Precise", "Exact numbers, exact words, no padding.", "Cold, technical or pedantic."),
    ("Practical", "Every post leaves people with a next step they can take.", "Dull or purely instructional."),
    ("Reassuring", "We lower the stakes and make it feel doable.", "Dismissive of real worries."),
    ("Caring", "We notice how people feel and respond to it.", "Pitying or over-emotional."),
    ("Down-to-earth", "Everyday words and real examples, no airs.", "Sloppy or careless."),
    ("Optimistic", "We look for what can go right and show how to get there.", "Naive, or ignoring real problems."),
    ("Inspiring", "We show people what's possible for them.", "Preachy or full of slogans."),
    ("Energetic", "Short sentences, active verbs, momentum.", "Shouty, or full of exclamation marks."),
    ("Thoughtful", "We take a moment to say something worth reading.", "Slow, heavy or academic."),
    ("Inclusive", "We write so everyone feels the post is for them.", "Bland, or afraid to take a view."),
    ("Refined", "Understated and polished, every word chosen.", "Snobbish or cold."),
    ("Quirky", "An unexpected angle you'd only get from us.", "Random or confusing."),
    ("Rebellious", "We question our category's habits out loud.", "Negative, or against everything."),
    ("Humble", "We credit others and let results speak.", "Unsure or apologetic."),
]

LENGTHS = ["Very short: under 10 words", "Short: under 15 words", "Medium: 15 to 20 words", "Long and flowing: 20 words or more", "Mixed: short lines between longer ones"]
OPENS = ["A question", "A bold claim", "A surprising number", "The customer's problem, in their words", "A short story or moment", "A how-to promise", "Straight to the news", "A personal note"]
CLOSES = ["A question that invites comments", "One clear call to action", "A takeaway to remember", "A link and nothing else", "A sign-off in our voice", "End on the point, no sign-off"]
FORMATS = ["Line breaks, 1 or 2 emoji", "Line breaks, no emoji", "Short paragraphs, no emoji", "Bullets for steps or lists", "Headings and short sections", "One short paragraph"]
DATA = ["One number or fact per post", "Customer stories over statistics", "A source linked for every claim", "Before and after: show, don't claim", "Keep it light, no data"]
PRODUCT = ["Named once, after the problem", "Teach first, product last", "Lead with the product", "Only when it answers the question", "Never on this channel"]

# channel, who it's for, formality, length, open, close, formatting, data, product   (rules of thumb)
CHANNELS = [
    ("Instagram", "People scrolling for ideas, inspiration and people they like.", 2, LENGTHS[1], OPENS[1], CLOSES[0], FORMATS[0], DATA[3], PRODUCT[0]),
    ("TikTok", "People watching to be entertained, who stay only if the first line hooks them.", 1, LENGTHS[0], OPENS[1], CLOSES[0], FORMATS[5], DATA[3], PRODUCT[1]),
    ("Facebook", "Existing customers and locals who want news and offers they can trust.", 2, LENGTHS[2], OPENS[6], CLOSES[1], FORMATS[0], DATA[1], PRODUCT[0]),
    ("LinkedIn", "Professionals reading for ideas they can use at work.", 3, LENGTHS[4], OPENS[2], CLOSES[2], FORMATS[2], DATA[0], PRODUCT[1]),
    ("X", "People in fast conversations who reward a clear point of view.", 2, LENGTHS[0], OPENS[1], CLOSES[5], FORMATS[5], DATA[0], PRODUCT[3]),
    ("Threads", "People in a relaxed conversation who reply more than they share.", 1, LENGTHS[1], OPENS[0], CLOSES[0], FORMATS[5], DATA[4], PRODUCT[3]),
    ("Email newsletter", "Subscribers who chose to hear from us and expect something useful.", 3, LENGTHS[2], OPENS[7], CLOSES[1], FORMATS[2], DATA[1], PRODUCT[0]),
    ("Blog and search", "People searching for an answer to one specific question.", 3, LENGTHS[2], OPENS[5], CLOSES[2], FORMATS[4], DATA[2], PRODUCT[1]),
    ("Website", "Visitors deciding whether we're right for them.", 3, LENGTHS[1], OPENS[3], CLOSES[1], FORMATS[4], DATA[3], PRODUCT[2]),
    ("Ads", "People who didn't ask to hear from us: one idea, fast.", 2, LENGTHS[0], OPENS[3], CLOSES[1], FORMATS[5], DATA[0], PRODUCT[2]),
    ("YouTube", "Viewers who want to learn or be entertained, and decide in the first few seconds.", 2, LENGTHS[4], OPENS[5], CLOSES[0], FORMATS[1], DATA[3], PRODUCT[1]),
    ("WhatsApp and chat", "Customers messaging us one to one, usually with a question.", 1, LENGTHS[0], OPENS[7], CLOSES[4], FORMATS[0], DATA[4], PRODUCT[3]),
    ("Press", "Journalists looking for a story, facts and a quote they can use.", 5, LENGTHS[2], OPENS[6], CLOSES[5], FORMATS[4], DATA[2], PRODUCT[2]),
]

RULES = [   # instructions first, with a short example, so they read as rules in any brand's guide
    ("Contractions", "Use them: we're, it's, you'll.", "Stiff phrasing: we are pleased to inform you."),
    ("Be specific", "Concrete details: the number, the place, the time.", "Vague praise: fast, reliable, quality."),
    ("Talk to one person", "Write to you: you'll see the difference in a week.", "Talk about customers: customers may see results."),
    ("Name the customer's problem", "Start from their problem, in their words.", "Start from us: our innovative formula."),
    ("Plain words over jargon", "Words a customer would use out loud.", "Industry terms they'd have to look up."),
    ("Active voice", "Say who did it: we fixed the bug.", "Hide who did it: the bug has been resolved."),
    ("Short sentences", "One idea per sentence.", "Sentences that carry three ideas at once."),
    ("Exclamation marks", "One at most, and only when it's earned.", "Big news!!!"),
    ("Emoji", "Only when they add meaning, 2 at most.", "An emoji after every line."),
    ("Hashtags", "3 at most, specific to the topic.", "A wall of hashtags."),
    ("Numbers", "Digits: 3 steps, 40% less.", "Vague amounts: a few steps, much less."),
    ("Claims and promises", "Say what we tested and how.", "Promise results we can't show: proven, guaranteed."),
    ("Prices and offers", "The price and what's included, up front.", "A from-price, with the catch in small print."),
    ("Competitors", "Compare on facts, or not at all.", "Naming or mocking competitors."),
    ("Humour", "Light, and about the situation.", "Jokes at the customer's expense."),
    ("Calls to action", "One clear next step.", "Three different asks in one post."),
    ("Headlines", "Sentence case: How we make it.", "Title Case: How We Make It."),
    ("Spelling", "British English, always: colour, organise.", "Mixing colour and color."),
    ("Inclusive language", "Everyone, people, team.", "Guys, manpower."),
    ("Urgency", "Real deadlines only: ends Sunday.", "Pressure that isn't true: only a few left!!!"),
    ("Slang", "Everyday words our customers use.", "Trendy slang we'd never say out loud."),
]

PACKS = [
    ("AI cliches", "Yes", [("unleash", "start, let"), ("unlock", "open, start"), ("harness", "use"), ("delve", "look at"), ("elevate", "improve"),
                           ("empower", "help, let"), ("game-changer", "say what changed"), ("revolutionary", "new, and say how"), ("cutting-edge", "new"),
                           ("in today's fast-paced world", "cut it"), ("synergy", "say what works together"), ("leverage", "use"),
                           ("dive deep", "look closely"), ("seamless", "say what's easy"), ("supercharge", "speed up")]),
    ("Corporate jargon", "No", [("circle back", "follow up"), ("touch base", "talk"), ("best-in-class", "say what's better"), ("value-add", "say what it adds"),
                                ("move the needle", "say how much it changes"), ("paradigm shift", "change"), ("low-hanging fruit", "quick win"),
                                ("holistic", "say what's included"), ("robust", "strong, and say how"), ("solutions", "say what it does"),
                                ("going forward", "from now"), ("bandwidth", "time")]),
    ("Hype words", "No", [("world-class", "say who rates it"), ("best ever", "say what's better"), ("amazing", "be specific"), ("incredible", "be specific"),
                          ("unbelievable", "be specific"), ("ultimate", "cut it"), ("must-have", "say why they'd want it"), ("life-changing", "say what changes"),
                          ("next-level", "say what's better"), ("mind-blowing", "be specific")]),
    ("Filler phrases", "No", [("it's important to note that", "cut it"), ("at the end of the day", "cut it"), ("in order to", "to"), ("needless to say", "cut it"),
                              ("when it comes to", "for, about"), ("it goes without saying", "cut it"), ("the fact that", "that"), ("very", "a stronger word"),
                              ("really", "cut it"), ("basically", "cut it"), ("literally", "cut it")]),
    ("Pushy sales lines", "No", [("act now", "say why now"), ("don't miss out", "say what they get"), ("limited time only", "say the end date"), ("buy now", "one clear next step"),
                                 ("once in a lifetime", "say what's rare"), ("you won't believe", "say it"), ("hurry", "say the deadline"),
                                 ("100% guaranteed", "say what's covered"), ("risk-free", "say the refund terms"), ("no-brainer", "say why it's worth it")]),
    ("Beauty and skincare claims", "No", [("miracle", "say what it does"), ("flawless", "even, smooth"), ("chemical-free", "say what's in it"),
                                          ("clean beauty", "name what you leave out"), ("detox", "say what it does"), ("clinically proven", "say what was tested and how"),
                                          ("dermatologist approved", "name the test"), ("instant results", "say when people see a change"),
                                          ("non-toxic", "say what's in it"), ("anti-ageing cure", "say what it does for skin")]),
    ("Food and drink", "No", [("mouth-watering", "describe the taste"), ("to die for", "describe the taste"), ("guilt-free", "say what's in it"),
                              ("authentic", "say where the recipe comes from"), ("artisanal", "say who makes it and how"), ("delectable", "describe the taste"),
                              ("superfood", "name the ingredient"), ("farm to table", "name the farm"), ("healthy", "say what's in it"),
                              ("best in town", "say what makes it different")]),
    ("Tech and software", "No", [("disruptive", "say what it changes"), ("AI-powered", "say what it does"), ("next-generation", "new, and say how"),
                                 ("frictionless", "say what's easy"), ("scalable", "say what grows"), ("end-to-end", "say what's included"),
                                 ("turnkey", "say how long setup takes"), ("plug and play", "say how long setup takes"), ("state of the art", "new, and say how"),
                                 ("intuitive", "show it")]),
    ("Finance and property", "No", [("guaranteed returns", "say what's guaranteed"), ("risk-free investment", "say the risks"), ("get rich", "cut it"),
                                    ("passive income", "say what it involves"), ("dream home", "describe it"), ("prime location", "name what's nearby"),
                                    ("rare opportunity", "say what's rare"), ("exclusive deal", "say who it's for"), ("financial freedom", "say the outcome"),
                                    ("won't last", "say the end date")]),
]

TEST_PROMPTS = [
    "Announce a new product or feature",
    "Reply to an unhappy customer",
    "Share a tip our customers can use today",
    "Behind the scenes: how we make it",
    "Promote an offer with a real end date",
    "Tell a customer's story, with their permission",
    "Answer a question people often ask us",
    "Welcome email for a new subscriber",
    "A mistake we made, and how we fixed it",
    "Explain our price",
]
