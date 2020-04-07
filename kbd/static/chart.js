let salesAPI="http://127.0.0.1:5000/sales2018"

getData()

async function getData() {
  const response = await fetch(salesAPI);
  const data = await response.json();
  console.log(data)

  const y2018 = []

  data.forEach( obj => {
    if(obj.location === '183') {
      y2018.push(obj)
    }
  })
  console.log(y2018)
  return y2018
}



const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['2018', y2018],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});
