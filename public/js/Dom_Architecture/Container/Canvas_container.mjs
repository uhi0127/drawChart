import { barChart } from '../../Chart/BarChart.mjs';
import { lineChart } from '../../Chart/LineChart.mjs';
import { pieChart } from '../../Chart/PieChart.mjs';
class Canvas_container{
    constructor( id ) {
        this.id = id;
    }

    drawCanvas(){
        barChart.makeChart();
        // lineChart.makeChart();
        // pieChart.makeChart();
    }
}

const canvas_container = new Canvas_container("canvas_container");
export { canvas_container };