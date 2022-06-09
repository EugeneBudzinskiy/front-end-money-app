import './ToggleGraph.css';

import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import React from 'react';
import Button from "react-bootstrap/Button";

function Graph(props) {
    if (!props.showState) {return null}

    const baseColor = '#f4f5f6';
    const barColor = '#8190f3';
    const incomeColor = '#00ff00';
    const costsColor = '#ff0000';

    const dataCategorySpends = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
    ];

    const dataCostsLine = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
    ];

    const dataIncomeLine = [
        { x: 1, y: 3 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 5 },
        { x: 5, y: 8 }
    ];

    return (
        <div className="d-flex justify-content-center">
            <div className='d-flex flex-lg-row flex-column'>
                <VictoryChart
                    // adding the material theme provided with Victory
                    theme={VictoryTheme.material}
                    domainPadding={20}
                >
                    <VictoryAxis
                        style={{
                            axis: {stroke: baseColor},
                            tickLabels: {fill: baseColor}
                        }}
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Shop", "Restaurant", "Coffee", "Games"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            axis: {stroke: baseColor},
                            tickLabels: {fill: baseColor}
                        }}
                        tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                        style={{ data: { fill: barColor } }}
                        data={ dataCategorySpends }
                        x="quarter"
                        y="earnings"
                    />
                </VictoryChart>

                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryAxis
                        style={{
                            axis: {stroke: baseColor},
                            tickLabels: {fill: baseColor}
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            axis: {stroke: baseColor},
                            tickLabels: {fill: baseColor}
                        }}
                    />
                    <VictoryLine
                        style={{ data: { stroke: incomeColor } }}
                        data={ dataIncomeLine }
                    />
                    <VictoryLine
                        style={{ data: { stroke: costsColor } }}
                        data={ dataCostsLine }
                    />
                </VictoryChart>
            </div>
        </div>
    );
}

class ToggleGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showState: false};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            showState: !state.showState
        }));
    }

    render() {
        return (
            <div className='toggle-content d-flex flex-column'>
                <Button className='shadow-none' onClick={ this.handleToggleClick }>
                    { this.state.showState ? 'Hide' : 'Show' }
                </Button>

                <div className={ this.state.showState ? 'graph-wrapper show-graph' : 'graph-wrapper' }>
                    <Graph showState={ this.state.showState } />
                </div>
            </div>
        );
    }
}
export default ToggleGraph;