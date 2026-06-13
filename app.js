// Aegis Mentor - Core Application Controller

// 1. STATE INITIALIZATION & LOCALSTORAGE MANAGEMENT
const DEFAULT_STATE = {
    profile: {
        name: "Alex Dev",
        title: "Career Prep Active"
    },
    completedNodes: {}, // pathId -> array of nodeIds
    completedSubskills: {}, // nodeId -> array of subskill indexes/names
    chatLog: [
        { sender: "assistant", text: "### Hello! I am Athena, your AI Career & Study Mentor. 👋\n\nI'm here to guide your learning journey.\n\nHow can I help you today? You can ask me to explain concepts, provide study plans, or quiz you!" }
    ],
    quizScores: {
        frontend: [],
        backend: [],
        ai_engineer: []
    },
    interviewsCompleted: 0,
    interviewScores: [], // array of numbers
    jobs: [
        { id: "job-1", title: "Junior Frontend Engineer", company: "Meta", stage: "wishlist", date: "2026-06-11", notes: "Targeting Q3 application. Standard referral pathway." },
        { id: "job-2", title: "Software Engineer Intern", company: "Stripe", stage: "applied", date: "2026-06-10", notes: "Applied on portal. Referred by university senior." }
    ],
    activities: [
        { type: "success", text: "Account initialized. Welcome to Aegis Mentor!", time: "Just now" }
    ]
};

let appState = {};

function loadState() {
    const saved = localStorage.getItem("aegis_mentor_state");
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse state, resetting", e);
            appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    } else {
        appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
}

function saveState() {
    localStorage.setItem("aegis_mentor_state", JSON.stringify(appState));
    updateGlobalStats();
}

function addActivity(text, type = "primary") {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    appState.activities.unshift({ type, text, time: timeString });
    if (appState.activities.length > 8) {
        appState.activities.pop();
    }
    saveState();
    renderActivities();
}

// 2. ROUTING & NAVIGATION
const VIEWS = ["dashboard", "roadmap", "mentor", "resume", "interview", "quiz", "tracker"];

function switchView(viewName) {
    if (!VIEWS.includes(viewName)) return;
    
    // Toggle navigation classes
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });
    const activeNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (activeNav) activeNav.classList.add("active");

    // Toggle panels with animations
    document.querySelectorAll(".view-panel").forEach(panel => {
        panel.classList.remove("active-view");
        panel.style.display = "none";
    });

    const targetPanel = document.getElementById(`view-active-${viewName}`) || document.getElementById(`view-${viewName}`);
    if (targetPanel) {
        targetPanel.style.display = "flex";
        setTimeout(() => {
            targetPanel.classList.add("active-view");
        }, 10);
    }

    // Update Header titles dynamically
    const headerTitle = document.getElementById("view-title");
    const headerSubtitle = document.getElementById("view-subtitle");
    
    switch (viewName) {
        case "dashboard":
            headerTitle.textContent = "Dashboard";
            headerSubtitle.textContent = "Overview of your learning journey and prep progress";
            renderDashboard();
            break;
        case "roadmap":
            headerTitle.textContent = "Interactive Roadmaps";
            headerSubtitle.textContent = "Explore step-by-step career milestones and subskills";
            initRoadmaps();
            break;
        case "mentor":
            headerTitle.textContent = "AI Study Mentor";
            headerSubtitle.textContent = "Chat with Athena for quick concept explanations and custom study plans";
            initChat();
            break;
        case "resume":
            headerTitle.textContent = "Resume Optimizer";
            headerSubtitle.textContent = "Evaluate and align your CV against target job descriptions";
            initResumeAnalyzer();
            break;
        case "interview":
            headerTitle.textContent = "Mock Interview Simulator";
            headerSubtitle.textContent = "Practice behavioral and technical responses with real-time scoring";
            initInterviewSimulator();
            break;
        case "quiz":
            headerTitle.textContent = "Skills Assessment";
            headerSubtitle.textContent = "Test your technical expertise with quick timed assessments";
            initQuiz();
            break;
        case "tracker":
            headerTitle.textContent = "Job Application Tracker";
            headerSubtitle.textContent = "Manage your application pipeline and preparation stages";
            renderKanbanBoard();
            break;
    }
}

// 3. GLOBAL STATS AND COMPUTATIONS
function calculateOverallPrepPercent() {
    let totalSubskills = 0;
    let completedSubskillsCount = 0;

    // Sum up subskills across all roadmaps in data.js
    const roadmaps = window.MENTOR_DATA.roadmaps;
    for (const key in roadmaps) {
        roadmaps[key].nodes.forEach(node => {
            totalSubskills += node.subskills.length;
            const completed = appState.completedSubskills[node.id] || [];
            completedSubskillsCount += completed.length;
        });
    }

    if (totalSubskills === 0) return 0;
    return Math.round((completedSubskillsCount / totalSubskills) * 100);
}

