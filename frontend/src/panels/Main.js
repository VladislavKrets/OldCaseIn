import React from "react";
import {withRouter} from "react-router";
import {Button} from "react-bootstrap";

class Main extends React.Component{
    render() {
        return <div>
            <Button onClick={this.props.logOut}>
                Log out
            </Button>
        </div>
    }
}
export default withRouter(Main)