function fancyTimeFormat(time){
    // Hours, minutes and seconds
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function createCalendar(data) {
  let tmpWeekOfYear = [];
  let tmpMonths = [];
  let tmpQuarters = [];
  let tmpDates = [];

  data.forEach(obj => {
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
    if ('week_ending' in obj) {
      tmpDates.push(obj.week_ending);
      }
    else {
      tmpDates.push(obj.date_measured)
      }
  });

  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find last updated date
  let date = Math.max.apply(null, tmpDates)
  let lastUpdated = moment.utc(date).format('MM/DD')

  //find weekly averages
  let uniqueWeeks = _.uniq(tmpWeekOfYear, true)

  return {currWeek, currMonth, currQuarter, lastUpdated, uniqueWeeks}
}


//use selector to modify api address per store selected
function selectStore() {
  let store = document.getElementById("store-select").value;
  document.getElementById("chosen-store").innerHTML = 'Location: ' + store;
  let inspAPI="/insp/" + store
  let gfAPI="/gf/" + store
  let tacoAPI="/taco/" + store
  let bagTimesAPI="/bag_times/" + store
  let tglAPI="/tgl/" + store
  let accAPI="acc/" + store

  return {inspAPI, gfAPI, tacoAPI, bagTimesAPI, tglAPI, accAPI}
}

//grab inspection data from api
async function getInspData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpScores = [];
  let tmpInspWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)

  let lastUpdated = calendar.lastUpdated

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekScores.push(obj.score)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekInspAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekInspAvg = tmpWeekInspAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthInspAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthInspAvg = tmpMonthInspAvg.toFixed(2);


  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == calendar.currQuarter){
      tmpQuarterScores.push(obj.score)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterInspAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterInspAvg = tmpQuarterInspAvg.toFixed(2);

  let tmpWeekAvgScores = [];

  let uniqueWeeks = calendar.uniqueWeeks.forEach(week => {
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


  return {weekInspAvg, monthInspAvg, quarterInspAvg, uniqueWeeks, tmpWeekAvgScores, lastUpdated};
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
  let tmpDates = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpWeekOfYear.push(obj.week_of_year);
    tmpMonthOfYear.push(obj.fiscal_month);
    tmpMonths.push(obj.fiscal_month);
    tmpQuarters.push(obj.quarter);
    tmpDates.push(obj.date_measured);
  });

  //find current week from array of weeks in dataset
  let currWeek = Math.max.apply(null, tmpWeekOfYear)

  //find current month from array of weeks in dataset
  let currMonth = Math.max.apply(null, tmpMonths)

  //find current quarter from array of weeks in dataset
  let currQuarter = Math.max.apply(null, tmpQuarters)

  //find last updated date
  let date = Math.max.apply(null, tmpDates)

  let lastUpdated = moment.utc(date).format('MM/DD')

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

  return {monthGFAvg, quarterGFAvg, uniqueMonths, tmpMonthAvgScores, lastUpdated};
}

//grab taco data from api
async function getTacoData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpSeconds = [];
  let tmpTacoWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekSeconds = [];
  let tmpMonthSeconds = [];
  let tmpQuarterSeconds = [];

  data.forEach(obj => {
    tmpSeconds.push(obj.time_in_seconds);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)

  let lastUpdated = calendar.lastUpdated

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekSeconds.push(obj.time_in_seconds)
    }
  })
  let sum1 = tmpWeekSeconds.reduce((a, b) => a + b, 0);
  let tmpWeekTacoAvg = (sum1 / tmpWeekSeconds.length) || 0;
  let weekTacoAvg = tmpWeekTacoAvg.toFixed(0);


  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthSeconds.push(obj.time_in_seconds)
    }
  })


  let sum2 = tmpMonthSeconds.reduce((a,b) => a + b, 0);
  let tmpMonthTacoAvg = (sum2 / tmpMonthSeconds.length) || 0;
  let monthTacoAvg = tmpMonthTacoAvg.toFixed(0);


  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == calendar.currQuarter){
      tmpQuarterSeconds.push(obj.time_in_seconds)
    }
  })

  let sum3 = tmpQuarterSeconds.reduce((a,b) => a + b, 0);
  let tmpQuarterTacoAvg = (sum3 / tmpQuarterSeconds.length) || 0;
  let quarterTacoAvg = tmpQuarterTacoAvg.toFixed(0);

  let tmpWeekAvgSeconds = [];

  let uniqueWeeks = calendar.uniqueWeeks.forEach(week => {
    let tmpSeconds = [];
    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tmpSeconds.push(obj.time_in_seconds);
        }
      })

      let sum4 = _.sum(tmpSeconds)

      let tmpWeekTacoAvg = (sum4 / tmpSeconds.length) || 0;
      let tmpWeekTacoAvgRound = tmpWeekTacoAvg.toFixed(2)
      tmpWeekAvgSeconds.push(tmpWeekTacoAvgRound)

  })

  return {weekTacoAvg, monthTacoAvg, quarterTacoAvg, uniqueWeeks, tmpWeekAvgSeconds, lastUpdated};
}

