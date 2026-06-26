// Fullstack App Coordinator for Mentora (Frontend Client)
class MentorApp {
  constructor() {
    this.user = {
      name: "Explorer",
      career: null, // 'frontend', 'backend', 'ai', 'pm'
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: null,
      completedTasks: {}, // { taskId: true }
      completedQuests: {
        quest1: false, // scored quiz
        quest2: false, // chat query
        quest3: false  // mock interview
      },
      studyMinutes: 0,
      resumeAtsScore: null,
      lastInterviewScore: null,
      apiKey: ""
    };
    this.activeTab = "dashboard";
    this.studyTimeInterval = null;
  }

  async init() {
    await this.loadState();
    
    this.setupSidebarNavigation();
    this.setupMobileControls();
    this.setupSettingsModal();
    this.startStudyTimer();
    this.checkDailyStreak();

    // Init page modules
    if (typeof window.initAssessment === 'function') window.initAssessment();
    if (typeof window.initDashboard === 'function') window.initDashboard();
    if (typeof window.initRoadmap === 'function') window.initRoadmap();
    if (typeof window.initChat === 'function') window.initChat();
    if (typeof window.initInterview === 'function') window.initInterview();
    if (typeof window.initResume === 'function') window.initResume();

    this.refreshUI();
    
    // Default tab
    this.switchTab(this.activeTab);
  }

  // Load state from backend database
  async loadState() {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const parsed = await response.json();
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          this.user = { ...this.user, ...parsed };
          console.log("Loaded profile state from backend database.");
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch state from server, checking local storage fallback...", e);
    }

