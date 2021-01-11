cat lunar_yearly.ics 2019_21solarLunar_ganzhiJieqi.ics 2019_21lunar_big_small.ics 2019_21misc.ics > 4fileconcated.ics
sed "s/LOCATION:/COLOR:/" 4fileconcated.ics > replace_color.ics
awk -f delDuplicate.awk replace_color.ics > sk_events.ics