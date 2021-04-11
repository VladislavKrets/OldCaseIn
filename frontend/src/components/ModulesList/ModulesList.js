import React from "react";
import {Accordion, Card, Button} from "react-bootstrap";
import './ModulesList.css'

class ModulesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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
            <Accordion onClick={() => this.props.setContentPanel('lessons')}>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={`1`}>
                        <div style={{textAlign: 'center', fontWeight: 'bold'}}>Модули</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`1`}>
                        <Card.Body>
                            <Accordion>
                                {
                                    this.props.modules.map((item, idx) => {
                                        const lessonsLen = item.lessons.length;
                                        return <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey={`${idx}`}>
                                                    <span>Модуль {item.number}</span>
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
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <div className={'card-header'} onClick={() => {
                this.props.setContentPanel('documentation')
                this.props.closeDrawer(false)
            }}>
                <div style={{textAlign: 'center', fontWeight: 'bold'}}>Документация</div>
            </div>
            <div className={'card-header'}>
                <div style={{textAlign: 'center', fontWeight: 'bold'}}
                     onClick={() => {
                         this.props.setContentPanel('calendar')
                         this.props.closeDrawer(false)
                     }}>Календарь событий
                </div>
            </div>
            <div className={'card-header'}>
                <div style={{textAlign: 'center', fontWeight: 'bold'}}
                     onClick={() => {
                         this.props.setContentPanel('bot')
                         this.props.closeDrawer(false)
                     }}>Бот
                </div>
            </div>
            <div className={'card-header'}>
                <div style={{textAlign: 'center', fontWeight: 'bold'}} onClick={() => {
                         this.props.setContentPanel('building')
                         this.props.closeDrawer(false)
                     }}>
                    Схема здания
                </div>
            </div>
            {
                this.props.userData && this.props.userData.type === 'master' &&
                <div className={'card-header'}>
                    <div style={{textAlign: 'center', fontWeight: 'bold'}}
                         onClick={() => {
                             this.props.setContentPanel('students')
                             this.props.closeDrawer(false)
                         }}>Ученики
                    </div>
                </div>
            }
        </div>
    }
}

export default ModulesList