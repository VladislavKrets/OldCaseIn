import React from "react";
import {Accordion, Card, Button} from "react-bootstrap";
import './ModulesList.css'

class ModulesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getModules().then(data => {
            this.props.setModulesData(data.data)
        })
    }

    chooseLesson = (moduleId, lessonId) => {
        this.props.setCurrentLesson(moduleId, lessonId)
        this.props.getLesson(lessonId).then(data => {
            this.props.setLessonData(data.data)
        })
    }

    render() {
        return <div className={'modules-list'} style={{
            height: '100vh',
            overflowY: 'scroll'
        }}>
            <h3 style={{textAlign: "center", paddingTop: '12px'}}>
                Модули
            </h3>
            <hr/>
            <Accordion>
                {
                    this.props.modules.map((item, idx) => {
                        const lessonsLen = item.lessons.length;
                        return <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={`${idx}`}>
                                    <span>{item.name}</span>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${idx}`}>
                                <Card.Body>
                                    {item.lessons.map((x, index) => {
                                        return index + 1 !== lessonsLen ? <>
                                            <div style={{padding: "10px 0", cursor: "pointer"}}
                                                 onClick={() => this.chooseLesson(item.id, x.id)}>
                                                Урок {x.number}
                                            </div>
                                            <hr/>
                                        </> : <>
                                            <div style={{paddingTop: "10px", cursor: "pointer"}}
                                                 onClick={() => this.chooseLesson(item.id, x.id)}>
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

export default ModulesList