import React from 'react'
import {Form, Button, Alert} from "react-bootstrap";

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
            this.props.setToken(data.token)
        }).catch(e => {
            this.setState({
                isAuthError: true
            })
        })
    }

    render() {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            boxSizing: 'border-box'
        }}>
            <div style={{width: '500px', padding: '22px', border: '1px solid #0062cc', borderRadius: '10px'}}>
                <Form onSubmit={this.onSubmit} method={'post'}>
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
                        this.state.isAuthError && <div style={{paddingTop: '12px'}}>
                            <Alert variant={"danger"}>
                                Неверный email или пароль
                            </Alert>
                        </div>
                    }
                </Form>
            </div>
        </div>
    }
}

export default Login