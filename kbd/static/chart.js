let salesAPI="http://127.0.0.1:5000/salesdf"

function setup() {
  fetch(salesAPI)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));



}


setup()




var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: 'lines'
};

var trace2 = {
  x: [1, 2, 3, 4],
  y: [16, 5, 11, 30],
  type: 'lines'

};

var data = [trace1, trace2];

Plotly.newPlot('myDiv', data);
