document.getElementById("store-select").addEventListener("change",selectStore);

function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";

  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  async function getData() {
    const response = await fetch(salesAPI);
    const data = await response.json();

    let tmpSales = [];
    let tmpGC = [];
    data.forEach( obj => {
      tmpSales.push(obj.sales);
      tmpGC.push(obj.total_guest_count);
    });
    console.log(tmpSales);
    console.log(tmpGC);
    return {tmpSales,tmpGC};

  }

  let ySales
  let yGC

  const getSales = getData().then( ySales = getSales.tmpSales).then( yGC = getSales.tmpGC ).catch( e => console.error(e));
  console.log(ySales);
  console.log(yGC);

  salesChart.flush();
  gcChart.flush();
  salesChart.load({
        columns: [
          ['data1', 2,6,2,8,4],
          ['2019', 5,6,7,8,9]
        ]
    });

  gcChart.load({
        columns: [
          ['data2', 4,7,2,8,3],
          ['2019', 8,3,5,0,1]
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
