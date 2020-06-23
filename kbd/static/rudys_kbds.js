//import modules
import {fancyTimeFormat, selectStore, getInspData, getGFData, getTacoData, getInspConceptData, getGFConceptData, getTacoConceptData} from './modules/kbds.js'
import {colors, ranges, inspLayout, gfLayout, tacoLayout, config, staticConfig} from './modules/chartConfig.js'

//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);



//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const inspData = await getInspData(getAPI.inspAPI);
  const gfData = await getGFData(getAPI.gfAPI);
  const tacoData = await getTacoData(getAPI.tacoAPI);


  let inspWeeks = inspData.uniqueWeeks;
  let gfMonths = gfData.uniqueMonths;
  let tacoWeeks = tacoData.uniqueWeeks;

  let inspScores = inspData.tmpWeekAvgScores;
  let inspAvgWeek = inspData.weekInspAvg;
  let inspAvgMonth = inspData.monthInspAvg;
  let inspAvgQuarter = inspData.quarterInspAvg;

  let gfScores = gfData.tmpMonthAvgScores;
  let gfAvgMonth = gfData.monthGFAvg;
  let gfAvgQuarter = gfData.quarterGFAvg;

  let tacoSeconds = tacoData.tmpWeekAvgSeconds;
  let tacoAvgWeek = fancyTimeFormat(tacoData.weekTacoAvg);
  let tacoAvgMonth = fancyTimeFormat(tacoData.monthTacoAvg);
  let tacoAvgQuarter = fancyTimeFormat(tacoData.quarterTacoAvg);


  let inspChartData = {
    x: inspWeeks,
    y: inspScores,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
      shape: 'spline'
    },
  }

  let gfChartData = {
    x: gfMonths,
    y: gfScores,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
      shape: 'spline'
    },
  }

  let tacoChartData = {
    x: tacoWeeks,
    y: tacoSeconds,
    mode: 'lines',
    line: {
      color: colors['yellow'],
      width: 2,
      shape: 'spline'
    },
  }

  let inspSpark = [inspChartData]
  let gfSpark = [gfChartData]
  let tacoSpark = [tacoChartData]


  Plotly.react('insp-chart', inspSpark, inspLayout, staticConfig);
  Plotly.react('gf-chart', gfSpark, gfLayout, staticConfig);
  Plotly.react('taco-times-chart', tacoSpark, tacoLayout, staticConfig);

  document.getElementById("insp-week-big").innerHTML = inspAvgWeek + ' Wk';
  document.getElementById("insp-month").innerHTML = inspAvgMonth + ' Mo';
  document.getElementById("insp-q").innerHTML = inspAvgQuarter + ' Q';


  document.getElementById("gf-month").innerHTML = gfAvgMonth + ' Mo';
  document.getElementById("gf-q").innerHTML = gfAvgQuarter + ' Q';

  document.getElementById("taco-times-week-big").innerHTML = tacoAvgWeek + ' Wk';
  document.getElementById("taco-times-month").innerHTML = tacoAvgMonth + ' Mo';
  document.getElementById("taco-times-q").innerHTML = tacoAvgQuarter + ' Q';
}



async function populateBaseCharts () {
  let concept = 'Rudys'
  const inspConceptData = await getInspConceptData(concept);
  const gfConceptData = await getGFConceptData(concept);
  const tacoConceptData = await getTacoConceptData(concept);

  let inspConceptAvgWeek = inspConceptData.weekInspAvg;
  let inspConceptAvgMonth = inspConceptData.monthInspAvg;
  let inspConceptAvgQuarter = inspConceptData.quarterInspAvg;

  let gfConceptAvgMonth = gfConceptData.monthGFAvg;
  let gfConceptAvgQuarter = gfConceptData.quarterGFAvg;

  let tacoConceptAvgWeek = fancyTimeFormat(tacoConceptData.weekTacoAvg);
  let tacoConceptAvgMonth = fancyTimeFormat(tacoConceptData.monthTacoAvg);
  let tacoConceptAvgQuarter = fancyTimeFormat(tacoConceptData.quarterTacoAvg);




  document.getElementById("insp-concept-big").innerHTML = inspConceptAvgWeek + ' Wk';
  document.getElementById("insp-concept-month").innerHTML = inspConceptAvgMonth + ' Mo';
  document.getElementById("insp-concept-q").innerHTML = inspConceptAvgQuarter + ' Q';


  document.getElementById("gf-concept-month").innerHTML = gfConceptAvgMonth + ' Mo';
  document.getElementById("gf-concept-q").innerHTML = gfConceptAvgQuarter + ' Q';

  document.getElementById("taco-times-concept-big").innerHTML = tacoConceptAvgWeek + ' Wk';
  document.getElementById("taco-times-concept-month").innerHTML = tacoConceptAvgMonth + ' Mo';
  document.getElementById("taco-times-concept-q").innerHTML = tacoConceptAvgQuarter + ' Q';
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'insp-chart', startingData, inspLayout, staticConfig);
Plotly.newPlot( 'gf-chart', startingData, gfLayout, staticConfig);
Plotly.newPlot( 'taco-times-chart', startingData, tacoLayout, staticConfig);
//Plotly.newPlot( 'olo-times-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'acc-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'labor-chart', startingData, sparkLayout, config);



populateBaseCharts();
