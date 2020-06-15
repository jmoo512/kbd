//use selector to modify api address per store selected
function selectStore() {
  let baseAPI = "http://127.0.0.1:5000"
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let inspAPI="/insp/" + store
  let gfAPI="/gf/" + store

  return {inspAPI, gfAPI}
}



//grab inspection data from api
async function getInspData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpInspWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });


  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === currWeek){
      tmpWeekScores.push(obj.score)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekInspAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekInspAvg = tmpWeekInspAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthInspAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthInspAvg = tmpMonthInspAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterInspAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterInspAvg = tmpQuarterInspAvg.toFixed(2);


  //find weekly averages
  let uniqueWeeks = _.uniq(tmpWeekOfYear, true)

  let tmpWeekAvgScores = [];

  uniqueWeeks.forEach(week => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempScores.push(obj.score);
        }
      })

      let sum4 = _.sum(tempScores)

      let tempWeekInspAvg = (sum4 / tempScores.length) || 0;
      let tempWeekInspAvgRound = tempWeekInspAvg.toFixed(2)
      tmpWeekAvgScores.push(tempWeekInspAvgRound)
  })


  return {weekInspAvg, monthInspAvg, quarterInspAvg, uniqueWeeks, tmpWeekAvgScores};
}

//grab gf data from api
async function getGFData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonthOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpGFWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonthOfYear.push(obj.fiscal_month);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });


  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthGFAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthGFAvg = tmpMonthGFAvg.toFixed(0);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterGFAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterGFAvg = tmpQuarterGFAvg.toFixed(0);


  //find monthly averages
  let uniqueMonths = _.uniq(tmpMonthOfYear, true)

  let tmpMonthAvgScores = [];

  uniqueMonths.forEach(month => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.fiscal_month === month) {
        tempScores.push(obj.score);
        }
      })

      let sum4 = _.sum(tempScores)

      let tempMonthGFAvg = (sum4 / tempScores.length) || 0;
      let tempMonthGFAvgRound = tempMonthGFAvg.toFixed(2)
      tmpMonthAvgScores.push(tempMonthGFAvgRound)
  })

  return {monthGFAvg, quarterGFAvg, uniqueMonths, tmpMonthAvgScores};
}

//grap insp data for concept from api
async function getInspConceptData(concept) {
  const response = await fetch('/insp_concept/' + concept);
  const data = await response.json();

  let tmpScores = [];
  let tmpWeekOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpInspWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });

  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === currWeek){
      tmpWeekScores.push(obj.score)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekInspAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekInspAvg = tmpWeekInspAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthInspAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthInspAvg = tmpMonthInspAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterInspAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterInspAvg = tmpQuarterInspAvg.toFixed(2);


  return {weekInspAvg, monthInspAvg, quarterInspAvg};

}

//grap gf data for concept from api
async function getGFConceptData(concept) {
  const response = await fetch('/gf_concept/' + concept);
  const data = await response.json();

  let tmpScores = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
  });

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthGFAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthGFAvg = tmpMonthGFAvg.toFixed(0);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterGFAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterGFAvg = tmpQuarterGFAvg.toFixed(0);


  return {monthGFAvg, quarterGFAvg};

}

export {selectStore, getInspData, getGFData, getInspConceptData, getGFConceptData}
