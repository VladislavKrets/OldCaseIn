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
            currentLessonId: null
        }
    }

    setCurrentLesson = (currentLessonId) => {
        this.setState({
            currentLessonId: currentLessonId
        })
    }

    setCurrentModule = (currentModuleId) => {
        this.setState({
            currentModuleId: currentModuleId
        })
    }

    render() {
        return <div style={{display: 'flex',}}>
            <div style={{width: '20%'}}>
                <ModulesList getModules={this.props.getModules}
                             setCurrentModule={this.setCurrentModule}
                             currentModuleId={this.state.currentModuleId}
                             setCurrentLesson={this.setCurrentLesson}
                             currentLessonId={this.state.currentLessonId}/>
            </div>
            <div style={{width: '65%'}}>
                <ModuleContent setCurrentLesson={this.setCurrentLesson}
                               setCurrentModule={this.setCurrentModule}
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