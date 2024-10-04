function createD3Chart({
    containerId,
    dataFilePath,
    xAxisLabel,
    yAxisLabel,
    lineColor,
    safeThreshold,
    moderateThreshold,
    unhealthyThreshold
  }) {
    // Get the air_quality_monitor container
    const monitorElement = document.querySelector(containerId);
  
    // Get the computed styles of the element
    const computedStyle = getComputedStyle(monitorElement);
  
    // Get the width and height from the CSS (remove 'px' and parse them to integers)
    const width = parseInt(computedStyle.width, 10);
    const height = parseInt(computedStyle.height, 10);
  
    // Define margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  
    // Create the SVG dynamically based on the computed width and height
    const svg = d3.select(containerId).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Load the CSV file using D3 v7
    d3.csv(dataFilePath).then(function(data) {
      // Parse the date and time down to the minute
      const parseTime = d3.timeParse("%Y-%m-%d-%H-%M");
  
      // Format the data
      data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.value = +d.value; // Convert value to number
      });
  
      const startTime = new Date(2024, 9, 1, 8, 0);
      const endTime = new Date(2024, 9, 2, 0, 0);
  
      // Create the X axis (time)
      const x = d3.scaleTime()
        .domain([startTime, endTime])
        .range([0, width - margin.left - margin.right]);
  
      // Append the X axis
      svg.append("g")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(d3.axisBottom(x).ticks(d3.timeHour.every(2)).tickFormat(d3.timeFormat("%I %p")));
  
      // Add Y axis label
      svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .text(yAxisLabel);
  
      // Get the maximum value in the dataset
      const max = d3.max(data, d => +d.value);
  
      // Create the Y axis
      const y = d3.scaleLinear()
        .domain([0, max])
        .range([height - margin.top - margin.bottom, 0]);
  
      // Append the Y axis
      svg.append("g").call(d3.axisLeft(y));
  
      // Append the safe threshold line
      svg.append("line")
        .attr("class", "horizontal-line")
        .attr("x1", 0)
        .attr("x2", width - margin.left - margin.right)
        .attr("y1", y(safeThreshold))
        .attr("y2", y(safeThreshold));
  
      svg.append("text")
        .attr("class", "safe-label")
        .attr("x", 0)
        .attr("y", y(safeThreshold) - 5)
        .text("Safe Level");

      // Append the moderate threshold line
        svg.append("line")
        .attr("class", "horizontal-line")
        .attr("x1", 0)
        .attr("x2", width - margin.left - margin.right)
        .attr("y1", y(moderateThreshold))
        .attr("y2", y(moderateThreshold));
  
      svg.append("text")
        .attr("class", "moderate-label")
        .attr("x", 0)
        .attr("y", y(moderateThreshold) - 5)
        .text("Moderate Level");

     // Append the unhealthy threshold line
        svg.append("line")
        .attr("class", "horizontal-line")
        .attr("x1", 0)
        .attr("x2", width - margin.left - margin.right)
        .attr("y1", y(unhealthyThreshold))
        .attr("y2", y(unhealthyThreshold));
  
      svg.append("text")
        .attr("class", "unhealthy-label")
        .attr("x", 0)
        .attr("y", y(unhealthyThreshold) - 5)
        .text("Unhealthy Level");

  
      // Add gradient for the line
      svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
        .data([{offset: "0%", color: "blue"}, {offset: "100%", color: lineColor}])
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);
  
      // Add the line path
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", d3.line().x(d => x(d.date)).y(d => y(d.value)));
    }).catch(function(error) {
      console.error("Error loading data: ", error);
    });
  }