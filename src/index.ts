const echarts = require('echarts');
import {TimeRender} from "./timerender";

// based on prepared DOM, initialize echarts instance
const myChart = echarts.init(document.getElementById('main'));

const fileName = document.currentScript.getAttribute('file');
let month = new TimeRender.Month(fileName);

// specify chart configuration item and data
const option = {
    title: {
        text: 'ECharts entry example',
    },
    tooltip: {},
    legend: {
        data: ['Sales'],
    },
    xAxis: {
        data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks'],
    },
    yAxis: {},
    series: [
        {
            name: 'Sales',
            type: 'bar',
            data: [10, 20, 36, 10, 10, 20],
        }],
};

// use configuration item and data specified to show chart
myChart.setOption(option);
