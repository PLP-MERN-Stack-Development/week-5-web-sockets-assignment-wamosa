import { useState } from 'react';
import ChatRoom from './components/ChatRoom';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setJoined(true);
    }
  };

  if (!joined) {
    return (
      <form onSubmit={handleJoin} className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Enter your username</h2>
        <input
          className="w-full border px-2 py-1 mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded" type="submit">Join Chat</button>
      </form>
    );
  }

  return <ChatRoom username={username} />;
}

export default App;
