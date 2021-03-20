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
                    <h3 style={{textAlign: 'center', padding: '15px 0'}}>Документы компании</h3>
                    {
                        this.state.documents.map(item => {
                            return <div className={'file-container'}>
                                <div style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                                    {item.title}
                                </div>
                                <div className={'doc-file'}>
                                    <a href={item.document} target="_blank" download>Скачать</a>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }

}