import React from "react";
import {Button} from "react-bootstrap";
import './BotContent.css'

export default class BotContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [undefined],
            currentThemes: [],
            content: []
        }
    }

    getChildThemes = (id) => {
        const history = this.state.history
        history.push(id)
        const content = this.state.content
        const theme = this.state.currentThemes.filter(x => x.id === id)[0]
        content.push({
            from: 'user',
            text: theme.question
        })
        theme.answers.forEach(item => {
            content.push({
                from: 'bot',
                text: item.answer
            })
        })
        if (theme.answers.length === 0) {
            content.push({
                from: 'bot',
                text: 'Выберите одну из следующих тем'
            })
        }
        this.setState({
            history: history,
            content: content
        })
        this.props.getBotThemes(id).then(data => {
            const themes = data.data
            this.setState({
                currentThemes: themes
            })
            const objDiv = document.getElementById("bot");
            objDiv.scrollTop = objDiv.scrollHeight;
        })

    }

    handleBack = () => {
        const history = this.state.history.slice(0, this.state.history.length - 1)
        const id = history[history.length - 1]
        const content = this.state.content
        content.push({
            from: 'user',
            text: 'Назад'
        })
        content.push({
            from: 'bot',
            text: 'Выберите одну из следующих тем'
        })
        this.setState({
            history: history,
            content: content
        })
        this.props.getBotThemes(id).then(data => {
            const themes = data.data
            this.setState({
                currentThemes: themes
            })
            const objDiv = document.getElementById("bot");
            objDiv.scrollTop = objDiv.scrollHeight;
        })
    }

    componentDidMount() {
        this.props.getBotThemes().then(data => {
            this.setState({
                currentThemes: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'} id={'bot'} style={{height: '75%'}}>
                    {
                        this.state.content.length === 0 && <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            Здесь вы можете получить ответы на распространенные вопросы. Пожалуйста, выберите тему
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
                                <div style={{
                                    border: '1px solid black',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    margin: '10px'
                                }}>
                                    {item.text}
                                </div>
                            </div>
                        })
                    }
                </div>
                <hr/>
                <div style={{display: 'flex', justifyContent: 'center', overflowY: 'scroll'}}
                     className={'themes-container'}>
                    <div style={{display: 'flex', flexWrap: 'wrap', paddingBottom: '10px', justifyContent: 'center'}}>
                        {
                            this.state.currentThemes.map(item => {
                                return <Button variant="secondary" style={{margin: '5px'}}
                                               onClick={() => this.getChildThemes(item.id)}>{item.question}</Button>
                            })
                        }
                        {this.state.history.length > 1 && <Button variant="secondary" style={{margin: '5px'}}
                                                                  onClick={this.handleBack}>Назад</Button>}
                    </div>
                </div>
            </div>
        </div>
    }

}