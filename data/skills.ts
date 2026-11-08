export interface SkillGroup {
  category: string;
  skills: string[];
  /** Renders the pills solid indigo (the CV does this for AI / Machine Learning). */
  highlight?: boolean;
}

/**
 * Grouped exactly as on the CV.
 * Items marked "brief only" came from your original website brief and are NOT
 * on the CV. Keep them only if they are accurate, and add them to the CV too
 * so both documents agree.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "PHP", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Responsive UI"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "FastAPI", "Flask", "Django", "REST APIs", "PHP Integration"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQLite", "Firebase", "SQLAlchemy"],
  },
  {
    category: "AI / Machine Learning",
    highlight: true,
    skills: [
      "LLM Integration",
      "RAG",
      "Text Embeddings",
      "Semantic Search",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Hugging Face",
      "Sentence Transformers",
      "OpenAI API",
      "Groq API",
      "Recommendation Systems",
      "Pandas",
      "NumPy",
      // brief only:
      "FAISS",
      "Vector Databases",
      "LangChain",
      "LlamaIndex",
    ],
  },
  {
    category: "Automation",
    skills: ["API Webhooks", "Workflow Automation", "Third-party APIs"],
  },
  {
    category: "Tools",
    // "Ollama" is brief only
    skills: ["Git", "GitHub", "Docker", "Vercel", "cPanel", "Ollama"],
  },
  {
    category: "Game Development",
    skills: ["Unity", "Construct 3"],
  },
];
