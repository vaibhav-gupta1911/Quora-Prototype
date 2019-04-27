import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {displayMessages} from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";

class ConversationsList extends Component {
    componentDidMount() {
        localStorage.setItem("email", "lucky.singh@gmail.com");
        const email = localStorage.getItem("email");
        console.log(email);
        const data = { email: email };
        console.log(data);
        // this.props.displayMessages(data);
      }
      createMessage = (e) => {
        e.preventDefault();
            // if(localStorage.getItem("type")==="student")
            // this.props.history.push(`/student/inbox/createmessage`);
            // else
            // this.props.history.push(`/teacher/inbox/createmessage`);
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
            <div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" ></button>
            {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Open modal for @fat</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Send message</button>
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
  