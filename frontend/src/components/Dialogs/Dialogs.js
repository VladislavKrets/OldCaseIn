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
            prevSearchValue: '',
            searchValue: '',
            allUsers: [],
            loading: true
        }
        this.messageSearchRef = React.createRef()
    }

    removeUsersShown = () => {
        this.setState({
            areUsersShown: false
        })
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.props.getDialogs().then(data => {
            this.props.updateDialogs(data.data)
            this.setState({
                loading: false
            })
        })
    }

    handleChange = e => {
        if (this.state.searchValue.trim() !== e.target.value.trim()) {
            if (e.target.value.trim()) {
                this.props.searchUser(e.target.value.trim())
                    .then(data => this.setState({allUsers: data.data}))
            } else {
                this.props.getAllUsers()
                    .then(data => this.setState({allUsers: data.data}))
            }
        }
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        const paths = window.location.pathname.split('/')
        let id = 0;
        if (paths.length > 3) id = paths[3]
        return <div className={'dialog-container'} style={{flexGrow: 1, width: '40%', boxSizing: 'border-box'}}>
            {this.state.areUsersShown &&
            <div style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 3,
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
                zIndex: 4,
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
                            onChange={this.handleChange}
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
                                        <img
                                            src={item.avatar ? item.avatar.image : defaultProfile}
                                            style={{
                                                width: '70px',
                                                height: '70px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}/>
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
                    this.props.dialogs.map((item, index) => {
                        const user = item.recipient.id === this.props.userData.id ? item.author : item.recipient
                        return <div style={{
                            width: '100%',
                            padding: '12px',
                            display: 'flex',
                            backgroundColor: user.id == id ? '#DEF7FF' : '#F4F4F4',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            marginBottom: '12px',
                            zIndex: 2
                        }} onClick={() => this.props.history
                            .push(`/main/messages/${user.id}/`)}>
                            <div style={{paddingRight: '12px'}}>
                                <img
                                    src={user.avatar ? user.avatar.image : defaultProfile}
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}/>
                            </div>
                            <div style={{flexGrow: 1, width: 'calc(100% - 83px)', maxWidth: 'calc(100% - 83px)'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
                                    <div>{user.first_name} {user.last_name}</div>
                                    <div>
                                        <Moment format="HH:mm">
                                            {item.created_at}
                                        </Moment>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{
                                        borderRadius: '20px',
                                        padding: '12px',
                                        width: 'calc(100% - 20px)',
                                        maxWidth: 'calc(100% - 20px)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {item.content}
                                    </div>
                                    {
                                        this.props.userData.id !== item.author.id && !item.is_read && <div style={{
                                            borderRadius: '50%',
                                            boxSizing: 'border-box',
                                            marginLeft: '5px',
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: 'blue'
                                        }}/>
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
                {
                    !this.state.loading && this.props.dialogs.length === 0 &&
                    <div style={{paddingTop: '30px', textAlign: 'center', width: '100%'}}>
                        Диалоги не найдены
                    </div>
                }
            </div>
        </div>
    }
}

export default Dialogs;