const users = {};
const messages = [];
const typingUsers = {};

function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', ({username, room}) => {
      users[socket.id] = { username, id: socket.id, room };
      socket.join(room)
      io.to(room).emit("user_list", getUsersInRoom(room));
      io.to(room).emit('user_joined', {username, id: socket.id, room});
      console.log(`${username} joined the chat`);
    });

    socket.on('send_message', ({message, room}) => {
      const msg= {
        id: Date.now(),
        sender: users[socket.id].username,
        message,
        timestamp: new Date().toISOString(),
        room,
      };

      io.to(room).emit('receive_message', msg)
    });

    socket.on('typing', (isTyping) => {
      if (users[socket.id]) {
        const username = users[socket.id].username;
        isTyping ? typingUsers[socket.id] = username : delete typingUsers[socket.id];
        io.emit('typing_users', Object.values(typingUsers));
      }
    });

    socket.on('private_message', ({ to, message }) => {
      const msg = {
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message,
        timestamp: new Date().toISOString(),
        isPrivate: true
      };
      socket.to(to).emit('private_message', msg);
      socket.emit('private_message', msg);
    });

    socket.on('disconnect', () => {
      const user = users[socket.id];
      if (user) {
        io.emit('user_left', user);
        delete users[socket.id];
        delete typingUsers[socket.id];
        io.emit('user_list', Object.values(users));
        io.emit('typing_users', Object.values(typingUsers));
      }
    });
  });
}

module.exports = { registerSocketHandlers, users, messages };