async function getBagTimesData(api) {
  const response = await fetch(api)
  const data = await response.json()

  let tmpScores = [];
  let tmpBagTimesWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];
  let tmpDates = [];

  data.forEach(obj => {
    tmpScores.push(obj.week_avg);
    tmpWeekOfMonth.push(obj.week_of_month);
    tmpMonthScores.push(obj.month_avg);
    tmpQuarterScores.push(obj.quarter_avg);
    tmpDates.push(obj.week_ending);
  });

  const calendar = createCalendar(data)

  //find last updated date
  let date = Math.max.apply(null, tmpDates)
  let lastUpdated = moment.utc(date).format('MM/DD')


  //find current week average
  let weekBagTimesAvg = tmpScores[tmpScores.length - 1];

  //find current month average
  let monthBagTimesAvg = tmpMonthScores[tmpMonthScores.length - 1];

  //find current quarter average
  let quarterBagTimesAvg = tmpQuarterScores[tmpQuarterScores.length - 1];


  let tmpWeekAvgScores = [];

  let uniqueWeeks = calendar.uniqueWeeks.forEach(week => {
    let tempScores = [];
    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempScores.push(obj.week_avg);
          }
      })

      let sum4 = _.sum(tempScores)

      let tempWeekBagTimesAvg = (sum4 / tempScores.length) || 0;
      let tempWeekBagTimesAvgRound = tempWeekBagTimesAvg.toFixed(2)
      tmpWeekAvgScores.push(tempWeekBagTimesAvgRound)
  })

  let convertedWeekScores = tmpWeekAvgScores.map(Number)


  return {weekBagTimesAvg, monthBagTimesAvg, quarterBagTimesAvg, uniqueWeeks, tmpWeekAvgScores, lastUpdated};
}

//grab to-go label data from api
async function getTGLData(api) {
  const response = await fetch(api);
  const data = await response.json();

  let tmpNumberMeasured = [];
  let tmpNumberPassed = [];
  let tmpTGLWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpNumberMeasured.push(obj.number_measured);
    tmpNumberPassed.push(obj.number_passed);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)

  let lastUpdated = calendar.lastUpdated

  //find current week score
  let tmpWeekMeasured = [];
  let tmpWeekPassed = [];
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekMeasured.push(obj.number_measured);
      tmpWeekPassed.push(obj.number_passed);
    }
  })
  let sumWeek1 = tmpWeekMeasured.reduce((a, b) => a + b, 0);
  let sumWeek2 = tmpWeekPassed.reduce((a, b) => a + b, 0);
  let tmpWeekTGL = (sumWeek2 / sumWeek1) || 0;
  let weekTGLAvg = tmpWeekTGL.toFixed(2) * 100;

  //find current month score
  let tmpMonthMeasured = [];
  let tmpMonthPassed = [];
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthMeasured.push(obj.number_measured);
      tmpMonthPassed.push(obj.number_passed);
    }
  })
  let sumMonth1 = tmpMonthMeasured.reduce((a, b) => a + b, 0);
  let sumMonth2 = tmpMonthPassed.reduce((a, b) => a + b, 0);
  let tmpMonthTGL = (sumMonth2 / sumMonth1) || 0;
  let monthTGLAvg = tmpMonthTGL.toFixed(2) * 100;

  //find current quarter score
  let tmpQMeasured = [];
  let tmpQPassed = [];
  data.forEach(obj => {
    if (obj.quarter === calendar.currQuarter){
      tmpQMeasured.push(obj.number_measured);
      tmpQPassed.push(obj.number_passed);
    }
  })
  let sumQ1 = tmpQMeasured.reduce((a, b) => a + b, 0);
  let sumQ2 = tmpQPassed.reduce((a, b) => a + b, 0);
  let tmpQTGL = (sumQ2 / sumQ1) || 0;
  let quarterTGLAvg = tmpQTGL.toFixed(2) * 100;

  //create array of weekly scores for chart
  let tmpWeekAvgScores = [];

  let uniqueWeeks = calendar.uniqueWeeks.forEach(week => {
    let tempMeasured = [];
    let tempPassed = [];

    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempMeasured.push(obj.number_measured);
        tempPassed.push(obj.number_passed);
        }
      })

      let sumMeasured = _.sum(tempMeasured)
      let sumPassed = _.sum(tempPassed)

      let tempWeekTGL = (sumPassed / sumMeasured) || 0;
      let tempWeekTGLAvgRound = tempWeekTGL.toFixed(2) * 100
      tmpWeekAvgScores.push(tempWeekTGLAvgRound)
  })



  return {weekTGLAvg, monthTGLAvg, quarterTGLAvg, uniqueWeeks, tmpWeekAvgScores, lastUpdated};
}

