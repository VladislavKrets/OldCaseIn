import React from "react";
import './User.css'

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return <div className={'user-content'}>
            <div style={{margin: '0 12px', boxSizing: 'border-box'}}>
                <h3 style={{
                    textAlign: 'center',
                    color: '#73a7ff',
                    backgroundColor: '#f7faff',
                    fontWeight: 'bold',
                    width: '100%',
                    borderRadius: '12px',
                    padding: '20px 0',
                    boxSizing: 'border-box',

                }}>{this.capitalizeFirstLetter(this.props.userData.first_name)} {this.capitalizeFirstLetter(this.props.userData.last_name)}</h3>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Ваш рейтинг:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.total_score}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Количество дней в аккаунте:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.days_count}
                        </h4>
                    </div>
                </div>

                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Количество выполненных задач:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.completed_tasks_count}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Моя группа
                        </h3>
                    </div>
                </div>

                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Количество сообщений боту:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.bot_messages_count}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Количество сообщений в чате:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.chat_messages_count}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Оценка руководителя:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.master_mark}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default User