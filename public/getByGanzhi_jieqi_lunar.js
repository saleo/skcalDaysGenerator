let csv=require("fast-csv");
let moment = require('moment');
let lbc = require("lunar-birthday-calendar");
filename=process.argv[2];
let yinCuo=["庚戌","辛酉","庚申","丁未","丙午","丁巳","甲辰","乙卯","甲寅","癸丑","壬子","癸亥"];
let yangCuo=["甲寅","乙卯","甲辰","丁巳","丙午","丁未","庚申","辛酉","庚戌","癸亥","壬子","癸丑"];
let gengCountsAfterXiazhi=-1, gengAfterDongzhi=-1, xinAfterDongzhi=-1,wuCountsAfterLiChun=-1,wuCountsAfterLiQiu=-1,xuCountsAfterDongzhi=-1;
var args,myGanzhi,gan,zhi,summary;
argsArray=[];

csv.fromPath("./"+filename+".csv", {headers: true})
 .on("data", function(data){
 	let myJieqi=data.jieqi;
    switch (myJieqi) {
 		case "夏至":
            args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);gengCountsAfterXiazhi=0;argsArray.push(args);break;
 		case "冬至":
            args=processLi(data);argsArray.push(args);args=processXiaDongZhi(data);
            gengAfterDongzhi=0;argsArray.push(args);xuCountsAfterDongzhi=0;
            xinAfterDongzhi=0;break;
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
        case "甲子":args=processGanzhi(data,1);argsArray.push(args);break;
        case "庚申":{
            args=processGanzhi(data,1);argsArray.push(args);
            if (gengCountsAfterXiazhi==2) {args=processGanzhi(data,3);argsArray.push(args);gengCountsAfterXiazhi=-1;}
            else if (gengAfterDongzhi==0) {args=processGanzhi(data,4);argsArray.push(args);gengAfterDongzhi=-1;}
            else if (gengCountsAfterXiazhi>-1 && myJieqi!="夏至") gengCountsAfterXiazhi++;
            break;        
        }
        default: {
            gan=myGanzhi.substr(0,1);
            zhi=myGanzhi.substr(1,1);
            if (gan=="丙" || gan=="丁") {args=processGanzhi(data,2);argsArray.push(args); } 
            else if (gan=="庚") {
                if (gengCountsAfterXiazhi==2) {args=processGanzhi(data,3);argsArray.push(args);gengCountsAfterXiazhi=-1;}
                else if (gengAfterDongzhi==0) {args=processGanzhi(data,4);argsArray.push(args);gengAfterDongzhi=-1;}
                else if (gengCountsAfterXiazhi>-1 && myJieqi!="夏至") gengCountsAfterXiazhi++;
            } 
            else if (gan=="辛") {
                if (xinAfterDongzhi==0) {args=processGanzhi(data,5);argsArray.push(args); xinAfterDongzhi=-1;}
                else {args=processGanzhi(data,2);argsArray.push(args)}
            }                
            else if (gan=="戊") {
                if (wuCountsAfterLiChun==4) {args=processGanzhi(data,6);argsArray.push(args); wuCountsAfterLiChun=-1;}
                else if (wuCountsAfterLiQiu==4) {args=processGanzhi(data,7);argsArray.push(args);wuCountsAfterLiQiu=-1; }
                else if (wuCountsAfterLiChun>-1 && myJieqi!="立春") wuCountsAfterLiChun++;
                else if (wuCountsAfterLiQiu>-1 && myJieqi!="立秋") wuCountsAfterLiQiu++;
            }                
            
            if (zhi=="戌") {              
                if (xuCountsAfterDongzhi==2) {args=processGanzhi(data,8);argsArray.push(args);xuCountsAfterDongzhi=-1;}
                else if (xuCountsAfterDongzhi>-1 && myJieqi!="冬至") xuCountsAfterDongzhi++;            
            }
        }
    }


//process 阴错日,阳错日
    myLunarMonth=+data.lunarMonth;
    console.log (myLunarMonth);
    if (yinCuo[myLunarMonth-1]==myGanzhi) { summary="阴错日";args=processCuo(data,summary);argsArray.push(args);}
    if (yangCuo[myLunarMonth-1]==myGanzhi) { summary="阳错日";args=processCuo(data,summary);argsArray.push(args);}
 })
 .on("end", function(){
    let ical = lbc.generateCalendarWithSolar(argsArray) ;
    ical.saveSync("./"+filename+".ics");
 });

function processXiaDongZhi(data){
    //console.log(data);
	return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
        name: "阴阳相争,死生分判,切戒",
        color: "red",	
        count: 1
    }
}

function processLi(data){
	return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('D'),
        name: "四离日",
        color: "red",
        count: 1
    }	
}
	
function processJue(data){
	return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').subtract(1,'days').format('D'),
        name: "四绝日",
        color: "red",
        count: 1
    }	
}
 
function processSpecial(data){
	return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
        name: `宜从${data.jieqi}戒过一月`,
        color: "red",
        count: 1
    }	
}

function processGanzhi(data,option){
    return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
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

function processCuo(data,summary){
    return {
        solar_year: moment(data.solar, 'MM/DD/YYYY').format('Y'),
        solar_month: moment(data.solar, 'MM/DD/YYYY').format('M'),
        solar_day: moment(data.solar, 'MM/DD/YYYY').format('D'),
        name: summary,
        color: "blue",   
        count: 1
    }
}

// csv.fromPath("in.csv", {headers: true})
   // .on("data",function(data){

   // })
