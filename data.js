// Data Store for Smart Learning Mentor & Career Guide
window.MENTOR_DATA = {
  // 10 Scenario-based Diagnostic Questions
  diagnosticQuestions: [
    {
      id: 1,
      text: "Imagine you are building a new mobile app for booking travel. Which part of the project excites you the most?",
      options: [
        { text: "Designing the smooth transition animations, clean layouts, and interactive booking button.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "Creating the secure payment processor, database models, and server infrastructure.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Building a recommendation system that predicts user travel preferences based on history.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "Talking to travelers to understand their pain points, setting deadlines, and prioritizing features.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    },
    {
      id: 2,
      text: "When you run into a problem, what is your preferred way of solving it?",
      options: [
        { text: "Visually mapping it out, tweaking layouts or interactions, and getting instant user feedback.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "Tracing log files, analyzing data flow, writing unit tests, and optimizing database queries.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Gathering massive amounts of data, finding statistical correlations, and training a math model.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "Brainstorming with a team, balancing user needs with developer constraints, and rewriting requirements.", points: { frontend: 0, backend: 0, ai: 1, pm: 4 } }
      ]
    },
    {
      id: 3,
      text: "How do you feel about coding and math?",
      options: [
        { text: "I love coding UI, styling, and interactivity, but prefer to keep complex math and data structures to a minimum.", points: { frontend: 4, backend: 1, ai: 0, pm: 1 } },
        { text: "I enjoy writing logical, structural code, designing APIs and architecture, and don't mind basic algorithms.", points: { frontend: 1, backend: 4, ai: 2, pm: 0 } },
        { text: "I love mathematics, algorithms, stats, and logical reasoning; code is just my tool to run calculations.", points: { frontend: 0, backend: 2, ai: 4, pm: 0 } },
        { text: "I understand how technology works but prefer strategic planning, wireframing, and communications over active coding.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    },
    {
      id: 4,
      text: "What describes your dream workplace daily task?",
      options: [
        { text: "Refining visual details, reviewing mockups, and writing components that users can directly tap and see.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "Ensuring server systems have 99.9% uptime, designing secure APIs, and managing server cloud deployments.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Building neural networks, writing clean Python scripts to analyze data patterns, and prompt engineering LLMs.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "Presenting slides to stakeholders, running standups, reviewing user telemetry, and drafting project roadmaps.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    },
    {
      id: 5,
      text: "Which AI-related project idea sounds most interesting to build?",
      options: [
        { text: "An AI-powered design tool that converts sketch drawings into live, responsive React layouts automatically.", points: { frontend: 4, backend: 0, ai: 1, pm: 1 } },
        { text: "A backend service integrating multiple agentic workflows, caching vector answers, and routing queries.", points: { frontend: 1, backend: 4, ai: 2, pm: 0 } },
        { text: "Creating a custom Retrieval-Augmented Generation (RAG) system that answers deep questions on complex books.", points: { frontend: 0, backend: 1, ai: 4, pm: 1 } },
        { text: "Leading a team to launch an AI medical triage app, focusing on ethics, legal compliance, and user safety.", points: { frontend: 0, backend: 0, ai: 1, pm: 4 } }
      ]
    },
    {
      id: 6,
      text: "If you were reading a tech blog, which article title would you click first?",
      options: [
        { text: "Mastering CSS Grid, Custom Transitions, and the Vercel AI SDK for Live Stream UI Rendering.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "Scaling microservices with Go, Redis caching, and securing REST APIs under heavy load.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Fine-tuning Small Language Models: A hands-on guide with PyTorch, LoRA, and Vector Databases.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "Product Strategy in the Age of AI: How to define MVP value, estimate costs, and run user research.", points: { frontend: 0, backend: 0, ai: 1, pm: 4 } }
      ]
    },
    {
      id: 7,
      text: "How do you prefer to see the results of your work?",
      options: [
        { text: "Visually, directly on the screen where I can interact, click, and feel the feedback instantly.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "In database updates, API test suites green checks, faster server response times, and robust console logs.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Through evaluation metric curves (Accuracy, Precision, Recall, loss curves) and clean data plots.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "In user retention charts, successful launch metrics, clear team alignment, and user reviews.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    },
    {
      id: 8,
      text: "Pick your favorite study tool or activity:",
      options: [
        { text: "Playing with interactive UI code sandboxes, styling challenges, and CSS generators.", points: { frontend: 4, backend: 0, ai: 0, pm: 0 } },
        { text: "Solving algorithmic challenges (LeetCode, CodeWars) or configuring local Docker networks.", points: { frontend: 1, backend: 4, ai: 1, pm: 0 } },
        { text: "Analyzing spreadsheets, building data graphs, reading research papers on AI models.", points: { frontend: 0, backend: 1, ai: 4, pm: 1 } },
        { text: "Reading case studies on why products succeed or fail, wireframing apps, and public speaking.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    },
    {
      id: 9,
      text: "In a team coding project, which task would you naturally claim?",
      options: [
        { text: "Creating the component structure, animations, navigation, and visual responsive layouts.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "Creating the node/python server, database schema, user authentication, and route security.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "Integrating AI APIs, preparing datasets, cleaning embeddings, and setting up the LLM agent.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "Writing the project specification, organizing the Trello/Jira board, and running daily stand-ups.", points: { frontend: 0, backend: 0, ai: 1, pm: 4 } }
      ]
    },
    {
      id: 10,
      text: "What makes you feel most accomplished after a productive day?",
      options: [
        { text: "The app looks beautiful, feels fast, and has slick, interactive micro-animations.", points: { frontend: 4, backend: 0, ai: 0, pm: 1 } },
        { text: "The data pipelines flow seamlessly, API endpoints are highly secured, and database queries are fast.", points: { frontend: 0, backend: 4, ai: 1, pm: 0 } },
        { text: "The model performance jumped by 5% or the AI generated responses match human quality.", points: { frontend: 0, backend: 1, ai: 4, pm: 0 } },
        { text: "The features are clearly scoped, requirements are locked in, and the team is aligned and moving fast.", points: { frontend: 1, backend: 0, ai: 0, pm: 4 } }
      ]
    }
  ],

  // Careers database
  careers: {
    frontend: {
      title: "Frontend & AI-UI Engineer",
      avatar: "🌐",
      description: "Builds user-facing elements of websites and web apps. Focuses on responsiveness, accessibility, aesthetics, and integrating real-time AI tools into interactive interfaces.",
      salary: "$85,000 - $145,000",
      skills: ["HTML5 & CSS3 (Flexbox/Grid)", "JavaScript (ES6+) & TypeScript", "React.js / Next.js", "AI-UI tools (v0.dev, Cursor)", "Gemini / OpenAI API UI Streaming", "CSS Animations & Tailwind"],
      aiFocus: "Creating chat screens, streaming text tokens in real time, building visual canvas editors, and leveraging LLMs to generate frontend code components dynamically."
    },
    backend: {
      title: "Backend & AI Solutions Architect",
      avatar: "⚙️",
      description: "Designs, builds, and maintains server-side configurations, databases, security protocols, and coordinates AI microservices and agentic pipelines.",
      salary: "$90,000 - $155,000",
      skills: ["Node.js / Express / Python", "PostgreSQL / MongoDB / Redis", "Vector Databases (Pinecone, Chroma)", "LangChain / AI Agent toolkits", "RESTful & GraphQL API design", "Docker & Cloud Deployments (AWS)"],
      aiFocus: "Managing embeddings generation, storing data in vector databases, structuring semantic search queries, constructing agent tool functions, and securing API endpoints connecting to LLMs."
    },
    ai: {
      title: "AI Engineer & Data Scientist",
      avatar: "🧠",
      description: "Builds intelligent algorithms, processes vast data reserves, creates and fine-tunes custom neural models, and deploys Retrieval-Augmented Generation (RAG) pipelines.",
      salary: "$100,000 - $180,000",
      skills: ["Python (NumPy, Pandas, Scikit-Learn)", "PyTorch / TensorFlow", "LLM Fine-tuning & Prompt Engineering", "Vector Embeddings & Semantic Search", "Data Cleaning, Wrangling & Analytics", "Model Deployment (Hugging Face, Triton)"],
      aiFocus: "Evaluating model accuracy, designing advanced prompt hierarchies, optimizing context windows, selecting parameters for LLMs, and building autonomous agent networks."
    },
    pm: {
      title: "AI Product Manager",
      avatar: "📈",
      description: "Defines the product roadmap, synthesizes user needs, coordinates technical development teams, and crafts the strategic roadmap for AI-powered product launches.",
      salary: "$95,000 - $160,000",
      skills: ["Agile/Scrum Methodologies", "User Research & Analytical Tracking", "Wireframing & Product Requirements (PRD)", "AI Business Models & Ethics", "Prompt Engineering for Prototyping", "A/B Testing & User Analytics"],
      aiFocus: "Estimating token computation costs, analyzing prompt vulnerabilities, designing human-in-the-loop validation frameworks, and identifying high-impact AI features that users will pay for."
    }
  },

  // Roadmaps with core and AI milestones
  roadmaps: {
    frontend: [
      {
        id: "fe-m1",
        title: "Phase 1: Web Interface Foundations",
        desc: "Master the structure, styling, and core interactivity of the web.",
        tasks: [
          { id: "fe-t1", text: "Learn Semantic HTML5 layout tags", completed: false, xp: 50 },
          { id: "fe-t2", text: "Master CSS Flexbox, Grid layouts, and Media Queries", completed: false, xp: 50 },
          { id: "fe-t3", text: "Understand JavaScript basics (variables, functions, DOM logic)", completed: false, xp: 75 },
          { id: "fe-t4", text: "Complete Challenge: Build an interactive personal portfolio site", completed: false, xp: 150 }
        ]
      },
      {
        id: "fe-m2",
        title: "Phase 2: Modern Frameworks & Tools",
        desc: "Step up to professional Single-Page-App frameworks and advanced tooling.",
        tasks: [
          { id: "fe-t5", text: "Learn React concepts (components, props, state, hooks)", completed: false, xp: 100 },
          { id: "fe-t6", text: "Understand Git, npm, and Vite bundlers", completed: false, xp: 50 },
          { id: "fe-t7", text: "Build a multi-view Dashboard using state hook selectors", completed: false, xp: 150 }
        ]
      },
      {
        id: "fe-m3",
        title: "Phase 3: AI-Assisted UI Generation",
        desc: "Learn to use AI code generators and prompt engineering for accelerated interface development.",
        tasks: [
          { id: "fe-t8", text: "Install and configure Cursor Editor or GitHub Copilot", completed: false, xp: 100 },
          { id: "fe-t9", text: "Use v0.dev to generate clean tailwind code components using prompts", completed: false, xp: 100 },
          { id: "fe-t10", text: "Practice prompt-driven styling edits to quickly update color themes", completed: false, xp: 75 }
        ]
      },
      {
        id: "fe-m4",
        title: "Phase 4: AI App Integration (The Capstone)",
        desc: "Incorporate live AI responses directly in your React or vanilla frontend.",
        tasks: [
          { id: "fe-t11", text: "Understand REST HTTP client requests (Fetch / Axios)", completed: false, xp: 75 },
          { id: "fe-t12", text: "Build a chat UI that streams answers from Gemini API token-by-token", completed: false, xp: 200 },
          { id: "fe-t13", text: "Implement Markdown parser to render AI code snippets elegantly", completed: false, xp: 100 }
        ]
      }
    ],
    backend: [
      {
        id: "be-m1",
        title: "Phase 1: Backend Foundations & APIs",
        desc: "Set up servers, route requests, and handle HTTP methods.",
        tasks: [
          { id: "be-t1", text: "Learn Node.js environment basics and npm ecosystem", completed: false, xp: 50 },
          { id: "be-t2", text: "Master Express.js framework for routing and middleware", completed: false, xp: 75 },
          { id: "be-t3", text: "Build RESTful APIs with GET, POST, PUT, DELETE endpoints", completed: false, xp: 100 },
          { id: "be-t4", text: "Implement JWT User Authentication and passwords hashing", completed: false, xp: 150 }
        ]
      },
      {
        id: "be-m2",
        title: "Phase 2: Database Architecture",
        desc: "Design structures to securely read, write, and index app data.",
        tasks: [
          { id: "be-t5", text: "Master relational schemas (SQL/PostgreSQL) and migrations", completed: false, xp: 100 },
          { id: "be-t6", text: "Learn NoSQL basics (MongoDB) and object mapping (Mongoose)", completed: false, xp: 75 },
          { id: "be-t7", text: "Build an API that connects to a database with relations", completed: false, xp: 150 }
        ]
      },
      {
        id: "be-m3",
        title: "Phase 3: Vector DBs & LLM Pipelines",
        desc: "Integrate vector embeddings and backend LLM orchestration frameworks.",
        tasks: [
          { id: "be-t8", text: "Understand embeddings and semantic text similarity", completed: false, xp: 100 },
          { id: "be-t9", text: "Setup Pinecone or Chroma Vector Database locally or in cloud", completed: false, xp: 100 },
          { id: "be-t10", text: "Use LangChain / LangGraph to construct sequential LLM prompts", completed: false, xp: 150 }
        ]
      },
      {
        id: "be-m4",
        title: "Phase 4: Agentic Systems & Deployments",
        desc: "Build AI agents that can run backend tools and deploy your application.",
        tasks: [
          { id: "be-t11", text: "Create LLM Tool functions (e.g. AI executes SQL or reads local weather API)", completed: false, xp: 200 },
          { id: "be-t12", text: "Containerize backend apps using Docker and deploy to AWS/Render", completed: false, xp: 150 }
        ]
      }
    ],
    ai: [
      {
        id: "ai-m1",
        title: "Phase 1: Math Foundations & Python",
        desc: "Master Python data libraries and statistical analytics basics.",
        tasks: [
          { id: "ai-t1", text: "Learn advanced Python (list comps, generators, OOP)", completed: false, xp: 50 },
          { id: "ai-t2", text: "Master Pandas and NumPy for complex tabular data processing", completed: false, xp: 75 },
          { id: "ai-t3", text: "Understand Linear Algebra, Calculus, and Statistics for ML", completed: false, xp: 100 },
          { id: "ai-t4", text: "Conduct an Exploratory Data Analysis (EDA) on a custom dataset", completed: false, xp: 150 }
        ]
      },
      {
        id: "ai-m2",
        title: "Phase 2: Machine Learning Foundations",
        desc: "Build classical ML models and understand model training metrics.",
        tasks: [
          { id: "ai-t5", text: "Learn regression, classification, and clustering with Scikit-Learn", completed: false, xp: 100 },
          { id: "ai-t6", text: "Master train-test splits, overfitting, regularization, and cross-validation", completed: false, xp: 100 },
          { id: "ai-t7", text: "Train a random forest classifier to predict customer churn", completed: false, xp: 150 }
        ]
      },
      {
        id: "ai-m3",
        title: "Phase 3: Deep Learning & NLP",
        desc: "Step into neural networks, PyTorch tensors, and language representation.",
        tasks: [
          { id: "ai-t8", text: "Build custom neural networks in PyTorch using linear layers", completed: false, xp: 150 },
          { id: "ai-t9", text: "Understand Transformer architecture (Self-Attention, Encoder, Decoder)", completed: false, xp: 150 },
          { id: "ai-t10", text: "Learn Hugging Face tokenizers and compute text embeddings", completed: false, xp: 100 }
        ]
      },
      {
        id: "ai-m4",
        title: "Phase 4: Advanced LLM & RAG Systems",
        desc: "Design and customize Large Language Model systems.",
        tasks: [
          { id: "ai-t11", text: "Design a Retrieval-Augmented Generation (RAG) system with hybrid search", completed: false, xp: 200 },
          { id: "ai-t12", text: "Learn Parameter-Efficient Fine-Tuning (PEFT/LoRA) for custom tasks", completed: false, xp: 200 }
        ]
      }
    ],
    pm: [
      {
        id: "pm-m1",
        title: "Phase 1: Product Management Core",
        desc: "Learn product lifecycles, user empathy, and agile execution.",
        tasks: [
          { id: "pm-t1", text: "Learn the stages of software product life cycles", completed: false, xp: 50 },
          { id: "pm-t2", text: "Conduct customer discovery interviews and define target personas", completed: false, xp: 75 },
          { id: "pm-t3", text: "Draft detailed Product Requirements Documents (PRDs)", completed: false, xp: 100 },
          { id: "pm-t4", text: "Learn Agile frameworks: run sprints, write epics, and manage backlogs", completed: false, xp: 100 }
        ]
      },
      {
        id: "pm-m2",
        title: "Phase 2: Wireframing & Tech Literacy",
        desc: "Understand system constraints, designs, and database basics to communicate with developers.",
        tasks: [
          { id: "pm-t5", text: "Create interactive mockups and user flows in Figma", completed: false, xp: 75 },
          { id: "pm-t6", text: "Understand standard system architecture diagrams (client-server, APIs)", completed: false, xp: 75 },
          { id: "pm-t7", text: "Learn to read basic JSON API responses and database SQL queries", completed: false, xp: 75 }
        ]
      },
      {
        id: "pm-m3",
        title: "Phase 3: AI Product Strategy",
        desc: "Design, size, and estimate requirements for AI integrations.",
        tasks: [
          { id: "pm-t8", text: "Analyze AI API cost models (token inputs/outputs vs custom hosting)", completed: false, xp: 125 },
          { id: "pm-t9", text: "Learn prompt engineering strategies for quick product prototyping", completed: false, xp: 100 },
          { id: "pm-t10", text: "Design UX rules for latency (AI streaming states, skeletons, fallback replies)", completed: false, xp: 125 }
        ]
      },
      {
        id: "pm-m4",
        title: "Phase 4: AI Launch & Metrics",
        desc: "Manage legal risks, analytics, and scale AI product adoption.",
        tasks: [
          { id: "pm-t11", text: "Design security guidelines (handling prompt injections, PII filter, AI alignment)", completed: false, xp: 150 },
          { id: "pm-t12", text: "Establish telemetry logging for prompt cost, accuracy ratings, and user thumbs rating", completed: false, xp: 150 },
          { id: "pm-t13", text: "Build custom interactive dashboard mockups using Google Slides or Figma for pitch", completed: false, xp: 150 }
        ]
      }
    ]
  },

  // Mock interview questions
  interviewQuestions: {
    frontend: [
      { id: "fe-q1", question: "Explain the difference between state and props in React. How would you explain it to a non-programmer?" },
      { id: "fe-q2", question: "If you are rendering a long list of items dynamically generated by an AI API in real-time, why is the 'key' prop important in React, and how does React optimize rendering using it?" },
      { id: "fe-q3", question: "How would you handle showing an active typewriter loading indicator while waiting for chunked token streams from an AI REST server?" },
      { id: "fe-q4", question: "Explain CSS Flexbox vs. CSS Grid. In what scenarios would you choose one over the other?" }
    ],
    backend: [
      { id: "be-q1", question: "What is an index in a database, and how does it speed up queries? Are there any disadvantages?" },
      { id: "be-q2", question: "Explain the difference between REST APIs and GraphQL APIs. When would you choose which?" },
      { id: "be-q3", question: "Suppose you are designing an API that hooks up to Gemini. How would you prevent a malicious user from running up your API costs (rate limiting, validation)?" },
      { id: "be-q4", question: "What is a vector database (like Pinecone) and how does it differ from a traditional SQL database when retrieving text similarities?" }
    ],
    ai: [
      { id: "ai-q1", question: "What is overfitting in Machine Learning, and what are 3 distinct ways to prevent it?" },
      { id: "ai-q2", question: "Explain the difference between Fine-Tuning an LLM and using Retrieval-Augmented Generation (RAG). When would you prefer RAG?" },
      { id: "ai-q3", question: "Explain the Self-Attention mechanism in Transformer models in simple terms." },
      { id: "ai-q4", question: "What is temperature parameter in text generation models, and how does it affect creativity vs predictability?" }
    ],
    pm: [
      { id: "pm-q1", question: "How would you prioritize features for a new AI writing assistant app with limited developer resources? What framework would you use?" },
      { id: "pm-q2", question: "An AI search feature you launched is costing twice the budgeted amount due to long user prompts. How would you handle this product crisis?" },
      { id: "pm-q3", question: "What is a Minimum Viable Product (MVP)? How would you design an MVP for a resume evaluator app?" },
      { id: "pm-q4", question: "How do you handle a situation where the engineering team tells you that a feature in the PRD is technically impossible within the timeline?" }
    ]
  },

  // Fallback / Simulated Chat responses
  mockAnswers: {
    frontend: {
      greetings: "Hello! I am your AI Frontend Mentor. I'm here to help you learn React, CSS grid, JavaScript, and how to build apps integrated with AI technologies! What should we study today?",
      default: "That is a great frontend question! In Web development, we structure content with HTML, make it gorgeous with CSS, and make it interactive with JavaScript. When building AI interfaces, we use the Fetch API to make POST requests to AI model routes, parse the response chunks, and update the React state to stream words onto the user's screen. If you want code examples, ask me to show you how to fetch data from an API!",
      codeExample: "Here is how you write a basic asynchronous fetch request in JavaScript:\n\n```javascript\nasync function getAIMessage(prompt) {\n  try {\n    const response = await fetch('/api/mentor', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ prompt })\n    });\n    const data = await response.json();\n    console.log('AI Response:', data.reply);\n    return data.reply;\n  } catch (error) {\n    console.error('Error fetching AI data:', error);\n  }\n}\n```\n\nYou can connect this to a React button to let users get AI responses in real-time."
    },
    backend: {
      greetings: "Welcome! I am your Backend Solutions Mentor. Let's master APIs, relational and vector databases, server scaling, and AI agent frameworks like LangChain.",
      default: "Excellent backend query! In server-side development, security and optimization are everything. When integrating AI backends, we use environment variables to store keys safely (never expose them to the front-end!), construct REST or server-sent-event (SSE) routes, and utilize vector databases to search semantic embeddings fast. Tell me if you want to see a Node.js Express server routing example!",
      codeExample: "Here is an Express server structure that secures a Gemini endpoint:\n\n```javascript\nconst express = require('express');\nconst app = express();\napp.use(express.json());\n\napp.post('/api/ask-mentor', async (req, res) => {\n  const { query } = req.body;\n  if (!query) {\n    return res.status(400).json({ error: 'Query is required' });\n  }\n  // Interact with Gemini or DB\n  const reply = `Backend mock response to: ${query}`;\n  res.json({ reply });\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));\n```"
    },
    ai: {
      greetings: "Greetings, future AI Engineer! I'm your Data Science and ML mentor. Let's delve into PyTorch, machine learning pipelines, prompt structures, and vector search strategies.",
      default: "Very insightful question! Machine learning is about mapping input spaces to output spaces through statistical optimization. In modern LLM engineering, Retrieval-Augmented Generation (RAG) is the standard because it connects models to fresh, custom documents without the heavy costs of fine-tuning. Let me know if you want a python data-cleaning example or an embedding calculation overview!",
      codeExample: "Here is a python snippet demonstrating how to calculate cosine similarity of text embeddings manually:\n\n```python\nimport numpy as np\n\ndef cosine_similarity(v1, v2):\n    dot_product = np.dot(v1, v2)\n    norm_v1 = np.linalg.norm(v1)\n    norm_v2 = np.linalg.norm(v2)\n    return dot_product / (norm_v1 * norm_v2)\n\n# Example embedding vectors\nvector_a = np.array([0.15, 0.88, -0.23])\nvector_b = np.array([0.18, 0.85, -0.21])\n\nsim = cosine_similarity(vector_a, vector_b)\nprint(f'Embeddings Similarity Score: {sim:.4f}')\n```"
    },
    pm: {
      greetings: "Hi there! I am your AI Product Management Mentor. Let's discuss agile sizing, writing detailed PRDs, wireframing, and aligning developer metrics with user value.",
      default: "That is a crucial product management consideration! An AI Product Manager must constantly validate whether AI's high computational cost translates into real customer value. We structure MVPs to test prompt accuracy and user sentiment with minimal coding first, mapping telemetry metrics before building full scaling. Let me know if you want a template structure of a Product Requirements Document (PRD) for an AI feature!",
      codeExample: "Here is a standard structure for an AI Feature PRD (Product Requirements Document):\n\n```markdown\n## Feature: Intelligent Dashboard Summaries\n### 1. Objective\nHelp users understand complex data by displaying a 3-sentence AI summary.\n### 2. User Problem\nUsers spend average 8 minutes scrolling raw tables to understand key metrics.\n### 3. Success Metrics\n- Reduction of time-to-value to < 2 minutes.\n- >75% of users rate the summary helpful (thumbs up).\n### 4. Technical Constraints & Cost Cap\n- Maximum input length 2000 tokens.\n- API cost capped at $0.005 per summary request.\n```"
    }
  }
};
