import React from 'react'
import {Redirect, withRouter} from "react-router";
import LoginButtons from "../components/LoginButtons/LoginButtons";
import CodeRegistration from "../components/CodeRegistration";
import Login from "../components/Login";
import Registration from "../components/Registration";
import basicAuthImage from '../assets/Pervaya.png'
import otherAuthImage from '../assets/Formy.png'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: 'login_buttons',
            registrationCode: ''
        }
    }

    changePanel = (panel) => {
        this.setState({
            panel: panel
        })
    }

    setRegistrationCode = (registrationCode) => {
        this.setState({
            registrationCode: registrationCode
        })
    }

    render() {
        return <div style={{
            height: '100vh',
            boxSizing: 'border-box',
            backgroundImage: `url(${basicAuthImage})`,
            backgroundSize: 'contain',
            objectFit: "fill",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundColor: '#354488',
        }}>
            {
                this.state.panel === 'login_buttons' ?
                    <LoginButtons changePanel={this.changePanel}/>
                    : this.state.panel === 'code_registration' ?
                    <CodeRegistration
                        setRegistrationCode={this.setRegistrationCode}
                        changePanel={this.changePanel}
                        checkRegistrationCode={this.props.checkRegistrationCode}
                    />
                    : this.state.panel === 'login' ?
                        <Login login={this.props.login} setToken={this.props.setToken}/>
                        : <Registration register={this.props.register}
                                        registrationCode={this.state.registrationCode}
                        />
            }
        </div>
    }
}

export default withRouter(Auth)