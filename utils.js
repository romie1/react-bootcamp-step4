import { GAME_SYMBOLS, ROW_COLUMN_CELLS_COUNT } from './const';

/**
 * Dato un array in ingresso questa funzione restituisce l'array stesso dopo aver
 * modificato in maniera randomica la posizione iniziale di ciascun elemento
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * La seguente funzione crea la matrice che rappresenta la board di gioco.
 */
export const buildGameBoard = () => {
  const board = [];

  // Generiamo l'insieme di tutti gli oggetti che rappresentano le carte del gioco e rappresentati tramite una matrice (array di array).

  // GAME_SYMBOLS rappresenta la lista delle possibili singole carte del gioco, ad ogni elemento in GAME_SYMBOLS (carta) è associato un id (a,b,c,d...) ed un colore.

  // Il memory game prevede di accoppiare progressivamente le carte trovando le carte uguali fino a che tutte le carte non sono state accoppiate.
  // Per praticità creiamo una board di 16 carte in totale, ovvero 8 coppie e costituita da 4 righe di 4 colonne
  const gameCards = GAME_SYMBOLS.splice(
    0,
    (ROW_COLUMN_CELLS_COUNT * ROW_COLUMN_CELLS_COUNT) / 2
  )
    .map((sym) => {
      return [sym, sym];
    })
    .flat();

  // A questo punto "mischiamo" l'insieme delle carte in modo casuale, ottenendo un insieme uguale a quello di partenza ma ordinato in maniera randomica
  const randomCards = shuffleArray(gameCards);

  // Riempiamo ora la struttura dati che permetterà di:
  // - costruire la board di gioco (una griglia di ROW_CELLS_COUNT x ROW_CELLS_COUNT carte)
  // - tenere traccia dell'andamento del gioco (quali carte sono state accoppiate)

  // riempiamo le righe delle matrice
  for (let i = 0; i < ROW_COLUMN_CELLS_COUNT; i++) {
    board.push([]);
    // riempiamo le colonne della matrice
    for (let j = 0; j < ROW_COLUMN_CELLS_COUNT; j++) {
      board[i].push({
        selected: false,
        symbol: randomCards.pop(), // randomCards.pop() estrae e rimuove dalla lista di carte la prima carta
        row: i,
        column: j,
      });
    }
  }

  return board;
};
