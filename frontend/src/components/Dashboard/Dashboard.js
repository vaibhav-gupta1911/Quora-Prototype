import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Answer from "../Answer/Answer";
import "../../App.css";
import "./Dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state = {
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  
  //Dummy componenet did mount
  render() {
    return (
      <div>
        <Navbar />

        <div className="page-content">

        
        <div>

        <div className="card questionCard">
  <div >
  <div>
  <span>
    <div className="hover-menu ">
      <div className="hover-menu-contents">
        <Link to="#profileImage" className="navItemLink">
          <span className="expanded">
            <span className="photoWrapper">
              <div id="#123">
                <span className="photo-tooltip">
                  <img
                    className="profileImage"
                    height="50px"
                    width="50px"
                    src={`https://qph.fs.quoracdn.net/main-thumb-70332528-50-qpikqkavbsrjbupveiqfitmnpiraxvsw.jpeg`}
                  />
                </span>
              </div>
            </span>       
            <span> 
            <Link to='/profile'>Laxmikant Pandhare.</Link><br/>  
            </span>
          
          </span> 

        </Link>
      </div>
    </div>  
  </span>
</div>
  {/*below will get an pop up*/}
    <Link to='/dashboard' onClick={this.togglePopup.bind(this)}>What is your question or link ?</Link>
  </div>
</div>

        </div>
        
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/Answer" component={Answer} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Dashboard));
