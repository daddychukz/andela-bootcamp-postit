import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/CreateGroupBoard.css"; // CreateGroupBoard.scss

class AddUserToGroupBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.onCreateGroup = this.onCreateGroup.bind(this);
    this.state = {
      error: "",
      selectedUsers: null
    };
    this.onSearchUserInGroup = this.onSearchUserInGroup.bind(this);
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
    this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
  }

  // onSearchUserInGroup Method
  onSearchUserInGroup(e) {
    e.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    // console.log(this.props.match.params.groupId);
    const searchText = this.selectedUsers.value;
    if (!searchText) {
      this.setState({
        selectedUsers: null
      });
    }
    // console.log(searchText);
    Api(null, `/api/groups/${id}/usersearch?search=${searchText}`, "GET").then(
        (createGroupResponse) => {
          console.log(createGroupResponse, "createGroupResponse");
          this.setState({
            selectedUsers: createGroupResponse.searchItemResult
          });
        }
    );
    console.log(this.state.selectedUsers, "selectedUsers");
  }

  // onAddUserToGroup Method
  onAddUserToGroup(uId) {
    // e.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    const addUserParams = `userId=${uId}`;
    Api(addUserParams, `/api/groups/${id}/user/`, "POST").then(
        (addUserToGroupResponse) => {
          console.log(addUserToGroupResponse, "addUserToGroupResponse");
        // check if response, i.e user added, set message state to "user added"
        // check for users in a group and update UI to add mark icon
        }
    );
  }

  onShowGroupMessages(e) {
    e.preventDefault();
    const gId = `${this.props.match.params.groupId}`;
    Api(null, `/api/groups/${gId}/messages/`, "GET").then(
        (groupMessages) => {
          console.log(groupMessages, "====> group messages");
          window.location = `/dashboard/messages/${gId}`;
        }
    );
  }
  // render Method
  render() {
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu onShowGroupMessages={this.onShowGroupMessages}/>
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container centerContainerForForms">
                <div className="card-panel formPanel">
                    <form className="centerForm">
                        <div className="col s12 teal-text">
                        Add User (s):
                        <div className="input-field inline">
                            <input id="add_users" type="search"
                                className="validate"
                                ref={ (input) => {
                                  this.selectedUsers = input;
                                }
                                 }
                                onKeyUp={this.onSearchUserInGroup}/>
                            <label htmlFor="add_users">Users</label>
                        </div>
                        </div>
                        <div className="col s12">
                        <ul>
                            { this.state.selectedUsers !== null ?
                                    this.state.selectedUsers.map(selectedUser => <li key={selectedUser.id}>
                                        {/* eslint-disable-next-line */}
                                        <a href="#"
                                         onClick={
                                             () => this.onAddUserToGroup(selectedUser.id)
                                            }>
                                         @{selectedUser.username} <span className="new badge" data-badge-caption="Member"></span>
                                         </a>
                                        </li>)
                                : this.state.selectedUsers
                            }
                        </ul>
                        </div>
                        <div className="col s12">
                            <p className="center">
                                <button className="btn-large waves-effect waves-light"
                                onClick={this.onSearchUserInGroup}>Search</button> or
                                <button className="btn-large waves-effect waves-light"
                                onClick={
                                    this.onShowGroupMessages
                                }>Enter Group</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
    );
  }
}

export default AddUserToGroupBoard;