function updateGlobalStats() {
    const prepPercent = calculateOverallPrepPercent();
    
    // Header Score
    const headerScoreEl = document.getElementById("header-prep-score");
    if (headerScoreEl) headerScoreEl.textContent = `${prepPercent}%`;

    // Dashboard Circular Progress Ring
    const progressRing = document.getElementById("dashboard-progress-ring");
    const progressPercentText = document.getElementById("dashboard-progress-percent");
    if (progressRing && progressPercentText) {
        progressPercentText.textContent = `${prepPercent}%`;
        const radius = progressRing.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        progressRing.style.strokeDasharray = `${circumference}`;
        const offset = circumference - (prepPercent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }

    // Dashboard Widgets
    const statRoadmaps = document.getElementById("stat-roadmaps");
    if (statRoadmaps) {
        const roadmapsCount = Object.keys(window.MENTOR_DATA.roadmaps).length;
        let activeRoadmaps = 0;
        for (const key in window.MENTOR_DATA.roadmaps) {
            const hasStarted = window.MENTOR_DATA.roadmaps[key].nodes.some(node => {
                return (appState.completedSubskills[node.id] || []).length > 0;
            });
            if (hasStarted) activeRoadmaps++;
        }
        statRoadmaps.textContent = `${activeRoadmaps} / ${roadmapsCount}`;
    }

    const statQuizzes = document.getElementById("stat-quizzes");
    if (statQuizzes) {
        let totalQuizzes = 0;
        for (const key in appState.quizScores) {
            totalQuizzes += appState.quizScores[key].length;
        }
        statQuizzes.textContent = `${totalQuizzes}`;
    }

    const statInterviews = document.getElementById("stat-interviews");
    if (statInterviews) {
        statInterviews.textContent = `${appState.interviewsCompleted}`;
    }

    const statJobs = document.getElementById("stat-jobs");
    if (statJobs) {
        statJobs.textContent = `${appState.jobs.length}`;
    }
}

// 4. VIEW RENDERING: DASHBOARD
function renderDashboard() {
    // Welcome Header
    const welcomeEl = document.getElementById("welcome-message");
    if (welcomeEl) {
        welcomeEl.textContent = `Welcome Back, ${appState.profile.name}!`;
    }

    // Daily Quote
    const quotes = [
        '"The expert in anything was once a beginner." — Helen Hayes',
        '"Real coding isn\'t about writing lines, it\'s about breaking barriers." — Unknown',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"Strive for progress, not perfection." — Bill Gates',
        '"Continuous learning is the minimum requirement for success in tech." — Denis Waitley'
    ];
    const dailyQuote = document.getElementById("daily-quote");
    if (dailyQuote) {
        const index = new Date().getDay() % quotes.length;
        dailyQuote.textContent = quotes[index];
    }

    renderActivities();
    renderRecommendations();
}

function renderActivities() {
    const listEl = document.getElementById("activity-timeline");
    if (!listEl) return;

    if (appState.activities.length === 0) {
        listEl.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-secondary);">No activities logged yet.</p>`;
        return;
    }

    listEl.innerHTML = appState.activities.map(act => {
        return `
            <div class="activity-item ${act.type}">
                <div class="activity-dot"></div>
                <div class="activity-text">${act.text}</div>
                <span class="activity-time">${act.time}</span>
            </div>
        `;
    }).join("");
}

function renderRecommendations() {
    const recList = document.getElementById("recommendations-list");
    if (!recList) return;

    const items = [];

    // Check roadmaps
    let roadmapsStarted = false;
    for (const key in window.MENTOR_DATA.roadmaps) {
        const hasStarted = window.MENTOR_DATA.roadmaps[key].nodes.some(node => {
            return (appState.completedSubskills[node.id] || []).length > 0;
        });
        if (hasStarted) roadmapsStarted = true;
    }

    if (!roadmapsStarted) {
        items.push({
            badgeClass: "rec-badge-chat",
            badgeText: "Roadmap",
            title: "Launch a Career Path",
            desc: "Select a technical roadmap to configure your skill tracker.",
            actionText: "Open Roadmaps",
            view: "roadmap"
        });
    }

    // Check quizzes
    let totalQuizzes = 0;
    for (const key in appState.quizScores) {
        totalQuizzes += appState.quizScores[key].length;
    }
    if (totalQuizzes === 0) {
        items.push({
            badgeClass: "rec-badge-quiz",
            badgeText: "Quiz",
            title: "Test your skill baseline",
            desc: "Take a 5-question timed assessment in Frontend or Systems.",
            actionText: "Take Quiz",
            view: "quiz"
        });
    }

    // Check resume analysis
    if (appState.activities.filter(a => a.text.includes("Resume")).length === 0) {
        items.push({
            badgeClass: "rec-badge-resume",
            badgeText: "Optimize",
            title: "Analyze your Resume",
            desc: "Match your CV keywords against specific job role requirements.",
            actionText: "Scan Resume",
            view: "resume"
        });
    }

    // Check interview
    if (appState.interviewsCompleted === 0) {
        items.push({
            badgeClass: "rec-badge-interview",
            badgeText: "Interview",
            title: "Try a Mock Interview",
            desc: "Simulate answering behavioral/technical questions with voice inputs.",
            actionText: "Start Prep",
            view: "interview"
        });
    }

    if (items.length === 0) {
        // Fallback standard recommendations
        items.push(
            {
                badgeClass: "rec-badge-chat",
                badgeText: "Study",
                title: "Ask Athena about RAG",
                desc: "Learn about Retrieval-Augmented Generation from your AI Mentor.",
                actionText: "Chat Now",
                view: "mentor"
            },
            {
                badgeClass: "rec-badge-interview",
                badgeText: "Interview",
                title: "Practice STAR Storytelling",
                desc: "Practice behavioral interview templates with structured questions.",
                actionText: "Practice STAR",
                view: "interview"
            }
        );
    }

    recList.innerHTML = items.map(item => {
        return `
            <div class="rec-item">
                <div class="rec-content">
                    <span class="rec-badge ${item.badgeClass}">${item.badgeText}</span>
                    <div class="rec-text">
                        <h5>${item.title}</h5>
                        <p>${item.desc}</p>
                    </div>
                </div>
                <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="switchView('${item.view}')">${item.actionText}</button>
            </div>
        `;
    }).join("");
}

