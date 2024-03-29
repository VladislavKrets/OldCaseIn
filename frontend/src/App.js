import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Redirect, Route, Switch} from "react-router";
import Auth from "./panels/Auth/Auth";
import axios from './api'
import cookie from "react-cookies";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Main from "./panels/Main/Main";
import User from "./components/User/User";
import General from "./panels/General/General";

class App extends React.Component {

    constructor(props) {
        super(props);
        const token = cookie.load('token')
        if (token) {
            cookie.save('token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
        }
        this.state = {
            token: token,
            loading: true,
            userData: null
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

    getCourses = () => {
        return axios.get('/courses/', {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getModules = (id) => {
        return axios.get(`/courses/${id}/modules/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getModule = (courseId, moduleId) => {
        return axios.get(`/courses/${courseId}/modules/${moduleId}/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getCourse = (id) => {
        return axios.get(`/courses/${id}/`, {
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

    getAllUser = (id) => {
        return axios.get(`/all_users/${id}/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
            }
        })
    }

    getAllUsers = () => {
        return axios.get(`/all_users/`, {
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

    askBotQuestion = (text) => {
        return axios.post(`/bot/`, {
            text: text
        }, {
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

    getUser = () => {
        return axios.get(`user/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    searchUser = (search) => {
        return axios.post(`user/`, {search: search}, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getEvents = () => {
        return axios.get(`events/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    updateEvent = (id, data) => {
        return axios.patch(`events/${id}/`, data, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    deleteEvent = (id) => {
        return axios.delete(`events/${id}/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getDocuments = () => {
        return axios.get(`documents/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getBuildings = () => {
        return axios.get(`buildings/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    imageUpload = (image, isPhoto) => {
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('photo', (!!isPhoto).toString())
        return axios.post('/upload_image/', form_data, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                'content-type': 'multipart/form-data'
            }
        })
    }

    avatarUpload = (image, isPhoto) => {
        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('photo', (!!isPhoto).toString())
        return axios.put('/upload_image/', form_data, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                'content-type': 'multipart/form-data'
            }
        })
    }

    getFloors = (building) => {
        return axios.get(`buildings/${building}/floors/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    addEvent = (event) => {
        return axios.post(`events/`, event, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getUserGroupData = () => {
        return axios.get(`group_user_data/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getDialogs = () => {
        return axios.get(`dialogs/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getGroups = () => {
        return axios.get(`groups/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getMasterUser = (id) => {
        return axios.get(`master_users/${id}/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    learnUser = () => {
        return axios.patch(`user/`, {}, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    getCurrentBuilding = (id) => {
        return axios.get(`buildings/${id}/`, {
            headers: {
                Authorization: 'Token ' + this.state.token,
                "X-CSRFTOKEN": cookie.load("csrftoken")
            }
        })
    }

    eventsSearch = (data) => {
        return axios.post(`events_search/`, data, {
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

    setUserData = () => {
        this.getUser().then(data => {
            this.setState({
                userData: data.data,
                loading: false
            })
        }).catch(e => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount() {
        document.title = 'Case in'
        this.setUserData()
    }


    render() {
        return (
            <Switch>
                <Route path='/auth'>
                    {this.state.token ? <Redirect to="/main/me"/> : !this.state.loading ?
                        <Auth login={this.login}
                              token={this.state.token}
                              setToken={this.setToken}
                              checkRegistrationCode={this.checkRegistrationCode}
                              register={this.register}
                        /> : null
                    }
                </Route>
                <PrivateRoute loading={this.state.loading} token={this.state.token} path={'/main'}>
                    <Main logOut={this.logOut}
                          getModules={this.getModules}
                          getCourses={this.getCourses}
                          getLesson={this.getLesson}
                          getQuestions={this.getQuestions}
                          saveAnswer={this.saveAnswer}
                          saveTestResults={this.saveTestResults}
                          loadTestResults={this.loadTestResults}
                          removeAnswer={this.removeAnswer}
                          getUser={this.getUser}
                          getEvents={this.getEvents}
                          getDocuments={this.getDocuments}
                          getBotThemes={this.getBotThemes}
                          loadCurrentResult={this.loadCurrentResult}
                          userData={this.state.userData}
                          setUserData={this.setUserData}
                          addEvent={this.addEvent}
                          askBotQuestion={this.askBotQuestion}
                          token={this.state.token}
                          getCurrentBuilding={this.getCurrentBuilding}
                          getBuildings={this.getBuildings}
                          getFloors={this.getFloors}
                          getUserGroupData={this.getUserGroupData}
                          getCourse={this.getCourse}
                          getModule={this.getModule}
                          getAllUser={this.getAllUser}
                          getAllUsers={this.getAllUsers}
                          getDialogs={this.getDialogs}
                          searchUser={this.searchUser}
                          getGroups={this.getGroups}
                          getMasterUser={this.getMasterUser}
                          updateEvent={this.updateEvent}
                          deleteEvent={this.deleteEvent}
                          eventsSearch={this.eventsSearch}
                          imageUpload={this.imageUpload}
                          avatarUpload={this.avatarUpload}
                          learnUser={this.learnUser}
                    />
                </PrivateRoute>
                <Route exact path=''>
                    <General/>
                </Route>
            </Switch>
        );
    }
}

export default App;
