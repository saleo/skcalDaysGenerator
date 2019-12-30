let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
let eventsByLunar= require("./moduleEventsByLunar.js")
var i=0,len;
var color="red",argsArray = [];

filename=process.argv[2];

csv.fromPath("./"+filename+".csv", {
    headers: true
}).on("data", function(data) {   
    let lunarMonth=+data.lunarMonth;
    let lunarDay=+data.lunarDay;
    let myEvents=eventsByLunar[lunarMonth-1][lunarDay-1];
    if (myEvents!='')
    {
        let eventsArray=myEvents.split(",");
        len=eventsArray.length;
        for (i=0;i<len;i++) {     
            let summary=eventsArray[i];
            if (summary=="三元降"||summary=="望"||summary=="朔")
                    color="blue";
    
                let args = {      
                    solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
                    solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
                    solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
                    name: summary,
                    color: color,
                    count: 1
                }
                argsArray.push(args)
            }
    }
}).on("end", function() {
    let ical = lbc.generateCalendarWithSolar(argsArray) ;
    ical.saveSync("./lunar_yearly.ics");
})