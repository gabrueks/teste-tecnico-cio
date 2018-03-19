function validateURL(textval) {
	var urlregex = new RegExp( "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
	return urlregex.test(textval);
}

$(document).ready(function() {

  $(".target").submit(function(){
		var url = $('#url').val();
		if(validateURL(url)){
			$(".hide").hide();
			$.post("/lookup",
    	{
        url: url
    	},
    	function(data, status){

    	});
			$("body").append('<p class="cuboid-text">As URLs foram insertadas, para visualiza-las, <a style="text-decoration: none; color:blue" href="/db/1">clique aqui</a></p>')
		}else{
			alert('digite uma URL válida')
		}
  });
});
