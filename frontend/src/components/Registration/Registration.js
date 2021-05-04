import React from 'react'
import {Form, Col, Button, Alert} from "react-bootstrap";
import {Redirect} from "react-router";


class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regData: {
                name: '',
                surname: '',
                email: '',
                password: '',
                registration_code: props.registrationCode
            },
            password_has_error: false,
            repeated_password: '',
            isRegError: false
        }
    }


    handleChange = (event) => {
        const {regData} = this.state
        regData[event.target.name] = event.target.value
        this.setState({
            regData
        });
        this.handleRepeatedPassword(event)
    }

    handleRepeatedPassword = (event) => {
        if (event.target.name === 'password') {
            if (this.state.repeated_password !== '') {
                this.setState({
                    password_has_error: !(event.target.value === ''
                        || event.target.value === this.state.repeated_password)
                })
            } else this.setState({password_has_error: false})
        } else if (event.target.name === 'repeated_password') {
            this.setState({
                password_has_error: !(event.target.value === ''
                    || event.target.value === this.state.regData.password),
                repeated_password: event.target.value
            })
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.register(this.state.regData).then(data => {
            this.props.setToken(data.data.token)
        }).catch(e => {
            this.setState({
                isRegError: true
            })
        })
    }


    render() {
        return !this.props.registrationCode ? <Redirect to={'/auth/code'}/> : <div>
            <form onSubmit={this.onSubmit} className={'auth-form'}>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} placeholder="Введите имя" name={'name'}
                           value={this.state.regData.name} onChange={this.handleChange}/>
                </div>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} placeholder="Введите фамилию" name={'surname'}
                           value={this.state.regData.surname} onChange={this.handleChange}/>
                </div>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} type="email" placeholder="Введите email" name={'email'}
                           value={this.state.regData.email} onChange={this.handleChange}/>
                </div>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} type="password" placeholder="Пароль" name={'password'}
                           required="required"
                           value={this.state.regData.password} onChange={this.handleChange}/>
                </div>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} type="password" placeholder="Введите пароль еще раз"
                           name={'repeated_password'}
                           required="required" onChange={this.handleRepeatedPassword}/>
                </div>
                {
                    this.state.password_has_error && <div style={{
                        textAlign: 'center'
                    }}>
                       <span style={{color: 'white'}}>
                          Пароли не совпадают
                        </span>
                    </div>
                }
                <div className={'auth-form-raw'} style={{textAlign: 'center'}}>
                    <input type="checkbox" id="agree-5f20" name="agree" required/>
                    <label htmlFor="agree-5f20" style={{paddingLeft: '4px', display: 'inline'}}>Согласен(а) на обработку персональных
                        данных</label>
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <label className={'general-enter-button'}>
                        Зарегистрироваться
                        <input type={'submit'} style={{display: 'none'}}/>
                    </label>
                </div>
                {
                    this.state.isRegError && <div style={{paddingTop: '12px'}}>
                        <Alert variant={"danger"}>
                            Ошибка при регистрации
                        </Alert>
                    </div>
                }
            </form>
        </div>
    }
}


export default Registration