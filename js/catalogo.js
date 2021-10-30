// carga toda la estructura html a la pagina
$("body").prepend(`
    <header class="header">
        <h1 class="titulo titulo_link hvr-underline-reveal"><i class="fas fa-cat"></i>BLACK CAT RECORDS</h1>
        <div class="cart">
            <div class="cart_text">
                <h2 class="cart_icon"><i class="fas fa-shopping-cart hvr-glow"></i></h2>
                <span class="cantidad__encarrito"> 0 productos</span>
            </div>
            <div class="carrito">
                <div class="carrito_container">
                    <div class="carrito_container__productos"></div>
                    <div class="carrito_container__btns">
                        <h4 class="valor_total">Total: $ 0</h4> <a href="#/pagar"><button class="btn_comprar hvr-underline-from-center">comprar</button></a>
                    </div>
                </div>
            </div>
        </div>
    </header>`
);

$(".container").prepend(`
    <div class="izquierda">
        <div class="filtro">
            <h2 class="filtrar_titulo">filtrar <i class="fas fa-angle-double-down fa-xs icn_filtro"></i></h2>
            <div class="container__filtro"></div>
        </div>
        <div class="favoritos">
            <h2 class="mostrar_favoritos"><i class="far fa-heart hvr-glow"></i> favoritos</h2>
            <span class="cantidad__enfavoritos">0 favoritos</span>
            <div class="favoritos__productos"></div>
        </div>
    </div>
    <div class="catalogo">
        <div class="catalogo_texto">
        <a href="./catalogo.html"><h2 class="catalogo__titulo">catalogo octubre 2021</h2></a>
        </div>
        <div class="catalogo__productos" id="catalogo" data="catalogo"></div>
    </div>`
);
  
    
$(".container__filtro").append(`
    <div class="filt">
        <div class="box_filtro"> 
            <ul>
                <li class="filtro_todos fas fa-globe"><span> todos</span></li>
                <li class="filtro_internacionales">internacionales</li>
                <li class="filtro_nacionales">nacionales</li>
            </ul>
        </div>

        <div class="box_filtro">
            <ul>
                <li class="filtro_genero_todos fas fa-tags"><span> todos</span></li>
                <li class="filtro_alternative">alternative</li>
                <li class="filtro_rock">rock</li>
                <li class="filtro_soundtrack">soundtrack</li>
            </ul>
        </div>
    </div>

    <div class="box_filtro">
        <input class="buscar_input" type="text" placeholder="filtrar por artista"/>
    </div>`
);
    

// carga todo el catalogo desde mi 'servidor'
const URLGET = "https://my-json-server.typicode.com/luciasuter/repo-ecommerce-js/posts"

$(document).ready(function(){
    $.getJSON(URLGET, function (respuesta, estado){
        if(estado === "success"){
            catalogo = respuesta;
            for (const producto of catalogo){
                $(".catalogo__productos").append(`
                    <div id="producto__id__${producto.id}" class="container__producto" data-artista="${producto.artista}" data-album="${producto.tipo}" data-genero="${producto.genero}">
                        <img src="${producto.portada}" alt="" class="cover cover_id${producto.id}">
                        <div class="info">
                            <div class="info_txt">
                                <span><b>${producto.titulo}</b></span>
                                <label for="producto__id__${producto.id}">${producto.artista}</label>
                                <span>$${producto.precioVinilo}</span>
                            </div>
                            <div class="btns">
                                <button class="btn_agregar_favorito far fa-heart hvr-glow" value="${producto.id}"></button>
                                <button class="btn_agregar_producto fas fa-shopping-cart hvr-glow" name="${producto.precioVinilo}" value="${producto.id}"></button>                    
                            </div>
                        </div>            
                    </div>`                                              
                );
            }  
        }
    });
});
