$("#url").focus(function(){
	$("#cuboid form").addClass("ready");
})
$("#url").blur(function(){
	if($(this).val() == "")
		$("#cuboid form").removeClass("ready");
})

$("#url").keyup(function(){
	$(".submit-icon").toggleClass("active", $(this).val().length > 0);
})

$("#url").click(function(){
  $(".submit-icon").toggleClass("active", $(this).val().length > 0);
})

$("#cuboid form").submit(function(){
	$(this).removeClass("ready").addClass("loading");
	setTimeout(complete, 3000);
	return false;
})
function complete()
{
	$("#cuboid form").removeClass("loading").addClass("complete");
}
$(".reset-icon").click(function(){
	$("#cuboid form").removeClass("complete");
})
