// Mock Interview Simulator Module
(function() {
  let questions = [];
  let currentIdx = 0;
  let answers = [];
  
  let timerInterval = null;
  let elapsedSeconds = 0;

  // Initialize module
  window.initInterview = function() {
    const startBtn = document.getElementById("startInterviewBtn");
    const quitBtn = document.getElementById("quitInterviewBtn");
    const submitBtn = document.getElementById("submitAnswerBtn");
    const finishBtn = document.getElementById("finishInterviewBtn");
    const textarea = document.getElementById("interviewResponse");

    if (startBtn) startBtn.addEventListener("click", startSession);
    if (quitBtn) quitBtn.addEventListener("click", quitSession);
    if (submitBtn) submitBtn.addEventListener("click", handleSubmitAnswer);
    if (finishBtn) finishBtn.addEventListener("click", finishSession);
    
    if (textarea) {
      const charCount = document.getElementById("charCount");
      textarea.addEventListener("input", () => {
        const len = textarea.value.trim().length;
        if (charCount) {
          charCount.textContent = `${len} character${len !== 1 ? 's' : ''} (minimum 20 recommended)`;
        }
      });
    }

    window.refreshInterview();
  };

  // Switch display state depending on whether career selected
  window.refreshInterview = function() {
    const warning = document.getElementById("interviewWarning");
    const workspace = document.getElementById("interviewWorkspace");
    const career = window.app.user.career;

    if (!career) {
      if (warning) warning.classList.add("active");
      if (workspace) workspace.style.display = "none";
    } else {
      if (warning) warning.classList.remove("active");
      if (workspace) workspace.style.display = "block";
      
      resetInterviewPanels();
    }
  };

  function resetInterviewPanels() {
    document.getElementById("interviewSetupPanel").style.display = "block";
    document.getElementById("interviewQaPanel").style.display = "none";
    document.getElementById("interviewScorecardPanel").style.display = "none";
    clearInterval(timerInterval);
  }

  function startSession() {
    const career = window.app.user.career;
    
    // Load question sets
    const bank = MENTOR_DATA.interviewQuestions[career] || [];
    if (bank.length === 0) {
      alert("No interview questions found for this path.");
      return;
    }

    // Clone and use questions
    questions = [...bank];
    currentIdx = 0;
    answers = [];
    elapsedSeconds = 0;

    // Timer setup
    const timerEl = document.getElementById("interviewTimer");
    if (timerEl) timerEl.textContent = "Time: 00:00";
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
      const secs = String(elapsedSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = `Time: ${mins}:${secs}`;
    }, 1000);

    // Swap panels
    document.getElementById("interviewSetupPanel").style.display = "none";
    document.getElementById("interviewQaPanel").style.display = "block";
    
    renderQuestion();
  }

  function renderQuestion() {
    const progressEl = document.getElementById("interviewProgressText");
    const questionEl = document.getElementById("interviewQuestionText");
    const responseArea = document.getElementById("interviewResponse");
    const charCount = document.getElementById("charCount");

    if (progressEl) progressEl.textContent = `Question ${currentIdx + 1} of ${questions.length}`;
    if (questionEl) questionEl.textContent = questions[currentIdx].question;
    
    if (responseArea) {
      responseArea.value = "";
      responseArea.focus();
    }
    if (charCount) charCount.textContent = "0 characters (minimum 20 recommended)";
  }

  function handleSubmitAnswer() {
    const responseArea = document.getElementById("interviewResponse");
    if (!responseArea) return;

    const ans = responseArea.value.trim();
    if (ans.length < 10) {
      alert("Please write a more detailed response to this question (minimum 10 characters).");
      return;
    }

    // Save answer
    answers.push(ans);

    if (currentIdx < questions.length - 1) {
      currentIdx++;
      renderQuestion();
    } else {
      // Completed interview!
      clearInterval(timerInterval);
      evaluateSession();
    }
  }

  async function evaluateSession() {
    const career = window.app.user.career;
    
    // Show loading text in dashboard status briefly
    document.getElementById("interviewQaPanel").style.display = "none";
    const scorecardPanel = document.getElementById("interviewScorecardPanel");
    scorecardPanel.style.display = "block";
    
    const breakdownBox = document.getElementById("scorecardQBreakdown");
    if (breakdownBox) breakdownBox.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">🤖 AI Mentor is analyzing your responses against hiring standards...</p>`;

    let score = 75;
    let grade = "B";
    let strengths = "";
    let improvements = "";
    let feedbackList = [];

    try {
      if (window.app.user.apiKey) {
        // Run live Gemini evaluation
        let evalPrompt = `Evaluate the mock interview answers for a candidate applying for the role of ${MENTOR_DATA.careers[career].title}.
Below are the questions and candidate's answers:
`;
        questions.forEach((q, idx) => {
          evalPrompt += `\nQuestion ${idx+1}: ${q.question}\nCandidate Answer: ${answers[idx] || "N/A"}\n`;
        });

        evalPrompt += `\nPerform a professional analysis and respond EXACTLY in JSON format with key fields:
{
  "score": 0 to 100 integer,
  "grade": "A+" to "F" string,
  "strengths": "summary of strengths",
  "improvements": "summary of improvements",
  "breakdown": [
    {
      "question": "question text",
      "candidateAnswer": "candidate text",
      "idealAnswer": "what a senior engineer would say",
      "feedback": "constructive point"
    }
  ]
}
Return ONLY valid JSON and nothing else.`;

        const reply = await window.app.askGemini(evalPrompt);
        // Clean markdown JSON wrapper blocks if Gemini includes them
        const cleanJson = reply.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        
        score = parsed.score || 70;
        grade = parsed.grade || "B-";
        strengths = parsed.strengths || "Good basic understanding.";
        improvements = parsed.improvements || "Provide more technical terms.";
        feedbackList = parsed.breakdown || [];
      } else {
        // Run simulated evaluator
        const analysis = compileSimulatedEvaluation(career, questions, answers);
        score = analysis.score;
        grade = analysis.grade;
        strengths = analysis.strengths;
        improvements = analysis.improvements;
        feedbackList = analysis.breakdown;
      }

      // Render evaluation scorecard
      renderScorecard(score, grade, strengths, improvements, feedbackList);

      // Save to global user profile
      window.app.user.lastInterviewScore = score;
      window.app.completeQuest("quest-3", 100); // Complete mock quest!
      window.app.addXp(120); // placement quiz completion reward
      window.app.saveState();

    } catch (e) {
      console.error(e);
      // Fallback in case of API fails
      const analysis = compileSimulatedEvaluation(career, questions, answers);
      renderScorecard(analysis.score, analysis.grade, "Simulated fallback evaluation: " + analysis.strengths, analysis.improvements, analysis.breakdown);
    }
  }

  function compileSimulatedEvaluation(careerKey, qList, ansList) {
    let totalScore = 70;
    
    // Evaluate response lengths and basic keyword matching
    ansList.forEach(ans => {
      const len = ans.length;
      if (len > 150) totalScore += 5; // Reward descriptive answers
      else if (len < 30) totalScore -= 5; // Deduct extremely short answers
      
      // Keywords matches
      const terms = ["design", "state", "database", "model", "index", "api", "prompt", "token", "optimization", "user"];
      terms.forEach(t => {
        if (ans.toLowerCase().includes(t)) totalScore += 1;
      });
    });

    totalScore = Math.min(98, Math.max(45, totalScore));
    
    let grade = "B";
    if (totalScore >= 90) grade = "A";
    else if (totalScore >= 80) grade = "B+";
    else if (totalScore >= 70) grade = "B";
    else if (totalScore >= 60) grade = "C";
    else grade = "D";

    const strengthsMap = {
      frontend: "Structure and DOM hooks covered correctly. Showed good intuition for reactive component flow.",
      backend: "Understands API boundaries, security headers routing, and structured database models well.",
      ai: "Clear understanding of embeddings vectors and basic neural network training cycles.",
      pm: "Exhibited strong user empathy, clear feature scoping, and metrics definition frameworks."
    };

    const improvementsMap = {
      frontend: "Expand details on streaming AI token renders, debouncing text triggers, and accessibility tags.",
      backend: "Detail scaling strategies like database connection pooling, indexing filters, and cache eviction.",
      ai: "Integrate vector index similarity tuning details and RAG pipeline scaling considerations.",
      pm: "Provide more quantitative cost cap estimation models and prompt vulnerability safeguards."
    };

    const idealAnswers = {
      frontend: [
        "State represents local component memory that triggers re-renders on change, whereas props are configuration read-only variables passed down by parent files.",
        "React uses keys to identify which items have changed, been added, or been removed. This allows it to perform efficient diffs in Virtual DOM rather than re-rendering the whole tree.",
        "A typewriter effect is built by managing state containing characters and appending them incrementally via an asynchronous interval function checking buffer queues.",
        "Flexbox handles 1-dimensional layouts (either columns or rows), while Grid manages 2-dimensional grids (both columns and rows simultaneously)."
      ],
      backend: [
        "A database index is a data structure (B-tree) that speeds up data retrieval operations at the cost of additional write time and storage space.",
        "REST is structured around fixed resource URIs, whereas GraphQL allows clients to define the exact shape of response fields in a single query.",
        "Security measures include setting up client rate-limiting middlewares (e.g. rate-limit npm), input payload schemas validation, and strict token auth checks.",
        "Vector databases index floating-point numbers represent semantic embeddings, allowing mathematical proximity searches (cosine distance) rather than keyword queries."
      ],
      ai: [
        "Overfitting is when a model learns training noise. Prevent it via: 1) Adding regularization (L1/L2), 2) Dropout layers, and 3) Expanding dataset samples.",
        "Fine-tuning changes model weights, while RAG inserts custom context into the LLM prompt. RAG is better for live, dynamic external documents.",
        "The self-attention mechanism computes dynamic scoring weights showing how much each word in a prompt relates to every other word in that sentence.",
        "Temperature controls randomness. Higher values (>0.8) increase creativity, while lower values (<0.2) enforce deterministic responses."
      ],
      pm: [
        "Use ICE (Impact, Confidence, Ease) or RICE framework. Balance business value against developer engineering hours to select MVP candidates.",
        "Immediate response: 1) Enforce prompt character limits, 2) Cache common prompts, and 3) Evaluate cheaper models like Gemini 2.5 Flash.",
        "An MVP is the smallest product bundle to test core hypotheses. For resume scanners, it's a single input box yielding a checklist score.",
        "Collaborate with engineering to negotiate scope. Can we deliver a simplified version in Phase 1, or extend the deadline for phase 2?"
      ]
    };

    // Construct breakdown list
    const breakdown = qList.map((q, idx) => {
      const ideal = idealAnswers[careerKey]?.[idx] || "Provide structured details.";
      return {
        question: q.question,
        candidateAnswer: ansList[idx] || "N/A",
        idealAnswer: ideal,
        feedback: "Your response is acceptable but could include more industry terms. Compare with the model solution."
      };
    });

    return {
      score: totalScore,
      grade: grade,
      strengths: strengthsMap[careerKey] || "Foundational concepts understood.",
      improvements: improvementsMap[careerKey] || "Elaborate more with concrete code designs.",
      breakdown: breakdown
    };
  }

  function renderScorecard(score, grade, strengths, improvements, breakdown) {
    const scoreVal = document.getElementById("scorecardPercentage");
    const gradeTag = document.getElementById("scorecardGrade");
    const strengthsEl = document.getElementById("scorecardStrengths");
    const improvementsEl = document.getElementById("scorecardImprovements");
    const listEl = document.getElementById("scorecardQBreakdown");
    const career = window.app.user.career;

    // Update charts
    if (scoreVal) scoreVal.textContent = `${score}%`;
    if (gradeTag) {
      gradeTag.textContent = `Grade: ${grade}`;
      // Color coding
      if (score >= 85) gradeTag.className = "score-grade-tag text-emerald";
      else if (score >= 70) gradeTag.className = "score-grade-tag text-indigo";
      else gradeTag.className = "score-grade-tag text-amber";
    }

    // Update conic gradient circle
    const circle = document.querySelector(".interview-scorecard .score-circle-outer");
    if (circle) {
      circle.style.background = `conic-gradient(var(--accent-indigo) 0% ${score}%, rgba(255, 255, 255, 0.05) ${score}% 100%)`;
    }

    if (strengthsEl) strengthsEl.textContent = strengths;
    if (improvementsEl) improvementsEl.textContent = improvements;

    // Render questions comparison breakdown
    if (listEl) {
      listEl.innerHTML = "";
      breakdown.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "breakdown-card";
        card.innerHTML = `
          <h4 class="breakdown-q-title">${index + 1}. ${item.question}</h4>
          <div class="breakdown-answers">
            <div class="answer-comparison user-ans">
              <span class="ans-lbl" style="color: var(--accent-indigo);">Your Response</span>
              <p>${item.candidateAnswer}</p>
            </div>
            <div class="answer-comparison ideal-ans">
              <span class="ans-lbl" style="color: var(--accent-emerald);">Model Answer</span>
              <p>${item.idealAnswer}</p>
            </div>
            <div class="answer-comparison" style="background-color: rgba(255,255,255,0.02); margin-top: 4px;">
              <span class="ans-lbl" style="color: var(--text-muted);">AI Feedback Tip</span>
              <p style="font-style: italic; color: var(--text-muted);">${item.feedback}</p>
            </div>
          </div>
        `;
        listEl.appendChild(card);
      });
    }

    // Role text
    const roleEl = document.getElementById("scorecardRole");
    if (roleEl) {
      roleEl.textContent = MENTOR_DATA.careers[career].title;
    }
  }

  function quitSession() {
    if (confirm("Are you sure you want to quit this interview session? Your progress will not be saved.")) {
      resetInterviewPanels();
    }
  }

  function finishSession() {
    resetInterviewPanels();
    window.app.switchTab("dashboard");
  }
})();
