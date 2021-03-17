import React from "react";
import {Modal, Button} from "react-bootstrap";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {props.lessonData && <Modal.Title id="contained-modal-title-vcenter">
          Вы сдали тест по уроку {props.lessonData.number}
        </Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        {
          props.resultData && <p>
          Ваш результат: {Math.round(props.resultData.result_score / props.resultData.max_score * 100 * 100) / 100}%
        </p>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}