// 5. VIEW RENDERING: ROADMAPS
let currentRoadmapPath = "frontend";
let selectedNodeId = null;

function initRoadmaps() {
    const selectorTabs = document.getElementById("roadmap-selector-tabs");
    if (!selectorTabs) return;

    // Render path tabs
    selectorTabs.innerHTML = Object.keys(window.MENTOR_DATA.roadmaps).map(key => {
        const activeClass = (key === currentRoadmapPath) ? "active" : "";
        const title = window.MENTOR_DATA.roadmaps[key].title;
        return `<button class="path-tab ${activeClass}" onclick="setRoadmapPath('${key}')">${title}</button>`;
    }).join("");

    const pathData = window.MENTOR_DATA.roadmaps[currentRoadmapPath];
    if (pathData && pathData.nodes.length > 0 && !selectedNodeId) {
        selectedNodeId = pathData.nodes[0].id;
    }

    renderRoadmapNodes();

    if (selectedNodeId) {
        selectRoadmapNode(selectedNodeId);
    }
}

function setRoadmapPath(pathKey) {
    currentRoadmapPath = pathKey;
    selectedNodeId = null;
    initRoadmaps();
}

function renderRoadmapNodes() {
    const canvas = document.getElementById("roadmap-canvas-nodes");
    if (!canvas) return;

    const pathData = window.MENTOR_DATA.roadmaps[currentRoadmapPath];
    if (!pathData) return;

    let html = "";
    
    pathData.nodes.forEach((node, index) => {
        const isCompleted = isNodeCompleted(node.id);
        const isActive = (node.id === selectedNodeId) ? "active" : "";
        const completeClass = isCompleted ? "completed" : "";
        const completionCheck = isCompleted ? "✓" : "";
        
        // Draw connector line if not first
        if (index > 0) {
            const prevCompleted = isNodeCompleted(pathData.nodes[index - 1].id);
            const connCompletedClass = prevCompleted ? "completed" : "";
            html += `<div class="roadmap-connector-line ${connCompletedClass}"></div>`;
        }

        html += `
            <div class="roadmap-node-container">
                <div class="roadmap-node ${isActive} ${completeClass}" onclick="selectRoadmapNode('${node.id}')">
                    <div class="node-content-left">
                        <div class="node-status-circle">
                            <svg viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div class="node-text">
                            <h4>${node.title}</h4>
                            <span>Target Time: ${node.duration}</span>
                        </div>
                    </div>
                    <span class="node-badge">${node.badge}</span>
                </div>
            </div>
        `;
    });

    canvas.innerHTML = html;
}

function isNodeCompleted(nodeId) {
    // A node is completed if all its subskills are checked
    const node = findNodeById(nodeId);
    if (!node) return false;
    const completedList = appState.completedSubskills[nodeId] || [];
    return completedList.length === node.subskills.length && node.subskills.length > 0;
}

function findNodeById(nodeId) {
    for (const pathKey in window.MENTOR_DATA.roadmaps) {
        const node = window.MENTOR_DATA.roadmaps[pathKey].nodes.find(n => n.id === nodeId);
        if (node) return node;
    }
    return null;
}

function selectRoadmapNode(nodeId) {
    selectedNodeId = nodeId;
    renderRoadmapNodes(); // updates active border states

    const node = findNodeById(nodeId);
    if (!node) return;

    document.getElementById("node-details-empty").style.display = "none";
    const detailsContent = document.getElementById("node-details-content");
    detailsContent.style.display = "block";

    document.getElementById("detail-node-badge").textContent = node.badge.toUpperCase();
    document.getElementById("detail-node-title").textContent = node.title;
    document.getElementById("detail-node-duration").textContent = `Suggested Duration: ${node.duration}`;
    document.getElementById("detail-node-desc").textContent = node.description;

    // Render Subskill items with checkboxes
    const subskillList = document.getElementById("detail-subskill-list");
    const completedForNode = appState.completedSubskills[nodeId] || [];

    subskillList.innerHTML = node.subskills.map((skill, index) => {
        const isChecked = completedForNode.includes(index);
        const checkedClass = isChecked ? "checked" : "";
        return `
            <div class="subskill-item">
                <div class="subskill-checkbox ${checkedClass}" onclick="toggleSubskill('${nodeId}', ${index})">
                    <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <span>${skill}</span>
            </div>
        `;
    }).join("");

    // Render resources
    const resourceList = document.getElementById("detail-resource-list");
    resourceList.innerHTML = node.resources.map(res => {
        return `
            <a href="${res.url}" target="_blank" class="resource-link">
                <span>${res.name}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
        `;
    }).join("");
}

