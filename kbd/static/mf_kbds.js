//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//use selector to modify api address per store selected
function selectStore() {
  let baseAPI = "http://127.0.0.1:5000"
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let inspAPI="/insp/" + store

  return {inspAPI}
}


//grab inspection data from api
async function getInspData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpInspWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });

  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === currWeek){
      tmpWeekScores.push(obj.score)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekInspAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekInspAvg = tmpWeekInspAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthInspAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthInspAvg = tmpMonthInspAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterInspAvg = (sum2 / tmpQuarterScores.length) || 0;
  let quarterInsvpAvg = tmpQuarterInspAvg.toFixed(2);

  //find weekly averages
  console.log(tmpWeekOfYear)
  uniqueWeeks = _.uniq(tmpWeekOfYear)
  console.log(uniqueWeeks)

  return {weekInspAvg, monthInspAvg, quarterInsvpAvg, tmpScores, tmpWeekOfYear};
}

//colors object
let colors = {
  "red":"#ac3e31",
  "yellow":"#dbae58",
  "blue":"#488a99",
  "bgColor":"#dadada",
  "text":"#20283e",
  "grey":"#484848"
  }


let sparkLayout =  {
  //autosize: true,
  paper_bgcolor: colors['bgColor'],
  plot_bgcolor: colors['bgColor'],
  width: 300,
  height: 100,
  margin: {
    l: 10,
    r: 10,
    b: 10,
    t: 10,
    pad: 5
  },
  xaxis: {
    //autorange: true,
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    //autorange: true,
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  legend: {
  }
}


let config = {//responsive: true,
              displayModeBar: false
}



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const inspData = await getInspData(getAPI.inspAPI);

  let weeks = inspData.tmpWeekOfYear;
  let scores = inspData.tmpScores;
  let inspAvgWeek = inspData.weekInspAvg;
  let inspAvgMonth = inspData.monthInspAvg;
  let inspAvgQuarter = inspData.quarterInsvpAvg;

  let inspChartData = {
    x: weeks,
    y: scores,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
    },
  }

  inspSpark = [inspChartData]


  Plotly.react('insp-chart', inspSpark, sparkLayout, config);

  //let currentWeek = weeks[weeks.length-1]


  document.getElementById("insp-week-card").innerHTML = inspAvgWeek + ' Wk';
  document.getElementById("insp-month-card").innerHTML = inspAvgMonth + ' Mo';
  document.getElementById("insp-q-card").innerHTML = inspAvgQuarter + ' Q';
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'insp-chart', startingData, sparkLayout, config);
