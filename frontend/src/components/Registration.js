import React from 'react'
import {Form, Col, Button, Alert} from "react-bootstrap";


class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        regData: {
            userName: '',
            userLastName:'',
            loginData: {
                email: '',
                password: ''
            }
        }
       }
    }

    handleChange = (event) => {
        const {regData} = this.state
        regData[event.target.name] = event.target.value
        this.setState({
            regData
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
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control placeholder="Введите имя" name={'userName'}
                                      value={this.state.regData.userName} onChange={this.handleChange}/>
                    </Form.Group>


            <div style={{width: '500px', padding: '22px', border: '1px solid #0062cc', borderRadius: '10px'}}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicUserLastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control placeholder="Введите фамилию" name={'userLastName'}
                                      value={this.state.regData.userLastName} onChange={this.handleChange}/>
                    </Form.Group>


                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" name={'email'}
                                      value={this.state.regData.loginData.email} onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            Мы не будем распространять ваш email
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" name={'password'}
                                      required="required"
                                      value={this.state.regData.loginData.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Зарегестрироваться
                    </Button>

                </Form>
            </div>
        </div>
    }
}
export default Registration