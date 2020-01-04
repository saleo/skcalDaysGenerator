let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
let eventsByLunar= require("./moduleEventsByLunar.js")
var i=0,len;
var color="red",argsArray = [];
let blueItems={"三元降","望","朔","太素三元君朝真","月晦","雷斋日","天地仓开日","天地交道","南赡部洲击大法鼓","金龙四大王诞"};

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
            let color="red";
            let summary=eventsArray[i];
            if (blueItems.indexOf(summary)>-1)
                color="blue";

            if (summary=="宜戒")                    
                color="gray";

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