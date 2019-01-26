let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
argsArray = [];
csv.fromPath("./in.csv", {
    headers: true
}).on("data", function(data) {
    let args = {
        lunar_month: moment(data.DTSTART, 'MMDD').format('M'),
        lunar_day: moment(data.DTEND, 'MMDD').format('D'),
        uid: data.UID,
        name: data.Summary,
        color: data.color,
        count: 1
    }
    argsArray.push(args)
}).on("end", function() {
    let ical = lbc.generateCalendar(argsArray) ;
    ical.saveSync("./1.ics")
    // console.log(xxx.toString());
})