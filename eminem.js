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
	$('#marco').css({ //tamaño del marco que contiene los slides
		'height': $('#slider').width() * 0.56338028 + 'px', //altura relativa
		'width': $('#slider').width() -90+ 'px'

	});
	$('#slidesall').css('margin-left', -$('#slidesall').width()*indicador + 'px');
}
tamano();

$(window).resize(tamano);

function mover(){
	var contenedor = $('#slidesall');

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

