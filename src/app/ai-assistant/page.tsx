
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; // Adjust path as necessary

// --- Data Structures (Copied from MobileAppDemo.tsx) ---
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  avatar?: string;
  dataAiHintAvatar?: string;
}

const userProfileData = { // Dummy data for user avatar, replace with actual context if available
  name: "User",
  avatarUrl: "https://placehold.co/128x128.png?text=U",
  dataAiHintAvatar: "profile person"
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial-ai',
      text: "Hello! I'm HyreSense AI. How can I assist you with your career goals or job search today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "/logo.png",
      dataAiHintAvatar: "ai assistant logo"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: `Thanks for reaching out! I'm still in my learning phase. You mentioned: "${userMessage.text}". I'll be able to provide more detailed assistance soon!`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "/logo.png",
        dataAiHintAvatar: "ai assistant logo"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1200);
  };
  
  return (
    <MobileAppLayout activeView="ai_assist" pageTitle="AI Assistant">
      <div className="h-full w-full flex flex-col bg-muted/20 dark:bg-slate-900/30">
        <ScrollArea className="flex-grow">
          <div className="p-3 space-y-3">
              {messages.map((msg) => (
              <div
                  key={msg.id}
                  className={cn(
                  "flex w-full mb-2 items-end gap-2",
                  msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
              >
                  {msg.sender === 'ai' && (
                      <Avatar className="h-7 w-7 self-start border border-primary/30 shadow-sm">
                          {msg.avatar ? <AvatarImage src={msg.avatar} alt="AI Avatar" data-ai-hint={msg.dataAiHintAvatar}/> : <AvatarImage src="/logo.png" alt="AI Avatar" data-ai-hint="ai logo" />}
                          <AvatarFallback><Brain className="h-4 w-4 text-primary"/></AvatarFallback>
                      </Avatar>
                  )}
                  <div
                  className={cn(
                      "max-w-[75%] p-2.5 rounded-xl shadow-md text-sm",
                      msg.sender === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground border border-border/50 rounded-bl-none dark:bg-slate-800"
                  )}
                  >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  {msg.timestamp && (
                      <p className={cn(
                          "text-xs mt-1.5 opacity-70",
                          msg.sender === 'user' ? 'text-right text-primary-foreground/70' : 'text-left text-muted-foreground'
                      )}>
                      {msg.timestamp}
                      </p>
                  )}
                  </div>
                   {msg.sender === 'user' && (
                       <Avatar className="h-7 w-7 self-start border border-border/30 shadow-sm">
                          <AvatarImage src={userProfileData.avatarUrl} alt="User Avatar" data-ai-hint={userProfileData.dataAiHintAvatar} />
                          <AvatarFallback>{userProfileData.name.substring(0,1)}</AvatarFallback>
                      </Avatar>
                  )}
              </div>
              ))}
              <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border/50 bg-background/90 backdrop-blur-sm flex items-center gap-2 sticky bottom-0">
            <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about career advice, resume tips..."
            className="flex-grow resize-none rounded-xl border-border/60 focus-visible:ring-primary/50 h-10 min-h-[40px] max-h-[100px] py-2 text-sm"
            rows={1}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
                }
            }}
            />
            <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full h-10 w-10 shrink-0 bg-primary hover:bg-primary/90 disabled:bg-muted transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
            </Button>
        </div>
      </div>
    </MobileAppLayout>
  );
}
