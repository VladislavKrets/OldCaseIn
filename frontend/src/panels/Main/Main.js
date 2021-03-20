import React from "react";
import {withRouter} from "react-router";
import {Button} from "react-bootstrap";
import ModuleContent from "../../components/ModuleContent/ModuleContent";
import ModulesList from "../../components/ModulesList/ModulesList";
import UserProfile from "../../components/UserProfile/UserProfile";
import {List, PersonLinesFill} from 'react-bootstrap-icons';
import './Main.css'
import NavigationDrawer from "../../elements/NavigationDrawer/NavigationDrawer";
import DocumentationContent from "../../components/DocumentationContent/DocumentationContent";
import BotContent from "../../components/BotContent/BotContent";
import CalendarContent from "../../components/CalendarContent/CalendarContent";

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
            contentPanel: 'lessons'
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
        this.getUserData()
    }

    setPlainLessonData = (lessonData) => {
        this.setState({
            lessonData: lessonData,
        })
        this.getUserData()
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

    componentDidMount() {
        document.title = "Уроки"
        this.getUserData()
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
                                 currentLessonId={this.state.currentLessonId}/>
                </NavigationDrawer>
            }
            {
                this.state.isUserDrawerShowed &&
                <NavigationDrawer right={true} onClose={() => this.setUserDrawerShow(false)}>
                    <UserProfile logOut={this.props.logOut} getUser={this.props.getUser}
                                 userData={this.state.userData}/>
                </NavigationDrawer>
            }
            <div style={{display: this.state.width > 770 ? 'flex' : null,}}>
                {
                    this.state.width <= 770 && <div
                        style={{
                            position: 'fixed',
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
                        <div onClick={() => this.setUserDrawerShow(true)}>
                            <PersonLinesFill size={32}/>
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
                                     currentLessonId={this.state.currentLessonId}/>
                    </div>
                }
                <div style={{width: this.state.width > 770 ? '65%' : '100%'}}>
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
                                <BotContent getBotThemes={this.props.getBotThemes}/>
                                : <CalendarContent
                                    getEvents={this.props.getEvents}
                                />
                    }

                </div>
                {
                    this.state.width > 770 && <div style={{width: '25%'}}>
                        <UserProfile logOut={this.props.logOut} getUser={this.props.getUser}
                                     userData={this.state.userData}/>
                    </div>
                }
            </div>
        </>
    }
}

export default withRouter(Main)