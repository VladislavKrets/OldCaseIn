import React from "react";
import {Calendar, Views, momentLocalizer} from "react-schedule-calendar";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


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
            events: []
        }
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
            </div>
        </div>
    }

}