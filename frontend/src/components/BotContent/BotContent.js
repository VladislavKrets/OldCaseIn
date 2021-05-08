import React from "react";
import {Button, Form, Col} from "react-bootstrap";
import './BotContent.css'

export default class BotContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [undefined],
            currentThemes: [],
            content: [],
            currentText: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            currentText: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.currentText !== '') {
            const text = this.state.currentText.trim()
            const content = this.state.content;
            content.push({
                from: 'user',
                text: text
            })
            this.setState({
                content: content,
                currentText: ""
            })
            const objDiv = document.getElementById("bot");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.props.askBotQuestion(text).then(data => {
                content.push({
                    from: 'bot',
                    text: data.data.text
                })
                this.setState({
                    content: content,
                })
                objDiv.scrollTop = objDiv.scrollHeight;
            })
        }
    }

    componentDidMount() {
        document.title = 'Помощник'
        this.props.setHeaderName('Помощник')
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                    <div className={'moduleContent'} id={'bot'} style={{flexGrow: 1}}>
                        {
                            this.state.content.length === 0 && <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                Здесь вы можете получить ответы на распространенные вопросы.
                            </div>
                        }
                        {
                            this.state.content.map(item => {
                                return <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    margin: '10px 0',
                                    flexDirection: item.from === 'user' ? 'row-reverse' : null
                                }}>
                                    <div className={'bot-message'}>
                                        {item.text}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <hr style={{margin: '10px 0', position: 'relative', zIndex: 2}}/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '12px 5px',
                        paddingBottom: '40px',
                        boxSizing: 'border-box'
                    }}
                         className={'themes-container'}>
                        <Form onSubmit={this.onSubmit}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Form.Control type="text" value={this.state.currentText} onChange={this.handleChange}
                                              placeholder="Введите вопрос"/>
                                <div style={{paddingLeft: '5px'}}/>
                                <Button type="submit">
                                    Отправить
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    }

}