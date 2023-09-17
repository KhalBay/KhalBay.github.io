# Hi! This is my portfolio💻. It is the game 2048. You can see a demo [here](https://khalbay.github.io/).

## I made this game using the following technologies:
````
Vue 3
TypeScript
Linter
````
### Enjoy and win 🥇 I believe in you!

## How is the game made?
All logic is in the game2048 folder. And here there are only 2 vue files.
````
--components
  ∟ game2048 // The whole game is here
  ∟ gameDungeon // This game is under development
````
The main file is **GameNumbers.vue**. It contains all the logic from building 
a grid to moving or adding tiles. I also use v-for and the **TileNumbers.vue** 
component to display each cell. And I am using different classes to display the 
cell color.




[//]: # (## How the game was created:)

[//]: # ()
[//]: # (### First stage playing field and markings)

[//]: # ()
[//]: # (- I decided to make a playing field 400x400 cells.)

[//]: # (- Cells will be in chunks. There are 100 cells in one chunk.)

[//]: # (- And the field itself consists of 4x4 chunks)

[//]: # (- Each chunk is responsible for a separate room, for example start or finish or empty.)

[//]: # (- From all this will consist of 1 level of the game. Which will use procedural generation to generate rooms.)

[//]: # ()
[//]: # (### The second stage is procedural level generation)

[//]: # ()
[//]: # (- I have implemented procedural generation via `Math.random&#40;&#41;`.)

[//]: # (- To begin with, I determined that I need at least 7 rooms to create a full level.  )

[//]: # (<img src="public/gifs/procedural_level_generation.gif"/>)

[//]: # (- The next step was to define the first 2 types of chunks - "start" - green and "finish" - red.  )

[//]: # (<img src="public/gifs/two_rooms_start_and_finish.gif"/>)

[//]: # (- Next, the most difficult thing is to make the procedural generation of the room inside the chunk. Here you need to have at least 16 tiles of which then there will be a 2x2 room surrounded by walls.)

[//]: # (<img src="public/gifs/generate_room.gif"/>)

[//]: # (- Here I used Dijkstra's algorithm to build the room tile by tile until the number generated to build the room runs out.)

[//]: # (- Here the function is divided into 2 parts, first we fill only half of the total number of the room, then I calculate the boundaries of the walls and fill in the rest to make a rectangle.)

[//]: # (<img src="public/gifs/Dijkstra's_algorithm.gif"/>)

[//]: # ()
[//]: # (other...)

[//]: # ()
[//]: # (```sh)

[//]: # (npm install)

[//]: # (```)

[//]: # ()
[//]: # (### Compile and Hot-Reload for Development)

[//]: # ()
[//]: # (```sh)

[//]: # (npm run dev)

[//]: # (```)

[//]: # ()
[//]: # (### Type-Check, Compile and Minify for Production)

[//]: # ()
[//]: # (```sh)

[//]: # (npm run build)

[//]: # (```)
