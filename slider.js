
	var $slides = $('.slide'), 
		$contenedor=$('#contenedor'),
		$contenedorSlides = $('#contentSlider'),
		$l = $('#left'), 
		$r = $('#right'),
		indicador =0;

	tamaño();	

	function tamaño(){	
		$slides.each(function(index,domEle){
			$(domEle).css({
				'background-image': 'url(' + $(domEle).data('background') + ')',
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

	

	function mover(i){
		
		console.log('indicador = '+indicador)
		var limite = ($slides.length)*-1
		/*Operadores ternarios son condicionales en una sola linea como IF*/
		indicador = (indicador <=limite) ? 0: indicador
		indicador = (indicador > 0) ? limite+1 : indicador
		$contenedorSlides.animate({'margin-left': $contenedor.width()*indicador+'px'})
		console.log('indicador: '+indicador+' margen: '+$contenedor.width()*indicador)
	}

