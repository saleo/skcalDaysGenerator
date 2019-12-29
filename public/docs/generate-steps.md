# steps to generate skcal-events and test

## steps to generate ganzhi_Jieqi_lunar-based sheet

1,"get 2019_21solarLunar_ganzhiJieqi.csv,based on https://www.weather.gov.hk/tc/gts/time/calendar/pdf/files/2019.pdf,And bieyu.com/astp/06-solugzjd.html"
2,node getByGanzhi_jieqi_lunar，数据来源为2019_21solarLunar_ganzhiJieqi,生成单独或组合 干支、节气、阴历日做条件过滤出的日期，在该日期上修改某些数据项，得到的**2019_21ganzhi_Jieqi_lunar**.ics（最近3年）

## steps to generate lunar-based sheet-yearly,which original data come from monthly sheet(line 175 and the below)+yearly sheet(line 2~174)

1,monthly和yearly，2个sheet合并为lunar_yearly.csv...add head at line 1
2,run ‘node getByLunarYear ,数据来源为lunaryearly.csv根据lunar_yearly生成最近3年按阴历年计算的数据**2019_21lunarYearly**.ics

## steps to generate lunar-based sheet大小月区分:
1,prepare 2019_21solarLunar_ganzhiJieqi.csv,
2,run ‘node node getByLunarBigSmallMonth，数据来源为2019_21solarLunar_ganzhiJieqi,生成根据阴历大小月过滤的日期，在该日期上修改某些数据项，得到**2019_21lunar_big_small**.ics文件(最近3年)

## steps to generate misc-events sheet

1,"Based on solar-based and the paper calendar and get the events besides above mentioned ones: 太岁日,etc。。2019 only，in the format “term-dtstart-color”,color need input one by one by hand or by formula
,save as solar2020misc.csv"
2,"run ‘node solar solar2019misc’ to get solar2020misc.ics, "
3,same for  solar2021misc



## 纠错：

| missing                                | extra           | 备注                        |      | xx for 2 steps:orginal sheet,csv  D-done;N-NotDone |
| -------------------------------------- | --------------- | --------------------------- | ---- | -------------------------------------------------- |
| 纸面显示初七也有上弦月，每个月都是如此 |                 |                             |      | dd                                                 |
| 纸面显示腊月初八是观音斋，腊月24观音斋 |                 | 网上查的不含腊八，24.。含25 |      | dd                                                 |
| 纸面显示each月15四天王巡行             |                 | 网上不含                    |      | dd                                                 |
|                                        | 灶君节-纸面没有 | 1223                        |      | dd                                                 |
| 司命奏事,四天王巡行                    |                 | 1230                        |      | dd                                                 |
| 万神都会 should at 0207                |                 | 0103                        |      | dd                                                 |
| 五虚忌 should at 0209                  |                 | 0105                        |      | dd                                                 |
|                                        |                 |                             |      | dd                                                 |
| 定光古佛聖誕                           |                 | 0106                        | red  | dd                                                 |
| 六耗忌                                 |                 | 0106                        | red  | dd                                                 |
| 上会日                                 |                 | 0107                        | red  | dd                                                 |
|                                        |                 |                             |      | dd                                                 |
| 五殿阎罗诞                             |                 | 0108                        |      | dd                                                 |
| yuhuangdadi                            |                 | 0109                        |      | dd                                                 |
| sanyuanjiang                           |                 | 0114                        |      | dd                                                 |
| sanyuanjiang,shangyuanshenhui          |                 | 0115                        |      | dd                                                 |
| sanyuanjiang                           |                 | 0116                        |      | dd                                                 |
| sanshishenzoushi                       |                 | 0123                        |      | dd                                                 |