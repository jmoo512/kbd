window.addEventListener('load',setup);

async function setup(){
  const ctx = document.getElementById('myChart').getContext('2d');
  const totalSales = await getData();
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: totalSales.store,
      datasets: [
        {
          label: 'Store Sales',
          data: totalSales.sales,
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        }
    }
  });
}

async function getData() {
  const response = await fetch('static/sales.csv');
  const data = await response.text();
  const store = [];
  const sales = [];
  const rows = data.split('\n').slice(1,-1);
  rows.forEach(row=> {
    const cols = row.split(',');
    console.log(cols);
    store.push(cols[0]);
    sales.push(parseFloat(cols[1]));
  });
  return {store, sales};
}
