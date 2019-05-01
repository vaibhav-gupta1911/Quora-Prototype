import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./HomeSideBar.css";
class HomeSideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("sidebarprops:" + this.props.id);
    return (
      <div className="homeSidebarWrapper">
        <div className="homeSidebarInner">
          <ul className="sidebarList">
            <li className="SwitcherItemWithImage">
              <Link
                to={`/courses/${this.props.id}/Home`}
                className="swictherLink"
              >
                <div className="switcherImgWrapper">
                  <div className="swictherImg" />
                </div>
                <label>Feed</label>
              </Link>
            </li>
            {/* apply map here for topic */}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeSideBar);
