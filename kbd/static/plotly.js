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

  let trace = {
    x: [5, 3, 4, 5],
    y: [1, 5, 1, 9],
    mode: 'lines'
  };

  let data2 = [trace]

  Plotly.react('sales-chart', data2)
  console.log(data2)

  }

let data = []

Plotly.newPlot( 'sales-chart', data);

Plotly.newPlot( 'guest-count-chart', [{
  x: [1,6,3,8,7],
  y: [3,4,8,5,6]
}],{
  margin: {t: 0}
})
