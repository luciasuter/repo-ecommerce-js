     
  const URLGET = "https://my-json-server.typicode.com/luciasuter/re/posts"
  //Agregamos un botón con jQuery
  $(document).ready(function(){
  $.getJSON(URLGET, function (respuesta, estado) {
      if(estado === "success"){
        catalogo = respuesta;
        catalogo_novedad = catalogo.filter(novedades => novedades.novedad);
        for (const novedades of catalogo_novedad) {
          $(".productos_novedades").append(`
              <div id="producto__id__${novedades.id}" class="producto_novedad" data-album="${novedades.tipo}">
                  <div class="hover_txt">
                    <div class ="txt">
                    ${novedades.info}
                    </div>
                  </div>
                  <img src="${novedades.portada}" alt="" class="cover_novedad">
                  <div class="info_novedad">
                          <span><b>${novedades.titulo}</b></span>
                          <label for="producto__id__${novedades.id}">${novedades.artista}</label>
                      </div>
                      <div class="info_novedad_2">
                            <span><b>$${novedades.precioVinilo}</b></span>
                      </div>
              </div>
          `)
        }  
      }
      });
  });


  