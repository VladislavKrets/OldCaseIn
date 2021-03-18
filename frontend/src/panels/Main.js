import React from "react";
import {withRouter} from "react-router";
import {Button} from "react-bootstrap";
import ModuleContent from "../components/ModuleContent";
import ModulesList from "../components/ModulesList";
import UserProfile from "../components/UserProfile";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentModule: null,
            currentLessonId: null,
            lessonData: null,
            questionsData: null,
            modules: [],
            userData: null
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
            questionsData: null,
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

    componentDidMount() {
        this.getUserData()
    }

    getUserData = () => {
        this.props.getUser().then(data => {
            this.setState({
                userData: data.data
            })
        })
    }

    render() {
        return <div style={{display: 'flex',}}>
            <div style={{width: '20%'}}>
                <ModulesList getModules={this.props.getModules}
                             currentModuleId={this.state.currentModuleId}
                             setLessonData={this.setLessonData}
                             setCurrentLesson={this.setCurrentLesson}
                             modules={this.state.modules}
                             getLesson={this.props.getLesson}
                             setModulesData={this.setModulesData}
                             setQuestionsData={this.setQuestionsData}
                             getQuestions={this.props.getQuestions}
                             currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '65%'}}>
                <ModuleContent setCurrentLesson={this.setCurrentLesson}
                               lessonData={this.state.lessonData}
                               modules={this.state.modules}
                               setLessonData={this.setPlainLessonData}
                               saveTestResults={this.props.saveTestResults}
                               loadTestResults={this.props.loadTestResults}
                               loadCurrentResult={this.props.loadCurrentResult}
                               questionData={this.state.questionsData}
                               currentModule={this.state.currentModule}
                               saveAnswer={this.props.saveAnswer}
                               removeAnswer={this.props.removeAnswer}
                               currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '25%'}}>
                <UserProfile logOut={this.props.logOut} getUser={this.props.getUser} userData={this.state.userData}/>
            </div>
        </div>
    }
}

export default withRouter(Main)