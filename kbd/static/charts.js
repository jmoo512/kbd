const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Week 1','Week 2','Week 3','Week 4'],
        datasets: [{
            label: 'Cashier Efficiency',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [9.45, 9.87, 10.4, 9.99],
            fill: false
        }]
    },

    // Configuration options go here
    options: {}
});
