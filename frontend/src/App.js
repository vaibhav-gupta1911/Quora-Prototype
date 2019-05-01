import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./components/Signup/Signup";
import Interests from "./components/Interests/Interests";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import ConversationsList from "./components/Message/ConversationsList";
import CreateMessage from "./components/Message/CreateMessage";
import Inbox from "./components/Message/Inbox";
import Photo from "./components/Message/ConversationsList";
import 'react-router-modal/css/react-router-modal.css';
import { ModalContainer, ModalRoute, Modal } from 'react-router-modal';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/signup"
                render={props => <Signup {...props} />}
              />
              <Route exact
                path="/interests"
                render={props => <Interests {...props} />}
              />
              <Route path="/home/inbox/createmessage" component={CreateMessage}/>
            {/* <Route path="/photo" component={Photo}/> */}
            {/* <Route path="/home/inbox/displaymessages" component={DisplayMessage}/> */}
            {/* <Route path="/home/inbox/:_id" component={Inbox}/> */}
            {/* <ModalRoute path='/home/inbox/:_id' component={Inbox} /> */}
            <Route path="/home/inbox" component={ConversationsList}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
