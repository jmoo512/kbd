//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//use selector to modify api address per store selected
function selectStore() {
  let baseAPI
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let salesAPI="/weekly/" + store
  let inspAPI="/insp/" + store
  let ceAPI="/ce/" + store

  return {salesAPI, inspAPI, ceAPI}
}


//grab sales and guest count data from api
async function getSalesData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpSales18 = [];
  let tmpSales19 = [];
  let tmpSales20 = [];
  let tmpGC19 = [];
  let tmpGC20 = [];
  let tmpBBQGC19 = [];
  let tmpBBQGC20 = [];
  let tmpTacoGC19 = [];
  let tmpTacoGC20 = [];
  let tmpOloSales19 = [];
  let tmpOloSales20 = [];
  let tmpDoorDash19 = [];
  let tmpDoorDash20 = [];
  let tmpWeeks = [];
  let tmpPctSales = []
  let tmpPctGC = []

  data.forEach( obj => {
    if (obj.fiscal_year === 2018){
      tmpSales18.push(obj.sales);
    }
    if (obj.fiscal_year === 2019){
      tmpSales19.push(obj.sales);
      tmpGC19.push(obj.total_guest_count);
      tmpBBQGC19.push(obj.bbq_guest_count);
      tmpTacoGC19.push(obj.taco_guest_count);
      tmpOloSales19.push(obj.mavn_sales);
      tmpDoorDash19.push(obj.doordash_sales);
    }
    if (obj.fiscal_year === 2020){
      tmpSales20.push(obj.sales);
      tmpGC20.push(obj.total_guest_count);
      tmpPctSales.push(obj.percent_sales);
      tmpBBQGC20.push(obj.bbq_guest_count);
      tmpTacoGC20.push(obj.taco_guest_count);
      tmpPctGC.push(obj.percent_guest_count);
      tmpOloSales20.push(obj.mavn_sales);
      tmpDoorDash20.push(obj.doordash_sales);
    }

    tmpWeeks.push(obj.week_of_year);

  });

  return {tmpSales18, tmpSales19, tmpSales20, tmpGC19, tmpGC20, tmpOloSales19, tmpOloSales20, tmpDoorDash19, tmpDoorDash20, tmpBBQGC19, tmpBBQGC20, tmpTacoGC19, tmpTacoGC20, tmpWeeks, tmpPctSales, tmpPctGC};
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
  "2018":"#ca3e47",
  "2019":"#cac13e",
  "2020":"#47ca3e",
  "bgColor":"#313131"
  }

//default layout for charts

let layout1 =  {
  autosize: true,
  paper_bgcolor: colors['bgColor'],
  plot_bgcolor: colors['bgColor'],
  width: 370,
  height: 260,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 5
  },
  xaxis: {
    tickcolor: '#FFF',
    tickfont: {
      color: "#FFF"
    },
  },
  yaxis: {
    tickcolor: '#FFF',
    tickfont: {
      color: "#FFF"
    },
  },
  legend: {
    orientation:"h",
    x:0,
    xanchor:"left",
    y:1.3,
    font: {
      color: '#FFF'
    }
  }
}

let layout2 =  {
  autosize: true,
  paper_bgcolor: colors['bgColor'],
  plot_bgcolor: colors['bgColor'],
  width: 245,
  height: 260,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 5
  },
  xaxis: {
    tickcolor: '#FFF',
    tickfont: {
      color: "#FFF"
    },
  },
  yaxis: {
    tickcolor: '#FFF',
    tickfont: {
      color: "#FFF"
    },
  },
  legend: {
    font: {
      color: '#FFF'
    }
  }
}

var inspLayout = { width: 350,
  height: 100,
  margin: {
    l: 5,
    r: 5,
    b: 30,
    t: 5,
    pad: 5
  }
 };

