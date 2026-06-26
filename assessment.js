// Career Diagnostic Assessment Module
(function() {
  let currentQuestion = 0;
  let selectedOption = null;
  let userAnswers = []; // Stores the indices of chosen options
  let scores = { frontend: 0, backend: 0, ai: 0, pm: 0 };
  
  let quizTimerInterval = null;
  let quizSeconds = 0;

  // Initialize module
  window.initAssessment = function() {
    const startBtn = document.getElementById("startAssessmentBtn");
    const prevBtn = document.getElementById("prevQuestionBtn");
    const nextBtn = document.getElementById("nextQuestionBtn");
    const retakeBtn = document.getElementById("retakeAssessmentBtn");
    const confirmBtn = document.getElementById("confirmCareerBtn");

    if (startBtn) startBtn.addEventListener("click", startQuiz);
    if (prevBtn) prevBtn.addEventListener("click", handlePrev);
    if (nextBtn) nextBtn.addEventListener("click", handleNext);
    if (retakeBtn) retakeBtn.addEventListener("click", retakeQuiz);
    if (confirmBtn) confirmBtn.addEventListener("click", confirmCareerPath);

    // Initial check of state
    checkExistingResults();
  };

  function checkExistingResults() {
    // If user has already selected a career path, show results screen directly
    if (window.app.user.career) {
      showSection("assessmentResults");
      calculateAndShowResults(true); // skip computation from current quiz, read from saved career
    }
  }

  function showSection(sectionId) {
    const sections = ["assessmentIntro", "assessmentQuiz", "assessmentResults"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === sectionId) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
  }

  function startQuiz() {
    currentQuestion = 0;
    selectedOption = null;
    userAnswers = [];
    scores = { frontend: 0, backend: 0, ai: 0, pm: 0 };
    
    // Timer
    quizSeconds = 0;
    const timerEl = document.getElementById("quizTimer");
    if (timerEl) timerEl.textContent = "00:00";
    
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
      quizSeconds++;
      const mins = String(Math.floor(quizSeconds / 60)).padStart(2, '0');
      const secs = String(quizSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);

    // Dot indicators
    setupDotNav();

    showSection("assessmentQuiz");
    renderQuestion();
  }

  function setupDotNav() {
    const dotNav = document.getElementById("quizDotNav");
    if (dotNav) {
      dotNav.innerHTML = "";
      const totalQ = MENTOR_DATA.diagnosticQuestions.length;
      for (let i = 0; i < totalQ; i++) {
        const dot = document.createElement("span");
        dot.className = "dot-indicator";
        if (i === 0) dot.className = "dot-indicator active";
        dotNav.appendChild(dot);
      }
    }
  }

  function updateDotNav() {
    const dots = document.querySelectorAll("#quizDotNav .dot-indicator");
    dots.forEach((dot, index) => {
      if (index === currentQuestion) {
        dot.className = "dot-indicator active";
      } else if (index < currentQuestion) {
        dot.className = "dot-indicator completed";
      } else {
        dot.className = "dot-indicator";
      }
    });
  }

  function renderQuestion() {
    const questions = MENTOR_DATA.diagnosticQuestions;
    const q = questions[currentQuestion];
    
    // Update question prompt
    const numText = document.getElementById("questionNumText");
    const qText = document.getElementById("questionText");
    const optionsBox = document.getElementById("optionsContainer");

    if (numText) numText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    if (qText) qText.textContent = q.text;
    
    if (optionsBox) {
      optionsBox.innerHTML = "";
      q.options.forEach((opt, idx) => {
        const card = document.createElement("div");
        card.className = "option-card";
        
        // Restore selection if back-tracked
        if (userAnswers[currentQuestion] === idx) {
          card.classList.add("selected");
          selectedOption = idx;
        }

        const letterMap = ["A", "B", "C", "D"];
        card.innerHTML = `
          <span class="option-letter">${letterMap[idx]}</span>
          <span class="option-text">${opt.text}</span>
        `;

        card.addEventListener("click", () => {
          document.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          selectedOption = idx;
          
          // Auto advance to next after brief highlight
          setTimeout(() => {
            handleNext();
          }, 250);
        });

        optionsBox.appendChild(card);
      });
    }

    // Toggle Back button
    const prevBtn = document.getElementById("prevQuestionBtn");
    if (prevBtn) {
      prevBtn.disabled = currentQuestion === 0;
    }

    // Update dot colors
    updateDotNav();
    
    // Update progress bar
    const progressFill = document.getElementById("quizProgressFill");
    if (progressFill) {
      const pct = ((currentQuestion) / questions.length) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  function handleNext() {
    if (selectedOption === null) {
      alert("Please select an option to proceed.");
      return;
    }

    // Save user answer index
    userAnswers[currentQuestion] = selectedOption;
    
    const questions = MENTOR_DATA.diagnosticQuestions;
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      selectedOption = userAnswers[currentQuestion] !== undefined ? userAnswers[currentQuestion] : null;
      renderQuestion();
    } else {
      // Completed last question
      clearInterval(quizTimerInterval);
      showSection("assessmentResults");
      calculateAndShowResults(false);
    }
  }

  function handlePrev() {
    if (currentQuestion > 0) {
      currentQuestion--;
      selectedOption = userAnswers[currentQuestion];
      renderQuestion();
    }
  }

  function calculateAndShowResults(useSavedState = false) {
    let topCareerKey = "frontend";

    if (useSavedState && window.app.user.career) {
      topCareerKey = window.app.user.career;
      // Pre-populate simulated matching percentage
      scores = { frontend: 30, backend: 30, ai: 30, pm: 30 };
      scores[topCareerKey] = 85; // boost active path
    } else {
      // Aggregate scores based on selection
      scores = { frontend: 0, backend: 0, ai: 0, pm: 0 };
      const questions = MENTOR_DATA.diagnosticQuestions;
      
      userAnswers.forEach((ansIndex, qIndex) => {
        const points = questions[qIndex].options[ansIndex].points;
        for (const role in points) {
          scores[role] += points[role];
        }
      });

      // Find top match
      let maxScore = -1;
      for (const role in scores) {
        if (scores[role] > maxScore) {
          maxScore = scores[role];
          topCareerKey = role;
        }
      }
    }

    // Render Career percentages
    const breakdownBox = document.getElementById("resultsBreakdown");
    if (breakdownBox) {
      breakdownBox.innerHTML = "";
      
      // Maximum potential points of single role is 40 points
      const maxPossiblePoints = 40;
      
      for (const role in scores) {
        const careerData = MENTOR_DATA.careers[role];
        const points = scores[role];
        // Calculate dynamic matching rate
        let pct = useSavedState ? points : Math.min(100, Math.round((points / maxPossiblePoints) * 100));
        
        // Ensure top match has a healthy visual percentage display
        if (!useSavedState && role === topCareerKey && pct < 65) {
          pct = 75; // aesthetic baseline for highest match
        }

        const barItem = document.createElement("div");
        barItem.className = "fit-bar-item";
        barItem.innerHTML = `
          <div class="fit-bar-info">
            <span>${careerData.title}</span>
            <span>${pct}% Compatibility</span>
          </div>
          <div class="fit-bar-fill-bg">
            <div class="fit-bar-fill" style="width: 0%; background: ${getGradientForRole(role)}"></div>
          </div>
        `;
        breakdownBox.appendChild(barItem);

        // Animate fill bar loading
        setTimeout(() => {
          const fill = barItem.querySelector(".fit-bar-fill");
          if (fill) fill.style.width = `${pct}%`;
        }, 100);
      }
    }

    // Render detailed match recommendations
    const detailsBox = document.getElementById("topMatchDetails");
    const topCareer = MENTOR_DATA.careers[topCareerKey];
    
    if (detailsBox && topCareer) {
      detailsBox.innerHTML = `
        <div class="match-header">
          <span class="match-avatar">${topCareer.avatar}</span>
          <div class="match-title-wrap">
            <span class="match-subtitle">Your Primary Recommendation</span>
            <h3>${topCareer.title}</h3>
          </div>
        </div>
        <p class="match-desc">${topCareer.description}</p>
        <span class="match-salary">Avg Entry Salary: ${topCareer.salary}</span>
        
        <div class="ai-focus-box">
          <h5>⚡ Future-Ready AI Focus</h5>
          <p>${topCareer.aiFocus}</p>
        </div>

        <div class="ai-focus-box" style="border-top: none; padding-top: 10px;">
          <h5>🔧 Core & AI Tooling Needed</h5>
          <div class="skills-list-wrap" style="margin-top: 8px;">
            ${topCareer.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>
      `;

      // Save recommendation context on window object to fetch when path active confirmed
      window.recommendedCareer = topCareerKey;
    }
  }

  function getGradientForRole(role) {
    const gradients = {
      frontend: "linear-gradient(90deg, #3b82f6, #6366f1)",
      backend: "linear-gradient(90deg, #ec4899, #7c3aed)",
      ai: "linear-gradient(90deg, #06b6d4, #10b981)",
      pm: "linear-gradient(90deg, #f59e0b, #eab308)"
    };
    return gradients[role] || "linear-gradient(90deg, #7c3aed, #6366f1)";
  }

  function confirmCareerPath() {
    const career = window.recommendedCareer || "frontend";
    
    // Update app profile state
    window.app.user.career = career;
    window.app.completeQuest("quest-1", 150); // Complete diagnostic quest!
    window.app.addXp(50); // extra path activation bonus
    window.app.saveState();

    // Trigger other modules components resets
    if (typeof window.refreshRoadmap === 'function') window.refreshRoadmap();
    if (typeof window.refreshChat === 'function') window.refreshChat();
    if (typeof window.refreshInterview === 'function') window.refreshInterview();
    if (typeof window.refreshResume === 'function') window.refreshResume();

    alert(`🎉 Path Activated: ${MENTOR_DATA.careers[career].title}! Your personalized AI-focused roadmap is now unlocked.`);
    
    // Redirect to dashboard
    window.app.switchTab("dashboard");
  }

  function retakeQuiz() {
    if (confirm("Are you sure you want to retake the career diagnosis? Your current career path recommendation will be updated.")) {
      startQuiz();
    }
  }
})();
