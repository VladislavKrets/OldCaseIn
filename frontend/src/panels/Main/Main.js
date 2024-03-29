import React from "react";
import {Redirect, Switch, withRouter} from "react-router";
import {Button} from "react-bootstrap";
import ModuleContent from "../../components/ModuleContent/ModuleContent";
import Menu from "../../components/Menu/Menu";
import UserProfile from "../../components/UserProfile/UserProfile";
import {List, BoxArrowRight, Collection} from 'react-bootstrap-icons';
import './Main.css'
import NavigationDrawer from "../../elements/NavigationDrawer/NavigationDrawer";
import DocumentationContent from "../../components/DocumentationContent/DocumentationContent";
import BotContent from "../../components/BotContent/BotContent";
import CalendarContent from "../../components/CalendarContent/CalendarContent";
import Students from "../../components/Students/Students";
import BuildingData from "../../components/BuildingData/BuildingData";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import User from "../../components/User/User";
import ModalGroupMembers from "../../components/ModalGroupMembers/ModalGroupMembers";
import ModalExit from "../../components/ModalExit/ModalExit";
import ModalTestCompleted from "../../components/ModalTestCompleted/ModalTestCompleted";
import Courses from "../../components/Courses/Courses";
import ModulesList from "../../components/ModulesList/ModulesList";
import Modules from "../../components/Modules/Modules";
import Messages from "../../components/Messages/Messages";
import MasterPreviewUser from "../../components/MasterPreviewUser/MasterPreviewUser";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentModule: null,
            currentLessonId: null,
            lessonData: null,
            questionsData: null,
            modules: [],
            userData: null,
            width: window.innerWidth,
            height: window.innerHeight,
            isModulesDrawerShowed: false,
            isUserDrawerShowed: false,
            contentPanel: 'user',
            modalShow: false,
            lessonKey: false,
            completedModalShow: false,
            moduleLoading: false,
            isModuleListDrawerShowed: false,
            headerName: 'Главная',
            learningPages: [
                'hello', 'profile', 'group', 'tasks', 'messages', 'learning', 'documents', 'buildings', 'helper', 'end'
            ],
            currentLearningPage: 9
        }
        this.prevKey = null
        this.prevWidth = window.innerWidth
        this.prevHeight = window.innerHeight
    }

    nextLearning = e => {
        e.preventDefault()
        e.stopPropagation()
        if (this.props.userData.type === 'master' && this.state.currentLearningPage === 1) {
            this.setState({
                currentLearningPage: this.state.currentLearningPage + 2
            })
        } else {
            this.setState({
                currentLearningPage: this.state.currentLearningPage + 1
            })
        }
        if (this.state.currentLearningPage === this.state.learningPages.length - 2) {
            this.props.learnUser().then(_ => {
                const userData = this.props.userData
                userData.is_learning_shown = true
                this.props.setUserData(userData)
            })
        }
    }

    setHeaderName = (headerName) => {
        this.setState({
            headerName: headerName
        })
    }

    setModules = (modules) => {
        this.setState({
            modules: modules
        })
    }

    setModuleLoading = (loading) => {
        this.setState({
            moduleLoading: loading
        })
    }

    setCurrentLesson = (currentModule, currentLessonId) => {
        this.setState({
            currentLessonId: currentLessonId,
            currentModule: currentModule
        })
    }

    setLessonData = (lessonData) => {
        this.setState({
            lessonData: lessonData,
        })
        this.props.setUserData()
    }

    setPlainLessonData = (lessonData) => {
        this.setState({
            lessonData: lessonData,
        })
        this.props.setUserData()
    }

    setQuestionsData = (questionsData) => {
        this.setState({
            questionsData: questionsData
        })
    }

    setModulesData = (modulesData) => {
        this.setState({
            modules: modulesData
        })
    }

    updateSize = () => {
        this.prevWidth = this.state.width
        this.prevHeight = this.state.height
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    setModulesDrawerShow = (show) => {
        this.setState({
            isModulesDrawerShowed: show
        })
    }
    setUserDrawerShow = (show) => {
        this.setState({
            isUserDrawerShowed: show
        })
    }

    setCompletedWithDataModalShow = (modalShow, resultData) => {
        this.setState({
            completedModalShow: modalShow,
            resultData: resultData
        })
    }

    setCompletedModalShow = (modalShow) => {
        this.setState({
            completedModalShow: modalShow,
        })
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    setPrevKey = () => {
        if (this.state.lessonKey && this.prevWidth === this.state.width
            && this.prevHeight === this.state.height) {
            const prevKey = Date.now()
            this.prevKey = prevKey
            return prevKey
        }
        this.prevWidth = this.state.width
        this.prevHeight = this.state.height
        return this.prevKey
    }

    componentDidMount() {
        //document.title = "Главная"
        this.props.setUserData()
        this.getUserData()
        window.addEventListener('resize', this.updateSize);
    }

    getUserData = () => {
        this.props.getUser().then(data => {
            this.setState({
                userData: data.data,
                currentLearningPage: data.data.is_learning_shown ? 9 : 0
            })
        })
    }

    setContentPanel = (panel) => {
        this.setState({
            contentPanel: panel
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }

    setLessonKey = (key) => {
        this.setState({
            lessonKey: key
        })
    }

    setModulesListDrawerShow = (isShow) => {
        this.setState({
            isModuleListDrawerShowed: isShow
        })
    }

    render() {
        return this.props.userData ? <>
            {
                this.state.width < 770 && this.state.isModulesDrawerShowed &&
                <NavigationDrawer onClose={() => this.setModulesDrawerShow(false)}>
                    <Menu getModules={this.props.getModules}
                          history={this.props.history}
                          match={this.props.match}
                          learningPages={this.state.learningPages}
                          currentLearningPage={this.state.currentLearningPage}
                          currentModuleId={this.state.currentModuleId}
                          setLessonData={this.setLessonData}
                          setCurrentLesson={this.setCurrentLesson}
                          modules={this.state.modules}
                          getLesson={this.props.getLesson}
                          contentPanel={this.state.contentPanel}
                          setContentPanel={this.setContentPanel}
                          setModulesData={this.setModulesData}
                          closeDrawer={this.setModulesDrawerShow}
                          setQuestionsData={this.setQuestionsData}
                          getQuestions={this.props.getQuestions}
                          currentLessonId={this.state.currentLessonId}
                          setLessonKey={this.setLessonKey}
                          setModalShow={this.setModalShow}
                          setModuleLoading={this.setModuleLoading}
                          width={this.state.width}
                          nextLearning={this.nextLearning}
                    />
                </NavigationDrawer>
            }
            {
                this.state.width < 770
                && window.location.pathname.match(/\/main\/courses\/\d+.*/)
                && this.state.isModuleListDrawerShowed &&
                <NavigationDrawer onClose={() => this.setModulesListDrawerShow(false)} right={true}>
                    <ModulesList
                        history={this.props.history}
                        modules={this.state.modules}
                        onClose={() => this.setModulesListDrawerShow(false)}
                    />
                </NavigationDrawer>
            }
            <div style={{display: this.state.width > 770 ? 'flex' : null,}}>
                {
                    this.state.width <= 770 && <div
                        style={{
                            position: 'fixed',
                            zIndex: '3',
                            top: '0',
                            left: '0',
                            backgroundColor: 'white',
                            width: '100%',
                            fontWeight: 'bold',
                            display: 'flex',
                            boxSizing: 'border-box',
                            justifyContent: 'space-between',
                            padding: '5px 10px'
                        }} className={'mobile-nav-bar'}>
                        <div onClick={() => this.setModulesDrawerShow(true)}>
                            <List size={32}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '900'
                        }}>{this.state.headerName}</div>
                        {window.location.pathname.match(/\/main\/courses\/\d+.*/) ?
                            <div onClick={() => this.setModulesListDrawerShow(true)}>
                                <Collection size={32}/>
                            </div> :
                            <div style={{width: '32px', height: '32px'}}>
                            </div>
                        }
                    </div>
                }
                {
                    this.state.width > 770 && <div style={{width: '20%'}}>
                        <Menu getModules={this.props.getModules}
                              history={this.props.history}
                              match={this.props.match}
                              currentModuleId={this.state.currentModuleId}
                              setLessonData={this.setLessonData}
                              setCurrentLesson={this.setCurrentLesson}
                              modules={this.state.modules}
                              getLesson={this.props.getLesson}
                              contentPanel={this.state.contentPanel}
                              setContentPanel={this.setContentPanel}
                              setModulesData={this.setModulesData}
                              setQuestionsData={this.setQuestionsData}
                              getQuestions={this.props.getQuestions}
                              closeDrawer={this.setModulesDrawerShow}
                              width={this.state.width}
                              userData={this.props.userData}
                              token={this.props.token}
                              currentLessonId={this.state.currentLessonId}
                              setLessonKey={this.setLessonKey}
                              setModalShow={this.setModalShow}
                              setModuleLoading={this.setModuleLoading}
                              learningPages={this.state.learningPages}
                              currentLearningPage={this.state.currentLearningPage}
                              nextLearning={this.nextLearning}
                        />
                    </div>
                }
                <div
                    style={{
                        width: this.state.width > 770
                        && window.location.pathname.match(/\/main\/courses\/\d+.*/)
                            ? '60%' : this.state.width > 770 ? '80%' : '100%'
                    }}>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/students`}>
                        {this.state.userData && this.state.userData.type !== 'master' ?
                            <Redirect to={'/main/me'}/> :
                            <Students
                                setHeaderName={this.setHeaderName}
                            />
                        }
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/building`}>
                        <BuildingData
                            getCurrentBuilding={this.props.getCurrentBuilding}
                            getBuildings={this.props.getBuildings}
                            token={this.props.token}
                            setHeaderName={this.setHeaderName}
                            getFloors={this.props.getFloors}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/calendar`}>
                        <CalendarContent
                            addEvent={this.props.addEvent}
                            setHeaderName={this.setHeaderName}
                            getEvents={this.props.getEvents}
                            updateEvent={this.props.updateEvent}
                            deleteEvent={this.props.deleteEvent}
                            width={this.state.width}
                            eventsSearch={this.props.eventsSearch}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/courses/:course`}>
                        <Modules
                            setModules={this.setModules}
                            token={this.props.token}
                            getLesson={this.props.getLesson}
                            modules={this.state.modules}
                            getCourse={this.props.getCourse}
                            getModules={this.props.getModules}
                            setHeaderName={this.setHeaderName}
                            saveTestResults={this.props.saveTestResults}
                            loadTestResults={this.props.loadTestResults}
                            loadCurrentResult={this.props.loadCurrentResult}
                            getModule={this.props.getModule}
                            getQuestions={this.props.getQuestions}
                            saveAnswer={this.props.saveAnswer}
                            removeAnswer={this.props.removeAnswer}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  exact path={`${this.props.match.url}/courses`}>
                        <Courses
                            getCourses={this.props.getCourses}
                            setCurrentLesson={this.setCurrentLesson}
                            lessonData={this.state.lessonData}
                            setModules={this.setModules}
                            modules={this.state.modules}
                            getModules={this.props.getModules}
                            setHeaderName={this.setHeaderName}
                            questionData={this.state.questionsData}
                            currentModule={this.state.currentModule}
                            contentPanel={this.state.contentPanel}
                            setContentPanel={this.setContentPanel}
                            saveAnswer={this.props.saveAnswer}
                            modalShow={this.setCompletedWithDataModalShow}
                            removeAnswer={this.props.removeAnswer}
                            loading={this.state.moduleLoading}
                            currentLessonId={this.state.currentLessonId}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/bot`}>
                        <BotContent getBotThemes={this.props.getBotThemes}
                                    setHeaderName={this.setHeaderName}
                                    askBotQuestion={this.props.askBotQuestion}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/documents`}>
                        <DocumentationContent getDocuments={this.props.getDocuments}
                                              setHeaderName={this.setHeaderName}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/messages`}>
                        <Messages setHeaderName={this.setHeaderName}
                                  userData={this.props.userData}
                                  getUser={this.props.getAllUser}
                                  getAllUsers={this.props.getAllUsers}
                                  width={this.state.width}
                                  getDialogs={this.props.getDialogs}
                                  searchUser={this.props.searchUser}
                                  token={this.props.token}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/me`}>
                        <User logOut={this.props.logOut}
                              key={window.location.pathname}
                              getGroups={this.props.getGroups}
                              masterPreview={false}
                              getMasterUser={this.props.getMasterUser}
                              getUser={this.props.getUser}
                              width={this.state.width}
                              userData={this.props.userData}
                              setHeaderName={this.setHeaderName}
                              setUserData={this.props.setUserData}
                              getUserGroupData={this.props.getUserGroupData}
                              token={this.props.token}
                              avatarUpload={this.props.avatarUpload}
                              learningPages={this.state.learningPages}
                              currentLearningPage={this.state.currentLearningPage}
                              nextLearning={this.nextLearning}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/users/:user`}>
                        <MasterPreviewUser logOut={this.props.logOut}
                                           getGroups={this.props.getGroups}
                                           getMasterUser={this.props.getMasterUser}
                                           getUser={this.props.getUser}
                                           userData={this.props.userData}
                                           setHeaderName={this.setHeaderName}
                                           width={this.state.width}
                                           setUserData={this.props.setUserData}
                                           getUserGroupData={this.props.getUserGroupData}
                                           token={this.props.token}
                                           learningPages={this.state.learningPages}
                                           currentLearningPage={this.state.currentLearningPage}
                                           nextLearning={this.nextLearning}
                        />
                    </PrivateRoute>
                </div>
                {
                    this.state.width > 770 && window.location.pathname.match(/\/main\/courses\/\d+.*/)
                    && <div style={{width: '20%'}}>
                        <ModulesList
                            history={this.props.history}
                            modules={this.state.modules}
                            onClose={() => this.setModulesListDrawerShow(false)}
                        />
                    </div>}
            </div>
            {
                this.state.modalShow && <ModalExit
                    show={this.state.modalShow}
                    logOut={this.props.logOut}
                    onHide={() => this.setModalShow(false)}/>
            }
        </> : <></>
    }
}

export default withRouter(Main)