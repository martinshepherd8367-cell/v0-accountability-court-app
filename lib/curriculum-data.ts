export interface SessionActivity {
  title: string
  duration: string
  purpose?: string
  script?: string
  prompts?: string[]
  instructions?: string[]
}

export interface Session {
  id: number
  title: string
  overview: string
  objectives: string[]
  materials: string[]
  workbookPages: string
  duration: string
  activities: SessionActivity[]
  homework?: string
}

export const primeSolutionsCurriculum: Session[] = [
  {
    id: 1,
    title: "Understanding Change & Treatment Goals",
    overview:
      "Participants explore what motivates them to change and define their personal goals for treatment. This opening session introduces the stages of change and encourages self-assessment to identify where each participant is starting their recovery journey.",
    objectives: [
      "Recognize change as a process, not an event.",
      "Identify their readiness for change.",
      "Define one short-term and one long-term goal for recovery.",
    ],
    materials: ["Prime Solutions Workbook, pp. 17–19", "Whiteboard or flip chart", "Markers"],
    workbookPages: "17-19",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'Every Voyage Begins Somewhere'",
        duration: "10 minutes",
        purpose: "Introduce treatment as a journey that begins with self-awareness.",
        script:
          "Recovery is a process of learning who you are and where you're headed. The first step is understanding your current stage of change.",
        prompts: [
          "What brought you to treatment?",
          "What does 'change' mean to you right now?",
          "What do you hope to be different by the end of this program?",
        ],
      },
      {
        title: "Reading & Reflection – 'The Port You Leave Behind'",
        duration: "10 minutes",
        instructions: ["Read participant section: My First Action Plan (p. 17)."],
        prompts: ["What habits or thoughts are holding you back?", "What does leaving those behind look like?"],
      },
      {
        title: "Activity – Mapping Motivation",
        duration: "20 minutes",
        instructions: [
          "Participants complete a short self-assessment identifying their stage of change (Precontemplation → Maintenance).",
          "Group shares examples of what progress might look like at each stage.",
        ],
      },
      {
        title: "Application Exercise – Building an Action Plan",
        duration: "15 minutes",
        instructions: [
          "Use the My First Action Plan worksheet.",
          "Have participants name one immediate goal and one longer-term aspiration.",
        ],
      },
      {
        title: "Cognitive Restructuring – Shifting from Fear to Curiosity",
        duration: "10 minutes",
        instructions: ["Discuss how fear can block progress and curiosity can open new possibilities."],
        prompts: ["What would you try if you weren't afraid to fail?"],
      },
      {
        title: "Planning – Daily Practice of Change",
        duration: "15 minutes",
        instructions: [
          "Encourage participants to name one daily habit that supports their goal (e.g., journaling, attending meetings, walking).",
        ],
      },
      {
        title: "Closing Reflection – 'Where You're Headed'",
        duration: "10 minutes",
        script: "It doesn't matter where you start—what matters is that you've started.",
        prompts: [],
      },
    ],
    homework: "Write a short statement beginning with 'My change begins with…'",
  },
  {
    id: 2,
    title: "The Stages of Change: How People Make Changes",
    overview:
      "Participants identify their personal stage of change and learn that ambivalence and relapse are part of growth. The goal is to normalize the process and increase motivation.",
    objectives: [
      "Describe the five stages of change.",
      "Identify personal stage and barriers.",
      "Recognize ambivalence as part of change.",
    ],
    materials: ["Prime Solutions Workbook, pp. 18–21", "Stage of Change diagram handout"],
    workbookPages: "18-21",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'No Way, Not Now → The New Me'",
        duration: "10 minutes",
        purpose: "Introduce the cyclical nature of change.",
        script: "Change is like climbing a spiral staircase—you may circle around, but you're still going up.",
      },
      {
        title: "Reading & Reflection – 'Hey, I've Done This Before!'",
        duration: "10 minutes",
        instructions: ["Participants read the story on p. 21."],
        prompts: ["When have you succeeded in change before?", "What helped you then?"],
      },
      {
        title: "Activity – Stage Self-Assessment",
        duration: "20 minutes",
        instructions: ["Participants rate where they fall on each stage (1–10 scale).", "Group discussion follows."],
      },
      {
        title: "Application Exercise – Ambivalence Mapping",
        duration: "15 minutes",
        instructions: [
          "Draw two columns: Reasons to Change and Reasons to Stay the Same.",
          "Discuss how both are normal.",
        ],
      },
      {
        title: "Cognitive Restructuring – From Resistance to Readiness",
        duration: "10 minutes",
        instructions: [
          "Discuss thought distortions like 'It's too late for me.'",
          "Reframe as 'I can start where I am.'",
        ],
      },
      {
        title: "Planning – Moving Forward One Step",
        duration: "15 minutes",
        instructions: ["Each participant writes one small action that would move them to the next stage."],
      },
      {
        title: "Closing Reflection – 'Every Step Counts'",
        duration: "10 minutes",
        script: "Change happens slowly, then all at once.",
      },
    ],
    homework: "Journal one area of life where change feels possible.",
  },
  {
    id: 3,
    title: "Learning from the Past",
    overview: "Participants reflect on previous attempts to change and what can be learned from those experiences.",
    objectives: [
      "Identify past relapse triggers.",
      "Recognize previous strengths and strategies.",
      "Learn to view setbacks as information, not failure.",
    ],
    materials: ["Prime Solutions Workbook, pp. 22–25"],
    workbookPages: "22-25",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'Rewind the Tape'",
        duration: "10 minutes",
        script: "Every experience—good or bad—contains data about what works for us.",
      },
      {
        title: "Reading & Reflection – Rewinding My Game Tape",
        duration: "10 minutes",
        instructions: ["Have participants read the section aloud and discuss lessons from relapse."],
      },
      {
        title: "Activity – Pattern Recognition",
        duration: "20 minutes",
        instructions: ["Group maps common relapse triggers (stress, isolation, anger).", "Identify warning signs."],
      },
      {
        title: "Application Exercise – Lessons Learned",
        duration: "15 minutes",
        instructions: ["Each participant lists three insights from past relapses and what they'd do differently."],
      },
      {
        title: "Cognitive Restructuring – Failure vs. Feedback",
        duration: "10 minutes",
        instructions: ["Reframe the idea of relapse: 'It's a signal, not a sentence.'"],
      },
      {
        title: "Planning – Prevention Blueprint",
        duration: "15 minutes",
        instructions: ["Participants design short strategies to address top triggers."],
      },
      {
        title: "Closing Reflection – 'The Data of Experience'",
        duration: "10 minutes",
      },
    ],
    homework: "Write one page on what their past taught them about resilience.",
  },
  {
    id: 4,
    title: "Staging My Treatment Plan",
    overview: "Participants connect their stage of change to treatment goals and learn to personalize their plan.",
    objectives: [
      "Link personal goals to stage of change.",
      "Increase ownership of the treatment process.",
      "Build accountability through measurable objectives.",
    ],
    materials: ["Prime Solutions Workbook, pp. 26–34"],
    workbookPages: "26-34",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'Your Recovery Map'",
        duration: "10 minutes",
        script: "If recovery is the journey, your plan is the map.",
      },
      {
        title: "Reading & Reflection – Two Points in Time",
        duration: "10 minutes",
        instructions: ["Participants identify where they were and where they want to be."],
      },
      {
        title: "Activity – Goal Setting",
        duration: "20 minutes",
        instructions: ["Break goals into substance, family, legal, and personal areas."],
      },
      {
        title: "Application Exercise – SMART Goals",
        duration: "15 minutes",
        instructions: [
          "Convert general ideas into SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound.",
        ],
      },
      {
        title: "Cognitive Restructuring – From Obligation to Ownership",
        duration: "10 minutes",
        prompts: ["This isn't what my PO wants—it's what I need."],
      },
      {
        title: "Planning – Treatment Commitments",
        duration: "15 minutes",
        instructions: ["Participants select three concrete commitments for the next week."],
      },
      {
        title: "Closing Reflection – 'Direction Over Speed'",
        duration: "10 minutes",
      },
    ],
    homework: "Journal daily about progress toward one goal.",
  },
  {
    id: 5,
    title: "Values and Identity: This Is Who I Am",
    overview: "This session helps participants reconnect with personal values and develop identity beyond addiction.",
    objectives: [
      "Define key personal values.",
      "Recognize inconsistency between values and past behavior.",
      "Strengthen motivation for change through self-concept.",
    ],
    materials: ["Prime Solutions Workbook, pp. 41–45"],
    workbookPages: "41-45",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'Who Am I Becoming?'",
        duration: "10 minutes",
        script: "Recovery isn't about changing who you are—it's about returning to who you were meant to be.",
      },
      {
        title: "Reading & Reflection – This Is Who I Am",
        duration: "10 minutes",
        instructions: ["Group reads values list and reflects on which feel most authentic."],
      },
      {
        title: "Activity – Core Values Ranking",
        duration: "20 minutes",
        instructions: ["Participants circle their top 5 and share why those matter."],
      },
      {
        title: "Application Exercise – Aligning Actions",
        duration: "15 minutes",
        prompts: ["Which behaviors support or violate your values?"],
      },
      {
        title: "Cognitive Restructuring – Shame vs. Guilt",
        duration: "10 minutes",
        instructions: ["Explore difference between 'I am bad' and 'I did something bad.'"],
      },
      {
        title: "Planning – Personal Mantra",
        duration: "15 minutes",
        instructions: ["Each participant writes a personal statement: 'I am becoming someone who…'"],
      },
      {
        title: "Closing Reflection – 'Living My Values'",
        duration: "10 minutes",
      },
    ],
    homework: "Practice one action that aligns with a chosen value.",
  },
  {
    id: 6,
    title: "Happiness and Gratitude",
    overview: "Participants examine gratitude as a tool for emotional balance and relapse prevention.",
    objectives: [
      "Understand gratitude as emotional regulation.",
      "Practice reframing negative thinking.",
      "Develop a gratitude list to reduce stress and cravings.",
    ],
    materials: ["Prime Solutions Workbook, pp. 46–47"],
    workbookPages: "46-47",
    duration: "60–90 minutes",
    activities: [
      {
        title: "Opening Framing – 'The Science of Gratitude'",
        duration: "10 minutes",
        instructions: ["Discuss how gratitude activates the brain's reward center."],
      },
      {
        title: "Reading & Reflection – Five Things I'm Grateful For",
        duration: "10 minutes",
        instructions: ["Participants share examples of gratitude in recovery."],
      },
      {
        title: "Activity – Gratitude Wall",
        duration: "20 minutes",
        instructions: ["Group writes thankful statements on sticky notes; display in classroom."],
      },
      {
        title: "Application Exercise – Turning Negatives to Positives",
        duration: "15 minutes",
        instructions: ["Reframe complaints into appreciation statements."],
      },
      {
        title: "Cognitive Restructuring – Wanting Less vs. Having More",
        duration: "10 minutes",
        instructions: ["Discuss how reducing expectations creates contentment."],
      },
      {
        title: "Planning – Gratitude Journal",
        duration: "15 minutes",
        instructions: ["Assign daily reflection task for one week."],
      },
      {
        title: "Closing Reflection – 'Peace of Mind'",
        duration: "10 minutes",
      },
    ],
    homework: "Write about how gratitude changes stress response.",
  },
]

// Add more sessions 7-16 as needed
