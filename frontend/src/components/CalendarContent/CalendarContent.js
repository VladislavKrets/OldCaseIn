import React from "react";
import {Calendar, Views, momentLocalizer} from "react-schedule-calendar";
import moment from 'moment'
import 'moment/locale/ru'
import {Plus} from "react-bootstrap-icons"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalAddCalendar from "../ModalAddCalendar/ModalAddCalendar";
import ModalUpdateCalendar from "../ModalUpdateCalendar/ModalUpdateCalendar";

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
  showMore: function(e) {
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

    componentDidMount() {
        document.title = 'Задачи'
        this.props.setHeaderName('Задачи')
        this.props.getEvents().then(data => {
            this.setState({
                events: data.data
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
                            <div className={'float-button-add-calendar'} onClick={() => this.setModalShow(true)}>
                                <Plus width={'32px'} height={'32px'}/>
                            </div>
                        </div>
                    </div>
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
                        onRangeChange={e => console.log(e)}
                        onSelectEvent={e => {
                            this.setState({
                                modalUpdateShow: true,
                                currentEvent: e
                            })
                        }}
                    />
                </div>
                {
                    this.state.modalShow && <ModalAddCalendar
                        getEvents={this.props.getEvents}
                        setEvents={this.setEvents}
                        show={this.state.modalShow}
                        addEvent={this.props.addEvent}
                        onHide={() => this.setModalShow(false)}/>
                }
                {
                    this.state.modalUpdateShow && <ModalUpdateCalendar
                        getEvents={this.props.getEvents}
                        setEvents={this.setEvents}
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