export const returnCardUri = (card, side) => {
  const splitLayouts = ["adventure", "split"];
  if (card && card.card_faces && !splitLayouts.includes(card.layout)) {
    if (side === "front") {
      return card.card_faces[0].image_uris.png;
    } else if (side === "back") {
      return card.card_faces[1].image_uris.png;
    }
  } else if (card && card.image_uris) {
    console.log("yo");
    return card.image_uris.png;
  } else {
    console.log(card);
  }
};
