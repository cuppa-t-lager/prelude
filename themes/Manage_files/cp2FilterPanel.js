$(function(){

	$("#filterPanel .handle").click(function(){

		$("#wrapper").toggleClass("panelActive");

	});

	if ($("#filterPanel").length) {

		$("#wrapper").addClass("panelActive");

	}

});