var id_usuario = 27969033;

SC.initialize({
	client_id: 'bc0a59ede9213ab2d7b9e8e9092a9f16'
});

SC.get("/tracks", {user_id: id_usuario}, callback); //pido los tracks de mg y llamo al callback

function callback (tracks){//callback recibe los tracks
	tracks.forEach(cancionembed); //para cada track sacar el iframe
}

function cancionembed (cancion){ //recibe cada cancion
	var parametros = {	color: "e42b33",  //especifico parametros para el objeto embebido
						show_artwork: false,
						liking: false,
						sharing: false,
						show_comments: false,
						show_playcount: false,
						maxheight: 116
					};

	SC.oEmbed(cancion.uri, parametros, function(oembed){ //saco el codigo embebido
		$('#target').prepend('<div class="slide" data-bgimg=" ">' + oembed.html + '</div>');
	});
}

$('#target').css('height', $(window).height() + 'px'); //el contenedor target agarra el alto de la ventana


var imagenes = ['http://mrg.bz/gZNYqO', 'http://mrg.bz/lg59l2', 'http://mrg.bz/b0hdOi', 'http://mrg.bz/ZzD0uu', 'http://mrg.bz/LafLVU'];



