import { useState, useEffect, useRef } from 'react';
import { Search, Send, Filter, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateAIResponse } from '../services/aiTeacherService';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function MessagingPanel({ initialTeacherId = null }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([
    {
      id: 'ai-teacher-1',
      otherUser: {
        name: 'Dr. Sophie Martin',
        role: 'Professeure de Mathématiques',
        uid: 'ai-teacher'
      },
      lastMessage: '',
      lastMessageTime: new Date()
    }
  ]);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    // Message de l'utilisateur
    const userMsg = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      senderId: user?.uid,
      senderName: user?.name,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // L'IA génère une réponse (en secret)
      const aiResponse = await generateAIResponse(newMessage.trim(), messages);
      
      // Réponse formatée comme un vrai prof
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        senderId: 'ai-teacher',
        senderName: 'Dr. Sophie Martin',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-140px)] border-0 shadow-lg ring-1 ring-slate-100 overflow-hidden flex">
      {/* Liste des conversations */}
      <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary" 
              placeholder="Rechercher..." 
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                activeConversation?.id === conv.id
                  ? 'bg-white shadow-sm border border-slate-100'
                  : 'hover:bg-slate-100'
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {conv.otherUser?.name?.charAt(0) || '?'}
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-sm font-bold text-slate-900">
                    {conv.otherUser?.name || 'Professeur'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {conv.lastMessageTime?.toLocaleTimeString?.('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) || 'Maintenant'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  {conv.lastMessage || 'Nouvelle conversation'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fenêtre de chat */}
      <div className="flex-grow flex flex-col bg-white">
        <>
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                {activeConversation?.otherUser?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {activeConversation?.otherUser?.name || 'Professeur'}
                </div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 
                  En ligne
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Filter size={20} />
            </Button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <div className="text-4xl">👋</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Commencez la conversation
                </h3>
                <p className="text-slate-500 max-w-sm">
                  Posez votre première question à Dr. Sophie Martin. Elle est là pour vous aider dans toutes les matières !
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === user?.uid;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-4 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1 ${
                      isMe ? 'bg-primary' : 'bg-slate-300'
                    }`}>
                      {msg.senderName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        isMe 
                          ? 'bg-primary text-white rounded-tr-none shadow-primary/20' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className={`text-xs text-slate-400 mt-1 block ${isMe ? 'text-right' : ''}`}>
                  S     {msg.timestamp?.toLocaleTimeString?.('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {isTyping && (
              <div className="flex gap-4 max-w-[80%]">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                  P
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="Écrivez votre message..."
                disabled={isTyping}
              />
              <Button type="submit" className="px-6" disabled={!newMessage.trim() || isTyping}>
                <Send size={18} />
              </Button>
            </div>
          </form>
        </>
      </div>
    </Card>
  );
}
