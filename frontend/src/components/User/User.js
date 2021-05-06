import React from "react";
import './User.css'
import ModalAddCalendar from "../ModalAddCalendar/ModalAddCalendar";
import ModalGroupMembers from "../ModalGroupMembers/ModalGroupMembers";
import defaultProfile from "../../assets/default_profile.svg"

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    componentDidMount() {
        this.props.getUser().then(data => {
            this.props.setUserData(data.data)
        })
    }

    render() {
        return this.props.userData ? <div className={'user-content'}>
            <div className={'user-hello'}>
                <div className={'hello-phrase'}>
                    Здравствуйте, {this.capitalizeFirstLetter(this.props.userData.first_name)}!
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{marginRight: '7px'}}>
                        <img src={defaultProfile}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontWeight: '900'}}>
                        <div>{this.capitalizeFirstLetter(this.props.userData.first_name)}</div>
                        <div>{this.capitalizeFirstLetter(this.props.userData.last_name)}</div>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Ваш рейтинг:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.rank === undefined ? 'Недоступно' : this.props.userData.rank}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Количество баллов:
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
                            Количество сообщений боту:
                        </h3>
                        <h4 style={{color: 'inherit', textAlign: 'center'}}>
                            {this.props.userData.bot_messages_count}
                        </h4>
                    </div>
                </div>
                <div className={'user-content-card'} style={{cursor: 'pointer'}}
                     onClick={() => this.setModalShow(true)}>
                    <div>
                        <h3 style={{color: 'inherit', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold'}}>
                            Моя группа
                        </h3>
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
            {
                this.state.modalShow && <ModalGroupMembers
                    show={this.state.modalShow}
                    getUserGroupData={this.props.getUserGroupData}
                    onHide={() => this.setModalShow(false)}/>
            }
        </div> : <div/>
    }
}

export default User