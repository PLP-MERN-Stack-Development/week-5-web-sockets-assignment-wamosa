import { useState, useEffect } from 'react';
import { useSocket } from '../socket';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

function ChatRoom({ username }) {
  const {
    connect,
    disconnect,
    messages,
    users,
    typingUsers,
    sendMessage,
    sendPrivateMessage,
    setTyping
  } = useSocket();

  useEffect(() => {
    connect(username);
    return () => disconnect();
  }, [username]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {username}</h1>
      <p className="text-sm text-gray-500 mb-4">Online Users: {users.map(u => u.username).join(', ')}</p>
    <div>
       <h2>Online Users:</h2>

       <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
        ))}
       </ul>
     </div>


      <div className="h-[400px] overflow-y-scroll border rounded p-2 mb-4 bg-white shadow">
        <MessageList messages={messages} currentUser={username} />
        {typingUsers.length > 0 && (
          <p className="text-xs italic text-gray-400">{typingUsers.join(', ')} typing...</p>
        )}
      </div>

      <ChatInput onSend={sendMessage} onTyping={setTyping} />
    </div>
  );
}

export default ChatRoom;
