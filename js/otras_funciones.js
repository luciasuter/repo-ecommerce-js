
//----------------------------------------------------------------------------------------- mostrar / ocultar 

//-------------------------- carrito
$(".cart_icon").click(() => {

    $(".carrito_container").toggle("fast");
    $(".cart").toggleClass('active');
    return false;
});


//-------------------------- favorito
$(".mostrar_favoritos").click(() => {
    $(".favoritos__productos").toggle("fast");
    return false;
});


//-------------------------- filtro 
// mostrar 
$(".fa-angle-double-down").click(() => {
    $(".container__filtro").toggle("fast");
    $(".container__filtro").toggleClass('active');
    $(".icn_filtro").toggleClass("fa-angle-double-down fa-angle-double-up"); // cambia arrow down a arrow up
    return false;
});

// ocultar 
$(".titulo_link").click(() => {
    $(".izquierda").toggle("fast");
    $(".izquierda").toggleClass('active');
    return false;
});


//----------------------------------------------------------------------------------------- pullear producto a carrito
function pullear_a_carrito(prod){
    $(".carrito_container__productos").append(`
            <div class="container__carrito" value="${prod.id}">
                <img src="${prod.portada}" alt="" class="cover_min">
                <div class="info_carrito">
                    <span><b>${prod.titulo}</b></span>
                    <span>$${prod.precioVinilo}</span>
                </div>
                <button class="btn_borrar far fa-times-circle" value="${prod.id}" name="${prod.precioVinilo}"></button>           
            </div>`
    );
}


//----------------------------------------------------------------------------------------- pullear producto a favoritos
function pullear_favoritos(fav){
    favoritos.push(fav);
    $(".favoritos__productos").append(`
            <div class="container__favorito prod__${fav.id}">
            <img src="${fav.portada}" alt="" class="cover_xmin">
                <div class="info_favoritos">
                    <span><b>${fav.titulo}</b></span>
                    <span>$ ${fav.precioVinilo}</span>
                </div>
                <div class="btns_fav">
                    <button class="btn_borrar_favorito far fa-times-circle" value="${fav.id}"></button>         
                    <button class="btn_agregar_producto_fav fas fa-shopping-cart" value="${fav.id}" name="${fav.precioVinilo}"></button>         
                </div>
            </div>`
        );

    return favoritos;
}

//--------------------------------------------------------- suma y resta de totales

function sumarTotal(e){
    total = total + e;
}

function restarTotal(e){
    total = total - e
}
