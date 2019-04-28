import React, { Component } from "react";
import "../../App.css";
import { displayMessages, replyMessages, newMessage } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { EEXIST } from "constants";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
  }
  // componentDidMount() {
  //   const email = JSON.parse(localStorage.getItem("email"));
  //   console.log(email);
  //   const data = { email: email };
  //   console.log(data);
  //   // this.props.displayMessages(data);
  // }
  reply = (e) => {
    this.setState({
      showComponent: true
    })
  }
  onChangeHandler = (e) => {
    this.props.newMessage({
      [e.target.name]: e.target.value
    });
  };
//react router 4 ka modal main page check
  send = (e) => {
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID inside reply: ", _id);
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
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID: ", _id);
    
    let d_id=(this.props.message.viewmessages|| []).map((d) => {
      return d._id;
    });
    console.log(d_id);
    console.log(this.props.message.viewmessages);
    //this.props.viewmessages[0].messages < map
    let details={};
    for (let index = 0; index < ((this.props.message||{}).viewmessages||[]).length; index++) {
      if(_id===this.props.message.viewmessages[index]._id){
        details=this.props.message.viewmessages[index]
      }
    }
    console.log("details: ",details);
    let htmldetails =(details.messages||[]).map((d) => {
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
      <div id="content">
      {/* <img src="https://source.unsplash.com/random" /> */}
        <div className="container">
        <h4>Conversations</h4>
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
                    onChange={this.onChangeHandler}
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
      </div>
      // <div class="modal" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      //     <div class="modal-dialog" role="document">
      //       <div class="modal-content" style={{ width: "600px" }}>
      //         <div class="modal-header">
      //         <a href="#">
      //           <span style={{fontSize:"19px", color:"#333", height:"19px", display:"inline-block", opacity:".7", top:"3px", marginRight:"12px"}} class="glyphicon glyphicon-chevron-left" data-dismiss="modal"></span>
      //       </a>
      //           <h5 class="modal-title" id="exampleModalLabel" style={{fontSize:"19px", fontWeight:"bold", color:"#333", borderRadius:"4px 4px 0 0"}}>New message</h5>
      //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //             <span aria-hidden="true">&times;</span>
      //           </button>
      //         </div>
      //         <div class="modal-body" style={{ height: "500px" }}>
      //           {htmldetails}
      //         <div style={{ width: "30%" }}>
      //       {this.state.showComponent ? null :
      //         <button
      //           onClick={this.reply}
      //           className="btn btn-success"
      //           type="submit"
      //           name="reply"
      //         >
      //           Reply
      //         </button>
      //       }
      //       {this.state.showComponent ?
      //         <div>
      //           <div style={{ paddingLeft: "40px", width: "800px" }} className="form-group">
      //             <textarea
      //               rows="4"
      //               cols="50"
      //               onChange={this.onChangeHandler1}
      //               type="text"
      //               className="form-control"
      //               name="message"
      //               placeholder="message"
      //             />
      //           </div>
      //           <div style={{ paddingLeft: "40px" }} className="form-group">
      //             <button
      //               onClick={this.send}
      //               className="btn btn-success"
      //               type="submit"
      //               name="send"
      //               value={_id}
      //             > Send</button>
      //           </div>
      //         </div> :
      //         null
      //       }
      //     </div>

      //         </div>
      //         <div class="modal-footer" style={{ height: "20px", marginBottom: "50px" }}>
      //           <button type="button" id="messagesClose" style={{ marginTop: "80px", background:"transparent", color:"#949494", display:"inline-block", cursor:"pointer", fontSize:"15px", fontWeight:"normal", lineHeight:"1.4" }} class="btn" data-dismiss="modal">Back</button>
      //           <button type="button" data-toggle="modal" data-target="#exampleModal2" onClick={this.sendMessage} class="btn btn-primary" style={{borderRadius:"3px", fontWeight:"bold", background:"#3e78ad", color:"#fff", border:"1px solid #3a66ad"}}>Send</button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
    );
    // else{
    //   return(
    //     <div>
    //       This is an error {id_table} is not equal to {_id}
    //     </div>
    //   )
    // }
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { displayMessages, replyMessages, newMessage })(Inbox);
