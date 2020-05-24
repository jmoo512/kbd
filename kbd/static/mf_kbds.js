//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//use selector to modify api address per store selected
function selectStore() {
  let baseAPI = "http://127.0.0.1:5000"
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let inspAPI="/insp/" + store
  let ceAPI="/ce/" + store

  return {salesAPI, inspAPI, ceAPI}
}


//grab inspection data from api
async function getInspData(api) {
  const response = await fetch(api);
  const data = await response.json();


  let tmpInspTotal = [];
  let tmpInspWeek = [];
  let tmpWeek = [];

  data.forEach(obj => {
    tmpInspTotal.push(obj.score);
    tmpWeek.push(obj.week_of_month);
  });

  let currWeek = Math.max.apply(null, tmpWeek)

  let sum1 = tmpInspTotal.reduce((a, b) => a + b, 0);
  let tmpInspAvg = (sum1 / tmpInspTotal.length) || 0;
  let inspAvg = tmpInspAvg.toFixed(2);


  data.forEach( obj => {
    if (obj.week_of_month === currWeek){
      tmpInspWeek.push(obj.score)
    }
  });

  let sum2 = tmpInspWeek.reduce((a, b) => a + b, 0);
  let tmpInspWeekAvg = (sum2 / tmpInspWeek.length) || 0;
  let inspWeekAvg = tmpInspWeekAvg.toFixed(2);


  return {inspAvg, inspWeekAvg};
}

//grab ce data from api
async function getCEData(api) {
  const response = await fetch(api);
  const data = await response.json();


  let tmpMinutesTotal = [];
  let tmpDollarsTotal = [];
  let tmpMinutesWeek = [];
  let tmpDollarsWeek = [];
  let tmpWeek = [];

  data.forEach(obj => {
    tmpMinutesTotal.push(obj.tm_minutes);
    tmpDollarsTotal.push(obj.tm_sales);
    tmpWeek.push(obj.week_of_month);
  });

  let currWeek = Math.max.apply(null, tmpWeek)

  let sumMinutesTotal = tmpMinutesTotal.reduce((a, b) => a + b, 0);
  let sumDollarsTotal = tmpDollarsTotal.reduce((a, b) => a + b, 0);
  let tmpCEAvg = (sumDollarsTotal / sumMinutesTotal) || 0;
  let ceAvgMonth = tmpCEAvg.toFixed(2);

  data.forEach( obj => {
    if (obj.week_of_month === currWeek){
      tmpMinutesWeek.push(obj.tm_minutes);
      tmpDollarsWeek.push(obj.tm_sales);
    }
  });

  let sumMinutesWeek = tmpMinutesWeek.reduce((a, b) => a + b, 0);
  let sumDollarsWeek = tmpDollarsWeek.reduce((a, b) => a + b, 0);
  let tmpCeWeekAvg = (sumDollarsWeek / sumMinutesWeek) || 0;
  let ceAvgWeek = tmpCeWeekAvg.toFixed(2);

  return {ceAvgMonth, ceAvgWeek};
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

//default layout for charts

let chartLayout =  {
  autosize: true,
  paper_bgcolor: colors['bgColor'],
  plot_bgcolor: colors['bgColor'],
  xaxis: {
  },
  yaxis: {
  },
  legend: {
    font: {
      color: colors['text']
    }
  }
}

let sparkLayout =  {
  autosize: true,
  paper_bgcolor: colors['bgColor'],
  plot_bgcolor: colors['bgColor'],
  //width: 390,
  //height: 260,
  //margin: {
    //l: 50,
    //r: 50,
    //b: 50,
    //t: 50,
    //pad: 5
  //},
  xaxis: {

  },
  yaxis: {
  },
  legend: {
  }
}




let config = {responsive: true, displayModeBar: false}



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const inspData = await getInspData(getAPI.inspAPI);
  const ceData = await getCEData(getAPI.ceAPI);

  let inspAvgMonth = inspData.inspAvg;
  let inspAvgWeek = inspData.inspWeekAvg;
  let ceAvgMonth = ceData.ceAvgMonth;
  let ceAvgWeek = ceData.ceAvgWeek;

  let ceFig = [
    {
      type: "indicator",
      mode: "number+gauge",
      value: ceAvgWeek,
      number: {prefix: "$"},
      domain: { x: [0, 1], y: [0, 1] },
      //title: { text: "Inspections",
              //position: "top",
      //        font: {size: 12}
     //},
      //delta: { reference: ceAvgMonth },
      gauge: {
        shape: "bullet",
        axis: { range: [7, ceAvgWeek * 1.1] },
        bgcolor: colors['bgColor'],
        //threshold: {
        //  line: { color: "red", width: 2 },
        //  thickness: 0.75,
        //  value: 280
        //},
        steps: [
          { range: [7, ceAvgMonth], color: colors['bgColor'] },
        ],

        bar: { color: colors['2020'] }
      }
    }
  ];


  Plotly.newPlot('insp-chart', inspFig, inspLayout, config);

  //let currentWeek = weeks[weeks.length-1]


  document.getElementById("sales-data").innerHTML = 'Weekly Sales: $' + currentSales + ' | ' + currentPctSales + '%'
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'insp-chart', startingData, layout1, config);
