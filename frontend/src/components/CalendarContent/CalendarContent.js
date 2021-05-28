import React from "react";
import {Calendar, Views, momentLocalizer} from "react-schedule-calendar";
import moment from 'moment'
import 'moment/locale/ru'
import {Plus} from "react-bootstrap-icons"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalAddCalendar from "../ModalAddCalendar/ModalAddCalendar";
import ModalUpdateCalendar from "../ModalUpdateCalendar/ModalUpdateCalendar";
import {Form} from "react-bootstrap";

moment.locale('ru')
const localizer = momentLocalizer(moment)

const messages = { // new
    allDay: 'Все дни',
    previous: 'Назад',
    next: 'Вперед',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Повестка',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    work_week: 'Рабочая неделя',
    tomorrow: 'Завтра',
    noEventsInRange: 'Нет событий в заданном диапазоне',
    showMore: function (e) {
        return '+' + e + ' больше'
    }
};

const ColoredDateCellWrapper = ({children}) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })

export default class CalendarContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            modalShow: false,
            modalUpdateShow: false,
            currentEvent: null
        }
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    setModalUpdateShow = (modalShow) => {
        this.setState({
            modalUpdateShow: modalShow
        })
    }

    setEvents = (events) => {
        this.setState({
            events: events
        })
    }

    onNavigate = (date) => {
        moment.locale('ru')
        const start = moment(date).startOf('month').startOf('week')
        const end = moment(date).endOf('month').endOf('week')
        this.setState({
            start: start,
            end: end
        })
        this.props.eventsSearch({
            start: start,
            end: end
        }).then(data => {
            this.setState({
                events: data.data
            })
        })
    }
    getEvents = () => {
        return this.props.eventsSearch({
            start: this.state.start,
            end: this.state.end
        })
    }

    componentDidMount() {
        document.title = 'Задачи'
        this.props.setHeaderName('Задачи')
        this.onNavigate(new Date())
    }

    updateCheckEvent = (e, id) => {
        this.props.updateEvent(id, {completed: e.target.checked}).then(data => {
            const events = this.state.events
            for (let i = 0 ; i < events.length; i++){
                if (events[i].id === id) {
                    events[i] = data.data
                    break
                }
            }
            this.setState({
                events: events
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'} style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{
                        padding: "40px 12px 20px 12px",
                        position: 'relative',
                        zIndex: 2,
                        fontWeight: '900',
                        fontSize: '2em',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            Календарь событий
                        </div>
                        <div>
                            {
                                this.props.width < 770 &&
                                <div className={'float-button-add-calendar'} onClick={() => this.setModalShow(true)}>
                                    <Plus width={'32px'} height={'32px'}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{display: "flex", flexGrow: 1}}>
                        <div style={{
                            display: 'flex',
                            position: 'relative',
                            width: this.props.width < 770 ? '100%' : '60%'
                        }}>
                            {
                                this.props.width >= 770 &&
                                <div style={{position: 'absolute', top: '-50px', right: 0, zIndex: 3}}>
                                    <div className={'float-button-add-calendar'}
                                         onClick={() => this.setModalShow(true)}>
                                        <Plus width={'32px'} height={'32px'}/>
                                    </div>
                                </div>
                            }
                            <Calendar
                                localizer={localizer}
                                culture={'ru'}
                                events={this.state.events}
                                views={[Views.MONTH, Views.AGENDA]}
                                step={60}
                                showMultiDayTimes
                                defaultDate={new Date()}
                                messages={messages}
                                components={{
                                    timeSlotWrapper: ColoredDateCellWrapper,
                                }}
                                onRangeChange={e => {
                                    this.setState({
                                        start: e.start,
                                        end: e.end
                                    })
                                    this.props.eventsSearch(e).then(data => {
                                        this.setState({
                                            events: data.data
                                        })
                                    })
                                }}
                                onSelectEvent={e => {
                                    this.setState({
                                        modalUpdateShow: true,
                                        currentEvent: e
                                    })
                                }}
                            />
                        </div>
                        {
                            this.props.width >= 770 &&
                            <div style={{width: '40%', boxSizing: 'border-box', padding: '12px', paddingTop: '0'}}>
                                {
                                    this.state.events.map(item => {
                                        return <Form style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Control type="checkbox"
                                                          checked={item.completed}
                                                          style={{width: '2em'}} onChange={e => this.updateCheckEvent(e, item.id)}/>
                                            <Form.Label style={{
                                                paddingLeft: '10px',
                                                textDecoration: item.completed ? 'line-through' : null
                                            }}>{item.title}</Form.Label>
                                        </Form>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                {
                    this.state.modalShow && <ModalAddCalendar
                        getEvents={this.getEvents}
                        setEvents={this.setEvents}
                        show={this.state.modalShow}
                        addEvent={this.props.addEvent}
                        onHide={() => this.setModalShow(false)}/>
                }
                {
                    this.state.modalUpdateShow && <ModalUpdateCalendar
                        getEvents={this.getEvents}
                        setEvents={this.setEvents}
                        events={this.state.events}
                        show={this.state.modalUpdateShow}
                        updateEvent={this.props.updateEvent}
                        deleteEvent={this.props.deleteEvent}
                        currentEvent={this.state.currentEvent}
                        onHide={() => this.setModalUpdateShow(false)}/>
                }
            </div>
        </div>
    }

}