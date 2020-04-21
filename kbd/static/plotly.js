//Add event listener to selector to call update functionality

document.getElementById("store-select").addEventListener("change",updateCharts);

//grab data from api
async function getData(api) {
  //console.log(api);
  const response = await fetch(api);
  const data = await response.json();

  let tmpSales18 = [];
  let tmpSales19 = [];
  let tmpSales20 = [];
  let tmpGC = [];
  let tmpWeeks = [];

  data.forEach( obj => {
    if (obj.fiscal_year === 2018){
      tmpSales18.push(obj.sales);
    }
    if (obj.fiscal_year === 2019){
      tmpSales19.push(obj.sales);
    }
    if (obj.fiscal_year === 2020){
      tmpSales20.push(obj.sales);
    }

    if (obj.fiscal_year === 2018){
      tmpGC.push(obj.total_guest_count);
    }
    tmpWeeks.push(obj.week_of_year);

  });

  return {tmpSales18, tmpSales19, tmpSales20 ,tmpGC, tmpWeeks};
}

//use selector to modify api address per store selected
function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";
  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  return salesAPI
}

//update charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const data = await getData(getAPI);

  let chartSales18 = data.tmpSales18;
  let chartSales19 = data.tmpSales19;
  let chartSales20 = data.tmpSales20;
  let chartGC = data.tmpGC;
  let weeks = data.tmpWeeks;

  let sales18 = {
    x: weeks,
    y: chartSales18,
    mode: 'lines',
    name: '2018'
  };

  let sales19 = {
    x: weeks,
    y: chartSales19,
    mode: 'lines',
    name: '2019'
  };

  let sales20 = {
    x: weeks,
    y: chartSales20,
    mode: 'lines',
    name: '2020'
  };

  let updatedSales = [sales18, sales19, sales20]

  let gc = {
    x: weeks,
    y: chartGC,
    mode: 'lines'
  }
  let updatedGC = [gc]

  Plotly.react('sales-chart', updatedSales)
  Plotly.react('guest-count-chart', updatedGC)
  console.log(data)

  }

let startingData = []
let layout =  {}

//instantiate empty charts to DOM
Plotly.newPlot( 'sales-chart', startingData, layout, {displayModeBar: true});

Plotly.newPlot( 'guest-count-chart', startingData, layout, {displayModeBar: true});
