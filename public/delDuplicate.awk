#!/bin/awk -f
#运行前
BEGIN{
	i=0
}
#运行中
{
	if ($0 ~ /END:VCALENDARBEGIN:VCALENDAR/)  i=1
	if (i>0 && i<6)	
		i=i+1
	else if (i==6) {
		i=0
		print $0		
	}
	else
		print $0	
}