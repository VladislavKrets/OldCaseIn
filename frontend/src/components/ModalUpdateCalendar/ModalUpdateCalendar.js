import React from "react";
import {Modal, Button, Form} from "react-bootstrap";

export default class ModalUpdateCalendar extends React.Component {

    constructor(props) {
        super(props);
        const currentEvent = {}
        Object.keys(this.props.currentEvent).forEach(x => {
            if (x !== 'id') currentEvent[x] = this.props.currentEvent[x]
        })
        this.state = {
            id: this.props.currentEvent.id,
            content: {
                ...currentEvent,
                start: currentEvent.start.replace('Z', ''),
                end: currentEvent.end.replace('Z', '')
            }
        }
    }

    updateEvent = () => {
        this.props.updateEvent(this.state.id, this.state.content).then(_ => {
            this.props.getEvents().then(data => {
                this.props.setEvents(data.data)
                this.props.onHide()
            })
        })
    }

    deleteEvent = () => {
        this.props.deleteEvent(this.state.id).then(_ => {
            this.props.getEvents().then(data => {
                this.props.setEvents(data.data)
                this.props.onHide()
            })
        })
    }

    handleChange = (event) => {
        const content = this.state.content
        if (event.target.name === 'completed') content[event.target.name] = event.target.checked
        else content[event.target.name] = event.target.value
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
                        Изменение мероприятия
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
                        <Form.Group>
                            <Form.Label>Завершено:</Form.Label>
                            <Form.Control type="checkbox" name={'completed'} checked={this.state.content.completed}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'danger'} onClick={this.deleteEvent}>Удалить</Button>
                        <Button variant="success" onClick={this.updateEvent}>Сохранить</Button>
                        <Button variant="primary" onClick={this.props.onHide}>Закрыть</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}