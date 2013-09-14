
//Tamaño dinamico de los items de cada slide.
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
	console.log('slide posicion: '+i)
}


var $slides = $('.slide');
function tamano(){
	$('#marco').css({ //tamaño del marco que contiene los slides
		'height': $('#slider').width() * 0.56338028 + 'px', //altura relativa
		'width': $('#slider').width() -90+ 'px'

	});
	/*
	$slides.each(function(index, domEle){ //tamaño de cada slide
		$(domEle).css({//tamaño de cada slide
			'height': $('#slider').width() * 0.56338028 + 'px',
			'width': $('#slider').width() -90+ 'px'
		});
	});
*/
}
tamano();
$(window).resize(tamano);

$siguiente = $('#right');
$siguiente.on('click',function(){
	console.log('sguiente slide')
})

