document.getElementById("store-select").addEventListener("change",updateCharts);

async function getData(api) {
  //console.log(api);
  const response = await fetch(api);
  const data = await response.json();

  let tmpSales = [];
  let tmpGC = [];
  let tmpWeeks = [];

  data.forEach( obj => {
    tmpSales.push(obj.sales);
    tmpGC.push(obj.total_guest_count);
    tmpWeeks.push(obj.week_of_year);
  });

  return {tmpSales,tmpGC,tmpWeeks};
}

function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";
  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  return salesAPI
}

async function updateCharts () {
  const getAPI = await selectStore();
  const data = await getData(getAPI);


  let chartSales = data.tmpSales;
  let chartGC = data.tmpGC;
  let weeks = data.tmpWeeks;

  let sales = {
    x: weeks,
    y: chartSales,
    mode: 'lines'
  };

  let updatedSales = [sales]

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

let layout =  {
    title: 'Always Display the Modebar',
    showlegend: false}

Plotly.newPlot( 'sales-chart', startingData, layout, {displayModeBar: true});

Plotly.newPlot( 'guest-count-chart', startingData, layout, {displayModeBar: true});
