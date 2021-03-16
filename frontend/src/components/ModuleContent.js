import React from "react";
import './ModuleContent.css'
import {Jumbotron} from "react-bootstrap";
import earthSphere from '../assets/globus.png'
import graph from '../assets/graph.png'

class ModuleContent extends React.Component {
    render() {
        return <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, rgb(54, 69, 136) 0%, rgb(111, 118, 181) 40%, ' +
                'rgb(160, 171, 210) 60%, rgb(218, 216, 234) 80%, rgb(254, 254, 255) 100%)'
        }}>
            <div style={{
                width: '100%',
                margin: '15px',
                boxSizing: 'border-box',
                height: '75%',
                borderRadius: '12px',
                backgroundColor: 'white',
            }}>
                <div style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '100%',
                    overflowY: 'scroll',
                    borderRadius: '12px',
                    backgroundColor: 'white'
                }} className={'moduleContent'}>
                    {
                        this.props.lessonData && <div style={{padding: '12px'}}>
                            <Jumbotron>
                                <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>Модуль {this.props.modules
                                    .filter(x => x.id === this.props.lessonData.module)[0].name}</h2>
                                <h2 style={{
                                    textAlign: 'center',
                                    paddingBottom: '10px'
                                }}>Урок {this.props.lessonData.number}</h2>
                                <p>
                                <pre>
                                {this.props.lessonData.themes}
                                </pre>
                                </p>
                            </Jumbotron>
                            <Jumbotron>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <video width={'400px'} controls="controls" src={this.props.lessonData.video}>
                                    </video>
                                </div>
                            </Jumbotron>
                        </div>
                    }
                </div>
            </div>
        </div>
    }
}

export default ModuleContent