//grab order accuracy data from api
async function getAccData(api){
  const response = await fetch(api);
  const data = await response.json()

  let tmpScores = [];
  let tmpAccWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpWeekGC = [];
  let tmpMonthScores = [];
  let tmpMonthGC = [];
  let tmpQuarterScores = [];
  let tmpQuarterGC = [];

  const calendar = createCalendar(data)
  let lastUpdated = calendar.lastUpdated

  //find current week accuracy rate
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekScores.push(obj.inaccurate_count);
      tmpWeekGC.push(obj.total_guest_count);
    }
  })

  let weekInaccSum = tmpWeekScores.reduce((a, b) => a + b, 0);
  let weekGCSum = tmpWeekGC.reduce((a, b) => a + b, 0);
  let weekAcc = ((weekGCSum - weekInaccSum)/weekGCSum*100).toFixed(3)

  //find current month accuracy rate
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthScores.push(obj.inaccurate_count);
      tmpMonthGC.push(obj.total_guest_count);
    }
  })


  let monthInnacSum = tmpMonthScores.reduce((a,b) => a + b, 0);
  let monthGCSum = tmpMonthGC.reduce((a,b) => a + b, 0);
  let monthAcc = ((monthGCSum - monthInnacSum)/monthGCSum*100).toFixed(3)

  //find current quarter accuracy rate
  data.forEach(obj => {
    if (obj.quarter === calendar.currQuarter){
      tmpQuarterScores.push(obj.inaccurate_count);
      tmpQuarterGC.push(obj.total_guest_count);
    }
  })

  let quarterInnacSum = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let quarterGCSum = tmpQuarterGC.reduce((a,b) => a + b, 0);
  let quarterAcc = ((quarterGCSum - quarterInnacSum)/quarterGCSum*100).toFixed(3)

  let tempWeekScores = [];

  let uniqueWeeks = calendar.uniqueWeeks.forEach(week => {
    let tempScores = [];
    let tempGC = [];

    data.forEach(obj => {

      if (obj.week_of_year === week) {
        tempScores.push(obj.inaccurate_count);
        tempGC.push(obj.total_guest_count);
        }
      })

      let tempInnacSum = _.sum(tempScores)
      let tempGCSum = _.sum(tempGC)
      let tempAcc = ((tempGCSum - tempInnacSum)/tempGCSum*100).toFixed(3)
      tempWeekScores.push(tempAcc)
  })

  return {weekAcc, monthAcc, quarterAcc, uniqueWeeks, tempWeekScores, lastUpdated}


}

//grap insp data for concept from api
async function getInspConceptData(concept) {
  const response = await fetch('/insp_concept/' + concept);
  const data = await response.json();

  let tmpScores = [];
  let tmpInspWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.score);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)


  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekScores.push(obj.score)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekInspAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekInspAvg = tmpWeekInspAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthScores.push(obj.score)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthInspAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthInspAvg = tmpMonthInspAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == calendar.currQuarter){
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

//grap taco data for concept from api
async function getTacoConceptData(concept) {
  const response = await fetch('/taco_concept/' + concept);
  const data = await response.json();

  let tmpScores = [];
  let tmpTacoWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpScores.push(obj.time_in_seconds);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)

  //find current week average
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekScores.push(obj.time_in_seconds)
    }
  })
  let sum1 = tmpWeekScores.reduce((a, b) => a + b, 0);
  let tmpWeekTacoAvg = (sum1 / tmpWeekScores.length) || 0;
  let weekTacoAvg = tmpWeekTacoAvg.toFixed(2);

  //find current month average
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthScores.push(obj.time_in_seconds)
    }
  })

  let sum2 = tmpMonthScores.reduce((a,b) => a + b, 0);
  let tmpMonthTacoAvg = (sum2 / tmpMonthScores.length) || 0;
  let monthTacoAvg = tmpMonthTacoAvg.toFixed(2);

  //find current quarter average
  data.forEach(obj => {
    if (obj.quarter == calendar.currQuarter){
      tmpQuarterScores.push(obj.time_in_seconds)
    }
  })

  let sum3 = tmpQuarterScores.reduce((a,b) => a + b, 0);
  let tmpQuarterTacoAvg = (sum3 / tmpQuarterScores.length) || 0;
  let quarterTacoAvg = tmpQuarterTacoAvg.toFixed(2);


  return {weekTacoAvg, monthTacoAvg, quarterTacoAvg};

}

