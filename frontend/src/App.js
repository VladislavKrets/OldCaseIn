import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Redirect, Route, Switch} from "react-router";
import Auth from "./panels/Auth";
import axios from './api'
import cookie from "react-cookies";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./panels/Main";

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = cookie.load('token')
        if (token) {
            cookie.save('token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
        }
        this.state = {
            token: token,
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

    getLesson = (lessonId) => {
        return axios.get(`/lessons/${lessonId}/`, {
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

    removeAnswer = (answerId) => {
        return axios.delete(`/answer/${answerId}/save/`, {
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

    saveTestResults = (lessonId) => {
        return axios.post(`test/${lessonId}/result/`, {}, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    loadTestResults = () => {
        return axios.put(`test/results/`, {}, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    loadCurrentResult = () => {
        return axios.get(`test/${lessonId}/result/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
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
        })
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path='/auth/'>
                    {this.state.token ? <Redirect to="/main/"/> : !this.state.loading ?
                        <Auth login={this.login}
                              token={this.state.token}
                              setToken={this.setToken}
                              checkRegistrationCode={this.checkRegistrationCode}
                              register={this.register}
                        /> : null
                    }
                </Route>
                <PrivateRoute loading={this.state.loading} token={this.state.token} exact path={'/main/'}>
                    <Main logOut={this.logOut}
                          getModules={this.getModules}
                          getLesson={this.getLesson}
                          getQuestions={this.getQuestions}
                          saveAnswer={this.saveAnswer}
                          saveTestResults={this.saveTestResults}
                          loadTestResults={this.loadTestResults}
                          removeAnswer={this.removeAnswer}
                          loadCurrentResult={this.loadCurrentResult}
                    />
                </PrivateRoute>
            </Switch>
        );
    }
}

export default App;
