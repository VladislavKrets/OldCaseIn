import React from "react";
import './AuthLoginButton.css'

export default function AuthLoginButton(props) {
    return <button className={'auth-login-button'} {...props}>
        {props.children}
    </button>
}