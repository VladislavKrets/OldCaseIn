import React from "react";
import './Dialogs.css'
import {EmojiSmile, Search} from "react-bootstrap-icons";
import defaultProfile from "../../assets/default_profile.svg";
import Moment from "react-moment";

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areUsersShown: false,
            searchValue: '',
            allUsers: [],
            dialogs: [],
        }
        this.messageSearchRef = React.createRef()
    }

    removeUsersShown = () => {
        this.setState({
            areUsersShown: false
        })
    }

    componentDidMount() {
        this.props.getDialogs().then(data => {
            this.setState({
                dialogs: data.data
            })
        })
    }

    render() {
        return <div style={{flexGrow: 1, width: '40%', boxSizing: 'border-box'}}>
            {this.state.areUsersShown &&
            <div style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 2,
                overflow: 'hidden',
                top: 0,
                left: 0
            }}
                 onClick={this.removeUsersShown}>
            </div>
            }
            <div style={{
                position: 'relative',
                zIndex: 2,
                fontWeight: '900',
                fontSize: '2em',

            }} className={'module-content-header'}>
                Диалоги
            </div>
            <div style={{
                position: 'relative',
                zIndex: 3,
            }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                }} className='form' style={{display: 'flex', width: '100%'}}>
                    <div className={'search-messages-field'}
                         onClick={(e) => {
                             e.stopPropagation()
                             this.messageSearchRef.current.focus()
                             if (!this.state.areUsersShown && !this.state.searchValue.trim()) {
                                 this.props.getAllUsers().then(data => {
                                     this.setState({
                                         allUsers: data.data,
                                         areUsersShown: true
                                     })
                                 })
                             }
                         }}>
                        <Search width={'32px'} height={'32px'} fill={'#C4C4C4'}/>
                        <input
                            ref={this.messageSearchRef}
                            type='text'
                            value={this.state.searchValue}
                            onChange={e => this.setState({searchValue: e.target.value})}
                            placeholder='Поиск'
                            required/>
                        {this.state.areUsersShown && <div
                            className={'users-search-message'}
                            onClick={e => e.stopPropagation()}>
                            {
                                this.state.allUsers.map((item, index) => {
                                    return <div style={{
                                        display: 'flex',
                                        padding: '5px 0',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }} onClick={() => this.props.history.push(`/main/messages/${item.id}/`)}>
                                        <img src={defaultProfile}/>
                                        <div style={{paddingLeft: '12px'}}>
                                            {item.first_name} {item.last_name}
                                        </div>
                                        <hr/>
                                    </div>
                                })
                            }
                        </div>
                        }
                    </div>
                </form>
            </div>
            <div style={{
                position: 'relative',
                zIndex: 2,
            }}>
                {
                    this.state.dialogs.map((item, index) => {
                        const user = item.recipient.id === this.props.userData.id ? item.author : item.recipient
                        return <div style={{
                            width: '100%',
                            padding: '12px',
                            display: 'flex',
                            backgroundColor: '#F4F4F4',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            marginBottom: '12px',
                            zIndex: 2
                        }} onClick={() => this.props.history
                            .push(`/main/messages/${user.id}/`)}>
                            <div style={{paddingRight: '12px'}}>
                                <img src={defaultProfile}/>
                            </div>
                            <div style={{flexGrow: 1}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
                                    <div>{user.first_name} {user.last_name}</div>
                                    <div>
                                        <Moment format="HH:mm">
                                            {item.created_at}
                                        </Moment>
                                    </div>
                                </div>
                                <div style={{borderRadius: '20px', padding: '12px'}}>
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }
}

export default Dialogs;