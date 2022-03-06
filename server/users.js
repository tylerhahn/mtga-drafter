const _ = require("lodash");
const axios = require("axios");
const { cardDb } = require("./scryfall.js");
const { result } = require("lodash");
const e = require("express");

//Array of users
let users = [];
let boosters = [];

const addUser = (res) => {
  if (res && !res.userObj) return { error: "No user data found" };
  const userName = res.userObj.player_name.trim().toLowerCase();
  room = res.roomId.trim().toLowerCase();

  //s
  // const existingUser = users.find(
  //   (user) => user.room === room && user.data.player_name === userName
  // );

  const existingUser = _.find(users, (x) => {
    return x.room === room && x.data.player_name.toLowerCase() === userName;
  });

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
    playerId: res.userObj.player_id,
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

const destroyRoom = (room) => {
  console.log("detroyed");
  users = [];
  boosters = [];
};

const draftCard = (id, card, packId, round, freshPack, playerId) => {
  let roomUsers = [...users];

  let draftUser = _.findIndex(users, { playerId: playerId });
  //add card to users' drafted cards
  const draftedCards = [...roomUsers[draftUser].draftedCards, card];
  roomUsers[draftUser].draftedCards = draftedCards;
  const boosterIndex = _.findIndex(boosters, { packId: packId, round: round });
  //remove card from booster
  if (!freshPack) {
    const boosterPack = [...boosters[boosterIndex].pack];
    const cardIndex = _.findIndex(boosterPack, { arena_id: card.arena_id });
    boosterPack.splice(cardIndex, 1);
    boosters[boosterIndex].pack = boosterPack;
  }
  return boosters[boosterIndex];
};
const getBooster = (user, pick, round, room) => {
  const findBooster = _.filter(boosters, (x) => {
    return (
      x.pack.length === pick && x.round === round && !x.user && x.room === room
    );
  });
  findBooster[0].user = user.id;
  return findBooster[0];
};
const getPacks = async (room, sets) => {
  let cardPool = [];
  try {
    let rawCardPool = constructCardPool(room);

    try {
      _.map(rawCardPool, (card, index) => {
        const scryfallCard = _.find(cardDb, { arena_id: card.grpid });
        if (scryfallCard && sets.includes(scryfallCard.set)) {
          cardPool.push(scryfallCard);
        }
      });
      try {
        const players = getUsersInRoom(room).length;
        for (let roundIndex = 0; roundIndex < 3; roundIndex++) {
          for (let index = 0; index < players; index++) {
            for (let i = 0; i < 3; i++) {
              boosters.push({
                round: roundIndex + 1,
                room: room,
                packId: i,
                pack: generatePack(cardPool),
              });
            }
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
  const uncommons = _.filter(cards, (x) => {
    return x.rarity === "uncommon" && !x.type_line.includes("Land");
  });
  const commons = _.filter(cards, (x) => {
    return x.rarity === "common" && !x.type_line.includes("Land");
  });
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
  destroyRoom,
  getPacks,
  draftCard,
};
