import { useState } from 'react';

function ChatInput({ onSend, onTyping, room }) {
  const [text, setText] = useState('');
  

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping(true);

    setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text, room);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-grow border px-2 py-1 rounded"
        placeholder="Type a message"
        value={text}
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Send</button>
    </form>
  );
}

export default ChatInput;
