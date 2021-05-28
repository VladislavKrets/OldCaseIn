import React from "react";
import {Accordion, Card, Button} from "react-bootstrap";
import './Menu.css'
import logo from '../../assets/logo.png'
import {Link} from "react-router-dom";
import {
    Person,
    Collection,
    FileEarmarkText,
    CalendarEvent,
    Building,
    InfoCircle,
    People,
    BoxArrowRight, BarChartLine, CalendarWeek, ChatText
} from 'react-bootstrap-icons'

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    chooseLesson = (module, lessonId) => {
        this.props.setModuleLoading(true)
        this.props.setCurrentLesson(module, lessonId)
        this.props.getLesson(lessonId).then(data1 => {
            this.props.getQuestions(lessonId).then(data => {
                this.props.setLessonData(data1.data)
                this.props.setQuestionsData(data.data)
                this.props.setModuleLoading(false)
            })
        })

        this.props.closeDrawer(false)
    }

    render() {
        if (!String.prototype.includes) {
            String.prototype.includes = function (search, start) {
                if (typeof start !== 'number') {
                    start = 0;
                }
                if (start + search.length > this.length) {
                    return false;
                } else {
                    return this.indexOf(search, start) !== -1;
                }
            };
        }
        return <div className={'modules-list-none-overflow'
        + (window.location.pathname.match(/\/main\/courses\/\d+.*/) ? ' no-pseudo-elements' : '')}>
            <div className={'modules-list'}>
                <div style={{display: 'flex', justifyContent: 'center', padding: '30px 0'}}>
                    <img src={logo} style={{width: '60%', position: "relative", zIndex: 2}}/>
                </div>
                <div className={'card-header'}
                     onClick={() => {
                         this.props.history.push('/main/me')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <Person height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/me') ? '900' : 'normal'
                        }}>Профиль</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.history.push('/main/calendar')
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <CalendarWeek height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/calendar') ? '900' : 'normal'
                        }}>Задачи</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.closeDrawer(false)
                    this.props.history.push('/main/messages')
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <ChatText height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/messages') ? '900' : 'normal'
                        }}>Сообщения</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.closeDrawer(false)
                    this.props.history.push('/main/courses')
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <BarChartLine height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.includes('/main/courses') ? '900' : 'normal'
                        }}>Обучение</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.history.push('/main/documents')
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <FileEarmarkText height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/documents') ? '900' : 'normal'
                        }}>Документация</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.history.push('/main/bot')
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <InfoCircle height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/bot') ? '900' : 'normal'
                        }}>Помощник</span>}
                    </div>
                </div>
                <div className={'card-header'} onClick={() => {
                    this.props.history.push('/main/building')
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <Building height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.includes('/main/building') ? '900' : 'normal'
                        }}>Схема здания</span>}
                    </div>
                </div>
                {this.props.setModalShow && <div className={'card-header'} onClick={() => {
                    this.props.setModalShow(true)
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <BoxArrowRight height={'26px'} width={'26px'}/>
                        {(!this.props.width || this.props.width > 1270) &&
                        <span style={{paddingLeft: '20px', fontWeight: 'normal'}}>Выйти</span>}
                    </div>
                </div>
                }
            </div>
        </div>
    }
}

export default Menu