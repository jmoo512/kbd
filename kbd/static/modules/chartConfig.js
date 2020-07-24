//colors object
let colors = {
  "red":"#ac3e31",
  "yellow":"#dbae58",
  "blue":"#488a99",
  "green":"#47ca3e",
  "bgColor":"#dadada",
  "text":"#20283e",
  "grey":"#999999",
  "2018":"#999999",
  "2019":"#999999",
  "2020":"#333333"
  }

let ranges = {
  "insp":[3.4, 3.8],
  "gf":[60,100],
  "taco":[30,90],
  "bagTimes":[240,360],
  "tgl":[0,100],
  "rudysAcc":[99.96,100],
  "mfAcc":[99.6,100]
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
      //fixedrange: true
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
      range: ranges["insp"],
      //fixedrange: true
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

let tacoLayout =  {
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
      dtick: 30,
      ticks: '',
      showticklabels: true,
      range: ranges["taco"]
    },
    legend: {
    }
  }

let bagTimesLayout =  {
    autosize: true,
    paper_bgcolor: '#FFFFFF',
    plot_bgcolor: '#FFFFFF',
    //width: 300,
    height: 100,
    hovermode: false,
    margin: {
      l: 32,
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
      dtick: 60,
      ticks: '',
      showticklabels: true,
      range: ranges["bagTimes"]
    },
    legend: {
    }
  }

  let tglLayout =  {
      autosize: true,
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      //width: 300,
      height: 100,
      hovermode: false,
      margin: {
        l: 32,
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
        dtick: 50,
        ticks: '',
        showticklabels: true,
        range: ranges["tgl"]
      },
      legend: {
      }
    }

  let rudysAccLayout =  {
      autosize: true,
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      //width: 300,
      height: 100,
      hovermode: false,
      margin: {
        l: 42,
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
        dtick: 0.02,
        ticks: '',
        showticklabels: true,
        range: ranges["rudysAcc"]
      },
      legend: {
      }
    }
    let mfAccLayout =  {
        autosize: true,
        paper_bgcolor: '#FFFFFF',
        plot_bgcolor: '#FFFFFF',
        //width: 300,
        height: 100,
        hovermode: false,
        margin: {
          l: 36,
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
          range: ranges["mfAcc"]
        },
        legend: {
        }
      }

let config = {responsive: true,
              displayModeBar: false
            }

let staticConfig = {responsive: true,
                    displayModeBar: false,
                    staticPlot: true
            }

export {colors, ranges, inspLayout, gfLayout, tacoLayout, bagTimesLayout, tglLayout, rudysAccLayout, mfAccLayout, config, staticConfig}
