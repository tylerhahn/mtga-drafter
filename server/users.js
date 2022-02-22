//Array of users
const users = [];

const addUser = (res) => {
  if (res && !res.userObj) return { error: "No user data found" };
  const userName = res.userObj.player_name.trim().toLowerCase();
  room = res.roomId.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === userName
  );

  //   if (!userName || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username already exists." };

  const user = { id: res.id, room: res.roomId, data: res.userObj };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  console.log(users.splice(index, 1)[0]);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
