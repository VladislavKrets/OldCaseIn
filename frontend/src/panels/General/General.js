import React from "react";
import logo from '../../assets/logo.png'
import construction from '../../assets/construction.jpg'
import notebook from '../../assets/notebook.jpg'
import phone from '../../assets/phone.jpg'
import {Link} from "react-router-dom";
import './General.css'

class General extends React.Component {
    render() {
        return <>
            <section
                className="general">
                <div className={'general-content'}>
                    <div className={'general-container'}>
                        <img src={logo} alt="" className="general-logo"
                             data-image-width="766" data-image-height="269" data-href="https://www.rosatom.ru/"
                             data-target="_blank"/>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Link to="auth/"
                                  className="general-enter-button">ВХОД</Link>
                        </div>
                    </div>

                    <div className={'general-images-container'}>
                        <h2 className={'general-title'}>Включайся в работу с
                            нами!</h2>
                        <img className="general-image"
                             src={notebook} data-image-width="1372" data-image-height="1235"/>
                        <img alt="" className="general-image general-image-center"
                             data-image-width="1200" data-image-height="1158"
                             src={construction}/>
                        <img src={phone} alt=""
                             className="general-image"
                             data-image-width="1080" data-image-height="735"/>
                    </div>
                </div>
            </section>
        </>
    }
}

export default General