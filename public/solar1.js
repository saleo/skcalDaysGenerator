let csv=require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");

let gengCountsAfterXiazhi=-1, gengAfterDongzhi=-1, xinAfterDongzhi=-1,wuCountsAfterLiChun=-1,wuCountsAfterLiQiu=-1,xuCountsAfterDongzhi=-1;
var args,myGanzhi,gan,zhi;
argsArray=[];

csv
 .fromPath("2020_21ganzhiJieqi.csv", {headers: true})
 .on("data", function(data){
 	switch (data.jieqi) {
 		case "夏至":
            args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);gengCountsAfterXiazhi=0;argsArray.push(args);break;
 		case "冬至":
            args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);gengAfterDongzhi=0;argsArray.push(args);xuCountsAfterDongzhi=0;break;
 		case "春分": 
 		case "秋分": args=processLi(data);argsArray.push(args);break;
	 	case "立春": wuCountsAfterLiChun=0;args=processJue(data);argsArray.push(args);break;
 		case "立秋": wuCountsAfterLiQiu=0;args=processJue(data);argsArray.push(args);break;
 		case "立夏":  		
 		case "立冬": args=processJue(data);argsArray.push(args);break;
 		case "白露":
 		case "惊蛰":
		case "芒种": 		
		case "大雪":args=processSpecial(data);argsArray.push(args);break; 		
 	}
 	
    myGanzhi=data.ganzhi;
    switch (myGanzhi) {
        case "甲子":
        case "庚申":
        case "庚子":args=processGanzhi(data,1);argsArray.push(args);break;
        default: {
            gan=myGanzhi.substr(0,1);
            zhi=myGanzhi.substr(1,1);
            if (gan=="丙" || gan=="丁") {args=processGanzhi(data,2);argsArray.push(args); } 
            else if (gan=="庚") {
                if (gengCountsAfterXiazhi==2) {args=processGanzhi(data,3);argsArray.push(args);gengCountsAfterXiazhi=-1;}
                else if (gengAfterDongzhi==0) {args=processGanzhi(data,4);argsArray.push(args);gengAfterDongzhi=-1;}
                else if (gengCountsAfterXiazhi==0) gengCountsAfterXiazhi++;
            } 
            else if (gan=="辛") {
                if (xinAfterDongzhi==0) {args=processGanzhi(data,5);argsArray.push(args); xinAfterDongzhi=-1;}
                else {args=processGanzhi(data,2);argsArray.push(args)}
            }                
            else if (gan=="戊") {
                if (wuCountsAfterLiChun==4) {args=processGanzhi(data,6);argsArray.push(args); wuCountsAfterLiChun=-1;}
                else if (wuCountsAfterLiQiu==4) {args=processGanzhi(data,7);argsArray.push(args);wuCountsAfterLiQiu=-1; }
                else if (wuCountsAfterLiChun==0) wuCountsAfterLiChun++;
                else if (wuCountsAfterLiQiu==0) wuCountsAfterLiQiu++;
            }                
            
            if (zhi=="戌") {              
                if (xuCountsAfterDongzhi==2) {args=processGanzhi(data,8);argsArray.push(args);xuCountsAfterDongzhi=-1;}
                else if (xuCountsAfterDongzhi==0) xuCountsAfterDongzhi++;            
            }
        }
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

function processGanzhi(data,option){
    return {
        solar_year: moment(data.date, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.date, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.date, 'MM/DD/YYYY').format('D'),
        name: nameTrans(option),
        color: (gan=="丙" || gan=="丁") ? "blue":"red",
        count: 1
    }   
}


function nameTrans(option){
    switch (option)   {
        case 1: return `${myGanzhi}日`;
        case 2: return `${gan}日`;
        case 3: return "初伏，宜戒30天(从今至末伏)";
        case 4: return "冬至后庚日";
        case 5: return "冬至后辛日";
        case 6: return "春社日";
        case 7: return "秋社日";
        case 8: return "冬至后第三戌日";
    }
}

// csv.fromPath("in.csv", {headers: true})
   // .on("data",function(data){

   // })
