import React from 'react'
import './ModuleContent.css'
import {Button, Form, Jumbotron, Spinner} from 'react-bootstrap'
import ModalTestCompleted from "../ModalTestCompleted/ModalTestCompleted";
import {withRouter} from "react-router";

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


    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }


    handleChange = (event, type) => {
        if (type === 'radio') {
            for (let i = 0; i < event.target.form.length; i++) {
                this.setState({[event.target.form[i].name]: false})
            }
            this.setState({
                [event.target.name]: event.target.checked
            })
            this.saveAnswer(event.target.name, {})
        } else if (type === 'checkbox') {
            this.setState({
                [event.target.name]: event.target.checked
            })
            if (event.target.checked) {
                this.saveAnswer(event.target.name, {})
            } else {
                this.removeAnswer(event.target.name)
            }
        } else if (type === 'text') {
            this.setState({
                [event.target.name]: event.target.value
            })
            this.saveAnswer(event.target.name, {user_text: event.target.value})
        }
    }

    saveAnswer(value, data) {
        this.setState({
            queryCount: this.state.queryCount + 1
        })
        this.props.saveAnswer(value, data).then(data => {
            this.setState({
                queryCount: this.state.queryCount - 1
            })
        })
    }

    removeAnswer(value) {
        this.setState({
            queryCount: this.state.queryCount + 1
        })
        this.props.removeAnswer(value).then(data => {
            this.setState({
                queryCount: this.state.queryCount - 1
            })
        })
    }

    saveResults = () => {
        this.setState({
            queryCount: this.state.queryCount + 1
        })
        this.props.saveTestResults(this.props.lessonData.id)
            .then(data => {
                this.setState({
                    resultData: data.data,
                    queryCount: this.state.queryCount - 1
                })
                this.props.modalShow(true, data.data)
                const lessonData = this.props.lessonData;
                lessonData.result = data.data
                this.props.setLessonData(lessonData)
            })
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
        const data = {}
        if (this.props.questionData && !this.state.isDataLoaded) {
            for (let question of this.props.questionData) {
                question.answers.forEach(answer => {
                    if (answer.saved_answer && question.question_type === "text") {
                        data[`${answer.id}`] = answer.saved_answer.user_text
                    } else if (question.question_type !== "text") data[`${answer.id}`] = !!answer.saved_answer
                })
            }
            this.setState({
                ...data,
                isDataLoaded: true
            })
        }
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    {
                        this.state.course && this.state.module && this.state.lesson &&
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
                                this.state.lesson.result && <Jumbotron>
                                    <div className={'moduleContent-test-completed'}>
                                        Тест сдан
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        Ваш результат: {Math.round(this.state.lesson.result.result_score
                                        / this.state.lesson.result.max_score * 100 * 100) / 100}%
                                    </div>
                                </Jumbotron>
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
                        </div>
                    }
                </div>
            </div>
        </div>
    }
}

export default withRouter(ModuleContent)
