import React from "react";
import {withRouter} from "react-router";

class CurrentBuildingData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBuilding: null,
            currentBuildingFloors: []
        }
    }

    componentDidMount() {
        this.props.getCurrentBuilding(this.props.match.params.id).then(data => {
            this.setState({
                currentBuilding: data.data
            })
        })
        this.props.getFloors(this.props.match.params.id).then(data => {
            this.setState({
                currentBuildingFloors: data.data
            })
        })
    }

    render() {
        return <>
            <h3 style={{textAlign: 'center', padding: '15px 0'}}>
                {this.state.currentBuilding && this.state.currentBuilding.address}</h3>
            {
                this.state.currentBuildingFloors.map(item => {
                    return <div className={'file-container'}>
                        <a style={{
                            display: 'block',
                            fontWeight: 'bold',
                            fontSize: '1.2em',
                            cursor: 'pointer',
                            textDecoration: "underline"
                        }} href={`/floor_view/${item.id}/`}
                           target={'_blank'}
                        >
                            Этаж {item.floor_number}
                        </a>
                    </div>
                })
            }
        </>
    }
}

export default withRouter(CurrentBuildingData)