let config = {responsive: true, displayModeBar: false}



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const salesData = await getSalesData(getAPI.salesAPI);
  const inspData = await getInspData(getAPI.inspAPI);
  const ceData = await getCEData(getAPI.ceAPI);

  let chartSales18 = salesData.tmpSales18;
  let chartSales19 = salesData.tmpSales19;
  let chartSales20 = salesData.tmpSales20;
  let chartGC19 = salesData.tmpGC19;
  let chartGC20 = salesData.tmpGC20;
  let chartBBQGC19 = salesData.tmpBBQGC19;
  let chartBBQGC20 = salesData.tmpBBQGC20;
  let chartTacoGC19 = salesData.tmpTacoGC19;
  let chartTacoGC20 = salesData.tmpTacoGC20;
  let chartOloSales19 = salesData.tmpOloSales19;
  let chartOloSales20 = salesData.tmpOloSales20;
  let chartDoorDash19 = salesData.tmpDoorDash19;
  let chartDoorDash20 = salesData.tmpDoorDash20;
  let weeks = salesData.tmpWeeks;
  let pctSales = salesData.tmpPctSales;
  let pctGC = salesData.tmpPctGC;
  let inspAvgMonth = inspData.inspAvg;
  let inspAvgWeek = inspData.inspWeekAvg;
  let ceAvgMonth = ceData.ceAvgMonth;
  let ceAvgWeek = ceData.ceAvgWeek;


  pctSales = pctSales.map(i => i + '%')
  pctGC = pctGC.map(i => i + '%')

  let sales18 = {
    x: weeks,
    y: chartSales18,
    mode: 'lines',
    line: {
      color: colors['2018'],
      width: 2,
    },
    name: '2018'
  };

  let sales19 = {
    x: weeks,
    y: chartSales19,
    mode: 'lines',
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  };

  let sales20 = {
    x: weeks,
    y: chartSales20,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020',
    text: pctSales
  };

  let updatedSales = [sales18, sales19, sales20]

  let gc19 = {
    x: weeks,
    y: chartGC19,
    mode: 'lines'
    ,
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  }

  let gc20 = {
    x: weeks,
    y: chartGC20,
    mode: 'lines'
    ,
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020',
    text: pctGC
  }

  let updatedGC = [gc19, gc20]

  let bbqgc19 = {
    x: weeks,
    y: chartBBQGC19,
    mode: 'lines'
    ,
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  }

  let bbqgc20 = {
    x: weeks,
    y: chartBBQGC20,
    mode: 'lines'
    ,
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020'
  }

  let updatedBBQGC = [bbqgc19, bbqgc20]

  let tacogc19 = {
    x: weeks,
    y: chartTacoGC19,
    mode: 'lines'
    ,
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  }

  let tacogc20 = {
    x: weeks,
    y: chartTacoGC20,
    mode: 'lines'
    ,
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020'
  }

  let updatedTacoGC = [tacogc19, tacogc20]

  let oloSales19 = {
    x: weeks,
    y: chartOloSales19,
    mode: 'lines'
    ,
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  }

  let oloSales20 = {
    x: weeks,
    y: chartOloSales20,
    mode: 'lines'
    ,
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020'
  }

  let updatedOloSales = [oloSales19, oloSales20]

  let doorDash19 = {
    x: weeks,
    y: chartDoorDash19,
    mode: 'lines'
    ,
    line: {
      color: colors['2019'],
      width: 2,
    },
    name: '2019'
  }

  let doorDash20 = {
    x: weeks,
    y: chartDoorDash20,
    mode: 'lines'
    ,
    line: {
      color: colors['2020'],
      width: 2,
    },
    name: '2020'
  }

  let updatedDoorDash = [doorDash19, doorDash20]

  let inspFig = [
    {
      type: "indicator",
      mode: "number+gauge",
      value: inspAvgWeek,
      domain: { x: [0, 1], y: [0, 1] },
      //title: { text: "Inspections",
              //position: "top",
      //        font: {size: 12}
     //},
      //delta: { reference: inspAvgMonth },
      gauge: {
        shape: "bullet",
        axis: { range: [3, 4] },
        //threshold: {
        //  line: { color: "red", width: 2 },
        //  thickness: 0.75,
        //  value: 280
        //},
        steps: [
          { range: [3, inspAvgMonth], color: colors['bgColor'] },
        ],
        bar: { color: colors['2019'] }
      }
    }
  ];

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
      //delta: { reference: inspAvgMonth },
      gauge: {
        shape: "bullet",
        axis: { range: [7, ceAvgWeek * 1.1] },
        //threshold: {
        //  line: { color: "red", width: 2 },
        //  thickness: 0.75,
        //  value: 280
        //},
        steps: [
          { range: [7, ceAvgMonth], color: colors['bgColor'] },
        ],
        bar: { color: colors['2019'] }
      }
    }
  ];

  Plotly.react('sales-chart', updatedSales, layout1, config)
  Plotly.react('guest-count-chart', updatedGC, layout1, config)
  Plotly.react('bbq-chart', updatedBBQGC, layout1, config)
  Plotly.react('tacos-chart', updatedTacoGC, layout1, config)
  Plotly.react('olo-chart', updatedOloSales, layout1, config)
  Plotly.react('dd-chart', updatedDoorDash, layout1, config)
  Plotly.newPlot('insp-chart', inspFig, inspLayout, config);
  Plotly.newPlot('ce-chart', ceFig, inspLayout, config);


  let currentWeek = weeks[weeks.length-1]
  let currentSales = chartSales20[chartSales20.length-1]
  let currentGC = chartGC20[chartGC20.length-1]
  let currentPctSales = pctSales[pctSales.length-1]
  let currentPctGC = pctGC[pctGC.length-1]
  let currentBBQGC = chartBBQGC20[chartBBQGC20.length-1]
  let currentTacoGC = chartTacoGC20[chartTacoGC20.length-1]
  let currentOlo = chartOloSales20[chartOloSales20.length-1]
  let currentDoorDash = chartDoorDash20[chartDoorDash20.length-1]


  document.getElementById("sales-data").innerHTML = 'Weekly Sales: $' + currentSales + ' | ' + currentPctSales + '%'
  document.getElementById("guest-count-data").innerHTML = 'Weekly Guest Count: ' + currentGC + ' | ' + currentPctGC + '%'
  document.getElementById("bbq-data").innerHTML = 'BBQ Guest Count: ' + currentBBQGC
  document.getElementById("tacos-data").innerHTML = 'Taco Guest Count: ' + currentTacoGC
  document.getElementById("olo-data").innerHTML = 'OLO Sales: $' + currentOlo
  document.getElementById("dd-data").innerHTML = 'DoorDash Sales: $' + currentDoorDash
  document.getElementById("insp-data-card").innerHTML = 'Inspections: Week - ' + inspAvgWeek + ' | MTD - ' + inspAvgMonth
  document.getElementById("ce-data-card").innerHTML = 'Efficiency: Week - $' + ceAvgWeek + ' | MTD - $' + ceAvgMonth


}


