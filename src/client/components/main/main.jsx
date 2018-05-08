import React from 'react';
import { runInThisContext } from 'vm';
import styles from './style.scss';
const results = require ('../../../../results.js');
const util = require ('./util.js')


class Search extends React.Component {

  constructor(){
    super();
    this.state= {
      inputValue: "",
      showItems: 5
    };
    this.changeHandler = this.changeHandler.bind( this );
    this.showCard = this.showCard.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.fullScheduleHandler = this.fullScheduleHandler.bind( this );
    this.showFullSchedule = this.showFullSchedule.bind( this );
  }

  changeHandler(event) {
    this.setState({inputValue:event.target.value})
  }

  showCard() {

    return this.props.searchResults.map(item => {
      if (item.show.image == null) {
        return (
          <div>
          <h1>{item.show.name}</h1>
          </div>
        )
      } else {
        return (
          <div>
            <img src={item.show.image.medium} /> <br />
            <h1>{item.show.name}</h1>
          </div>
        )
      }
    })
  }

  showFullSchedule() {

    console.log("full Scheldule", this.props.searchResults)
    for (let i = 0; i < this.state.showItems; i ++) {

      if (this.props.searchResults[i].image == null) {

        return (
          <div>
            <h1>{this.props.searchResults[i].name}</h1>          
          </div>
        )

      } else {
        return (
                <div>
                  <img src={this.props.searchResults[i].image.medium} /> <br />
                  <h1>{this.props.searchResults[i].name}</h1>
                </div>
        )
      }
    }
    // return this.props.searchResults.map(item => {
    //   if (item.image == null) {
    //     return (
    //       <div>
    //       <h1>{item.name}</h1>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <img src={item.image.medium} /> <br />
    //         <h1>{item.name}</h1>
    //       </div>
    //     )
    //   }
    // })
  }

  fullScheduleHandler() {
    this.props.fullScheduleClicky();
  }

  clickHandler(event) {
    this.props.clicky(this.state.inputValue)
  }

  //Infinite Scrolling Start

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      let noOfItemsToShow = this.state.showItems
      noOfItemsToShow = noOfItemsToShow + 5
      setState({showItems: noOfItemsToShow})
    }
  }

  //END infinite scroll
  render() {

    if (this.props.showFullScheduleCards == true) {
      return (
        <div>
          <input id="searchInput" type="text" onChange={this.changeHandler} />
          <button onClick={this.clickHandler}>Search</button>
          <br />
          <button onClick={this.fullScheduleHandler}>Show Full Schedule</button>
          <div className={styles.allShowCards}>
            {this.showFullSchedule()}
          </div>
        </div>
      )

    } else {
      return (
        <div>
          <input id="searchInput" type="text" onChange={this.changeHandler} />
          <button onClick={this.clickHandler}>Search</button>
          <br />
          <button onClick={this.fullScheduleHandler}>Show Full Schedule</button>
          <div className={styles.allShowCards}>
            {this.showCard()}
          </div>
        </div>
      )
    }
  }
}

class Main extends React.Component {

  constructor(){
    super();
    this.searchCurrentValue = this.searchCurrentValue.bind(this);
    this.showFullSchedule = this.showFullSchedule.bind(this);
    this.consoleLogButton = this.consoleLogButton.bind(this);
    this.state = {
      result: [],
      hasError: false,
      showFullScheduleCards: false,
      noOfFullScheduleItems: 4
    };
    this.errorCounter = 0;

  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
    console.log(error, info);
    // use a manual counter to count errors
    this.errorCounter = this.errorCounter + 1;
  };

  searchCurrentValue(searchValue) {

    this.setState({showFullScheduleCards: false});
    util.queryTVMazeAPI(searchValue, (res) => {this.setState({result: res})})

  };

  showFullSchedule() {

    this.setState({showFullScheduleCards: true});
    util.queryTVMazeAPIFull((res) => {console.log("mainCompo:" , res); this.setState({result: res})})
  }

  consoleLogButton() {
    console.log(this.state.result)
  }


  render() {
    if( this.state.hasError === true ){
      return (
        <div>
          <h1>TV Maze React</h1>
          <p>Whoops, something went wrong!</p>
        </div>
      )
      
    } else {
      return(
        <div>
          <button onClick={this.consoleLogButton}>Console it</button>
          <h1>TV Maze React</h1>
          <Search searchResults={this.state.result} clicky={this.searchCurrentValue} fullScheduleClicky={this.showFullSchedule} showFullScheduleCards={this.state.showFullScheduleCards}/>
        </div>
      )
    }
  }
}

export default Main;

