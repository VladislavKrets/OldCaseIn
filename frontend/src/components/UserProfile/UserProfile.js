import React from "react";
import './UserProfile.css'
import {Button, ProgressBar} from "react-bootstrap";

class UserProfile extends React.Component {

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return <div className={'user-profile'}>
            <div className={'user-profile-exit-container'}>
                <Button variant="link" onClick={this.props.logOut}>Выйти</Button>
            </div>
            {this.props.userData && <>
                <div className={'user-profile-name-container'}>
                    {this.capitalizeFirstLetter(
                        this.props.userData.first_name)} {this.capitalizeFirstLetter(this.props.userData.last_name)}
                </div>
                <hr/>
                {
                    this.props.userData.modules.map(module => {
                        return <>
                            <div className={'user-profile-module-title'}>
                                Модуль {module.number}
                            </div>
                            <hr/>
                            {
                                module.lessons.length === 0 && <>
                                    <div style={{
                                        padding: '0px 10px',
                                        textAlign: 'center'
                                    }}>
                                        В данном модуле ничего не пройдено
                                    </div>
                                    <hr/>
                                </>
                            }
                            {
                                module.lessons.map(lesson => {
                                    const now = Math.round(lesson.result.result_score / lesson.result.max_score * 100 * 100) / 100;
                                    return <>
                                        <div style={{
                                            padding: '0px 10px',
                                            textAlign: 'center'
                                        }}>
                                            Урок {lesson.number}
                                        </div>
                                        <div style={{
                                            padding: '0px 10px',
                                            paddingBottom: '5px',
                                        }}>
                                            Результат: {now === 0 ? (`${now}%`) : null}
                                        </div>
                                        {now !== 0 && <div style={{padding: '0px 10px'}}>
                                            <ProgressBar
                                                now={now}
                                                label={`${now}%`}
                                            />
                                        </div>}
                                        <hr/>
                                    </>
                                })
                            }
                        </>
                    })
                }

            </>
            }
        </div>
    }
}

export default UserProfile