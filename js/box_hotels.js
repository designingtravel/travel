/**
 * AutocompleteboxjsonpController
 * 
 * @author Ing. Juan Garfias Vázquez
 * @email jgarfias@travelnet.com.mx
 * @version 2.0
 * @date 05/May/20014
 */
$(function() {
	
	$("#rooms").val(1);
	
	$("#r1k").val(0);
	$("#r2k").val(0);
	$("#r3k").val(0);
	$("#r4k").val(0);
	$("#r5k").val(0);
	$.datepicker.regional['es'] = {
		closeText : 'Cerrar',
		prevText : '<Ant',
		nextText : 'Sig>',
		currentText : 'Hoy',
		monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
				'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
				'Diciembre' ],
		monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
				'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
		dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Mi\u00E9rcoles', 'Jueves',
				'Viernes', 'S\u00E1bado' ],
		dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mi\u00E9', 'Juv', 'Vie', 'S\u00E1b' ],
		dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\u00E1' ],
		weekHeader : 'Sm',
		dateFormat : 'dd-mm-yy',
		firstDay : 0,
		isRTL : false,
		showMonthAfterYear : false,
		yearSuffix : ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	// Inicializa configuracion y control de calendarios
	$("#startDate").datepicker(	{
			numberOfMonths: 2,
			inline: true,
			prevText: "<",
			nextText: ">",
			monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
			dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
			minDate : 0,
			onClose : function(selectedDate) {	
				var arrayMinDate = selectedDate.split("-");
				var minDate= new Date(arrayMinDate[2],(arrayMinDate[1]-1),arrayMinDate[0]);
				var numberOfDaysToAdd = 1;
				
				minDate.setDate(minDate.getDate() + numberOfDaysToAdd); 

				$("#endDate").datepicker({
					minDate : minDate,
					numberOfMonths: 2,
					inline: true,
					prevText: "<",
					nextText: ">",
					monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
					dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
					defaultDate : "+1d"
				});
				
				$("#warning").hide("slow");
				$("#endDate").datepicker("option", "minDate",minDate);
				
				var arrayDate = selectedDate.split("-");
				var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
				var fechaMas30 = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);

				fecha.setDate(fecha.getDate() + 1);
				fechaMas30.setDate(fechaMas30.getDate() + 30);
				
				$("#endDate").datepicker("setDate", fecha);
				$("#endDate").datepicker("option", "maxDate",fechaMas30);	

			}
	});
