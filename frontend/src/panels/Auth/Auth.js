import React from 'react'
import {Redirect, Route, withRouter} from "react-router";
import LoginButtons from "../../components/LoginButtons/LoginButtons";
import CodeRegistration from "../../components/CodeRegistration/CodeRegistration";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";
import logo from '../../assets/logo.png'
import './Auth.css'
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: 'login',
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
            minHeight: '100vh',
            boxSizing: 'border-box',
            backgroundImage: 'linear-gradient(#a0f1ea, #c037b5a3)',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div className={'general-content'}>
                <div className={'auth-logo-container'}>
                    <img src={logo} className={'general-logo'}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Route exact path={`${this.props.match.url}/login`}>
                        <Login login={this.props.login} setToken={this.props.setToken}
                               changePanel={this.changePanel}/>
                    </Route>
                    <Route exact path={`${this.props.match.url}/code`}>
                        <CodeRegistration
                            setRegistrationCode={this.setRegistrationCode}
                            changePanel={this.changePanel}
                            checkRegistrationCode={this.props.checkRegistrationCode}
                        />
                    </Route>
                    <Route exact path={`${this.props.match.url}/register`}>
                        <Registration register={this.props.register}
                                      setToken={this.props.setToken}
                                      registrationCode={this.state.registrationCode}
                        />
                    </Route>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Auth)