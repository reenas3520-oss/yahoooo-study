

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage, StudyTopic, PlaybackState, TTSConfig } from '../types';
import * as geminiService from '../services/geminiService';
import { UserIcon } from './icons/UserIcon';
import { GermIcon } from './icons/GermIcon';
import { Volume2Icon } from './icons/Volume2Icon';
import { StopCircleIcon } from './icons/StopCircleIcon';

interface ChatWindowProps {
  topic: StudyTopic;
  onClose: () => void;
  onPlayAudio: (text: string) => void;
  playbackState: PlaybackState;
  ttsConfig: TTSConfig;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ topic, onClose, onPlayAudio, playbackState, ttsConfig }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startChat = () => {
      geminiService.startChatSession(topic, ttsConfig);
      const initialMessage = `Hello! Let's start our study session on "${topic.chapter}". What would you like to learn about first?`;
      setMessages([{ role: 'model', parts: [{ text: initialMessage }] }]);
    };
    startChat();
  }, [topic, ttsConfig]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const modelMessage: ChatMessage = { role: 'model', parts: [{ text: '' }], isStreaming: true };
    setMessages((prev) => [...prev, modelMessage]);

    try {
      const stream = await geminiService.sendMessageStream(input);
      let text = '';
      for await (const chunk of stream) {
        text += chunk.text;
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, parts: [{ text }] } : msg
          )
        );
      }
      setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isStreaming: false } : msg
          )
        );
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: 'Sorry, I encountered an error. Please try again.' }],
        isStreaming: false
      };
       setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[85vh] bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700/50 animate-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
            <div>
                <h2 className="text-lg font-bold text-white">Study Session</h2>
                <p className="text-sm text-gray-400">{topic.subject} - {topic.chapter}</p>
            </div>
            <button onClick={onClose} className="text-indigo-400 hover:text-indigo-300 font-semibold">
                End Session
            </button>
        </header>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((message, index) => {
            const isPlaying = playbackState.isPlaying && playbackState.text === message.parts[0].text;
            return (
              <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'model' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <GermIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`flex items-end gap-2`}>
                  <div className={`max-w-md md:max-w-lg p-4 rounded-2xl shadow-md ${message.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-700/80 text-gray-200 rounded-bl-none'}`}>
                    <div className="prose prose-invert prose-sm max-w-none prose-p:my-0">
                        <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
                    </div>
                    {message.isStreaming && <div className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></div>}
                  </div>
                   {message.role === 'model' && !message.isStreaming && message.parts[0].text && (
                     <button 
                        onClick={() => onPlayAudio(message.parts[0].text)} 
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
                      >
                       {isPlaying ? <StopCircleIcon className="w-5 h-5 text-red-400"/> : <Volume2Icon className="w-5 h-5"/>}
                     </button>
                   )}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or type 'explain'..."
            disabled={isStreaming}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-full py-3 pl-5 pr-28 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <button type="submit" disabled={isStreaming || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/70 disabled:cursor-not-allowed text-white font-semibold py-2 px-5 rounded-full transition-colors transform active:scale-95">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};