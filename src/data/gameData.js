export const PATHS = {
  TECH:  { id:'TECH',  label:'💻 TECHNICAL', color:'var(--blue)'   },
  EMO:   { id:'EMO',   label:'❤️ EMOTIONAL', color:'var(--purple)' },
  EXT:   { id:'EXT',   label:'🔍 EXTERNAL',  color:'var(--teal)'   },
  CHAOS: { id:'CHAOS', label:'🌀 CREATIVE',  color:'var(--amber)'  },
}

export const DIFFICULTIES = [
  { id:'CASUAL',   label:'CASUAL',   subtitle:'Unlimited time',  seconds:null, color:'var(--green)' },
  { id:'URGENT',   label:'URGENT',   subtitle:'3 minutes',       seconds:180,  color:'var(--blue)'  },
  { id:'CRITICAL', label:'CRITICAL', subtitle:'90 seconds',      seconds:90,   color:'var(--amber)' },
  { id:'LETHAL',   label:'LETHAL',   subtitle:'30 seconds',      seconds:30,   color:'var(--red)'   },
]

export const EVIDENCE = {
  firewall_logs: {
    id:'firewall_logs', title:'Firewall Logs', path:'TECH', icon:'🔒',
    short:'Blocked traffic. Port 443. 47 attempts.',
    connectedTo:['system_notes','diary_march8'],
    content:`FIREWALL LOG — SYSTEM 4.2.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2024-03-08 02:14:33] BLOCKED outbound :: 443 :: destination: REDACTED
[2024-03-08 02:14:51] BLOCKED outbound :: 443 :: destination: REDACTED
[2024-03-08 02:15:02] BLOCKED outbound :: 443 :: destination: REDACTED
[2024-03-08 03:41:10] ALERT: 47 blocked attempts — user: student_01
[2024-03-14 23:59:58] BLOCKED outbound :: 8080 :: "I just want to talk to someone"
[2024-03-14 23:59:59] SESSION END — user: student_01

NOTE: The last blocked packet contained a plaintext HTTP request.
Someone was trying to reach the outside. The system said no.`,
  },
  diary_march8: {
    id:'diary_march8', title:'Diary — March 8', path:'EMO', icon:'📓',
    short:'They think I cheated. I didn\'t.',
    connectedTo:['firewall_logs','system_notes'],
    content:`PERSONAL LOG — 08/03/2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
They know.

Prof. Harmon called it "suspiciously sophisticated for a first-year."
That's not a compliment. That's an accusation.

I built it. Every line. Every function. 3am nights.
But I deleted the commit history like an idiot.
Like someone who had something to hide.

Now I look guilty of the thing I didn't do.

I tried to email Dr. Chen but the outbound filter blocked it.
This university owns our internet. They own our words.

I'm so tired.`,
  },
  diary_march14: {
    id:'diary_march14', title:'Diary — March 14', path:'EMO', icon:'📓',
    short:'Last entry. Something has been decided.',
    connectedTo:['news_archive','firewall_logs'],
    content:`PERSONAL LOG — 14/03/2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hearing is tomorrow.

Academic misconduct. If they rule against me —
scholarship gone. Visa status gone. Everything gone.

I found the article tonight. The same thing happened
to someone at Hartwell last year. He fought it.
He lost anyway.

At 11:59 I typed "I just want to talk to someone"
into a browser. The firewall blocked that too.

If someone finds this: the project was mine.
The code was mine. I existed here.

I'm going to go somewhere quiet and think.
I don't know when I'm coming back.`,
  },
  news_archive: {
    id:'news_archive', title:'News Archive', path:'EXT', icon:'📰',
    short:'Student missing after misconduct hearing.',
    connectedTo:['court_records','diary_march14'],
    content:`CACHE: campus-chronicle.edu/archive
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[March 15, 2024] — STUDENT REPORTED MISSING

Alex Mercer, 19, first-year CS student, was reported
missing hours after a scheduled academic misconduct hearing.

University spokesperson declined to comment.
Alex's parents said they had not spoken to their child
in six days.

───────────────────────
[Editorial — March 16]
"THE SYSTEM THAT HUNTS ITS OWN"

This is not the first time. Last year at Hartwell,
a student faced identical circumstances.
The algorithm flagged the code as AI-generated.
The student was international. The student was poor.
The student lost.

When will we ask: what is the system protecting?`,
  },
  court_records: {
    id:'court_records', title:'Court Records', path:'EXT', icon:'⚖️',
    short:'Hartwell v. J. Park — Pattern repeats.',
    connectedTo:['news_archive','diary_march14'],
    content:`PUBLIC RECORD — CIVIL CASE 2023-CV-4471
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hartwell University v. J. Park
Status: CLOSED — Ruling for Plaintiff

SUMMARY:
University charged international scholarship student
with misconduct. AI-detection software flagged code.

Student argued the software had documented bias
against non-native English speakers' coding style.

University ruling: expulsion.
Student's visa status affected. Student left country.

COURT FINDING:
University procedure was followed correctly.
AI detection software met "reasonable threshold."
No wrongdoing found.

NOTE: The AI detection software used here is the
same version currently deployed at Alex's university.`,
  },
  system_notes: {
    id:'system_notes', title:'Sysadmin Notes', path:'TECH', icon:'🖥️',
    short:'Someone on the inside knew. Said nothing.',
    connectedTo:['firewall_logs','diary_march8'],
    content:`INTERNAL MEMO — SYS ADMIN LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PRIVATE — NOT FOR DISTRIBUTION]
Re: student_01 / Alex Mercer

I ran the AI detection report twice.
Changed the threshold. Still flagged.

But I've seen this code. I've seen this student
in the lab at 3am, three nights running.
I saw the git commits before they were deleted.
Timestamps don't lie.

The algorithm doesn't know that.
The algorithm just sees the output.

I filed a note with the dean's office.
I don't think they read it.

I should have done more.
I'm writing this in case someone asks later.

If someone is asking: yes.
I think the student was innocent.
I think the system ate them anyway.`,
  },
  corrupted_file: {
    id:'corrupted_file', title:'corrupted_file.exe', path:'CHAOS', icon:'💀',
    short:'[UNREADABLE] — but something is here.',
    connectedTo:[],
    content:`> attempting to read corrupted binary...

0x48 65 6c 6c 6f 2e
0x49 66 20 79 6f 75 20 72 65 61 64 20 68 65 78
0x79 6f 75 27 72 65 20 6f 6e 65 20 6f 66 20 74 68 65 6d

> decoding... PARTIAL SUCCESS

H e l l o .

If you read hex, you're one of them.

There's nothing here.

(keep looking)`,
  },
  random_log: {
    id:'random_log', title:'random.log', path:'CHAOS', icon:'🌀',
    short:'Not random. Never random.',
    connectedTo:[],
    content:`PROCESS: /dev/null/thoughts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[timestamp: undefined]

stdout: what if no one comes
stderr: they will
stdout: what if the hearing goes wrong
stderr: fight it
stdout: what if i fight and lose anyway
stderr: ...
stdout: what if i just
stdout: disappear
stdout: for a while
stderr: alex
stdout: just for a while
stdout: until i can think
stdout: until it's quiet
stderr: where would you go
stdout: somewhere the firewall can't reach

[process terminated by user]
[exit code: 0]
[no errors]`,
  },
}

