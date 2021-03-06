import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { UserView } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageItem.css"; // MessageItem.scss

class MessageItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const now = new Date(this.props.createdAt).toTimeString();
    const hhmmss = now.split(" ")[0];
    return (
      <div className="chat card">
        <img src={`https://robohash.org/${this.props.sender}?size=50x50`}
            alt={`@${this.props.sender}`} className="left"/>
        <div className="message left">
            <p className="sender_details">{this.props.senderFullName}
              <span className="sender_username"> @{this.props.sender}</span>
            </p>
            <p className="sender_message">
                {this.props.text}
            </p>
        </div>
        <div className="right details">
            <p className="date right">
              {new Date(this.props.createdAt.substr(0, 10)).toUTCString().substr(0, 16)} &nbsp;
              <i className="status icon ion-ios-checkmark-outline x15"></i>
              <br/>
              <span className="time">{hhmmss}</span>
            </p>
        </div>
      </div>
    );
  }
}

export default MessageItem;

// <i className="status icon ion-alert x15"></i>
// {this.props.priority}
