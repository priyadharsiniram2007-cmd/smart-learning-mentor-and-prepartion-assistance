// Career Roadmap Module
(function() {
  
  // Initialize module
  window.initRoadmap = function() {
    // Handle change path button inside workspace
    const changeBtn = document.getElementById("changeCareerBtn");
    if (changeBtn) {
      changeBtn.addEventListener("click", resetCareerPathSelection);
    }

    // Manual select buttons in warning panel
    document.querySelectorAll(".career-select-card").forEach(card => {
      card.addEventListener("click", () => {
        const career = card.getAttribute("data-career");
        activateCareerPath(career);
      });
    });

    window.refreshRoadmap();
  };

  // Switch display state depending on whether career selected
  window.refreshRoadmap = function() {
    const warningBanner = document.getElementById("roadmapWarning");
    const workspace = document.getElementById("roadmapWorkspace");
    const career = window.app.user.career;

    if (!career) {
      if (warningBanner) warningBanner.classList.add("active");
      if (workspace) workspace.style.display = "none";
    } else {
      if (warningBanner) warningBanner.classList.remove("active");
      if (workspace) workspace.style.display = "block";
      
      renderRoadmapDetails(career);
    }
  };

  // Render current milestones flow
  function renderRoadmapDetails(careerKey) {
    const career = MENTOR_DATA.careers[careerKey];
    const milestones = MENTOR_DATA.roadmaps[careerKey];
    
    // Update headers text
    const avatarEl = document.getElementById("roadmapAvatarVal");
    const titleEl = document.getElementById("roadmapTitleVal");
    const descEl = document.getElementById("roadmapDescVal");
    
    if (avatarEl) avatarEl.textContent = career.avatar;
    if (titleEl) titleEl.textContent = `${career.title} Roadmap`;
    if (descEl) descEl.textContent = career.description;

    // Calculate overall tasks checklist stats
    let totalTasks = 0;
    let completedTasks = 0;

    milestones.forEach(m => {
      m.tasks.forEach(t => {
        totalTasks++;
        if (window.app.user.completedTasks[t.id]) {
          completedTasks++;
        }
      });
    });

    // Update progress numbers & bars
    const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const progressPctText = document.getElementById("roadmapProgressPct");
    const progressBar = document.getElementById("roadmapProgressBar");

    if (progressPctText) progressPctText.textContent = `${progressPct}% Complete (${completedTasks} / ${totalTasks} modules)`;
    if (progressBar) progressBar.style.width = `${progressPct}%`;

    // Cache milestone stats for dashboard view
    window.app.user.totalRoadmapTasks = totalTasks;
    window.app.user.completedRoadmapTasks = completedTasks;

    // Render milestone list flow
    const flowContainer = document.getElementById("roadmapFlow");
    if (flowContainer) {
      flowContainer.innerHTML = "";

      milestones.forEach((milestone, mIndex) => {
        const milestoneDiv = document.createElement("div");
        milestoneDiv.className = "roadmap-milestone card";
        
        // Compute milestone state (complete, active, or upcoming)
        let mTotal = milestone.tasks.length;
        let mComplete = 0;
        milestone.tasks.forEach(t => {
          if (window.app.user.completedTasks[t.id]) mComplete++;
        });

        const isCompleted = mComplete === mTotal;
        // Active if not completed, and either it's phase 1 or the previous phase is completed
        const isPreviousCompleted = mIndex === 0 || isPhaseCompleted(milestones[mIndex - 1]);
        const isActive = !isCompleted && isPreviousCompleted;

        if (isCompleted) milestoneDiv.classList.add("completed");
        if (isActive) milestoneDiv.classList.add("active");

        // SVG indicator or Checkmark
        const nodeIndicator = isCompleted ? "✓" : (mIndex + 1);

        // Subtasks HTML list
        const tasksHtml = milestone.tasks.map(task => {
          const isChecked = window.app.user.completedTasks[task.id] === true;
          return `
            <div class="milestone-task-item">
              <input type="checkbox" id="chk-${task.id}" data-task-id="${task.id}" data-xp="${task.xp}" ${isChecked ? 'checked' : ''}>
              <div class="task-label-wrap">
                <label for="chk-${task.id}" class="task-title">${task.text}</label>
                <span class="task-xp-val">+${task.xp} XP</span>
              </div>
            </div>
          `;
        }).join('');

        milestoneDiv.innerHTML = `
          <div class="milestone-node">${nodeIndicator}</div>
          <div class="milestone-card">
            <details ${mIndex === 0 || isActive ? 'open' : ''} class="milestone-summary-details">
              <summary class="milestone-summary">
                <h3>${milestone.title}</h3>
                <p class="milestone-desc">${milestone.desc} (${mComplete}/${mTotal} tasks)</p>
              </summary>
              <div class="milestone-details-wrap">
                ${tasksHtml}
              </div>
            </details>
          </div>
        `;

        // Event listeners for checkbox updates
        milestoneDiv.querySelectorAll("input[type='checkbox']").forEach(chk => {
          chk.addEventListener("change", (e) => {
            const taskId = e.target.getAttribute("data-task-id");
            const xpVal = parseInt(e.target.getAttribute("data-xp"));
            const checked = e.target.checked;

            if (checked) {
              window.app.user.completedTasks[taskId] = true;
              window.app.addXp(xpVal); // Reward XP
            } else {
              delete window.app.user.completedTasks[taskId];
              window.app.addXp(-xpVal); // Deduct XP if unchecked to keep balance
            }
            window.app.saveState();
            
            // Re-render
            renderRoadmapDetails(careerKey);
            
            // Check quest progress
            checkRoadmapQuestCompletion();
          });
        });

        flowContainer.appendChild(milestoneDiv);
      });
    }
  }

  function isPhaseCompleted(milestone) {
    return milestone.tasks.every(t => window.app.user.completedTasks[t.id] === true);
  }

  function checkRoadmapQuestCompletion() {
    // If they have completed at least 2 roadmap tasks, mark dashboard challenges if applicable
    let totalCompleted = 0;
    for (const key in window.app.user.completedTasks) {
      if (window.app.user.completedTasks[key]) totalCompleted++;
    }
  }

  // De-activate path to choose again
  function resetCareerPathSelection() {
    if (confirm("Are you sure you want to change your career path? This will NOT delete your completed task checklist data, but will reset your active focus path.")) {
      window.app.user.career = null;
      window.app.saveState();
      
      // Refresh views
      window.refreshRoadmap();
      if (typeof window.refreshDashboard === 'function') window.refreshDashboard();
      if (typeof window.refreshChat === 'function') window.refreshChat();
      if (typeof window.refreshInterview === 'function') window.refreshInterview();
      if (typeof window.refreshResume === 'function') window.refreshResume();
    }
  }

  function activateCareerPath(careerKey) {
    window.app.user.career = careerKey;
    window.app.saveState();
    
    // Refresh views
    window.refreshRoadmap();
    if (typeof window.refreshDashboard === 'function') window.refreshDashboard();
    if (typeof window.refreshChat === 'function') window.refreshChat();
    if (typeof window.refreshInterview === 'function') window.refreshInterview();
    if (typeof window.refreshResume === 'function') window.refreshResume();
  }
})();
