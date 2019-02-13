import './App.css';

import React from 'react';
import {Route} from 'react-router-dom';

import Menu from "./app/Menu";
import Component from "./app/common/Component";
import Index from "./app/common/Index";

import HomePage from "./app/home/HomePage";
import PersonsPage from "./app/person/PersonsPage";
import PersonPage from "./app/person/PersonPage";
import PersonPetPage from "./app/person/PersonPetPage";
import LoginPage from "./app/LoginPage";


class App extends Component {

  static index;
  static token;

  constructor(props) {
    super(props);
    this.setIndex = this.setIndex.bind(this);
    this.load();
  }

  load() {
    Index.load()
      .then(this.setIndex)
      .catch(this.onApiError);
  };

  setIndex(index) {
    App.index = index;
    this.setState({
      index: index
    });
  }

  render() {
    const index = this.state.index;
    if (index) {
      return (
        <div className="container">
          <Menu/>

          <div className="main">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/persons" component={PersonsPage}/>
            <Route exact path="/persons/:key" component={PersonPage}/>
            <Route exact path="/persons/:personKey/pets/:petKey" component={PersonPetPage}/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
