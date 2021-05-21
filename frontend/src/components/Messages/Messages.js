import {withRouter} from "react-router";
import React from "react";
import InitChat from '../InitChat/Form'
import Chat from '../Chat/Chat'
import WebSocketInstance from '../../services/WebSocket'
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dialogs from "../Dialogs/Dialogs";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            dialogs: [],
        }
    }

    updateDialogs = dialogs => this.setState({dialogs})

    componentDidMount() {
        document.title = 'Сообщения'
        this.props.setHeaderName('Сообщения')
        this.handleLoginSubmit()
    }

    handleLoginSubmit = () => {
        this.setState({loggedIn: true});
        WebSocketInstance.connect();
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        padding: '0 30px',
                        paddingTop: '50px',
                        paddingBottom: '12px'
                    }}>
                        <Dialogs
                            getAllUsers={this.props.getAllUsers}
                            history={this.props.history}
                            userData={this.props.userData}
                            getDialogs={this.props.getDialogs}
                            dialogs={this.state.dialogs}
                            updateDialogs={this.updateDialogs}
                        />
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