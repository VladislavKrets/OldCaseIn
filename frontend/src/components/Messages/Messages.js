import {withRouter} from "react-router";
import React from "react";
import InitChat from '../InitChat/Form'
import Chat from '../Chat/Chat'
import WebSocketInstance from '../../services/WebSocket'
import PrivateRoute from "../PrivateRoute/PrivateRoute";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

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
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/:id`}>
                        <Chat
                            token={this.props.token}
                            userData={this.props.userData}
                        />
                    </PrivateRoute>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Messages)