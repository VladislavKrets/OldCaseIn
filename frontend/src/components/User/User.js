import React from "react";
import './User.css'
import ModalAddCalendar from "../ModalAddCalendar/ModalAddCalendar";
import ModalGroupMembers from "../ModalGroupMembers/ModalGroupMembers";
import defaultProfile from "../../assets/default_profile.svg"
import SimpleUserData from "../SimpleUserData/SimpleUserData";
import Master from "../Master/Master";
import {withRouter} from "react-router";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setModalShow = (modalShow) => {
        this.setState({
            modalShow: modalShow
        })
    }

    componentDidMount() {
        document.title = 'Профиль'
        if (!this.props.masterPreview) {
            this.props.setHeaderName('Профиль')
            this.props.getUser().then(data => {
                this.props.setUserData(data.data)
            })
        }
    }

    handleImageChange = (e) => {
        const image = e.target.files[0];
        this.props.avatarUpload(image).then(data => {
            const userData = this.props.userData
            userData.avatar = data.data
            this.props.setUserData(userData)
        }).catch(e => {

        })
    }

    render() {
        return this.props.userData ? <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <div className={'user-content'}>
                        <div className={'user-hello'}>
                            <div className={'hello-phrase'}>
                                {!this.props.masterPreview && "Здравствуйте, "}
                                {this.capitalizeFirstLetter(this.props.userData.first_name)}{!this.props.masterPreview && "!"}
                                {this.props.masterPreview && ` ${this.capitalizeFirstLetter(this.props.userData.last_name)}`}
                            </div>
                            <div style={{display: 'flex'}}>
                                <label style={{marginRight: '7px', cursor: 'pointer'}}>
                                    <img
                                        src={this.props.userData.avatar ? this.props.userData.avatar.image : defaultProfile}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}/>
                                    {!this.props.masterPreview && <input type="file"
                                                                         style={{display: "none"}}
                                                                         value={''}
                                                                         accept="image/png, image/jpeg"
                                                                         onChange={this.handleImageChange}/>}
                                </label>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    fontWeight: '900'
                                }}>
                                    <div>{this.capitalizeFirstLetter(this.props.userData.first_name)}</div>
                                    <div>{this.capitalizeFirstLetter(this.props.userData.last_name)}</div>
                                </div>
                            </div>
                        </div>
                        {
                            this.props.userData.type === 'master' && !this.props.masterPreview ? <Master
                                    key={window.location.pathname}
                                    getGroups={this.props.getGroups}
                                    getMasterUser={this.props.getMasterUser}
                                    userData={this.props.userData}
                                    history={this.props.history}
                                />
                                : <SimpleUserData
                                    masterPreview={this.props.masterPreview}
                                    key={window.location.pathname}
                                    setModalShow={this.setModalShow}
                                    userData={this.props.userData}
                                />
                        }
                    </div>
                </div>
            </div>
            {
                this.state.modalShow && <ModalGroupMembers
                    show={this.state.modalShow}
                    getUserGroupData={this.props.getUserGroupData}
                    onHide={() => this.setModalShow(false)}/>
            }
        </div> : <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}/>
            </div>
        </div>
    }
}

export default withRouter(User)