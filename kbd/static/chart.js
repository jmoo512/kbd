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

  let chartSales = data.tmpSales
  console.log(chartSales)
  console.log(typeof chartSales)
  let maxSales = Math.max(chartSales)
  console.log(maxSales)
  //console.log(chartSales)

  let chartGC = data.tmpGC
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

  totalSalesChart.load({
        columns: [
          ['data3', 4,7,3,9,1],
          ['2019', 8,3,5,0,1]
        ]
    });

  totalGCChart.load({
        columns: [
          ['data4', 2,8,9,5,3],
          ['2019', 8,3,5,0,1]
        ]
    });
}
const salesChart = c3.generate({
  bindto: '#sales-chart',
  data: {
    columns: []
  },
  title: {
    text: "Weekly Sales"
  }
});

const gcChart = c3.generate({
  bindto: '#guest-count-chart',
  data: {
    columns: []
  },
  title: {
    text: "Weekly Guest Count"
  }
});

const totalSalesChart = c3.generate({
  bindto: '#total-sales-chart',
  data: {
    columns: []
  },
  title: {
    text: "Total Weekly Sales"
  }
});

const totalGCChart = c3.generate({
  bindto: '#total-guest-count-chart',
  data: {
    columns: []
  },
  title: {
    text: "Total Weekly Guest Count"
  }
});
