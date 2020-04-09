let salesAPI="http://127.0.0.1:5000/sales2018/" + "183"

let y2018Sales = []

getData()
async function getData() {
  const response = await fetch(salesAPI);
  const data = await response.json();

  const tmpArray = []

  data.forEach( obj => {
    //if(obj.location === '183') {
      y2018Sales.push(obj.sales)
    //}
  });
  //return tmpArray
}

let y2018
//getData().then( result => y2018 = result ).catch( e => console.error(e))
console.log(y2018Sales)

const chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: [
      ['2018', y2018Sales]
    ]
  }
});
