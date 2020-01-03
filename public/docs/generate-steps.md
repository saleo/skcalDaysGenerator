# steps to generate skcal-events and test

## 1. steps to generate ganzhi_Jieqi_lunar-based sheet

1,"get 2019_21solarLunar_ganzhiJieqi.csv,based on https://www.weather.gov.hk/tc/gts/time/calendar/pdf/files/2019.pdf,And bieyu.com/astp/06-solugzjd.html"
2,node getByGanzhi_jieqi_lunar，数据来源为2019_21solarLunar_ganzhiJieqi,生成单独或组合 干支、节气、阴历日做条件过滤出的日期，在该日期上修改某些数据项，得到的**2019_21ganzhi_Jieqi_lunar**.ics（最近3年）

## 2.steps to generate lunar-based sheet-yearly,which original data come from monthly sheet

 1. same as above

 2. prepare moduleEventsByLunar.js, which contains 2dimension array : events[LunarM\][ luNarD ]=eventsSummary 

    ```shell
    node getModuleEventsByLunar>1.txt
    然后把1.txt内容复制到 moduleEventsByLunar.js中
    ```

    

 3. run ‘node getByLunarYear 2019_21solarLunar_ganzhiJieqi 得到 lunar_yearly.ics

## 3. steps to generate lunar-based sheet大小月区分:
1,same as above
2,run ‘node node getByLunarBigSmallMonth，数据来源为2019_21solarLunar_ganzhiJieqi,生成根据阴历大小月过滤的日期，在该日期上修改某些数据项，得到**2019_21lunar_big_small**.ics文件(最近3年)

## 4.generate misc.ics

1. search paper-skcal to get 太岁日,十恶大败日 ,放入2019_21misc.csv
2. "node misc 2019_21misc.csv" to get the ics file

## 5.the ics from above 1,2, 3,4 are imported google calendar, 

always one missing as below:

>已导入 452 个活动，共 453 个。此文件中的有些活动并未导入，因为以前已经将其导入至 Google 日历。此文件中的其他活动已导入

## 6. input those ones that cannot fetch or missing from paper-skcal.

compared with paper-skcal, 

---

## 7. validating with online ics validator

https://icalendar.org/validator.html

## 8.run ./cat_ics去生成final ics

包括,concat the 4 ics files, replace location with color, remove duplcated lines when concat.

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