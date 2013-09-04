(function (){
	var url = 'https://api.github.com/orgs/',
	org = 'mejorandola',
	flag = 0;//0 el #result esta vacio, 1 repositorios, 2 un solo repositorio
	
	$.getJSON(url+org, function (data){//Peticion de datos 
		var view = {//objeto para guardar algunos datos de la organizacion que vamos a renderear
			name: data['name'],
			avatar: data['avatar_url'],
			email: data.email,
			num_repos: data.public_repos,
			url: data.html_url
		}

		var repos_url = data.repos_url,
			members_url = data.members_url.replace('{/member}','');
			
		$('#result').html('<p><i>Loading...</i></p>')
		$.get(members_url, info_Org)//pido los miembros de la organizacion, callback para dibujar datos


		function info_Org (m){//dibuja los datos con el template renderizado con Mustache
			
			view['num_miembros'] = m.length
			
			var template = '<a href={{url}}><h1>{{name}}</h1></a>'+
						'<figure><img src={{avatar}} class="img-rounded"/></figure>'+
						'<p class="lead">No. Repositorios: <strong>{{num_repos}}</strong></p>'+
						'<p clas="lead">No. Miembros: <strong>{{num_miembros}}</strong></p>'+
						'<a href="mailto:{{email}}" class="btn btn-lg btn-link">{{email}}</a>'+
						'</br><button id="btn_repo" class="btn btn-success btn-lg">Repositorios</button>'

			var output = Mustache.render(template, view)//renderiza datos
			
			$('#result').html(output)//mandar datos al html

			$('#btn_repo').on('click', function(){
				
				if (flag==0 || flag==2){//si esta vacio o tiene info de un solo repositorio
					$.get(repos_url, info_repos)//puedo obtener todos los repos de nuevo e imprimir la info
					flag=1;//#result2 tiene info de todos repositorios
					console.log(flag)
				}
			})

		}
	})

		function info_repos (r){//recibe el jsonData con los repositorios
			var vista = {
				nombre: '',
				desc: '',
				url_content: '',
			
			};
			$('#result2').html('')
			var template = '';
			r.forEach(function(item){//Iterar el objeto r (repositorios), asignar valores a los identificadores del obj vista
				vista.url_content = item.contents_url.replace('{+path}','');
				vista.nombre = item.name
				if (item.description!=''){
					vista.desc = item.description
				}else{
					vista.desc = 'Sin Descripción'
				}
				
				//crear el template 
				template = '<article><h2>{{nombre}}</h2>'+
							'<p>{{desc}}</p>'+
							//agregar los atributos 'data-' para almacenar la url del repo
							'<button data-urlcont={{url_content}}  class="ircontent btn btn-info btn-lg">Contenidos</button>'
						
				var output = Mustache.render(template, vista)//renderear el template
				$('#result2').prepend(output); //mandar valores con prepend (agrega html al principio de lo que ya hay sin remplazar
			})//FIn de dibujar los datos

			$('.ircontent').on('click', function(){
					var urlcont = $(this).data('urlcont');
					flag=2;//#resul2 tiene info de un solo repo
					
					$.ajax({
						url: urlcont
					})

					.done(function(data){
						contenido_repo(data)
					})
				})

			
		}

		function contenido_repo(jsonData){
			var view = {},
				template = '';

			$('#result2').html('')//limpiar el area de impresion
				
			for(key in jsonData){
				view.nombre = jsonData[key].name
				view.tipo = jsonData[key].type
				view['url'] = jsonData[key].html_url
				
				template = '<p class={{tipo}}>{{nombre}}</p>'
				
				$('#result2').append(Mustache.render(template, view));
			}

		}


	
}())