import React from 'react'
import {Redirect, withRouter} from "react-router";
import LoginButtons from "../components/LoginButtons";
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
        console.log(this.state)
        return <div style={{
            height: '100vh',
            boxSizing: 'border-box',
            background: this.state.panel !== 'login_buttons' ?
                'linear-gradient(to bottom, rgb(54, 69, 136) 0%, rgb(111, 118, 181) 40%, ' +
                'rgb(160, 171, 210) 60%, rgb(218, 216, 234) 80%, rgb(254, 254, 255) 100%)' : null,
            backgroundColor: this.state.panel === 'login_buttons' ? '#354488' : null,
        }}>
            <div style={{
                height: '100%',
                boxSizing: 'border-box',
                backgroundImage: this.state.panel === 'login_buttons'
                    ? `url(${basicAuthImage})` : `url(${otherAuthImage})`,
                backgroundSize: 'contain',
                objectFit: "fill",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: this.state.panel === 'login_buttons'
                    ? 'right' : 'center',
                backgroundColor: 'inherit'
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
        </div>
    }
}

export default withRouter(Auth)