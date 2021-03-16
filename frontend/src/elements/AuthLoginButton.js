import React from "react";

export default function AuthLoginButton(props) {
    return <button style={{
        border: "none",
        outline: "none",
        background: "none",
        backgroundColor: "white",
        color: "black",
        borderRadius: "20px",
        width: "220px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
        alignItems: "center"
    }} {...props}>
        {props.children}
    </button>
}