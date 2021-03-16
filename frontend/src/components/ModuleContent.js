import React from 'react'
import './ModuleContent.css'
import { Form, Jumbotron } from 'react-bootstrap'

class ModuleContent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }
  handleChange = (event, type) => {
    if (type === 'radio'){
        this.props.saveAnswer(event.target.value, {})
    }
    else if (type === 'checkbox'){
        if (event.target.checked) {
            this.props.saveAnswer(event.target.value, {})
        }
        else {
            this.props.removeAnswer(event.target.value)
        }
    }
    else if (type === 'text') {
        this.props.saveAnswer(event.target.name, {user_text: event.target.value})
    }
  }

  render () {
    return <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      background: 'linear-gradient(to bottom, rgb(54, 69, 136) 0%, rgb(111, 118, 181) 40%, ' +
                'rgb(160, 171, 210) 60%, rgb(218, 216, 234) 80%, rgb(254, 254, 255) 100%)'
    }}>
            <div style={{
              width: '100%',
              margin: '15px',
              boxSizing: 'border-box',
              height: '75%',
              borderRadius: '12px',
              backgroundColor: 'white'
            }}>
                <div style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  height: '100%',
                  overflowY: 'scroll',
                  borderRadius: '12px',
                  backgroundColor: 'white'
                }} className={'moduleContent'}>
                    {
                        this.props.lessonData && <div style={{ padding: '12px' }}>
                            <Jumbotron>
                                <h2 style={{ textAlign: 'center',
                                    paddingBottom: '10px' }}>Модуль {this.props.currentModule.name}
                                </h2>
                                <h2 style={{
                                  textAlign: 'center',
                                  paddingBottom: '10px'
                                }}>Урок {this.props.lessonData.number}
                                </h2>
                                <p>
                       <pre>
                         {this.props.lessonData.themes}
                       </pre>
                                </p>
                            </Jumbotron>
                            <Jumbotron>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <video width={'400px'} controls="controls" src={this.props.lessonData.video}>
                                    </video>
                                </div>
                            </Jumbotron>
                            {
                                this.props.questionData && this.props.questionData.map(item => {
                                  return <Jumbotron>
                                        <Form>
                                            <div style={{ fontWeight: 'bold', paddingBottom: '15px'}}>{item.question}</div>
                                            {
                                                item.answers.map(answer => {
                                                  {
                                                    return <Form.Group controlId={`${item.id}`}>
                                                            <div>
                                                                {
                                                                    item.question_type === 'radio'
                                                                      ? <Form.Check
                                                                            type={'radio'}
                                                                            label={answer.answer}
                                                                            value={`${answer.id}`}
                                                                            name={`${item.id}`}
                                                                            onChange={(e) => this.handleChange(e, 'radio')}
                                                                        />
                                                                      : item.question_type === 'checkbox'
                                                                        ? <Form.Check
                                                                            label={answer.answer}
                                                                            type={'checkbox'}
                                                                            value={`${answer.id}`}
                                                                            name={`${item.id}`}
                                                                            onChange={(e) => this.handleChange(e, 'checkbox')}
                                                                        />
                                                                        : item.question_type === 'text'
                                                                          ? <Form.Control
                                                                                onChange={(e) => this.handleChange(e, 'text')}
                                                                                placeholder="Введите ответ"
                                                                                name={`${item.id}`}
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
                        </div>
                    }
                </div>
            </div>
        </div>
  }
}

export default ModuleContent
