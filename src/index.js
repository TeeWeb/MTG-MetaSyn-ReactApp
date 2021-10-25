import React, { useState, useEffect, Suspense } from "react";
import { render } from "react-dom";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import mtg from "mtgsdk";

import Controls from "./Components/Controls";
import Plane from "./Components/Plane";
import GUI from "./Components/GUI";
import Overlay from "./Components/Overlay";

let API;
if (process.env.NODE_ENV === "development") {
  API = "http://localhost:5000";
} else {
  API = "http://mtg-metasyn.externull.com";
}

const App = () => {
  const [cards, setCards] = useState([]);
  const [overlayData, setOverlayData] = useState([]);

  const origins = {
    colorless: [0, 0, 0],
    white: [0, 0, 100],
    blue: [95, 0, 31],
    black: [-59, 0, -81],
    red: [59, 0, -81],
    green: [-95, 0, -31],
  };

  async function requestCards(
    activeColors,
    colorOperator,
    cardSet,
    keyword,
    type,
    subtype
  ) {
    const filteredCards = [];
    const cardData = await mtg.card
      .where({
        set: cardSet,
        text: keyword,
        types: type,
        subtypes: subtype,
      })
      .then((res) => {
        console.log(res);
        return res;
      });

    cardData.forEach((card) => {
      if (card.imageUrl) {
        filteredCards.push(card);
      } else {
        // Use back of card for Overlay image if no card image available
        card.imageUrl =
          "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg?version=0ddc8d41c3b69c2c3c4bb5d72669ffd7";
        filteredCards.push(card);
      }
    });
    setCards(filteredCards);
  }

  const updateOverlayData = (id) => {
    setOverlayData();
    let overlayCard;
    cards.forEach((card) => {
      if (card.id === id) {
        overlayCard = card;
      }
    });
    if (!overlayCard) {
      console.log("Unable to find card ID for Overlay data");
    } else {
      setOverlayData(overlayCard.imageUrl);
    }
  };

  useEffect(() => {
    setCards([]);
  }, [setCards]);

  return (
    <div>
      <Canvas
        shadowMap
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["gray", 250, 400]} />
          <Controls />
          <Plane
            cards={cards}
            origins={origins}
            handleUpdateOverlayData={(name, imageUrl) =>
              updateOverlayData(name, imageUrl)
            }
          />
          <ambientLight intensity={0.75} />
          <spotLight position={[0, 100, 150]} penumbra={0.15} castShadow />
        </Suspense>
      </Canvas>
      <GUI host={API} handleUpdateCards={() => requestCards} />
      <Overlay imageUrl={overlayData} />
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
