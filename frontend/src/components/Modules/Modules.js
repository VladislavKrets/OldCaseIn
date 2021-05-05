import {withRouter} from "react-router";
import React from "react";

class Modules extends React.Component {

    componentDidMount() {
        this.props.setModules([])
        this.props.getModules(this.props.match.params.id).then(data => {
            this.props.setModules(data.data)
        })
    }

    render() {
        return <div>

        </div>
    }
}
export default withRouter(Modules)