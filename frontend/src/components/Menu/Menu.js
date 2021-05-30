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
import helloImg from '../../assets/na_privetstvie.png'
import endImg from '../../assets/na_konets.png'

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
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
            {
                this.props.width >= 770
                && !this.props.userData.is_learning_shown
                && this.props.learningPages[this.props.currentLearningPage] === 'hello'
                &&
                <div className={'about-service-container'} onClick={this.props.nextLearning}>
                    <div style={{display: 'flex', width: '70%', maxWidth: '70%'}}>
                        <div>
                            <img width={'200px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'}>
                            <div className={'learning-service-text'}>
                                Приветствую тебя на сайте по адаптации новых сотрудников.
                            </div>
                            <div className={'learning-service-text'}>
                                Сейчас я тебе расскажу об основных функциях.
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={'modules-list'}
                 style={{overflowY: this.props.width < 770 || this.props.userData.is_learning_shown ? null : 'visible'}}>
                <div style={{display: 'flex', justifyContent: 'center', padding: '30px 0'}}>
                    <img src={logo} style={{width: '60%', position: "relative", zIndex: 2}}/>
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'profile' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.history.push('/main/me')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <Person height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/me') ? '900' : 'normal'
                        }}>Профиль</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'profile' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'profile' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Нажав сюда, откроется информация о твоих успехах.
                            </div>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Данная информация передается руководителю твоей группы для оценки успешности
                                адаптации.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'tasks' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.history.push('/main/calendar')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <CalendarWeek height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/calendar') ? '900' : 'normal'
                        }}>Задачи</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'tasks' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'tasks' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Здесь находится календарь.
                            </div>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                В нем ты сможешь планировать задачи и отмечать их выполнение.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'messages' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.closeDrawer(false)
                         this.props.history.push('/main/messages')
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <ChatText height={'26px'} width={'26px'}/>
                        {(this.props.width < 770|| this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/messages') ? '900' : 'normal'
                        }}>Сообщения</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'messages' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'messages' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Перейдя на эту вкладку, ты можешь начать общение со своими коллегами.
                            </div>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Выбери в поиске имя собеседника и напиши первое сообщение.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'learning' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.closeDrawer(false)
                         this.props.history.push('/main/courses')
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <BarChartLine height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.includes('/main/courses') ? '900' : 'normal'
                        }}>Обучение</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'learning' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'learning' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                В этой вкладке ты можешь выбрать курс и пройти обучение.
                            </div>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Выбери курс и проходи обучение.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'documents' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.history.push('/main/documents')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <FileEarmarkText height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/documents') ? '900' : 'normal'
                        }}>Документация</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'documents' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'documents' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Все необходимые документы здесь.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'helper' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.history.push('/main/bot')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <InfoCircle height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.endsWith('/bot') ? '900' : 'normal'
                        }}>Помощник</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'helper' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'helper' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={endImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Если останутся вопросы, ты можешь найти меня здесь.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className={'card-header'}
                     style={{
                         zIndex: this.props.learningPages[this.props.currentLearningPage] !== 'buildings' ? 3 : null
                     }}
                     onClick={() => {
                         this.props.history.push('/main/building')
                         this.props.closeDrawer(false)
                     }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <Building height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{
                            paddingLeft: '20px',
                            fontWeight: window.location.pathname.includes('/main/building') ? '900' : 'normal'
                        }}>Схема здания</span>}
                    </div>
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'buildings' &&
                    <div className={'about-service-container'} onClick={this.props.nextLearning}>

                    </div>
                    }
                    {this.props.width >= 770
                    && !this.props.userData.is_learning_shown
                    && this.props.learningPages[this.props.currentLearningPage] === 'buildings' &&
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 6,
                        top: '0',
                        right: '60px',
                        alignItems: 'center',
                        transform: 'translateX(100%) translateY(-50%)',
                        cursor: 'default'
                    }} onClick={this.props.nextLearning}>
                        <div>
                            <img width={'100px'} src={helloImg}/>
                        </div>
                        <div className={'learning-service-text-container'} style={{width: '800px'}}>
                            <div className={'learning-service-text'} style={{fontSize: '1.5em'}}>
                                Чтобы тебе легче было ориентироваться в помещениях, изучи карту здания.
                            </div>
                        </div>
                    </div>
                    }
                </div>
                {this.props.setModalShow && <div className={'card-header'} style={{zIndex: 3}} onClick={() => {
                    this.props.setModalShow(true)
                    this.props.closeDrawer(false)
                }}>
                    <div className={'modules-card-content' + (this.state.width ? ' modules-card-content-center' : '')}>
                        <BoxArrowRight height={'26px'} width={'26px'}/>
                        {(this.props.width < 770 || this.props.width > 1270) &&
                        <span style={{paddingLeft: '20px', fontWeight: 'normal'}}>Выйти</span>}
                    </div>
                </div>
                }
            </div>
        </div>
    }
}

export default Menu