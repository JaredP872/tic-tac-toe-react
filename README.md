# tic-tac-toe-react

In this React Tic-Tac-Toe game, components, props, and state work together in order to manage the game's logic and User interface.

Components are used to build the user interface. My tic-tac-toe game has three main components.

- My square components that represent a single square in the Tic-Tac-Toe board.

- A board component that represents the 3x3 Tic-Tac-Toe board.

- And finally, the game component that manages the state and logic of the game. For example this stops the game if there is already a winner.

The Props in my game allow data to pass from parent to child components

- For example the Board parent component passes the data onSquareClick to the Square child component in order for it to handle the square click event.

Finally State stores data that changes over time and triggers User Interface updates when modified.

How it works within my tic-tac-toe game:

- My Game component holds the history of all board states and the currentMove index.

When a move is made:

- A new state is created (copying the existing history).
- The move is recorded in the new state.
- The game updates (setHistory and setCurrentMove trigger a re-render).
- The Board receives the latest squares array via props and displays it
