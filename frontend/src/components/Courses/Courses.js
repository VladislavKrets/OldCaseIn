import './Courses.css'
import {withRouter} from "react-router";
import React from "react";
import {Plus} from "react-bootstrap-icons";

class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        this.props.setHeaderName('Обучение')
        this.props.getCourses().then(data => {
            this.setState({
                courses: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <div style={{
                        padding: "40px 12px 20px 12px",
                        position: 'relative',
                        zIndex: 2,
                        fontWeight: '900',
                        fontSize: '2em',

                    }} className={'module-content-header'}>
                        Доступные курсы
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            position: 'relative',
                            zIndex: 2,
                            width: "auto"
                        }}>
                            {
                                this.state.courses.map(item => {
                                    return <div className={'course-block'} onClick={() => {
                                        this.props.history.push(`${this.props.match.url}/${item.id}`)
                                    }}>
                                        <div className={'course-block-preview'} style={{
                                            backgroundImage: `url(${item.preview_photo})`
                                        }}>
                                        </div>
                                        <div style={{textAlign: 'center', paddingTop: '10px'}}>
                                            {item.name}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Courses)