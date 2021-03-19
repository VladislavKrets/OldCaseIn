import React from 'react'
import {Redirect, withRouter} from "react-router";
import LoginButtons from "../../components/LoginButtons/LoginButtons";
import CodeRegistration from "../../components/CodeRegistration/CodeRegistration";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";
import basicAuthImage from '../../assets/Pervaya.png'
import otherAuthImage from '../../assets/Formy.png'
import './Auth.css'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: 'login_buttons',
            registrationCode: '',
            width: window.innerWidth,
            height: window.innerHeight,
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
    updateSize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    componentDidMount() {
        document.title = "Авторизация"
        window.addEventListener('resize', this.updateSize);
    }
     componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    render() {
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
                backgroundImage: this.state.width > 770 ? (this.state.panel === 'login_buttons'
                    ? `url(${basicAuthImage})` : `url(${otherAuthImage})`) : null,
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
                                            setToken={this.props.setToken}
                                            registrationCode={this.state.registrationCode}
                            />
                }
            </div>
        </div>
    }
}

export default withRouter(Auth)