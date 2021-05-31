import React from "react";

class Students extends React.Component{

    componentDidMount() {
        document.title = 'Ученики'
        this.props.setHeaderName('Ученики')
    }

    render() {
        return <div>

        </div>
    }
}
export default Students