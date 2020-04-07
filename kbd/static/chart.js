let salesAPI="http://127.0.0.1:5000/sales2018"


async function getData() {
  const response = await fetch(salesAPI);
  const data = await response.json();

  const tmpArray = []

  data.forEach( obj => {
    if(obj.location === '183') {
      tmpArray.push(obj)
    }
  })
  console.log(tmpArray)
  return tmpArray

}


let y2018
getData().then( result => y2018 = result ).catch( e => console.error(e))
console.log(y2018)

const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['2018', 50, 20, 10, 40, 15, 2],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});
