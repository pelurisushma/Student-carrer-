import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RotateCcw, ChevronDown, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hi there! I'm **CareerBot**, your AI student career advisor. Ask me anything about preparing for tech interviews, crafting Google XYZ resume bullets, exploring roles, or planning your 4-year roadmap!",
    timestamp: 'Just now'
  }
];

const SUGGESTED_PROMPTS = [
  "How do I write a bullet using Google's XYZ formula?",
  "Give me an exemplary STAR answer for leadership",
  "What capstone project will impress SWE recruiters?",
  "What are the salary benchmarks for AI/ML engineers?"
];

export const CareerChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('sch_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('sch_chat_history', JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I'm here to support your journey. What other questions do you have?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "I'm having a brief issue connecting to the career model. If you're practicing interview answers or drafting resume bullets, explore the dedicated tabs in the top navigation!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    sessionStorage.removeItem('sch_chat_history');
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Open AI Career Advisor Chatbot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-sky-400 group-hover:rotate-6 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </div>
            <span className="text-xs font-semibold tracking-tight">
              Ask CareerBot AI
            </span>
          </button>
        </div>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600/30 flex items-center justify-center text-sky-400 border border-sky-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">CareerBot Advisor</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Powered by Gemini 3.8 Flash</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize chatbot"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span
                    className={`block text-[10px] mt-1 ${
                      msg.role === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-ping" />
                  <span className="text-[11px] text-slate-600">CareerBot is drafting advice...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts (When few messages exist) */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <Sparkles className="w-3 h-3 text-sky-600 shrink-0" />
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about resumes, STAR interviews, SWE tracks..."
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-lg transition-colors shadow-xs"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
