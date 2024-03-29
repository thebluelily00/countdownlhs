//hide things
$('#mtha, #tf, #mthb, #wed, #ov_onlyclose, #exp, #angle,#bc-2, #os_cont, #finalss, #cs_images,.c_s, #comp, #color_theme, #wallpaper, #custom_theme, #custom_wallpaper, #custom_bulletpoint, #bulletpoints, #custom_gradient, .settings, #change_classes, #change_links').hide();
$("body").hide();

// first thing it does, ensures proper schedule display
if(!localStorage.getItem('sc-t')){
  //if you haven't told the website what your lunch period is
  //console.log('Nothing is saved for schedule type.');
  $('body').hide();

  var sAns = prompt('Do you have lunch A, B, or C?').toLowerCase();
  localStorage.setItem('sc-t',sAns);

  $("body").show();
}
// add something in settings to change this if someone's schedule changes!!
else{
  //console.log('Schedule type: '+localStorage.getItem('sc-t'));
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
  if(datee===1||datee===21||datee===31){
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

// 1 = monday, 2 = tuesday, 3 = wednesday, 4 = thursday, 5 = friday
// thanks meg :)
var tr = {'1':'normal', '2':'normal','3':'plc','4':'normal','5':'normal'};  //assigns a schedule type to each day
var hoy = tr[d]+localStorage.getItem('sc-t'); //establishes what schedule should be used this day

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var today = days[d] + ", " + months[m] + " " + n + ending(n); // the text that actually shows for the date
// END DATE INFO

//time + date display
$("#date").text(today); // actually makes the date text show what today is. this should eventually be updated so that it reflects what day it is if there's a day change
$("#fav").attr('href','images/daily_icons/'+n+'.png');  // make the favicon show the number for the date on the calendar
//console.log("today's date is "+n+" so the favicon should say that number.");

// FINALS CALCULATOR

$('#opencalc').click(function(){ //open finals calcs
  $('#heheh, #opencalc').css('display','block');
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
  $('#heheh, #opencalc').css('display','inline');
  $('#heheh, #opencalc').css('text-align','left');
  $('#allfinalss').css('padding','0px');
});

// END OF FINALS CALCULATOR


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
    else{
      $("#cla"+p).hide();
      //console.log("no google classroom link here");
    }

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
  $(".cont").slideUp();
  $(".settings").slideDown();
});

$("#close-settings").click(function(){
  $(".settings").slideUp();
  $(".cont").slideDown();
});


/*
ALL OF THE
SETTINGS CODE
IMPORTANTE
*/

// set defaults for settings. show date, show time (not in military), and show seconds. make font be monospace
var timesettings = {'show_date':true,'show_time':true,'show_mtime':false,'show_seconds':true};
var csssettings = {'font':'monospace'};
var parseFonts = {'sans-serif':'elza, sans-serif',
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

$("#lun").val(localStorage.getItem('sc-t'));
$("#lun").change(function(event){
  event.preventDefault()
  var l = $(this).val();
  if(l === 'a' || l === 'A'){
    localStorage.setItem('sc-t','a');
  }
  else if(l === 'b' || l === 'B'){
    localStorage.setItem('sc-t','b');
  }
  else if(l === 'c' || l === 'C'){
    localStorage.setItem('sc-t','c');
  }
  console.log(localStorage.getItem('sc-t'));
});
$("#lun").keypress( function(e) {
    var chr = String.fromCharCode(e.which);
    if ("abc".indexOf(chr) < 0)
        return false;
});


switch (localStorage.getItem('btype')){
  case 'gradient':
    //console.log("a gradient was saved. make it show this.");
    $("#dos").checked = true;
    $("#bc-2").show();
    $("#angle").show();
    break;
  case 'color':
    //console.log("a color was saved. make it show this.");
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
  //console.log('parsed font is '+font);

  var background = localStorage.getItem('background');
  var color = localStorage.getItem('color');
  //console.log('background is '+background);
  //console.log('color is '+color);

  $("body").css('font-family', font);
  $("html").css('background', background);
  $("html, a, #new_todo, #mm2").css('color', color);
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
  $(".test_theme").css('border-color',$("#text_color").val());
}); // make the example reflect whatever's in the input box

