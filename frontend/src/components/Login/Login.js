import React from 'react'
import {Form, Button, Alert} from "react-bootstrap";
import './Login.css'
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

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
        return <div>
            <h2 style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                Авторизация
            </h2>
            <form onSubmit={this.onSubmit} className={'auth-form'}>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} type="email" placeholder="Введите email" name={'email'}
                           value={this.state.loginData.email} onChange={this.handleChange}/>

                </div>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} type="password" placeholder="Пароль" name={'password'}
                           required="required"
                           value={this.state.loginData.password} onChange={this.handleChange}/>
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <label className={'general-enter-button'}>
                        Войти
                        <input type={'submit'} style={{display: 'none'}}/>
                    </label>
                </div>
                {
                    this.state.isAuthError && <div className={'login-wrong-alert-container'}>
                        <Alert variant={"danger"}>
                            Неверный email или пароль
                        </Alert>
                    </div>
                }
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <Link to={'/auth/code'} style={{textDecoration: 'none',
                        color: '#387cbd',
                        fontSize: '1.25rem',
                        cursor: 'pointer'}}>
                        Зарегистрироваться
                    </Link>
                </div>
            </form>
        </div>
    }
}

export default withRouter(Login)