async function getBagTimesConceptData(api) {
  const response = await fetch('/bag_times/Concept')
  const data = await response.json()

  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpWeekScores.push(obj.concept_week_avg);
    tmpMonthScores.push(obj.concept_month_avg);
    tmpQuarterScores.push(obj.concept_quarter_avg);
  });


  //find current week average
  let weekBagTimesAvg = tmpWeekScores[tmpWeekScores.length - 1];

  //find current month average
  let monthBagTimesAvg = tmpMonthScores[tmpMonthScores.length - 1];

  //find current quarter average
  let quarterBagTimesAvg = tmpQuarterScores[tmpQuarterScores.length -1];


  return {weekBagTimesAvg, monthBagTimesAvg, quarterBagTimesAvg};
}

//grap insp data for concept from api
async function getTGLConceptData() {
  const response = await fetch('/tgl_concept');
  const data = await response.json();

  let tmpNumberMeasured = [];
  let tmpNumberPassed = [];
  let tmpTGLWeek = [];
  let tmpWeekOfMonth = [];
  let tmpWeekScores = [];
  let tmpMonthScores = [];
  let tmpQuarterScores = [];

  data.forEach(obj => {
    tmpNumberMeasured.push(obj.number_measured);
    tmpNumberPassed.push(obj.number_passed);
    tmpWeekOfMonth.push(obj.week_of_month);
  });

  const calendar = createCalendar(data)

  let lastUpdated = calendar.lastUpdated

  //find current week score
  let tmpWeekMeasured = [];
  let tmpWeekPassed = [];
  data.forEach(obj => {
    if (obj.week_of_year === calendar.currWeek){
      tmpWeekMeasured.push(obj.number_measured);
      tmpWeekPassed.push(obj.number_passed);
    }
  })
  let sumWeek1 = tmpWeekMeasured.reduce((a, b) => a + b, 0);
  let sumWeek2 = tmpWeekPassed.reduce((a, b) => a + b, 0);
  let tmpWeekTGL = (sumWeek2 / sumWeek1) || 0;
  let weekTGLAvg = tmpWeekTGL.toFixed(2) * 100;

  //find current month score
  let tmpMonthMeasured = [];
  let tmpMonthPassed = [];
  data.forEach(obj => {
    if (obj.fiscal_month == calendar.currMonth){
      tmpMonthMeasured.push(obj.number_measured);
      tmpMonthPassed.push(obj.number_passed);
    }
  })
  let sumMonth1 = tmpMonthMeasured.reduce((a, b) => a + b, 0);
  let sumMonth2 = tmpMonthPassed.reduce((a, b) => a + b, 0);
  let tmpMonthTGL = (sumMonth2 / sumMonth1) || 0;
  let monthTGLAvg = tmpMonthTGL.toFixed(2) * 100;

  //find current quarter score
  let tmpQMeasured = [];
  let tmpQPassed = [];
  data.forEach(obj => {
    if (obj.quarter === calendar.currQuarter){
      tmpQMeasured.push(obj.number_measured);
      tmpQPassed.push(obj.number_passed);
    }
  })
  let sumQ1 = tmpQMeasured.reduce((a, b) => a + b, 0);
  let sumQ2 = tmpQPassed.reduce((a, b) => a + b, 0);
  let tmpQTGL = (sumQ2 / sumQ1) || 0;
  let quarterTGLAvg = tmpQTGL.toFixed(2) * 100;

  return {weekTGLAvg, monthTGLAvg, quarterTGLAvg};

}

export {selectStore, getInspData, getGFData, getTacoData, getBagTimesData, getTGLData, getAccData, getInspConceptData, getGFConceptData, getTacoConceptData, getBagTimesConceptData, getTGLConceptData, fancyTimeFormat}
