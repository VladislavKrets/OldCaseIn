import React from 'react'
import {Form, Col, Button, Alert} from "react-bootstrap";
import './CodeRegistration.css'

class CodeRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registrationCode: '',
            isRegistrationCodeRight: true,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.checkRegistrationCode(this.state.registrationCode)
            .then(data => {
                this.setState({
                    isRegistrationCodeRight: data.data.exists
                })
                if (data.data.exists) {
                    this.props.setRegistrationCode(this.state.registrationCode)
                    this.props.changePanel("registration")
                }
            }).catch(e => {
            this.setState({
                isRegistrationCodeRight: false
            })
        })
    }

    render() {
        return <div>
            <h2 style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                Регистрация
            </h2>
            <form onSubmit={this.onSubmit} className={'auth-form'}>
                <div className={'auth-form-raw'}>
                    <input className={'auth-input'} placeholder="Код регистрации" name={'registrationCode'}
                           onChange={this.handleChange}
                           required="required"
                           value={this.state.registrationCode}/>
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <label className={'general-enter-button'}>
                        Регистрация
                        <input type="submit" style={{display: 'none'}}/>
                    </label>
                </div>
                {
                    !this.state.isRegistrationCodeRight && <Form.Row>

                        <div className={'code-registration-wrong-alert-container'}>
                            <Alert variant={"danger"}>
                                Неверный код регистрации
                            </Alert>
                        </div>
                    </Form.Row>
                }
            </form>
        </div>
    }
}

export default CodeRegistration