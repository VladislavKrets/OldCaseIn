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
            password_has_error: false,
            repeated_password: ''
        }
       }


//    checkPassword() {
//         if(this.state.regData.password !== this.state.regData.repeated_password) {
//            this.setState({
//            password_has_error:true
//            });
//        }
//        else {
//            this.setState({password_has_error:false});
//        }
//    }

    handleChange = (event) => {
        const {regData} = this.state
        regData[event.target.name] = event.target.value
        this.setState({
            regData
        });
        }

//        this.setState({
//        [event.target.name] : event.target.value
//        }, () => {
//        if (event.target.name == 'password' || event.target.value == 'password_re')
//        this.checkPassword();
//        }
//        );

    handleRepeatedPassword = (event) => {
    console.log(event.target.value)
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
                                      onKeyPress={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicRepeatedPassword">
                        <Form.Label>Введите пароль еще раз</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" name={'repeated_password'}
                                      required="required"
                                      onKeyPress={this.handleRepeatedPassword}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Зарегестрироваться
                    </Button>


           </Form> </div>
        </div>
        }
        }



export default Registration