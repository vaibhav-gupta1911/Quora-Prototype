import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ConversationsRoute from "./components/Message/ConversationsRoute";
//import Interest from "./Components/Interests/Interests";
import "./App.css";
import ConversationsList from "./components/Message/ConversationsList";
import DisplayMessage from "./components/Message/DisplayMessage";
import CreateMessage from "./components/Message/CreateMessage";
import Inbox from "./components/Message/Inbox";

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/*Render Different Component based on Route*/}
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/home/inbox/createmessage" component={CreateMessage}/>
            <Route path="/home/inbox/displaymessages" component={DisplayMessage}/>
            <Route path="/home/inbox/:_id" component={Inbox}/>
            <Route path="/home/inbox" component={ConversationsList}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;

// <Route path="/interests" component={Interest} />
