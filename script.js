const questions = [
  {
    q: " What is Investmate and how can it help me?",
    a: "Investmate is a smart investment platform designed to guide you through learning, analyzing, and growing your wealth with Shariah-compliant investment options. We suggest starting with our beginner modules!"
  },
  {
    q: "I'm new to investing. Where should I start?",
    a: "Start with our “Investment Basics” section. It’s a great place to learn the fundamentals before making real decisions."

  },
  {
    q: "Can I track my portfolio in real time?",
    a: "Absolutely. You can monitor your performance and portfolio insights live through your dashboard."
  },
  {
    q: " What’s the minimum amount I need to invest?",
    a: "It depends on the opportunity, but we recommend starting small—check each project for specific minimums."
  },
  {
    q: "How do I know if an investment is risky?",
    a: "Each opportunity comes with a risk profile. We suggest reading the full report before investing."
  },
  {
    q: "Is my investment safe with Investmate?",
    a: "While no investment is risk-free, we ensure every project goes through due diligence. We recommend diversifying your investments for added security."
  },
  {
    q: " What if I want to exit an investment early?",
    a: "Early exit policies vary by project. We advise checking the terms and conditions before investing."
  },
  {
    q: "Does Investmate provide educational resources?",
    a: "Yes! We have bite-sized lessons, articles, and video explainers to help you grow your knowledge."
  },
  {
    q: "How can I earn with Investmate?",
    a: "By investing in vetted opportunities, you can earn through profit sharing or business growth returns."
  },
  {
    q: "Can I suggest a business or startup to be listed on Investmate?",
    a: "No"
  },
  {
    q: "How often are new investment opportunities posted?",
    a: "We aim to post new, curated opportunities monthly. Keep an eye on your dashboard notifications!"
  },
  {
    q: "Is there a mobile app for Investmate?",
    a: "Currently, we’re web-based, but our app is coming soon! Stay tuned."
  },
  {
    q: "How do I verify the background of a listed project?",
    a: "We provide transparency reports and background checks for every project. We recommend reviewing them before committing."
  },
  {
    q: "Can I connect with other investors on the platform?",
    a: "Community features are in development, but we suggest following our official social media for updates and discussions."
  }
];

let index = 0;

function toggleChat(show) {
  const chat = document.getElementById("chat-container");
  chat.style.display = show ? "flex" : "none";
}

function createMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = isUser ? 'user-message' : 'bot-message';
  msg.textContent = text;
  document.getElementById('chat-box').appendChild(msg);
  scrollToBottom();
}

function createTypewriterMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = isUser ? 'user-message' : 'bot-message';
  document.getElementById('chat-box').appendChild(msg);
  let i = 0;
  function type() {
    if (i < text.length) {
      msg.textContent += text.charAt(i);
      i++;
      scrollToBottom();
      setTimeout(type, 30);
    }
  }
  type();
}

function scrollToBottom() {
  const chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.id = 'typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  document.getElementById('chat-box').appendChild(typing);
  scrollToBottom();
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

function loadSuggestions() {
  const container = document.getElementById('suggestions-container');
  container.innerHTML = '';
  const max = Math.min(index + 2, questions.length);

  for (let i = index; i < max; i++) {
    const btn = document.createElement('button');
    btn.className = 'suggestion-button';
    btn.textContent = questions[i].q;
    btn.onclick = () => {
      createMessage(questions[i].q, true);
      showTypingIndicator();

      setTimeout(() => {
        hideTypingIndicator();
        createTypewriterMessage(questions[i].a, false);
        index++;
        loadSuggestions();
      }, 3000); // delay before typing answer
    };
    container.appendChild(btn);
  }
}

window.onload = () => {
  createMessage("Welcome! How can I help you with crowdfunding?", false);
  loadSuggestions();

  document.getElementById('chatbot-icon').addEventListener('click', (e) => {
    toggleChat(true);
    e.stopPropagation();
  });

  document.getElementById('chat-close').addEventListener('click', () => {
    toggleChat(false);
  });

  document.addEventListener('click', (event) => {
    const chat = document.getElementById('chat-container');
    const icon = document.getElementById('chatbot-icon');
    if (!chat.contains(event.target) && !icon.contains(event.target)) {
      toggleChat(false);
    }
  });
};
