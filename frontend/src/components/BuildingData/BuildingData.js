import React from "react";
import settings from "../../settings";
import './BuildingData.css'
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import {withRouter} from "react-router";
import CurrentBuildingData from "../CurrentBuildingData/CurrentBuildingData";

class BuildingData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
            currentBuilding: null,
            currentBuildingFloors: []
        }
    }

    componentDidMount() {
        this.props.getBuildings().then(data => {
            this.setState({
                buildings: data.data
            })
        })
    }

    render() {
        return <div className={'moduleContent-background'}>
            <div className={'moduleContent-no-overflow-parent'}>
                <div className={'moduleContent'}>
                    <PrivateRoute loading={false} token={this.props.token}
                                  path={`${this.props.match.url}/:id`}>
                        <CurrentBuildingData getCurrentBuilding={this.props.getCurrentBuilding}
                                             getFloors={this.props.getFloors}/>
                    </PrivateRoute>
                    <PrivateRoute loading={false} token={this.props.token}
                                  exact path={`${this.props.match.url}`}>
                        <>
                            <h3 style={{textAlign: 'center', padding: '15px 0'}}>Здания</h3>
                            {
                                !this.state.currentBuilding && this.state.buildings.map(item => {
                                    return <div className={'file-container'}>
                                        <div style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2em',
                                            cursor: 'pointer',
                                            textDecoration: "underline"
                                        }} onClick={() => {
                                            this.props.history.push(`/main/building/${item.id}`)
                                        }}>
                                            {item.address}
                                        </div>
                                    </div>
                                })
                            }
                        </>
                    </PrivateRoute>
                </div>
            </div>
        </div>
    }
}

export default withRouter(BuildingData)