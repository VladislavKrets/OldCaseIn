import React from 'react'
import {Form, Col, Button} from "react-bootstrap";

class CodeRegistration extends React.Component {
    render() {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            boxSizing: 'border-box'
        }}>
            <div style={{width: '500px', padding: '22px', border: '1px solid #0062cc', borderRadius: '10px'}}>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="Код регистрации"/>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Регистрация
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        </div>
    }
}

export default CodeRegistration