module.exports=[26121,a=>{"use strict";var b=a.i(87924),c=a.i(3130),d=a.i(54161),e=a.i(4699),e=e,f=a.i(98091),f=f,g=a.i(72131),h=a.i(33508);function i({item:a,onClose:c}){return(0,g.useEffect)(()=>{let a=a=>{"Escape"===a.key&&c()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[c]),(0,b.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",onClick:c,children:(0,b.jsxs)("div",{className:"relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border bg-background shadow-lg",onClick:a=>a.stopPropagation(),children:[(0,b.jsxs)("div",{className:"sticky top-0 flex items-start justify-between border-b bg-background p-6",children:[(0,b.jsxs)("div",{className:"flex-1",children:[(0,b.jsxs)("div",{className:"mb-2 flex items-center gap-3",children:[(0,b.jsx)(d.Badge,{variant:"outline",children:a.duration}),(0,b.jsx)("h2",{className:"text-2xl font-semibold",children:a.title})]}),(0,b.jsx)("p",{className:"text-muted-foreground",children:a.description})]}),(0,b.jsx)("button",{onClick:c,className:"ml-4 rounded-lg p-2 hover:bg-accent","aria-label":"Close modal",children:(0,b.jsx)(h.X,{className:"h-5 w-5"})})]}),(0,b.jsx)("div",{className:"p-6",children:(0,b.jsx)("div",{className:"prose prose-sm max-w-none dark:prose-invert",children:a.content.split("\n").map((a,c)=>{let d=a.trim();if(!d)return(0,b.jsx)("div",{className:"h-4"},c);if(d.startsWith("**")&&d.endsWith("**")){let a=d.slice(2,-2);if(a.includes(":")){let[d,e]=a.split(":");return(0,b.jsxs)("div",{className:"mb-2 mt-4",children:[(0,b.jsxs)("strong",{className:"text-primary",children:[d,":"]}),e&&(0,b.jsx)("span",{children:e})]},c)}return(0,b.jsx)("h3",{className:"mb-2 mt-4 text-lg font-semibold text-primary",children:a},c)}return d.match(/^\d+\./)?(0,b.jsx)("div",{className:"ml-4 mb-1",children:d},c):d.startsWith("-")?(0,b.jsxs)("div",{className:"ml-6 mb-1 flex gap-2",children:[(0,b.jsx)("span",{children:"•"}),(0,b.jsx)("span",{children:d.slice(1).trim()})]},c):(0,b.jsx)("p",{className:"mb-2",children:d},c)})})})]})})}function j(){let[a,h]=(0,g.useState)(!0),[j,k]=(0,g.useState)(null),l=[{id:"checkin",duration:"10 min",title:"Welcome & Check-in",description:"Brief greetings and attendance verification",content:`
**Purpose:** Establish a welcoming environment and ensure all participants are present and engaged.

**Activities:**
1. Welcome participants as they arrive
2. Brief overview of today's session
3. Attendance verification (use QR code for efficiency)
4. Quick temperature check: "How is everyone feeling today?"

**Facilitator Notes:**
- Keep this section brief but warm
- Note any missing participants
- Set a positive, supportive tone for the session
      `},{id:"cognitive",duration:"30 min",title:"Cognitive Restructuring Exercise",description:"Identify and challenge negative thought patterns",content:`
**Purpose:** Help participants recognize and reframe unhelpful thinking patterns.

**Key Concepts:**
- Automatic thoughts vs. rational thoughts
- Common cognitive distortions (all-or-nothing thinking, catastrophizing, etc.)
- The connection between thoughts, feelings, and behaviors

**Activities:**
1. Present a common scenario (10 min)
2. Identify automatic negative thoughts (5 min)
3. Challenge those thoughts with evidence (10 min)
4. Develop alternative, balanced thoughts (5 min)

**Discussion Questions:**
- "What was your first thought when you heard this scenario?"
- "What evidence supports or contradicts that thought?"
- "What would you tell a friend in this situation?"

**Materials Needed:**
- Thought record worksheet
- Example scenarios relevant to group
      `},{id:"problem-solving",duration:"40 min",title:"Problem-Solving Framework",description:"Practice 5-step problem solving with real scenarios",content:`
**Purpose:** Teach and practice a structured approach to solving problems.

**The 5-Step Framework:**
1. **Define the problem** - What exactly is the issue?
2. **Brainstorm solutions** - Generate multiple options without judgment
3. **Evaluate options** - Consider pros and cons of each
4. **Choose and implement** - Select the best option and make a plan
5. **Review the outcome** - Did it work? What did you learn?

**Activities:**
1. Present the framework (10 min)
2. Work through an example together (15 min)
3. Small group practice with real scenarios (15 min)

**Example Scenarios:**
- Transportation challenges
- Conflict with family member
- Managing court requirements with work schedule
- Financial constraints

**Facilitator Tips:**
- Encourage creative brainstorming
- Remind participants there's rarely one "right" answer
- Focus on realistic, actionable solutions
      `},{id:"discussion",duration:"20 min",title:"Group Discussion",description:"Share insights and personal applications",content:`
**Purpose:** Allow participants to process learning and share personal connections.

**Discussion Prompts:**
- "Which cognitive distortion do you recognize in yourself?"
- "Can you think of a recent situation where this problem-solving approach would have helped?"
- "What's one thing from today that you want to try this week?"

**Facilitation Guidelines:**
- Create a safe space for sharing
- Validate all contributions
- Gently redirect if discussion goes off-track
- Ensure everyone who wants to speak has opportunity
- Don't force participation

**Group Agreements (Review if needed):**
- Confidentiality
- Respect
- One person speaks at a time
- Right to pass
      `},{id:"wrapup",duration:"10 min",title:"Wrap-up & Takeaways",description:"Participants share key learnings",content:`
**Purpose:** Consolidate learning and prepare participants to apply concepts outside of class.

**Activities:**
1. Quick recap of main concepts (2-3 min)
2. Each participant shares one takeaway (5-6 min)
3. Preview next session topic (1 min)
4. Reminder about next class date/time (1 min)

**Closing Questions:**
- "What's one thing you learned today?"
- "What's one thing you'll try before our next session?"
- "Any questions before we close?"

**Administrative:**
- Ensure all takeaways are captured in the system
- Note any follow-up needed for individual participants
- Collect any materials/worksheets
- Thank participants for their engagement
      `}];return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(c.CardTitle,{children:"Session Agenda"}),(0,b.jsx)(c.CardDescription,{children:"Today's class structure and topics"})]}),(0,b.jsx)("button",{onClick:()=>h(!a),className:"rounded-lg p-2 hover:bg-accent",children:a?(0,b.jsx)(f.default,{className:"h-4 w-4"}):(0,b.jsx)(e.default,{className:"h-4 w-4"})})]})}),a&&(0,b.jsx)(c.CardContent,{children:(0,b.jsx)("div",{className:"space-y-4",children:(0,b.jsx)("div",{className:"space-y-3",children:l.map(a=>(0,b.jsxs)("button",{onClick:()=>k(a.id),className:"flex w-full gap-3 rounded-lg border p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent/50",children:[(0,b.jsx)(d.Badge,{variant:"outline",className:"h-6 shrink-0",children:a.duration}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{className:"font-medium",children:a.title}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:a.description})]})]},a.id))})})})]}),j&&(0,b.jsx)(i,{item:l.find(a=>a.id===j),onClose:()=>k(null)})]})}a.s(["SessionAgenda",()=>j],26121)},27986,a=>{"use strict";var b=a.i(87924),c=a.i(3130),d=a.i(40695),e=a.i(46143),f=a.i(54161),g=a.i(65733),h=a.i(70106);let i=(0,h.default)("QrCode",[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]),j=(0,h.default)("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]),k=(0,h.default)("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);var l=a.i(15618),m=a.i(5151),n=a.i(33441),o=a.i(72131);let p=[{id:1,name:"Sarah Johnson",status:"present",checkedInAt:"2:03 PM"},{id:2,name:"Michael Chen",status:"present",checkedInAt:"2:01 PM"},{id:3,name:"Jennifer Martinez",status:"present",checkedInAt:"2:05 PM"},{id:4,name:"David Williams",status:"absent",checkedInAt:null},{id:5,name:"Emily Brown",status:"present",checkedInAt:"2:02 PM"},{id:6,name:"James Taylor",status:"present",checkedInAt:"2:04 PM"},{id:7,name:"Lisa Anderson",status:"present",checkedInAt:"2:06 PM"},{id:8,name:"Robert Garcia",status:"present",checkedInAt:"2:00 PM"}];function q(){let[a,h]=(0,o.useState)(!1),[q,r]=(0,o.useState)(!1),s=p.filter(a=>"present"===a.status).length,t="ps-s4-2024",u=`/participant/checkin/${t}`;return(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(c.CardTitle,{children:"Attendance"}),(0,b.jsxs)(c.CardDescription,{children:[s," of ",p.length," participants present"]})]}),(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsxs)(d.Button,{variant:"outline",size:"sm",className:"gap-2 bg-transparent",children:[(0,b.jsx)(l.Plus,{className:"h-4 w-4"}),"Add Participant"]}),(0,b.jsxs)(d.Button,{variant:"outline",size:"sm",className:"gap-2 bg-transparent",onClick:()=>h(!a),children:[(0,b.jsx)(i,{className:"h-4 w-4"}),a?"Hide":"Show"," QR"]})]})]})}),(0,b.jsx)(c.CardContent,{children:(0,b.jsx)("div",{className:"space-y-2",children:p.map(a=>(0,b.jsxs)("div",{className:"flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)(e.Checkbox,{checked:"present"===a.status,className:"h-5 w-5"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"font-medium",children:a.name}),a.checkedInAt&&(0,b.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Checked in at ",a.checkedInAt]})]})]}),(0,b.jsx)(f.Badge,{variant:"present"===a.status?"secondary":"outline",className:"present"===a.status?"gap-1 bg-primary/10 text-primary":"gap-1",children:"present"===a.status?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(j,{className:"h-3 w-3"}),"Present"]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{className:"h-3 w-3"}),"Absent"]})})]},a.id))})}),(0,b.jsx)(g.Dialog,{open:a,onOpenChange:h,children:(0,b.jsxs)(g.DialogContent,{className:"sm:max-w-md",children:[(0,b.jsxs)(g.DialogHeader,{children:[(0,b.jsx)(g.DialogTitle,{children:"Check-In QR Code"}),(0,b.jsx)(g.DialogDescription,{children:"Participants can scan this code to check in to the session"})]}),(0,b.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-4 py-6",children:[(0,b.jsx)("div",{className:"rounded-lg bg-white p-6 shadow-lg",children:(0,b.jsx)(i,{className:"h-48 w-48 text-primary"})}),(0,b.jsxs)("div",{className:"text-center",children:[(0,b.jsxs)("p",{className:"text-sm font-medium",children:["Session ID: ",t]}),(0,b.jsx)("p",{className:"mt-1 text-xs text-muted-foreground",children:"Check-in opens 10 minutes before class"})]}),(0,b.jsx)(d.Button,{onClick:()=>{navigator.clipboard.writeText(u),r(!0),setTimeout(()=>r(!1),2e3)},size:"sm",className:"w-full gap-2",variant:q?"secondary":"outline",children:q?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(n.Check,{className:"h-4 w-4"}),"Copied!"]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(m.Copy,{className:"h-4 w-4"}),"Copy Check-In Link"]})})]})]})})]})}a.s(["AttendanceSection",()=>q],27986)},26001,a=>{"use strict";var b=a.i(87924),c=a.i(3130),d=a.i(46893),e=a.i(40695),f=a.i(4720);let g=(0,a.i(70106).default)("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);var h=a.i(72131);function i(){let[a,i]=(0,h.useState)("");return(0,b.jsxs)(c.Card,{className:"lg:sticky lg:top-6",children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(f.FileText,{className:"h-5 w-5 text-primary"}),(0,b.jsxs)("div",{children:[(0,b.jsx)(c.CardTitle,{children:"Facilitator Notes"}),(0,b.jsx)(c.CardDescription,{children:"Private session notes"})]})]})}),(0,b.jsx)(c.CardContent,{children:(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsx)(d.Textarea,{placeholder:"Add notes about the session, participant engagement, concerns, etc...",value:a,onChange:a=>i(a.target.value),className:"min-h-[300px] resize-none"}),(0,b.jsxs)(e.Button,{className:"w-full gap-2 bg-transparent",variant:"outline",children:[(0,b.jsx)(g,{className:"h-4 w-4"}),"Save Notes"]}),(0,b.jsxs)("div",{className:"space-y-2 rounded-lg border bg-accent/50 p-3",children:[(0,b.jsx)("p",{className:"text-xs font-medium text-muted-foreground",children:"QUICK NOTES"}),(0,b.jsxs)("div",{className:"space-y-1 text-xs text-muted-foreground",children:[(0,b.jsx)("p",{children:"• Session started: 2:02 PM"}),(0,b.jsx)("p",{children:"• 16/18 participants present"}),(0,b.jsx)("p",{children:"• Good group engagement"})]})]})]})})]})}a.s(["FacilitatorNotes",()=>i],26001)},84838,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(40695),e=a.i(46893),f=a.i(3130),g=a.i(70106);let h=(0,g.default)("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]),i=(0,g.default)("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);var j=a.i(4720),k=a.i(25015);let l=(0,g.default)("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]),m=(0,g.default)("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]),n=(0,g.default)("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);function o(){let[a,g]=(0,c.useState)(""),[o,p]=(0,c.useState)(!1),[q,r]=(0,c.useState)(["Session started: 2:02 PM","16/18 participants present","Good group engagement"]),s=()=>{p(!o)};return(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsxs)(f.Card,{children:[(0,b.jsx)(f.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(h,{className:"h-5 w-5 text-primary"}),(0,b.jsxs)("div",{children:[(0,b.jsx)(f.CardTitle,{children:"Session Video"}),(0,b.jsx)(f.CardDescription,{children:"Control video playback for all participants"})]})]}),(0,b.jsx)("span",{className:"bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium",children:"Facilitator"})]})}),(0,b.jsxs)(f.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"bg-black rounded-lg aspect-video flex items-center justify-center relative group",children:[(0,b.jsx)(h,{className:"h-16 w-16 text-gray-600"}),(0,b.jsx)("div",{className:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity",children:(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(d.Button,{size:"sm",variant:"ghost",onClick:s,className:"text-white hover:bg-white/20",children:o?(0,b.jsx)(l,{className:"h-5 w-5"}):(0,b.jsx)(k.Play,{className:"h-5 w-5"})}),(0,b.jsx)("div",{className:"flex-1 bg-white/30 h-1 rounded-full relative cursor-pointer",children:(0,b.jsx)("div",{className:"absolute left-0 top-0 h-full w-0 bg-primary rounded-full"})}),(0,b.jsx)("span",{className:"text-white text-sm font-medium",children:"0:00 / 0:00"}),(0,b.jsx)(d.Button,{size:"sm",variant:"ghost",className:"text-white hover:bg-white/20",children:(0,b.jsx)(m,{className:"h-5 w-5"})}),(0,b.jsx)(d.Button,{size:"sm",variant:"ghost",className:"text-white hover:bg-white/20",children:(0,b.jsx)(n,{className:"h-5 w-5"})})]})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,b.jsxs)(d.Button,{onClick:s,variant:"outline",className:"gap-2 bg-transparent",children:[o?(0,b.jsx)(l,{className:"h-4 w-4"}):(0,b.jsx)(k.Play,{className:"h-4 w-4"}),o?"Pause":"Play"," for All"]}),(0,b.jsxs)(d.Button,{onClick:()=>{console.log("Video shared with all participants")},className:"bg-primary hover:bg-primary/90 gap-2",children:[(0,b.jsx)(i,{className:"h-4 w-4"}),"Share Video"]})]})]})]}),(0,b.jsxs)(f.Card,{children:[(0,b.jsx)(f.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(j.FileText,{className:"h-5 w-5 text-primary"}),(0,b.jsxs)("div",{children:[(0,b.jsx)(f.CardTitle,{children:"Facilitator Notes"}),(0,b.jsx)(f.CardDescription,{children:"Private session notes"})]})]})}),(0,b.jsxs)(f.CardContent,{className:"space-y-4",children:[(0,b.jsx)(e.Textarea,{placeholder:"Add notes about the session, participant engagement, concerns, etc...",value:a,onChange:a=>g(a.target.value),className:"border-teal-200 focus:border-teal-600 min-h-24"}),(0,b.jsxs)(d.Button,{onClick:()=>{console.log("Notes saved:",a)},variant:"outline",className:"border-teal-200 hover:bg-teal-50 bg-transparent",children:[(0,b.jsx)(j.FileText,{className:"h-4 w-4 mr-2"}),"Save Notes"]}),(0,b.jsxs)("div",{className:"mt-6 pt-6 border-t",children:[(0,b.jsx)("p",{className:"text-sm font-semibold mb-3 text-primary uppercase tracking-wide",children:"Quick Notes"}),(0,b.jsx)("ul",{className:"space-y-2",children:q.map((a,c)=>(0,b.jsxs)("li",{className:"flex items-start gap-2 text-sm",children:[(0,b.jsx)("span",{className:"text-primary font-bold",children:"•"}),(0,b.jsx)("span",{children:a})]},c))})]})]})]})]})}a.s(["SessionVideoSection",()=>o],84838)}];

//# sourceMappingURL=components_3360eec7._.js.map