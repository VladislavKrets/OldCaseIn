import React from 'react'
import './ModuleContent.css'
import {Button, Form, Jumbotron, Spinner} from 'react-bootstrap'
import ModalTestCompleted from "../ModalTestCompleted/ModalTestCompleted";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

class ModuleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataLoaded: false,
            modalShow: false,
            resultData: null,
            submitEnabled: true,
            queryCount: 0,
            lesson: null,
            course: null,
            module: null
        }
    }

    componentDidMount() {
        this.props.getLesson(this.props.match.params.lesson).then(data => {
            this.setState({
                lesson: data.data
            })
        })
        this.props.getModule(this.props.match.params.course,
            this.props.match.params.module).then(data => {
            this.setState({
                module: data.data
            })
        })
        this.props.getCourse(this.props.match.params.course).then(data => {
            this.setState({
                course: data.data
            })
        })
    }

    render() {
        return this.state.course && this.state.module && this.state.lesson ?
            <div className={'moduleContent-content'}>
                <div className={'full-module-content-block'}>
                    <h2 style={{fontWeight: '900'}} className={'course-name-header'}>
                        {this.state.course.name}
                    </h2>
                </div>
                <div className={'full-module-content-block'}>
                    <h5 style={{fontWeight: '900'}}>
                        Модуль {this.state.module.number}. {this.state.module.name}
                    </h5>
                    <h5 style={{fontWeight: '900'}}>
                        Урок {this.state.lesson.number}.
                    </h5>
                </div>
                <div className={'full-module-content-block'}>
                                <pre className={'info'} style={{textAlign: 'center', fontSize: '1.25rem'}}>
                                    {this.state.lesson.themes}
                                </pre>
                </div>
                <div className={'full-module-content-block'}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <video className={'lesson-video'} controls="controls"
                               src={this.state.lesson.video}>
                        </video>
                    </div>
                </div>
                {
                    this.state.lesson.result && <div className={'full-module-content-block'}>
                        <div className={'moduleContent-test-completed'}>
                            Тест сдан
                        </div>
                        <div style={{textAlign: 'center'}}>
                            Ваш результат: {Math.round(this.state.lesson.result.result_score
                            / this.state.lesson.result.max_score * 100 * 100) / 100}%
                        </div>
                    </div>
                }
                {
                    !this.state.lesson.result && this.state.lesson.has_test && <div
                        className={'full-module-content-block'}
                        style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Link to={`${this.props.match.url}/test`}
                              className={'module-content-button'}>
                            Пройти тест
                        </Link>
                    </div>
                }
            </div> : <></>

    }
}

export default withRouter(ModuleContent)
