import React from 'react'
import {Form, Col, Button, Alert} from "react-bootstrap";


class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        regData: {
            name: '',
            surname:'',
            email: '',
            password: '',
            repeated_password: '',
            registration_code: props.registrationCode,
            password_has_error: false
        }
       }
    }

    checkPassword() {
         if(!this.state.password || this.state.password != this.state.repeated_password) {
            this.setState({password_has_error:true});
        }
        else {
            this.setState({password_has_error:false});
        }
    }

    handleChange = (event) => {
        const {regData} = this.state
        regData[event.target.name] = event.target.value
        this.setState({
            regData
        })

        if (event.target.name == 'password' || event.target.name == 'repeated_password')
            this.checkPassword();
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
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicUserLastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control placeholder="Введите фамилию" name={'surname'}
                                      value={this.state.regData.surname} onChange={this.handleChange}/>
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" name={'email'}
                                      value={this.state.regData.email} onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            Мы не будем распространять ваш email
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" name={'password'}
                                      required="required"
                                      value={this.state.regData.password} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicRepeatedPassword">
                        <Form.Label>Введите пароль еще раз</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" name={'repeated_password'}
                                      required="required"
                                      value={this.state.regData.repeated_password} onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Зарегестрироваться
                    </Button>
                    {
                        this.state.regData.password_has_error && <div style={{paddingTop: '12px'}}>
                            <Alert variant={"danger"}>
                                Пароли не совпадают
                            </Alert>
                        </div>
                    }

                </Form>
            </div>
        </div>
    }
}
export default Registration