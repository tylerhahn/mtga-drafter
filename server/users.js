const _ = require("lodash");
const axios = require("axios");
//Array of users
const users = [];

const addUser = (res) => {
  if (res && !res.userObj) return { error: "No user data found" };
  const userName = res.userObj.player_name.trim().toLowerCase();
  room = res.roomId.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.data.player_name === userName
  );

  //   if (!userName || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username already exists." };

  const user = { id: res.id, room: res.roomId, data: res.userObj };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const constructCardPool = (room) => {
  let allCards = [];
  let findSharedCards;
  const usersInRoom = getUsersInRoom(room);
  if (usersInRoom.length <= 1) return usersInRoom[0].data.cards;
  _.map(usersInRoom, (user, index) => {
    allCards.push(...user.data.cards);
    if (index === usersInRoom.length - 1) {
      findSharedCards = allCards.reduce((a, e) => {
        a[e.grpid] = ++a[e.grpid] || 0;
        return a;
      }, {});
    }
  });

  const sharedCollection = allCards.filter((e) => findSharedCards[e.grpid]);
  return sharedCollection;
};

const getPacks = (room) => {
  const rawCardPool = constructCardPool(room);
  let cardPool = [];

  let promises = [];

  if (rawCardPool) {
    _.map(rawCardPool, (card, index) => {
      promises.push(
        axios.get(`https://api.scryfall.com/cards/arena/${card.grpid}`)
      );

      if (index === cardPool.length - 1) {
        Promise.allSettled(promises).then((res) => {
          _.map(res, (o, i) => {
            const cardData = o.value.data;
            if (!cardData.type_line.includes("Land")) {
              cardPool.push(...cardData);
              if (i === res.length - 1) {
                console.log(cardPool.length);
              }
            }
          });
        });
      }
    });
  }

  // const rares = _.filter(cardPool, { rarity: "common" });
  // console.log(cardPool[1]);

  // const shuffled = cardPool.sort(() => 0.5 - Math.random());
  // let selected = shuffled.slice(0, 15);

  // console.log(selected.length);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  constructCardPool,
  getPacks,
};
