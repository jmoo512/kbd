//Add event listener to selector to call update functionality

document.getElementById("store-select").addEventListener("change",updateCharts);


//grab data from api
async function getData(api) {
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
      tmpGC19.push(obj.total_guest_count)
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

//use selector to modify api address per store selected
function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  return salesAPI
}


let layout =  {
  autosize: false,
  paper_bgcolor: '#313131',
  plot_bgcolor: '#313131',
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

//update charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const data = await getData(getAPI);

  let chartSales18 = data.tmpSales18;
  let chartSales19 = data.tmpSales19;
  let chartSales20 = data.tmpSales20;
  let chartGC19 = data.tmpGC19;
  let chartGC20 = data.tmpGC20;
  let weeks = data.tmpWeeks;
  let pctSales = data.tmpPctSales;
  let pctGC = data.tmpPctGC

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

  Plotly.react('sales-chart', updatedSales, layout, config)
  Plotly.react('guest-count-chart', updatedGC, layout, config)
  console.log(data)

  let currentWeek = weeks[weeks.length-1]
  let currentSales = chartSales20[chartSales20.length-1]
  let currentGC = chartGC20[chartGC20.length-1]
  let currentPctSales = pctSales[pctSales.length-1]
  let currentPctGC = pctGC[pctGC.length-1]

  document.getElementById("sales-data").innerHTML = 'Sales: $' + currentSales + ' | Growth: ' + currentPctSales + '%'
  document.getElementById("guest-count-data").innerHTML = 'Guest Count: ' + currentGC + ' | Growth: ' + currentPctGC + '%'

}




let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'sales-chart', startingData, layout, config);
Plotly.newPlot( 'guest-count-chart', startingData, layout, config);
Plotly.newPlot( 'total-sales-chart', startingData, layout, config);
Plotly.newPlot( 'total-guest-count-chart', startingData, layout, config);
