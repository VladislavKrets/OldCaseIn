import React from 'react'
import {Button} from "react-bootstrap";

class LoginButtons extends React.Component {

    openRegistrationPanel = () => {
        this.props.changePanel("code_registration")
    }

    openLoginPanel = () => {
        this.props.changePanel("login")
    }

    render() {
        return <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}>
                <div style={{paddingRight: '12px'}}>
                    <Button variant="primary" type="submit" onClick={this.openRegistrationPanel}>
                        Регистрация
                    </Button>
                </div>
                <div>
                    <Button variant="primary" type="submit" onClick={this.openLoginPanel}>
                        Вход
                    </Button>
                </div>
        </div>
    }
}

export default LoginButtons