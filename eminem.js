//Tamaño dinamico de los items de cada slide.
var indicador = 0, 
	$slides = $('.slide'),
	$siguiente = $('#right'),
	$anterior = $('#left');
	
function coltam (){
	for(var i=0; i<$('.slide').length; i++){ //itera cada slide
		var $items = $('.slide')[i].children, //sus hijos ('a') item_slide
			item;
		$($items).each(function(index, domEle){ // iterar cada item_slide
			item = $(domEle);
			item.css({ //asignacion dinamica de colores y tamano
				'background-color': item.data('bgc'),
				'height': '100%',
				'width': 100/$items.length+ '%'

			});
			console.log($(domEle).data('bgc'));

		});
		console.log('slide posicion: '+i);
	}
}
coltam();

function tamano(){
	var altoventana = $(window).height(),
		altoheader = $('header').height();
		console.log(altoventana+'     '+altoheader);
	$('#marco').css({ //tamaño del marco que contiene los slides
		'height': altoventana - altoheader + 'px'

	});
	$($('.slide')[0]).css('margin-left', -$('#marco').width()*indicador + 'px');
}
tamano();

$(window).resize(tamano);

function mover(){
	var contenedor = $('.slide')[0];

	if (indicador>=$slides.length){
		indicador= 0;
	}

	if (indicador <0){
		indicador = $slides.length-1;
	}

	console.log('indicador = '+indicador)
	$(contenedor).animate({'margin-left': -$(contenedor).width()*indicador + 'px'});

}

$siguiente.on('click', function( evento ){
	evento.preventDefault();
	indicador++;
	mover();
});

$anterior.on('click', function( evento ){
	evento.preventDefault();
	indicador--;
	mover();
});

$('#slider').swiperight(function(){
	indicador--;
	mover();
});

$('#slider').on('swipeleft', function(){
	indicador++;
	mover();
});

$('header nav').meanmenu();