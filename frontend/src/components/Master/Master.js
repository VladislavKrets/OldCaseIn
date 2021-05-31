import './Master.css'
import {withRouter} from "react-router";
import {ResponsiveLine} from '@nivo/line'
import React from "react";

class Master extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            currentGroup: 0,
            graphData: [],
            groupData: null
        }
    }

    componentDidMount() {
        this.props.getGroups().then(data => {
            const graphData = []
            if (data.data.length > 0) {
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Количество баллов',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(39, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.total_score
                            }
                        })
                    }]
                })
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Количество дней в аккаунте',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(223, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.days_count
                            }
                        })
                    }]
                })
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Количество выполненных задач',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(223, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.completed_tasks_count
                            }
                        })
                    }]
                })
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Оценка руководителя',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(223, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.master_mark
                            }
                        })
                    }]
                })
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Количество сообщений боту',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(223, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.bot_messages_count
                            }
                        })
                    }]
                })
                graphData.push({
                    legendBottom: 'Сотрудники',
                    legendLeft: 'Количество сообщений в чате',
                    data: [{
                        id: data.data[0].name,
                        color: "hsl(223, 70%, 50%)",
                        data: data.data[0].users.map(item => {
                            return {
                                x: item.first_name + " " + item.last_name,
                                y: item.chat_messages_count
                            }
                        })
                    }]
                })
            }
            this.setState({
                groups: data.data,
                graphData: graphData
            })
        })
    }

    render() {
        return <>
            {this.state.groups.length > 0 && <>
                <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '30px'}}>
                    <div>

                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '1.4em'}}>
                        {this.state.groups[this.state.currentGroup].name}
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    {
                        this.state.groups[this.state.currentGroup].users.map(item => {
                            return <div style={{
                                textAlign: 'center',
                                paddingBottom: '15px',
                                fontWeight: '1.2em',
                            }}>
                                        <span style={{cursor: 'pointer'}}
                                              onClick={() => this.props.history.push(`/main/users/${item.id}`)}>
                                            {item.first_name} {item.last_name}</span>
                            </div>
                        })
                    }
                </div>
                {
                    this.state.graphData.map(item => {
                        return <div className={'graphic-container'}>
                    <ResponsiveLine
                        data={item.data}
                        margin={{top: 50, right: 10, bottom: 50, left: 50}}
                        xScale={{type: 'point'}}
                        yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
                        yFormat=" >-.2f"
                        curve="cardinal"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: item.legendBottom,
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: item.legendLeft,
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        pointSize={10}
                        pointColor={{theme: 'background'}}
                        pointBorderWidth={2}
                        pointBorderColor={{from: 'serieColor'}}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        motionConfig="wobbly"
                    />
                </div>
                    })
                }
            </>}
        </>
    }
}

export default Master