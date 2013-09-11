
var url = 'http://gdata.youtube.com/feeds/api/videos',
	$boton = $('#btnir'),
	$txtquery = $('#txtbusqueda');

function mostrarvideos (jsonData){
	var videos = jsonData.feed.entry
	videos.forEach(Template)

	$('.video').on('click', function(){
		var iframe = $(this).context.children[3];
		var flag = $(iframe).css('display')
		if (flag=='none'){
			$(iframe).css('display', 'block')
		} else{
			$(iframe).css('display' ,' none')
		}
	})
}

function Template(video){
 	var view = {
 		titulo: video.title.$t,
 		autor: video.author[0].name.$t,
 		fecha: video.published.$t.split('T')[0],
 		categoria: video.category[1].label,
 		reproducciones : video.yt$statistics.viewCount,
 		embed: video.media$group.media$content[0].url.split('?')[0].replace('/v/','/embed/'),
 		thumb: video.media$group.media$thumbnail[1].url
 	}
 	var template = '<article class="video"><h2>{{titulo}}</h2>' + 
 					'<p>Por: {{autor}} Fecha: {{fecha}} Categoria: {{categoria}} Reproducciones: {{reproducciones}}</p>' +
 					'<figure><img src="{{thumb}}" class="thumbnail"/></figure>' +
 					'<div class="i-frame"><iframe width="100%" height="315" src="{{embed}}" frameborder="0" allowfullscreen></iframe></div></article>'

 	var output = Mustache.render(template, view)
 	$('#contenedor').append(output)
}

function submit (query){
	$('#contenedor').html('')
 	$.getJSON(url, {
	'max-results': 8, 
	alt: 'json',
	q: query,
	lr: 'es'
	}) .done(mostrarvideos)
}

$boton.on('click', function (){
	var q = $('#txtbusqueda').val()
	console.log(q)
	submit (q)
})

$txtquery.on('keyup', function ( evt ) {
	if (evt.keyCode==13){
		var q = $('#txtbusqueda').val()
		submit (q)
	}
})




