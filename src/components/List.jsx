import React from 'react';
import Card from './Card';
import './List.css';

function List({
  cards,
  status,
  newCard,
  compose,
  errors,
  handleDelete,
  onDragStart,
  toggleCompose,
  updateText,
  addCard,
  resetInput }) {

  return (
    <div id="list">
      <div>
        <h2 className="status-title">{status.title}</h2>
        {cards
          .filter((card) => card.status === status.title)
          .map((card, i) => <Card
            key={card.id}
            card={card}
            status={status}
            handleDelete={handleDelete}
            i={i}
            id={card.id}
            onDragStart={(e) => onDragStart(e, card.id, i)}
            draggable
          />)
        }
        {compose[status.title] === true &&
        <form>
          <textarea
            placeholder="Enter a title for this card..."
            className={`card-input ${errors.length ? "error" : ""}`}
            onChange={(e) => updateText(e, status.title)}
            value={newCard.content}
            name={status.title}
          ></textarea>
          {errors.map((error) =>
            <p className="errors" key={Date.now()}>{error}</p>
          )
          }
          <button onClick={(e) => addCard(e)} className="add-card">Add Card</button>
          <button onClick={resetInput} className="ex-out"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></button>
        </form>
        }
        </div>
      <a onClick={() => toggleCompose(status.title)} className="add-another-card">+ Add another card</a>
    </div>
  );
}

export default List;