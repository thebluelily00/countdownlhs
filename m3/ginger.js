$(document).ready(function() {
  $(".test_theme, #color_theme, #wallpaper, #custom_theme, #custom_wallpaper, #custom_bulletpoint, #bulletpoints, #custom_gradient, .ov,.nag_g, .th_ch, #pre-op, #cus-op, .settings, #exp, #comp").hide();

  // password stuff
  $(".enterr").submit(function(event){
    event.preventDefault();
    if($("#password").val()==="rocktea"){
      console.log('yeet');
      $("#sub").text('🔓');
      $(".temp").slideUp();
      $(".cont").slideDown();
      console.log('fue un success');
    }
  });

  // random stuff to process strings

  function rU(a){ //remove underscore
    return neww = a.replace("_", " ");
  }
  function addDash(b){
    return b.replace(/\s/, '-');
  }

  function resizeOS(){
    var golden = (12.5*2)+$("#st_cont").width()+$("#sv_cont").width();
    $("#os_cont").css('max-width',golden);
  }

  $("#open-settings").click(function(){
    $(".cont").hide();
    $(".settings").fadeIn();
    resizeOS();
  });

  $("#close-settings").click(function(){
    $(".settings").hide();
    $(".cont").fadeIn();
  });

  $("#tc, #tcc").change(function(){
    $(".cent, #os_cont, #close-settings, #settings_header").fadeOut();
    $(".ov").fadeIn();

    $("#ov_label").text("change "+rU($(this).val()));
    $("#"+$(this).val()).show();
    $(".c_s:not(#"+$(this).val()+")").hide();
  });

  function turnIntoCheck(info,nume){
    return `<div class="todo_item_${nume} todo_item">\
            <input type="checkbox" onChange="this.form.submit(function(e){e.preventDefault();})" class="task-checkbox" name="task-${nume}">\
            <label for="task-${nume}">${info}</label></div>`;
  }

  var tasks = [];
  var ct = [];

  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  if(localStorage.getItem('completedTasks')){
    ct = JSON.parse(localStorage.getItem('completedTasks'));
  }

  function updateList(){
    var tasksToday = JSON.parse(localStorage.getItem('tasks'));
    var tasksHTMLcont = $('#todos');
    var tasksHTML = '';

    $.each(tasksToday, function(i){
      tasksHTML += turnIntoCheck(tasksToday[i],i);
    });

    tasksHTMLcont.html(tasksHTML);

    if(tasksToday.length>=2){
      $("#todos").css("column-count","2");
      $(".todo_item").css("margin-left","3px");
    }
  }

  $("#new_todo_form").submit(function(event){
    event.preventDefault();
    var newItem = $("#new_todo").val();
    console.log('submitted');
    console.log(newItem);

    tasks.push(newItem);

    console.log(tasks);
    console.log("your todos are "+tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    updateList();
    console.log(localStorage.getItem('tasks'));

    $("#new_todo").val("");
  });

  if(localStorage.getItem('tasks')){
    updateList();
  }

  $(".task-checkbox").on('change', function(event){
    event.preventDefault();
    var ind = $(this).attr('name').replace('task-','');
    var vall = $("label[for='" + $(this).attr('name') + "']").text();

    ct.push(vall);
    console.log(ct);
    localStorage.setItem('ct',JSON.stringify(ct));

    tasks.splice(ind, 1);
    console.log(tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    updateList();

    //console.log($(this+' input').attr('id')+' was checked');
  });

  $('#notes').on('change keyup paste', function(){
    localStorage.setItem($(this).attr('id'),$(this).val());
  });

  if(localStorage.getItem('notes')){
    $("#notes").val(localStorage.getItem('notes'));
  }

  var d = new Date();
  var m = d.getMonth();
  var dm = d.getDate();
  var dw = d.getDay();

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

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var today = days[dw] + ", " + months[m] + " " + dm + ending(n); // the text that actually shows for the date

  $("#date").text(today);

  var a = [1,3,5,9,11,15,17,19,24,26,30];
  var b = [2,4,8,10,12,16,18,22,25,29,31];

  var n = {
    '0':[15,18],
    '1':[12,15],
    '2':[],
    '3':[2,5,6,7,8,9],
    '4':[]
  };
  var e = {
    '0':[6,27],
    '1':[3,17,24],
    '2':[3,17,19,31],
    '3':[21],
    '4':[5,19,24,28]
  };

  // check if weekend||if it's no school DONE
  // if it's january, feb, march, or else
  // if it's even or odd
  // if it's early/ no attendance

  function whatDay(month,date,weekday){
    // m = month
    // d = day of month 1-31
    // dw = day of week 1-7 (1=sunday, 7=saturday)
    if(weekday!==0&&weekday!==6){
      switch (month) {
        case 0:
          if(date%2===0){ //if even, it's an A day
            return schedChecker(month,date,"A");
          }
          else{ //if odd, it's a B day
            return schedChecker(month,date,"B");
          }
          break;
        case 2:
          if(a[date]){ //it's an A day
            return schedChecker(month,date,"A");
          }
          else{ //it's a B day
            return schedChecker(month,date,"B");
          }
          break;
        default: //not jan, march
          if(date%2===0){ //if even otherwise, it's a B day.
            return schedChecker(month,date,"B");
          }
          else{
            return schedChecker(month,date,"A");
          }
      }
    }
    else{
      return 'weekend';
    }
  }

  function schedChecker(mo,da,tipo){
    if(n[mo].includes(da)){ //if there isn't school today
      return 'no school';
    }
    else if(e[mo].includes(da)){ //if today is early
      return 'early '+tipo;
    }
    else{ //if school is a normal day
      return 'normal '+tipo;
    }
  }

  var conday = whatDay(m,dm,dw);
  conday = addDash(conday);

  if(whatDay(m,dm,dw)==='weekend'||whatDay(m,dm,dw)==='no school'){
    $(".c3").hide();
    $("#sched-opts").show();
    $(".sct:not(#normal-A)").hide();
  }
  else{
    $("#"+conday).show();
    $(".sct:not(#"+conday+")").hide();
    $("#sched-opts").show();

    switch (conday) {
      case 'normal-A':
        $("#sched-opts").prop('selectedIndex',0);
        break;
      case 'normal-B':
        $("#sched-opts").prop('selectedIndex',1);
        break;
      case 'normal-a':
        $("#sched-opts").prop('selectedIndex',2);
        break;
      case 'normal-a':
        $("#sched-opts").prop('selectedIndex',3);
        break;
    }
  }

  $("#sched-opts").change(function(){
    var thingy = addDash($(this).val());
    $("#"+thingy).show();
    console.log(thingy);
    $(".sct:not(#"+thingy+")").hide();
    $("#sched-opts").show();
  });

  // calendar https://weber.wsd.net/index.php/student-services/2015-06-17-14-37-51

  // the schedule of (in order): normal a days, normal b days, wednesday a days, wednesday b days
  var todos = {
    'an':{'7':[40],'8':[],'9':[00,05],'10':[25],'11':[00,05],'12':[25,30],'13':[50]},
    'bn':{'7':[40],'8':[],'9':[00,05],'10':[25,30],'11':[50],'12':[25,30],'13':[50]},
    'aw':{'7':[40],'8':[25,30],'9':[15,20],'10':[05,40,45],'11':[30]},
    'bw':{'7':[40],'8':[25,30],'9':[15,20],'10':[05,10,55],'11':[30]}
  };

  //start of countdown code

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

  var countingDown = setInterval(function(){
    var dd = new Date();

    var day = dm;
    var hour = dd.getHours();
    var minutes = dd.getMinutes();
    var seconds = dd.getSeconds();

    var d = dd.getDay();
    var m = dd.getMonth();
    var n = dd.getDate();
    var y = dd.getFullYear();

    var con = {'normal A':'an','normal B':'bn','early A':'aw','early B':'bw'};
    var cvh = con[whatDay(m,dm,dw)];
    var hoy = whatDay(m,dm,dw);

    var daysin = [31,28,31,30,31,30,31,31,30,31,30,31]; // how many days are in each month. don't forget like april did - https://www.youtube.com/watch?v=jpwelTxlcQs

    var tings = function(){
      if(day!=5){// for everyday except friday, countdown to tomorrow @ 7:40
        if(n+1<=daysin[m]){
          displayCount(true, countDown(n+1,m,y,7,40,0));
        }
        else{
          displayCount(true, countDown(1,m+1,y,7,40,0));
        }
      }
      else{ //for fridays, NO COUNTDOWN BC IT'S THE WEEKEND NOW
        displayCount(false,'');
      }
    }

    if(hoy==='weekend'||hoy==='no school'){
      displayCount(false,' ');
    }

    else{ // always counting to 7:40
      if(hour<7||(hour===7&&minutes<40)){
        console.log("counting down to 7:40");
        displayCount(true, countDown(n,m,y,7,40,0));
      }
      else{ //after 7:40
        if(hoy==="early A"||hoy==="early B"){
          if(hour===7 && minutes>=40){
            displayCount(true, countDown(n,m,y,8,25,0));
          }
          else if(hour>7&&hour<12){
            if(hour===11&&minutes>=30){
              tings();
            }
            else{
              if(minutes < todos[cvh][hour][0]){
                console.log('layer 1');
                displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][0],0));
              }
              else{
                if(minutes < todos[cvh][hour][1]){
                  console.log('layer 2');
                  displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][1],0));
                }
                else{
                  if(minutes < todos[cvh][hour][2]){
                    console.log('layer 3');
                    displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][2],0));
                  }
                  else{
                    displayCount(true,countDown(n,m,y,hour+1,todos[cvh][hour+1][0],0));
                  }
                }
              }
            }
          }
          else {
            tings();
          }
        }
        else{
          if(hour===7 && minutes>=40){
            displayCount(true, countDown(n,m,y,9,00,0));
            console.log('hour === 7');
          }
          else if(((hour > 7)&&hour<=13)||((hour===13&&minutes<50))){
            console.log('layer 00');
            if(todos[cvh][hour].length !== 0){
              console.log('layer 0');
              if(minutes < todos[cvh][hour][0]){
                console.log('layer 1');
                displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][0],0));
              }
              else{
                if(minutes < todos[cvh][hour][1]){
                  console.log('layer 2');
                  displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][1],0));
                }
                else{
                  if(minutes < todos[cvh][hour][2]){
                    console.log('layer 3');
                    displayCount(true,countDown(n,m,y,hour,todos[cvh][hour][2],0));
                  }
                  else{
                    displayCount(true,countDown(n,m,y,hour+1,todos[cvh][hour+1][0],0));
                  }
                }
              }
            }
            else{
              displayCount(true,countDown(n,m,y,hour+1,todos[cvh][hour+1][0],0));
              }
            }
          else if(hour===13&&minutes>=50){
              console.log('after school before hour');
              tings();
            }
          else{
              console.log('after school');
              tings();
            }
        }//normal days
      }
    }
  }, 1000);

  function displayCount(accurate, numero){
    if(accurate){
      $("#cd").text(numero);
      $("#tab").text(numero + " CDWHS");
    }
    else{
      $("#cd").hide();
      $("#tab").text("CDWHS");
    }
  }

  $("<p class='sm'>add the playlist URL in settings</p>").insertAfter('.spotify h2');

  //set up settings
  var timesettings = {'show_date':true,'show_time':true,'show_mtime':false,'show_seconds':true};
  var csssettings = {'font':'sans-serif'};

  // get defaults set for time settings, and fill in the checkboxes that correspond when appropriate
  if(!localStorage.getItem('show_date')){ localStorage.setItem('show_date',timesettings.show_date); }
  else{ if(localStorage.getItem('show_date')==='true'){ $("#show_date").prop('checked', true); } }
  if(!localStorage.getItem('show_time')){ localStorage.setItem('show_time',timesettings.show_time); }
  else{ if(localStorage.getItem('show_time')==='true'){ $("#show_time").prop('checked', true); } }
  if(!localStorage.getItem('show_mtime')){ localStorage.setItem('show_mtime',timesettings.show_mtime); }
  else{ if(localStorage.getItem('show_mtime')==='true'){ $("#show_mtime").prop('checked', true); } }
  if(!localStorage.getItem('show_seconds')){ localStorage.setItem('show_seconds',timesettings.show_seconds); }
  else{ if(localStorage.getItem('show_seconds')==='true'){ $("#show_seconds").prop('checked', true); } }

  // css settings defaults + filling in the form with that data
  if(!localStorage.getItem('font')){ localStorage.setItem('font',csssettings.font); }
  else{  }

  //time display

  function tellTime() { // if toggled, not millitary time. if secondss, show seconds
    var nd = new Date();
    var hour = nd.getHours();
    var minutes = nd.getMinutes();
    var seconds = nd.getSeconds();

    var mtime = localStorage.getItem('show_mtime');
    var showsec = localStorage.getItem('show_seconds');

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

  tellTime();

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  function makeNormal(i){
    if (i>12){ i = i - 12;}
    return i;
  }

  function reloadTS(){ //sync screen w/ settings from localStorage
    if(localStorage.getItem('show_date')==='true'){
      $("#date").show();
    }
    else{
      $("#date").hide();
    }

    if(localStorage.getItem('show_time')==='true'){
      $("#time").show();
    }
    else{
      $("#time").hide();
    }
  }

  var parseFonts = {'papyrus':'papyrus, cursive','sans-serif':'San Fransisco, sans-serif','serif':'playfair-display, serif','monospace':'source-code-pro, monospace'};

  function reloadCSS(){
    var font = parseFonts[localStorage.getItem('font')];
    var background = localStorage.getItem('background');
    var color = localStorage.getItem('color');

    $("body").css('font-family', font);
    $("html").css('background', background);
    $("html, a, #new_todo").css('color', color);
  }

  function loadCSSset(){
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

  reloadTS();
  reloadCSS();
  loadCSSset();


  $("#set_time input").change(function(event){
    event.preventDefault();
    localStorage.setItem($(this).attr('id'), $(this).is(':checked'));
    reloadTS();
  });

  $(".included select").change(function(event){
    event.preventDefault();
    localStorage.setItem($(this).attr('id'), $(this).val());
    reloadCSS();
  });

  $("#font").change(function(event){
    resizeOS();
    event.preventDefault();
    console.log($(this).prop('selectedIndex'));
    localStorage.setItem('font-num',$(this).prop('selectedIndex'));
  });

  $("#theme").change(function(event){
    localStorage.setItem('theme-num',$(this).prop('selectedIndex'));

    event.preventDefault();
    if($(this).val()==='t-pre'){
      $('#pre-op').slideDown();
      $('#cus-op').hide();
    }
    else{
      $('#cus-op').slideDown();
      $('#pre-op').hide();
    }

    resizeOS();
  });

  $(".t_ops select").change(function(event){
    event.preventDefault();
    localStorage.setItem('t-spec', $(this).val());
    localStorage.setItem('t-spec-num',$(this).prop('selectedIndex'));
  });

  $("#spot-url").on('submit',function(event){
    event.preventDefault();

    var sURL = $("#spotify_info").val();

    $("#spotify_info").val('');

    var remove = sURL.indexOf('?');
    var fURL = sURL.substring(0, remove);
    var ffURL = fURL.replace(/com/g,'com/embed');

    console.log(sURL);
    console.log(fURL);
    console.log(ffURL);

    localStorage.setItem('spotify_url',ffURL);

    console.log(localStorage.getItem('spotify_url'));

    $("#spotify-iframe").attr('src',localStorage.getItem('spotify_url'));

    alert('Success!');
  });

  if(localStorage.getItem('spotify_url')){
    $("#spotify-iframe").attr('src',localStorage.getItem('spotify_url'));
  }

  $("#custom_gradient input").change(function(){
    $(".test_theme").slideDown();
    $(".test_theme").css('color',$("#cgc").val());
    $(".test_theme").css('background','linear-gradient('+ $("#cga").val() +"deg," +$("#cgc1").val() + ',' + $("#cgc2").val()+")");
  });

  $("#custom_color input").change(function(){
    $(".test_theme").slideDown();
    $(".test_theme").css('color',$("#text_color").val());
    $(".test_theme").css('background',$("#background_color").val());
  });

  $("#ov_close").click(function(){
    switch (localStorage.getItem('t-spec')) {
      case 'custom_gradient':
        localStorage.setItem('color', $("#cgc").val());
        localStorage.setItem('background', 'linear-gradient('+ $("#cga").val() +"deg," +$("#cgc1").val() + ',' + $("#cgc2").val()+")");
        break;
      case 'custom_color':
        localStorage.setItem('color', $("#text_color").val());
        localStorage.setItem('background', $("#background_color").val());
        break;
    }
    reloadCSS();
    $(".ov").fadeOut();
    $(".cent, #os_cont, #close-settings, #settings_header").fadeIn();
  });

  $("#ov_onlyclose").click(function(){
    $(".ov").fadeOut();
    $(".cent, #os_cont, #close-settings, #settings_header").fadeIn();
  });
});
