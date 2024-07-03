import {FC} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartInterface {
    symbol: string
    data: number[]
}

const Chart: FC<ChartInterface> = ({data, symbol}) => {
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={{
                title: {
                    text: symbol
                },
                series: [{
                    data
                }]
            }}

        />

    )
}

export default Chart