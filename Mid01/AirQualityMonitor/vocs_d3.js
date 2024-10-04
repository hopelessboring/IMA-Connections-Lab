document.addEventListener('DOMContentLoaded', function() {
  createD3Chart({
    containerId: "#air_quality_monitor",
    dataFilePath: "./vocs_d3datafile.csv",
    xAxisLabel: "Time",
    yAxisLabel: "Parts Per Million (PPM)",
    lineColor: "red",
    safeThreshold: 70, 
    moderateThreshold: 90,  
    unhealthyThreshold: 110  
  });
});
console.log('VOCs link clicked and data file loaded!');