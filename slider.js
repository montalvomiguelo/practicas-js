(function(){
	var $slides = $('.slide'), 
		$contenedor=$('#contenedor'),
		$contenedorSlides = $('#contentSlider'),
		$l = $('#left'), 
		$r = $('#right'),
		indicador =0;

	tamaño();	

	function tamaño(){	
		/*.The $.each() function is not the same as $(selector).each(), which is used to iterate, exclusively, 
		over a jQuery object. The $.each() function can be used to iterate over any collection, whether it is 
		an object or an array. In the case of an array, the callback is passed an array index and a corresponding 
		array value each time. (The value can also be accessed through the this keyword, but Javascript will always
		 wrap the this value as an Object even if it is a simple string or number value.) The method returns its 
		first argument, the object that was iterated.*/
		$slides.each(function(index,domEle){
			$(domEle).css({
				'background': 'url(' + $(domEle).data('background') + ')',
				'width': $contenedor.width() + 'px',//toma el 100% del ancho
				'height': $contenedor.width()*.35644531 + 'px'//alto es la relacion de (h/w)*w
			})
		})	
		$contenedorSlides.css('margin-left', $contenedor.width()*indicador+'px')
	}

	$(window).on('resize', tamaño)

	$l.on('click', function(){
		indicador ++
		mover(indicador)
	})

	$r.on('click', function(){
		
		indicador = indicador -1
		mover(indicador)
	})

	setTimeout(mover(-1),1000);

	function mover(i){
		
		console.log('indicador = '+indicador)
		var limite = ($slides.length)*-1
		/*Operadores ternarios son condicionales en una sola linea como IF*/
		indicador = (indicador <=limite) ? 0: indicador
		indicador = (indicador > 0) ? limite+1 : indicador
		$contenedorSlides.animate({'margin-left': $contenedor.width()*indicador+'px'})
		console.log('indicador: '+indicador+' margen: '+$contenedor.width()*indicador)
	}


}())