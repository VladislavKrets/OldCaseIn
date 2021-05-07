import React from "react";
import './NavidationDrawer.css'

export default class NavigationDrawer extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = null
    }

    render() {
        return <div style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: this.props.right ? 'row-reverse' : null,
            top: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: '10'
        }} onClick={this.props.onClose}>
            <div className={'drawer drawer-opened' + (this.props.right ? ' drawer-right' : '')}
                 onClick={e => e.stopPropagation()}>
                {this.props.children}
            </div>
        </div>
    }
}