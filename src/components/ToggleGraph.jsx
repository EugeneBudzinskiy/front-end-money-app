import './ToggleGraph.css';

import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {useApi} from "../utilites/ApiProvider.tsx";
import {NotificationManager} from "react-notifications";
import {useSession} from "../utilites/Session.jsx";

function Graph() {
    const api = useApi()
    const {isAuthenticated} = useSession()
    const [loginMessage, setLoginMessage] = useState(true)
    const baseColor = '#f4f5f6';
    const barColor = '#8190f3';
    const incomeColor = '#00ff00';
    const costsColor = '#ff0000';
    const [isLoaded,setIsLoaded] = useState(false)
    const [dataCategorySpends, setDataCategorySpends] =useState([])

    const [dataCostsLine, setDataCostsLine] =useState([])


    const [dataIncomeLine,setDataIncomeLine] = useState([])


    const handleResponse = (response) => {
        const myDataCostsLine = response.data.costs_line.map(
            (cost_line) => ({
                ...cost_line,
                x: `${cost_line["date"]}`,
                y: parseInt(`${cost_line["total"]}`, 10),
            })
        );
        const myDataIncomesLine = response.data.incomes_line.map(
            (income_line) => ({
                ...income_line,
                x: `${income_line["date"]}`,
                y: parseInt(`${income_line["total"]}`, 10),
            })
        );
        const myDataCategorySpends = response.data.category_spend.map(
            (spend) => ({
                ...spend,
                quarter: `${spend["category"]}`,
                earnings: parseInt(`${spend["total"]}`, 10),
            })
        );

        setDataCategorySpends(myDataCategorySpends);
        setDataIncomeLine(myDataIncomesLine);
        setDataCostsLine(myDataCostsLine);
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!isAuthenticated() && loginMessage){
            NotificationManager.info("Log in please to see your data", "Log In Please")
            setDataIncomeLine([
                { x: "1", y: 3 },
                { x: "2", y: 4 },
                { x: "3", y: 6 },
                { x: "4", y: 5 },
                { x: "5", y: 8 },
                {x: "6", y: 10}
            ])
            setDataCostsLine( [
                { x: "1", y: 2 },
                { x: "2", y: 3 },
                { x: "3", y: 5 },
                { x: "4", y: 4 },
                { x: "5", y: 7 },
                {x: "6", y: 20}
            ])
            setDataCategorySpends([
                    {quarter: "Shop", earnings: 13000},
                    {quarter: "Restaurant", earnings: 16500},
                    {quarter: "Coffee", earnings: 14250},
                    {quarter: "Games", earnings: 19000}
                ])

            setLoginMessage(false)
        }
        if (!isLoaded) {
            api.get(`/v1/statistic/data_analytics`).then((response) => {
                handleResponse(response);
            });
        }
    }, [dataIncomeLine,dataCostsLine,dataCategorySpends]);

    return (
        <>
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
                        tickValues={dataCategorySpends}

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
        </>
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
                    { (this.state.showState) && <Graph />}
                        </div>
            </div>
        );
    }
}
export default ToggleGraph;