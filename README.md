# MTG-MetaSyn React App (WIP)

## Overview (MVP)

A ReactJS frontend for the MTG MetaSyn web app. The goal of this project is to explore ReactJS, ThreeJS, and Python together in an application that provides a unique experience for finding synergistic relationships between playing cards from Magic: The Gathering based on card properties and game mechanics that they interact with.

Users will be able to enter search criteria (including colors, keywords, type, and sets) which is used to filter card data (provided by magicthegathering.io's API) and then display related cards. Search results are displayed in a 3D space with each card represented as an "orb", floating in a position determined by it's Color Identity (as defined in api.magicthegathering.io) and Converted Mana Cost as shown below.

When a card is selected by the user, the displayed "orbs" are filtered based upon their "synergy" with the selected card, leaving only "synergistic" cards.

![MTG Visualizer screenshot](./img/screenshot.png)

The app is built with ReactJS and uses [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to render a 3D GUI with [three.JS](https://threejs.org/) to display a 3D space in which the user can navigate through and examine the card results. The "cards" are rendered as orbs located at various points throughout the 3D scene, which will be positioned according to their relationship with each of the other "cards". This will give the user a visual reference for the amount of "synergy" between cards.

## Data Sources

This app uses data provided by the fine folks at Wizards.com and mtgjson.com

## Future Improvements

- Implement _Color_ filter functionality (currently not working)
- Implement _Keyword_ filter functionality (currently not working)
- Change ThreeJS _OrbitControls_ to _FlyControls_ (or similar variant) to improve UX
- Add 2+ color mana textures to orbs (currently only using single-color textures, forcing multicolor cards to be shown with only one of their colors as its texture).
- Redesign Plane component (i.e. add thematic texture(s), and possibly 3D models)
- Add ability to select multiple orbs at once for additional card analysis
- Add UI elements that display key synergy-related data about selected card(s)

### Decklist Import

In the future, could add a Decklist Import feature to allow users to upload decklists and have a visual reference for the relationships between the cards in their decks. This feature could also include a graph displaying the deck's Mana Curve and other deck information.

## Development Setup

_Note: This repo contains only the frontend ReactJS app. Full functionality requires the [Python server](https://github.com/TeeWeb/MTG-MetaSyn-PyServer) to run as the backend service_

## Setting up local SSL cert for development environment

Follow the instructions in [this helpful article](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/) to create an SSL cert for your local dev environment and enable use of https requests to your local server app instance. For the smoothest experience, use `-keyout server.key` when generating your cert to match the naming convention used in the app's `start` script. Otherwise, update the `start` script to reference your custom key and cert filenames.

Once you've completed these steps, use the `yarn start` command to. [See this article](https://blog.bitsrc.io/using-https-for-local-development-for-react-angular-and-node-fdfaf69693cd) for more information on using self-signed SSL certs during frontend development.

_Note: The same self-signed cert and key used for this local instance of the server will also need to be provided to the backend server to enable full functionality during development._

### Frontend (ReactJS)

- Change directory to /app and setup frontend app: `cd ./app`
- Install dependencies: `yarn install`
- Start app: `yarn start`
