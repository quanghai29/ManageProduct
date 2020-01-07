const width_threshold = 480;

function drawLineChart(data) {

      json = JSON.stringify(data);

      if ($("#lineChart").length) {
      ctxLine = document.getElementById("lineChart").getContext("2d");
      optionsLine = {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Hits"
              }
            }
          ]
        }
      };
  
      // Set aspect ratio based on window width
      optionsLine.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;
  
        if(arguments.length == 0){
          configLine = {
            type: "line",
            data: {
              labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
              datasets: [
                {
                  label: "Latest Hits",
                  data: [33, 40, 28, 49, 58, 38, 44],
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  cubicInterpolationMode: "monotone",
                  pointRadius: 0
                }]
            },
            options: optionsLine
          };
        }
        else{
          configLine = {
            type: "line",
            data: {
              labels: data.labels,
              datasets: data.properties
            },
            options: optionsLine
          };
        }
      
  
      lineChart = new Chart(ctxLine, configLine);
    }
  }
  
function drawBarChart(data) {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 0.2,
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Hits"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    /**
     * COLOR CODES
     * Red: #F7604D
     * Aqua: #4ED6B8
     * Green: #A8D582
     * Yellow: #D7D768
     * Purple: #9D66CC
     * Orange: #DB9C3F
     * Blue: #3889FC
     */

     if(arguments.length == 0){
      configBar = {
        type: "horizontalBar",
        data: {
          labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
          datasets: [
            {
              label: "# of Hits",
              data: [33, 40, 28, 49, 58, 38, 44],
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC",
                "#AA5588",
                "#D5D5D5",
                "#DD66CC",
                "#BB9CFF",
                "#8888FF"
              ],
              borderWidth: 0
            }
          ]
        },
        options: optionsBar
      };
     }
     else{
      configBar = {
        type: "horizontalBar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "# of Hits",
              data: data.values,
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC"
              ],
              borderWidth: 0
            }
          ]
        },
        options: optionsBar
      };
     }
    

    barChart = new Chart(ctxBar, configBar);
  }
}
function drawPieChart(data) {
  if ($("#pieChart").length) {
    var chartHeight = 300;

    $("#pieChartContainer").css("height", chartHeight + "px");

    ctxPie = document.getElementById("pieChart").getContext("2d");

    optionsPie = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      legend: {
        position: "top"
      }
    };

    if (arguments.length == 0){
      configPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: [18.24, 6.5, 9.15],
              backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582"],
              label: "Storage"
            }
          ],
          labels: [
            "Used Storage (18.240GB)",
            "System Storage (6.500GB)",
            "Available Storage (9.150GB)"
          ]
        },
        options: optionsPie
      };
    }
    else{
      configPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: data.values,
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC",
                "#5D6DCC",
                "#D7773F",
                "#1188CC"
              ],
              label: "Storage"
            }
          ],
          labels: data.labels
        },
        options: optionsPie
      };
    }

    pieChart = new Chart(ctxPie, configPie);
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}
