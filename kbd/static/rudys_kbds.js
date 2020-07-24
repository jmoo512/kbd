//import modules
import {fancyTimeFormat, selectStore, getInspData, getGFData, getTacoData, getTGLData, getAccData, getInspConceptData, getGFConceptData, getTacoConceptData, getTGLConceptData, getAccConceptData} from './modules/kbds.js'
import {colors, ranges, inspLayout, gfLayout, tacoLayout, tglLayout, rudysAccLayout, config, staticConfig} from './modules/chartConfig.js'

//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const inspData = await getInspData(getAPI.inspAPI);
  const gfData = await getGFData(getAPI.gfAPI);
  const tacoData = await getTacoData(getAPI.tacoAPI);
  const tglData = await getTGLData(getAPI.tglAPI);
  const accData = await getAccData(getAPI.accAPI);


  let inspWeeks = inspData.uniqueWeeks;
  let gfMonths = gfData.uniqueMonths;
  let tacoWeeks = tacoData.uniqueWeeks;
  let tglWeeks = tglData.uniqueWeeks;
  let accWeeks = accData.uniqueWeeks;

  let inspScores = inspData.tmpWeekAvgScores;
  let inspAvgWeek = inspData.weekInspAvg;
  let inspAvgMonth = inspData.monthInspAvg;
  let inspAvgQuarter = inspData.quarterInspAvg;
  let inspLastUpdated = inspData.lastUpdated;

  let gfScores = gfData.tmpMonthAvgScores;
  let gfAvgMonth = gfData.monthGFAvg;
  let gfAvgQuarter = gfData.quarterGFAvg;
  let gfLastUpdated = gfData.lastUpdated;

  let tacoSeconds = tacoData.tmpWeekAvgSeconds;
  let tacoAvgWeek = fancyTimeFormat(tacoData.weekTacoAvg);
  let tacoAvgMonth = fancyTimeFormat(tacoData.monthTacoAvg);
  let tacoAvgQuarter = fancyTimeFormat(tacoData.quarterTacoAvg);
  let tacoLastUpdated = tacoData.lastUpdated;

 let tglScores = tglData.tmpWeekAvgScores;
 let tglAvgWeek = tglData.weekTGLAvg;
 let tglAvgMonth = tglData.monthTGLAvg;
 let tglAvgQuarter = tglData.quarterTGLAvg;
 let tglLastUpdated = tglData.lastUpdated;

 let accScores = accData.tempWeekScores;
 let accWeek = accData.weekAcc;
 let accMonth = accData.monthAcc;
 let accQuarter = accData.quarterAcc;
 let accLastUpdated = accData.lastUpdated;

let inspChartData = {
    x: inspWeeks,
    y: inspScores,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
      shape: 'spline'
    },
  }

  let gfChartData = {
    x: gfMonths,
    y: gfScores,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
      shape: 'spline'
    },
  }

  let tacoChartData = {
    x: tacoWeeks,
    y: tacoSeconds,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
      shape: 'spline'
    },
  }

  let tglChartData = {
    x: tglWeeks,
    y: tglScores,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
      shape: 'spline'
    },
  }

  let accChartData = {
    x: accWeeks,
    y: accScores,
    mode: 'lines',
    line: {
      color: colors['2020'],
      width: 2,
      shape: 'spline'
    },
  }

  let inspSpark = [inspChartData]
  let gfSpark = [gfChartData]
  let tacoSpark = [tacoChartData]
  let tglSpark = [tglChartData]
  let accSpark = [accChartData]


  Plotly.react('insp-chart', inspSpark, inspLayout, staticConfig);
  Plotly.react('gf-chart', gfSpark, gfLayout, staticConfig);
  Plotly.react('taco-times-chart', tacoSpark, tacoLayout, staticConfig);
  Plotly.react('tgl-chart', tglSpark, tglLayout, staticConfig);
  Plotly.react('acc-chart', accSpark, rudysAccLayout, staticConfig);

  document.getElementById("insp-week-big").innerHTML = inspAvgWeek + ' Wk';
  document.getElementById("insp-month").innerHTML = inspAvgMonth + ' Mo';
  document.getElementById("insp-q").innerHTML = inspAvgQuarter + ' Q';
  document.getElementById("insp-title").innerHTML = "&nbsp as of " + inspLastUpdated;


  document.getElementById("gf-month").innerHTML = gfAvgMonth + ' Mo';
  document.getElementById("gf-q").innerHTML = gfAvgQuarter + ' Q';
  document.getElementById("gf-title").innerHTML = "&nbsp as of " + gfLastUpdated;

  document.getElementById("taco-times-week-big").innerHTML = tacoAvgWeek + ' Wk';
  document.getElementById("taco-times-month").innerHTML = tacoAvgMonth + ' Mo';
  document.getElementById("taco-times-q").innerHTML = tacoAvgQuarter + ' Q';
  document.getElementById("taco-title").innerHTML = "&nbsp as of " + tacoLastUpdated;

  document.getElementById("tgl-week-big").innerHTML = tglAvgWeek + '% Wk';
  document.getElementById("tgl-month").innerHTML = tglAvgMonth + '% Mo';
  document.getElementById("tgl-q").innerHTML = tglAvgQuarter + '% Q';
  document.getElementById("tgl-title").innerHTML = "&nbsp as of " + tglLastUpdated;

  document.getElementById("acc-week-big").innerHTML = accWeek + '% Wk';
  document.getElementById("acc-month").innerHTML = accMonth + '% Mo';
  document.getElementById("acc-q").innerHTML = accQuarter + '% Q';
  document.getElementById("acc-title").innerHTML = "&nbsp as of " + accLastUpdated;

}



