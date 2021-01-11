$("#color_theme, #wallpaper, #custom_theme, #custom_wallpaper, #custom_bulletpoint, #bulletpoints, #custom_gradient, .ov,.nag_g, .th_ch").hide();
$(".settings").hide();
console.log('this is going thru');

function rU(a){
  return neww = a.replace("_", " ");
}

$("#open-settings").click(function(){
  $(".cont").hide();
  $(".settings").fadeIn();
});
$("#close-settings").click(function(){
  $(".settings").hide();
  $(".cont").fadeIn();
});

$("#tc, #tcc").change(function(){
  $(".ov").slideDown();
  $("#ov_label").text("change "+rU($(this).val()));
  $("#"+$(this).val()).show();
  $(".c_s:not(#"+$(this).val()+")").hide();
});

$("#ov_close").click(function(){
  $(".ov").slideUp();
});

$("#gn").change(function(){
  console.log("the slider slid");
  $("#num_info").text("# of colors: "+$(this).val());
  var x = 0;
  while(x < $(this).val()){
    $("#custom_gradient").append('<input type="color" value="gc'+x+'"');
    x++;
  }
});

$(".nav_g li").click(function(){
  console.log($(this).text());
  console.log($("#color_gradient img ."+$(this).text()));
  console.log($("#color_gradient img:not(."+$(this).text()+")"));
  $("#color_gradient img ."+$(this).text()).show();
});

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
console.log("yes the password system is janky but for rn it's gonna work");
