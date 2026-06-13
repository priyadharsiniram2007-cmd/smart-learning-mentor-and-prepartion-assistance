// Smart Learning Mentor and Career Prep Assistant - Data Store
// Attaching to window object for global script scope access in vanilla JS

window.MENTOR_DATA = {
    // 1. CAREER ROADMAPS
    roadmaps: {
        frontend: {
            title: "Frontend Web Developer",
            description: "Learn to build modern, responsive, interactive user interfaces for web applications.",
            nodes: [
                {
                    id: "fe-1",
                    title: "Web Foundations",
                    duration: "1-2 weeks",
                    badge: "Beginner",
                    description: "Master the structure and presentation of the web. Learn HTML5 semantic elements, modern CSS styling, flexbox, grid layouts, and responsive design.",
                    subskills: [
                        "HTML5 Semantic Elements & SEO basics",
                        "CSS3 Selectors, Box Model, and Specificity",
                        "Flexbox and CSS Grid layouts",
                        "Responsive Design & Media Queries",
                        "Web Accessibility (WCAG & ARIA guidelines)"
                    ],
                    resources: [
                        { name: "MDN Web Docs - HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
                        { name: "CSS-Tricks - Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
                        { name: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/" }
                    ]
                },
                {
                    id: "fe-2",
                    title: "Modern JavaScript (ES6+)",
                    duration: "3-4 weeks",
                    badge: "Core",
                    description: "Learn core programming concepts, DOM manipulation, asynchronous programming, APIs, and modern ES6+ features.",
                    subskills: [
                        "Variables, Data Types, and Scopes (let, const, var)",
                        "Arrow Functions, Array Methods (map, filter, reduce)",
                        "Asynchronous JavaScript (Promises, async/await, Fetch API)",
                        "DOM Traversal, Event Bubbling and Delegation",
                        "Local Storage and Client-Side State Management"
                    ],
                    resources: [
                        { name: "JavaScript.info - Interactive Guide", url: "https://javascript.info/" },
                        { name: "Eloquent JavaScript Book", url: "https://eloquentjavascript.net/" },
                        { name: "MDN Docs - Working with APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" }
                    ]
                },
                {
                    id: "fe-3",
                    title: "React Framework Ecosystem",
                    duration: "4-5 weeks",
                    badge: "Advanced",
                    description: "Build scalable interfaces using React. Master components, state, hooks, routing, and state management libraries.",
                    subskills: [
                        "React JSX, Props, and State components",
                        "React Hooks (useState, useEffect, useMemo, useRef)",
                        "Context API and Global State Management (Redux/Zustand)",
                        "React Router v6 for Single Page App navigation",
                        "Styled Components / TailwindCSS styling"
                    ],
                    resources: [
                        { name: "React Documentation (Beta/New)", url: "https://react.dev/" },
                        { name: "Scrimba - React Course", url: "https://scrimba.com/learn/learnreact" },
                        { name: "TailwindCSS Docs", url: "https://tailwindcss.com/docs" }
                    ]
                },
                {
                    id: "fe-4",
                    title: "Build Systems & Deployment",
                    duration: "1-2 weeks",
                    badge: "Production",
                    description: "Optimize development and build output. Learn NPM, bundlers like Vite, version control with Git, and hosting platforms.",
                    subskills: [
                        "Git & GitHub version control workflows",
                        "NPM, Yarn, and package dependency management",
                        "Vite, Webpack, and module bundlers",
                        "Continuous Integration & Hosting (Netlify, Vercel)",
                        "Chrome DevTools debugging and performance profiling"
                    ],
                    resources: [
                        { name: "GitHub - Git Handbook", url: "https://guides.github.com/introduction/git-handbook/" },
                        { name: "Vite.js Official Guide", url: "https://vite.dev/guide/" },
                        { name: "Vercel - Deployment Guide", url: "https://vercel.com/docs" }
                    ]
                }
            ]
        },
        backend: {
            title: "Backend Systems Engineer",
            description: "Design robust server-side systems, APIs, database architectures, and secure networking pipelines.",
            nodes: [
                {
                    id: "be-1",
                    title: "Node.js & Express Fundamentals",
                    duration: "2-3 weeks",
                    badge: "Beginner",
                    description: "Learn server-side JavaScript execution, HTTP module basics, Express routing, and writing RESTful APIs.",
                    subskills: [
                        "Node.js Event Loop and Non-blocking I/O",
                        "Express.js Routing, Middleware, and Controllers",
                        "RESTful API design conventions & JSON parsing",
                        "Environment variables & config management",
                        "Error handling middlewares"
                    ],
                    resources: [
                        { name: "Node.js Learning Path", url: "https://nodejs.org/en/learn/" },
                        { name: "Express.js Official Guide", url: "https://expressjs.com/" },
                        { name: "REST API Tutorial", url: "https://restfulapi.net/" }
                    ]
                },
                {
                    id: "be-2",
                    title: "Databases & ORMs",
                    duration: "3-4 weeks",
                    badge: "Core",
                    description: "Understand database models, write queries, manage schemas, and interface code using ORMs.",
                    subskills: [
                        "SQL databases (PostgreSQL/MySQL) schemas and joins",
                        "NoSQL databases (MongoDB/Redis) structures",
                        "Database ORMs/ODMs (Prisma, Mongoose, Sequelize)",
                        "Transactions, indexing, and query optimization",
                        "Redis for caching API responses"
                    ],
                    resources: [
                        { name: "Prisma Docs - PostgreSQL guide", url: "https://www.prisma.io/docs" },
                        { name: "MongoDB University", url: "https://learn.mongodb.com/" },
                        { name: "SQL Tutorial - W3Schools", url: "https://www.w3schools.com/sql/" }
                    ]
                },
                {
                    id: "be-3",
                    title: "Security & Authentication",
                    duration: "2 weeks",
                    badge: "Advanced",
                    description: "Build secure servers. Implement authentication, session systems, encryption, CORS, and protect APIs against threats.",
                    subskills: [
                        "JWT (JSON Web Tokens) vs Session-based authentication",
                        "Password hashing (bcrypt) and secure password storage",
                        "CORS policies, Helmet middleware, and security headers",
                        "OAuth2 integration (Google, GitHub logins)",
                        "API Rate Limiting and DDOS mitigation"
                    ],
                    resources: [
                        { name: "Auth0 - JWT Basics", url: "https://jwt.io/introduction" },
                        { name: "OWASP Top Ten Security Risks", url: "https://owasp.org/www-project-top-ten/" },
                        { name: "Helmet.js documentation", url: "https://helmetjs.github.com/" }
                    ]
                },
                {
                    id: "be-4",
                    title: "System Design & DevOps",
                    duration: "3-4 weeks",
                    badge: "Architect",
                    description: "Architect distributed systems. Learn microservices, WebSockets, Docker, CI/CD, and Cloud hosting.",
                    subskills: [
                        "Microservices architecture vs Monoliths",
                        "WebSockets for bi-directional live communication",
                        "Docker containers for development and deployment",
                        "CI/CD pipelines using GitHub Actions",
                        "Cloud Hosting (AWS EC2, S3, RDS or Render)"
                    ],
                    resources: [
                        { name: "Docker - Get Started Guide", url: "https://docs.docker.com/get-started/" },
                        { name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer" },
                        { name: "AWS Fundamentals", url: "https://aws.amazon.com/getting-started/" }
                    ]
                }
            ]
        },
        ai_engineer: {
            title: "AI & Machine Learning Engineer",
            description: "Build, evaluate, and integrate smart models and large language model features into production software.",
            nodes: [
                {
                    id: "ai-1",
                    title: "Python for AI & Math Basics",
                    duration: "2-3 weeks",
                    badge: "Beginner",
                    description: "Master scientific Python tools and core mathematical concepts needed for model training and analysis.",
                    subskills: [
                        "Python OOP, list comprehensions, and generators",
                        "NumPy for multi-dimensional matrix operations",
                        "Pandas for data cleaning and exploration",
                        "Linear Algebra (vectors, matrices, dot products)",
                        "Calculus (derivatives, gradients, partial derivatives)"
                    ],
                    resources: [
                        { name: "Python for Data Analysis Book", url: "https://wesmckinney.com/book/" },
                        { name: "Kaggle Learn - Python Course", url: "https://www.kaggle.com/learn/python" },
                        { name: "3Blue1Brown - Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra" }
                    ]
                },
                {
                    id: "ai-2",
                    title: "Supervised & Unsupervised ML",
                    duration: "4 weeks",
                    badge: "Core",
                    description: "Build traditional machine learning models from scratch using Scikit-Learn. Learn regression, classification, and clustering.",
                    subskills: [
                        "Linear & Logistic Regression model training",
                        "Decision Trees, Random Forests, and Gradient Boosting",
                        "K-Means clustering and Dimensionality Reduction (PCA)",
                        "Model Evaluation metrics (Accuracy, Precision, Recall, F1)",
                        "Feature Engineering and Hyperparameter tuning"
                    ],
                    resources: [
                        { name: "Scikit-Learn Getting Started Guide", url: "https://scikit-learn.org/stable/getting_started.html" },
                        { name: "Coursera - Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
                        { name: "StatQuest - Machine Learning Basics", url: "https://statquest.org/" }
                    ]
                },
                {
                    id: "ai-3",
                    title: "Deep Learning & NLP",
                    duration: "4-5 weeks",
                    badge: "Advanced",
                    description: "Learn neural network fundamentals, computer vision, and text processing models using PyTorch.",
                    subskills: [
                        "Multi-Layer Perceptrons & backpropagation mechanics",
                        "PyTorch tensors, datasets, and training loops",
                        "Convolutional Neural Networks (CNNs) for images",
                        "Recurrent Neural Networks (RNNs) and Transformers",
                        "NLP tokenization, embeddings, and sentiment analysis"
                    ],
                    resources: [
                        { name: "PyTorch - Learning PyTorch", url: "https://pytorch.org/tutorials/beginner/basics/intro.html" },
                        { name: "Fast.ai - Practical Deep Learning for Coders", url: "https://course.fast.ai/" },
                        { name: "Hugging Face - NLP Course", url: "https://huggingface.co/learn/nlp-course" }
                    ]
                },
                {
                    id: "ai-4",
                    title: "Generative AI & LLM Engineering",
                    duration: "3 weeks",
                    badge: "Expert",
                    description: "Develop software powered by LLMs. Understand Prompt Engineering, Vector Databases, RAG pipelines, and model hosting.",
                    subskills: [
                        "API integration with OpenAI, Gemini, and Claude",
                        "Vector databases (Pinecone, ChromaDB, PGVector)",
                        "Retrieval-Augmented Generation (RAG) implementation",
                        "LangChain or LlamaIndex frameworks",
                        "Evaluating LLM outputs and model safety guardrails"
                    ],
                    resources: [
                        { name: "DeepLearning.AI - Prompt Engineering", url: "https://www.deeplearning.ai/short-courses/" },
                        { name: "Pinecone Learning Center", url: "https://www.pinecone.io/learn/" },
                        { name: "LangChain Documentation", url: "https://python.langchain.com/docs/get_started/introduction" }
                    ]
                }
            ]
        },
        mobile_dev: {
            title: "Mobile App Developer",
            description: "Build high-performance, native and cross-platform mobile applications for iOS and Android devices.",
            nodes: [
                {
                    id: "mb-1",
                    title: "Mobile Native Fundamentals",
                    duration: "2-3 weeks",
                    badge: "Beginner",
                    description: "Learn the core foundations of native languages (Swift for iOS and Kotlin/Java for Android) alongside layout guidelines.",
                    subskills: [
                        "Swift programming language syntax for iOS",
                        "Kotlin programming language syntax for Android",
                        "UI Layout principles (AutoLayout in iOS, XML/Compose in Android)",
                        "Mobile Application Lifecycle stages",
                        "Handling user orientation and screen densities"
                    ],
                    resources: [
                        { name: "Apple Developer - Swift Basics", url: "https://developer.apple.com/swift/" },
                        { name: "Android Developer - Kotlin Guide", url: "https://developer.android.com/kotlin" },
                        { name: "Stanford CS193p - iOS App Development", url: "https://cs193p.sites.stanford.edu/" }
                    ]
                },
                {
                    id: "mb-2",
                    title: "Cross-Platform Frameworks",
                    duration: "4 weeks",
                    badge: "Core",
                    description: "Master React Native and Flutter. Compile single-codebase programs into high-performance native binaries.",
                    subskills: [
                        "React Native JSX, components, and stylesheet bridges",
                        "Flutter widgets, state management, and Dart language basics",
                        "Handling physical device events and navigation routing",
                        "Interfacing native components via bridges",
                        "Offline states and Async Storage"
                    ],
                    resources: [
                        { name: "React Native - Getting Started", url: "https://reactnative.dev/" },
                        { name: "Flutter - Official Documentation", url: "https://docs.flutter.dev/" },
                        { name: "Academind - React Native vs Flutter", url: "https://academind.com/" }
                    ]
                },
                {
                    id: "mb-3",
                    title: "Hardware APIs & Device Features",
                    duration: "3 weeks",
                    badge: "Advanced",
                    description: "Access physical hardware like GPS, cameras, storage directories, push notifications, and bluetooth.",
                    subskills: [
                        "Geolocation tracking and MapView overlays",
                        "Camera, photo library permissions, and media uploading",
                        "Local SQLite storage and key-value keychain security",
                        "APNS (Apple) and FCM (Firebase) Push Notifications",
                        "Background execution thread configurations"
                    ],
                    resources: [
                        { name: "Firebase Cloud Messaging Docs", url: "https://firebase.google.com/docs/cloud-messaging" },
                        { name: "Expo SDK Reference", url: "https://docs.expo.dev/versions/latest/" },
                        { name: "Apple Keychain Security Services", url: "https://developer.apple.com/documentation/security/keychain_services" }
                    ]
                },
                {
                    id: "mb-4",
                    title: "Store Publication & App Store Optimization (ASO)",
                    duration: "2 weeks",
                    badge: "Publication",
                    description: "Build release bundles, configure provisioning profiles, and submit apps to Apple App Store and Google Play Console.",
                    subskills: [
                        "Configuring iOS provisioning profiles & certificates in Xcode",
                        "Keystore generation and Google Play App signing",
                        "Beta deployments using TestFlight and Play Store Tracks",
                        "App Store Optimization (ASO) keywords and assets guidelines",
                        "Handling app rejection cycles and compliance checks"
                    ],
                    resources: [
                        { name: "Apple Developer - App Store Submission Guide", url: "https://developer.apple.com/app-store/submit/" },
                        { name: "Google Play Console Support", url: "https://support.google.com/googleplay/android-developer/" },
                        { name: "Fastlane.tools Automation", url: "https://fastlane.tools/" }
                    ]
                }
            ]
        },
        data_analyst: {
            title: "Data Analyst & Business Intelligence",
            description: "Clean, explore, model, and visualize data to extract business insights and drive decision-making processes.",
            nodes: [
                {
                    id: "da-1",
                    title: "Advanced Excel & SQL Queries",
                    duration: "2-3 weeks",
                    badge: "Beginner",
                    description: "Master advanced data filters, Excel pivot tables, VLOOKUPs, and complex relational SQL queries.",
                    subskills: [
                        "Excel Pivot Tables, PowerQuery, and statistical formulas",
                        "SQL basic operations (SELECT, WHERE, ORDER BY, GROUP BY)",
                        "Relational joins (INNER, LEFT, RIGHT, FULL OUTER)",
                        "SQL aggregations (SUM, AVG, COUNT, HAVING)",
                        "Subqueries and Common Table Expressions (CTEs)"
                    ],
                    resources: [
                        { name: "Mode Analytics - SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
                        { name: "Chandoo.org - Excel Tips & Pivot Tables", url: "https://chandoo.org/" },
                        { name: "Kaggle - Intro to SQL", url: "https://www.kaggle.com/learn/intro-to-sql" }
                    ]
                },
                {
                    id: "da-2",
                    title: "Business Intelligence & Dashboards",
                    duration: "3 weeks",
                    badge: "Core",
                    description: "Create interactive, automated reports and executive dashboards using Tableau and Microsoft Power BI.",
                    subskills: [
                        "Tableau data connections and dimensions vs measures",
                        "Power BI DAX queries and data relationship models",
                        "Designing dashboards with key KPIs and custom filters",
                        "Storytelling with charts (bar, line, scatter, map plots)",
                        "Automating data scheduled refreshes"
                    ],
                    resources: [
                        { name: "Tableau Public Learning Guide", url: "https://public.tableau.com/en-us/s/resources" },
                        { name: "Microsoft Learn - Power BI", url: "https://learn.microsoft.com/en-us/power-bi/" },
                        { name: "Storytelling with Data Book Site", url: "https://www.storytellingwithdata.com/" }
                    ]
                },
                {
                    id: "da-3",
                    title: "Python Data Analysis (Pandas)",
                    duration: "3-4 weeks",
                    badge: "Advanced",
                    description: "Learn Python data analysis libraries. Clean messy CSV data and create programmatic visualizations.",
                    subskills: [
                        "Jupyter Notebook workflow and markdown scripting",
                        "Pandas DataFrames slicing, filtering, and merging",
                        "Handling null fields and duplicate records",
                        "Data visualization with Matplotlib and Seaborn",
                        "Statistical summary methods (mean, median, standard deviations)"
                    ],
                    resources: [
                        { name: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html" },
                        { name: "Jupyter Project Docs", url: "https://jupyter.org/documentation" },
                        { name: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html" }
                    ]
                },
                {
                    id: "da-4",
                    title: "Statistics & Decision Models",
                    duration: "2 weeks",
                    badge: "Analyst",
                    description: "Apply statistical modeling, A/B testing methodologies, and hypothesis testing to validate business projects.",
                    subskills: [
                        "Hypothesis formulation and P-value interpretations",
                        "A/B testing experimental setups and sample sizing",
                        "Correlation coefficients vs causation patterns",
                        "Linear regression models for forecasting trends",
                        "Writing analytical summary briefs for stakeholders"
                    ],
                    resources: [
                        { name: "OpenIntro Statistics (Free PDF)", url: "https://www.openintro.org/book/os/" },
                        { name: "Khan Academy - AP College Statistics", url: "https://www.khanacademy.org/math/ap-statistics" },
                        { name: "Optimizely - A/B Testing Guide", url: "https://www.optimizely.com/optimization-glossary/ab-testing/" }
                    ]
                }
            ]
        }
    },

    // 2. MOCK INTERVIEW BANK
    interviews: {
        frontend: [
            {
                id: "q-fe-1",
                category: "Technical",
                question: "Explain the difference between let, const, and var. Under what scope do they operate, and what is variable hoisting?",
                modelAnswer: "Variables declared with 'var' are function-scoped, whereas variables declared with 'let' and 'const' are block-scoped. Hoisting pulls variable declarations to the top of their scope. However, 'var' is initialized as 'undefined' (allowing you to access it before declaration), while 'let' and 'const' are not initialized, putting them in a 'Temporal Dead Zone' (TDZ) which throws a ReferenceError if accessed early. Also, 'const' requires initialization and prevents re-assignment, whereas 'let' can be re-assigned."
            },
            {
                id: "q-fe-2",
                category: "Technical",
                question: "What is the Virtual DOM, how does React use it to optimize rendering, and what is reconciliation?",
                modelAnswer: "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When component state changes, React creates a new Virtual DOM tree and compares it (diffing) with the previous tree. It calculates the minimum number of changes required and updates only those specific nodes in the real DOM (reconciliation). This prevents expensive layout recalculations and repaints in the browser that occur when updating the whole DOM tree."
            },
            {
                id: "q-fe-3",
                category: "Technical",
                question: "How would you optimize the loading and rendering performance of a heavy web application?",
                modelAnswer: "Key optimization strategies include: 1) Code-splitting and lazy-loading components using dynamic imports. 2) Image optimization (compression, WebP format, responsive sizes, lazy loading). 3) Minimizing critical rendering path CSS/JS. 4) Leveraging browser caching and Content Delivery Networks (CDNs). 5) Reducing bundle sizes with tree shaking. 6) Implementing Server-Side Rendering (SSR) or Static Site Generation (SSG)."
            }
        ],
        backend: [
            {
                id: "q-be-1",
                category: "Technical",
                question: "Compare Relational (SQL) and Non-Relational (NoSQL) databases. When would you choose one over the other?",
                modelAnswer: "SQL databases are relational, table-based, have structured/fixed schemas, and scale vertically. They guarantee ACID compliance, making them ideal for complex queries, financial transactions, and applications requiring strong data integrity (e.g. Banking). NoSQL databases are non-relational, document/key-value/graph-based, have dynamic schemas, scale horizontally, and follow the BASE consistency model. They are preferred for massive datasets, rapid development, and horizontal scaling under heavy write loads (e.g., social networks, real-time analytics)."
            },
            {
                id: "q-be-2",
                category: "Technical",
                question: "What is connection pooling in database clients, and why is it important for high-traffic servers?",
                modelAnswer: "Creating a new database connection for every HTTP request is highly expensive due to network handshakes, CPU processing, and memory overhead on the database server. Connection pooling creates a cache of active database connections that are kept open and reused. When a request comes, it borrows an active connection from the pool, runs the query, and returns the connection to the pool. This prevents connection saturation, speeds up query execution, and limits database resource usage."
            },
            {
                id: "q-be-3",
                category: "Technical",
                question: "Explain the concept of JWT (JSON Web Tokens). How does it work for authentication, and how do you secure it?",
                modelAnswer: "A JWT is a stateless authentication token consisting of a Header, Payload, and Signature. When a user logs in, the server generates a JWT signed with a secret key and sends it to the client. The client attaches this token in the Authorization header (as a Bearer token) for subsequent API requests. The server validates the token using its secret key without querying a session store. To secure JWTs: store them in HttpOnly, Secure cookies to prevent XSS theft, keep payloads small, set short expiration times, and implement refresh token rotation schemes."
            }
        ],
        ai_engineer: [
            {
                id: "q-ai-1",
                category: "Technical",
                question: "What is overfitting in machine learning? What are its common indicators, and how can you mitigate it?",
                modelAnswer: "Overfitting occurs when a model learns the noise and details of the training data too well, failing to generalize to new, unseen data. It is indicated by very high accuracy/low loss on the training set, but poor accuracy/high loss on the validation/test set. Mitigation strategies include: 1) Getting more training data. 2) Reducing model complexity (fewer parameters/layers). 3) Applying Regularization (L1/L2 penalties). 4) Utilizing dropout layers in neural networks. 5) Early stopping during training when validation loss starts rising."
            },
            {
                id: "q-ai-2",
                category: "Technical",
                question: "Explain the concept of Retrieval-Augmented Generation (RAG). Why is it useful for LLM-based applications?",
                modelAnswer: "RAG combines search retrieval with generative AI. Instead of relying solely on an LLM's pre-trained knowledge, a RAG system first takes a user's query, searches an external knowledge source (often index-mapped in a Vector Database using embeddings) for relevant documents, and appends this retrieved text context into the LLM prompt. The LLM then uses this context to write a highly accurate, up-to-date answer. This prevents hallucinations, solves the knowledge-cutoff problem, and allows securing access to private company documents."
            },
            {
                id: "q-ai-3",
                category: "Technical",
                question: "What is gradient descent? Explain the difference between batch, stochastic, and mini-batch gradient descent.",
                modelAnswer: "Gradient descent is an optimization algorithm used to minimize a model's loss function by iteratively moving in the direction of steepest descent (opposite to the gradient). Batch GD calculates the loss gradient for the *entire* training set before making a single parameter update, which is stable but slow. Stochastic GD (SGD) updates parameters after *each* individual training example, which is fast but highly noisy. Mini-Batch GD computes the gradient on small blocks of data (e.g., 32 or 64 examples), combining the stability of Batch GD and the speed of SGD."
            }
        ],
        mobile_dev: [
            {
                id: "q-mb-1",
                category: "Technical",
                question: "Explain the difference between Native App development and Cross-Platform App development. What are the trade-offs?",
                modelAnswer: "Native App Development uses platform-specific tools and languages (Swift/Xcode for iOS, Kotlin/Android Studio for Android). It offers maximum performance, seamless access to latest physical device features, and customized UX designs, but doubles development cost and time. Cross-Platform Development (React Native, Flutter) uses a single shared codebase to render to both platforms. This reduces costs and shortens time-to-market, but can hit rendering bottlenecks on complex animations, requires bridge modules for unmapped native APIs, and depends on framework support lifecycles."
            },
            {
                id: "q-mb-2",
                category: "Technical",
                question: "What is the Mobile Application Lifecycle? Why is handling lifecycle changes crucial for mobile devices?",
                modelAnswer: "The Mobile App Lifecycle describes the runtime states of an app, such as Active (running in foreground), Inactive (briefly interrupted by a phone call), Background (minimized but still processing), and Suspended/Terminated (dormant in memory or closed by OS). Handling these changes is critical because mobile operating systems aggressively terminate background apps to save battery and RAM. Developers must save application state, pause database tasks when entering background, and restore UI context on resume."
            }
        ],
        data_analyst: [
            {
                id: "q-da-1",
                category: "Technical",
                question: "What is the difference between a GROUP BY clause and a PARTITION BY clause in SQL?",
                modelAnswer: "GROUP BY collapses multiple database rows into a single summary row based on matching column values (e.g., getting total sales per region). It requires using aggregate functions like SUM or COUNT. PARTITION BY is used in window functions. It divides rows into partitions for calculations (e.g., running cumulative totals or rankings within a region) but keeps all individual detail rows in the final table output instead of collapsing them."
            },
            {
                id: "q-da-2",
                category: "Technical",
                question: "What is A/B testing? How do you establish sample size and determine if test results are statistically significant?",
                modelAnswer: "A/B testing is a statistical methodology comparing two versions (A and B) of a variable to see which performs better. Sample size is calculated using power analysis based on target significance levels (usually 95%, or alpha = 0.05), statistical power (usually 80%), and Minimum Detectable Effect (MDE). Significance is determined by compiling experimental results, computing statistical values (e.g. Z-Score or T-Test), and checking if the resulting P-value is less than alpha (0.05). If so, we reject the null hypothesis and confirm the difference is not due to random chance."
            }
        ],
        behavioral: [
            {
                id: "q-bh-1",
                category: "Behavioral",
                question: "Tell me about a time you had to solve a complex technical problem under a tight deadline. How did you handle it?",
                modelAnswer: "A great answer uses the STAR method (Situation, Task, Action, Result). Outline a specific event, state the task and deadline, explain your active technical troubleshooting steps (how you isolated variables, collaborated, or simplified requirements), and quantify the successful outcome (e.g., 'we successfully launched on time with 99% uptime'). Focus on communication and structured debugging."
            },
            {
                id: "q-bh-2",
                category: "Behavioral",
                question: "How do you handle disagreements with team members or managers regarding technical design decisions?",
                modelAnswer: "Focus on collaboration and objectivity. Explain that you first ensure you fully understand their perspective by asking clarifying questions. Then, present your arguments backed by objective evidence, such as benchmarks, documentation, or past use-cases. Finally, state that you prioritize the project's success and are willing to align and commit to the chosen path (even if it wasn't yours) once a team decision is finalized."
            }
        ]
    },

    // 3. SKILL ASSESSMENT QUIZ BANK
    quizzes: {
        frontend: [
            {
                question: "Which of the following is NOT a valid value for the 'position' property in CSS?",
                options: ["static", "relative", "inline", "sticky"],
                correctIndex: 2,
                explanation: "'inline' is a value for the 'display' property, not 'position'. Valid position values include static, relative, absolute, fixed, and sticky."
            },
            {
                question: "What will `console.log(typeof NaN)` output in Javascript?",
                options: ["'number'", "'NaN'", "'undefined'", "'object'"],
                correctIndex: 0,
                explanation: "In JavaScript, NaN (Not-a-Number) is classified as a numeric data type, so `typeof NaN` returns 'number'."
            },
            {
                question: "Which hook in React should you use to memorize a computed value and prevent recalculation on every render?",
                options: ["useCallback", "useMemo", "useRef", "useEffect"],
                correctIndex: 1,
                explanation: "`useMemo` returns a memoized value that only recalculates when one of its dependencies changes. `useCallback` is similar but memoizes the function definition itself, not the returned value."
            },
            {
                question: "What is the purpose of the 'alt' attribute on an HTML `<img>` tag?",
                options: [
                    "To define the alignment of the image",
                    "To provide alternative text for screen readers and SEO",
                    "To specify an alternative image URL if the main one fails",
                    "To set the hover tooltip text"
                ],
                correctIndex: 1,
                explanation: "The 'alt' attribute provides descriptive alternative text which is essential for accessibility (read by screen readers) and helps search engines index the image content."
            }
        ],
        backend: [
            {
                question: "In a relational database, what does a 'FOREIGN KEY' constraint do?",
                options: [
                    "It ensures every row in a table has a unique identifier",
                    "It speeds up queries by storing columns in indexes",
                    "It establishes a link between data in two tables by referencing a primary key",
                    "It encrypts the column data"
                ],
                correctIndex: 2,
                explanation: "A FOREIGN KEY is a field in one table that uniquely identifies a row in another table, creating an explicit relationship and maintaining referential integrity."
            },
            {
                question: "Which HTTP status code represents 'Unauthorized' (missing credentials)?",
                options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
                correctIndex: 1,
                explanation: "401 represents 'Unauthorized' (requiring authentication). 403 Forbidden means the server understands who you are, but you do not have permission to access the resource."
            },
            {
                question: "How does Node.js handle heavy concurrent incoming connections despite being single-threaded?",
                options: [
                    "It automatically spawns operating system threads for each request",
                    "It uses an asynchronous event loop that delegates I/O operations to system threads",
                    "It stops processing incoming files until current connections close",
                    "It runs multiple hidden VM instances out of the box"
                ],
                correctIndex: 1,
                explanation: "Node.js utilizes a single execution thread, but offloads blocking Input/Output operations (database queries, file reads, networking) to the system kernel or thread pool (libuv). Once completed, callbacks are queued to the event loop."
            },
            {
                question: "Which caching strategy writes data directly to both the cache and the database simultaneously?",
                options: ["Write-Through", "Write-Back", "Cache-Aside", "Read-Through"],
                correctIndex: 0,
                explanation: "Under a Write-Through caching scheme, data is written to the cache and the backend database at the same time, ensuring consistency but adding write latency."
            }
        ],
        ai_engineer: [
            {
                question: "Which of the following activation functions is commonly used to prevent the vanishing gradient problem in deep networks?",
                options: ["Sigmoid", "Tanh", "ReLU (Rectified Linear Unit)", "Step Function"],
                correctIndex: 2,
                explanation: "ReLU outputs the input directly if positive, and zero otherwise. Because its derivative is constant (1) for positive inputs, it helps prevent gradients from decaying exponentially (vanishing) in deep layers, unlike Sigmoid and Tanh which saturate."
            },
            {
                question: "In natural language processing, what is the primary benefit of the 'Self-Attention' mechanism in Transformers?",
                options: [
                    "It compresses text files into smaller binaries",
                    "It allows words in a sentence to relate directly to each other, regardless of their distance",
                    "It removes stop words automatically",
                    "It forces sequential processing to speed up GPUs"
                ],
                correctIndex: 1,
                explanation: "Self-attention computes dynamic weight relationships between all words in a sequence simultaneously, allowing the model to capture context and long-range dependencies far better than sequential architectures like LSTMs."
            },
            {
                question: "What is Retrieval-Augmented Generation (RAG)?",
                options: [
                    "A technique to generate fake images for training sets",
                    "A method that retrieves relevant documents from a database and appends them to the LLM prompt context",
                    "An optimization that speeds up LLM training times by 50%",
                    "An algorithm for predicting query autocomplete suggestions"
                ],
                correctIndex: 1,
                explanation: "RAG queries a database (usually a vector index) to fetch external reference information matching the user's input, feeding this context to the LLM to generate more accurate, grounded answers."
            },
            {
                question: "What does the 'Temperature' parameter control when querying an LLM API?",
                options: [
                    "The operating temperature of the server GPU",
                    "The degree of randomness/creativity in the generated text tokens",
                    "The maximum token count of the output",
                    "The number of parallel processing threads used"
                ],
                correctIndex: 1,
                explanation: "Temperature scales the probability distributions of the next tokens. A low temperature (e.g. 0.2) makes the model deterministic and factual; a high temperature (e.g. 0.8) introduces randomness and creativity."
            }
        ],
        mobile_dev: [
            {
                question: "Which component in React Native is used to display scrollable lists of variable size efficiently?",
                options: ["ScrollView", "FlatList", "ListView", "SafeAreaView"],
                correctIndex: 1,
                explanation: "`FlatList` renders only the elements currently visible on the screen, recycling offscreen components to optimize memory. `ScrollView` renders all child items immediately, causing performance degradation on large datasets."
            },
            {
                question: "In Swift, what does the '?' character denote when appended to a type declaration (e.g., 'var name: String?')?",
                options: [
                    "It represents a syntax error",
                    "It defines a constant variable",
                    "It marks the variable as an Optional type (which can be nil)",
                    "It makes the variable private to the scope"
                ],
                correctIndex: 2,
                explanation: "In Swift, an Optional type (denoted by `?`) means the variable can either hold a value of that type or be `nil`. Swift enforces unwrapping before accessing Optionals to prevent null pointer crashes."
            }
        ],
        data_analyst: [
            {
                question: "Which of the following joins returns all rows from the left table, and the matched rows from the right table?",
                options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
                correctIndex: 1,
                explanation: "A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matching records from the right table. For right-table columns with no match, it outputs NULL."
            },
            {
                question: "What is a P-Value in statistical hypothesis testing?",
                options: [
                    "The probability of the alternative hypothesis being true",
                    "The size of the target sample population",
                    "The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true",
                    "The correlation coefficient between variables"
                ],
                correctIndex: 2,
                explanation: "The P-value calculates the probability that the experimental results happened by random chance under the assumption that the null hypothesis is true. A P-value < 0.05 is typically the threshold to declare a statistically significant result."
            }
        ]
    },

    // 4. MENTOR RESPONSE SIMULATION ENGINE
    getSimulatedMentorResponse: function(userMessage, careerPath = "frontend") {
        const text = userMessage.toLowerCase();
        let pathName = "Frontend Development";
        if (careerPath === "backend") pathName = "Backend Engineering";
        if (careerPath === "ai_engineer") pathName = "AI/ML Engineering";
        if (careerPath === "mobile_dev") pathName = "Mobile Application Development";
        if (careerPath === "data_analyst") pathName = "Data Analyst & Business Intelligence";

        // Direct keyword mappings
        if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
            return `### Hello! I am Athena, your AI Career & Study Mentor. 👋

I'm here to guide your learning journey in **${pathName}**.

How can I help you today? You can ask me to:
1. **Explain** a complex concept (e.g., *"Explain React Hooks"* or *"What is database indexing?"*)
2. Provide a **Study Plan** for a specific skill.
3. Give you a quick **quiz** on a topic.
4. Answer general **career prep** questions.`;
        }

        if (text.includes("explain") || text.includes("what is") || text.includes("how does")) {
            if (text.includes("hook") || text.includes("react")) {
                return `### React Hooks Explanation ⚛️

React Hooks were introduced in version 16.8. They allow you to use state and other React features inside functional components, making class components largely obsolete.

Here are the key hooks you should know:
1. **\`useState\`**: Manages local component state.
   \`\`\`javascript
   const [count, setCount] = useState(0);
   \`\`\`
2. **\`useEffect\`**: Handles side effects like fetching data, timers, and DOM manipulation. It replaces lifecycle methods like \`componentDidMount\`.
3. **\`useRef\`**: References a DOM node or persists a mutable value across renders without triggering a re-render.
4. **\`useMemo\`**: Memorizes a computed value, recalculating it only when dependency values change.

**Analogy:** Think of hooks as modular power-ups for simple functions. Rather than building a giant machine (Class), you plug in the power-up modules you need into a simple workspace (Function).`;
            }

            if (text.includes("index") || text.includes("sql") || text.includes("database")) {
                return `### Database Indexing Explained 🗄️

A database index is a data structure (typically a **B-Tree**) that speeds up data retrieval operations on a table at the cost of additional writes and storage space.

**The Book Index Analogy:**
Imagine looking for a specific topic in a 1,000-page book. 
* *Without an index*: You must flip through every page (Full Table Scan) which takes $O(N)$ time.
* *With an index*: You flip to the back of the book, look up the keyword alphabetically, find the page numbers (e.g. page 412), and jump straight there.

**Trade-offs:**
* **Pros**: Queries run dramatically faster ($O(\log N)$ instead of $O(N)$).
* **Cons**: Write operations (\"INSERT\", \"UPDATE\", \"DELETE\") take longer because the database must update the index structures alongside the raw table files.`;
            }

            if (text.includes("rag") || text.includes("retrieval") || text.includes("llm")) {
                return `### Retrieval-Augmented Generation (RAG) 🔍

RAG is a system design pattern that addresses two major LLM issues: **hallucinations** and **out-of-date knowledge**.

#### How it works (The 3-Step Loop):
1. **Retrieve**: The system indexes your private documents using an *embedding model* and saves them in a *vector database*. When a user asks a question, the system queries the vector database for text blocks matching the question.
2. **Augment**: The system structures a new prompt, injecting the retrieved text documents as absolute reference context.
3. **Generate**: The LLM reads the context and answers the user's prompt based *only* on the provided documents.

**Open Book Exam Analogy:**
Normal LLMs are like students taking a closed-book test based on memory. RAG is like giving the student the exact textbooks and allowed notes (Vector search context) during the test.`;
            }

            if (text.includes("mobile") || text.includes("swift") || text.includes("react native") || text.includes("bridge")) {
                return `### Mobile Bridge & Native Modules 📱

In cross-platform frameworks like React Native, the application code runs in a **JavaScript engine** (like Hermes). However, the actual UI elements rendered are native platform widgets (UIViews on iOS, Android.Views on Android).

#### The Bridge Architecture:
* **JS Thread**: Runs your JavaScript components, styles, logic, and state.
* **Bridge**: An asynchronous, serialized JSON channel that transfers method calls and layout specifications between threads.
* **Native UI Thread**: Renders UI updates and receives hardware user gestures.

*Tip: Modern React Native is replacing this bridge with the **JSI (JavaScript Interface)**, allowing JavaScript to hold direct references to Native C++ objects for much faster executions.*`;
            }

            if (text.includes("group by") || text.includes("partition by") || text.includes("window")) {
                return `### SQL: Group By vs Partition By 📊

Both expressions are used to compute summaries over rows, but they output data differently:

1. **\`GROUP BY\`**:
   * Collapses matching detail rows.
   * Outputs one row per group.
   * *Example*: \`SELECT country, SUM(sales) FROM transactions GROUP BY country\`
2. **\`PARTITION BY\`** (Window Function):
   * Computes summaries but *keeps all original rows*.
   * Appends summary columns alongside original details.
   * *Example*: \`SELECT transaction_id, sales, SUM(sales) OVER (PARTITION BY country) as country_total FROM transactions\``;
            }

            return `### Concept Explanation 💡

Here is a quick structured breakdown of that concept:
1. **Core Definition**: It is a method/pattern used to solve specific architectural or data problems.
2. **Why It Matters**: Without it, developers face scalability bottlenecks, code spaghetti, or resource leakage.
3. **Best Practices**: Keep executions modular, write unit tests to cover error boundaries, and monitor memory consumption.

*Tip: If you'd like an explanation for a specific technology (e.g. Promises, REST APIs, or Vectors), specify it in your next message!*`;
        }

        if (text.includes("plan") || text.includes("roadmap") || text.includes("study")) {
            return `### Personalized 4-Week Study Sprint 🗓️

Based on your target of **${pathName}**, here is an accelerated study plan:

* **Week 1: Foundations & Setup**
  * Spend 2 hours daily building small sandbox scripts.
  * Practice version control (commit 3+ times daily to GitHub).
* **Week 2: Core Architecture**
  * Implement modular design patterns.
  * Read official documentations rather than watching long video courses.
* **Week 3: Database & API Integration**
  * Build full CRUD pipelines.
  * Focus on error handling and boundary testing.
* **Week 4: Mock Deployment & Optimization**
  * Deploy your prototype to a staging server (e.g. Netlify/Render).
  * Run performance tests and optimize assets.

Would you like resource links or a specific project recommendation for this week?`;
        }

        if (text.includes("resume") || text.includes("portfolio")) {
            return `### Resume & Portfolio Tips 📄

To stand out for **${pathName}** roles, follow these guidelines:
1. **Action-Oriented Verbs**: Start bullet points with words like *Designed, Optimized, Developed,* or *Architected*.
2. **Quantify Impact**: Instead of *"Improved page performance,"* write *"Reduced page load times by 42% through image lazy-loading and bundle code-splitting."*
3. **Project Variety**: Host 2-3 production-grade applications. Ensure your GitHub repositories have clean \`README.md\` files with setup guides and architectural diagrams.
4. **Tailor Keywords**: Use our **Resume Optimizer** tab to check if your resume matches the terms on your target job descriptions!`;
        }

        if (text.includes("interview") || text.includes("job") || text.includes("prepare")) {
            return `### Interview Prep Strategy 🎯

To successfully clear **${pathName}** interviews, dedicate time to these three pillars:

1. **System & Technical Knowledge**: Practice the conceptual questions in our **Mock Interview** tab.
2. **Coding Challenges**: Solve 1-2 coding problems daily (focusing on arrays, hash maps, and recursion).
3. **Behavioral Storytelling**: Structure your stories using the **STAR** framework (Situation, Task, Action, Result) to show problem-solving and emotional intelligence.

Do you want me to write a mock interview question for us to practice right now in this chat?`;
        }

        // Default response
        return `### Career Mentor Insights 🧠

I hear your request. In **${pathName}**, success is driven by building hands-on projects and understanding foundational concepts deeply.

* **Recommended next step**: Try navigating to our **Roadmap** view to check off your completed subskills, or take a **Quiz** to assess your current knowledge.
* **Ask me anything**: If you're stuck on a code snippet, ask me to explain or debug it!`;
    }
};
