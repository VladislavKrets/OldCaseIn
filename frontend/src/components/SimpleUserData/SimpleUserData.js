import React from "react";

export default class SimpleUserData extends React.Component{
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
                        </div>
    }
}