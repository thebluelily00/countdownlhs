//hide things
$('#finalss, #schh, #gclas-input, #meet-input, #customize, #studyhallform').hide();

//date display
var dd = new Date();
var d = dd.getDay();
var m = dd.getMonth();
var n = dd.getDate();

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function ending(datee){ //make it like english + not like a robot
  if(datee===1||datee===21){
    return "st";
  }
  else if(datee===2||datee===22){
    return "nd";
  }
  else if(datee===3||datee===23){
    return "rd";
  }
  else{
    return "th";
  }
}

var today = days[d] + ", " + months[m] + " " + n + ending(n); // the text that actually shows for the date

$("#date").text(today); // send it

//time display
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  h = makeNormal(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
function makeNormal(i){
  if (i>12){ i = i - 12;}
  return i;
}

// make the favicon show the number for the date on the calendar
$("#fav").attr('href','daily_icons/'+n+'.png');

//finals calculator

$('#hehe').click(function(){ //open finals calcs
  $('#heheh, #hehe').css('display','block');
  $('#allfinalss').css('padding','10px');
  $("#finalss").slideDown();
});


$("#grades").submit(function(event){ //calculate final grades
  event.preventDefault();
  var r = Number($("#act").val());
  var w = Number($("#goal").val());
  var ned = (5*w)-(4*r);
  alert("In order to get "+w+" as your final score, \nyou'll need to score at least "+ned+" on your final exam.");
  $("#mas").slideDown();

  var stats = {'act':$("#act").val(), 'gr':[50,55,60,65,70,75,80,85,90,95,100], 'cl':[]};
  var i = 0;

  while(i<10){
    // 0.2 * gr[i] + 0.8*act
    stats.cl.push(0.2*stats.gr[i] + 0.8*stats.act);
    i ++;
  }

  var newss = [];
  for(a=0; a<stats.cl.length; a++){
    newss.push('     '+stats.gr[a]+"               "+stats.cl[a]);
  }

  var legitness = ''+newss[0]+'\n'+newss[1]+'\n'+newss[2]+'\n'+newss[3]+'\n'+newss[4]+'\n'+newss[5]+'\n'+newss[6]+'\n'+newss[7]+'\n'+newss[8]+'\n'+newss[9];

  $("#mas").click(function(){
    alert("Here's the rundown: \n \nFINALS        CLASS \nGRADE       GRADE \n \n"+legitness);
  });
});


$('#cf').click(function(){ // close finals info
  $('#finalss').slideUp();
  $('#heheh, #hehe').css('display','inline');
  $('#heheh, #hehe').css('text-align','left');
  $('#allfinalss').css('padding','0px');
});

// lets get a crazy amount of input + hope cookies can store it all bc honestly im not Resources

$('.ci').click(function(){
  var answer = prompt("What class do you have this period?");
  localStorage.setItem($(this).attr("id"),answer);
  refreshEverything();
});

$('.gc').click(function(){
  var answer = prompt("What's the URL for this period's Google Classroom?");
  if(answer.includes("https://www.")||answer.includes("http://www.")){
    localStorage.setItem($(this).attr("id"),answer);
  }
  else{
    answer = "https://www."+answer;
    console.log('the url for this google classroom is now '+answer);
    localStorage.setItem($(this).attr("id"),answer);
  }
  refreshEverything();
});

$('.meet').click(function(){
  var answer = prompt("What's the Google Meet URL for this class?");
  if(answer.includes("https://www.")||answer.includes("http://www.")){
    localStorage.setItem($(this).attr("id"),answer);
  }
  else{
    answer = "https://www."+answer;
    console.log('the url for this meet is now '+answer);
    localStorage.setItem($(this).attr("id"),answer);
  }
  refreshEverything();
});

function refreshEverything(){
  let p = 1;
  while(p<8){
    if(localStorage.getItem('sched-'+p)){
      $("#t"+p).attr("placeholder",localStorage.getItem('sched-'+p)+" notes");
    }

    if(localStorage.getItem('gclas-'+p)){
      console.log('there IS gclas-'+p);
      $("#cla"+p).attr("href", localStorage.getItem('gclas-'+p));
    }

    if(localStorage.getItem('meet-'+p)){
      console.log('there IS meet-'+p);
      $("#vid"+p).attr("href", localStorage.getItem('meet-'+p));
    }
    if(localStorage.getItem('t'+p)){
      console.log('there are notes for period '+p);
      $("#t"+p).val(localStorage.getItem('t'+p));
    }
    p++;
  }
}

$("#t1").on('change keyup paste', function(){
  localStorage.setItem('t1',$(this).val());
});
$("#t2").on('change keyup paste', function(){
  localStorage.setItem('t2',$(this).val());
});
$("#t3").on('change keyup paste', function(){
  localStorage.setItem('t3',$(this).val());
});
$("#t4").on('change keyup paste', function(){
  localStorage.setItem('t4',$(this).val());
});
$("#t5").on('change keyup paste', function(){
  localStorage.setItem('t5',$(this).val());
});
$("#t6").on('change keyup paste', function(){
  localStorage.setItem('t6',$(this).val());
});
$("#t7").on('change keyup paste', function(){
  localStorage.setItem('t7',$(this).val());
});


$("#bbb").click(function(){
  $('#gclas-input').slideDown();
  $('#meet-input').slideUp();
  $("#schh").slideUp();
});
$("#cgc").click(function(){$('#gclas-input').slideUp();});


$("#bc").click(function(){
  $('#meet-input').slideDown();
  $('#gclas-input').slideUp();
  $("#schh").slideUp();
});
$("#cgm").click(function(){$('#meet-input').slideUp();});


$("#ba").click(function(){
  $("#schh").slideDown();
  $('#meet-input').slideUp();
  $('#gclas-input').slideUp();
});
$("#csc").click(function(){$("#schh").slideUp();});

$("#bd").click(function(){
  $("#studyhallform").slideDown();
  $("#schh").slideUp();
  $('#meet-input').slideUp();
  $('#gclas-input').slideUp();
});
$("#cshf").click(function(){
  $("#studyhallform").slideUp();
});

$("#cb").click(function(){$("#customize").slideDown();});
$("#cc").click(function(){ $("#customize").slideUp(); });

//                                  |
//                                  |
//                                  |
// and here is the most important   |
//                                \   /
//                                 \ /
//                                  ˇ

function countDown(day, month, year, hour, minute, second){
  var months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  if(hour<10){
    hour = "0"+hour;
  }

  if(minute===0){
    minute = "00";
  }

  if(second===0){
    second = "00";
  }
  var thenn = months[month]+" "+day+", "+year+" "+ hour+":"+minute+":"+second;
  var then = new Date(thenn).getTime();

  var now = new Date().getTime();
  var t = then - now;
  var hours = Math.floor(t%(1000*60*60*24)/(1000*60*60));
  var minutes = Math.floor(t%(1000*60*60)/(1000*60));
  var seconds = Math.floor(t%(1000*60)/1000);

  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if(seconds<10){
    seconds = "0"+seconds;
  }

  if(hours==='00'){
    var dif = minutes+":"+seconds;
  }

  else{
    var dif = hours+":"+minutes+":"+seconds;
  }

  return dif;
}

function displayCount(num){
  $("#cd").text(num);
  $("#heyo").text("CountdownLHS  |  "+num);
}

var countDownTime = setInterval(function(){
  var day = d;
  var hour = dd.getHours();
  var minutes = dd.getMinutes();
  var seconds = dd.getSeconds();
  var daysin = [31,28,31,30,31,30,31,31,30,31,30,31]; // how many days are in each month. don't forget like april did - https://www.youtube.com/watch?v=jpwelTxlcQs

  if(day===0||day===6){ //sunday & saturday
    displayCount("");
  }

  else if(day===3){ //wednesdays
    if(hour<8){//countdown to 8/zero hour DONE
      displayCount(countDown(n,m,2020,8,0,0));
    }
    else if(hour>=8&&hour<12){
      if(minutes<25){
        displayCount(countDown(n,m,2020,hour,25,0));
      }
      else if(minutes>=25&&minutes<30){
        displayCount(countDown(n,m,2020,hour,30,0));
      }
      else if(minutes>=30&&minutes<55){
        displayCount(countDown(n,m,2020,hour,55,0));
      }
      else if(minutes>=55){
        displayCount(countDown(n,m,2020,hour+1,0,0));
      }
    }
    //else if for each period
    else{ // after hours, cd to next morning's classes
      if(n+1<=daysin[m]){
        displayCount(countDown(n+1,m,2020,9,0,0));
      }
      else{
        displayCount(countDown(1,m+1,2020,9,0,0));
      }
    }
  }

  else{ // mondays + thursdays
    if(hour<9){//countdown to 9/1st hour DONE
      displayCount(countDown(n,m,2020,9,0,0));
    }
    else if(hour>=9){
      if(hour<10){ // count to end of 1st
        displayCount(countDown(n,m,2020,10,0,0));
      }
      else{ // later than 10
        if(hour===10){
          if(minutes<15){
            displayCount(countDown(n,m,2020,10,15,0)); //countdown to 2nd hour start
          }
          else if(minutes>=15){
            displayCount(countDown(n,m,2020,11,15,0)); // countdown to end of 2nd
          }
        }
        else if(hour===11){
          if(minutes<15){
            displayCount(countDown(n,m,2020,11,15,0)); // countdown to end of 2nd
          }
          else if(minutes>=15&&minutes<45){
            displayCount(countDown(n,m,2020,11,45,0)); // countdown to end of lunch, beginning of 3rd
          }
          else{
            displayCount(countDown(n,m,2020,12,45,0)); // countdown to end of 3rd
          }
        }
        else if(hour===12){
          if(minutes<45){
            displayCount(countDown(n,m,2020,12,45,0)); // countdown to end of 3rd
          }
          else{
            console.log('should be counting to 1');
            displayCount(countDown(n,m,2020,13,00,00));// countdown to start of 4th
          }
        }
        else if(hour===13){
          console.log("yeet");
          displayCount(countDown(n,m,2020,14,0,0)); //countdown to end of 4th
        }
        else{
          if(day===1||day===4){//countdown to tomorrow @ 9
            if(n+1<=daysin[m]){
              displayCount(countDown(n+1,m,2020,9,0,0));
            }
            else{
              displayCount(countDown(1,m+1,2020,9,0,0));
            }
          }
          if(day===2){ //countdown to wed morning
            if(n+1<=daysin[m]){
              displayCount(countDown(n+1,m,2020,8,0,0));
            }
            else{
              displayCount(countDown(1,m+1,2020,8,0,0));
            }
          }
        }
      }
    }
  }
}, 1000);

// 0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday
