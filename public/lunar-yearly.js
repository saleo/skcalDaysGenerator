let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
var color="red",argsArray = [];
filename=process.argv[2];

csv.fromPath("./"+filename+".csv", {
    headers: true
}).on("data", function(data) {   
    if (data.summary=="三元降"||data.summary=="望"||data.summary=="朔")
        color="blue";

    let args = {      
        lunar_year: +data.lunarYear,
        lunar_month: +data.lunarMonth,
        lunar_day: +data.lunarDay,
        name: data.summary,
        color: color,
        count: 1
    }
    argsArray.push(args)
}).on("end", function() {
    let ical = lbc.generateCalendar(argsArray) ;
    ical.saveSync("./"+filename+".ics");
})