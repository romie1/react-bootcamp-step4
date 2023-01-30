import React, { useEffect, useState } from 'react';
import { SHE_TECH_LOGO } from './const';
import { buildGameBoard } from './utils';
import './reset.css';
import './style.css';

/**
 * Step 4:
 *
 * A questo punto, cliccando sulla seconda carta, bisogna fare un controllo per verificare se le due carte girate combaciano.
 * Per determinare se due carte combaciano possiamo controllare che card1.symbol.id sia uguale a card2.symbol.id
 *
 * Aggiungiamo una nuova variabile di stato (utilizzando useState) che chiameremo matches, inizialmente di valore 0, che incrementeremo ogni qualvolta girando due carte si verifica il match sopra descritto. Al contrario, se l'utente non ha trovato la coppia giusta ,bisognerà rigirare le due carte in questione.
 *
 * Siccome questa operazione andrà fatta solo nel momento in cui il giocatore ha selezionato due carte dobbiamo controllare la quantità di elementi contenuti nell'array "selections" che noi avevamo definito in precedenza come variabile di stato.
 * Per tener traccia di cambiamenti nelle variabili di stato, React ci offre l'hook useEffect(), che accetta come primo parametro una funzione.
 * Come secondo parametro invece avremo un array contenente tutte le variabili che vogliamo "osservare", ovvero controllare un loro eventuale cambio di valore e nel momento in cui questo accade far partire la funzione che abbiamo passato come primo parametro allo useEffect.
 * */
const Board = () => {
  const [board, setBoard] = useState(buildGameBoard());
  const [selections, setSelections] = useState([]);
  const counter = 0;
  const [matches, setMatches] = useState(counter);

  const onCardClick = (evt, rowIdx, cellIdx) => {
    if (selections.length === 2) {
      console.log('Dentro IF ::: ', selections);
      if (selections[0].symbol.id !== selections[1].symbol.id) {
        console.log('Dentro IF due cards selected ::: ', selections);
        setBoard((prevBoard) => {
          prevBoard[selections[0].row][selections[0].column].selected = false;
          prevBoard[selections[1].row][selections[1].column].selected = false;
          setSelections([]);
          console.log('Dentro setBoard ::: ', selections);
          return [...prevBoard];
        });
      } else {
        console.log('Dentro ELSE due cards selected ::: ', selections);
        setMatches((prevMatches) => {
          setSelections([]);
          console.log('Dentro ELSE due cards selected ::: ', selections);
          return prevMatches + 1;
        });
      }
      return;
    }

    setBoard((prevBoard) => {
      const card = prevBoard[rowIdx][cellIdx];
      card.selected = true;
      setSelections([...selections, card]);
      return [...prevBoard];
    });
  };

  useEffect(
    () => {
      console.log('Dentro useEffect ::: ', matches);
      setBoard((prevBoard) => {
        console.log('Dentro setBoard ::: ', prevBoard);
        return [...prevBoard];
      });
    }, //primo parametro, funzione che viene eseguita quando uno degli elementi indicato nel secondo parametro cambia
    [matches] // secondo parametro, elenco di variabili di stato da osservare (in questo frangente a noi interessa unicamente selections)
  );

  return (
    <div className="game-board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="game-board-row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`game-board-cell ${
                cell.selected ? 'game-board-cell-flipped' : ''
              }`}
            >
              <div
                className="play-card"
                onClick={(evt) => onCardClick(evt, rowIdx, cellIdx)}
              >
                <div className="play-card-front">
                  <img src={SHE_TECH_LOGO} />
                </div>
                <div
                  className="play-card-back"
                  style={{ backgroundColor: `${cell.symbol?.color}` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="container">
      <Board />
    </div>
  );
}
