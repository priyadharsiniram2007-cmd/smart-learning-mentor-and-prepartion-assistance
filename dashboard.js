// Dashboard Rendering Module
(function() {
  
  // Initialize module
  window.initDashboard = function() {
    // Action button inside hero card
    const heroActionBtn = document.getElementById("heroActionBtn");
    if (heroActionBtn) {
      heroActionBtn.addEventListener("click", handleHeroAction);
    }

    window.refreshDashboard();
  };

  // Sync state values with visual blocks
  window.refreshDashboard = function() {
    const user = window.app.user;

    // 1. Welcome text & Hero Button
    const welcomeName = document.getElementById("welcomeName");
    const welcomeMsg = document.getElementById("welcomeMessage");
    const heroActionBtn = document.getElementById("heroActionBtn");

    if (welcomeName) welcomeName.textContent = user.name;

    if (user.career) {
      const careerTitle = MENTOR_DATA.careers[user.career]?.title || "Specialist";
      if (welcomeMsg) welcomeMsg.textContent = `Your active track is: ${careerTitle}. Click below to resume your learning and AI skillset training.`;
      if (heroActionBtn) {
        heroActionBtn.textContent = "Continue Learning Roadmap";
        heroActionBtn.className = "primary-btn dashboard-action-btn";
      }
    } else {
      if (welcomeMsg) welcomeMsg.textContent = "Ready to clear your doubts and build a custom career path? Start by running the Career Diagnosis quiz!";
      if (heroActionBtn) {
        heroActionBtn.textContent = "Take Career Diagnosis";
        heroActionBtn.className = "primary-btn dashboard-action-btn";
      }
    }

    // 2. Numerical counter cards
    const timeEl = document.getElementById("statsTime");
    const milestonesEl = document.getElementById("statsMilestones");
    const atsEl = document.getElementById("statsAts");
    const interviewEl = document.getElementById("statsInterview");

    if (timeEl) timeEl.textContent = `${user.studyMinutes} mins`;
    
    if (milestonesEl) {
      const total = user.totalRoadmapTasks || 0;
      const completed = user.completedRoadmapTasks || 0;
      milestonesEl.textContent = total > 0 ? `${completed} / ${total} tasks` : "0 / --";
    }

    if (atsEl) atsEl.textContent = user.resumeAtsScore !== null ? `${user.resumeAtsScore}%` : "N/A";
    if (interviewEl) interviewEl.textContent = user.lastInterviewScore !== null ? `${user.lastInterviewScore}%` : "N/A";

    // 3. Quest completion cards
    updateQuestItem("quest-1", user.completedQuests.quest1);
    updateQuestItem("quest-2", user.completedQuests.quest2);
    updateQuestItem("quest-3", user.completedQuests.quest3);

    // 4. Recommended Active Path Card
    renderActiveTrackCard(user.career);
  };

  function handleHeroAction() {
    const user = window.app.user;
    if (user.career) {
      window.app.switchTab("roadmap");
    } else {
      window.app.switchTab("assessment");
    }
  }

  function updateQuestItem(questId, isCompleted) {
    const questEl = document.getElementById(questId);
    if (questEl) {
      if (isCompleted) {
        questEl.classList.add("completed");
      } else {
        questEl.classList.remove("completed");
      }
    }
  }

  function renderActiveTrackCard(careerKey) {
    const trackCol = document.getElementById("dashboardActiveTrack");
    if (!trackCol) return;

    if (!careerKey) {
      // Show default empty path instructions
      trackCol.innerHTML = `
        <h3 class="card-title">My Career Path</h3>
        <div class="no-path-state">
          <p>You haven't activated a career path focus yet. Start the test or manually pick a roadmap to unlock mentoring.</p>
          <button class="secondary-btn btn-sm" onclick="app.switchTab('assessment')">Start Quiz Now</button>
        </div>
      `;
      return;
    }

    const career = MENTOR_DATA.careers[careerKey];
    const total = window.app.user.totalRoadmapTasks || 0;
    const completed = window.app.user.completedRoadmapTasks || 0;
    const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // AI tips tailored to their career
    const aiTips = {
      frontend: "💡 **Pro-Tip:** Prompt **v0.dev** to draft interactive components in TailwindCSS, then load them in Cursor to integrate them with React state variables.",
      backend: "💡 **Pro-Tip:** Generate vector text embeddings using **Gemini API** and store them in **Pinecone** to build semantic data searches easily.",
      ai: "💡 **Pro-Tip:** Implement a **RAG pipeline** to load documents instead of fine-tuning models. It keeps answers updated and cuts API compute costs.",
      pm: "💡 **Pro-Tip:** Prompt **ChatGPT** to run user edge-case analysis. It identifies holes in your PRDs and lists technical risks ahead of developer sprints."
    };

    trackCol.innerHTML = `
      <h3 class="card-title">My Career Path</h3>
      <div class="active-path-summary">
        <div class="path-badge-lg">
          <span class="path-avatar-lg">${career.avatar}</span>
          <div class="path-meta">
            <h4>${career.title}</h4>
            <p>Recommended starting salary: ${career.salary}</p>
          </div>
        </div>

        <div class="progress-container">
          <div class="progress-labels">
            <span>Roadmap Progress</span>
            <span>${progressPct}% (${completed}/${total} tasks)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <div class="dashboard-path-skills">
          <p>Key Skills Mastered:</p>
          <div class="skills-list-wrap">
            ${career.skills.map((s, idx) => {
              // Mark the first few as green/mastered based on roadmap progress
              const mastered = idx < Math.ceil(completed / 2);
              const borderStyle = mastered ? 'border-color: rgba(16, 185, 129, 0.4); color: var(--accent-emerald); background-color: rgba(16,185,129,0.05);' : '';
              return `<span class="skill-tag" style="${borderStyle}">${s}</span>`;
            }).join('')}
          </div>
        </div>

        <div class="daily-ai-skill-tip">
          ${aiTips[careerKey] || "Practice programming concepts daily."}
        </div>

        <button class="primary-btn btn-md w-full" onclick="app.switchTab('roadmap')">Open Full Roadmap</button>
      </div>
    `;
  }
})();
