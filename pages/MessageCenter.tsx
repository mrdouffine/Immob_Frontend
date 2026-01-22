
import * as React from 'react';
const { useState } = React;
import { useMessageStore } from '../src/store/messageStore';
import { Link } from 'react-router-dom';

const MessageCenter: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversation, sendMessage, markAsRead } = useMessageStore();
  const [newMessage, setNewMessage] = useState('');

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, newMessage);
    setNewMessage('');
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    markAsRead(id);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'À l\'instant';
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark text-[#171211] dark:text-[#f4f1f0]">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f4f1f0] dark:border-[#3d2b29] bg-white dark:bg-[#2d1a18] px-10 py-3 z-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-primary">
            <div className="size-8">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.1288 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#171211] dark:text-white">Immob</h2>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link className="text-sm font-semibold text-primary" to="/messages">Messages</Link>
            <Link className="text-[#171211] dark:text-[#f4f1f0] text-sm font-medium opacity-70 hover:opacity-100 transition-opacity" to="/">Découvrir</Link>
            <Link className="text-[#171211] dark:text-[#f4f1f0] text-sm font-medium opacity-70 hover:opacity-100 transition-opacity" to="/profile">Profil</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-background-light dark:hover:bg-[#3d2b29] transition-colors">
            <span className="material-symbols-outlined text-xl">notifications</span>
            {totalUnread > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </button>
          <Link to="/profile" className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white dark:border-[#3d2b29] flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400">person</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <aside className="w-80 border-r border-[#f4f1f0] dark:border-[#3d2b29] bg-white dark:bg-[#2d1a18] flex flex-col">
          <div className="p-4 border-b border-[#f4f1f0] dark:border-[#3d2b29]">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des messages..."
                className="w-full bg-background-light dark:bg-[#3d2b29] border border-[#f4f1f0] dark:border-[#3d2b29] rounded-xl px-4 py-2 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="material-symbols-outlined absolute left-3 top-2 text-[#876864] text-xl">search</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-[#876864]">
                <span className="material-symbols-outlined text-4xl mb-2 block">chat_bubble</span>
                <p className="text-sm font-bold">Aucun message</p>
                <p className="text-xs mt-1">Vos conversations apparaîtront ici</p>
              </div>
            ) : (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full p-4 border-b border-[#f4f1f0] dark:border-[#3d2b29] hover:bg-background-light dark:hover:bg-[#3d2b29] transition-colors text-left ${activeConversationId === conv.id ? 'bg-primary/5' : ''
                    }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={conv.propertyImage}
                      alt={conv.propertyName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-sm truncate">{conv.otherUserName}</p>
                        <span className="text-xs text-[#876864]">{formatTime(conv.lastMessageTime)}</span>
                      </div>
                      <p className="text-xs text-[#876864] truncate mb-1">{conv.propertyName}</p>
                      <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-[#171211] dark:text-white' : 'text-[#876864]'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <div className="bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {conv.unreadCount}
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#2d1a18]">
          {!activeConversation ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <span className="material-symbols-outlined text-6xl text-[#876864] mb-4 block">chat</span>
                <h3 className="text-xl font-bold mb-2">Sélectionnez une conversation</h3>
                <p className="text-sm text-[#876864]">Choisissez une conversation pour commencer à discuter</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#f4f1f0] dark:border-[#3d2b29] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.propertyImage}
                    alt={activeConversation.propertyName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold">{activeConversation.otherUserName}</p>
                    <p className="text-xs text-[#876864]">{activeConversation.propertyName}</p>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-background-light dark:hover:bg-[#3d2b29]">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'user-1' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.senderId === 'user-1' ? 'bg-primary text-white' : 'bg-background-light dark:bg-[#3d2b29]'} rounded-2xl px-4 py-2`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.senderId === 'user-1' ? 'text-white/70' : 'text-[#876864]'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#f4f1f0] dark:border-[#3d2b29]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Écrire un message..."
                    className="flex-1 bg-background-light dark:bg-[#3d2b29] border border-[#f4f1f0] dark:border-[#3d2b29] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
                <p className="text-xs text-[#876864] mt-2">
                  L'hôte répond généralement en <span className="font-bold">1 heure</span>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessageCenter;
