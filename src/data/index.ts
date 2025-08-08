export type Project = {
    slug: string;
    title: string;
    summary: string;
    content: string[];
    tags: string[];
    image: string;
    repoUrl?: string;
    demoUrl?: string;
    date: string;
    featured?: boolean;  // Add this
  };
  
  export type Profile = {
    name: string;
    role: string;
    location: string;
    bio: string;
    avatar: string;
    skills: string[];
  };
  
  const profile: Profile = {
    name: "Rahul P.",
    role: "Data Scientist",
    location: "Remote · Delhi INDIA",
    bio: "Data Scientist specializing in machine learning, NLP, and analytics. I build end-to-end data products that drive business value.",
    avatar: "/images/your-profile-image.jpg", // Replace with your image filename
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "SQL",
      "Airflow",
      "Docker",
      "FastAPI",
      "LangChain",
      "LLMs",
      "Visualization",
    ],
  };
  
  const images = [
    "https://picsum.photos/seed/ds-1/1200/675",
    "https://picsum.photos/seed/ds-2/1200/675",
    "https://picsum.photos/seed/ds-3/1200/675",
    "https://picsum.photos/seed/ds-4/1200/675",
    "https://picsum.photos/seed/ds-5/1200/675",
    "https://picsum.photos/seed/ds-6/1200/675",
  ];
  
  const baseProjects: Omit<Project, "slug" | "date">[] = [
    {
      title: "Customer Churn Prediction",
      summary:
        "Built a gradient boosting model to predict customer churn and identify key retention levers.",
      content: [
        "Explored and engineered features from transactional and support data.",
        "Trained XGBoost and calibrated probabilities; AUC improved from 0.68 to 0.84.",
        "Deployed real-time scoring API and built dashboards for customer success.",
      ],
      tags: ["Python", "XGBoost", "ML", "MLOps"],
      image: images[0],
      repoUrl: "https://github.com/yourname/churn-model",
      demoUrl: "",
    },
    {
      title: "NLP: Support Ticket Classifier",
      summary:
        "Automated triage of support tickets with BERT fine-tuning for multi-label classification.",
      content: [
        "Cleaned and labeled 50k tickets with weak supervision.",
        "Fine-tuned BERT; macro-F1 increased by 21%.",
        "Integrated into Zendesk workflow, reducing response time by 35%.",
      ],
      tags: ["Python", "Transformers", "NLP"],
      image: images[1],
      repoUrl: "https://github.com/yourname/ticket-nlp",
      demoUrl: "",
      featured : true,
    },
    {
      title: "Time Series Forecasting",
      summary:
        "Built demand forecasts using Prophet and LSTMs for a retail portfolio.",
      content: [
        "Evaluated SARIMA, Prophet, and LSTM architectures.",
        "Deployed weekly forecasts with MAPE under 8%.",
        "Enabled inventory planners to reduce stockouts by 12%.",
      ],
      tags: ["Python", "Prophet", "LSTM", "Forecasting"],
      image: images[2],
      repoUrl: "https://github.com/yourname/forecasting",
      demoUrl: "",
      featured : true,
    },
    {
      title: "Recommendation System",
      summary:
        "Hybrid item-user recommender leveraging matrix factorization and content embeddings.",
      content: [
        "Implemented ALS with implicit feedback and content-based reranking.",
        "Boosted CTR by 9% in A/B test.",
        "Shipped candidate service with approximate nearest neighbors.",
      ],
      tags: ["Python", "Recsys", "ANN", "Spark"],
      image: images[3],
      repoUrl: "https://github.com/yourname/recsys",
      demoUrl: "",
    },
    {
      title: "LLM-Powered Insights",
      summary:
        "Chat interface over analytics warehouse for ad-hoc insights using LLMs with retrieval.",
      content: [
        "Implemented semantic indexing over business glossary and dashboards.",
        "Used retrieval-augmented generation to ground responses.",
        "Cut ad-hoc analysis turnaround by 60%.",
      ],
      tags: ["Typescript", "LLM", "RAG", "Next.js"],
      image: images[4],
      repoUrl: "https://github.com/yourname/analytics-copilot",
      demoUrl: "",
      featured : true,
    },
    {
      title: "Computer Vision Quality Control",
      summary: "Deployed on-the-edge defect detection using transfer learning.",
      content: [
        "Fine-tuned EfficientNet for small, imbalanced datasets.",
        "Achieved 96% recall on critical defects.",
        "Optimized models for inference on Jetson devices.",
      ],
      tags: ["Python", "CV", "Edge", "Transfer Learning"],
      image: images[5],
      repoUrl: "https://github.com/yourname/quality-cv",
      demoUrl: "",
      featured : true,
    },
  ];
  
  const projects: Project[] = baseProjects.map((p, idx) => ({
    ...p,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    date: new Date(2023, idx, 1).toISOString(),
  }));
  
  export function getProfile(): Profile {
    return profile;
  }
  
  export function getAllProjects(): Project[] {
    return projects;
  }
  
//   export function getFeaturedProjects(): Project[] {
//     return projects.slice(0, 4);
//   }
  export function getFeaturedProjects() {
    // Make sure this returns an array, not undefined
    return projects.filter(project => project.featured) || [];
  }
  

  
  export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
  }
  
  export function getAllProjectSlugs(): string[] {
    return projects.map((p) => p.slug);
  }
