import React from 'react'
import {withRouter} from "react-router";
import LoginButtons from "../components/LoginButtons";
import CodeRegistration from "../components/CodeRegistration";
import Login from "../components/Login";
import Registration from "../components/Registration";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: 'login_buttons'
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
                    <LoginButtons changePanel={this.changePanel}/>
                    : this.state.panel === 'code_registration' ?
                    <CodeRegistration
                        changePanel={this.changePanel}
                        checkRegistrationCode={this.props.checkRegistrationCode}
                    />
                        : this.state.panel === 'login' ?
                        <Login login={this.props.login} setToken={this.props.setToken}/>
                        : <Registration register={this.props.register}/>
            }
        </div>
    }
}

export default withRouter(Auth)