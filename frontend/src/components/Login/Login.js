import React from 'react'
import {Form, Button, Alert} from "react-bootstrap";
import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                email: '',
                password: ''
            },
            isAuthError: false
        }
    }

    handleChange = (event) => {
        const {loginData} = this.state
        loginData[event.target.name] = event.target.value
        this.setState({
            loginData
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.login(this.state.loginData).then(data => {
            this.props.setToken(data.data.token)
        }).catch(e => {
            this.setState({
                isAuthError: true
            })
        })
    }

    render() {
        return <div className={'auth-login-registration-container'}>
            <div className={'auth-login-registration-right-part'}>
                <div className={'auth-login-registration-form'}>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" name={'email'}
                                          value={this.state.loginData.email} onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                Мы не будем распространять ваш email
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" name={'password'}
                                          required="required"
                                          value={this.state.loginData.password} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Войти
                        </Button>
                        {
                            this.state.isAuthError && <div className={'login-wrong-alert-container'}>
                                <Alert variant={"danger"}>
                                    Неверный email или пароль
                                </Alert>
                            </div>
                        }
                    </Form>
                </div>
            </div>
        </div>
    }
}

export default Login