import './LessonTest.css'
import React from "react";
import {withRouter} from "react-router";
import {Form} from "react-bootstrap";
import ModalTestCompleted from "../ModalTestCompleted/ModalTestCompleted";

class LessonTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: null,
            test: null,
            questionsData: {},
            queryCount: 0,
            modalShow: false,
            resultData: null
        }
    }

    handleChange = (event, type) => {
        const questionsData = this.state.questionsData;
        if (type === 'radio') {
            for (let i = 0; i < event.target.form.length; i++) {
                questionsData[event.target.form[i].name] = false
            }
            questionsData[event.target.name] = event.target.checked
            this.saveAnswer(event.target.name, {})
        } else if (type === 'checkbox') {
            questionsData[event.target.name] = event.target.checked
            if (event.target.checked) {
                this.saveAnswer(event.target.name, {})
            } else {
                this.removeAnswer(event.target.name)
            }
        } else if (type === 'text') {
            questionsData[event.target.name] = event.target.value
            this.saveAnswer(event.target.name, {user_text: event.target.value})
        }
        this.setState({
            questionsData: questionsData
        })
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
        this.props.saveTestResults(this.state.lesson.id)
            .then(data => {
                const lesson = this.state.lesson;
                lesson.result = data.data
                this.setState({
                    lesson: lesson,
                    resultData: data.data,
                    queryCount: this.state.queryCount - 1,
                    modalShow: true
                })
            })
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    componentDidMount() {
        this.props.getLesson(this.props.match.params.lesson).then(data => {
            this.setState({
                lesson: data.data
            })
        })
        this.props.getQuestions(this.props.match.params.lesson).then(data => {
            const questions = data.data
            const questionsData = {}
            for (let question of questions) {
                question.answers.forEach(answer => {
                    if (answer.saved_answer && question.question_type === "text") {
                        questionsData[`${answer.id}`] = answer.saved_answer.user_text
                    } else if (question.question_type !== "text") questionsData[`${answer.id}`] = !!answer.saved_answer
                })
            }
            this.setState({
                questionsData: questionsData,
                test: questions
            })

        })
    }

    render() {
        return <>
            {this.state.lesson && this.state.test && this.state.test.map(item => {
                return <div className={'full-module-content-block'}>
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
                                                        disabled={!!this.state.lesson.result}
                                                        checked={!!this.state.questionsData[`${answer.id}`]}
                                                        label={answer.answer}
                                                        value={`${item.id}`}
                                                        name={`${answer.id}`}
                                                        onChange={(e) => this.handleChange(e, 'radio')}
                                                    />
                                                    : item.question_type === 'checkbox'
                                                    ? <Form.Check
                                                        id={`${answer.id}`}
                                                        disabled={!!this.state.lesson.result}
                                                        checked={!!this.state.questionsData[`${answer.id}`]}
                                                        label={answer.answer}
                                                        type={'checkbox'}
                                                        value={`${item.id}`}
                                                        name={`${answer.id}`}
                                                        onChange={(e) => this.handleChange(e, 'checkbox')}
                                                    />
                                                    : item.question_type === 'text'
                                                        ? <Form.Control
                                                            disabled={!!this.state.lesson.result}
                                                            onChange={(e) => this.handleChange(e, 'text')}
                                                            placeholder="Введите ответ"
                                                            name={`${answer.id}`}
                                                            value={this.state.questionsData[`${answer.id}`]}
                                                            required="required"/>
                                                        : null
                                            }
                                        </div>
                                    </Form.Group>
                                }
                            })
                        }
                    </Form>
                </div>
            })
            }
            {this.state.lesson && this.state.test && this.state.test.length !== 0 &&
            <div className={'full-module-content-block'} style={{display: 'flex', justifyContent: 'center'}}>
                <button
                    className={'module-content-button'}
                    disabled={!!this.state.lesson.result
                    || this.state.queryCount !== 0}
                    onClick={this.saveResults}>
                    Завершить тест
                </button>
            </div>
            }
            {
                this.state.lesson && !this.state.lesson.has_test &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    Данный урок не содержит тестов
                </div>
            }
            {this.state.modalShow && <ModalTestCompleted
                lessonData={this.state.lesson}
                resultData={this.state.resultData}
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
            />}
        </>
    }
}

export default withRouter(LessonTest)