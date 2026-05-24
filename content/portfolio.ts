export const portfolioContent = {
  profile: {
    initials: "VS",
    name: "Vivek Sahu",
    eyebrow: "I build AI products and developer tools.",
    role: "Full-stack developer building AI and workflow tooling",
    headline: "Product Mindset",
    summary:
      "I turn AI systems, workflow tools, and product ideas into interfaces that feel sharp, fast, and useful in the real world.",
    supportUrl: "https://www.buymeacoffee.com/vivekvx",
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
      name: "Friday.ai",
      href: "https://github.com/vivekvx/Friday.ai",
      kind: "AI voice agent + MCP server",
      summary: "Fully Responsive Intelligent Digital Assistant for You",
      description:
        "A Tony Stark-inspired AI assistant with a FastMCP backend and LiveKit voice agent. It listens, reasons through an LLM, calls tools in real time, and speaks back through TTS.",
      icon: "/assets/icons/friday.svg",
      built: [
        "Built a FastMCP server exposing tools, prompts, and resources over SSE.",
        "Wired a LiveKit voice pipeline with STT, Gemini 2.5 Flash, and OpenAI TTS.",
      ],
      challenge: [
        "Coordinated separate server and voice-agent runtimes that must operate together.",
        "Designed the architecture so new MCP tools can be added cleanly.",
      ],
      tags: ["Python", "FastMCP", "LiveKit", "Gemini", "OpenAI TTS", "Sarvam STT", "SSE", "uv"],
      defaultOpen: true,
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
