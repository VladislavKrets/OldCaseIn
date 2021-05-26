import './Master.css'
import {withRouter} from "react-router";
import React from "react";

class Master extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            currentGroup: 0,
        }
    }

    componentDidMount() {
        this.props.getGroups().then(data => {
            this.setState({
                groups: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    {this.state.groups.length > 0 && <>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>

                            </div>
                            <div>
                                {this.state.groups[this.state.currentGroup].name}
                            </div>
                            <div>

                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    }
}

export default withRouter(Master)