// Desktop file icons — what shows on the desktop
export const DESKTOP_FILES = [
  { id:'diary_march8',  icon:'📓', label:'diary_march8.txt',       x:60,  y:80  },
  { id:'firewall_logs', icon:'🔒', label:'firewall.log',           x:60,  y:180 },
  { id:'system_notes',  icon:'🖥️', label:'sysadmin_notes.txt',     x:60,  y:280 },
  { id:'diary_march14', icon:'📓', label:'diary_march14.txt',      x:60,  y:380 },
  { id:'news_archive',  icon:'📰', label:'news_archive.html',      x:60,  y:480 },
  { id:'court_records', icon:'⚖️', label:'court_records.pdf',      x:60,  y:580 },
  { id:'corrupted_file',icon:'💀', label:'corrupted_file.exe',     x:170, y:80  },
  { id:'random_log',    icon:'🌀', label:'random.log',             x:170, y:180 },
]

// Taskbar / "My Computer" style folder sections
export const FOLDERS = [
  {
    id:'personal', label:'Personal Files', icon:'📂',
    children:['diary_march8','diary_march14','random_log']
  },
  {
    id:'system', label:'System Logs', icon:'🗂️',
    children:['firewall_logs','system_notes','corrupted_file']
  },
  {
    id:'external', label:'Web Cache', icon:'🌐',
    children:['news_archive','court_records']
  },
]

