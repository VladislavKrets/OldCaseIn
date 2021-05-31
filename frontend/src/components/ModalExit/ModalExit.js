import React from "react";
import {Modal, Button, Form, Table} from "react-bootstrap";

export default class ModalExit extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Выход
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите выйти?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        this.props.logOut()
                        this.props.onHide()
                    }}>Выйти</Button>
                    <Button variant="primary" onClick={this.props.onHide}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}