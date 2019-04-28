import React, { Component } from 'react';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import "./Message.css";
import Inbox from './Inbox';
import 'react-router-modal/css/react-router-modal.css';
import { ModalContainer, ModalRoute, Modal } from 'react-router-modal';
import "../../App.css";

// let Inbox2 = ()=>{
//   return(
//     <div className="trial-modal">
//       {/* <img src="https://source.unsplash.com/random" /> */}
//       <footer className="footerid">
//               <div>
//                 <div className="form-group">
//                   <textarea
//                     rows="4"
//                     cols="50"
//                     type="text"
//                     className="form-control"
//                     name="message"
//                     placeholder="message"/>
//                   <button
//                     className="btn btn-primary"
//                     type="submit"
//                     name="send"
//                     style={{marginTop:"-10px"}}
//                   > Send</button>
//                   </div>
//           </div>
//           </footer>
//     </div>
//   );
// }


// let Inbox2 = () => {
//   return (
//     <div class="modal" id="ViewConversation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//       <div class="modal-dialog" role="document">
//         <div class="modal-content" style={{ width: "600px" }}>
//           <div class="modal-header">
//             <a href="#">
//               <span style={{ fontSize: "19px", color: "#333", height: "19px", display: "inline-block", opacity: ".7", top: "3px", marginRight: "12px" }} class="glyphicon glyphicon-chevron-left" data-dismiss="modal"></span>
//             </a>
//             <h5 class="modal-title" id="exampleModalLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}>New message</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div class="modal-body" style={{ height: "500px" }}>
//           </div>
//           <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
//             <button type="button" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", display: "inline-block", cursor: "pointer", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" data-dismiss="modal">Back</button>
//             <button type="button" data-toggle="modal" data-target="#CreateMessage" class="btn btn-primary" style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



