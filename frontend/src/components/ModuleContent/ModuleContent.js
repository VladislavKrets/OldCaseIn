import React from 'react'
import './ModuleContent.css'
import {Button, Form, Jumbotron} from 'react-bootstrap'
import ModalTestCompleted from "../ModalTestCompleted/ModalTestCompleted";

class ModuleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataLoaded: false,
            modalShow: false,
            resultData: null,
            submitEnabled: true,
            queryCount: 0
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
                this.setState({[event.target.form[i].value]: false})
            }
            this.setState({
                [event.target.value]: event.target.checked
            })
            this.saveAnswer(event.target.value, {})
        } else if (type === 'checkbox') {
            this.setState({
                [event.target.value]: event.target.checked
            })
            if (event.target.checked) {
                this.saveAnswer(event.target.value, {})
            } else {
                this.removeAnswer(event.target.value)
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
                this.setModalShow(true)
                const lessonData = this.props.lessonData;
                lessonData.result = data.data
                this.props.setLessonData(lessonData)
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
                        !this.props.lessonData && <div className={'no-lessons'}>
                            Ни одного урока не выбрано. Выберите урок из панели слева.
                        </div>
                    }
                    {
                        this.props.lessonData && <div style={{padding: '12px'}}>
                            <Jumbotron>
                                <h2 className={'moduleContent-title'}>
                                    Модуль {this.props.currentModule.name}
                                </h2>
                                <h2 className={'moduleContent-title'}>
                                    Урок {this.props.lessonData.number}
                                </h2>
                                <p>
                       <pre>
                         {this.props.lessonData.themes}
                       </pre>
                                </p>
                            </Jumbotron>
                            <Jumbotron>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <video width={'400px'} controls="controls" src={this.props.lessonData.video}>
                                    </video>
                                </div>
                            </Jumbotron>
                            {
                                this.props.lessonData.result && <Jumbotron>
                                    <div className={'moduleContent-test-completed'}>
                                        Тест сдан
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        Ваш результат: {Math.round(this.props.lessonData.result.result_score
                                        / this.props.lessonData.result.max_score * 100 * 100) / 100}%
                                    </div>
                                </Jumbotron>
                            }
                            {
                                this.props.questionData && this.props.questionData.map(item => {

                                    return <Jumbotron>
                                        <Form>
                                            <div style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '15px'
                                            }}>{item.question}</div>
                                            {
                                                item.answers.map(answer => {
                                                    {
                                                        return <Form.Group controlId={`${item.id}`}>
                                                            <div>
                                                                {
                                                                    item.question_type === 'radio'
                                                                        ? <Form.Check
                                                                            type={'radio'}
                                                                            disabled={!!this.props.lessonData.result}
                                                                            checked={this.state[`${answer.id}`]}
                                                                            label={answer.answer}
                                                                            value={`${answer.id}`}
                                                                            name={`${item.id}`}
                                                                            onChange={(e) => this.handleChange(e, 'radio')}
                                                                        />
                                                                        : item.question_type === 'checkbox'
                                                                        ? <Form.Check
                                                                            disabled={!!this.props.lessonData.result}
                                                                            checked={this.state[`${answer.id}`]}
                                                                            label={answer.answer}
                                                                            type={'checkbox'}
                                                                            value={`${answer.id}`}
                                                                            name={`${item.id}`}
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
                                })
                            }
                            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                                <Button variant="primary"
                                        type={'button'}
                                        disabled={!!this.props.lessonData.result
                                || this.state.queryCount !== 0}
                                        onClick={this.saveResults}>
                                    Завершить тест
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {this.props.lessonData && this.state.resultData &&
            <ModalTestCompleted
                lessonData={this.props.lessonData}
                resultData={this.state.resultData}
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
            />}
        </div>
    }
}

export default ModuleContent
