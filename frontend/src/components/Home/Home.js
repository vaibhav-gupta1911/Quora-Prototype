import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import "./Home.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    //iterate over books to create a table row
    console.log("in course:" + this.props.match.params.Id);
    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <HomeSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
            <div className="card questionCard">
              <div>
                <div>
                  <span>
                    <div className="hover-menu ">
                      <div className="hover-menu-contents askheader">
                        <Link to="#profileImage">
                          <span className="expanded">
                            <span className="photoWrapper homex">
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
                              <Link to="/profile" className="user">
                                Laxmikant Pandhare.
                              </Link>
                              <br />
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </span>
                </div>
                {/*below will get an pop up*/}
                <Link
                  to="/dashboard"
                  onClick={this.togglePopup.bind(this)}
                  className="AskQuestionButton"
                >
                  What is your question or link ?
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
