import {withRouter} from "react-router";
import React from "react";

class Messages extends React.Component {

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                </div>
            </div>
        </div>
    }
}
export default withRouter(Messages)