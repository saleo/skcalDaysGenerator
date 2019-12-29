steps to generate solar-based sheet,,based on,,,
1,"get 2019_20_21solar.csv, 3 columns inside: date,ganzhi,jieqi","https://www.weather.gov.hk/tc/gts/time/calendar/pdf/files/2019.pdf
And bieyu.com/astp/06-solugzjd.html",,,
2,Run ‘node solar1’ to get solar2019_20_21.ics,,,,
,,,,,
steps to generate lunar-based sheet-yearly,,monthly sheet(line 175 and the below)+yearly sheet(line 2~174),,,
1,monthly和yearly，2个sheet合并为lunar-yearly.csv...add head at line 1,,,,
2,run ‘node lunar-yearly’ to get the 3years data: lunar_yearly.ics,,,,
,,,,,
steps to generate lunar-based sheet-2021大小月区分,,,,,
1,prepare 2019_21solar_lunar.csv,"2019,2020-big-small were included original lunar2019yearly.ics, 
Lunar2020yearly.ics",,,
2,run ‘node big-small’ to get lunar-big-small.ics,,,,
,,,,,
steps to generate misc-events sheet,,,,,
1,"Based on solar-based and the paper calendar and get the events besides above mentioned ones: 太岁日,etc。。2019 only
in the format “term-dtstart-color”,color need input one by one by hand or by formula
,save as solar2020misc.csv",,,,
2,"run ‘node solar solar2019misc’ to get solar2020misc.ics, ",,,,
3,same for  solar2021misc.,,,,
5,"check the 6 ics data validity

solar2019_20_21.ics: begin 2019, end in 2020; 

 lunar-monthly.ics: begin 2019 , end in 2022

Lunar2021yearly.ics: begin 2021,end 2022

Lunarbig-small.ics: begin 20, end 2022

Solar2020misc.ics: begin 2020, end 2021

solar2021misc.ics: begin 2021, end 2022",,,,
6,"import the 6  ics file to local calendar to validate the data for only 2020,2021","No need check:
3 last-year ics: lunar2019yearly, lunar2020yearly, misc2019.ics",,,
7,"check calendar events with paper-calendar: color ,date",,,,
,,,,,
纠错1：,missing,extra,备注,,"xx for 2 steps:orginal sheet,csv

D-done;N-NotDone"
,纸面显示初七也有上弦月，每个月都是如此,,,,dd
,纸面显示腊月初八是观音斋，腊月24观音斋,,网上查的不含腊八，24.。含25,,dd
,纸面显示each月15四天王巡行,,网上不含,,dd
,,灶君节-纸面没有,1223,,dd
,"司命奏事,四天王巡行",,1230,,dd
,万神都会 should at 0207,,0103,,dd
,五虚忌 should at 0209,,0105,,dd
,,,,,dd
,定光古佛聖誕,,0106,red,dd
,六耗忌,,0106,red,dd
,上会日,,0107,red,dd
,,,,,dd
,五殿阎罗诞,,0108,,dd
,yuhuangdadi,,0109,,dd
,sanyuanjiang,,0114,,dd
,"sanyuanjiang,shangyuanshenhui",,0115,,dd
,sanyuanjiang,,0116,,dd
,sanshishenzoushi,,0123,,dd
