$(document).ready(function() {

    ////////////////////////////////////////////////////////////////////
    ///////////////// SVG SETUP ////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    // Defines Parameters of SVG //
    var margin = { top: 10, right: 10, bottom: 50, left: 0 },
        width = $("#chord").width(),
        height = $("#chord").width(),
        margin = { top: 10, right: 10, bottom: 20, left: 10 },
        radius = Math.min(width, height) / 2 - 100,
        innerRadius = Math.min(width, height) / 4,
        outerRadius = innerRadius * 1.04;

    //Defines Size and Location of SVG //
    var svg = d3.select("#chord").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2.3 + ")");

    ////////////////////////////////////////////////////////////////////
    ///////////////// DATA /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    // Data in Matrix Form //
    var matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 69, 126], //big-sky-resort//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 152, 71], //park-city//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14.2, 111, 111], //snowmass//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 84, 93], //vail//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 110, 50], //whistler-blackcomb//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 95, 45], //steamboat//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 60, 65], //breckenridge//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28.5, 64.5, 57], //beaver-creek//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 53, 79], //winter-park-resort//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 58, 42], //fernie//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 62, 42], //lake-louise//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13.5, 78, 43.5], //sun-peaks//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 65, 45], //keystone//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24.3, 40.5, 70.2], //aspen-highlands//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 50, 55], //powder-mountain//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37.4, 43, 46], //killington//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 40, 56], //copper-mountain//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 69, 25], //crested-butte//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 50, 50], //red-mountain-resort-rossland//
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 40, 51], //sugarloaf//
        [55, 27, 14.2, 57, 40, 25, 28, 28.5, 11, 42, 35, 13.5, 25, 24.3, 30, 37.4, 30, 27, 20, 28, 0, 0, 0], //easy//
        [69, 152, 111, 84, 110, 95, 60, 64.5, 53, 58, 62, 78, 65, 40.5, 50, 43, 40, 69, 50, 40, 0, 0, 0], //intermediate//
        [126, 71, 111, 93, 50, 45, 65, 57, 79, 42, 42, 43.5, 45, 70.2, 55, 46, 56, 25, 50, 51, 0, 0, 0] //hard//
    ];

    // Fill Color // 
    var fill = d3.scaleOrdinal()
        .range(["#493829", "#816C5B", "#A9A18C", "#613318", "#855723", "#B99C6B", "#8F3B1B", "#D57500", "#DBCA69", "#404F24", "#668D3C", "#BDD09F", "#4E6172", "#83929F", "#A3ADB8", "#493829", "#8F3B1B", "#668D3C", "#4E6172", "#D57500", "#65B32E", "#006BAC", "#1D1D1B"]);
    // .range(["darkslateblue", "#B99C6B", "green", "khaki", "darkorange", "mediumvioletred", "orange", "rosybrown", "seagreen", "sienna", "springgreen", "teal", "thistle", "violet", "wheat", "yellowgreen", "royalblue", "powderblue", "steelblue", "Lime", "green", "Blue", "black"]);
    // Resort Names//  
    var names = d3.scaleOrdinal()
        .range(["Big Sky", "Park City", "Snowmass", "Vail", "Whistler Blackcomb", "Steamboat", "Breckenridge", "Beaver Creek", "Winter Park", "Fernie", "Lake Louise", "Sun Peaks", "Keystone", "Aspen Highlands", "Powder Mountain", "Killington", "Copper Mountain", "Crested Butte", "Red Mountain", "Sugarloaf", "Easy", "Intermediate", "Difficult"]);

    // Resort skiable distance in km//   
    var acres = d3.scaleOrdinal()
        .range([
            "(250 km)", "(250 km)", "(236.2 km)", "(234 km)", "(200 km)", "(165 km)", "(153 km)", "(150 km)", "(143 km)", "(142 km)", "(139 km)", "(135 km)", "(135 km)", "(135 km)", "(135 km)", "(126.4 km)", "(126 km)", "(121 km)", "(120 km)", "(119 km)", "", "", ""
        ]);

    // Run Names//
    var runs = d3.scaleOrdinal()
        .range([
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "65B32E", "006BAC", "1D1D1B"
        ]);

    ////////////////////////////////////////////////////////////////////
    ///////////////// DRAW VISUALIZAION ////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    var chordGenerator = d3.chord()
        .padAngle(0.1)
        .sortSubgroups(d3.descending)

    var chord = chordGenerator(matrix);


    ////////////////////////////////////////////////////////////////////
    ///////////////// COLOR GRADIENT ///////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    // Function to create the id for each chord gradient //
    function getGradID(d) { return "linkGrad-" + d.source.index + "-" + d.target.index; }

    // Create the gradients definitions for each chord //
    var grads = svg.append("defs").selectAll("linearGradient")
        .data(chord)
        .enter().append("linearGradient")
        .attr("id", getGradID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", function(d, i) { return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2); })
        .attr("y1", function(d, i) { return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2); })
        .attr("x2", function(d, i) { return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2); })
        .attr("y2", function(d, i) { return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2); })

    // Set the starting color (at 0%)//
    grads.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", function(d) { return fill(d.source.index); });

    // Set the ending color (at 100%)//
    grads.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", function(d) { return fill(d.target.index); });

    // Draws the outer arc groups //
    svg.append("g").selectAll("path")
        .data(chord.groups)
        .enter()
        .append("path")
        .style("fill", function(d) { return fill(d.index); })
        .attr("class", "group")
        .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .style("stroke-width", .5)
        .style("stroke", function(d) { return fill(d.index); })
        .on("mouseover", fade(.06))
        .on("mouseout", fade(1));

    // Draws the inner chords // 
    svg.append("g")
        .attr("class", "chord")
        .selectAll("path")
        .data(chord)
        .enter()
        .append("path")
        .attr("d", d3.ribbon().radius(innerRadius - 2))
        .style("fill", function(d) { return "url(#" + getGradID(d) + ")"; })
        .style("stroke-width", .5)
        .style("stoke", function(d) { return fill(d.index); })
        .style("opacity", 1);


    ////////////////////////////////////////////////////////////////////
    ///////////////// ANNOTATE /////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    // Adds Resort Labels //   
    svg.append("g").selectAll("resort_labels")
        .data(chord.groups)
        .enter()
        .append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                "translate(" + (innerRadius + 20) + ")" +
                (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .attr("style", "font-size: 13; font  -family: Helvetica, sans-serif")
        .text(function(d) { return names(d.index); })
        .attr("class", "text1");

    // Adds distance (km) Labels //
    svg.append("g").selectAll("acres_labels")
        .data(chord.groups)
        .enter()
        .append("text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("dy", "1.5em")
        .attr("opacity", 0)
        .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                "translate(" + (innerRadius + 20) + ")" +
                (d.angle > Math.PI ? "rotate(180)" : "");
        })
        .attr("style", "font-size: 9; font -family: Helvetica, sans-serif")
        .text(function(d) { return acres(d.index); })
        .attr("class", "text2");

    ////////////////////////////////////////////////////////////////////
    ///////////////// ANNIMATION ///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    // Returns an event handler for fading a given chord group //
    function fade(opacity) {
        return function(g, i) {
            svg.selectAll(".chord path")
                .filter(function(d) { return d.source.index != i && d.target.index != i; })
                .transition()
                .duration(500)
                .style("opacity", opacity);

            svg.selectAll(".text2")
                .filter(function(d) { return acres(d.index); })
                .transition()
                .duration(500)
                .attr("opacity", 1 - opacity)
                .attr("style", "font-size: 9; font  -family: Helvetica, sans-serif");

            svg.selectAll(".text3")
                .filter(function(d) { return acres(d.index); })
                .transition()
                .duration(500)
                .attr("opacity", 1 - opacity)
                .attr("style", "font-size: 13; font  -family: Helvetica, sans-serif");
        };
    };

});