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
            <div style={{
                padding: "40px 12px 20px 12px",
                position: 'relative',
                zIndex: 2,
                fontWeight: '900',
                fontSize: '2em',

            }} className={'module-content-header'}>
                {this.state.currentBuilding && this.state.currentBuilding.address}
            </div>
            {
                this.state.currentBuildingFloors.map(item => {
                    return <div className={'file-container'} style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{textAlign: 'center', paddingBottom: '12px'}}>
                            <a className={'floor-link'} href={`/floor_view/${item.id}/`}
                               target={'_blank'}
                            >
                                Этаж {item.floor_number}
                            </a>
                        </div>
                    </div>
                })
            }
        </>
    }
}

export default withRouter(CurrentBuildingData)