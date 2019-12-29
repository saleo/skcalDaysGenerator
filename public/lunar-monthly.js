let csv = require("fast-csv");
let lbc = require("lunar-birthday-calendar");
argsArray = [];
filename=process.argv[2];

csv.fromPath("./lunar_yearly.csv", {
    headers: true
}).on("data", function(data) {
    var mm=(''+data.DTSTART).substr(0,2)
    var dd=(''+data.DTSTART).substr(2,2)
    let args = {
        lunar_year: 2019,        
        lunar_month: +mm,
        lunar_day: +dd,
        name: data.Summary,
        color: data.color,
        count: 3
    }
    argsArray.push(args)
}).on("end", function() {
    let ical = lbc.generateCalendar(argsArray) ;
    ical.saveSync("./lunar_yearly.ics");
})