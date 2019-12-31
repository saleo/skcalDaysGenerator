let csv=require("fast-csv");
// let es= require("./moduleEventsByLunar.js")
// console.log (es[10][25]);
var eventsByLunarMonth=Array(12).fill("").map(x => Array(30).fill(""));
var summary;
csv.fromPath("./lunar_yearly.csv", {headers: true }).on("data", function(data) {
	let lunarMonth=data.lunarMonth;
	let lunarDay=data.lunarDay;
	let s=eventsByLunarMonth[lunarMonth-1][lunarDay-1];
	if (s=="")
		eventsByLunarMonth[lunarMonth-1][lunarDay-1]=data.summary;	
	else
		eventsByLunarMonth[lunarMonth-1][lunarDay-1]=s+","+data.summary;	

}).on("end", function() {
		console.log (eventsByLunarMonth);
})


//var smallMonths=[[]];
// smallMonths[2019]=[2,,6,7,9,10];
// smallMonths[2020]=[1,6,7,9,11];
// smallMonths[2021]=[1,4,6,8,10,12];
// let yinCuo=["庚戌","辛酉","庚申","丁未","丙午","丁巳","甲辰","乙卯","甲寅","癸丑","壬子","癸亥"];
// let yangCuo=["甲寅","乙卯","甲辰","丁巳","丙午","丁未","庚申","辛酉","庚戌","癸亥","壬子","癸丑"];
// let eventsByLunarMonth[12]=[];

// csv.fromPath("./lunar_yearly.csv", {
//     headers: true
// }).on("data", function(data) {
// 	for (var i=0;i<12;i++){

// 	}
// 	eventsByLunarMonth[data.lunarMonth][]
// })

// let len= smallMonths[2019].length;
// for (var i=0; i<6;i++){
// 	e= smallMonths[2019][i];
// 	console.log(e);
// }

// var a={a0:1,a1:9};
//process1();
// console.log (a);
// a=process1(a,2);
// console.log (a);

//



function process1(){
	for (var i=1;i<13;i++){
			console.log (yinCuo[i-1]);
	}
}

