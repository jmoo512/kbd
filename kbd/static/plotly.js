document.getElementById("store-select").addEventListener("change",updateCharts);

async function getData(api) {
  //console.log(api);
  const response = await fetch(api);
  const data = await response.json();

  let tmpSales = [];
  let tmpGC = [];

  data.forEach( obj => {
    tmpSales.push(obj.sales);
    tmpGC.push(obj.total_guest_count);
  });
  //console.log(tmpSales);
  //console.log(tmpGC);
  return {tmpSales,tmpGC};
}

function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";
  let salesAPI="http://127.0.0.1:5000/sales2018/" + store
  //console.log(salesAPI)

  return salesAPI
}

async function updateCharts () {
  const getAPI = await selectStore();
  const data = await getData(getAPI);

  let tempChartSales = data.tmpSales
  let chartSales = ['2018']
  tempChartSales.forEach( obj => {(chartSales.push(obj))})
  //console.log(chartSales)
  //console.log(typeof chartSales)
  //let maxSales = Math.max(chartSales)
  //console.log(maxSales)
  //console.log(chartSales)

  let tempChartGC = data.tmpGC
  let chartGC = ['2018']
  tempChartGC.forEach( obj => {(chartGC.push(obj))})
  //console.log(chartGC)

  await salesChart.unload();
  await salesChart.axis.range({max: 300000, min: 0});
  await gcChart.unload();

  salesChart.load({
        columns: [
          chartSales
        ]
    });

  gcChart.load({
        columns: [
          chartGC
        ]
    });
  }

let trace2 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  mode: 'lines'
};

let data = [trace2]

Plotly.newPlot( 'sales-chart', data);

Plotly.newPlot( 'guest-count-chart', [{
  x: [1,6,3,8,7],
  y: [3,4,8,5,6]
}],{
  margin: {t: 0}
})
