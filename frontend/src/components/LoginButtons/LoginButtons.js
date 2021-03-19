import React from 'react'
import {Button} from "react-bootstrap";
import AuthLoginButton from "../../elements/AuthLoginButton/AuthLoginButton";

class LoginButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            right: 16,
            top: 50,
        }
    }

    openRegistrationPanel = () => {
        this.props.changePanel("code_registration")
    }

    openLoginPanel = () => {
        this.props.changePanel("login")
    }

    updateSize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    render() {
        const right = this.state.height >= 884 ? 16 : 16 - 884 / this.state.height * 1.9;
        const backStyle = this.state.width > 770 ? {
            position: "fixed",
            right: `${right}%`,
            top: "50%",
            transform: `translateY(-50%) translateX(-${right}%)`
        } : {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        }
        return <div style={backStyle}>
            <div>
                <div style={{paddingBottom: '20px'}}>
                    <AuthLoginButton onClick={this.openRegistrationPanel}>
                        Регистрация
                    </AuthLoginButton>
                </div>
                <div>
                    <AuthLoginButton onClick={this.openLoginPanel}>
                        Вход
                    </AuthLoginButton>
                </div>
            </div>
        </div>
    }
}

export default LoginButtons