//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//use selector to modify api address per store selected
function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let salesAPI="/sales/" + store
  let cumulAPI="/cumul/" + store

  return {salesAPI, cumulAPI}
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
    }
    if (obj.fiscal_year === 2020){
      tmpSales20.push(obj.sales);
      tmpGC20.push(obj.total_guest_count);
      tmpPctSales.push(obj.percent_sales);
      tmpPctGC.push(obj.percent_guest_count)
    }

    tmpWeeks.push(obj.week_of_year);

  });

  return {tmpSales18, tmpSales19, tmpSales20, tmpGC19, tmpGC20, tmpWeeks, tmpPctSales, tmpPctGC};
}

//grab cumulative sales data from api

async function getCumulData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpCumul18 = []
  let tmpCumul19 = []
  let tmpCumul20 = []
  let tmpPctCumul = []

  data.forEach( obj => {
    if (obj.fiscal_year === 2018){
      tmpCumul18.push(obj.cumulative);
    }
    if (obj.fiscal_year === 2019){
      tmpCumul19.push(obj.cumulative);
    }
    if (obj.fiscal_year === 2020){
      tmpCumul20.push(obj.cumulative);
      tmpPctCumul.push(obj.percent_cumul)
    }


  });

  return {tmpCumul18, tmpCumul19, tmpCumul20, tmpPctCumul};
}

//grab total sales and guest count data from api

async function getTotalSales() {
  const response = await fetch('/total_sales');
  const data = await response.json();

  let tmpSales18 = [];
  let tmpSales19 = [];
  let tmpSales20 = [];
  let tmpGC19 = [];
  let tmpGC20 = [];
  let tmpWeeks = [];
  let tmpPctSales = [];
  let tmpPctGC = [];

  data.forEach (obj => {
    if (obj.fiscal_year === 2018){
      tmpSales18.push(obj.sales);
    }
    if (obj.fiscal_year === 2019){
      tmpSales19.push(obj.sales);
      tmpGC19.push(obj.total_guest_count);
    }
    if (obj.fiscal_year === 2020){
      tmpSales20.push(obj.sales);
      tmpGC20.push(obj.total_guest_count);
      tmpPctSales.push(obj.percent_sales);
      tmpPctGC.push(obj.percent_guest_count);
    };

    tmpWeeks.push(obj.week_of_year);
  });

  return {tmpSales18, tmpSales19, tmpSales20, tmpWeeks, tmpGC19, tmpGC20, tmpPctSales, tmpPctGC}
}

//grab total cumulative sales from api

async function getTotalCumul() {
  const response = await fetch('/total_cumul');
  const data = await response.json();

  let tmpCumul18 = []
  let tmpCumul19 = []
  let tmpCumul20 = []
  let tmpPctCumul = []
  let tmpWeeks = []

  data.forEach( obj => {
    if (obj.fiscal_year === 2018){
      tmpCumul18.push(obj.cumulative);
    }
    if (obj.fiscal_year === 2019){
      tmpCumul19.push(obj.cumulative);
    }
    if (obj.fiscal_year === 2020){
      tmpCumul20.push(obj.cumulative);
      tmpPctCumul.push(obj.percent_cumul)
    }

  });

  return {tmpCumul18, tmpCumul19, tmpCumul20, tmpPctCumul};
}

//default layout for charts

