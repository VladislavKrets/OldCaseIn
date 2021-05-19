import React, {Component} from 'react';
import './Chat.css';
import WebSocketInstance from '../../services/WebSocket'
import {withRouter} from "react-router";
import defaultProfile from "../../assets/default_profile.svg";
import Moment from 'react-moment';
import {EmojiSmile, Plus, PlusCircle} from "react-bootstrap-icons";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            to: null
        }

        this.waitForSocketConnection(() => {
            WebSocketInstance.initChatUser(this.props.token, this.props.match.params.id);
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.token, this.props.match.params.id);
        });
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
        console.log(this.props.match.params.id)
        this.props.getUser(this.props.match.params.id).then(data => {
            this.setState({
                to: data.data
            })
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
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
    }

    setMessages(messages) {
        this.setState({messages: messages.reverse()});
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

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
                <img src={defaultProfile}/>
            </div>
            <div style={{flexGrow: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
            <div className='chat' style={{
                flexGrow: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#DEF7FF',
                marginLeft: '30px',
                borderRadius: '12px',
                width: '60%',
                boxSizing: "border-box"
            }}>
                <div className='chat-container' style={{flexGrow: '1'}}>
                    <div ref={(el) => {
                        this.messagesEnd = el;
                    }}>
                        {
                            this.props.userData && this.state.to && messages &&
                            this.renderMessages(messages)
                        }
                    </div>
                </div>
                <div className='container message-form'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.sendMessageHandler(e, this.state.message)
                    }} className='form' style={{display: 'flex', width: '100%'}}>
                        <input
                            className={'input-message'}
                            type='text'
                            onChange={this.messageChangeHandler}
                            value={this.state.message}
                            placeholder='Сообщение'
                            required/>
                        <input type={'submit'} style={{display: 'none'}}/>
                        <div style={{margin: '0 4px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                            <EmojiSmile width={'32px'} height={'32px'} fill={'#C4C4C4'}/>
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