    // Fallback local storage
    const savedState = localStorage.getItem("mentora_user_state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        this.user = { ...this.user, ...parsed };
      } catch (e) {
        console.error("Error reading localStorage state", e);
      }
    }
  }

  // Save state to backend database and local storage
  async saveState() {
    this.refreshUI();
    
    // Save to browser
    localStorage.setItem("mentora_user_state", JSON.stringify(this.user));

    // Save to server
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user)
      });
    } catch (e) {
      console.warn("Could not save state to server database", e);
    }
  }

  // Toggle active views
  switchTab(tabId) {
    this.activeTab = tabId;
    
    // Update navigation styles
    document.querySelectorAll(".menu-item").forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update section panel display
    document.querySelectorAll(".view-section").forEach(sec => {
      if (sec.id === `view-${tabId}`) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    const titles = {
      dashboard: "Dashboard",
      assessment: "Career Diagnosis",
      roadmap: "Learning Roadmap",
      chat: "AI Mentor Chat",
      interview: "Mock Interview",
      resume: "Resume Optimizer"
    };
    
    const titleEl = document.getElementById("viewTitle");
    if (titleEl) titleEl.textContent = titles[tabId] || "Dashboard";

    // Trigger views refresh hooks
    if (tabId === "dashboard" && typeof window.refreshDashboard === 'function') {
      window.refreshDashboard();
    } else if (tabId === "roadmap" && typeof window.refreshRoadmap === 'function') {
      window.refreshRoadmap();
    } else if (tabId === "chat" && typeof window.refreshChat === 'function') {
      window.refreshChat();
    } else if (tabId === "interview" && typeof window.refreshInterview === 'function') {
      window.refreshInterview();
    } else if (tabId === "resume" && typeof window.refreshResume === 'function') {
      window.refreshResume();
    }

    const mainEl = document.querySelector(".app-main");
    if (mainEl) mainEl.scrollTop = 0;
  }

  // Sidebar navigation listeners
  setupSidebarNavigation() {
    document.querySelectorAll(".menu-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");
        this.switchTab(tabId);
        
        // Auto close drawer on mobile navigation
        const sidebar = document.getElementById("appSidebar");
        if (sidebar) sidebar.classList.remove("mobile-open");
      });
    });
  }

  // Mobile navigation drawer
  setupMobileControls() {
    const toggleBtn = document.getElementById("mobileToggleBtn");
    const closeBtn = document.getElementById("mobileCloseBtn");
    const sidebar = document.getElementById("appSidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("mobile-open");
      });
    }

    if (closeBtn && sidebar) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
      });
    }
  }

  // Settings Modal config
  setupSettingsModal() {
    const openBtn = document.getElementById("openSettingsBtn");
    const closeBtn = document.getElementById("closeSettingsBtn");
    const overlay = document.getElementById("settingsModal");
    const saveBtn = document.getElementById("saveSettingsBtn");
    const clearBtn = document.getElementById("clearSettingsBtn");
    const apiKeyInput = document.getElementById("geminiApiKey");
    const nameInput = document.getElementById("studentName");

    if (openBtn && overlay) {
      openBtn.addEventListener("click", () => {
        if (apiKeyInput) apiKeyInput.value = this.user.apiKey || "";
        if (nameInput) nameInput.value = this.user.name || "Explorer";
        overlay.classList.add("active");
      });
    }

    const closeModal = () => {
      if (overlay) overlay.classList.remove("active");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", async () => {
        if (apiKeyInput) this.user.apiKey = apiKeyInput.value.trim();
        if (nameInput) {
          const nameVal = nameInput.value.trim();
          this.user.name = nameVal || "Explorer";
        }
        
        await this.saveState();
        closeModal();
        
        this.addXp(10);
        alert("Settings saved successfully to server.");
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to clear your local progress and reset settings?")) {
          localStorage.removeItem("mentora_user_state");
          try {
            await fetch("/api/user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}) // clear backend
            });
          } catch (e) {}
          location.reload();
        }
      });
    }
  }

  // Add XP and trigger levels
  addXp(amount) {
    this.user.xp += amount;
    
    const newLevel = Math.floor(this.user.xp / 1000) + 1;
    if (newLevel > this.user.level) {
      this.user.level = newLevel;
      setTimeout(() => {
        alert(`🎉 LEVEL UP! You are now Level ${newLevel}!`);
      }, 300);
    }
    
    this.saveState();
    this.showXpToast(amount);
  }

  // Visual XP Indicator toast
  showXpToast(amount) {
    if (amount <= 0) return; // ignore negative/zero updates
    const toast = document.createElement("div");
    toast.className = "xp-toast";
    toast.textContent = `+${amount} XP`;
    toast.style.position = "fixed";
    toast.style.right = "32px";
    toast.style.top = "80px";
    toast.style.background = "linear-gradient(135deg, #7c3aed, #6366f1)";
    toast.style.color = "white";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "50px";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "700";
    toast.style.boxShadow = "0 4px 15px rgba(99,102,241,0.4)";
    toast.style.zIndex = "9999";
    toast.style.animation = "fade-in 0.3s ease, float-up 1s ease forwards";
    
    document.body.appendChild(toast);
    
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-up {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-40px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 1000);
  }

  // Track study duration minutes
  startStudyTimer() {
    this.studyTimeInterval = setInterval(() => {
      this.user.studyMinutes += 1;
      this.saveState();
      
      const timeVal = document.getElementById("statsTime");
      if (timeVal) {
        timeVal.textContent = `${this.user.studyMinutes} mins`;
      }
    }, 60000);
  }

  // Verify daily active streak
  checkDailyStreak() {
    const today = new Date().toDateString();
    const lastActive = this.user.lastActiveDate;

    if (lastActive) {
      const lastDate = new Date(lastActive);
      const diffTime = Math.abs(new Date(today) - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.user.streak += 1;
      } else if (diffDays > 1) {
        this.user.streak = 1;
      }
    } else {
      this.user.streak = 1;
    }

    this.user.lastActiveDate = today;
    this.saveState();
  }

  // Refresh Header and Sidebar Profile cards
  refreshUI() {
    const nameEl = document.getElementById("sidebarName");
    const titleEl = document.getElementById("sidebarTitle");
    const lvlTextEl = document.getElementById("sidebarLevelText");
    const xpValEl = document.getElementById("sidebarXpVal");
    const xpBarEl = document.getElementById("sidebarXpBar");
    const avatarEl = document.getElementById("sidebarAvatar");

    if (nameEl) nameEl.textContent = this.user.name;
    
    if (titleEl) {
      if (this.user.career) {
        const titleMap = {
          frontend: "Frontend Specialist",
          backend: "Backend Engineer",
          ai: "AI Practitioner",
          pm: "AI Product Builder"
        };
        titleEl.textContent = titleMap[this.user.career];
      } else {
        titleEl.textContent = "Confused Explorer";
      }
    }

    if (lvlTextEl) lvlTextEl.textContent = `Lvl ${this.user.level}`;
    
    const currentLvlXp = this.user.xp % 1000;
    if (xpValEl) xpValEl.textContent = `${currentLvlXp} / 1000 XP`;
    if (xpBarEl) xpBarEl.style.width = `${(currentLvlXp / 1000) * 100}%`;

    if (avatarEl && this.user.career) {
      const avatars = { frontend: "🌐", backend: "⚙️", ai: "🧠", pm: "📈" };
      avatarEl.textContent = avatars[this.user.career] || "🧭";
    }

    const streakValEl = document.getElementById("streakVal");
    const headerXpTextEl = document.getElementById("headerXpText");

    if (streakValEl) streakValEl.textContent = `${this.user.streak} Day${this.user.streak > 1 ? 's' : ''}`;
    if (headerXpTextEl) headerXpTextEl.textContent = `${this.user.xp} XP`;
  }

  // Update a daily quest check status
  completeQuest(questId, xpAmount) {
    if (!this.user.completedQuests[questId]) {
      this.user.completedQuests[questId] = true;
      this.addXp(xpAmount);
      
      const itemEl = document.getElementById(questId);
      if (itemEl) {
        itemEl.classList.add("completed");
      }
    }
  }
}

// Instantiate globally
window.app = new MentorApp();
window.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
