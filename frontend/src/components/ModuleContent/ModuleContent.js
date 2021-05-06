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
                <div style={{padding: '50px'}}>
                    <h2 style={{fontWeight: '900'}}>
                        {this.state.course.name}
                    </h2>
                </div>
                <div style={{padding: '50px'}}>
                    <h5 style={{fontWeight: '900'}}>
                        Модуль {this.state.module.number}. {this.state.module.name}
                    </h5>
                    <h5 style={{fontWeight: '900'}}>
                        Урок {this.state.lesson.number}.
                    </h5>
                </div>
                <div style={{padding: '50px'}}>
                                <pre className={'info'} style={{textAlign: 'center', fontSize: '1.25rem'}}>
                                    {this.state.lesson.themes}
                                </pre>
                </div>
                <div style={{padding: '50px'}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <video className={'lesson-video'} controls="controls"
                               src={this.state.lesson.video}>
                        </video>
                    </div>
                </div>
                {
                    this.state.lesson.result && <div style={{padding: '50px'}}>
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
                        style={{padding: '50px', display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Link to={`${this.props.match.url}/test`}
                              className={'module-content-button'}>
                            Пройти тест
                        </Link>
                    </div>
                }
                {
                    /*this.props.questionData && this.props.questionData.map(item => {

                        return <Jumbotron>
                            <Form>
                                <div style={{
                                    fontWeight: 'bold',
                                    paddingBottom: '15px'
                                }}>{item.question}</div>
                                {
                                    item.answers.map(answer => {
                                        {
                                            return <Form.Group>
                                                <div>
                                                    {
                                                        item.question_type === 'radio'
                                                            ? <Form.Check
                                                                id={`${answer.id}`}
                                                                type={'radio'}
                                                                disabled={!!this.props.lessonData.result}
                                                                checked={!!this.state[`${answer.id}`]}
                                                                label={answer.answer}
                                                                value={`${item.id}`}
                                                                name={`${answer.id}`}
                                                                onChange={(e) => this.handleChange(e, 'radio')}
                                                            />
                                                            : item.question_type === 'checkbox'
                                                            ? <Form.Check
                                                                id={`${answer.id}`}
                                                                disabled={!!this.props.lessonData.result}
                                                                checked={!!this.state[`${answer.id}`]}
                                                                label={answer.answer}
                                                                type={'checkbox'}
                                                                value={`${item.id}`}
                                                                name={`${answer.id}`}
                                                                onChange={(e) => this.handleChange(e, 'checkbox')}
                                                            />
                                                            : item.question_type === 'text'
                                                                ? <Form.Control
                                                                    disabled={!!this.props.lessonData.result}
                                                                    onChange={(e) => this.handleChange(e, 'text')}
                                                                    placeholder="Введите ответ"
                                                                    name={`${answer.id}`}
                                                                    value={this.state[`${answer.id}`]}
                                                                    required="required"/>
                                                                : null
                                                    }
                                                </div>
                                            </Form.Group>
                                        }
                                    })
                                }
                            </Form>
                        </Jumbotron>
                    })*/
                }
                {/*<div style={{display: 'flex', flexDirection: 'row-reverse', padding: '5px 0'}}>
                                {this.props.questionData && this.props.questionData.length !== 0 &&
                                <Button variant="primary"
                                        type={'button'}
                                        disabled={!!this.props.lessonData.result
                                        || this.state.queryCount !== 0}
                                        onClick={this.saveResults}>
                                    Завершить тест
                                </Button>}
                            </div>*/}
            </div> : <></>

    }
}

export default withRouter(ModuleContent)
