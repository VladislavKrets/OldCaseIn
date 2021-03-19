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

    chooseLesson = (module, lessonId) => {
        this.props.setCurrentLesson(module, lessonId)
        this.props.getLesson(lessonId).then(data => {
            this.props.setLessonData(data.data)
        })
        this.props.getQuestions(lessonId).then(data => {
            this.props.setQuestionsData(data.data)
        })
        this.props.closeDrawer(false)
    }

    render() {
        return <div className={'modules-list'}>
            <h3 className={'list-modules-title'}>
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
                                            <div className={'list-modules-lesson-item '}
                                                 onClick={() => this.chooseLesson(item, x.id)}>
                                                Урок {x.number}
                                            </div>
                                            <hr/>
                                        </> : <>
                                            <div className={'list-modules-lesson-item '}
                                                 onClick={() => this.chooseLesson(item, x.id)}>
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