function toggleSubskill(nodeId, subskillIndex) {
    if (!appState.completedSubskills[nodeId]) {
        appState.completedSubskills[nodeId] = [];
    }

    const idx = appState.completedSubskills[nodeId].indexOf(subskillIndex);
    const node = findNodeById(nodeId);
    
    if (idx > -1) {
        appState.completedSubskills[nodeId].splice(idx, 1);
    } else {
        appState.completedSubskills[nodeId].push(subskillIndex);
    }

    saveState();
    
    // Check if completion status changed
    const isCompletedNow = isNodeCompleted(nodeId);
    if (isCompletedNow && idx === -1 && node) {
        addActivity(`Completed all milestones for node: ${node.title}`, "success");
    }

    // Refresh UI
    selectRoadmapNode(nodeId);
    renderRoadmapNodes();
}

// 6. VIEW RENDERING: AI MENTOR
function initChat() {
    const chatLog = document.getElementById("chat-history-log");
    if (!chatLog) return;

    renderChatHistory();
}

function renderChatHistory() {
    const chatLog = document.getElementById("chat-history-log");
    if (!chatLog) return;

    chatLog.innerHTML = appState.chatLog.map(msg => {
        const senderLabel = msg.sender === "user" ? "Me" : "Athena";
        const textFormatted = msg.text
            .replace(/### (.*)/g, '<h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.06); padding: 0.15rem 0.35rem; border-radius: 4px;">$1</code>')
            .replace(/```javascript([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: var(--border-radius-sm); overflow-x: auto; margin: 0.5rem 0; font-family: monospace; font-size: 0.8rem;">$1</pre>')
            .replace(/- (.*)/g, '<li style="margin-left: 1rem; font-size: 0.85rem;">$1</li>');

        return `
            <div class="message ${msg.sender}">
                <div class="message-avatar">${senderLabel[0]}</div>
                <div class="message-bubble">
                    ${textFormatted}
                </div>
            </div>
        `;
    }).join("");

    chatLog.scrollTop = chatLog.scrollHeight;
}

document.getElementById("chat-input-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const inputField = document.getElementById("chat-input-field");
    if (!inputField) return;

    const userText = inputField.value.trim();
    if (!userText) return;

    // Append user message
    appState.chatLog.push({ sender: "user", text: userText });
    inputField.value = "";
    renderChatHistory();
    saveState();

    // Pulse Athena bubble
    const chatLog = document.getElementById("chat-history-log");
    const thinkingBubble = document.createElement("div");
    thinkingBubble.className = "message assistant thinking-message";
    thinkingBubble.innerHTML = `
        <div class="message-avatar">A</div>
        <div class="message-bubble" style="font-style: italic; color: var(--text-secondary);">
            Athena is formulating explanation...
        </div>
    `;
    chatLog.appendChild(thinkingBubble);
    chatLog.scrollTop = chatLog.scrollHeight;

    setTimeout(() => {
        // Remove thinking message
        const els = document.querySelectorAll(".thinking-message");
        els.forEach(el => el.remove());

        // Get simulated response
        const responseText = window.MENTOR_DATA.getSimulatedMentorResponse(userText, currentRoadmapPath);
        appState.chatLog.push({ sender: "assistant", text: responseText });
        
        addActivity("Received guidance from AI Mentor", "primary");
        renderChatHistory();
        saveState();
    }, 1200);
});

// Exposed global for topic chips
window.askMentor = function(phrase) {
    const inputField = document.getElementById("chat-input-field");
    if (inputField) {
        inputField.value = phrase;
        document.getElementById("chat-input-form").dispatchEvent(new Event("submit"));
    }
};

// 7. VIEW RENDERING: RESUME OPTIMIZER
function initResumeAnalyzer() {
    // Reset previous inputs or bind logic
    const analyzeBtn = document.getElementById("analyze-resume-btn");
    if (analyzeBtn) {
        analyzeBtn.onclick = runResumeAnalysis;
    }
}

function runResumeAnalysis() {
    const resumeText = document.getElementById("resume-text-input").value.trim().toLowerCase();
    const jobText = document.getElementById("job-desc-input").value.trim().toLowerCase();
    const targetRole = document.getElementById("resume-target-role").value;

    if (!resumeText || !jobText) {
        alert("Please paste both your Resume text and the Target Job Description first.");
        return;
    }

    // List of target keywords based on selected path
    const keywordsMap = {
        frontend: ["react", "javascript", "html", "css", "typescript", "git", "flexbox", "grid", "responsive", "vite", "webpack", "npm", "accessibility", "api", "dom"],
        backend: ["node", "express", "sql", "postgres", "mongodb", "nosql", "database", "api", "jwt", "auth", "security", "docker", "redis", "caching", "microservices"],
        ai_engineer: ["python", "numpy", "pandas", "pytorch", "scikit-learn", "tensorflow", "nlp", "rag", "vector", "llm", "deep learning", "regression", "classification", "transformers", "embeddings"],
        mobile_dev: ["swift", "kotlin", "java", "react native", "flutter", "dart", "xcode", "gradle", "cocoapods", "testflight", "app store", "firebase", "sqlite", "keychain", "notifications"],
        data_analyst: ["sql", "excel", "tableau", "power bi", "pandas", "numpy", "matplotlib", "seaborn", "jupyter", "statistics", "hypothesis", "a/b testing", "pivot tables", "forecasting", "dashboards"]
    };

    const roleKeywords = keywordsMap[targetRole] || keywordsMap.frontend;
    const matches = [];
    const misses = [];

    roleKeywords.forEach(kw => {
        const inJob = jobText.includes(kw);
        const inResume = resumeText.includes(kw);

        if (inJob) {
            if (inResume) {
                matches.push(kw);
            } else {
                misses.push(kw);
            }
        }
    });

    // Compute scores
    const totalKeywordsInJob = matches.length + misses.length;
    const keywordScore = totalKeywordsInJob > 0 ? Math.round((matches.length / totalKeywordsInJob) * 100) : 60;
    
    // Check format structures
    let formatScore = 0;
    const checklist = [];
    
    if (resumeText.includes("experience") || resumeText.includes("work")) {
        formatScore += 25;
        checklist.push({ text: "Professional Experience Section Detected", valid: true });
    } else {
        checklist.push({ text: "Missing Work Experience section headings", valid: false });
    }

    if (resumeText.includes("education") || resumeText.includes("university") || resumeText.includes("college")) {
        formatScore += 25;
        checklist.push({ text: "Education / Certification Block Found", valid: true });
    } else {
        checklist.push({ text: "Missing Education / Degree references", valid: false });
    }

    if (resumeText.includes("skills") || resumeText.includes("technologies")) {
        formatScore += 25;
        checklist.push({ text: "Dedicated Skills Table Included", valid: true });
    } else {
        checklist.push({ text: "Missing dedicated Skills listings", valid: false });
    }

    if (resumeText.length > 500) {
        formatScore += 25;
        checklist.push({ text: "Resume Depth (character count > 500)", valid: true });
    } else {
        checklist.push({ text: "Resume content seems extremely brief", valid: false });
    }

    const overallScore = Math.round((keywordScore * 0.7) + (formatScore * 0.3));

    // Render results panel
    document.getElementById("resume-analysis-results").style.display = "block";

    // Progress ring score update
    const matchScoreText = document.getElementById("resume-match-score");
    const matchRing = document.getElementById("resume-match-ring");
    if (matchScoreText && matchRing) {
        matchScoreText.textContent = `${overallScore}%`;
        const radius = matchRing.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        matchRing.style.strokeDasharray = `${circumference}`;
        matchRing.style.strokeDashoffset = circumference - (overallScore / 100) * circumference;
    }

    // Score bars
    document.getElementById("val-align").textContent = `${keywordScore}%`;
    document.getElementById("bar-align").style.width = `${keywordScore}%`;
    document.getElementById("val-format").textContent = `${formatScore}%`;
    document.getElementById("bar-format").style.width = `${formatScore}%`;

    // Render scanned keywords tags
    const keywordsListEl = document.getElementById("scanned-keywords-list");
    let keywordHtml = "";
    matches.forEach(kw => {
        keywordHtml += `<span class="keyword-tag matched">✓ ${kw}</span>`;
    });
    misses.forEach(kw => {
        keywordHtml += `<span class="keyword-tag">✗ ${kw}</span>`;
    });
    if (matches.length === 0 && misses.length === 0) {
        keywordHtml = `<p style="font-size: 0.85rem; color: var(--text-secondary);">No industry keywords identified in job description.</p>`;
    }
    keywordsListEl.innerHTML = keywordHtml;

    // Render format checklist
    const checklistEl = document.getElementById("format-checklist-list");
    checklistEl.innerHTML = checklist.map(item => {
        const bulletIcon = item.valid ? "✓ " : "✗ ";
        const color = item.valid ? "var(--success)" : "var(--danger)";
        return `<li style="color: ${color}; font-weight: 500;">${bulletIcon}${item.text}</li>`;
    }).join("");

    // Render suggested actions
    const suggestedActionsEl = document.getElementById("suggested-actions-list");
    const actions = [];
    if (misses.length > 0) {
        actions.push(`Integrate missing keywords: <strong>${misses.slice(0, 3).join(", ")}</strong> into your projects.`);
    }
    if (formatScore < 100) {
        actions.push("Reformat your resume headers using standard titles like 'Professional Experience' and 'Skills'.");
    }
    actions.push("Quantify your impacts. Use action verbs (e.g. Optimized, Designed) combined with numeric values.");
    
    suggestedActionsEl.innerHTML = actions.map(act => `<li>${act}</li>`).join("");

    addActivity(`Completed resume scanner match score: ${overallScore}%`, "primary");
}

// 8. VIEW RENDERING: MOCK INTERVIEW SIMULATOR
let interviewQuestions = [];
let currentQuestionIndex = 0;
let interviewAnswers = [];
let recognitionInstance = null;
let isRecording = false;

function initInterviewSimulator() {
    document.getElementById("interview-setup-screen").style.display = "block";
    document.getElementById("interview-active-panel").style.display = "none";
    document.getElementById("interview-completed-screen").style.display = "none";
    document.getElementById("feedback-result-card").style.display = "none";

    const startBtn = document.getElementById("start-interview-btn");
    startBtn.onclick = startInterviewSession;

    // Voice recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            const textInput = document.getElementById("interview-response-text");
            if (textInput && finalTranscript) {
                textInput.value += (textInput.value ? ' ' : '') + finalTranscript;
            }
        };

        recognitionInstance.onerror = function(event) {
            console.error("Speech recognition error", event.error);
            stopRecordingState();
        };

        recognitionInstance.onend = function() {
            stopRecordingState();
        };
    } else {
        document.getElementById("recording-status").textContent = "Voice input unsupported by browser";
    }

    const recordBtn = document.getElementById("interview-record-btn");
    recordBtn.onclick = toggleInterviewRecording;
}

function startInterviewSession() {
    const role = document.getElementById("interview-role-select").value;
    
    // Build question list (2 technical questions + 1 behavioral)
    const techQuestions = window.MENTOR_DATA.interviews[role] || window.MENTOR_DATA.interviews.frontend;
    const behaviorals = window.MENTOR_DATA.interviews.behavioral;

    // Shuffle and pick 2 technical, 1 behavioral
    const shuffledTech = [...techQuestions].sort(() => 0.5 - Math.random());
    const shuffledBh = [...behaviorals].sort(() => 0.5 - Math.random());

    interviewQuestions = [
        shuffledTech[0],
        shuffledTech[1],
        shuffledBh[0]
    ];

    currentQuestionIndex = 0;
    interviewAnswers = [];

    document.getElementById("interview-setup-screen").style.display = "none";
    document.getElementById("interview-active-panel").style.display = "grid";
    
    loadInterviewQuestion();
}

function loadInterviewQuestion() {
    const q = interviewQuestions[currentQuestionIndex];
    if (!q) return;

    document.getElementById("interview-question-count").textContent = `Question ${currentQuestionIndex + 1} of ${interviewQuestions.length}`;
    document.getElementById("interview-question-text").textContent = q.question;
    document.getElementById("interview-response-text").value = "";
    document.getElementById("feedback-result-card").style.display = "none";

    // Setup action button clicks
    const submitBtn = document.getElementById("submit-answer-btn");
    submitBtn.style.display = "inline-flex";
    submitBtn.onclick = submitInterviewAnswer;

    const skipBtn = document.getElementById("skip-question-btn");
    skipBtn.style.display = "inline-flex";
    skipBtn.onclick = function() {
        interviewAnswers.push(0); // Score 0 for skip
        advanceInterview();
    };
}

function toggleInterviewRecording() {
    if (!recognitionInstance) {
        alert("Web Speech API is not supported by your browser. Please type your response.");
        return;
    }

    if (isRecording) {
        recognitionInstance.stop();
        stopRecordingState();
    } else {
        try {
            recognitionInstance.start();
            isRecording = true;
            document.getElementById("interview-record-btn").classList.add("recording");
            document.getElementById("interview-waveform").classList.add("active");
            document.getElementById("recording-status").textContent = "Recording... Speak clearly.";
        } catch (e) {
            console.error("Failed to start speech recognition", e);
        }
    }
}

function stopRecordingState() {
    isRecording = false;
    const recordBtn = document.getElementById("interview-record-btn");
    if (recordBtn) recordBtn.classList.remove("recording");
    const wave = document.getElementById("interview-waveform");
    if (wave) wave.classList.remove("active");
    const status = document.getElementById("recording-status");
    if (status) status.textContent = "Click red button to record";
}

function submitInterviewAnswer() {
    const responseText = document.getElementById("interview-response-text").value.trim();
    if (!responseText) {
        alert("Please speak or write an answer before submitting.");
        return;
    }

    stopRecordingState();
    if (recognitionInstance) recognitionInstance.stop();

    const currentQ = interviewQuestions[currentQuestionIndex];

    // Simple heuristic evaluator
    let score = 3; // base score for inputting
    let feedback = "";

    const len = responseText.split(" ").length;
    if (len > 80) score += 3;
    else if (len > 30) score += 2;
    else if (len > 10) score += 1;

    // Check keyword alignments
    const keyTerms = currentQ.modelAnswer.toLowerCase().split(/[ ,.;()]+/);
    let matchedKeywords = 0;
    const userWords = responseText.toLowerCase();

    // Check overlapping terms (excluding basic stop words)
    const stopWords = ["the", "a", "and", "is", "in", "to", "of", "it", "that", "this", "or", "for", "with"];
    const uniqueKeys = [...new Set(keyTerms)].filter(w => w.length > 3 && !stopWords.includes(w));
    
    uniqueKeys.forEach(term => {
        if (userWords.includes(term)) {
            matchedKeywords++;
        }
    });

    const overlapRatio = uniqueKeys.length > 0 ? (matchedKeywords / uniqueKeys.length) : 0;
    score += Math.round(overlapRatio * 4); // max 4 points for keyword coverage
    score = Math.min(10, Math.max(1, score)); // clamp between 1 and 10

    if (score >= 8) {
        feedback = "Excellent response! You demonstrated strong conceptual understanding, hit key technical terms, and structured your ideas logically.";
    } else if (score >= 5) {
        feedback = "Solid answer, but could be improved. Try adding more specific implementation details, outlining the trade-offs, or structures (like the STAR method for behaviorals).";
    } else {
        feedback = "Your response is somewhat brief. Review the model answer below and try to expand on mechanisms, lifecycle flows, or architectural implications in your next sessions.";
    }

    interviewAnswers.push(score);

    // Show feedback card
    document.getElementById("feedback-result-card").style.display = "flex";
    document.getElementById("feedback-evaluation-score").textContent = `${score} / 10`;
    document.getElementById("feedback-evaluation-desc").textContent = feedback;
    document.getElementById("feedback-model-answer").textContent = currentQ.modelAnswer;

    // Hide control buttons
    document.getElementById("submit-answer-btn").style.display = "none";
    document.getElementById("skip-question-btn").style.display = "none";

    const nextBtn = document.getElementById("next-question-btn");
    nextBtn.onclick = advanceInterview;
}

function advanceInterview() {
    currentQuestionIndex++;
    if (currentQuestionIndex < interviewQuestions.length) {
        loadInterviewQuestion();
    } else {
        // Completed
        document.getElementById("interview-active-panel").style.display = "none";
        const completedScreen = document.getElementById("interview-completed-screen");
        completedScreen.style.display = "block";

        const sum = interviewAnswers.reduce((a, b) => a + b, 0);
        const average = (sum / interviewAnswers.length).toFixed(1);

        document.getElementById("interview-final-average").textContent = average;

        appState.interviewsCompleted++;
        appState.interviewScores.push(parseFloat(average));
        
        addActivity(`Completed mock interview session: Average rating ${average}/10`, "success");
        saveState();
    }
}

document.getElementById("restart-interview-session-btn").onclick = initInterviewSimulator;

// 9. VIEW RENDERING: SKILLS ASSESSMENTS (QUIZ)
let activeQuizQuestions = [];
let currentQuizIndex = 0;
let quizScoreCount = 0;
let quizTimerInterval = null;
let quizTimerLeft = 30;

function initQuiz() {
    document.getElementById("quiz-setup-screen").style.display = "block";
    document.getElementById("quiz-active-card").style.display = "none";
    document.getElementById("quiz-results-screen").style.display = "none";

    const startBtn = document.getElementById("start-quiz-btn");
    startBtn.onclick = startQuizSession;
}

function startQuizSession() {
    const topic = document.getElementById("quiz-topic-select").value;
    const qBank = window.MENTOR_DATA.quizzes[topic] || window.MENTOR_DATA.quizzes.frontend;

    // Shuffle and pick up to 4 questions
    activeQuizQuestions = [...qBank].sort(() => 0.5 - Math.random()).slice(0, 4);
    currentQuizIndex = 0;
    quizScoreCount = 0;

    document.getElementById("quiz-setup-screen").style.display = "none";
    document.getElementById("quiz-active-card").style.display = "block";

    loadQuizQuestion();
}

function loadQuizQuestion() {
    clearInterval(quizTimerInterval);
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;

    // Render header details
    document.getElementById("quiz-question-counter").textContent = `Question ${currentQuizIndex + 1} of ${activeQuizQuestions.length}`;
    document.getElementById("quiz-question-text").textContent = q.question;
    
    // Hide explanation
    const explanationEl = document.getElementById("quiz-explanation-box");
    explanationEl.style.display = "none";
    document.getElementById("quiz-next-btn").style.display = "none";

    // Options mapping
    const optionsContainer = document.getElementById("quiz-options-container");
    optionsContainer.innerHTML = q.options.map((opt, index) => {
        return `
            <button class="quiz-option" onclick="submitQuizOption(${index})">${opt}</button>
        `;
    }).join("");

    // Start timer
    quizTimerLeft = 30;
    updateQuizTimerDisplay();
    quizTimerInterval = setInterval(() => {
        quizTimerLeft--;
        updateQuizTimerDisplay();
        if (quizTimerLeft <= 0) {
            clearInterval(quizTimerInterval);
            autoSubmitQuizTimeOut();
        }
    }, 1000);
}

function updateQuizTimerDisplay() {
    const textEl = document.getElementById("quiz-timer-text");
    const barEl = document.getElementById("quiz-timer-bar-fill");
    if (textEl && barEl) {
        textEl.textContent = `Timer: ${quizTimerLeft}s`;
        const percentage = (quizTimerLeft / 30) * 100;
        barEl.style.width = `${percentage}%`;
    }
}

function submitQuizOption(selectedIdx) {
    clearInterval(quizTimerInterval);
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;

    const optionButtons = document.querySelectorAll(".quiz-option");
    optionButtons.forEach((btn, index) => {
        btn.disabled = true; // disable all option buttons
        if (index === q.correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIdx) {
            btn.classList.add("incorrect");
        }
    });

    const isCorrect = (selectedIdx === q.correctIndex);
    if (isCorrect) {
        quizScoreCount++;
    }

    // Render explanation text
    const explanationEl = document.getElementById("quiz-explanation-box");
    explanationEl.style.display = "block";
    document.getElementById("quiz-explanation-text").textContent = q.explanation;

    // Show Next button
    const nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.style.display = "block";
    nextBtn.onclick = advanceQuiz;
}

function autoSubmitQuizTimeOut() {
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;

    const optionButtons = document.querySelectorAll(".quiz-option");
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correctIndex) {
            btn.classList.add("correct");
        }
    });

    const explanationEl = document.getElementById("quiz-explanation-box");
    explanationEl.style.display = "block";
    document.getElementById("quiz-explanation-text").textContent = "Time expired! " + q.explanation;

    const nextBtn = document.getElementById("quiz-next-btn");
    nextBtn.style.display = "block";
    nextBtn.onclick = advanceQuiz;
}

function advanceQuiz() {
    currentQuizIndex++;
    if (currentQuizIndex < activeQuizQuestions.length) {
        loadQuizQuestion();
    } else {
        // Complete
        document.getElementById("quiz-active-card").style.display = "none";
        document.getElementById("quiz-results-screen").style.display = "block";

        const scorePercent = Math.round((quizScoreCount / activeQuizQuestions.length) * 100);
        document.getElementById("quiz-final-score").textContent = `${quizScoreCount} / ${activeQuizQuestions.length}`;
        document.getElementById("quiz-final-percent").textContent = `${scorePercent}%`;

        // Update score array in state
        const topic = document.getElementById("quiz-topic-select").value;
        if (!appState.quizScores[topic]) appState.quizScores[topic] = [];
        appState.quizScores[topic].push(scorePercent);

        addActivity(`Finished technical assessment quiz: Score ${scorePercent}%`, "primary");
        saveState();
    }
}

document.getElementById("restart-quiz-btn").onclick = initQuiz;

// 10. VIEW RENDERING: KANBAN BOARD (JOB TRACKER)
function renderKanbanBoard() {
    const columns = ["wishlist", "applied", "interviewing", "offer"];
    
    columns.forEach(col => {
        const listEl = document.getElementById(`cards-${col}`);
        const countEl = document.getElementById(`count-${col}`);
        if (!listEl) return;

        const filteredJobs = appState.jobs.filter(j => j.stage === col);
        if (countEl) countEl.textContent = filteredJobs.length;

        if (filteredJobs.length === 0) {
            listEl.innerHTML = `<div style="padding: 1.5rem; text-align: center; font-size: 0.8rem; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: var(--border-radius-sm);">Drop card here</div>`;
            return;
        }

        listEl.innerHTML = filteredJobs.map(job => {
            return `
                <div class="kanban-card" draggable="true" ondragstart="dragCard(event, '${job.id}')">
                    <div class="job-role">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.4;">${job.notes || ""}</p>
                    <div class="job-meta">
                        <span class="job-date">${job.date}</span>
                        <div class="job-actions">
                            <button class="job-btn" title="Shift Left" onclick="moveCardStage('${job.id}', -1)">
                                <svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                            </button>
                            <button class="job-btn" title="Shift Right" onclick="moveCardStage('${job.id}', 1)">
                                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </button>
                            <button class="job-btn" title="Delete Card" onclick="deleteJobCard('${job.id}')" style="color: var(--danger);">
                                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    });
}

// Drag and drop HTML5 API
window.dragCard = function(event, jobId) {
    event.dataTransfer.setData("text/plain", jobId);
};

window.allowDrop = function(event) {
    event.preventDefault();
};

window.dropCard = function(event, targetColumn) {
    event.preventDefault();
    const jobId = event.dataTransfer.getData("text/plain");
    const job = appState.jobs.find(j => j.id === jobId);
    
    if (job && job.stage !== targetColumn) {
        const oldStage = job.stage;
        job.stage = targetColumn;
        
        addActivity(`Moved ${job.title} at ${job.company} to ${targetColumn.toUpperCase()}`, "primary");
        saveState();
        renderKanbanBoard();
    }
};

window.moveCardStage = function(jobId, direction) {
    const columns = ["wishlist", "applied", "interviewing", "offer"];
    const job = appState.jobs.find(j => j.id === jobId);
    if (!job) return;

    const currentIdx = columns.indexOf(job.stage);
    let targetIdx = currentIdx + direction;
    
    if (targetIdx >= 0 && targetIdx < columns.length) {
        job.stage = columns[targetIdx];
        addActivity(`Moved ${job.title} to ${job.stage.toUpperCase()}`, "primary");
        saveState();
        renderKanbanBoard();
    }
};

window.deleteJobCard = function(jobId) {
    const idx = appState.jobs.findIndex(j => j.id === jobId);
    if (idx > -1) {
        const deleted = appState.jobs.splice(idx, 1)[0];
        addActivity(`Removed job card: ${deleted.title} at ${deleted.company}`, "primary");
        saveState();
        renderKanbanBoard();
    }
};

// Modals control
window.showModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active");
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
};

document.getElementById("add-job-card-btn").onclick = function() {
    // Clear inputs first
    document.getElementById("job-title-field").value = "";
    document.getElementById("job-company-field").value = "";
    document.getElementById("job-notes-field").value = "";
    showModal("add-job-modal");
};

document.getElementById("save-job-card-btn").onclick = function() {
    const title = document.getElementById("job-title-field").value.trim();
    const company = document.getElementById("job-company-field").value.trim();
    const stage = document.getElementById("job-column-field").value;
    const notes = document.getElementById("job-notes-field").value.trim();

    if (!title || !company) {
        alert("Please enter both Job Role and Company Name.");
        return;
    }

    const newJob = {
        id: "job-" + Date.now(),
        title,
        company,
        stage,
        date: new Date().toISOString().split("T")[0],
        notes
    };

    appState.jobs.push(newJob);
    addActivity(`Added new job application: ${title} at ${company}`, "success");
    saveState();
    closeModal("add-job-modal");
    renderKanbanBoard();
};

// 11. GENERAL RESET & PROFILE SETUP
document.getElementById("reset-progress-btn").onclick = function() {
    if (confirm("Are you sure you want to reset all your learning roadmaps, resume analysis, mock interview ratings, and job tracker cards? This cannot be undone.")) {
        appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveState();
        addActivity("User data factory reset complete", "success");
        // Reload current view
        const currentActiveNav = document.querySelector(".nav-item.active");
        const activeView = currentActiveNav ? currentActiveNav.getAttribute("data-view") : "dashboard";
        switchView(activeView);
    }
};

// 12. RUN AT STARTUP
window.onload = function() {
    loadState();
    
    // Bind routing clicks
    document.querySelectorAll(".nav-item").forEach(item => {
        item.onclick = function() {
            const targetView = this.getAttribute("data-view");
            switchView(targetView);
        };
    });

    // Run first view render (Dashboard)
    switchView("dashboard");
    updateGlobalStats();
};
