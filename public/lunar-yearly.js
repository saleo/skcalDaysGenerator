let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
argsArray = [];
filename=process.argv[2];

csv.fromPath("./"+filename+".csv", {
    headers: true
}).on("data", function(data) {
    let args = {
        lunar_year: +(filename.substr(5,4)),
        lunar_month: moment(data.DTSTART, 'MMDD').format('M'),
        lunar_day: moment(data.DTSTART, 'MMDD').format('D'),
        name: data.Summary,
        color: data.color,
        count: 1
    }
    argsArray.push(args)
}).on("end", function() {
    let ical = lbc.generateCalendar(argsArray) ;
    ical.saveSync("./"+filename+".ics");
})