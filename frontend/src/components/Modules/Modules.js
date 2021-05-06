import {Redirect, withRouter} from "react-router";
import React from "react";
import Students from "../Students/Students";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

class Modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            course: null
        }
    }

    componentDidMount() {
        this.props.setModules([])
        this.props.getModules(this.props.match.params.course).then(data => {
            this.props.setModules(data.data)
        })
        this.props.getCourse(this.props.match.params.course).then(data => {
            this.setState({
                course: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'} style={{borderRadius: '40px'}}>
            <div className={'moduleContent-no-overflow-parent'} style={{borderRadius: '40px'}}>
                <div className={'moduleContent'} style={{borderRadius: '40px'}}>
                    {
                        window.location.pathname.match(/\/main\/courses\/\d+/) &&
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <div>
                                {
                                    this.state.course && <h3>
                                        Курс "{this.state.course.name}"
                                    </h3>
                                }
                            </div>
                        </div>
                    }
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/lessons/:lesson`}>
                        {this.state.userData && this.state.userData.type !== 'master' ?
                            <Redirect to={'/main/me'}/> :
                            <Students/>
                        }
                    </PrivateRoute>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Modules)