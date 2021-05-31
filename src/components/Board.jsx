import React, { useState } from "react";
import { data, statuses } from "../data";
import List from './List'
import './Board.css';

function Board() {
  const [cards, setCards] = useState(data);
  const [newCard, setNewCard] = useState({
    id: 0,
    status: "",
    content: ""
  });
  const [compose, setCompose] = useState({
    "To Do": false,
    "In Progress": false,
    "QA": false,
    "Done": false
  });
  const [errors, setErrors] = useState([])

  const toggleCompose = (status) => {
    if (compose[status.title]) {
      setCompose(prevState => ({ ...prevState, [status.title]: false}))
    } else {
      setCompose(prevState => ({ ...prevState, [status.title]: true}))
    }
}

  const updateText = (e, status) => {
    setNewCard({
      id: Date.now(),
      status,
      content: e.target.value,
    })
  }

  const addCard = (e) => {
    e.preventDefault();
    if (newCard.content === "") {
      let newArr = [];
      newArr.push("Please enter some text.");
      const newErrors = errors.concat(newArr);
      setErrors(newErrors)
    } else {
      let newArr = [];
      newArr.push(newCard)
      const newCards = cards.concat(newArr);
      setCards(newCards);
      setNewCard({status: "", content: ""});
      setCompose(false);
    }
  }

  const resetInput = () => {
    compose ? setCompose(false) : setCompose(true);
    setNewCard({ content: "" });
    setErrors([])
  }

  const handleDelete = (deletedItem) => {
    let newCards = [...cards];
    newCards = newCards.filter(card => {
      return card.id !== deletedItem.id;
    });
    setCards(newCards);
  }

  const onDragStart = (e, id, position) => {
    e.dataTransfer.setData("id", id);
  }

  const onDragOver = (e, position) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const onDrop = (e, status) => {
    e.stopPropagation();
    e.preventDefault();
    let id = parseInt(e.dataTransfer.getData("id"));

    let newCards = cards.filter((card) => {
      if (card.id === id) {
        card.status = status.title;
      } return card;
    })
    setCards(newCards)
  }

  return (
    <div id="board">
        {statuses.map(status => {
            return (
              <div className="list-container" key={status.title}>
                <div
                  className="droppable"
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => onDrop(e, status)}
                >
                  <List
                    cards={cards}
                    status={status}
                    newCard={newCard}
                    compose={compose}
                    errors={errors}
                    handleDelete={handleDelete}
                    onDragStart={onDragStart}
                    toggleCompose={() => toggleCompose(status)}
                    updateText={updateText}
                    addCard={addCard}
                    resetInput={resetInput}
                  />
                </div>
              </div>
            );
        })}
    </div>
  );
}

export default Board;