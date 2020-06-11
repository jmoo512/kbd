//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//use selector to modify api address per store selected
function selectStore() {
  let baseAPI = "http://127.0.0.1:5000"
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let inspAPI="/insp/" + store
  let gfAPI="/gf/" + store

  return {inspAPI, gfAPI}
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
  let tmpQuarterInspAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterInspAvg = tmpQuarterInspAvg.toFixed(2);


  //find weekly averages
  uniqueWeeks = _.uniq(tmpWeekOfYear, true)

  let tmpWeekAvgScores = [];

  uniqueWeeks.forEach(week => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempScores.push(obj.score);
        }
      })

      let sum4 = _.sum(tempScores)

      let tempWeekInspAvg = (sum4 / tempScores.length) || 0;
      let tempWeekInspAvgRound = tempWeekInspAvg.toFixed(2)
      tmpWeekAvgScores.push(tempWeekInspAvgRound)
  })


  return {weekInspAvg, monthInspAvg, quarterInspAvg, tmpScores, tmpWeekOfYear, uniqueWeeks, tmpWeekAvgScores};
}


//grab gf data from api
async function getGFData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpGFWeek = [];
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
  let tmpWeekGFAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekGFAvg = tmpWeekGFAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthGFAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthGFAvg = tmpMonthGFAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterGFAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterGFAvg = tmpQuarterGFAvg.toFixed(2);


  //find weekly averages
  uniqueWeeks = _.uniq(tmpWeekOfYear, true)

  let tmpWeekAvgScores = [];

  uniqueWeeks.forEach(week => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempScores.push(obj.score);
        }
      })

      let sum4 = _.sum(tempScores)

      let tempWeekGFAvg = (sum4 / tempScores.length) || 0;
      let tempWeekGFAvgRound = tempWeekGFAvg.toFixed(2)
      tmpWeekAvgScores.push(tempWeekGFAvgRound)
  })


  return {weekGFAvg, monthGFAvg, quarterGFAvg, tmpScores, tmpWeekOfYear, uniqueWeeks, tmpWeekAvgScores};
}

//grab gf data from api
async function getGFData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonthOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpGFWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonthOfYear.push(obj.fiscal_month);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });


  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthGFAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthGFAvg = tmpMonthGFAvg.toFixed(0);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterGFAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterGFAvg = tmpQuarterGFAvg.toFixed(0);


  //find monthly averages
  uniqueMonths = _.uniq(tmpMonthOfYear, true)

  let tmpMonthAvgScores = [];

  uniqueMonths.forEach(month => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.fiscal_month === month) {
        tempScores.push(obj.score);
        }
      })

      let sum4 = _.sum(tempScores)

      let tempMonthGFAvg = (sum4 / tempScores.length) || 0;
      let tempMonthGFAvgRound = tempMonthGFAvg.toFixed(2)
      tmpMonthAvgScores.push(tempMonthGFAvgRound)
  })

  return {monthGFAvg, quarterGFAvg, tmpScores, tmpWeekOfYear, uniqueWeeks, tmpMonthAvgScores};
}

//grap insp data for concept from api
async function getInspConceptData() {
  const response = await fetch('/insp_concept/Mighty Fine');
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
  let tmpQuarterInspAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterInspAvg = tmpQuarterInspAvg.toFixed(2);

  console.log(weekInspAvg, monthInspAvg, quarterInspAvg)


  return {weekInspAvg, monthInspAvg, quarterInspAvg};

}

//grap gf data for concept from api
async function getGFConceptData() {
  const response = await fetch('/gf_concept/Mighty Fine');
  const data = await response.json();

  let tmpScores = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthGFAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthGFAvg = tmpMonthGFAvg.toFixed(0);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterGFAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterGFAvg = tmpQuarterGFAvg.toFixed(0);


  return {monthGFAvg, quarterGFAvg};

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

  let ranges = {
    "insp":[3.4, 4.0],
    "gf":[60,100]
  }

  let inspLayout =  {
    //autosize: true,
    paper_bgcolor: '#FFFFFF',
    plot_bgcolor: '#FFFFFF',
    width: 300,
    height: 100,
    hovermode: false,
    margin: {
      l: 30,
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
      showticklabels: false,

    },
    yaxis: {
      //autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      dtick: 0.2,
      ticks: '',
      showticklabels: true,
      range: ranges["insp"]
    },
    legend: {
    }
  }

  let gfLayout =  {
    //autosize: true,
    paper_bgcolor: '#FFFFFF',
    plot_bgcolor: '#FFFFFF',
    width: 300,
    height: 100,
    hovermode: false,
    margin: {
      l: 30,
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
      showticklabels: false,

    },
    yaxis: {
      //autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      dtick: 20,
      ticks: '',
      showticklabels: true,
      range: ranges["gf"]
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
  const gfData = await getGFData(getAPI.gfAPI);


  let inspWeeks = inspData.uniqueWeeks;
  let gfWeeks = gfData.uniqueWeeks;

  let inspScores = inspData.tmpWeekAvgScores;
  let inspAvgWeek = inspData.weekInspAvg;
  let inspAvgMonth = inspData.monthInspAvg;
  let inspAvgQuarter = inspData.quarterInspAvg;


  let gfScores = gfData.tmpMonthAvgScores;
  let gfAvgMonth = gfData.monthGFAvg;
  let gfAvgQuarter = gfData.quarterGFAvg;


  let inspChartData = {
    x: inspWeeks,
    y: inspScores,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
      shape: 'spline'
    },
  }

  let gfChartData = {
    x: gfWeeks,
    y: gfScores,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
      shape: 'spline'
    },
  }

  inspSpark = [inspChartData]
  gfSpark = [gfChartData]


  Plotly.react('insp-chart', inspSpark, inspLayout, config);
  Plotly.react('gf-chart', gfSpark, gfLayout, config);

  document.getElementById("insp-week-big").innerHTML = inspAvgWeek + ' Wk';
  document.getElementById("insp-month").innerHTML = inspAvgMonth + ' Mo';
  document.getElementById("insp-q").innerHTML = inspAvgQuarter + ' Q';


  document.getElementById("gf-month").innerHTML = gfAvgMonth + ' Mo';
  document.getElementById("gf-q").innerHTML = gfAvgQuarter + ' Q';
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'insp-chart', startingData, inspLayout, config);
Plotly.newPlot( 'gf-chart', startingData, gfLayout, config);
//Plotly.newPlot( 'taco-times-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'cu-times-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'olo-times-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'acc-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'labor-chart', startingData, sparkLayout, config);

async function populateBaseCharts () {
  const inspConceptData = await getInspConceptData();
  const gfConceptData = await getGFConceptData();

  let inspConceptAvgWeek = inspConceptData.weekInspAvg;
  let inspConceptAvgMonth = inspConceptData.monthInspAvg;
  let inspConceptAvgQuarter = inspConceptData.quarterInspAvg;

  let gfConceptAvgMonth = gfConceptData.monthGFAvg;
  console.log(gfConceptAvgMonth)
  let gfConceptAvgQuarter = gfConceptData.quarterGFAvg;


  document.getElementById("insp-concept-big").innerHTML = inspConceptAvgWeek + ' Wk';
  document.getElementById("insp-concept-month").innerHTML = inspConceptAvgMonth + ' Mo';
  document.getElementById("insp-concept-q").innerHTML = inspConceptAvgQuarter + ' Q';


  document.getElementById("gf-concept-month").innerHTML = gfConceptAvgMonth + ' Mo';
  document.getElementById("gf-concept-q").innerHTML = gfConceptAvgQuarter + ' Q';
}

populateBaseCharts();
