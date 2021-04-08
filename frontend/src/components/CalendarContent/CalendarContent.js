import React from "react";
import {Calendar, Views, momentLocalizer} from "react-schedule-calendar";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalAddCalendar from "../ModalAddCalendar/ModalAddCalendar";


const ColoredDateCellWrapper = ({children}) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })
const localizer = momentLocalizer(moment)

export default class CalendarContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            modalShow: false,
        }
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    setEvents = (events) => {
        this.setState({
            events: events
        })
    }

    componentDidMount() {
        this.props.getEvents().then(data => {
            this.setState({
                events: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'float-button-add-calendar'} onClick={() => this.setModalShow(true)}>
                    +
                </div>
                <div className={'moduleContent'}>
                    <Calendar
                        events={this.state.events}
                        views={[Views.MONTH]}
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date()}
                        components={{
                            timeSlotWrapper: ColoredDateCellWrapper,
                        }}
                        localizer={localizer}
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
            </div>
        </div>
    }

}