//array for empty data for store level charts
let startingData = []
let startingBulletData = [{
  type: "indicator",
  mode: "number+gauge",
  gauge: {shape: "bullet"}}]

//instantiate empty charts to DOM
Plotly.newPlot( 'sales-chart', startingData, layout1, config);
Plotly.newPlot( 'guest-count-chart', startingData, layout1, config);
Plotly.newPlot( 'bbq-chart', startingData, layout1, config);
Plotly.newPlot( 'tacos-chart', startingData, layout1, config);
Plotly.newPlot( 'olo-chart', startingData, layout1, config);
Plotly.newPlot( 'dd-chart', startingData, layout1, config);
Plotly.newPlot( 'insp-chart', startingBulletData, inspLayout, config);
Plotly.newPlot( 'ce-chart', startingBulletData, inspLayout, config);


var accidentData = [
  {
    type: "indicator",
    mode: "number+gauge+delta",
    value: 546,
    domain: { x: [0, 1], y: [0, 1] },
    title: { text: "Days Accident Free"},
    delta: { reference: 1987 },
    gauge: {
      shape: "bullet",
      axis: { range: [null, 2000] },
      //threshold: {
      //  line: { color: "red", width: 2 },
      //  thickness: 0.75,
      //  value: 280
      //},
      steps: [
        { range: [0, 1987], color: "lightgray" },
      ]
    }
  }
];

var inspLayout = { width: 350,
  height: 100,
  margin: {
    l: 5,
    r: 5,
    b: 30,
    t: 5,
    pad: 5
  }
 };
var inspConfig = { responsive: true };


Plotly.newPlot('accident-chart', accidentData, inspLayout, inspConfig);
