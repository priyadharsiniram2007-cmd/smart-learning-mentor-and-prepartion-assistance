// AI Mentor Chat Module
(function() {
  let chatHistory = {}; // Maps career key to array of messages: { role: 'user'|'mentor', text: '' }
  
  // Initialize module
  window.initChat = function() {
    const sendBtn = document.getElementById("sendChatBtn");
    const inputEl = document.getElementById("chatInputText");

    if (sendBtn) {
      sendBtn.addEventListener("click", handleSend);
    }
    if (inputEl) {
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });
    }

    window.refreshChat();
  };

  // Switch display state depending on whether career selected
  window.refreshChat = function() {
    const warning = document.getElementById("chatWarning");
    const workspace = document.getElementById("chatWorkspace");
    const career = window.app.user.career;

    if (!career) {
      if (warning) warning.classList.add("active");
      if (workspace) workspace.style.display = "none";
    } else {
      if (warning) warning.classList.remove("active");
      if (workspace) workspace.style.display = "grid";
      
      setupMentorProfile(career);
      setupQuickPrompts(career);
      loadChatMessages(career);
    }
  };

  function setupMentorProfile(careerKey) {
    const avatars = { frontend: "👨‍💻", backend: "⚙️", ai: "🧠", pm: "📈" };
    const names = {
      frontend: "Sarah, Lead AI-UI Architect",
      backend: "Marcus, Senior Distributed Systems Engineer",
      ai: "Dr. Kian, Machine Learning Scientist",
      pm: "Devon, Principal AI Product Builder"
    };

    const mentorAvatar = document.getElementById("chatMentorAvatar");
    const mentorName = document.getElementById("chatMentorName");

    if (mentorAvatar) mentorAvatar.textContent = avatars[careerKey] || "🤖";
    if (mentorName) mentorName.textContent = names[careerKey] || "AI Mentor";
  }

  function setupQuickPrompts(careerKey) {
    const promptsBox = document.getElementById("quickQuestionsBox");
    if (!promptsBox) return;

    promptsBox.innerHTML = "";

    const prompts = {
      frontend: [
        "How do developers use Gemini to write code faster?",
        "Can you show me how to structure an API call to Gemini in React?",
        "Explain CSS Grid vs Flexbox with a simple example.",
        "How do I manage component loading states when rendering slow AI answers?"
      ],
      backend: [
        "Explain vector databases (like Pinecone) in simple terms.",
        "How do I design a secure API route for forwarding AI prompts?",
        "Show me an Express server setup connecting to Gemini API.",
        "How should I store API keys safely in a Node project?"
      ],
      ai: [
        "Explain the difference between Fine-Tuning and RAG.",
        "What is embeddings cosine similarity and why is it used?",
        "Write a Python script calculating matrix weights manually.",
        "What does the temperature parameter in LLMs do?"
      ],
      pm: [
        "How do I draft a PRD for an AI-powered resume scanner?",
        "How should we design UX for slow or streamed AI responses?",
        "How do I balance token API computing costs with business value?",
        "What metrics should I track after launching an AI features?"
      ]
    };

    const pathPrompts = prompts[careerKey] || [];
    pathPrompts.forEach(pText => {
      const btn = document.createElement("button");
      btn.className = "quick-prompt-btn";
      btn.textContent = pText;
      btn.addEventListener("click", () => {
        const inputEl = document.getElementById("chatInputText");
        if (inputEl) {
          inputEl.value = pText;
          handleSend();
        }
      });
      promptsBox.appendChild(btn);
    });
  }

  function loadChatMessages(careerKey) {
    const container = document.getElementById("chatMessagesContainer");
    if (!container) return;

    container.innerHTML = "";

    // Initialize with greetings if empty
    if (!chatHistory[careerKey]) {
      const greeting = MENTOR_DATA.mockAnswers[careerKey]?.greetings || "Hello! I am your career mentor. Ask me anything about this path!";
      chatHistory[careerKey] = [
        { role: "mentor", text: greeting }
      ];
    }

    chatHistory[careerKey].forEach(msg => {
      appendMessageBubble(msg.role, msg.text);
    });
  }

  function appendMessageBubble(role, text) {
    const container = document.getElementById("chatMessagesContainer");
    if (!container) return;

    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${role}`;
    
    // Parse light markdown tags (code, pre, lists)
    bubble.innerHTML = parseMarkdown(text);
    
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    
    return bubble;
  }

  function parseMarkdown(text) {
    // 1. Escape basic HTML tags to prevent XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Format multi-line code blocks: ```javascript [code] ```
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // 3. Format inline code blocks: `code`
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // 4. Format bold text: **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // 5. Format lists bullet marks: - text
    html = html.replace(/^\s*-\s+([^\n]+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>'); // Group list elements briefly

    // 6. Format simple line breaks
    html = html.replace(/\n/g, "<br>");

    return html;
  }

  async function handleSend() {
    const inputEl = document.getElementById("chatInputText");
    if (!inputEl) return;

    const text = inputEl.value.trim();
    if (!text) return;

    const career = window.app.user.career;
    
    // 1. Add User bubble
    chatHistory[career].push({ role: "user", text: text });
    appendMessageBubble("user", text);
    
    inputEl.value = "";
    inputEl.style.height = "48px"; // Reset height

    // 2. Add Typewriter loading indicator
    const loader = appendMessageBubble("mentor", `<span class="typing-indicator">Mentor is thinking...</span>`);

    try {
      let reply = "";
      if (window.app.user.apiKey) {
        // Run live Gemini API
        const sysInst = `You are a helpful senior mentor named ${getMentorName(career)} guiding a student in ${MENTOR_DATA.careers[career].title}.
Answer in detailed, structured, friendly, and practical terms. Always highlight how they can build real solutions, specifically emphasizing and leveraging AI technologies (like API calls, Cursor, prompt design) in their career field. Keep code blocks well-commented.`;
        
        reply = await window.app.askGemini(text, sysInst);
      } else {
        // Fallback local mockup response
        reply = getSimulatedResponse(career, text);
      }

      // Remove loader
      loader.remove();

      // Render reply
      chatHistory[career].push({ role: "mentor", text: reply });
      appendMessageBubble("mentor", reply);
      
      // Award XP for asking questions!
      window.app.completeQuest("quest-2", 50);
      window.app.addXp(10); // general activity award
      
    } catch (err) {
      loader.remove();
      appendMessageBubble("mentor", `⚠️ **API Error:** Failed to load response. ${err.message}. Please check your Google Gemini API Key in AI Settings.`);
    }
  }

  function getMentorName(careerKey) {
    const names = {
      frontend: "Sarah (Frontend)",
      backend: "Marcus (Backend)",
      ai: "Dr. Kian (AI/Data)",
      pm: "Devon (PM)"
    };
    return names[careerKey] || "AI Mentor";
  }

  // Fallback simulator keywords matches
  function getSimulatedResponse(careerKey, userQuery) {
    const queryLower = userQuery.toLowerCase();
    const mock = MENTOR_DATA.mockAnswers[careerKey];

    // Quick match responses
    if (queryLower.includes("code") || queryLower.includes("example") || queryLower.includes("api") || queryLower.includes("gemini") || queryLower.includes("react") || queryLower.includes("express") || queryLower.includes("pytorch")) {
      return `Here is a custom technical code overview for your query: \n\n` + mock.codeExample + `\n\nFeel free to write this code in a local file. Connecting UI layers to servers is a key task in ${MENTOR_DATA.careers[careerKey].title}!`;
    }

    if (queryLower.includes("career") || queryLower.includes("what is") || queryLower.includes("job") || queryLower.includes("difference")) {
      return `Let's discuss how this fits in your career path as a **${MENTOR_DATA.careers[careerKey].title}**:\n\n` + mock.default + `\n\nAlways remember that understanding the foundational architectures while leveraging modern AI coding tooling (like Cursor or Github Copilot) is what makes developers highly competitive.`;
    }

    // Default general advice reply
    return `That is a great question regarding **${MENTOR_DATA.careers[careerKey].title}**. \n\n` + 
      mock.default + 
      `\n\nTo help you practice, try searching about this concept, write a quick sandbox test, or ask me for a code sample by typing **"show me a code example"**!`;
  }
})();