let layout =  {
  autosize: false,
  paper_bgcolor: '#313131',
  plot_bgcolor: '#313131',
  width: 500,
  height: 400,
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

let config = {responsive: true, displayModeBar: true}



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const salesData = await getSalesData(getAPI.salesAPI);
  const cumulData = await getCumulData(getAPI.cumulAPI);

  let chartSales18 = salesData.tmpSales18;
  let chartSales19 = salesData.tmpSales19;
  let chartSales20 = salesData.tmpSales20;
  let chartGC19 = salesData.tmpGC19;
  let chartGC20 = salesData.tmpGC20;
  let weeks = salesData.tmpWeeks;
  let pctSales = salesData.tmpPctSales;
  let pctGC = salesData.tmpPctGC;
  let pctCumul = cumulData.tmpPctCumul
  let chartCumul18 = cumulData.tmpCumul18;
  let chartCumul19 = cumulData.tmpCumul19;
  let chartCumul20 = cumulData.tmpCumul20;

  let sales18 = {
    x: weeks,
    y: chartSales18,
    mode: 'lines',
    line: {
      color: '#ca3e47',
      width: 2,
    },
    name: '2018'
  };

  let sales19 = {
    x: weeks,
    y: chartSales19,
    mode: 'lines',
    line: {
      color: '#cac13e',
      width: 2,
    },
    name: '2019'
  };

  let sales20 = {
    x: weeks,
    y: chartSales20,
    mode: 'lines',
    line: {
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  };

  let updatedSales = [sales18, sales19, sales20]

    let gc19 = {
    x: weeks,
    y: chartGC19,
    mode: 'lines'
    ,
    line: {
      color: '#cac13e',
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
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  }

  let updatedGC = [gc19, gc20]

  let cumul18 = {
    x: weeks,
    y: chartCumul18,
    mode: 'lines'
    ,
    line: {
      color: '#ca3e47',
      width: 2,
    },
    name: '2018'
  }

  let cumul19 = {
    x: weeks,
    y: chartCumul19,
    mode: 'lines'
    ,
    line: {
      color: '#cac13e',
      width: 2,
    },
    name: '2019'
  }

  let cumul20 = {
    x: weeks,
    y: chartCumul20,
    mode: 'lines'
    ,
    line: {
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  }

  let updatedCumul = [cumul18, cumul19, cumul20]

  Plotly.react('sales-chart', updatedSales, layout, config)
  Plotly.react('guest-count-chart', updatedGC, layout, config)
  Plotly.react('cumul-sales-chart', updatedCumul, layout, config)

  let currentWeek = weeks[weeks.length-1]
  let currentSales = chartSales20[chartSales20.length-1]
  let currentGC = chartGC20[chartGC20.length-1]
  let currentPctSales = pctSales[pctSales.length-1]
  let currentPctGC = pctGC[pctGC.length-1]
  let currentCumul = pctCumul[pctCumul.length-1]

  document.getElementById("sales-data").innerHTML = 'Weekly Sales: $' + currentSales + ' | ' + currentPctSales + '%'
  document.getElementById("guest-count-data").innerHTML = 'Weekly Guest Count: ' + currentGC + ' | ' + currentPctGC + '%'
  document.getElementById("cumul-sales-data").innerHTML = 'YTD Sales Growth: ' + currentCumul + '%';
}

//load company level charts on page load
async function populateBaseCharts() {
  const salesData = await getTotalSales();
  const cumulData = await getTotalCumul();

  let weeks = salesData.tmpWeeks;
  let chartSales18 = salesData.tmpSales18;
  let chartSales19 = salesData.tmpSales19;
  let chartSales20 = salesData.tmpSales20;
  let chartGC19 = salesData.tmpGC19;
  let chartGC20 = salesData.tmpGC20;
  let chartCumul18 = cumulData.tmpCumul18;
  let chartCumul19 = cumulData.tmpCumul19;
  let chartCumul20 = cumulData.tmpCumul20;
  let pctSales = salesData.tmpPctSales;
  let pctGC = salesData.tmpPctGC;
  let pctCumul = cumulData.tmpPctCumul;


  let sales18 = {
    x: weeks,
    y: chartSales18,
    mode: 'lines',
    line: {
      color: '#ca3e47',
      width: 2,
    },
    name: '2018'
  };

  let sales19 = {
    x: weeks,
    y: chartSales19,
    mode: 'lines',
    line: {
      color: '#cac13e',
      width: 2,
    },
    name: '2019'
  };

  let sales20 = {
    x: weeks,
    y: chartSales20,
    mode: 'lines',
    line: {
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  };

  totalSales = [sales18, sales19, sales20]

  let gc19 = {
    x: weeks,
    y: chartGC19,
    mode: 'lines',
    line: {
      color: '#cac13e',
      width: 2,
    },
    name: '2019'
  };

  let gc20 = {
    x: weeks,
    y: chartGC20,
    mode: 'lines',
    line: {
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  };

  totalGC = [gc19, gc20]

  let cumul18 = {
    x: weeks,
    y: chartCumul18,
    mode: 'lines',
    line: {
      color: '#ca3e47',
      width: 2,
    },
    name: '2018'
  };

  let cumul19 = {
    x: weeks,
    y: chartCumul19,
    mode: 'lines',
    line: {
      color: '#cac13e',
      width: 2,
    },
    name: '2019'
  };

  let cumul20 = {
    x: weeks,
    y: chartCumul20,
    mode: 'lines',
    line: {
      color: '#47ca3e',
      width: 2,
    },
    name: '2020'
  };

  totalCumul = [cumul18, cumul19, cumul20]


  Plotly.newPlot( 'total-sales-chart', totalSales, layout, config);
  Plotly.newPlot( 'total-guest-count-chart', totalGC, layout, config);
  Plotly.newPlot( 'total-cumul-sales-chart', totalCumul, layout, config);

  let currentSales = chartSales20[chartSales20.length-1]
  let currentGC = chartGC20[chartGC20.length-1]
  let currentPctSales = pctSales[pctSales.length-1]
  let currentPctGC = pctGC[pctGC.length-1]
  let currentCumul = pctCumul[pctCumul.length-1]

  document.getElementById("total-sales-data").innerHTML = 'KN Sales: $' + currentSales + ' | ' + currentPctSales + '%'
  document.getElementById("total-guest-count-data").innerHTML = 'KN Guest Count: ' + currentGC + ' | ' + currentPctGC + '%'
  document.getElementById("total-cumul-sales-data").innerHTML = 'KN YTD Growth: ' + currentCumul + '%';


}

//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'sales-chart', startingData, layout, config);
Plotly.newPlot( 'guest-count-chart', startingData, layout, config);
Plotly.newPlot( 'cumul-sales-chart', startingData, layout, config);

//call function to instantiate company level charts on page load
populateBaseCharts()
