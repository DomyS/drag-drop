import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Item from "./Item";
import Target from "./Target";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import Card from "./Card";
const update = require("immutability-helper");

class App extends Component {
  state = {
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" }
    ],
    cards: [
      {
        id: 1,
        text: "Write a cool Js library"
      },
      {
        id: 2,
        text: "Make it generic enough"
      },
      {
        id: 3,
        text: "Write Readme"
      },
      {
        id: 4,
        text: "Create some examples"
      },
      {
        id: 5,
        text: "Profit"
      }
    ]
  };

  deleteItem = id => {
    this.setState(prevState => {
      let items = prevState.items;
      const index = items.findIndex(item => item.id == id);

      items.splice(index, 1);

      return { items };
    });
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              <h3>drag and drop to target</h3>
              {this.state.items.map((item, index) => (
                <Item
                  key={item.id}
                  item={item}
                  handleDrop={id => this.deleteItem(id)}
                />
              ))}
            </div>

            <Target />
          </div>
          <div className="card-container">
            <h3>drag and drop between the cards</h3>
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
