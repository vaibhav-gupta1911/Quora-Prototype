import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { displayMessages } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import "./Message.css";

class ConversationsList extends Component {
  componentDidMount() {
    localStorage.setItem("email", "lucky.singh@gmail.com");
    const email = localStorage.getItem("email");
    console.log(email);
    const data = { email: email };
    console.log(data);
    // this.props.displayMessages(data);
  }
  // createMessage = (e) => {
  //   e.preventDefault();
  //       // if(localStorage.getItem("type")==="student")
  //       // this.props.history.push(`/student/inbox/createmessage`);
  //       // else
  //       // this.props.history.push(`/teacher/inbox/createmessage`);
  //       this.props.history.push(`/home/inbox/createmessage`);
  // };
  displayMessages = (e) => {
    e.preventDefault();
    this.props.history.push(`/home/inbox/displaymessages`);
  }
  createMessage = (e) => {
    e.preventDefault();
    this.props.history.push(`/home/inbox/createmessage`);
  };
  render() {
    // let route ="home/inbox";
    //     console.log("this.props.message.viewmessages", this.props);
    //     let _id=this.props.match.params;
    //     console.log("params: ", _id);
    //     let details = (this.props.message.viewmessages||[]).map((d) => {
    //       return (
    //           <div class="small">
    //             <Link to={`/${route}/${d._id}`}>
    //             <tr>
    //               <td>Sender: {d.originalsender}</td>
    //               </tr>
    //               <tr>
    //               <td>Receiver: {d.originalreceiver}</td>
    //               </tr>
    //               <tr>
    //               <td>Time: {d.date}</td>
    //               </tr>
    //             <tr>
    //               <td>Subject: {d.subject}</td>
    //             </tr>
    //             <tr>
    //               {/* <td>Message: {d.messages}</td> */}
    //             </tr>
    //             </Link>
    //             <hr/>
    //             </div>
    //       );
    //     });
    return (
      // <div id="content">
      //   <div className="container">
      <div>
        <h2>Home page</h2>
        {/* {details} */}
        {/* <div style={{ width: "30%" }}>
                  <button
                    onClick={this.createMessage}
                    className="btn btn-success"
                    type="submit"
                  >
                    Create Message
                  </button>
                </div> */}
        {/* <div style={{ width: "30%" }}> */}
        {/* <button
                    onClick={this.displayMessages}
                    className="btn btn-success"
                    type="submit"
                  >
                    Display Message
                  </button> */}
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Display Message
                  </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ width: "600px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style={{fontSize:"19px", fontWeight:"bold", color:"#333", borderRadius:"4px 4px 0 0"}}><b>Messages</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ height: "500px" }}>
                <div>
                </div>
              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background:"transparent", color:"#949494", fontSize:"15px", fontWeight:"normal", lineHeight:"1.4" }} class="btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-toggle="modal"
                  data-target="#exampleModal2" style={{borderRadius:"3px", fontWeight:"bold", background:"#3e78ad", color:"#fff", border:"1px solid #3a66ad"}} >New Message</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ width: "600px" }}>
              <div class="modal-header">
              <a href="#">
          <span style={{fontSize:"19px", color:"#333", height:"19px", display:"inline-block", opacity:".7", top:"3px", marginRight:"12px"}} class="glyphicon glyphicon-chevron-left" data-dismiss="modal"></span>
        </a>
                <h5 class="modal-title" id="exampleModalLabel" style={{fontSize:"19px", fontWeight:"bold", color:"#333", borderRadius:"4px 4px 0 0"}}>New message</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ height: "500px" }}>
                <form>
                  <div class="form-group" style={{marginLeft: "-60px", marginRight: "-60px"}}>
                    {/* <label for="recipient-name" class="col-form-label">Recipient:</label> */}
                    <input type="text" class="form-control" style={{border:"1px solid #e2e2e2"}} placeholder="Enter a name" id="recipient-name" />
                  </div>
                  <div class="form-group" style={{marginTop:"-40px", marginLeft: "-60px", marginRight: "-60px"}} >
                    {/* <label for="message-text" class="col-form-label">Message:</label> */}
                    <textarea class="form-control" style={{border:"1px solid #e2e2e2", resize:"none", width:"100%", minHeight:"140px"}} placeholder="Type a message..." id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background:"transparent", color:"#949494", display:"inline-block", cursor:"pointer", fontSize:"15px", fontWeight:"normal", lineHeight:"1.4" }} class="btn" data-dismiss="modal">Back</button>
                <button type="button"  class="btn btn-primary" style={{borderRadius:"3px", fontWeight:"bold", background:"#3e78ad", color:"#fff", border:"1px solid #3a66ad"}}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { displayMessages })(ConversationsList);
