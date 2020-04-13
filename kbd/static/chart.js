document.getElementById("store-select").addEventListener("change",selectStore);

function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";

  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  async function getData() {
    const response = await fetch(salesAPI);
    const data = await response.json();

    let tmpSales = [];
    data.forEach( obj => {
      tmpSales.push(obj.sales);
    });
    console.log(tmpSales);
    return tmpSales;

  }

  let ySales

  getData().then( sales => ySales = sales ).catch( e => console.error(e));
  console.log(ySales)

  chart.flush()
  chart.load({
        columns: [
          ['data1', 4,5,6,7,8],
          ['2018', 5,6,7,8,9]
        ]
    });


}



const chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: [

    ]
  }
});
