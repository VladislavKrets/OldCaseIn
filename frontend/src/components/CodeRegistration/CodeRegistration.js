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
        return <div className={'auth-login-registration-container'}>
            <div className={'auth-login-registration-right-part'}>
                <div className={'auth-login-registration-form'}>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Код регистрации" name={'registrationCode'}
                                              onChange={this.handleChange}
                                              required="required"
                                              value={this.state.registrationCode}/>
                            </Col>
                            <Col>
                                <div style={{display: 'flex', flexDirection: 'row-reverse', width: '100%'}}>
                                    <Button variant="primary" type="submit">
                                        Регистрация
                                    </Button>
                                </div>
                            </Col>
                        </Form.Row>
                        {
                            !this.state.isRegistrationCodeRight && <Form.Row>

                                <div className={'code-registration-wrong-alert-container'}>
                                    <Alert variant={"danger"}>
                                        Неверный код регистрации
                                    </Alert>
                                </div>
                            </Form.Row>
                        }
                    </Form>
                </div>
            </div>
        </div>
    }
}

export default CodeRegistration