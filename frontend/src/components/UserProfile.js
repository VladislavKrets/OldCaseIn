import React from "react";
import './UserProfile.css'
import {Button} from "react-bootstrap";

class UserProfile extends React.Component {
    render() {
        return <div className={'user-profile'} style={{
            height: '100vh',
            overflowY: 'scroll'
        }}>
            <div style={{padding: '12px 10px', paddingBottom: 0,
                display: "flex", flexDirection: "row-reverse"}}>
                <Button variant="link" onClick={this.props.logOut}>Выйти</Button>
            </div>
            <hr/>
        </div>
    }
}

export default UserProfile