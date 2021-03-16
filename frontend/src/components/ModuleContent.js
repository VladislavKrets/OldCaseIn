import React from "react";
import './ModuleContent.css'

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
            <div style={{width: '100%',
                margin: '15px',
                boxSizing: 'border-box',
                height: '75%',
                overflowY: 'scroll',
                borderRadius: '12px',
                backgroundColor: 'white'
            }} className={'moduleContent'}>

            </div>
        </div>
    }
}
export default ModuleContent