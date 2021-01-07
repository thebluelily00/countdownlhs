$("#themes, #wallpapers, #custom_theme, #custom_wallpaper, #custom_bulletpoint, #bulletpoints").hide();

console.log('this is going thru');

$("#tc").change(function(){
  if($(this).val()==='color_theme'){
    $("#themes").show();
    $("#wallpapers").hide();
    $("#custom_theme").hide();
    $("#custom_wallpaper").hide();
  }
  else if($(this).val()==='wallpaper'){
    $("#wallpapers").show();
    $("#themes").hide();
    $("#custom_theme").hide();
    $("#custom_wallpaper").hide();
    $("#custom_gradient").hide();
  }
  else if($(this).val()==='custom_gradient'){
    $("#custom_gradient").show();
    $("#wallpapers").hide();
    $("#themes").hide();
    $("#custom_theme").hide();
    $("#custom_wallpaper").hide();
  }
  else if($(this).val()==='custom_color'){
    $("#custom_theme").show();
    $("#wallpapers").hide();
    $("#themes").hide();
    $("#custom_wallpaper").hide();
    $("#custom_gradient").hide();
  }
  else{
    $("#custom_wallpaper").show();
    $("#custom_theme").hide();
    $("#wallpapers").hide();
    $("#themes").hide();
    $("#custom_gradient").hide();
  }
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
