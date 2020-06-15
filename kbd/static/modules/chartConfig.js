//colors object
let colors = {
  "red":"#ac3e31",
  "yellow":"#dbae58",
  "blue":"#488a99",
  "bgColor":"#dadada",
  "text":"#20283e",
  "grey":"#484848"
  }

let ranges = {
  "insp":[3.4, 3.8],
  "gf":[60,100]
}

let inspLayout =  {
    autosize: true,
    paper_bgcolor: '#FFFFFF',
    plot_bgcolor: '#FFFFFF',
    //width: 300,
    height: 100,
    hovermode: false,
    margin: {
      l: 30,
      r: 10,
      b: 10,
      t: 10,
      pad: 5
    },
    xaxis: {
      //autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: '',
      showticklabels: false,

    },
    yaxis: {
      //autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      dtick: 0.2,
      ticks: '',
      showticklabels: true,
      range: ranges["insp"]
    },
    legend: {
    }
  }

  let gfLayout =  {
      autosize: true,
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      //width: 300,
      height: 100,
      hovermode: false,
      margin: {
        l: 30,
        r: 10,
        b: 10,
        t: 10,
        pad: 5
      },
      xaxis: {
        //autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false,

      },
      yaxis: {
        //autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: false,
        dtick: 20,
        ticks: '',
        showticklabels: true,
        range: ranges["gf"]
      },
      legend: {
      }
    }


  let config = {responsive: true,
                displayModeBar: false
              }

export {colors, ranges, inspLayout, gfLayout, config}
