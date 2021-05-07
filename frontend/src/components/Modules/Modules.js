import {Redirect, withRouter} from "react-router";
import React from "react";
import Students from "../Students/Students";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ModuleContent from "../ModuleContent/ModuleContent";
import LessonTest from "../LessonTest/LessonTest";

class Modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            course: null
        }
    }

    componentDidMount() {
        this.props.setModules([])
        this.props.setHeaderName('Обучение')
        this.props.getModules(this.props.match.params.course).then(data => {
            this.props.setModules(data.data)
        })
        this.props.getCourse(this.props.match.params.course).then(data => {
            this.setState({
                course: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background modules-border-radius'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    {
                        window.location.pathname.match(/\/main\/courses\/\d+$/) &&
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <div style={{textAlign: 'center'}}>
                                {
                                    this.state.course && <h3>
                                        Курс "{this.state.course.name}"
                                    </h3>
                                }
                            </div>
                        </div>
                    }
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`/main/courses/:course/modules/:module/lessons/:lesson/test`}>
                        <LessonTest
                            key={window.location.pathname}
                            getLesson={this.props.getLesson}
                            saveTestResults={this.props.saveTestResults}
                            loadTestResults={this.props.loadTestResults}
                            loadCurrentResult={this.props.loadCurrentResult}
                            saveAnswer={this.props.saveAnswer}
                            getQuestions={this.props.getQuestions}
                            removeAnswer={this.props.removeAnswer}
                        />
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token} exact
                                  path={`/main/courses/:course/modules/:module/lessons/:lesson`}>
                        <ModuleContent key={window.location.pathname}
                                       getCourses={this.props.getCourses}
                                       getCourse={this.props.getCourse}
                                       setCurrentLesson={this.props.setCurrentLesson}
                                       lessonData={this.props.lessonData}
                                       modules={this.props.modules}
                                       setLessonData={this.props.setPlainLessonData}
                                       saveTestResults={this.props.saveTestResults}
                                       loadTestResults={this.props.loadTestResults}
                                       loadCurrentResult={this.props.loadCurrentResult}
                                       questionData={this.state.questionsData}
                                       currentModule={this.state.currentModule}
                                       contentPanel={this.props.contentPanel}
                                       setContentPanel={this.setContentPanel}
                                       saveAnswer={this.props.saveAnswer}
                                       modalShow={this.props.setCompletedWithDataModalShow}
                                       removeAnswer={this.props.removeAnswer}
                                       loading={this.state.moduleLoading}
                                       getLesson={this.props.getLesson}
                                       getModule={this.props.getModule}
                                       currentLessonId={this.state.currentLessonId}/>
                    </PrivateRoute>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Modules)