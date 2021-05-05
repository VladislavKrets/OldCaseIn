import './ModulesList.css'
import React from "react";
import {Card, Accordion, Button} from "react-bootstrap";

export default class ModulesList extends React.Component {
    render() {
        return <div className={'modules-list real-modules'}>
            <Accordion>
                {
                    this.props.modules.map((item, idx) => {
                        const lessonsLen = item.lessons.length;
                        return <Card>
                            <Card.Header onClick={() => this.props.setLessonKey(false)}>
                                <Accordion.Toggle as={Button} variant="link" eventKey={`${idx}`}>
                                    <span style={{fontWeight: '900'}}>Модуль {item.number}</span>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${idx}`}>
                                <Card.Body>
                                    {item.lessons.map((x, index) => {
                                        return index + 1 !== lessonsLen ? <>
                                            <div className={'list-modules-lesson-item '}
                                                 onClick={() => {
                                                     this.props.setLessonKey(true)
                                                     this.chooseLesson(item, x.id)
                                                 }}>
                                                Урок {x.number}
                                            </div>
                                            <hr/>
                                        </> : <>
                                            <div className={'list-modules-lesson-item '}
                                                 onClick={() => {
                                                     this.props.setLessonKey(true)
                                                     this.chooseLesson(item, x.id)
                                                 }}>
                                                Урок {x.number}
                                            </div>
                                        </>
                                    })}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    })
                }
            </Accordion>
        </div>
    }
}