async function populateBaseCharts () {
  let concept = 'Rudys'
  const inspConceptData = await getInspConceptData(concept);
  const gfConceptData = await getGFConceptData(concept);
  const tacoConceptData = await getTacoConceptData(concept);
  const tglConceptData = await getTGLConceptData();
  const accConceptData = await getAccConceptData(concept);

  let inspConceptAvgWeek = inspConceptData.weekInspAvg;
  let inspConceptAvgMonth = inspConceptData.monthInspAvg;
  let inspConceptAvgQuarter = inspConceptData.quarterInspAvg;

  let gfConceptAvgMonth = gfConceptData.monthGFAvg;
  let gfConceptAvgQuarter = gfConceptData.quarterGFAvg;

  let tacoConceptAvgWeek = fancyTimeFormat(tacoConceptData.weekTacoAvg);
  let tacoConceptAvgMonth = fancyTimeFormat(tacoConceptData.monthTacoAvg);
  let tacoConceptAvgQuarter = fancyTimeFormat(tacoConceptData.quarterTacoAvg);

  let tglConceptAvgWeek = tglConceptData.weekTGLAvg;
  let tglConceptAvgMonth = tglConceptData.monthTGLAvg;
  let tglConceptAvgQuarter = tglConceptData.quarterTGLAvg;

  let accConceptWeek = accConceptData.weekAccAvg;
  let accConceptMonth = accConceptData.monthAccAvg;
  let accConceptQuarter = accConceptData.quarterAccAvg;

  document.getElementById("insp-concept-big").innerHTML = inspConceptAvgWeek + ' Wk';
  document.getElementById("insp-concept-month").innerHTML = inspConceptAvgMonth + ' Mo';
  document.getElementById("insp-concept-q").innerHTML = inspConceptAvgQuarter + ' Q';

  document.getElementById("gf-concept-month").innerHTML = gfConceptAvgMonth + ' Mo';
  document.getElementById("gf-concept-q").innerHTML = gfConceptAvgQuarter + ' Q';

  document.getElementById("taco-times-concept-big").innerHTML = tacoConceptAvgWeek + ' Wk';
  document.getElementById("taco-times-concept-month").innerHTML = tacoConceptAvgMonth + ' Mo';
  document.getElementById("taco-times-concept-q").innerHTML = tacoConceptAvgQuarter + ' Q';

  document.getElementById("tgl-concept-big").innerHTML = tglConceptAvgWeek + '% Wk';
  document.getElementById("tgl-concept-month").innerHTML = tglConceptAvgMonth + '% Mo';
  document.getElementById("tgl-concept-q").innerHTML = tglConceptAvgQuarter + '% Q';

  document.getElementById("acc-concept-big").innerHTML = accConceptWeek + '% Wk';
  document.getElementById("acc-concept-month").innerHTML = accConceptMonth + '% M';
  document.getElementById("acc-concept-q").innerHTML = accConceptQuarter + '% Q';
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot('insp-chart', startingData, inspLayout, staticConfig);
Plotly.newPlot('gf-chart', startingData, gfLayout, staticConfig);
Plotly.newPlot('taco-times-chart', startingData, tacoLayout, staticConfig);
Plotly.newPlot('tgl-chart', startingData, tglLayout, staticConfig);
//Plotly.newPlot( 'olo-times-chart', startingData, sparkLayout, config);
Plotly.newPlot( 'acc-chart', startingData, rudysAccLayout, config);
//Plotly.newPlot( 'labor-chart', startingData, sparkLayout, config);



populateBaseCharts();