//console.log($("input[name=bac]:checked").val());
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

var todos = [];

/*function refreshTodos(){
  if(localStorage.getItem('todos')){
    console.log("there is a todo list!");
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  else{
    console.log("there is no todo list yet");
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  var tdrs = []

  var i = 0;
  while(i<todos.length){
    tdrs.push("<p><i class='fa-solid fa-check done'></i> "+todos[i]+" <i class='fa-solid fa-xmark remove'></i></p>");
    i ++;
  }
  $("#todo_cont").html(tdrs);
}
refreshTodos();
$("#new_td_cont").submit(function(event){
  event.preventDefault();
  var nt = $("#new_todo").val();
  todos.push(nt);
  console.log("New todo is "+nt+" and the list of todos is "+todos);
  refreshTodos();
});*/
function refreshTodos(){
  if(localStorage.getItem('todos') === null || JSON.parse(localStorage.getItem('todos')).length === 0){
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Nothing saved in storage, make it equal to todos var');
  }
  todos = JSON.parse(localStorage.getItem('todos'));
  console.log('local storage says '+JSON.parse(localStorage.getItem('todos'))+ " and website says "+todos);

  var tdrs = []
  var i = 0;
  while(i<todos.length){
    tdrs.push("<p><i class='fa-solid fa-check done' id='check"+i+"' title='Refresh the page if a todo is not deleting'></i> "+todos[i]+"</p>");
    i ++;
  }
  $("#todo_cont").html(tdrs);
}
refreshTodos();

$("#new_td_cont").submit(function(event){
  event.preventDefault();

  todos.push($("#new_todo").val());
  localStorage.setItem('todos',JSON.stringify(todos));
  console.log("Todos var is "+todos);
  $("#new_todo").val('');
  refreshTodos();
});

$(".done").on("click",function(event){
  event.preventDefault();
  var idd = $(this).attr('id');
  var num = idd.slice(-1);
  todos.splice(num,1);
  localStorage.setItem('todos',JSON.stringify(todos))
  refreshTodos();
});

$("#op_c").click(function(){
  $("#change_classes").slideDown();
  $("#li_cont, #lunch-change").slideUp();
});
$("#op_l").click(function(){
  $("#change_links").slideDown();
  $("#cl_cont, #lunch-change").slideUp();
});
$("#close_links").click(function(){
  $("#change_links").slideUp();
  $("#cl_cont, #lunch-change").slideDown();
});
$("#close_classes").click(function(){
  $("#change_classes").slideUp();
  $("#li_cont, #lunch-change").slideDown();
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
  'fesa':{'6':[55], '7':[45,50], '8':[35,39],'9':[24,28],'10':[13,15,43,47],'11':[32,36],'12':[01,05,59],'13':[03,48,52],'14':[37]}, // 5 essentials survey for a-c
  'fesb':{'6':[55], '7':[45,50], '8':[35,39],'9':[24,28],'10':[13,15,43,47],'11':[32,36],'12':[01,05,30,34,59],'13':[03,48,52],'14':[37]},
  'fesc':{'6':[55], '7':[45,50], '8':[35,39],'9':[24,28],'10':[13,15,43,47],'11':[32,36],'12':[30,34,59],'13':[03,48,52],'14':[37]},

};

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
    }
  } //not affected by update

  if(day===0||day===6){ //sunday & saturday
    displayCount("");
  }
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
    }
  }
  // 0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday
}, 1000);

var maint = function(){
  $("body").hide();
  $("#heyo").text("countdownLHS");
  $("html").append("<br> <h1 style='text-align:center;'>countdownLHS is having unexpected issues, sorry! Everything will be back up soon.</h1>");
}

//maint();
