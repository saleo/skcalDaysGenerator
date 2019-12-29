let csv = require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
filename=process.argv[2];

var smallMonths=[[]];
var bigMonths=[[]];
smallMonths[2018]=[1,3,5,6,8,10];
bigMonths[2018]=[2,4,7,9,11,12];
smallMonths[2019]=[2,4,6,7,9,10];
bigMonths[2019]=[1,3,5,8,11,12];
smallMonths[2020]=[1,6,7,9,11];
bigMonths[2020]=[2,3,4,5,8,10,12];
smallMonths[2021]=[1,4,6,8,10,12];
bigMonths[2021]=[2,3,5,7,9,11];

argsArray = [];
var iCount=0;

csv.fromPath("./2019_21solar_lunar.csv", {
    headers: true
}).on("data", function(data) {
    let yy=data.lunarYear;
    let mm=+data.lunarMonth;
    let dd=data.lunarDay;
    let summary="";
    let color="red";
    var args;

    switch (dd) {
        case "17": if (smallMonths[yy].indexOf(mm)>-1) {summary="毁败日";args=getArg(data,summary,color);argsArray.push(args);}break;
        case "18": if (bigMonths[yy].indexOf(mm)>-1) {summary="毁败日";args=getArg(data,summary,color);argsArray.push(args);}break;
        case "27": if (smallMonths[yy].indexOf(mm)>-1) {summary="十斋日";args=getArg(data,summary,color);argsArray.push(args);}break;
        case "29": {
            if (smallMonths[yy].indexOf(mm)>-1){
                summary="司命奏事";args=getArg(data,summary,color);argsArray.push(args);
                summary="月晦";color="blue";args=getArg(data,summary,color);argsArray.push(args);
            } 
            break;
        }
        case "30": {
            summary="司命奏事";args=getArg(data,summary,color);argsArray.push(args);
            summary="十斋日";args=getArg(data,summary,color);argsArray.push(args);
            summary="月晦";args=getArg(data,summary,color);argsArray.push(args);
            summary="四天王巡行";args=getArg(data,summary,color);argsArray.push(args);        
            break;
        }

    }
    iCount++;
}).on("end", function() {
    let ical = lbc.generateCalendarWithSolar(argsArray) ;
    ical.saveSync("./2019_21lunar_big_small1.ics");
})

function getArg(data,summary,color){
    return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
        name: summary,
        color: color,
        count: 1
    }    
}