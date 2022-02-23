const _ = require("lodash");
const axios = require("axios");
const { cardDb } = require("./scryfall.js");
const { result } = require("lodash");
const e = require("express");
//Array of users
const users = [];
const boosters = [];

const addUser = (res) => {
  if (res && !res.userObj) return { error: "No user data found" };
  const userName = res.userObj.player_name.trim().toLowerCase();
  room = res.roomId.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.data.player_name === userName
  );

  const determineHost = _.find(users, { host: true });

  //   if (!userName || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username already exists." };

  const user = {
    host: determineHost ? false : true,
    id: res.id,
    round: 1,
    pick: 15,
    room: res.roomId,
    data: res.userObj,
    draftedCards: [],
  };

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

const draftCard = (cardId, user, room) => {};

const getBooster = (user, pick, round, room) => {
  const findBooster = _.filter(boosters, (x) => {
    return (
      x.pack.length === pick && x.round === round && !x.user && x.room === room
    );
  });
  findBooster[0].user = user.id;
  return findBooster[0];
};

const getPacks = async (room) => {
  let cardPool = [];

  try {
    const rawCardPool = constructCardPool(room);
    try {
      _.map(rawCardPool, (card, index) => {
        const scryfallCard = _.find(cardDb, { arena_id: card.grpid });
        if (scryfallCard) {
          cardPool.push(scryfallCard);
        }
      });

      try {
        const players = getUsersInRoom(room).length;

        for (let index = 0; index < players; index++) {
          let roundPacks = [];

          for (let index = 0; index < 3; index++) {
            boosters.push({
              round: index + 1,
              room: room,
              packId: index,
              pack: generatePack(cardPool),
            });
          }
        }

        return boosters;
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

function pullRandomCards(cards, amount) {
  const shuffled = cards.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, amount);

  return selected;
}

function generatePack(cards) {
  const rares = _.filter(cards, (x) => {
    return x.rarity === "rare" || x.rarity === "mythic";
  });

  const uncommons = _.filter(cards, { rarity: "uncommon" });

  const commons = _.filter(cards, { rarity: "common" });

  const packRares = pullRandomCards(rares, 1);
  const packUncommons = pullRandomCards(uncommons, 3);
  const packCommons = pullRandomCards(commons, 11);

  const pack = [...packRares, ...packUncommons, ...packCommons];

  return pack;
}

module.exports = {
  addUser,
  getBooster,
  removeUser,
  getUser,
  getUsersInRoom,
  constructCardPool,
  getPacks,
};
