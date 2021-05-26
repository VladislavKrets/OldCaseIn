import {withRouter} from "react-router";
import User from "../User/User";
import React from "react";

class MasterPreviewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
    }

    componentDidMount() {
        this.props.getMasterUser(this.props.match.params.user)
            .then(data => this.setState({userData: data.data}))
    }

    render() {
        return this.state.userData ?
            <User logOut={this.props.logOut}
                  key={window.location.pathname}
                  masterPreview={true}
                  getGroups={this.props.getGroups}
                  getMasterUser={this.props.getMasterUser}
                  getUser={this.props.getUser}
                  userData={this.state.userData}
                  setHeaderName={this.props.setHeaderName}
                  setUserData={this.props.setUserData}
                  getUserGroupData={this.props.getUserGroupData}
                  token={this.props.token}
            /> : <div/>
    }
}

export default withRouter(MasterPreviewUser)