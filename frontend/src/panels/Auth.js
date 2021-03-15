import React from 'react'
import {withRouter} from "react-router";
import LoginButtons from "../components/LoginButtons";
import CodeRegistration from "../components/CodeRegistration";
import Login from "../components/Login";
import Registration from "../components/Registration";

class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            panel: 'login'
        }
    }

    changePanel = (panel) => {
        this.setState({
            panel: panel
        })
    }

    render() {
        return <div>
            {
                this.state.panel === 'login_buttons' ?
                    <LoginButtons/> : this.state.panel === 'code_registration' ?
                    <CodeRegistration/> : this.state.panel === 'login' ?
                        <Login/> : <Registration/>
            }
        </div>
    }
}
export default withRouter(Auth)