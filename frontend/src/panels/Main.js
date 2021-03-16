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
            currentModuleId: null,
            currentLessonId: null,
            lessonData: null,
            modules: []
        }

    }

    setCurrentLesson = (currentModuleId, currentLessonId) => {
        this.setState({
            currentLessonId: currentLessonId,
            currentModuleId: currentModuleId
        })
    }

    setLessonData = (lessonData) => {
        this.setState({
            lessonData: lessonData
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
                             currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '65%'}}>
                <ModuleContent setCurrentLesson={this.setCurrentLesson}
                               lessonData={this.state.lessonData}
                               currentModuleId={this.state.currentModuleId}
                               currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '25%'}}>
                <UserProfile/>
            </div>
        </div>
    }
}

export default withRouter(Main)