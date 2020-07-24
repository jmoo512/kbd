//import modules
import {fancyTimeFormat, selectStore, getInspData, getGFData, getAccData, getBagTimesData, getTacoConceptData, getInspConceptData, getGFConceptData, getBagTimesConceptData, getAccConceptData} from './modules/kbds.js'
import {colors, ranges, inspLayout, gfLayout, bagTimesLayout, mfAccLayout, config, staticConfig} from './modules/chartConfig.js'

//Add event listener to selector to call update functions

document.getElementById("store-select").addEventListener("change",updateCharts);


//update store level charts based on selected store
async function updateCharts () {
  const getAPI = await selectStore();
  const inspData = await getInspData(getAPI.inspAPI);
  const gfData = await getGFData(getAPI.gfAPI);
  const bagTimesData = await getBagTimesData(getAPI.bagTimesAPI);
  const accData = await getAccData(getAPI.accAPI);


  let inspWeeks = inspData.uniqueWeeks;
  let gfMonths = gfData.uniqueMonths;
  let bagTimesWeeks = bagTimesData.uniqueWeeks;
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

  let bagTimesScores = bagTimesData.tmpWeekAvgScores;
  let bagTimesAvgWeek = fancyTimeFormat(bagTimesData.weekBagTimesAvg);
  let bagTimesAvgMonth = fancyTimeFormat(bagTimesData.monthBagTimesAvg);
  let bagTimesAvgQuarter = fancyTimeFormat(bagTimesData.quarterBagTimesAvg);
  let bagTimesLastUpdated = bagTimesData.lastUpdated;

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
      color: colors['spline'],
      width: 2,
      shape: 'spline'
    },
  }

  let gfChartData = {
    x: gfMonths,
    y: gfScores,
    mode: 'lines',
    line: {
      color: colors['spline'],
      width: 2,
      shape: 'spline'
    },
  }

  let bagTimesChartData = {
    x: bagTimesWeeks,
    y: bagTimesScores,
    mode: 'lines',
    line: {
      color: colors['spline'],
      width: 2,
      shape: 'spline'
    },
  }

  let accChartData = {
    x: accWeeks,
    y: accScores,
    mode: 'lines',
    line: {
      color: colors['spline'],
      width: 2,
      shape: 'spline'
    },
  }

  let inspSpark = [inspChartData]
  let gfSpark = [gfChartData]
  let bagTimesSpark = [bagTimesChartData]
  let accSpark = [accChartData]


  Plotly.react('insp-chart', inspSpark, inspLayout, staticConfig);
  Plotly.react('gf-chart', gfSpark, gfLayout, staticConfig);
  Plotly.react('bag-times-chart', bagTimesSpark, bagTimesLayout, staticConfig);
  Plotly.react('acc-chart', accSpark, mfAccLayout, staticConfig);

  document.getElementById("insp-week-big").innerHTML = inspAvgWeek + ' Wk';
  document.getElementById("insp-month").innerHTML = inspAvgMonth + ' Mo';
  document.getElementById("insp-q").innerHTML = inspAvgQuarter + ' Q';
  document.getElementById("insp-title").innerHTML = "&nbsp as of " + inspLastUpdated;


  document.getElementById("gf-month").innerHTML = gfAvgMonth + ' Mo';
  document.getElementById("gf-q").innerHTML = gfAvgQuarter + ' Q';
  document.getElementById("gf-title").innerHTML = "&nbsp as of " + gfLastUpdated;

  document.getElementById("bag-times-week-big").innerHTML = bagTimesAvgWeek + ' Wk';
  document.getElementById("bag-times-month").innerHTML = bagTimesAvgMonth + ' Mo';
  document.getElementById("bag-times-q").innerHTML = bagTimesAvgQuarter + ' Q';
  document.getElementById("bag-times-title").innerHTML = "&nbsp as of " + bagTimesLastUpdated;

  document.getElementById("acc-week-big").innerHTML = accWeek + '% Wk';
  document.getElementById("acc-month").innerHTML = accMonth + '% Mo';
  document.getElementById("acc-q").innerHTML = accQuarter + '% Q';
  document.getElementById("acc-title").innerHTML = "&nbsp as of " + accLastUpdated;

}

async function populateBaseCharts () {
  let concept = 'Mighty Fine'
  const inspConceptData = await getInspConceptData(concept);
  const gfConceptData = await getGFConceptData(concept);
  const bagTimesConceptData = await getBagTimesConceptData(concept);
  const accConceptData = await getAccConceptData(concept);

  let inspConceptAvgWeek = inspConceptData.weekInspAvg;
  let inspConceptAvgMonth = inspConceptData.monthInspAvg;
  let inspConceptAvgQuarter = inspConceptData.quarterInspAvg;

  let gfConceptAvgMonth = gfConceptData.monthGFAvg;
  let gfConceptAvgQuarter = gfConceptData.quarterGFAvg;

  let bagTimesConceptAvgWeek = fancyTimeFormat(bagTimesConceptData.weekBagTimesAvg);
  let bagTimesConceptAvgMonth = fancyTimeFormat(bagTimesConceptData.monthBagTimesAvg);
  let bagTimesConceptAvgQuarter = fancyTimeFormat(bagTimesConceptData.quarterBagTimesAvg);

  let accConceptWeek = accConceptData.weekAccAvg;
  let accConceptMonth = accConceptData.monthAccAvg;
  let accConceptQuarter = accConceptData.quarterAccAvg;

  document.getElementById("insp-concept-big").innerHTML = inspConceptAvgWeek + ' Wk';
  document.getElementById("insp-concept-month").innerHTML = inspConceptAvgMonth + ' Mo';
  document.getElementById("insp-concept-q").innerHTML = inspConceptAvgQuarter + ' Q';


  document.getElementById("gf-concept-month").innerHTML = gfConceptAvgMonth + ' Mo';
  document.getElementById("gf-concept-q").innerHTML = gfConceptAvgQuarter + ' Q';

  document.getElementById("bag-times-concept-big").innerHTML = bagTimesConceptAvgWeek + ' Wk';
  document.getElementById("bag-times-concept-month").innerHTML = bagTimesConceptAvgMonth + ' Mo';
  document.getElementById("bag-times-concept-q").innerHTML = bagTimesConceptAvgQuarter + ' Q';

  document.getElementById("acc-concept-big").innerHTML = accConceptWeek + '% Wk';
  document.getElementById("acc-concept-month").innerHTML = accConceptMonth + '% M';
  document.getElementById("acc-concept-q").innerHTML = accConceptQuarter + '% Q';
}


//array for empty data for store level charts
let startingData = []

//instantiate empty charts to DOM
Plotly.newPlot( 'insp-chart', startingData, inspLayout, staticConfig);
Plotly.newPlot( 'gf-chart', startingData, gfLayout, staticConfig);
Plotly.newPlot( 'bag-times-chart', startingData, bagTimesLayout, staticConfig);
//Plotly.newPlot( 'cu-times-chart', startingData, sparkLayout, config);
//Plotly.newPlot( 'olo-times-chart', startingData, sparkLayout, config);
Plotly.newPlot( 'acc-chart', startingData, mfAccLayout, config);
//Plotly.newPlot( 'labor-chart', startingData, sparkLayout, config);


populateBaseCharts();
