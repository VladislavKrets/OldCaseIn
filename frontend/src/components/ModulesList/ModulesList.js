import React from "react";
import {Accordion, Card, Button} from "react-bootstrap";
import './ModulesList.css'
import {Link} from "react-router-dom";
import {Person, Collection, FileEarmarkText, CalendarEvent, Building, InfoCircle, People} from 'react-bootstrap-icons'

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
            <div className={'card-header'}
                 style={{borderBottom: 'none', borderTop: '1px solid rgba(0,0,0,.125)',}}
                 onClick={() => {
                     this.props.setContentPanel('user')
                     this.props.closeDrawer(false)
                 }}>
                <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                    <Person height={'26px'} width={'26px'}/>
                    {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Профиль</span>}
                </div>
            </div>
            <Accordion onClick={() => this.props.setContentPanel('lessons')}>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={`1`}>
                        <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                            <Collection height={'26px'} width={'26px'}/>
                            {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Модули</span>}
                        </div>
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
                <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                    <FileEarmarkText height={'26px'} width={'26px'}/>
                    {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Документация</span>}
                </div>
            </div>
            <div className={'card-header'} onClick={() => {
                this.props.setContentPanel('calendar')
                this.props.closeDrawer(false)
            }}>
                <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                    <CalendarEvent height={'26px'} width={'26px'}/>
                    {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Календарь событий</span>}
                </div>
            </div>
            <div className={'card-header'} onClick={() => {
                this.props.setContentPanel('bot')
                this.props.closeDrawer(false)
            }}>
                <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                    <InfoCircle height={'26px'} width={'26px'}/>
                    {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Бот</span>}
                </div>
            </div>
            <div className={'card-header'} onClick={() => {
                this.props.setContentPanel('building')
                this.props.closeDrawer(false)
            }}>
                <div className={'modules-card-content'  + (this.state.width ? ' modules-card-content-center' : '')}>
                    <Building height={'26px'} width={'26px'}/>
                    {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Схема здания</span>}
                </div>
            </div>
            {
                this.props.userData && this.props.userData.type === 'master' &&
                <div className={'card-header'} onClick={() => {
                    this.props.setContentPanel('students')
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <People height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) && <span style={{paddingLeft: '20px'}}>Ученики</span>}
                    </div>
                </div>
            }
        </div>
    }
}

export default ModulesList