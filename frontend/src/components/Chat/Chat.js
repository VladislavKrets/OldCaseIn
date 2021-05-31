import React, {Component} from 'react';
import './Chat.css';
import WebSocketInstance from '../../services/WebSocket'
import {withRouter} from "react-router";
import defaultProfile from "../../assets/default_profile.svg";
import Moment from 'react-moment';
import {EmojiSmile, Plus, PlusCircle} from "react-bootstrap-icons";
import Picker from 'emoji-picker-react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Spinner} from "react-bootstrap";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            to: null,
            isEmojiDialogShown: false,
            message: '',
            newMessages: [{text: 'text'},]
        }

        this.waitForSocketConnection(() => {
            WebSocketInstance.initChatUser(this.props.token, this.props.match.params.id);
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.token, this.props.match.params.id, this.state.messages.length);
        });
        this.inputMessage = React.createRef()
    }

    showEmojiDialog = (isEmojiDialogShown) => {
        this.setState({
            isEmojiDialogShown: isEmojiDialogShown
        })
    }

    closeEmojiDialog = () => {
        this.showEmojiDialog(false)
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                // Check if websocket state is OPEN
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100); // wait 100 milisecond for the connection...
    }

    componentDidMount() {
        this.scrollToBottom();
        this.props.getUser(this.props.match.params.id).then(data => {
            this.setState({
                to: data.data
            })
            const dialogs = this.props.dialogs
            for (let dialog of dialogs) {
                if (dialog.author.id == this.props.match.params.id) {
                    console.log(dialog)
                    dialog.is_read = true
                }
            }
            this.props.updateDialogs(dialogs)
        })
        document.body.addEventListener('click', this.closeEmojiDialog)
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.closeEmojiDialog)
    }

    scrollToBottom = () => {
        const chat = this.messagesEnd;
        const scrollHeight = chat.scrollHeight;
        const height = chat.clientHeight;
        const maxScrollTop = scrollHeight - height;
        chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    addMessage(message) {
        this.setState({messages: [...this.state.messages, message]});
        const user = this.props.userData.id === message.author.id
            ? message.recipient : message.author;
        const dialogs = this.props.dialogs.filter(x => !(x.author.id === user.id
            || x.recipient.id === user.id))
        dialogs.unshift(message)
        this.props.updateDialogs(dialogs)
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse().concat(this.state.messages),
            newMessages: messages
        });
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    onEmojiClick = (event, emojiObject) => {
        this.setState({
            message: this.state.message + emojiObject.emoji
        })
    };

    sendMessageHandler = (e, message) => {
        const messageObject = {
            token: this.props.token,
            text: message
        };
        WebSocketInstance.newChatMessage(this.props.token, messageObject, this.props.match.params.id);
        this.setState({
            message: ''
        })
        e.preventDefault();
    }

    renderMessages = (messages) => {
        const currentUser = this.props.token;
        return messages.map((message, i) => <div key={message.id}
                                                 className={'chat-message'}
                                                 style={{width: '100%', padding: '12px', display: 'flex'}}>
            <div style={{paddingRight: '12px'}}>
                <img
                    src={message.author.avatar ? message.author.avatar.image : defaultProfile}
                    style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}/>
            </div>
            <div style={{flexGrow: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
                    <div>{message.author.id === this.props.userData.id
                        ? this.props.userData.first_name : this.state.to.first_name}</div>
                    <div>
                        <Moment format="HH:mm">
                            {message.created_at}
                        </Moment>
                    </div>
                </div>
                <div style={{borderRadius: '20px', padding: '12px'}}
                     className={message.author.id === this.props.userData.id ? 'me' : 'him'}>
                    {message.content}
                </div>
            </div>
        </div>);
    }

    render() {
        const messages = this.state.messages;
        const currentUser = this.props.token;
        return (
            <div className='chat'>
                <div className={'chat-container'} id="scrollableDiv" style={{flexGrow: '1', overflow: 'auto'}}>
                    <InfiniteScroll
                        dataLength={this.state.messages.length} //This is important field to render the next data
                        next={() => WebSocketInstance
                            .fetchMessages(this.props.token,
                                this.props.match.params.id,
                                this.state.messages.length)}
                        hasMore={this.state.messages.length % 25 === 0 && this.state.newMessages.length !== 0}
                        inverse={true}
                        style={{display: 'flex', flexDirection: 'column-reverse'}}
                        loader={<div style={{
                            boxSizing: 'border-box',
                            padding: '12px',
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <Spinner animation="border" variant="primary"/>
                        </div>}
                        scrollableTarget="scrollableDiv"
                        endMessage={
                            <p style={{textAlign: 'center', paddingTop: '12px'}}>
                                <b>Сообщений больше нет</b>
                            </p>
                        }
                    >
                        <div ref={(el) => {
                            this.messagesEnd = el;
                        }}>
                            {
                                this.props.userData && this.state.to && messages &&
                                this.renderMessages(messages)
                            }
                        </div>
                    </InfiniteScroll>
                </div>
                <div style={{padding: '0 5px', paddingTop: '12px'}}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.sendMessageHandler(e, this.state.message)
                    }} className='form' style={{display: 'flex', width: '100%'}}>
                        <input
                            className={'input-message'}
                            type='text'
                            ref={this.inputMessage}
                            onChange={this.messageChangeHandler}
                            value={this.state.message}
                            placeholder='Сообщение'
                            required/>
                        <input type={'submit'} style={{display: 'none'}}/>
                        <div style={{
                            margin: '0 4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative'
                        }} onClick={(e) => {
                            e.stopPropagation()
                            this.inputMessage.current.focus()
                            this.showEmojiDialog(true)
                        }}>
                            <EmojiSmile width={'32px'} height={'32px'} fill={'#C4C4C4'}/>
                            {
                                this.state.isEmojiDialogShown &&
                                <div style={{
                                    position: 'absolute',
                                    zIndex: 3,
                                    top: '0',
                                    left: '0',
                                    transform: 'translateX(-100%) translateY(-100%)'
                                }}>
                                    <Picker onEmojiClick={this.onEmojiClick}/>
                                </div>
                            }
                        </div>
                        <div style={{margin: '0 4px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                            <PlusCircle width={'32px'} height={'32px'} fill={'#C4C4C4'}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Chat)