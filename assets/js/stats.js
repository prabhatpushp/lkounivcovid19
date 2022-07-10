if (window.localStorage.getItem("state") == null) {
  openSettings();
}

let indianData = null;
let stateData = null;
let districtData = null;

function worldDailyStats(data) {
  let totalConfirmed = [];
  let dailyConfirmed = [];
  let deceased = [];
  data.forEach((row, i) => {
    totalConfirmed.push({
      x: new Date(`${row.reportDate}`),
      y: parseInt(row.totalConfirmed),
    });
    dailyConfirmed.push({
      x: new Date(`${row.reportDate}`),
      y: parseInt(row.deltaConfirmed),
    });
    deceased.push({
      x: new Date(`${row.reportDate}`),
      y: parseInt(row.deaths.total),
    });
  });

  var chart = new CanvasJS.Chart("world-stat", {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      minimum: -10,
      crosshair: {
        enabled: false,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      margin: 30,
      dockInsidePlotArea: false,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "spline",
        showInLegend: true,
        name: "Total Deaths",
        xValueFormatString: "DD MMM, YYYY",
        color: "#6c757d",
        dataPoints: deceased,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Confirmed",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: dailyConfirmed,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Total Confirmed",
        xValueFormatString: "DD MMM, YYYY",
        color: "#ff073a",
        dataPoints: totalConfirmed,
      },
    ],
  });
  chart.render();
  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

function indianDailyStats(data) {
  let totalConfirmed = [];
  let dailyConfirmed = [];
  let dailyRecovered = [];
  let dailyDeceased = [];
  let totalDeceased = [];
  let deaths = 0;
  data.forEach((row, i) => {
    deaths += parseInt(row.dailydeceased);
    totalConfirmed.push({
      x: new Date(`${row.date} 2020`),
      y: parseInt(row.totalconfirmed),
    });
    dailyConfirmed.push({
      x: new Date(`${row.date} 2020`),
      y: parseInt(row.dailyconfirmed),
    });
    dailyDeceased.push({
      x: new Date(`${row.date} 2020`),
      y: parseInt(row.dailydeceased),
    });
    totalDeceased.push({ x: new Date(`${row.date} 2020`), y: deaths });
    dailyRecovered.push({
      x: new Date(`${row.date} 2020`),
      y: parseInt(row.dailyrecovered),
    });
  });

  var chart = new CanvasJS.Chart("indian-stat", {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      minimum: -10,
      crosshair: {
        enabled: false,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      margin: 30,
      dockInsidePlotArea: false,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "spline",
        showInLegend: true,
        name: "Recovered",
        xValueFormatString: "DD MMM, YYYY",
        color: "#28a745",
        dataPoints: dailyRecovered,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Deaths",
        xValueFormatString: "DD MMM, YYYY",
        color: "#6c757d",
        dataPoints: dailyDeceased,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Total Deaths",
        xValueFormatString: "DD MMM, YYYY",
        color: "#444444",
        dataPoints: totalDeceased,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Confirmed",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: dailyConfirmed,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Total Confirmed",
        xValueFormatString: "DD MMM, YYYY",
        color: "#ff073a",
        dataPoints: totalConfirmed,
      },
    ],
  });
  chart.render();
  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}
// States Stat
function stateStats(stateName, data) {
  if (data != null) {
    if (stateName != state) {
      state = stateName;
    }
    let row = data.find((o) => o.state === stateName);
    pushDatatoDOM("state-name", `${row.state} Covid-19 Status`, true);
    pushDatatoDOM("state-info", `<li>Confirmed : ${row.confirmed}</li>`, true);
    pushDatatoDOM("state-info", `<li>Active : ${row.active}</li>`);
    pushDatatoDOM("state-info", `<li>Recovered : ${row.recovered}</li>`);
    pushDatatoDOM("state-info", `<li>Deaths : ${row.deaths}</li>`);
  } else {
    console.log("Some Error occured!");
  }
}
// District Stat
function districtStats(districtName, data) {
  if (districtName != district) {
    district = districtName;
  }
  if (data != null) {
    let row = data[state]["districtData"][district];
    pushDatatoDOM("district-name", `${district} Covid-19 Status`, true);
    if (row !== undefined) {
      pushDatatoDOM(
        "district-info",
        `<li>Confirmed : ${row.confirmed}</li>`,
        true
      );
    } else {
      pushDatatoDOM("district-info", `<li>Confirmed : 0</li>`, true);
    }
  } else {
    console.log("Some Error occured!");
  }
}

window.addEventListener(
  "load",
  () => {
    // Indian Stat
    requestJSON("https://data.covid19india.org/data.json").then((data) => {
      stateData = data.statewise;
      indianData = data.cases_time_series;
      indianDailyStats(indianData);
      stateStats(state, stateData);
    });
    //District Stat
    requestJSON("https://data.covid19india.org/state_district_wise.json").then(
      (data) => {
        districtData = data;
        districtStats(district, data);
      }
    );
    requestJSON("https://Covid19.mathdro.id/api/daily").then((data) => {
      worldDailyStats(data);
    });
  },
  false
);
