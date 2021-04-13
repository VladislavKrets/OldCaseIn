import React from "react";
import {Modal, Button, Form, Table} from "react-bootstrap";
import './ModalGroupMembers.css'

export default class ModalGroupMembers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: null
        }
    }

    componentDidMount() {
        this.props.getUserGroupData().then(data => {
            this.setState({
                group: data.data
            })
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
                        Состав группы
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <div className={'members-content'}>
                            {
                                this.state.group !== null && this.state.group.length === 0 &&
                                <div style={{textAlign: 'center'}}>
                                    Вы не состоите в группе
                                </div>
                            }
                            {
                                this.state.group !== null && this.state.group.length !== 0 &&
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Рейтинг</th>
                                        <th>Имя</th>
                                        <th>Баллы</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.group.map((item, index) => {
                                            return <tr>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {item.first_name} {item.last_name}
                                                </td>
                                                <td>
                                                    {item.total_score}
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.onHide}>Закрыть</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}