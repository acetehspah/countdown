// START CLOCK SCRIPT;
var items = [
  ["School Starts"],
  ["School Starts", "First Period Starts", "First Period Ends", "Second Period Starts", "Second Period Ends", "Third Period Starts", "Third Period Ends", "Brunch Ends", "Fourth Period Starts", "Fourth Period Ends", "Fifth Period Starts", "Fifth Period Ends", "Lunch Ends", "Sixth Period Starts", "Sixth Period Ends", "Seventh Period Starts", "Seventh Period Ends", "School Starts"],
  ["School Starts", "First Period Starts", "First Period Ends", "Second Period Starts", "Second Period Ends", "Tutorial Ends", "Third Period Starts", "Third Period Ends", "Brunch Ends", "Fourth Period Starts", "Fourth Period Ends", "Fifth Period Starts", "Fifth Period Ends", "Lunch Ends", "Sixth Period Starts", "Sixth Period Ends", "Seventh Period Starts", "Seventh Period Ends", "School Starts"],
  ["School Starts", "Second Period Starts", "Second Period Ends", "Brunch Ends", "Fourth Period Starts", "Fourth Period Ends", "Lunch Ends", "Sixth Period Starts", "Sixth Period Ends", "School Starts"],
  ["School Starts", "First Period Starts", "First Period Ends", "Third Period Starts", "Third Period Ends", "Brunch Ends", "Fifth Period Starts", "Fifth Period Ends", "Lunch Ends", "Seventh Period Starts", "Seventh Period Ends", "School Starts"],
  ["School Starts", "First Period Starts", "First Period Ends", "Second Period Starts", "Second Period Ends", "Tutorial Ends", "Third Period Starts", "Third Period Ends", "Brunch Ends", "Fourth Period Starts", "Fourth Period Ends", "Fifth Period Starts", "Fifth Period Ends", "Lunch Ends", "Sixth Period Starts", "Sixth Period Ends", "Seventh Period Starts", "Seventh Period Ends", "School Starts"],
  ["School Starts"]
];
var timeSchedule = [
  [3130],
  [730, 735, 825, 830, 920, 925, 1020, 1035, 1040, 1130, 1135, 1225, 1305, 1310, 1400, 1405, 1455, 3130],
  [730, 735, 820, 825, 910, 945, 950, 1040, 1055, 1100, 1145, 1150, 1235, 1315, 1320, 1405, 1410, 1455, 3130],
  [910, 915, 1050, 1105, 1110, 1245, 1325, 1330, 1405, 3130],
  [730, 735, 910, 915, 1050, 1105, 1110, 1245, 1325, 1330, 1405, 3130],
  [730, 735, 820, 825, 910, 945, 950, 1040, 1055, 1100, 1145, 1150, 1235, 1315, 1320, 1405, 1410, 1455, 7930],
  [5530]
  ];
var index = -1,
    milliT = 999,
    secT = 59,
    minT = 59,
    houT = 23,
    dayT = -1;
var notlit = document.getElementsByClassName("notlit");
var lit = document.getElementsByClassName("lit");
var secOffset = 42;

Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  var msg = document.getElementById("msg");
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear(),
    day = now.getDay();

  sec = sec + secOffset;
  min += Math.floor(sec/60);
  hou += Math.floor(min/60);
  day += Math.floor(hou/24);
  sec %= 60;
  min %= 60;
  hou %= 24;
  day %= 6;

  if(day != dayT)
    {
      for(var i = 0; i < timeSchedule[day].length; i++)
      {
        if(timeSchedule[day][i] > hou * 100 + min)
        {
          houT = Math.floor(timeSchedule[day][i]/100);
          minT = timeSchedule[day][i] % 100;
          index = i;
          break;
        }
      }
    }
  else if(timeSchedule[day][i] <= hou * 100 + min)
  {
    index++;
    houT = Math.floor(timeSchedule[day][i]/100);
    minT = timeSchedule[day][i] % 100;
  }
  if(items[day][index].includes("Period Ends"))
  {
    for(i = 0; i < notlit.length; i++)
    {
      notlit[i].style.display = "initial";
    }
    for(i = 0; i < lit.length; i++)
    {
      lit[i].style.display = "none";
    }
  }
  else
  {
    for(i = 0; i < lit.length; i++)
    {
      lit[i].style.display = "initial";
    }
    for(i = 0; i < notlit.length; i++)
    {
      notlit[i].style.display = "none";
    }
  }

  msg.firstChild.nodeValue = items[day][index];
  var dayoo = (houT - hou) % 24,
      hour = houT - hou,
      minute = minT - min,
      seconds = secT - sec,
      milliseconds = milliT - milli;
  
  
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var tagT = ["dT", "hT", "mT", "sT", "miT"],
      corrT = [Math.floor((houT - hou) / 24),((houT - hou) % 24 + Math.floor(Math.sign(minT-min)/2)).pad(2), ((minT - min + 59)%60).pad(2), (secT - sec).pad(2), (milliT - milli).pad(3)];

if((houT - hou) / 24 < 1 )
{
  document.getElementById("dT").style.display = "none";
  document.getElementById("dTag").style.display = "none";
}
else{
  document.getElementById("dT").style.display = "initial";
  document.getElementById("dTag").style.display = "initial";
  if((houT - hou) / 24 >= 2)
  {
    document.getElementById("dT").nodeChild = "days";
  }
  else
  {
    document.getElementById("dT").nodeChild = "day";
  }
}
  for(var i = 0; i<tagT.length; i++)
    document.getElementById(tagT[i]).firstChild.nodeValue = corrT[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

// END CLOCK SCRIPT