// Resume & Portfolio ATS Optimizer Module
(function() {
  
  // Initialize module
  window.initResume = function() {
    const analyzeBtn = document.getElementById("analyzeResumeBtn");
    if (analyzeBtn) {
      analyzeBtn.addEventListener("click", handleAnalyze);
    }

    window.refreshResume();
  };

  // Switch display state depending on whether career selected
  window.refreshResume = function() {
    const warning = document.getElementById("resumeWarning");
    const workspace = document.getElementById("resumeWorkspace");
    const career = window.app.user.career;

    if (!career) {
      if (warning) warning.classList.add("active");
      if (workspace) workspace.style.display = "none";
    } else {
      if (warning) warning.classList.remove("active");
      if (workspace) workspace.style.display = "block";
      
      resetResumeResults();
    }
  };

  function resetResumeResults() {
    document.getElementById("resumeResultsActive").style.display = "none";
    document.getElementById("resumeResultsEmpty").style.display = "flex";
  }

  async function handleAnalyze() {
    const resumeText = document.getElementById("resumeText").value.trim();
    const jobDescText = document.getElementById("jobDescText").value.trim();
    const analyzeBtn = document.getElementById("analyzeResumeBtn");

    if (resumeText.length < 20 || jobDescText.length < 20) {
      alert("Please paste your resume and target job description in detail (minimum 20 characters) to run the evaluator.");
      return;
    }

    const career = window.app.user.career;
    
    // UI Loading state
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "⚙️ Running ATS Parsing...";

    let score = 50;
    let rating = "Fair Match";
    let missing = [];
    let matched = [];
    let suggestions = [];

    try {
      if (window.app.user.apiKey) {
        // Run live Gemini ATS critique
        const atsPrompt = `You are a professional hiring ATS (Applicant Tracking System) software. Analyze the candidate resume against the job description for a ${MENTOR_DATA.careers[career].title} position.
Resume content:
"""
${resumeText}
"""

Job Description content:
"""
${jobDescText}
"""

Return a response in EXACT JSON format with fields:
{
  "matchPercentage": 0 to 100 integer,
  "rating": "Excellent Match" | "Good Match" | "Fair Match" | "Poor Match",
  "missingKeywords": ["keyword1", "keyword2", ...],
  "matchedKeywords": ["keyword1", "keyword2", ...],
  "suggestions": ["formatting critique", "action verb recommendation", "portfolio tip"]
}
Return valid JSON only.`;

        const reply = await window.app.askGemini(atsPrompt);
        const cleanJson = reply.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);

        score = parsed.matchPercentage || 50;
        rating = parsed.rating || "Fair Match";
        missing = parsed.missingKeywords || [];
        matched = parsed.matchedKeywords || [];
        suggestions = parsed.suggestions || [];
      } else {
        // Run simulated parser
        const analysis = compileSimulatedATS(career, resumeText, jobDescText);
        score = analysis.score;
        rating = analysis.rating;
        missing = analysis.missing;
        matched = analysis.matched;
        suggestions = analysis.suggestions;
      }

      // Render details
      renderATSResults(score, rating, resumeText.split(/\s+/).length, missing, matched, suggestions);

      // Save to global user profile
      window.app.user.resumeAtsScore = score;
      window.app.addXp(60); // reward for analyzing profile
      window.app.saveState();

    } catch (e) {
      console.error(e);
      // Fallback
      const analysis = compileSimulatedATS(career, resumeText, jobDescText);
      renderATSResults(analysis.score, analysis.rating, resumeText.split(/\s+/).length, analysis.missing, analysis.matched, ["Fallback evaluation: Make sure formatting complies with PDF outlines."] );
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = "Analyze Resume Compatibility";
    }
  }

  function compileSimulatedATS(careerKey, resumeText, jobDescText) {
    const resumeLower = resumeText.toLowerCase();
    const jdLower = jobDescText.toLowerCase();
    const skills = MENTOR_DATA.careers[careerKey].skills;

    let matched = [];
    let missing = [];

    // Check keyword overlaps against preset career skills
    skills.forEach(s => {
      // clean keyword for matching (e.g. "React.js" -> "react")
      const cleanSkill = s.toLowerCase().split("(")[0].replace(".js", "").trim();
      if (resumeLower.includes(cleanSkill)) {
        matched.push(s);
      } else {
        missing.push(s);
      }
    });

    // Score math
    let score = Math.round((matched.length / skills.length) * 100);
    
    // Add variations for length
    const wordsCount = resumeText.split(/\s+/).length;
    if (wordsCount < 100) score = Math.max(25, score - 15); // too brief
    
    let rating = "Fair Match";
    if (score >= 85) rating = "Excellent Match";
    else if (score >= 70) rating = "Good Match";
    else if (score >= 45) rating = "Fair Match";
    else rating = "Poor Match";

    const commonSuggestions = [
      "Include quantifiable results (e.g., 'Reduced loading time by 30%', 'Managed $5k cloud budgets') instead of passive lists.",
      "Integrate action-oriented vocabulary (e.g., 'Architected', 'Spearheaded', 'Optimized') at the start of bullets.",
      "Remove multi-column tables or visual sidebars, which frequently confuse older ATS text scanners.",
      "Ensure a clear 'AI Tooling' section highlighting your experience using Copilot, Cursor, or Prompt Engineering."
    ];

    return {
      score: score,
      rating: rating,
      missing: missing,
      matched: matched,
      suggestions: commonSuggestions
    };
  }

  function renderATSResults(score, rating, wordCount, missing, matched, suggestions) {
    document.getElementById("resumeResultsEmpty").style.display = "none";
    
    const resultsPanel = document.getElementById("resumeResultsActive");
    resultsPanel.style.display = "block";

    // Update progress numbers
    const scoreVal = document.getElementById("resumeMatchPct");
    const ratingTag = document.getElementById("resumeMatchRating");
    
    if (scoreVal) scoreVal.textContent = `${score}%`;
    if (ratingTag) {
      ratingTag.textContent = rating;
      // Style color mappings
      if (score >= 80) ratingTag.className = "score-grade-tag text-emerald";
      else if (score >= 60) ratingTag.className = "score-grade-tag text-indigo";
      else ratingTag.className = "score-grade-tag text-amber";
    }

    // Gauge background fill
    const circle = document.querySelector(".resume-gauge .score-circle-outer");
    if (circle) {
      circle.style.background = `conic-gradient(var(--accent-indigo) 0% ${score}%, rgba(255, 255, 255, 0.05) ${score}% 100%)`;
    }

    // Metadata badges
    const wordCountBadge = document.getElementById("resumeWordCountBadge");
    const sectionBadge = document.getElementById("resumeSectionBadge");
    const gradeBadge = document.getElementById("resumeGradeBadge");

    if (wordCountBadge) wordCountBadge.textContent = `${wordCount} Words`;
    if (sectionBadge) sectionBadge.textContent = wordCount > 150 ? "Format: Good" : "Format: Too Short";
    if (gradeBadge) gradeBadge.textContent = score > 60 ? "ATS Score: Normal" : "ATS Score: Weak";

    // Dynamic Lists
    const missingEl = document.getElementById("resumeMissingSkills");
    const matchedEl = document.getElementById("resumeMatchedSkills");
    const suggestionsEl = document.getElementById("resumeSuggestions");

    if (missingEl) {
      missingEl.innerHTML = "";
      if (missing.length === 0) {
        missingEl.innerHTML = `<li style="list-style-type: none; color: var(--accent-emerald);">🎉 None! You have matched all essential skills.</li>`;
      } else {
        missing.forEach(s => {
          const li = document.createElement("li");
          li.textContent = s;
          missingEl.appendChild(li);
        });
      }
    }

    if (matchedEl) {
      matchedEl.innerHTML = "";
      if (matched.length === 0) {
        matchedEl.innerHTML = `<span class="skill-tag">None identified</span>`;
      } else {
        matched.forEach(s => {
          const span = document.createElement("span");
          span.className = "skill-badge";
          span.textContent = s;
          matchedEl.appendChild(span);
        });
      }
    }

    if (suggestionsEl) {
      suggestionsEl.innerHTML = "";
      suggestions.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        suggestionsEl.appendChild(li);
      });
    }
  }
})();
