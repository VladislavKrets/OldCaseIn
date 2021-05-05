import React from "react";
import {Redirect, Switch, withRouter} from "react-router";
import {Button} from "react-bootstrap";
import ModuleContent from "../../components/ModuleContent/ModuleContent";
import ModulesList from "../../components/ModulesList/ModulesList";
import UserProfile from "../../components/UserProfile/UserProfile";
import {List, BoxArrowRight} from 'react-bootstrap-icons';
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
        }
        this.prevKey = null
        this.prevWidth = window.innerWidth
        this.prevHeight = window.innerHeight
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
        document.title = "Уроки"
        this.props.setUserData()
        window.addEventListener('resize', this.updateSize);
    }

    getUserData = () => {
        this.props.getUser().then(data => {
            this.setState({
                userData: data.data
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

    render() {
        return <>
            {
                this.state.isModulesDrawerShowed &&
                <NavigationDrawer onClose={() => this.setModulesDrawerShow(false)}>
                    <ModulesList getModules={this.props.getModules}
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
                                 closeDrawer={this.setModulesDrawerShow}
                                 setQuestionsData={this.setQuestionsData}
                                 getQuestions={this.props.getQuestions}
                                 currentLessonId={this.state.currentLessonId}
                                 setLessonKey={this.setLessonKey}
                                 setModalShow={this.setModalShow}
                                 setModuleLoading={this.setModuleLoading}

                    />
                </NavigationDrawer>
            }
            <div style={{display: this.state.width > 770 ? 'flex' : null,}}>
                {
                    this.state.width <= 770 && <div
                        style={{
                            position: 'fixed',
                            zIndex: '1',
                            top: '0',
                            left: '0',
                            backgroundColor: 'white',
                            width: '100%',
                            fontWeight: 'bold',
                            display: 'flex',
                            boxSizing: 'border-box',
                            justifyContent: 'space-between',
                            padding: '5px 10px'
                        }}>
                        <div onClick={() => this.setModulesDrawerShow(true)}>
                            <List size={32}/>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>Главная</div>
                        <div onClick={() => this.setModalShow(true)}>
                            <BoxArrowRight size={32}/>
                        </div>
                    </div>
                }
                {
                    this.state.width > 770 && <div style={{width: '20%'}}>
                        <ModulesList getModules={this.props.getModules}
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
                        />
                    </div>
                }
                <div style={{width: this.state.width > 770 ? '80%' : '100%'}}>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/students`}>
                        {this.state.userData && this.state.userData.type !== 'master' ?
                            <Redirect to={'/main/me'}/> :
                            <Students/>
                        }
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/building`}>
                        <BuildingData
                            getCurrentBuilding={this.props.getCurrentBuilding}
                            getBuildings={this.props.getBuildings}
                            token={this.props.token}
                            getFloors={this.props.getFloors}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/calendar`}>
                        <CalendarContent
                            addEvent={this.props.addEvent}
                            getEvents={this.props.getEvents}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/modules`}>
                        <ModuleContent key={this.setPrevKey()}
                                       setCurrentLesson={this.setCurrentLesson}
                                       lessonData={this.state.lessonData}
                                       modules={this.state.modules}
                                       setLessonData={this.setPlainLessonData}
                                       saveTestResults={this.props.saveTestResults}
                                       loadTestResults={this.props.loadTestResults}
                                       loadCurrentResult={this.props.loadCurrentResult}
                                       questionData={this.state.questionsData}
                                       currentModule={this.state.currentModule}
                                       contentPanel={this.state.contentPanel}
                                       setContentPanel={this.setContentPanel}
                                       saveAnswer={this.props.saveAnswer}
                                       modalShow={this.setCompletedWithDataModalShow}
                                       removeAnswer={this.props.removeAnswer}
                                       loading={this.state.moduleLoading}
                                       currentLessonId={this.state.currentLessonId}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/bot`}>
                        <BotContent getBotThemes={this.props.getBotThemes}
                                        askBotQuestion={this.props.askBotQuestion}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/documents`}>
                        <DocumentationContent getDocuments={this.props.getDocuments}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`${this.props.match.url}/me`}>
                        <User logOut={this.props.logOut}
                              getUser={this.props.getUser}
                              userData={this.props.userData}
                              setUserData={this.props.setUserData}
                              getUserGroupData={this.props.getUserGroupData}
                              token={this.props.token}
                        />
                    </PrivateRoute>
                </div>
            </div>
            {
                this.state.modalShow && <ModalExit
                    show={this.state.modalShow}
                    logOut={this.props.logOut}
                    onHide={() => this.setModalShow(false)}/>
            }
            {this.state.lessonData && this.state.completedModalShow &&
            <ModalTestCompleted
                lessonData={this.state.lessonData}
                resultData={this.state.resultData}
                show={this.state.completedModalShow}
                onHide={() => this.setCompletedModalShow(false)}
            />}
        </>
    }
}

export default withRouter(Main)