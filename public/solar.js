let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
argsArray = [];
filename=process.argv[2];

csv.fromPath("./"+filename+".csv", {
    headers: true
}).on("data", function(data) {
    let args = {
        solar_year: moment(data.DTSTART, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.DTSTART, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.DTSTART, 'MM/DD/YYYY').format('D'),
        name: data.Summary,
        color: data.color,
        count: 1
    }
    argsArray.push(args)
}).on("end", function() {
    let ical = lbc.generateCalendarWithSolar(argsArray) ;
    ical.saveSync("./"+filename+".ics");
})