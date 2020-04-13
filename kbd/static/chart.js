document.getElementById("store-select").addEventListener("change",selectStore);

function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = store + " selected";

  let salesAPI="http://127.0.0.1:5000/sales2018/" + store

  async function getData() {
    const response = await fetch(salesAPI);
    const data = await response.json();

    const tmpArray = [];

    data.forEach( obj => {
      tmpArray.push(obj.sales);
    });
    console.log(tmpArray);
    return tmpArray;

  }

  let y2018;
  getData().then( tmpArray => y2018 = tmpArray ).catch( e => console.error(e));
  console.log(y2018);

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
      ['2018', 2,3,4,5,6]
    ]
  }
});
