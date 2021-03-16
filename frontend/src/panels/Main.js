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
            modules: []
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
                               questionData={this.state.questionsData}
                               currentModule={this.state.currentModule}
                               saveAnswer={this.props.saveAnswer}
                                removeAnswer={this.props.removeAnswer}
                               currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '25%'}}>
                <UserProfile logOut={this.props.logOut}/>
            </div>
        </div>
    }
}

export default withRouter(Main)