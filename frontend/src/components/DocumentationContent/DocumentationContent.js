import React from "react";
import {Link} from "react-router-dom";
import './DocumentationContent.css'

export default class DocumentationContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: []
        }
    }

    componentDidMount() {
        document.title = 'Документы'
        this.props.setHeaderName('Документы')
        this.props.getDocuments().then(data => {
            this.setState({
                documents: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <div style={{
                        padding: "40px 12px 20px 12px",
                        position: 'relative',
                        zIndex: 2,
                        fontWeight: '900',
                        fontSize: '2em',

                    }} className={'module-content-header'}>
                        Документы компании
                    </div>
                    {
                        this.state.documents.map(item => {
                            return <div className={'file-container'}>
                                <div className={'doc-file'}>
                                    <a href={item.document} style={{position: 'relative', zIndex: 2}}
                                       target="_blank" download>{item.title}</a>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }

}