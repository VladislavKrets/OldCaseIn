import React from "react";

export default class BuildingData extends React.Component {

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
                {
                    this.state.currentBuilding &&
                    <div style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        cursor: 'pointer',
                        fontSize: '1.2em',
                        fontWeight: 'bold'
                    }}
                         onClick={() => {
                             this.props.getBuildings().then(data => {
                                 this.setState({
                                     buildings: data.data,
                                     currentBuilding: null,
                                     currentBuildingFloors: []
                                 })
                             })
                         }}>
                        {"< Назад"}
                    </div>
                }
                <div className={'moduleContent'}>
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
                                    this.setState({
                                        currentBuilding: item.id
                                    })
                                    this.props.getFloors(item.id).then(data => {
                                        this.setState({
                                            currentBuildingFloors: data.data
                                        })
                                    })
                                }}>
                                    {item.address}
                                </div>
                            </div>
                        })
                    }
                    {
                        this.state.currentBuilding && this.state.currentBuildingFloors.map(item => {
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
                </div>
            </div>
        </div>
    }
}