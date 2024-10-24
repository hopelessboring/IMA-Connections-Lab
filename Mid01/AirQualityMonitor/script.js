  ///// Event Listeners for initial load and click detection //////

document.addEventListener('DOMContentLoaded', function() {
  const vocsElement = document.getElementById('leftcontainerlinksVOCS');
  const pm2Element = document.getElementById('leftcontainerlinksPM2');

   // Event listener for VOCs link click
   vocsElement.addEventListener('click', function() {
    clearChart();  // Clear existing chart
    createD3Chart({
      containerId: "#air_quality_monitor",
      dataFilePath: "./vocs_d3datafile.csv",
      xAxisLabel: "Time",
      yAxisLabel: "Parts Per Million (PPM)",
      lineColor: "red",
      safeThreshold: 50, 
      moderateThreshold: 90,  
      unhealthyThreshold: 110  
    });
    console.log('VOCs link clicked!');
  });

  // Event listener for PM2 link click
  pm2Element.addEventListener('click', function() {
    clearChart();  // Clear existing chart
    createD3Chart({
      containerId: "#air_quality_monitor",
      dataFilePath: "./pm2_d3datafile.csv",
      xAxisLabel: "Time",
      yAxisLabel: "Micrograms Per Cubic Meter (μg/m³)",
      lineColor: "black",
      safeThreshold: 30,
      moderateThreshold: 60,  
      unhealthyThreshold: 110  
    });
    console.log('PM2 link clicked!');
  });
  
  ///// Clears the air qual monitor container upon click //////
    function clearChart() {
      const airQualityMonitor = document.getElementById('air_quality_monitor');
      airQualityMonitor.innerHTML = '';  
    }
    

  ///// mainbottomcontainerCanvas configuration!! //////

  // access canvas and its parent container
  const mainbottomcontainercanvas = document.getElementById('mainbottomcontainerCanvas');
  const mainbottomcontainercontainer = document.getElementById('mainbottomcontainer');

  // Set canvas width and height to match the container's size
  function resizemainbottomcontainerCanvas() {
    // Set canvas width/height equal to the container's client dimensions
    mainbottomcontainercanvas.width = mainbottomcontainercontainer.clientWidth;
    mainbottomcontainercanvas.height = mainbottomcontainercontainer.clientHeight;

    //  draw on the canvas with the new size
    const mainbottomcontainerctx = mainbottomcontainercanvas.getContext('2d');
    mainbottomcontainerctx.fillStyle = 'black';
    mainbottomcontainerctx.fillRect(0, 10, mainbottomcontainercanvas.width, 4);
  }

  // call the function initially to size the canvas correctly
  resizemainbottomcontainerCanvas();

  // resize the canvas on window resize to keep it in sync with the container
  window.addEventListener('resize', resizemainbottomcontainerCanvas);

});