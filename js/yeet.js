//hide things
$('#finalss, #schh, #gclas-input, #meet-input, #customize, #studyhallform, #cs_images, #comp, #wallpapers').hide();

//date display
var dd = new Date();
var d = dd.getDay();
var m = dd.getMonth();
var n = dd.getDate();
var y = dd.getFullYear();

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

  var finalt = h + ":" + m + ":" + s;
  $("#time").html(finalt);

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
$("#fav").attr('href','images/daily_icons/'+n+'.png');

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

      if((localStorage.getItem('sched-'+p)+" notes").includes("study hall")){
        console.log("there's a study hall period "+ p +" so no notes here");
        $("#p"+p).hide();
      }
    }

    if(localStorage.getItem('gclas-'+p)){ // if google classroom links have been added, put them as the href for the a's
      $("#cla"+p).attr("href", localStorage.getItem('gclas-'+p));
    }

    if(localStorage.getItem('meet-'+p)){ // if the google meet links have been added, use them
      $("#vid"+p).attr("href", localStorage.getItem('meet-'+p));
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

$("#cb").click(function(){
  $("#customize").slideDown();
  $("#cs_images").slideUp();
});
$("#cc").click(function(){ $("#customize").slideUp(); });

$("#o_cs").click(function(){
  $("#cs_images").slideDown();
  $("#customize").slideUp();
  $("#wallpapers").slideUp();
});
$("#cscc").click(function(){
  $("#cs_images").slideUp();
});

function changeCSS(a,b,c,d,e,f,g){
  if(localStorage.getItem("designType")==="colors"){
    $("textarea").css("border","none");
    $("textarea").css("color",'black');
    $("#header, #main, #main a").css("color",a);
    $("body").css("background",b);
    $(".tcontainer").css("background",c);
    $("textarea").css("background",d);
    $("#logo").attr("src","images/logos/"+e+".png");
    $(".tcontainer, .tcontainer a").css("color",g);
    $(".tcontainer, .tcontainer a").css("text-decoration-color",g);
    if(e==="transparent"){
      if(f==='True'){
        $("#logo").css("background",a);
        console.log("needy transparent background");
      }
      else{
        $("#logo").css("background",b);
      }
    }
    var tema = localStorage.getItem("cs");
    if(tema==="_og"){
      $("textarea").css("background",'white');
      $("textarea").css("border","1px solid black");
    }
    else if(tema==="_oy"){
      $("textarea").css("color",'white');
    }
    if(tema==="_xm"){
      $("textarea").css("color",'white');
      console.log("should trigger takeOff() now 🎄");
      takeOff();
    }
  }
  else if(localStorage.getItem("designType"==="image")){
    console.log('yeet');
    $("body").css("background","url("+localStorage.getItem("wu")+")");
    $("body").css("background-position","center");
    $("body").css("background-size","cover");
    $("body").css("background-attachment", "fixed");
  }
}

function refreshCSS(){
// text color, background color, border + scroll bar background color, input background color, variety of logo, needs the logo text to be same as text color NOT background, scroll bar color
  var wh = "white";
  var bl = "black";
  
  $("#lcc").width($("#mttf").width()+"px");
  // gradients + color themes
  var choices = {
    _mi:[wh,bl,bl,wh,bl,'false',wh],
    _og:[bl,wh,bl,bl,bl,'false',wh],
    _ne:["#2a211d","#faf6f4","#937465",wh,'transparent', 'True',wh],
    _oc:[wh,"linear-gradient(#a0cee5,#5b96b4)",'rgba(0,0,0,0)','rgba(255,255,255,0.85)', "transparent",'false',wh],
    _oy:["#004060","white","#004060","#004060","transparent",'True',wh],
    _pl:[wh,"linear-gradient(#Ffce9f,#ff849c)","rgba(0,0,0,0)",'rgba(255,255,255,0.8)',"transparent",'false',wh],
    _hl:[wh,"linear-gradient(#b8564b,#6c307c)",'rgba(0,0,0,0)','rgba(255,255,255,0.8)',"transparent",'false',wh],
    _bl:[wh,"linear-gradient(#9f4f0c,#f2c59f)","rgba(0,0,0,0)",'rgba(255,255,255,0.6)',"transparent",'false',wh],
    _fi:[wh,"linear-gradient(#a88678,black)","rgba(0,0,0,0)", wh, 'transparent','false',wh],
    _xm:[bl,,"rgba(0,0,0,0)","#924040",'transparent', 'True','#b4452d'],
    _ny:[bl,"url(https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1)"],
    // image wallpapers below this
    _wi:[bl,"url(images/wallpapers/adam-chang-IWenq-4JHqo-unsplash.jpg)",'rgba(0,0,0,0)','rgba(255,255,255,0.8)']
  };

  var tcs = localStorage.getItem("cs");
  changeCSS(choices[tcs][0],choices[tcs][1],choices[tcs][2],choices[tcs][3],choices[tcs][4],choices[tcs][5],choices[tcs][6]);
}

$("#cs_images img").click(function(){
  //localStorage.setItem("designType","colors");
  localStorage.setItem("cs",$(this).attr("id"));
  console.log(localStorage.getItem("cs"));
  refreshCSS();
});

window.addEventListener("resize", function () {
    refreshCSS();
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

  if(seconds<0&&minutes<0&&hours<0){
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

if(d===0||d===6){
  console.log("It's the weekend, enjoy! The countdown will show Monday @ 12.");
  $("#exp, .hh3").hide();
}

var yee = {'8':[00],'9':[20,26],'10':[46,52],'11':[],'12':[43,49],'13':[],'14':[9]};
var yee2 = {'8':[00,40,45],'9':[25,30],'10':[10,15,55],'11':[00,30,35],'12':[15,20],'13':[00,05,45,50],'14':[30]};

var countDownTime = setInterval(function(){
  var day = d;
  var hour = dd.getHours();
  var minutes = dd.getMinutes();
  var seconds = dd.getSeconds();
  var daysin = [31,28,31,30,31,30,31,31,30,31,30,31]; // how many days are in each month. don't forget like april did - https://www.youtube.com/watch?v=jpwelTxlcQs

  var tings = function(){
    if(day!=5){// for everyday except friday, countdown to tomorrow @ 8:00
      if(n+1<=daysin[m]){
        displayCount(countDown(n+1,m,y,8,00,0));
      }
      else{
        displayCount(countDown(1,m+1,y,8,00,0));
      }
    }
    else{ //for fridays, NO COUNTDOWN BC IT'S THE WEEKEND NOW
      displayCount("");
      $("#exp").hide();
    }
  }

  if(day===0||day===6){ //sunday & saturday
    displayCount("");
  }

  else if(day===3){ //wednesdays
    console.log("it's wednesday my dude!!")

    if(hour<8){//countdown to 8/zero hour DONE
      displayCount(countDown(n,m,y,8,0,0));
      console.log('layer 1');
    }
    else if(hour >= 8 && hour < 15){
      if(minutes < yee2[hour][0]){
        displayCount(countDown(n,m,y,hour,yee2[hour][0],0));
        console.log('layer 2');
      }
      else{
        if(minutes<yee2[hour][1]){
          displayCount(countDown(n,m,y,hour,yee2[hour][1],0));
          console.log('layer 3');
        }
        else{
          if(minutes<yee2[hour][2]){
            displayCount(countDown(n,m,y,hour,yee2[hour][2],0));
            console.log('layer 4');
          }
          else{
            if(minutes<yee2[hour][3]){
              displayCount(countDown(n,m,y,hour,yee2[hour][3],0));
              console.log('layer 5');
            }
            else if(yee2.hasOwnProperty(hour+1)){
            console.log('layer 6');
              displayCount(countDown(n,m,y,hour+1,yee2[hour+1][0],0));
            }
            else{
              console.log('last layer');
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
  }

  else{ // not wednesdays
    if(yee[hour]){
      if(hour<8){ //right before school
        displayCount(countDown(n,m,y,8,00,0));
      }
      else if(hour===8){
        displayCount(countDown(n,m,y,9,20,0));
      }
      else if(hour===11){
        displayCount(countDown(n,m,y,12,43,0));
      }
      else if(hour===12&&minutes>=49){
        displayCount(countDown(n,m,y,14,09,0));
      }
      else if(yee[hour].length===2){
        if(minutes<yee[hour][0]){
          displayCount(countDown(n,m,y,hour,yee[hour][0],0)); // if it's the first countdown of the hr
        }
        else if(minutes>=yee[hour][0]&&minutes<yee[hour][1]){ // count to passing period
          displayCount(countDown(n,m,y,hour,yee[hour][1],0));
        }
        else if(hour===10&&minutes>=52){
          displayCount(countDown(n,m,y,12,yee[hour][0],0));
        }
        else{
          displayCount(countDown(n,m,y,hour+1,yee[hour + 1][0],0)); // count to first item of next array
        }
      }
      else{
        if(hour===14&&minutes<9){
          displayCount(countDown(n,m,y,14,09,0));
        }
        if(hour===13){
          displayCount(countDown(n,m,y,14,09,0));
        }
        else{
          tings();
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

var maint = function(a){
  $("body").hide();
  $("#heyo").text("come back on " + a);
  $("html").append("<br> <h1 style='text-align:center;'> countdown will be back up on "+a+" for the start of 2nd semester. </h1>");
}
