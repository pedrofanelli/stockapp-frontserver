/**
 * 
 */

// split the data set into ohlc and volume
const ohlc = [],
    volume = [],
    dataLength = data.length,
    groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

for (let i = 0; i < dataLength; i += 1) {
    ohlc.push([
        data[i][0], // the date
        data[i][1], // open
        data[i][2], // high
        data[i][3], // low
        data[i][4] // close
    ]);

    volume.push([
        data[i][0], // the date
        data[i][5] // the volume
    ]);
}


let chart;


document.addEventListener("DOMContentLoaded", function() {
  // Your logic to be executed after the DOM is loaded
  
  	const inputElement = document.getElementById("myInput");
	inputElement.addEventListener("click", handleSubmit);


	chart = Highcharts.stockChart('container', {
				            		
                yAxis: [{
                    labels: {
                        align: 'left'
                    },
                    height: '80%',
                    resize: {
                        enabled: true
                    }
                }, {
                    labels: {
                        align: 'left'
                    },
                    top: '80%',
                    height: '20%',
                    offset: 0
                }],
                tooltip: {
                    shape: 'square',
                    headerShape: 'callout',
                    borderWidth: 0,
                    shadow: false,
                    positioner: function (width, height, point) {
                        const chart = this.chart;
                        let position;

                        if (point.isHeader) {
                            position = {
                                x: Math.max(
                                    // Left side limit
                                    chart.plotLeft,
                                    Math.min(
                                        point.plotX + chart.plotLeft - width / 2,
                                        // Right side limit
                                        chart.chartWidth - width - chart.marginRight
                                    )
                                ),
                                y: point.plotY
                            };
                        } else {
                            position = {
                                x: point.series.chart.plotLeft,
                                y: point.series.yAxis.top - chart.plotTop
                            };
                        }

                        return position;
                    }
                },
                series: [{
                    type: 'ohlc',
                    id: 'aapl-ohlc',
                    name: nameDataTicker + ' Stock Price',
                    data: ohlc
                }, {
                    type: 'column',
                    id: 'aapl-volume',
                    name: nameDataTicker + ' Volume',
                    data: volume,
                    yAxis: 1
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 1000
                        },
                        chartOptions: {
                            rangeSelector: {
                                inputEnabled: false
                            }
                        }
                    }]
                },	
                	
            });

  	
  
  
});

function createEventSource() {
                
    console.log("ATTEMPTING TO RECONNECT...");
    
    let eventSource = new EventSource('http://localhost:8072/apiconnection/emitter/'+nameDataTicker);

    let count = 0;
    eventSource.onmessage = (event) => {
        // Handle incoming events from the server
    	
    	let eventData = event.data;
        let dataArray = JSON.parse(eventData);
        
        
        var seriesOhlc = chart.series[0];
        var seriesVolu = chart.series[1];
        
        shift = seriesOhlc.data.length > 20;
        shift2 = seriesVolu.data.length > 20;
        
        seriesOhlc.addPoint([dataArray.t, dataArray.o, dataArray.h, dataArray.l, dataArray.c], true, shift);
        seriesVolu.addPoint([dataArray.t, dataArray.v], true, shift2);
        
    };
    eventSource.onopen = (event) => {
      console.log("EVENT SOURCE ABIERTO!"+event.data);  
    };

    eventSource.onerror = (event) => {
        
        // Handle errors and attempt to reconnect
        console.error('Error occurred:', event);
        eventSource.close();  // Close the current connection

        // Attempt to reconnect after a delay (e.g., 5 seconds)
        setTimeout(createEventSource, 10000);

    };
    
} 


let eventSource = new EventSource('http://localhost:8072/apiconnection/emitter/'+nameDataTicker);

eventSource.onmessage = (event) => {
    // Handle incoming events from the server                
    
    let eventData = event.data;
    let dataArray = JSON.parse(eventData);
    
    
    var seriesOhlc = chart.series[0];
    var seriesVolu = chart.series[1];
    
    shift = seriesOhlc.data.length > 20;
    shift2 = seriesVolu.data.length > 20;
    
    seriesOhlc.addPoint([dataArray.t, dataArray.o, dataArray.h, dataArray.l, dataArray.c], true, shift);
    seriesVolu.addPoint([dataArray.t, dataArray.v], true, shift2);                               
        	       
                    
                    
};
eventSource.onopen = (event) => {
  console.log("EVENT SOURCE ABIERTO!");  
};

eventSource.onerror = (event) => {
  
    // Handle errors and attempt to reconnect
    console.error('Error occurred:', event);
    eventSource.close();  // Close the current connection

    // Attempt to reconnect after a delay (e.g., 5 seconds)
    setTimeout(createEventSource, 10000);
  
};


function handleSubmit(event) {
	event.preventDefault();
	console.log("holis");
	let selector = document.getElementById("ticker");
	console.log(selector.value);
	
	window.open("http://localhost:8072/front/main/"+selector.value,"_self");
	
}



