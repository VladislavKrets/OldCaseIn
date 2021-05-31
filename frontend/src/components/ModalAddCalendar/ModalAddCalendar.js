import React from "react";
import {Modal, Button, Form} from "react-bootstrap";

export default class ModalAddCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: {
                title: '',
                start: null,
                end: null,
            }
        }
    }

    addEvent = () => {
        this.props.addEvent(this.state.content).then(_ => {
            this.props.getEvents().then(data => {
                this.props.setEvents(data.data)
                this.props.onHide()
            })
        })
    }

    handleChange = (event) => {
        const content = this.state.content
        content[event.target.name] = event.target.value
        this.setState({
            content: content
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление мероприятия
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Описание:</Form.Label>
                            <Form.Control placeholder={"Введите описание"}
                                          name={'title'}
                                          value={this.state.content.title}
                                          onChange={this.handleChange}
                                          autocomplete={'off'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата начала:</Form.Label>
                            <Form.Control type="datetime-local" name={'start'} value={this.state.content.start}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата конца:</Form.Label>
                            <Form.Control type="datetime-local" name={'end'} value={this.state.content.end}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.addEvent}>Добавить</Button>
                        <Button variant="primary" onClick={this.props.onHide}>Закрыть</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}