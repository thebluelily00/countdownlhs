//hide things
$('#mtha, #tf, #mthb, #wed, #ov_onlyclose, #exp, #angle,#bc-2, #os_cont, #finalss, #cs_images,.c_s, #comp, #color_theme, #wallpaper, #custom_theme, #custom_wallpaper, #custom_bulletpoint, #bulletpoints, #custom_gradient, .settings').hide();
$("body").hide();
// first thing it does, ensures proper schedule display
if(!localStorage.getItem('sc-t')){ //if you haven't told the website what your lunch period is
  console.log('nothing saved for schedule type');
  $('body').hide();
  var sAns = prompt('do you have lunch A, B, or C?').toLowerCase();
  localStorage.setItem('sc-t',sAns);
  $("body").show();
} // add something in settings to change this if someone's schedule changes
else{ //if you open the site and you've already inputted, it'll just be printed to the log
  console.log('your schedule type is '+localStorage.getItem('sc-t'));
  $("body").show();
}


// FUNCTIONS TO PROCESS TEXT
function rU(a){ //remove underscore
  return neww = a.replace("_", " ");
}
function addDash(b){
  return b.replace(/\s/, '-');
}
function fixOpt(p){
  var re = p.replace(/\s/g, '').replace(/ed/g, '').replace(/\//g, '').toLowerCase();
  return re;
}
// END OF TEXT PROCESSING FUNCTIONS


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

// DATE VARIABLES AND INFO TO BE USED + DISPLAYED
var dd = new Date();
var d = dd.getDay();
var m = dd.getMonth();
var n = dd.getDate();
var y = dd.getFullYear();

var tr = {'1':'finals', '2':'finals','3':'finals','4':'normal','5':'normal'};  //assigns a schedule type to each day
var hoy = tr[d]+localStorage.getItem('sc-t'); //establishes what schedule should be used this day

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var today = days[d] + ", " + months[m] + " " + n + ending(n); // the text that actually shows for the date
// END DATE INFO


/*
after these weeks:
make case 4 be case 5
make tr 3&4 be 4&5 for normal thursday & friday schedule
uncomment case 3 for wednesdays
*/

// display proper schedule based on what day it is. choose that option on the select element.
switch (d) {
  case 0:
  case 6:
    $(".schedules").hide();
    break;
  /*case 3:
    $(".schedules:not(#wed)").hide();
    $("#wed").show();
    $("#sched-opts").prop('selectedIndex',3);
    break;*/
  case 5: // THIS SHOULD ALSO HAVE 2 for TUESDAY
    console.log(d);
    $(".schedules:not(#tf)").hide();
    $("#tf").show();
    $("#sched-opts").prop('selectedIndex',2);
    break;
  default:
    console.log("#"+hoy);
    $(".schedules:not(#"+hoy+")").hide();
    $("#"+hoy).show();
    var ind = {'mtha':0,'mthb':1,'tf':2,'wa':3,'wb':4};
    $("#sched-opts").prop('selectedIndex',ind[hoy]);
}

$("#sched-opts").change(function(){
  var thingy = fixOpt($(this).val());
  console.log(thingy);

  $("#"+ thingy).show();
  $(".schedules:not(#"+thingy+")").hide();
  $("#sched-opts").show();
});

//time + date display
$("#date").text(today); // actually makes the date text show what today is. this should eventually be updated so that it reflects what day it is if there's a day change
console.log("today's date is "+n);
$("#fav").attr('href','images/daily_icons/'+n+'.png');  // make the favicon show the number for the date on the calendar


//finals calculator
$('#hehe').click(function(){ //open finals calcs
  $('#heheh, #hehe').css('display','block');
  $('#allfinalss').css('padding','10px');
  $("#finalss").slideDown();
}); //RENAME THIS ELEMENT IN THE HTML

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
// END OF FINALS STUFF


// STORE INFO ON CLASS SCHEDULE, GOOGLE CLASSROOM URLs, GOOGLE MEETS CODES, AND NOTES
$('.ci').click(function(){
  var answer = prompt("What class do you have this period?");
  localStorage.setItem($(this).attr("id"),answer);
  refreshEverything();
});

$('.gc').click(function(){
  var answer = prompt("What's the URL for this period's Google Classroom?");
  if(answer.includes("https://")||answer.includes("http://"||answer.includes("https//")||answer.includes("http//"))){
    localStorage.setItem($(this).attr("id"),answer);
  }
  else{
    answer = "https://"+answer;
    console.log('the url for this google classroom is now '+answer);
    localStorage.setItem($(this).attr("id"),answer);
  }
  refreshEverything();
});

$('.meet').click(function(){
  var answer = prompt("What's the Google Meet URL for this class?");
  if(answer.includes("https://")||answer.includes("http://"||answer.includes("https//")||answer.includes("http//"))){
    localStorage.setItem($(this).attr("id"),answer);
  }
  else{
    answer = "https://"+answer;
    console.log('the url for '+ $(this).attr("id") +' is now '+answer);
    localStorage.setItem($(this).attr("id"),answer);
  }
  refreshEverything();
});

function refreshEverything(){ //keep all the data ppl have put in actually visible
  let p = 1;
  while(p<8){
    if(localStorage.getItem('sched-'+p)){ // if schedule is set up, show that it is
      $("#t"+p).attr("placeholder",localStorage.getItem('sched-'+p)+" notes");
      // ADD SOMETHING SO IT ADDS <TD>s TO EACH TABLE WITH YOUR SCHEDULE INFO HERE

      if((localStorage.getItem('sched-'+p)+" notes").includes("study hall")){
        console.log("there's a study hall period "+ p +" so no notes here");
        $("#p"+p).hide();
      } // get rid of study hall text box that DOESN'T NEED TO EXIST
    }

    if(localStorage.getItem('gclas-'+p)){ // if google classroom links have been added, put them as the href for the a's
      $("#cla"+p).attr("href", localStorage.getItem('gclas-'+p));
      console.log("there IS a gclas link here");
    }
    else{ $("#cla"+p).hide(); console.log("no google classroom link here"); }

    if(localStorage.getItem('meet-'+p)){ // if the google meet links have been added, use them
      $("#vid"+p).attr("href", localStorage.getItem('meet-'+p));
      console.log("there IS a gclas meet link here");
    }
    else{ $("#vid"+p).hide(); console.log("no meet link here");}

    if(localStorage.getItem('t'+p)){ // if there are notes written, put them in the textareas
      console.log('there are notes for period '+p);
      $("#t"+p).val(localStorage.getItem('t'+p));
    }
    p++;
  }
}

$('.notes').on('change keyup paste', function(){
  localStorage.setItem($(this).attr('id'),$(this).val());
});
// END DATA ENTRY INFO

// BUTTONS TO OPEN & CLOSE SETTINGS
$("#open-settings").click(function(){
  $(".cont").hide();
  $(".settings").fadeIn();
});

$("#close-settings").click(function(){
  $(".settings").hide();
  $(".cont").fadeIn();
});


/*
ALL OF THE
SETTINGS CODE
IMPORTANTE
*/

// set defaults for settings. show date, show time (not in military), and show seconds. make font be monospace
var timesettings = {'show_date':true,'show_time':true,'show_mtime':false,'show_seconds':true};
var csssettings = {'font':'monospace'};
var parseFonts = {'sans-serif':'San Fransisco, sans-serif',
                  'serif':'playfair-display, serif',
                  'monospace':'source-code-pro, monospace'};

// get defaults set for time settings, and fill in the checkboxes that correspond when appropriate
if(!localStorage.getItem('show_date')){ localStorage.setItem('show_date',timesettings.show_date); }
else{ if(localStorage.getItem('show_date')==='true'){ $("#show_date").prop('checked', true); } }
if(!localStorage.getItem('show_time')){ localStorage.setItem('show_time',timesettings.show_time); }
else{ if(localStorage.getItem('show_time')==='true'){ $("#show_time").prop('checked', true); } }
if(!localStorage.getItem('show_mtime')){ localStorage.setItem('show_mtime',timesettings.show_mtime); }
else{ if(localStorage.getItem('show_mtime')==='true'){ $("#show_mtime").prop('checked', true); } }
if(!localStorage.getItem('show_seconds')){ localStorage.setItem('show_seconds',timesettings.show_seconds); }
else{ if(localStorage.getItem('show_seconds')==='true'){ $("#show_seconds").prop('checked', true); } }

// if font is saved, use font
if(!localStorage.getItem('font')){ localStorage.setItem('font',csssettings.font);}

switch (localStorage.getItem('btype')){
  case 'gradient':
    console.log("a gradient was saved. make it show this.");
    $("#dos").checked = true;
    $("#bc-2").show();
    $("#angle").show();
    break;
  case 'color':
    console.log("a color was saved. make it show this.");
    $("#uno").checked = true;
    $("#bc-2").hide();
    $("#angle").hide();
    break;
}

//time display
function tellTime() { // if toggled, not millitary time. if secondss, show seconds
  var nd = new Date();
  var hour = nd.getHours();
  var minutes = nd.getMinutes();
  var seconds = nd.getSeconds();

  var mtime = localStorage.getItem('show_mtime');
  var showsec = localStorage.getItem('show_seconds');

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  function makeNormal(i){
    if (i>12){ i = i - 12;}
    return i;
  }

  if(mtime==='true'){
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    if(showsec==='true'){
      var finalt = hour + ":" + minutes + ":" + seconds;
      //console.log('Military time, showing seconds.');
      $("#time").html(finalt);
    }
    else{
      var finalt = hour + ":" + minutes;
      //console.log('Military time, not showing seconds.');
      $("#time").html(finalt);
    }
  }
  else{ // military time
    hour = makeNormal(hour);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    if(showsec==='true'){
      var finalt = hour + ":" + minutes + ":" + seconds;
      //console.log('NOT military time, showing seconds.');
      $("#time").html(finalt);
    }
    else{
      var finalt = hour + ":" + minutes;
      //console.log('NOT military time, not showing seconds.');
      $("#time").html(finalt);
    }
  }

  var t = setTimeout(tellTime, 1000);
}

function reloadTS(){ //sync time + date settings w/ settings from localStorage
  if(localStorage.getItem('show_date')==='true'){ $("#date").show();}
  else{$("#date").hide();}

  if(localStorage.getItem('show_time')==='true'){ $("#time").show();}
  else{$("#time").hide();}
}

function reloadCSS(){ // put the settings from localStorage into the actual CSS
  var font = parseFonts[localStorage.getItem('font')];
  console.log('parsed font is '+font);

  var background = localStorage.getItem('background');
  var color = localStorage.getItem('color');
  console.log('background is '+background);
  console.log('color is '+color);

  $("body").css('font-family', font);
  $("html").css('background', background);
  $("html, a, #new_todo").css('color', color);
}

function loadCSSset(){ // change var values to be the values from localStorage
  if(localStorage.getItem('font')){
    $('#font').prop('selectedIndex', localStorage.getItem('font-num'));
  }
  if(localStorage.getItem('theme')){
    $('#theme').prop('selectedIndex', localStorage.getItem('theme-num'));
  }
  if(localStorage.getItem('t-spec')){
    $('#tcc, #tc').prop('selectedIndex', localStorage.getItem('t-spec-num'));
  }

  if(localStorage.getItem('theme')==='t-pre'){
    $('#pre-op').slideDown();
    $('#cus-op').hide();
  }
  else{
    $('#cus-op').slideDown();
    $('#pre-op').hide();
  }
}

tellTime();
reloadTS();
reloadCSS();
loadCSSset();

// SAVE THE TIME + DATE SETTINGS WHEN CHANGES ARE MADE
$("#set_time input").change(function(event){
  event.preventDefault();
  localStorage.setItem($(this).attr('id'), $(this).is(':checked'));
  reloadTS();
});
$("#font").change(function(event){
  event.preventDefault();
  console.log($(this).prop('selectedIndex'));
  console.log($(this).val());
  localStorage.setItem($(this).attr('id'), $(this).val());
  localStorage.setItem('font-num',$(this).prop('selectedIndex'));
  reloadCSS();
});
$("#text_color").css('width','90px');

var btype = '';

$("#text_color").change(function(){
  $(".test_theme").css('color',$("#text_color").val());
}); // make the example reflect whatever's in the input box

console.log($("input[name=bac]:checked").val());
btype = $("input[name=bac]:checked").val();

$("#back-type input").change(function(event){
  btype = $(this).val();
  console.log(btype);
  if($(this).val()==='color'){ //if they want a color
    $("#bc-2").hide();
    $("#angle").hide();
  }
  else{
    $("#bc-2").show();
    $("#angle").show();
  }
});

$("#bc-1").change(function(event){
  if(btype==='color'){
    $(".test_theme").css('background',$("#bc-1").val());
  }
  else{ //put gradient in example box
    $(".test_theme").css('background',"linear-gradient("+$("#cga").val() +"deg,"+$("#bc-1").val()+","+$("#bc-2").val()+")");
  }
});
$("#bc-2").change(function(event){
  $(".test_theme").css('background',"linear-gradient("+$("#cga").val() +"deg,"+$("#bc-1").val()+","+$("#bc-2").val()+")");
});
$("#cga").change(function(event){
  $(".test_theme").css('background',"linear-gradient("+$("#cga").val() +"deg,"+$("#bc-1").val()+","+$("#bc-2").val()+")");
});

$("#ov_close").click(function(){
  switch (btype) {
    case 'gradient':
      localStorage.setItem('btype',btype);
      console.log('USING TWO COLORS');
      localStorage.setItem('color', $("#text_color").val());
      localStorage.setItem('background', 'linear-gradient('+ $("#cga").val() +"deg," +$("#bc-1").val() + ',' + $("#bc-2").val()+")");
      break;
    case 'color':
      localStorage.setItem('btype',btype);
      console.log('USING ONE COLOR');
      localStorage.setItem('color', $("#text_color").val());
      localStorage.setItem('background', $("#bc-1").val());
      break;
  }
  reloadCSS();
});

/*$("#ov_onlyclose").click(function(){
  $(".ov").fadeOut();
  $(".cent, #os_cont, #close-settings, #settings_header").fadeIn();
});*/

$("#exp").click(function(){
  $("#main, #exp").hide();
  $("#cd").css("font-size","11em");
  $(".hh3").css("display","block");
  $(".ehh, #comp").css("display","block");
  $("#comp").show();
});

$("#comp").click(function(){
  $("#main, #exp").show();
  $("#cd").css("font-size","5em");
  $(".hh3").css("display","inline-block");
  $(".ehh, #comp").css("display","inline-block");
  $("#comp").hide();
});

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

  if(seconds==='00'&&minutes==='00'&&hours==='00'){
    location.reload();
  }

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
  if(num===""){
    $("#heyo").text("CountdownLHS");
    $("#exp").hide();
  }
  else{
    $("#cd").text(num);
    $("#heyo").text(num + "  |  CDLHS");
  }
}

