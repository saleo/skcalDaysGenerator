let csv=require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");

let gengCountsAfterXiazhi=-1, gengAfterDongzhi=-1, xinAfterDongzhi=-1,wuCountsAfterLiChun=-1,wuCountsAfterLiQiu=-1,xuCountsAfterDongzhi=-1;
var args;
argsArray=[];

csv
 .fromPath("2020_21ganzhiJieqi.csv", {headers: true})
 .on("data", function(data){
 	switch (data.jieqi) {
 		case "夏至":args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);gengCountsAfterXiazhi=0;argsArray.push(args);break;
 		case "冬至":args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);gengAfterDongzhi=0;argsArray.push(args);break;
 		case "春分": 
 		case "秋分": args=processLi(data);argsArray.push(args);break;
	 	case "立春": wuCountsAfterLichun=0;args=processJue(data);argsArray.push(args);break;
 		case "立秋": wuCountsAfterLiqiu=0;args=processJue(data);argsArray.push(args);break;
 		case "立夏":  		
 		case "立冬": args=processJue(data);argsArray.push(args);break;
 		case "白露":
 		case "惊蛰":
		case "芒种": 		
		case "大雪":args=processSpecial(data);argsArray.push(args);break; 		
 	}
 	
 })
 .on("end", function(){
    let ical = lbc.generateCalendarWithSolar(argsArray) ;
    ical.saveSync("./2020_21solar.ics");
 });

function processXiaDongZhi(data){
	return {
        solar_year: moment(data.date, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.date, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.date, 'MM/DD/YYYY').format('D'),
        name: "阴阳相争,死生分判,切戒",
        color: "red",	
        count: 1
    }
}

function processLi(data){
	return {
        solar_year: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('Y'),
        solar_month: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('M'),
        solar_day: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('D'),
        name: "四离日",
        color: "red",
        count: 1
    }	
}
	
function processJue(data){
	return {
        solar_year: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('Y'),
        solar_month: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('M'),
        solar_day: moment(data.date, 'MM/DD/YYYY').subtract(1,'days').format('D'),
        name: "四绝日",
        color: "red",
        count: 1
    }	
}
 
function processSpecial(data){
	return {
        solar_year: moment(data.date, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.date, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.date, 'MM/DD/YYYY').format('D'),
        name: `宜从${data.jieqi}戒过一月`,
        color: "red",
        count: 1
    }	
}
// csv.fromPath("in.csv", {headers: true})
   // .on("data",function(data){

   // })
