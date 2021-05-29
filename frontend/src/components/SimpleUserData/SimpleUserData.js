import React from "react";
import {ResponsiveRadar} from '@nivo/radar';

export default class SimpleUserData extends React.Component {

    round = x => {
        return Math.round(x * 100) / 100
    }



    render() {
        return <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Ваш рейтинг:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.rank === undefined ? 'Недоступно' : this.props.userData.rank}
                    </h4>
                </div>
            </div>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Количество баллов:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.total_score}
                    </h4>
                </div>
            </div>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Количество дней в аккаунте:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.days_count}
                    </h4>
                </div>
            </div>

            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Количество выполненных задач:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.completed_tasks_count}
                    </h4>
                </div>
            </div>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Количество сообщений в чате:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.chat_messages_count}
                    </h4>
                </div>
            </div>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Количество сообщений боту:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.bot_messages_count}
                    </h4>
                </div>
            </div>
            <div className={'user-content-card'} style={{cursor: 'pointer'}}
                 onClick={() => this.props.setModalShow(true)}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Моя группа
                    </h3>
                </div>
            </div>
            <div className={'user-content-card'}>
                <div>
                    <h3 style={{
                        color: 'inherit',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontWeight: 'bold'
                    }}>
                        Оценка руководителя:
                    </h3>
                    <h4 style={{color: 'inherit', textAlign: 'center'}}>
                        {this.props.userData.master_mark}
                    </h4>
                </div>
            </div>
            {this.props.masterPreview && <div className={'user-content-card'} style={{width: '100%', height: '300px'}}>
                <ResponsiveRadar
                    data={[
                        {
                            "name": "Сообщения боту",
                            "Нормализованное значение": this.round(this.props.userData.normal_bot_messages_count),
                        },
                        {
                            "name": "Сообщения в чате",
                            "Нормализованное значение": this.round(this.props.userData.normal_chat_messages_count),
                        },
                        {
                            "name": "Выполненные задачи",
                            "Нормализованное значение": this.round(this.props.userData.normal_completed_tasks_count),
                        },
                        {
                            "name": "Дни в аккаунте",
                            "Нормализованное значение": this.round(this.props.userData.normal_days_count),
                        },
                        {
                            "name": "Количество баллов",
                            "Нормализованное значение": this.round(this.props.userData.normal_total_score),
                        }
                    ]}
                    keys={['Нормализованное значение']}
                    indexBy="name"
                    maxValue={1}
                    margin={{top: 70, right: 80, bottom: 40, left: 80}}
                    curve="cardinalClosed"
                    borderWidth={2}
                    borderColor={{from: 'color'}}
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{theme: 'background'}}
                    dotBorderWidth={2}
                    dotBorderColor={{from: 'color'}}
                    enableDotLabel={true}
                    dotLabel=""
                    dotLabelYOffset={-12}
                    colors={{scheme: 'nivo'}}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                    motionConfig="wobbly"
                    isInteractive={true}
                />
            </div>
            }
        </div>
    }
}