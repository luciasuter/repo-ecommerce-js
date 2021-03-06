// carga los productos marcados como "novedad" desde mi 'servidor' 
const URLGET = "https://my-json-server.typicode.com/luciasuter/repo-ecommerce-js/posts"
  $(document).ready(function(){
  $.getJSON(URLGET, function (respuesta, estado) {
      if(estado === "success"){
        catalogo = respuesta;
        catalogo_novedad = catalogo.filter(novedades => novedades.novedad);
        for (const novedades of catalogo_novedad) {
          $(".productos_novedades").append(`
              <div id="producto__id__${novedades.id}" class="producto_novedad" data-album="${novedades.tipo}">
                  <div class="container_hover_txt">
                    <div class ="txt">
                    ${novedades.info}
                    </div>
                  </div>
                  <img src="${novedades.portada}" alt="" class="cover_novedad">
                  <div class="infos">
                    <div class="info_novedad">
                            <span class="producto__titulo" value="${novedades.id}">${novedades.titulo}</span>
                            <label for="producto__id__${novedades.id}">${novedades.artista}</label>
                    </div>
                        <div class="info_novedad_2">
                              <span><b>$${novedades.precioVinilo}</b></span>
                              <div class="producto__btns">
                                  <button id="play_id_${novedades.id}" class="btn_play far fa-play-circle fa-lg" value="${novedades.mp3}"></button>
                                  <button id="pause_id_${novedades.id}" class="btn_pause far fa-pause-circle fa-lg" value="${novedades.id}"></button>
                              </div>
                        </div>
                  </div>
              </div>
          `)
        }  
      }
      });

  });



//---------------------------------------------------------------- funcion song

// play song

$(document).on("click", '.btn_play', function(e) {
  e.preventDefault();
  boton_seleccionado = $(e.target)[0].value
  audio = new Audio(`${boton_seleccionado}`);
    audio.play();
    $(e.target).prop('disabled', true);
    $(".btn_pause").prop('disabled', false);
});

// pause song
$(document).on("click", '.btn_pause', function(e) {
    e.preventDefault();
    boton_seleccionado = $(e.target).attr('value');
    console.log(boton_seleccionado);
    audio.pause();
    $(`#play_id_${boton_seleccionado}`).prop('disabled', false);
    $(`#pause_id_${boton_seleccionado}`).prop('disabled', true);
  });