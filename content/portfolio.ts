export const portfolioContent = {
  profile: {
    initials: "VS",
    name: "Vivek Sahu",
    eyebrow: "I build AI products and developer tools.",
    role: "Full-stack developer building AI and workflow tooling",
    headline: "Product Mindset",
    summary:
      "I turn AI systems, workflow tools, and product ideas into interfaces that feel sharp, fast, and useful in the real world.",
    mailUrl: "mailto:vivek18q@gmail.com",
    githubUrl: "https://github.com/vivekvx",
    cityImage: "/assets/city.jpg",
    portraitImage: "/assets/profile.jpeg",
    voiceIntro:
      "Hey, I am Vivek Sahu. I build AI agents, developer tooling, and reliable full stack systems.",
  },
  navigation: [
    { label: "Work", href: "#experience" },
    { label: "GitHub", href: "#github-sync" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Wins", href: "#achievements" },
    { label: "Projects", href: "#projects" },
  ],
  socialLinks: [
    {
      label: "GitHub",
      handle: "@vivekvx",
      href: "https://github.com/vivekvx",
      icon: "/assets/icons/github.svg",
      tone: "",
    },
    {
      label: "LinkedIn",
      handle: "connect",
      href: "https://www.linkedin.com/in/viveksahuvx/",
      icon: "/assets/icons/linkedin.svg",
      tone: "linkedin",
    },
    {
      label: "X / Twitter",
      handle: "@Vivekvkvq",
      href: "https://x.com/Vivekvkvq",
      icon: "/assets/icons/x.svg",
      tone: "",
    },
  ],
  experience: [
    {
      title: "AI Developer",
      company: "Trivana Capital",
      meta: ["Internship", "Oct 2025 - Present", "Remote · Raipur, Chhattisgarh, India"],
      description: "Building AI apps with a focus on useful product workflows and automation.",
      icon: "/assets/icons/trivana.svg",
      tone: "trivana",
      tags: [],
    },
    {
      title: "Member",
      company: "GDGSSIPMT",
      meta: ["Sep 2024 - Present", "On-site · India"],
      description:
        "Part of an AI/ML team building machine learning models and real-world data-driven solutions.",
      icon: "/assets/icons/gdg.svg",
      tone: "gdg",
      tags: ["Machine Learning", "Python", "Data Analysis"],
    },
  ],
  about: [
    "I build full-stack products with a bias for clean interfaces, useful automation, and reliable backend systems.",
    "Currently focused on AI assistants, workflow context restoration, developer tools, and realtime app infrastructure.",
    "Comfortable across TypeScript, Python, React, Node.js, VS Code extension APIs, MCP servers, and voice-agent pipelines.",
    "I care about turning raw technical systems into products that feel sharp, fast, and easy to understand.",
  ],
  stackGroups: [
    {
      title: "LLM Engineering",
      items: ["LLMs", "RAG", "AI Agents", "Multi-Agent Systems", "Prompt Engineering", "Evals", "Tool Calling", "MCP", "Voice AI Agents"],
    },
    {
      title: "AI Frameworks",
      items: ["LangChain", "LlamaIndex", "CrewAI", "Ollama", "Anthropic", "OpenAI", "OpenCV", "OCR", "Tesseract"],
    },
    {
      title: "Cloud & AI Infra",
      items: ["Python", "FastAPI", "AWS", "GCP", "Vertex AI", "Firebase", "Docker", "Git", "GitHub Actions", "LiveKit", "n8n"],
    },
    {
      title: "Product Engineering",
      items: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "VS Code API"],
    },
  ],
  achievements: [
    {
      number: "01",
      title: "Paytm AI Hackathon",
      badge: "Finalist",
      badgeTone: "blue",
      org: "Paytm · Bengaluru, India",
      year: "2026",
      icon: "/assets/icons/paytm.svg",
      iconTone: "paytm",
    },
    {
      number: "02",
      title: "SBI Mutual Fund Hackathon",
      badge: "Win",
      badgeTone: "green",
      org: "IIT Bombay Tech-Fest · Mumbai, India",
      year: "2024",
      icon: "/assets/icons/sbi.svg",
      iconTone: "sbi",
    },
  ],
  projects: [
    {
      name: "Juris",
      href: "https://github.com/vivekvx/juris",
      kind: "Trust-first AI legal workspace · Next.js + FastAPI",
      summary: "Explainable AI workspace for legal document understanding and research",
      description:
        "A production-ready legal AI workspace designed for trust and explainability. It enables users to upload complex legal documents, ask follow-up questions, and receive grounded answers with verifiable citations.",
      icon: "/assets/icons/juris.svg",
      built: [
        "Built a decoupled architecture with a Next.js 16 frontend and a modular FastAPI backend.",
        "Designed a scalable document pipeline for PDF extraction, chunking, and RAG-based retrieval.",
        "Implemented a storage provider abstraction supporting local filesystem for dev and Firebase Storage for production.",
        "Integrated Google Cloud Speech-to-Text and Text-to-Speech for seamless voice conversations."
      ],
      challenge: [
        "Integrated Firebase Authentication securely across the Next.js frontend and FastAPI backend via session cookies.",
        "Built an explainable RAG pipeline that prioritizes verified citations and trust over raw intelligence."
      ],
      tags: ["Next.js", "FastAPI", "Python", "RAG", "Firebase", "TypeScript", "Architecture"],
      defaultOpen: true,
    },
    {
      name: "Agentrail",
      href: "https://github.com/vivekvx/Agentrail",
      kind: "AI debugging agent · LangGraph + FastAPI + Next.js",
      summary: "Verification-first AI agent for evidence-backed bug fixes",
      description:
        "Agentrail automates the full debugging loop — scanning a repository, collecting grounded evidence, explaining root cause, generating a patch diff, running tests, and scoring residual risk — then pauses at a human-in-the-loop approval gate before anything touches the repo.",
      icon: "/assets/icons/agentrail.svg",
      built: [
        "Designed a multi-stage LangGraph pipeline: Scan → Search → Evidence → Root Cause → Fix Strategy → Patch Preview → Approval Gate → Test Runner → Risk Score → PR Draft.",
        "Built a FastAPI backend with JWT auth, SSE streaming for live run events, and PostgreSQL persistence via SQLAlchemy.",
        "Shipped a Next.js dashboard with real-time agent run monitoring, auth guard, and token management.",
      ],
      challenge: [
        "Replaced polling with SSE to stream live agent events without blocking the UI thread.",
        "Implemented a LangGraph interrupt node as the approval gate so the agent suspends mid-pipeline awaiting explicit user sign-off.",
      ],
      tags: ["Python", "LangGraph", "FastAPI", "Next.js", "PostgreSQL", "SSE", "JWT", "LLM", "Patch Diff"],
      defaultOpen: false,
    },
    {
      name: "CiteMind",
      href: "https://github.com/vivekvx/CiteMind",
      kind: "RAG research assistant · Next.js + FastAPI",
      summary: "Citation-first document Q&A with visible answer-quality metrics",
      description:
        "CiteMind lets you upload PDFs, EPUBs, Markdown, or text files and ask questions against them. It retrieves grounded chunks, synthesises cited answers, and runs evaluation scores for faithfulness, answer relevance, context relevance, and citation coverage — so every answer can be audited.",
      icon: "/assets/icons/citemind.svg",
      built: [
        "Built a FastAPI retrieval backend with chunk persistence, an in-memory vector index, and optional FlashRank reranking for hard context lookups.",
        "Wired an intent router that handles summaries, topics, study notes, flashcards, comparisons, definitions, and Q&A flows from a single query entry point.",
        "Deployed the full stack on Vercel with Next.js rewrites proxying all API calls through the public domain.",
      ],
      challenge: [
        "Filtered table-of-contents and page-marker noise from PDF chunks that polluted early retrieval results.",
        "Tuned the evaluation pipeline to score faithfulness and citation coverage without requiring an external judge model.",
      ],
      tags: ["Next.js", "FastAPI", "Python", "RAG", "Vector Search", "FlashRank", "LlamaParse", "Evals", "Vercel"],
      defaultOpen: false,
    },
    {
      name: "FlowRestore",
      href: "https://github.com/vivekvx/Flowrestore",
      kind: "VS Code extension",
      summary: "Workflow context restoration observation infrastructure",
      description:
        "A VS Code extension foundation that tracks development context signals like file switching, cursor movement, and text selection to reconstruct developer workflow state.",
      icon: "/assets/icons/flowrestore.svg",
      built: [
        "Implemented active editor, cursor, and selection observers for VS Code.",
        "Created compact session snapshots for active files, latest cursor state, and selected text preview.",
      ],
      challenge: [
        "Reduced noisy context streams with deduplication and whitespace collapsing.",
        "Kept extension lifecycle code modular with clean observer and log boundaries.",
      ],
      tags: ["TypeScript", "VS Code API", "Extension Host", "Workflow Signals", "Session Snapshots", "Tests"],
      defaultOpen: false,
    },
  ],
  quickActions: [
    { label: "Jump to Home", href: "#home" },
    { label: "Jump to Work Experience", href: "#experience" },
    { label: "Jump to GitHub Sync", href: "#github-sync" },
    { label: "Jump to About", href: "#about" },
    { label: "Jump to Stack", href: "#stack" },
    { label: "Jump to Achievements", href: "#achievements" },
    { label: "Jump to Projects", href: "#projects" },
  ],
  copyActions: [
    { label: "Copy GitHub URL", value: "https://github.com/vivekvx" },
    { label: "Copy LinkedIn URL", value: "https://www.linkedin.com/in/viveksahuvx/" },
  ],
} as const;

export type PortfolioContent = typeof portfolioContent;
