import React from 'react';
import { runInThisContext } from 'vm';
import styles from './style.scss';
const results = require ('../../../../results.js');

class Search extends React.Component {

  constructor(){
    super();
    this.state= {
      inputValue: ""
    };
    this.changeHandler = this.changeHandler.bind( this );
    this.showCard = this.showCard.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
  }

  changeHandler(event) {
    this.setState({inputValue:event.target.value})
  }

  showCard() {

    return this.props.searchResults.map(item => {
      return (
        <div>
          <img src={item.show.image.medium} /> <br />
          <h1>{item.show.name}</h1>
        </div>
      )
    })
  }

  clickHandler(event) {
    this.props.clicky(this.state.inputValue)
  }
  render() {
    return (
      <div>
        <input id="searchInput" type="text" onChange={this.changeHandler} />
        <button onClick={this.clickHandler}>Click Me</button>
        <div className={styles.allShowCards}>
          {this.showCard()}
        </div>
      </div>
    )
  }
}

class Main extends React.Component {

  constructor(){
    super();
    this.searchCurrentValue = this.searchCurrentValue.bind(this);
    this.state = {
      allResults: results,
      result: []
    };

  };

  searchCurrentValue(searchValue) {
    let returnArray = [];
    
    for (let i = 0; i < this.state.allResults.length; i++) {
      if (this.state.allResults[i]["show"]["name"].includes(searchValue)) {
        returnArray.push(this.state.allResults[i]);
      };
    };

    this.setState({result: returnArray});
  };

  render() {

    return(
      <div>
        <h1>TV Maze React</h1>
        <Search searchResults={this.state.result} clicky={this.searchCurrentValue} />
      </div>
    )
  }
}

export default Main;