if(d===0||d===6){ $("#exp, .hh3").hide(); }

var alls = {
  'normala':{'6':[55], '7':[45,50], '8':[40,44],'9':[34,38],'10':[28,32],'11':[22,26,51,55],'12':[49,53],'13':[43,47],'14':[37]},
  'normalb':{'6':[55], '7':[45,50], '8':[40,44],'9':[34,38],'10':[28,32],'11':[22,26,51,55],'12':[20,24,49,53],'13':[43,47],'14':[37]},
  'normalc':{'6':[55], '7':[45,50], '8':[40,44],'9':[34,38],'10':[28,32],'11':[22,26],'12':[20,24,49,53],'13':[43,47],'14':[37]},
  'plca':{'6':[55], '7':[38,50], '8':[33,37],'9':[20,24],'10':[7,11,54,58],'11':[23,27],'12':[21,25],'13':[8,12,55]},
  'plcb':{'6':[55], '7':[38,50], '8':[33,37],'9':[20,24],'10':[7,11,54,58],'11':[23,27,52,56],'12':[21,25],'13':[8,12,55]},
  'plcc':{'6':[55], '7':[38,50], '8':[33,37],'9':[20,24],'10':[7,11,54,58],'11':[52,56],'12':[21,25],'13':[8,12,55]},
  'halfa':{'6':[55], '7':[45,50], '8':[17,21,48,52], '9':[19,23,50,54], '10':[21,25,52,56], '11':[22]},
  'halfb':{'6':[55], '7':[45,50], '8':[17,21,48,52], '9':[19,23,50,54], '10':[21,25,52,56], '11':[22]},
  'halfc':{'6':[55], '7':[45,50], '8':[17,21,48,52], '9':[19,23,50,54], '10':[21,25,52,56], '11':[22]},
  'assemblya':{'6':[55], '7':[45,50], '8':[30,34],'9':[14,58],'10':[02,42,44],'11':[09,13],'12':[07,11,51,55],'13':[35,39],'14':[37]},
  'assemblyb':{'6':[55], '7':[45,50], '8':[30,34],'9':[14,58],'10':[02,42,44],'11':[09,13,38,42],'12':[07,11,51,55],'13':[35,39],'14':[37]},
  'assemblyc':{'6':[55], '7':[45,50], '8':[30,34],'9':[14,58],'10':[02,42,44],'11':[38,42],'12':[07,11,51,55],'13':[35,39],'14':[37]},
  'veta':{'6':[55],'7':[45,50],'8':[37,39,55,59],'9':[46,50],'10':[37,41],'11':[28,32,57],'12':[01,55,59],'13':[46,50],'14':[37]},
  'vetb':{'6':[55],'7':[45,50],'8':[37,39,55,59],'9':[46,50],'10':[37,41],'11':[28,32,57],'12':[01,26,30,55,59],'13':[46,50],'14':[37]},
  'vetc':{'6':[55],'7':[45,50],'8':[37,39,55,59],'9':[46,50],'10':[37,41],'11':[28,32],'12':[26,30,55,59],'13':[46,50],'14':[37]},
  'finalsa':{'8':[00],'9':[30,45],'10':[],'11':[15,30],'12':[],'13':[00]},
  'finalsb':{'8':[00],'9':[30,45],'10':[],'11':[15,30],'12':[],'13':[00]},
  'finalsc':{'8':[00],'9':[30,45],'10':[],'11':[15,30],'12':[],'13':[00]},
};
//lunch A mt//tf scheds, then lunch B mt//tf scheds

