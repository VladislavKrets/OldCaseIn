import React from "react";
import {Switch, withRouter} from "react-router";
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
            modalShow: false
        }

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

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
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

    render() {
        return <>
            {
                this.state.isModulesDrawerShowed &&
                <NavigationDrawer onClose={() => this.setModulesDrawerShow(false)}>
                    <ModulesList getModules={this.props.getModules}
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
                                     setModalShow={this.setModalShow}
                        />
                    </div>
                }
                <div style={{width: this.state.width > 770 ? '80%' : '100%'}}>
                    {this.state.contentPanel === 'lessons' ?
                        <ModuleContent setCurrentLesson={this.setCurrentLesson}
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
                                       removeAnswer={this.props.removeAnswer}
                                       currentLessonId={this.state.currentLessonId}/>
                        : this.state.contentPanel === 'documentation' ?
                            <DocumentationContent getDocuments={this.props.getDocuments}/>
                            : this.state.contentPanel === 'bot' ?
                                <BotContent getBotThemes={this.props.getBotThemes}
                                            askBotQuestion={this.props.askBotQuestion}/>
                                : this.state.contentPanel === 'calendar' ? <CalendarContent
                                    addEvent={this.props.addEvent}
                                    getEvents={this.props.getEvents}
                                /> : this.state.contentPanel === 'students' ? <Students/>
                                    : this.state.contentPanel === 'building' ? <BuildingData
                                        getBuildings={this.props.getBuildings}
                                        getFloors={this.props.getFloors}
                                    /> : <User logOut={this.props.logOut}
                                               getUser={this.props.getUser}
                                               userData={this.props.userData}
                                               setUserData={this.props.setUserData}
                                               getUserGroupData={this.props.getUserGroupData}
                                               token={this.props.token}
                                    />
                    }

                </div>
            </div>
            {
                this.state.modalShow && <ModalExit
                    show={this.state.modalShow}
                    logOut={this.props.logOut}
                    onHide={() => this.setModalShow(false)}/>
            }
        </>
    }
}

export default withRouter(Main)