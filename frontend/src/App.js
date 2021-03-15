import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Route, Switch} from "react-router";
import Auth from "./panels/Auth";
import axios from './api'
import cookie from "react-cookies";

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = cookie.load('token')
        if (token) {
            this.setState({token: token})
            cookie.save('token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
        }
        this.state = {
            token: null,
            loading: true
        }
    }

    login = (loginData) => {
        return axios.post('/login/', loginData, {
            headers: {
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    checkRegistrationCode = (code) => {
        return axios.patch('/login/', {
            registration_code: code
        }, {
            headers: {
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    register = (registerData) => {
        return axios.put('/login/', registerData, {
            headers: {
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getModules = () => {
        return axios.get('/modules/', {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getLessons = (moduleId) => {
        return axios.get(`/module/${moduleId}/lessons/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getQuestions = (lessonId) => {
        return axios.get(`/lesson/${lessonId}/questions/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getDrugNDropAnswerVariants = (questionId) => {
        return axios.get(`/question/${questionId}/drugndrop/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    saveAnswer = (answerId, answerData) => {
        return axios.post(`/answer/${answerId}/save/`, answerData, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    updateAnswer = (answerId, patchId, answerData) => {
        return axios.patch(`/answer/${answerId}/save/${patchId}/`, answerData, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getBotThemes = (parentThemeId = '') => {
        if (parentThemeId) parentThemeId += '/'
        return axios.get(`/bot_themes/${parentThemeId}`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getBotThemeAnswers = (themeId) => {
        return axios.get(`/bot_theme/${themeId}/answers/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    setToken = (token) => {
        this.setState({
            token: token,
        })
        cookie.save('token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
    }

    logOut = () => {
        cookie.remove('token', {path: '/'})
        this.setState({
            token: null,
            loading: true,
        })
        window.history.pushState({}, 'back', '/auth')
        // window.open(`/auth`, "_self");
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path='/auth'>
                    <Auth login={this.login}
                          setToken={this.setToken}
                          checkRegistrationCode={this.checkRegistrationCode}
                          register={this.register}
                    />
                </Route>
            </Switch>
        );
    }
}

export default App;