var countDownTime = setInterval(function(){
  var dx = new Date();
  var day = d;
  var hour = dx.getHours();
  var minutes = dx.getMinutes();
  var seconds = dx.getSeconds();
  var daysin = [31,28,31,30,31,30,31,31,30,31,30,31]; // how many days are in each month. don't forget like april did - https://www.youtube.com/watch?v=jpwelTxlcQs

  var tings = function(){
    if(day!=5){// for everyday except friday, countdown to tomorrow @ 8:00
      if(n+1<=daysin[m]){
        displayCount(countDown(n+1,m,y,7,50,0));
      }
      else{
        displayCount(countDown(1,m+1,y,7,50,0));
      }
    }
    else{ //for fridays, NO COUNTDOWN BC IT'S THE WEEKEND NOW
      displayCount("");
      $("#exp, .hh3").hide();
      console.log("not a school day");
    }
  } //not affected by update

  if(day===0||day===6){ //sunday & saturday
    displayCount("");
  }
  /*else if(day===2){ //if it's a wednesday FIX THIS AFTER THIS WEEK, MAKE IT GO BACK TO 3
    if(hour<8){//countdown to 8/zero hour DONE
      displayCount(countDown(n,m,y,8,0,0));
    }
    else if(hour >= 8 && hour < 15){
      if(minutes < wed[hour][0]){
        displayCount(countDown(n,m,y,hour,wed[hour][0],0));
      }
      else{
        if(minutes<wed[hour][1]){
          displayCount(countDown(n,m,y,hour,wed[hour][1],0));
        }
        else{
          if(minutes<wed[hour][2]){
            displayCount(countDown(n,m,y,hour,wed[hour][2],0));
          }
          else{
            if(minutes<wed[hour][3]){
              displayCount(countDown(n,m,y,hour,wed[hour][3],0));
            }
            else if(wed.hasOwnProperty(hour+1)){
              displayCount(countDown(n,m,y,hour+1,wed[hour+1][0],0));
            }
            else{
              if(n+1<=daysin[m]){
                displayCount(countDown(n+1,m,y,8,0,0));
              }
              else{
                displayCount(countDown(1,m+1,y,8,0,0));
              }
            }
          }
        }
      }
    }
  }*/
  else{ // every day
    if(alls[hoy][hour]){
      if(hour<6){ //right before school
        displayCount(countDown(n,m,y,6,55,0));
      }
      else if(hour>6&&hour<15){// make a new thing to check what the start time is (in case of finals or something)
        if((hour===14&&minutes>=37)&&day===3){ //if it's after 2:37
          tings();
        }
        else{
          if(minutes < alls[hoy][hour][0]){
            console.log('layer 1');
            displayCount(countDown(n,m,y,hour,alls[hoy][hour][0],0));
          }
          else{
            if(minutes < alls[hoy][hour][1]){
              console.log('layer 2');
              displayCount(countDown(n,m,y,hour,alls[hoy][hour][1],0));
            }
            else{
              if(minutes < alls[hoy][hour][2]){
                console.log('layer 3');
                displayCount(countDown(n,m,y,hour,alls[hoy][hour][2],0));
              }
              else{
              if(minutes < alls[hoy][hour][3]){
                console.log('layer 4');
                displayCount(countDown(n,m,y,hour,alls[hoy][hour][3],0));
              }
              else{
                if(minutes < alls[hoy][hour][4]){
                  console.log('layer 5');
                  displayCount(countDown(n,m,y,hour,alls[hoy][hour][4],0));
                }
                else{
                  if(alls[hoy][hour+1][0]){
                    displayCount(countDown(n,m,y,hour+1,alls[hoy][hour+1][0],0));
                  }
                  else{
                    displayCount(countDown(n,m,y,hour+2,alls[hoy][hour+2][0],0));
                  }
                }
              }
              }
            }
          }
        }
      }
    }
    else{ // after school!
      tings();
      console.log('school is DONE for the day')
    }
  }
  // 0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday
}, 1000);


var maint = function(){
  $("body").hide();
  $("#heyo").text("have a great summer!");
  $("html").append("<br> <h1 style='text-align:center;'> have a great summer! </h1>");
}

//maint();
