import {withRouter} from "react-router";
import React from "react";
import InitChat from '../InitChat/Form'
import Chat from '../Chat/Chat'
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dialogs from "../Dialogs/Dialogs";
import './Messages.css'
import NotificationInstance from "../../services/NotificationSocket";
import WebSocketInstance from "../../services/WebSocket";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogs: [],
        }
        this.waitForSocketConnection(() => {
            NotificationInstance.init(this.props.token);
            NotificationInstance.addCallbacks(this.addMessage.bind(this))
        });
    }

    addMessage(message){
        const user = this.props.userData.id === message.author.id
            ? message.recipient : message.author;
        const dialogs = this.state.dialogs.filter(x => !(x.author.id === user.id
            || x.recipient.id === user.id))
        dialogs.unshift(message)
        this.updateDialogs(dialogs)
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

    updateDialogs = dialogs => this.setState({dialogs})

    componentDidMount() {
        document.title = 'Сообщения'
        this.props.setHeaderName('Сообщения')
        this.handleLoginSubmit()
    }

    handleLoginSubmit = () => {
        WebSocketInstance.connect();
        NotificationInstance.connect();
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <div className={'messagesContent'}>
                        {!(this.props.width < 920 && window.location.pathname.match(/main\/messages\/\d+\//)) &&
                            <Dialogs
                                getAllUsers={this.props.getAllUsers}
                                history={this.props.history}
                                userData={this.props.userData}
                                getDialogs={this.props.getDialogs}
                                dialogs={this.state.dialogs}
                                updateDialogs={this.updateDialogs}
                            />
                        }
                        <PrivateRoute loading={false} token={this.props.token}
                                      path={`${this.props.match.url}/:id`}>
                            <Chat
                                key={window.location.pathname}
                                token={this.props.token}
                                userData={this.props.userData}
                                getUser={this.props.getUser}
                                dialogs={this.state.dialogs}
                                updateDialogs={this.updateDialogs}
                            />
                        </PrivateRoute>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Messages)