class ConversationsList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showComponent: false,
  //   };
  // }

  componentDidMount() {
    localStorage.setItem("email", "lucky.singh@gmail.com");
    const email = localStorage.getItem("email");
    console.log(email);
    const data = { email: email };
    console.log(data);
    this.props.displayMessages(data);
    // this.modal.modal('show');
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


  // reply = (e) => {
  //   this.setState({
  //     showComponent: true
  //   })
  // }
  onChangeHandler1 = (e) => {
    this.props.newMessage({
      [e.target.name]: e.target.value
    });
  };

  send = (e) => {
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID inside reply: ", _id)
    console.log("this.props.messagedetails.receiver", this.props);  //{message: "this is a new message"}
    e.preventDefault();
    localStorage.setItem("email", "lucky.singh@gmail.com");
    const email = JSON.parse(localStorage.getItem("email"));
    console.log(email);
    console.log("this.props.message: ", this.props.message);
    let sender="", receiver="";
    // originalsender=tosha
    // originalreceiver=paul
    // localStorage=tosha always
    if(email== this.props.message.viewmessages[0].originalsender)
    {
      sender=email;
      receiver=this.props.message.viewmessages[0].originalreceiver;
    }
    else{
      sender=this.props.message.viewmessages[0].originalreceiver;
      receiver=this.props.message.viewmessages[0].originalsender;
    }
    const data = { email: email, _id: _id, date: Date(Date.now()), newmessage: this.props.message.newmessagedetails.message, 
      sender: sender, receiver:receiver };
    console.log("data sent to action", data);
    this.props.replyMessages(data, this.props.history);
  };


  render() {
    console.log("this.props.message: ", this.props.message);
    let details = this.props.message.people.map((m) => {
      return (
        <option value={m.email}>{m.name}</option>
      );
    });
    let route = "home/inbox";
    console.log("this.props.message.viewmessages", this.props);
    let params = this.props.match.params;
    console.log("params: ", params);
    let details2 = (this.props.message.viewmessages || []).map((d) => {
      return (
        <div class="small" style={{marginTop:"-40px"}}>
          {/* <Link to={`/${route}/${d._id}`} data-toggle="modal" data-target="#ViewConversation" > */}
          {/* <Link to={`/${route}/${d._id}`}> */}
          {/* <a data-toggle="modal" href="#myModal" class="button">Launch myModal Window</a> */}
          {/* <button 
          href={`/${route}/${d._id}`} 
          data-toggle="modal" 
          data-target="#ViewConversation" 
          class="list-group-item list-group-item-action"
          > */}
          <button type="button" 
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#ViewConversation"
          class="btn btn-primary list-group-item list-group-item-action"
          onClick={`/${route}/${d._id}`}
          >
            <tr>
              <td>Sender: {d.originalsender}</td>
            </tr>
            <tr>
              <td>Receiver: {d.originalreceiver}</td>
            </tr>
            <tr>
              <td>Time: {new Date(d.date).toLocaleString()}</td>
            </tr>
          </button>
          {/* </Link> */}
        </div>
      );
    });


        let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID: ", _id);

    let d_id=(this.props.message.viewmessages|| []).map((d) => {
      return d._id;
    });
    console.log(d_id);
    console.log(this.props.message.viewmessages);
    //this.props.viewmessages[0].messages < map
    let details3={};
    let subject={};
    for (let index = 0; index < ((this.props.message||{}).viewmessages||[]).length; index++) {
      if(_id===this.props.message.viewmessages[index]._id){
        details3=this.props.message.viewmessages[index]
        // subject=((this.props.message.viewmessages||{})[0]||[]).subject[index]
      }
    }
    console.log("details3: ",details3);
    let htmldetails =(details3.messages||[]).map((d) => {
        return (
          <div>
          {/* <h4>Conversations {_id}</h4> */}
          <ol>
          <li className="list-group-item">
            <label>Sender: </label> <span> {d.sender}</span>
            <span style={{ float: "right" }}>
              <small> {(d.date)||"".slice(0, 25)}</small>
            </span>
            <label style={{ float: "right" }}>
              <small>Date:- </small>
            </label>
            <br />
            <label>Receiver: </label> <span> {d.receiver}</span>
            <br />
            <label>Message: </label>
            <br />
            <span> {d.message}</span>
            <br />
            {/* {
              d.messages.map((e) => {
                <div>
                  <label>Message: </label>
                  <br />
                  <span> {e.message}</span>
                  <br />
                </div>
              })
            } */}
          </li>
          </ol>
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
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#DisplayAllMessages">Display Message</button>
        <div class="modal" id="DisplayAllMessages" tabindex="-1" role="dialog" aria-labelledby="DisplayAllMessagesLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ width: "600px" }}>
              <div class="modal-header">
                <h5 class="modal-title" id="DisplayAllMessagesLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}><b>Messages</b></h5>
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
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-toggle="modal"
                  data-target="#CreateMessage" style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }} >New Message</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="CreateMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ width: "600px" }}>
              <div class="modal-header">
                <a href="#">
                  <span style={{ fontSize: "19px", color: "#333", height: "19px", display: "inline-block", opacity: ".7", top: "3px", marginRight: "12px" }} class="glyphicon glyphicon-chevron-left" data-dismiss="modal"></span>
                </a>
                <h5 class="modal-title" id="exampleModalLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}>New message</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ height: "500px" }}>
                <form>
                  <div class="form-group" style={{ marginLeft: "-60px", marginRight: "-60px" }}>
                    <input type="text" class="form-control" style={{ border: "1px solid #e2e2e2" }} name="receiver" onChange={this.onChangeHandler} placeholder="Enter a name" id="recipient-name" list="people" />
                    <datalist id="people">
                      {details}
                    </datalist>
                  </div>
                  <div class="form-group" style={{ marginTop: "-40px", marginLeft: "-60px", marginRight: "-60px" }} >
                    {/* <label for="message-text" class="col-form-label">Message:</label> */}
                    <textarea class="form-control" name="message" onChange={this.onChangeHandler} style={{ border: "1px solid #e2e2e2", resize: "none", width: "100%", minHeight: "140px" }} placeholder="Type a message..." id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", display: "inline-block", cursor: "pointer", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" data-dismiss="modal">Back</button>
                <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#DisplayAllMessages" onClick={this.sendMessage} class="btn btn-primary" style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Send</button>
              </div>
            </div>
          </div>
        </div>

        {/* //exampleModal> DisplayAllMessages
//exampleModal2> CreateMessage
//exampleModal3> ViewConversation  */}

        <div class="modal" id="ViewConversation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style={{ width: "600px" }}>
              <div class="modal-header">
                <a href="#">
                  <span style={{ fontSize: "19px", color: "#333", height: "19px", display: "inline-block", opacity: ".7", top: "3px", marginRight: "12px" }} class="glyphicon glyphicon-chevron-left" data-dismiss="modal" data-toggle="modal" data-target="#DisplayAllMessages"></span>
                </a>
                <h5 class="modal-title" id="exampleModalLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}>Conversations</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ height: "500px" }}>


              {htmldetails}
          {/* <div >
              <div>
                <div style={{ paddingLeft: "40px", width: "800px" }} className="form-group">
                  <textarea
                  style={{ border: "1px solid #e2e2e2", resize: "none", width: "80%", minHeight: "140px" }}
                    rows="4"
                    cols="50"
                    onChange={this.onChangeHandler1}
                    type="text"
                    className="form-control"
                    name="message"
                    placeholder="message"
                  />
                </div>
                <div style={{ paddingLeft: "40px" }} className="form-group">
                  <button
                    onClick={this.send}
                    className="btn btn-success"
                    type="submit"
                    name="send"
                    value={_id}
                  > Send</button>
                </div>
              </div>
          </div> */}



              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                {/* <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#DisplayAllMessages" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", display: "inline-block", cursor: "pointer", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" >Back</button> */}
                <textarea onChange={this.onChangeHandler1} type="text" name="message" placeholder="Type a message..." style={{overflow: "hidden", overflowWrap: "break-word", height: "36px", padding:"8px",boxShadow:"none", minHeight:"inherit", marginTop:"50px", borderRadius:"3px", fontSize:"13px", width:"100%", border:"1px solid #e2e2e2", resize:"none"}} ></textarea>
                <button type="button" value={_id} type="submit" onClick={this.send} name="send" data-toggle="modal" data-target="#ViewConversation" class="btn btn-primary" style={{ borderRadius: "3px", marginTop:"75px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Send</button>
              </div>
            </div>
          </div>
        </div>


        {/* <div class="modal" id="ViewConversation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                {htmldetails}
              <div style={{ width: "30%" }}>
            {this.state.showComponent ? null :
              <button
                onClick={this.reply}
                className="btn btn-success"
                type="submit"
                name="reply"
              >
                Reply
              </button>
            }
            {this.state.showComponent ?
              <div>
                <div style={{ paddingLeft: "40px", width: "800px" }} className="form-group">
                  <textarea
                    rows="4"
                    cols="50"
                    onChange={this.onChangeHandler1}
                    type="text"
                    className="form-control"
                    name="message"
                    placeholder="message"
                  />
                </div>
                <div style={{ paddingLeft: "40px" }} className="form-group">
                  <button
                    onClick={this.send}
                    className="btn btn-success"
                    type="submit"
                    name="send"
                    value={_id}
                  > Send</button>
                </div>
              </div> :
              null
            }
          </div>

              </div>
              <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
                <button type="button" id="messagesClose" style={{ marginTop: "80px", background:"transparent", color:"#949494", display:"inline-block", cursor:"pointer", fontSize:"15px", fontWeight:"normal", lineHeight:"1.4" }} class="btn" data-dismiss="modal">Back</button>
                <button type="button" data-toggle="modal" data-target="#exampleModal2" onClick={this.sendMessage} class="btn btn-primary" style={{borderRadius:"3px", fontWeight:"bold", background:"#3e78ad", color:"#fff", border:"1px solid #3a66ad"}}>Send</button>
              </div>
            </div>
          </div>
        </div> */}

        {/* <BrowserRouter>
          <div >
            <ModalRoute path='/home/inbox/:_id' component={Inbox2} />
            <ModalContainer />
          </div>
        </BrowserRouter> */}
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage })(ConversationsList);
