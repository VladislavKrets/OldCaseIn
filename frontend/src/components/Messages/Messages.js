import {withRouter} from "react-router";
import React from "react";
import InitChat from '../InitChat/Form'
import Chat from '../Chat/Chat'
import WebSocketInstance from '../../services/WebSocket'

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
                    <Chat
                        token={this.props.token}
                        userData={this.props.userData}
                    />
                </div>
            </div>
        </div>
    }
}

export default withRouter(Messages)