import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchPeople, setMessage, sendMessage, displayMessages } from "../../Actions/MessageAction";
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
    this.props.displayMessages(data);

    // localStorage.setItem("email", "lucky.singh@gmail.com");
    //     const email = localStorage.getItem("email");
    //     const data = {
    //       email: email
    //     };
    //     console.log("email LOG", data);
        this.props.fetchPeople(data);   //this.props.message.people
  }
  onChangeHandler = (e) => {
    console.log("INSIDE CHANGE HANDLER");
    this.props.setMessage({
      [e.target.name]: e.target.value
    });
  };
  sendMessage = (e) => {
    console.log("inside sendMessage API CALL");
    console.log("this.props.messagedetails.receiver", this.props.message.messagedetails);
    // console.log(this.props.messagedetails.subject);
    // console.log(this.props.messagedetails.message);
    e.preventDefault();
    localStorage.setItem("email", "lucky.singh@gmail.com");   //Lucky@123
    var em = localStorage.getItem("email");
    console.log(em);
    const data = {
        //sender: em, receiver, subject, message, date
        sender: em,
        receiver: this.props.message.messagedetails.receiver,
        message: this.props.message.messagedetails.message,
        date: Date(Date.now())
    };
    console.log("data", data);
    this.props.sendMessage(data, this.props.history);
};
  
  render() {
    console.log("this.props.message: ", this.props.message);
      let details = this.props.message.people.map((m) => {
        return (
                <option value={m.email}>{m.name}</option>
            );
        });
    let route ="home/inbox";
        console.log("this.props.message.viewmessages", this.props);
        let _id=this.props.match.params;
        console.log("params: ", _id);
        let details2 = (this.props.message.viewmessages||[]).map((d) => {
          return (
              <div class="small">
                <Link to={`/${route}/${d._id}`}>
                <tr>
                  <td>Sender: {d.originalsender}</td>
                  </tr>
                  <tr>
                  <td>Receiver: {d.originalreceiver}</td>
                  </tr>
                  <tr>
                  <td>Time: {new Date(d.date).toLocaleString()}</td>
                  </tr>
                <tr>
                  {/* <td>Message: {d.messages}</td> */}
                </tr>
                </Link>
                <hr/>
                </div>
          );
        });
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
              {details2}
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
                    <input type="text" class="form-control" style={{border:"1px solid #e2e2e2"}} name="receiver" onChange={this.onChangeHandler} placeholder="Enter a name" id="recipient-name" list="people" />
                    <datalist id="people">
                      {details}
                    </datalist>
                  </div>
                  <div class="form-group" style={{marginTop:"-40px", marginLeft: "-60px", marginRight: "-60px"}} >
                    {/* <label for="message-text" class="col-form-label">Message:</label> */}
                    <textarea class="form-control" name="message" onChange={this.onChangeHandler} style={{border:"1px solid #e2e2e2", resize:"none", width:"100%", minHeight:"140px"}} placeholder="Type a message..." id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background:"transparent", color:"#949494", display:"inline-block", cursor:"pointer", fontSize:"15px", fontWeight:"normal", lineHeight:"1.4" }} class="btn" data-dismiss="modal">Back</button>
                <button type="button" data-toggle="modal" data-target="#exampleModal2" onClick={this.sendMessage} class="btn btn-primary" style={{borderRadius:"3px", fontWeight:"bold", background:"#3e78ad", color:"#fff", border:"1px solid #3a66ad"}}>Send</button>
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
export default connect(mapStateToProps, { fetchPeople, setMessage, sendMessage, displayMessages })(ConversationsList);
