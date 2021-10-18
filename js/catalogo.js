



    $("body").prepend(`
    <header class="header">
        <h1 class="titulo"><a href="index.html" class="titulo_link"> <i class="fas fa-cat"></i> ECOM BLACK CAT RECORDS</a></h1>
        <div class="derecha">
            <h2 class="mostrar_carrito"><i class="fas fa-shopping-cart"></i></h2>
            <span class="cantidad__encarrito">0 productos</span>
            <div class="carrito">
                <div class="carrito_container">
                    <div class="carrito__productos"></div>
                    <div class="carrito__btns">
                        <h3 class="valor_total">Total: $ 0</h3> <a href="#/pagar"><button class="btn_comprar">comprar</button></a>
                    </div>
                </div>
            </div>
        </div>
    </header>`)
    $(".container").prepend(`
        <div class="izquierda">
            <div class="filtro">
                <h2>filtro</h2>
                <div class="filtro__productos"></div>
            </div>
            <div class="favoritos">
                    <h2 class="mostrar_favoritos"><i class="fas fa-heart"></i> favoritos</h2>
                    <span class="cantidad__enfavoritos">0 favoritos</span>
                    <div class="favoritos__productos"></div>
            </div>
        </div>
        <div class="catalogo">
            <div class="catalogo_texto">
                <a href="./catalogo.html"><h2 class="catalogo__titulo">catalogo octubre 2021</h2></a>
            </div>
            <div class="catalogo__productos" id="catalogo" data="catalogo"></div>
        </div>
        
    
    `);
  
    
    $(".filtro__productos").append(`
    
            
            <div class="filtro_form tipo">
                <ul>
                    <li class="filtro_todos">todos</li>
                    <li class="filtro_internacionales">internacionales</li>
                    <li class="filtro_nacionales">nacionales</li>
                </ul>
            </div>
            
            <div class="filtro_form artista buscar__form">
            <input class="buscar_input" type="text" placeholder="filtrar por artista"/>
            </div>
            
        
    `)
    
      
  const URLGET = "https://my-json-server.typicode.com/luciasuter/re/posts"
  //Agregamos un botón con jQuery
  $(document).ready(function(){
  $.getJSON(URLGET, function (respuesta, estado) {
      if(estado === "success"){
        catalogo = respuesta;
        for (const producto of catalogo) {
          $(".catalogo__productos").append(`
              <div id="producto__id__${producto.id}" class="container__producto" data-artista="${producto.artista}" data-album="${producto.tipo}">
                  <img src="${producto.portada}" alt="" class="cover cover_id${producto.id}">
                  <div class="info">
                    <div class="info_txt">
                      <span><b>${producto.titulo}</b></span>
                      <label for="producto__id__${producto.id}">${producto.artista}</label>
                      <span>$${producto.precioVinilo}</span>
                    </div>
                      <div class="btns">
                          <button class="btn_agregar_favorito" value="${producto.id}"><i class="far fa-heart"></i></button>
                          <button class="btn_agregar_producto" name="${producto.precioVinilo}" value="${producto.id}">agregar al carrito</button>
                          
                      </div>
                  </div>            
              </div>
          `)
        }  
      }
      });
  });
  