// Finaliza configuracion y control de calendarios
	$("#rooms").change(function() {
		var rooms = $("#rooms").val();
		switch (rooms) {
		case "1":
			for(var i=2;i<=5;i++){
				$("#r"+i+"kage").hide("slow");
				$("#r"+i+"k").val(0);
				$("#textr"+i+"k").hide("slow");
				for(var j=1;j<=3;j++){
					$("#r"+i+"k"+j+"a").val(0);
					$("#r"+i+"k"+j+"a").hide("slow");
				}
			}
			break;
		case "2":
			for(var i=3;i<=5;i++){
				$("#r"+i+"k").val(0);
				$("#textr"+i+"k").hide("slow");
				for(var j=1;j<=3;j++){
					$("#r"+i+"k"+j+"a").val(0);
					$("#r"+i+"k"+j+"a").hide("slow");
				}
			}
			$("#r2kage").show("slow");
			$("#r3kage").hide("slow");
			$("#r4kage").hide("slow");
			$("#r5kage").hide("slow");
			// $( "#dialog-confirm" ).dialog( "open" );
			break;
		case "3":
			for(var i=4;i<=5;i++){
				$("#r"+i+"k").val(0);
				$("#textr"+i+"k").hide("slow");
				for(var j=1;j<=3;j++){
					$("#r"+i+"k"+j+"a").val(0);
					$("#r"+i+"k"+j+"a").hide("slow");
				}
			}
			
			$("#r2kage").show("slow");
			$("#r3kage").show("slow");
			$("#r4kage").hide("slow");
			$("#r5kage").hide("slow");
			// $( "#dialog-confirm" ).dialog( "open" );
			break;
		case "4":
			for(var i=5;i<=5;i++){
				$("#r"+i+"k").val(0);
				$("#textr"+i+"k").hide("slow");
				for(var j=1;j<=3;j++){
					$("#r"+i+"k"+j+"a").val(0);
					$("#r"+i+"k"+j+"a").hide("slow");
				}
			}
			$("#r2kage").show("slow");
			$("#r3kage").show("slow");
			$("#r4kage").show("slow");
			$("#r5kage").hide("slow");
			// $( "#dialog-confirm" ).dialog( "open" );
			break;
		case "5":
			$("#r2kage").show("slow");
			$("#r3kage").show("slow");
			$("#r4kage").show("slow");
			$("#r5kage").show("slow");
			// $( "#dialog-confirm" ).dialog( "open" );
			break;
		default:
		}
		resetRooms();
	});

	var lang='es';
	var limit='8';
	var urljsonp="https://www.travelnet.com.mx/Autocompleteboxjsonp/autocompletecity?callback=?";
	//var urljsonp="http://192.168.20.17/tnw/html/Autocompleteboxjsonp/autocompletecity?callback=?";
	$("#destino").autocomplete({
		source : function(request, response) {
			$.ajax({
						url : urljsonp,
						dataType : "jsonp",
						data : {
							q : request.term,
							lang : lang,
							limit : limit
						},
						success : function(data) {
							$("#citycode").val("");
							response($.map(data,function(item) {
												var ciudad=item.split("|");
												return {
													label : ciudad[0] + ", "+ciudad[1]+"",
													value : ciudad[0],
													citycode : ciudad[2]
												};
											}));
						}
					});
		},
		minLength : 2,
		maxLength : 5,
		select : function(event, ui) {	
			$("#citycode").val(ui.item.citycode);
			$("#warningDest").hide("slow");
			/*
			 * log( ui.item ? "Selected: " + ui.item.label :
			 * "Nothing selected, input was " + this.value);
			 */
		},
		open : function() {
			$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close : function(event, ui) {
			$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			
			if($("#citycode").val()==""){
				$("#warningDest").show("slow");
			}	
		}
	});
	
	String.prototype.replaceAt = function(index, char) {
	    return this.substr(0, index) + "<span style='font-weight:bold;color:black;'>" + char + "</span>";
	};
	$.ui.autocomplete.prototype._renderItem = function(ul, item) {
	    this.term = this.term.toLowerCase();
	    var resultStr = item.label.toLowerCase();
	    var t = "";
	    while (resultStr.indexOf(this.term) != -1) {
	        var index = resultStr.indexOf(this.term);
	        t = t + item.label.replaceAt(index, item.label.slice(index, index + this.term.length));
	        resultStr = resultStr.substr(index + this.term.length);
	        item.label = item.label.substr(index + this.term.length);
	    }
	    return $("<li></li>").data("item.autocomplete", item).append("<a>" + t + item.label + "</a>").appendTo(ul);
	};
	/*
	function textSearch(id, defaultText) {
		id.focus(function() {
			if ($(this).attr("value") == defaultText)
				$(this).attr("value", "");
		});
		id.blur(function() {
			if ($(this).attr("value") == "")
				$(this).attr("value", defaultText);
		});
	}
	
	textSearch($("#destino"),$("#destino").val());
	*/
	$("#radio1").prop("checked", true);
	//$("#rooms").buttonset();
	
	$( "#nh" ).tooltip({
		 show: null,
		 position: {
		 my: "left top",
		 at: "left bottom"
		 },
		 open: function( event, ui ) {
		 ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast" );
		 }
	});
		 
	$("#ver_precios").click(function(e) {
		e.preventDefault();
		var eval = $("#startDate").val();
		var dest = $("#citycode").val();
		if (eval == "" || dest == "") {
			if (eval == "") {
				$("#warning").show("slow");
			}
			if (dest == "") {
				$("#warningDest").show("slow");
			}
		} else {
			var msg=$("#searchingLabel").val();
			var img=$("#searchingImg").val();
			 $.blockUI({ 
		            message: "<center><h2>"+msg+"</h2><img src='"+img+"'><br></center> "
		        }); 
			 $("#formHoteles").submit();
		}
	});
		 
});

function resetRooms(){
	var r1k= $('#r1k').val() ;
	var r2k= $('#r2k').val() ;
	var r3k= $('#r3k').val() ;
	var r4k= $('#r4k').val() ;
	var r5k= $('#r5k').val() ;
	
	if ( r1k != '0'  ||  r2k != '0'  ||  r3k != '0'  ||  r4k != '0'  ||  r5k != '0' ){
		$("#kidsAges").show("");
	} else {
		$("#kidsAges").hide("");
	}
	
	for(var i=1; i < 6 ; i++){
		if($('#r'+i+'k').val() == '0' ){
			$("#r"+i+"kageBox").hide("");
		} else {
			$("#r"+i+"kageBox").show("");
		}
	}
}

function arg(id, valor) {
	
	resetRooms();
	
	switch (valor) {
	case "0":
		$("#"+id+"1a").val(0);
		$("#"+id+"2a").val(0);
		$("#"+id+"3a").val(0);
		$("#"+id+"1a").hide("");
		$("#"+id+"2a").hide("");
		$("#"+id+"3a").hide("");
		break;
	case "1":
		$("#"+id+"2a").val(0);
		$("#"+id+"3a").val(0);
		$("#"+id+"1a").fadeToggle("");
		$("#"+id+"2a").hide("");
		$("#"+id+"3a").hide("");
		break;
	case "2":
		$("#"+id+"3a").val(0);
		$("#"+id+"1a").fadeToggle("");
		$("#"+id+"2a").fadeToggle("");
		$("#"+id+"3a").hide("");
		break;
	case "3":
		$("#"+id+"1a").fadeToggle("");
		$("#"+id+"2a").fadeToggle("");
		$("#"+id+"3a").fadeToggle("");
		break;
	default:
	}	
}