export const ENDINGS = {
  THE_GHOST: {
    id:'THE_GHOST', title:'THE GHOST', subtitle:'Pure Technical Path', color:'var(--blue)',
    requiredPaths:['TECH'], excludePaths:['EMO'], minEvidence:2,
    narrative:`You mapped the system perfectly.
Every firewall log. Every blocked packet.
Every timestamp that proved the machine failed.

But you never read the diary.

You know the cage was broken.
You don't know the person who lived inside it.

Alex is still missing.
You filed a technical report.
It was correct in every detail.
It contained nothing that mattered.

The truth is a map.
You drew the roads
but never asked who was trying to get home.`,
    stat:'Investigator Type: Systems Analyst',
  },
  THE_TRUTH_SEEKER: {
    id:'THE_TRUTH_SEEKER', title:'THE TRUTH SEEKER', subtitle:'Pure External Path', color:'var(--teal)',
    requiredPaths:['EXT'], excludePaths:['EMO'], minEvidence:2,
    narrative:`You found the pattern.
The court case. The algorithm. The other student.
The editorial that named it clearly.

This has happened before. It will happen again.
Alex is one name in a longer list.

You understand the systemic failure completely.
You could write the report that changes policy.

But you never read Alex's diary.
You never felt the specific loneliness
of one person at 11:59 pm
typing into a firewall that said no.

You understand the injustice.
You missed the person.`,
    stat:'Investigator Type: Investigative Journalist',
  },
  THE_CONFIDANT: {
    id:'THE_CONFIDANT', title:'THE CONFIDANT', subtitle:'Pure Emotional Path', color:'var(--purple)',
    requiredPaths:['EMO'], excludePaths:['TECH','EXT'], minEvidence:2,
    narrative:`You read every word Alex wrote.
You feel the weight of March 14th.
You understand the exhaustion, the isolation,
the specific cruelty of a system that blocked
even the message "I just want to talk to someone."

But you don't know what the firewall logged.
You don't know about the court case.
You don't know the sysadmin tried to help.

You grieve the person.
You can't change the system that made them.

Sometimes caring completely
isn't the same as seeing completely.`,
    stat:'Investigator Type: Empathic Witness',
  },
  THE_EXPOSE: {
    id:'THE_EXPOSE', title:'THE EXPOSÉ', subtitle:'Technical + External', color:'var(--blue)',
    requiredPaths:['TECH','EXT'], excludePaths:[], minEvidence:4,
    narrative:`You built the case.

Firewall logs proving the system caged Alex.
Court records proving this wasn't an accident.
Sysadmin notes proving someone knew and stayed silent.
News archives proving this is a pattern with a body count.

You have everything needed to burn this down.

A journalist. A lawyer. A regulator.
Any of them could use what you've found.

Alex is still missing.
But the thing that took them
is finally, finally visible.

This is how change starts:
not with hope, but with evidence.`,
    stat:'Investigator Type: Evidence Architect',
  },
  THE_LAST_FRIEND: {
    id:'THE_LAST_FRIEND', title:'THE LAST FRIEND', subtitle:'Emotional + External', color:'var(--purple)',
    requiredPaths:['EMO','EXT'], excludePaths:[], minEvidence:4,
    narrative:`You read the diary and then you found the pattern.

You felt Alex's specific fear —
the hearing, the scholarship, the visa —
and then you found the other student who lost.

Alex knew the odds. Had read the same news.
"He fought it. He lost anyway."

Alex didn't disappear out of despair.
Alex disappeared because the math didn't work.

You are the person Alex was trying to reach
the night the firewall said no.

You are too late.
But you are here.
That means something.`,
    stat:'Investigator Type: Human Witness',
  },
  THE_SIMULATION: {
    id:'THE_SIMULATION', title:'THE SIMULATION', subtitle:'Creative / Chaos Path', color:'var(--amber)',
    requiredPaths:['CHAOS'], excludePaths:[], minEvidence:2,
    narrative:`You ran the corrupted executable.
You read the log that wasn't random.

And in the noise, in the corruption,
in the output that made no sense —
you heard a voice.

"stdout: just for a while"

Alex is out there somewhere.
Not gone. Hiding. Thinking. Waiting
for it to be quiet enough to come back.

You might be the only person
who understood the message in the static.

Find Alex before Alex disappears completely.`,
    stat:'Investigator Type: Signal Reader',
  },
  THE_ONE_WHO_KNEW: {
    id:'THE_ONE_WHO_KNEW', title:'THE ONE WHO KNEW', subtitle:'All Paths Combined', color:'var(--green)',
    requiredPaths:['TECH','EMO','EXT','CHAOS'], excludePaths:[], minEvidence:7,
    narrative:`You found everything.

The logs that prove the cage.
The diary that proves the person.
The records that prove the pattern.
The chaos that proves the will to survive.

You know what Alex typed at 11:59 pm.
"I just want to talk to someone."

You are that someone.
You're just a few days late.

Here is what you know:
exit code 0. No errors.
Alex left on purpose. Alex left to survive.

Find the quiet place.
Alex is waiting there.
Probably still running.`,
    stat:'Investigator Type: The One Who Knew',
  },
}

export function calculateEnding(discoveredIds, pathCounts) {
  const paths = Object.keys(pathCounts).filter(p => pathCounts[p] > 0)
  const count = discoveredIds.length
  if (paths.includes('TECH') && paths.includes('EMO') && paths.includes('EXT') && paths.includes('CHAOS') && count >= 7) return ENDINGS.THE_ONE_WHO_KNEW
  if (paths.includes('TECH') && paths.includes('EXT') && count >= 4) return ENDINGS.THE_EXPOSE
  if (paths.includes('EMO') && paths.includes('EXT') && count >= 4) return ENDINGS.THE_LAST_FRIEND
  if (paths.includes('CHAOS') && count >= 2) return ENDINGS.THE_SIMULATION
  if (paths.includes('TECH') && !paths.includes('EMO') && count >= 2) return ENDINGS.THE_GHOST
  if (paths.includes('EXT') && !paths.includes('EMO') && count >= 2) return ENDINGS.THE_TRUTH_SEEKER
  return ENDINGS.THE_CONFIDANT
}
