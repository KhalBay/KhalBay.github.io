# Hi! This is my portfolio

## You can see a demo [here](https://khalbay.github.io).

## How the game was created:

### First stage playing field and markings

- I decided to make a playing field 400x400 cells.
- Cells will be in chunks. There are 100 cells in one chunk.
- And the field itself consists of 4x4 chunks
- Each chunk is responsible for a separate room, for example start or finish or empty.
- From all this will consist of 1 level of the game. Which will use procedural generation to generate rooms.

### The second stage is procedural level generation

- I have implemented procedural generation via `Math.random()`.
- To begin with, I determined that I need at least 7 rooms to create a full level.
  <img src="public\generate_room.gif"/>

other...

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
