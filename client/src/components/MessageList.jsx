function MessageList({ messages, currentUser }) {
  return (
    <ul className="space-y-2">
      {messages.map((msg) => (
        <li key={msg.id} className={`p-2 rounded ${msg.sender === currentUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <span className="font-bold">{msg.sender}:</span> {msg.message}
          <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
