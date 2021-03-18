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
            registration_code: props.registrationCode
            },
            password_has_error: true,
            repeated_password: '',
            isRegError: true
        }
       }


    handleChange = (event) => {
        const {regData} = this.state
        regData[event.target.name] = event.target.value
        this.setState({
            regData
        });
        }

    handleRepeatedPassword = (event) => {
    if (event.target.value === this.state.regData.password)
        this.setState({password_has_error: true})
    else
        this.setState({password_has_error: false})
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
        return <div className={'auth-login-registration-container'}>

            <div className={'auth-login-registration-right-part'}>
               <div className={'auth-login-registration-form'}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control placeholder="Введите имя" name={'name'}
                                      value={this.state.regData.name} onChange={this.handleChange}/>
                    </Form.Group>


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
                                      required="required" onChange={this.handleRepeatedPassword}/>

                             {
                             !this.state.password_has_error && <div style={{width: "200px",backgroundColor: "white", padding: "5px", paddingRight: "20px",
                              float: "center"}}>
                                <Form.Text className="text-muted">
                                    <span style={{color: 'red'}}>
                                        Пароли не совпадают
                                    </span>
                                </Form.Text>
                             </div>
                             }
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Зарегестрироваться
                    </Button>
                    {
                    !this.state.isRegError && <div style={{paddingTop: '12px'}}>
                        <Alert variant={"danger"}>
                            Ошибка при регистрации
                        </Alert>
                    </div>
                    }
                </Form>
            </div>
        </div>
    </div>
        }
        }



export default Registration