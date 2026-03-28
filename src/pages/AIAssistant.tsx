import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  MapPin,
  MessageSquare,
  Plus,
  ChevronLeft,
  Bot,
  User,
  Sparkles,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, Conversation } from "@/types/booking";

const quickSuggestions = [
  "Plan a 2-day hiking trip in GBA",
  "Best camping spots for beginners",
  "Family-friendly trails near Hong Kong",
  "Recommend gear for summer hiking",
];

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Weekend Hiking Plan",
    lastMessage: "I recommend Dragon's Back for a start...",
    updatedAt: new Date("2026-03-27"),
  },
  {
    id: "2",
    title: "Camping Equipment",
    lastMessage: "For beginners, a 2-person tent...",
    updatedAt: new Date("2026-03-25"),
  },
];

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "## 👋 Welcome to Fun Peak AI Assistant!\n\nI can help you with:\n- **Trail recommendations** based on your fitness level\n- **Trip planning** for the Greater Bay Area\n- **Gear advice** for hiking & camping\n- **Weather & safety** information\n\nHow can I help you today?",
  timestamp: new Date(),
};

// Mock AI response
function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hiking") || lower.includes("trail")) {
    return `## 🥾 Great Hiking Options\n\nBased on your interest, here are my top picks:\n\n1. **Dragon's Back** — Moderate, 2.5 hrs, stunning coastal views\n2. **Tai Mo Shan** — Easy, 4 hrs, lush forest canopy\n3. **Cape D'Aguilar** — Moderate, 3 hrs, dramatic sea cliffs\n\nWould you like me to help you **book** one of these, or need more details?`;
  }
  if (lower.includes("camping") || lower.includes("camp")) {
    return `## ⛺ Camping Recommendations\n\nHere are beginner-friendly camping spots:\n\n- **Pak Tam Chung** — Well-maintained facilities, easy access\n- **Ham Tin Beach** — Beautiful beachside camping\n- **Tai Long Wan** — Remote but rewarding\n\n> **Tip:** Book your spot early during peak season (Oct–Mar)!\n\nNeed help with **gear checklists**?`;
  }
  if (lower.includes("gear") || lower.includes("equipment")) {
    return `## 🎒 Essential Hiking Gear\n\n| Item | Priority |\n|---|---|\n| Trail shoes | Must-have |\n| 2L water bottle | Must-have |\n| Sun hat | Recommended |\n| Rain jacket | Recommended |\n| First-aid kit | Must-have |\n\nWant me to recommend specific **brands** or **shops**?`;
  }
  return `Thanks for your question! I'd be happy to help you explore the Greater Bay Area. Could you tell me more about:\n\n- Your **fitness level**\n- **How many days** you have\n- Any **preferences** (coastal, forest, mountain)?\n\nThis will help me give you the best recommendations! 🌄`;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1200));

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getMockResponse(text),
      timestamp: new Date(),
    };
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-card-foreground">
            Conversations
          </h2>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Plus size={18} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              className="w-full text-left p-3 rounded-lg hover:bg-accent/60 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare size={14} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground truncate">
                  {conv.title}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate pl-5">
                {conv.lastMessage}
              </p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Home
          </a>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <aside
            className="w-72 h-full bg-card border-r border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-card-foreground">
                Conversations
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(false)}>
                <ChevronLeft size={18} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent/60 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare size={14} className="text-primary" />
                    <span className="text-sm font-medium text-card-foreground truncate">
                      {conv.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate pl-5">
                    {conv.lastMessage}
                  </p>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <a
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft size={16} />
                Back to Home
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card/40 backdrop-blur-xl flex items-center px-4 gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-accent"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex hover:bg-accent"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Bot size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">
                Fun Peak AI Assistant
              </h1>
              <p className="text-xs text-muted-foreground">
                Your travel companion for Greater Bay Area
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={16} className="text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-card-foreground rounded-bl-md shadow-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-card-foreground prose-p:text-card-foreground prose-li:text-card-foreground prose-strong:text-card-foreground prose-td:text-card-foreground prose-th:text-card-foreground prose-th:font-semibold">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
                <p
                  className={`text-[10px] mt-2 ${
                    msg.role === "user"
                      ? "text-primary-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-1">
                  <User size={16} className="text-accent-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {messages.length <= 1 &&
            quickSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent hover:border-primary/30 text-card-foreground transition-all duration-200"
              >
                {s}
              </button>
            ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border bg-card/40 backdrop-blur-xl shrink-0">
          <div className="max-w-3xl mx-auto flex items-end gap-2 bg-background border border-border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-ring transition-shadow">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-primary hover:bg-accent"
            >
              <MapPin size={18} />
            </Button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about trails, trips, or gear..."
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-32 py-1.5"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
