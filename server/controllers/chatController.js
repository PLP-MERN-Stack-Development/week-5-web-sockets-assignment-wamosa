const { users, messages } = require('../sockets/chatHandlers');

function getMessages(req, res) {
  res.json(messages);
}

function getUsers(req, res) {
  res.json(Object.values(users));
}

module.exports = { getMessages, getUsers };
