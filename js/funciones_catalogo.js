

//----------------------------------------------------------------------------------------- agregar producto a favorito
$(".catalogo__productos").on("click", ".btn_agregar_favorito", (e1) => {
    e1.preventDefault();
    favorito_id = $(e1.target)[0].value // consigue el id 
    prod_favorito = $(e1.target);
    producto_favorito = catalogo.find(favorito => favorito.id == favorito_id); // busca el elemento dentro del catalogo

    prod_favorito.removeClass("far fa-heart").addClass("fas fa-heart").prop('disabled', true); //cambia el corazon vacio a lleno y deshabilita el boton 
    pullear_favoritos(producto_favorito); 
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`); // cambia la cantidad de productos favoritos 
});


//----------------------------------------------------------------------------------------- agregar producto a carrito fav
$('.favoritos__productos').on('click', '.btn_agregar_producto_fav', function (e) {
    e.preventDefault();
    id = parseInt($(e.target).attr('value')); // consigue el id
    precio = parseInt($(e.target).attr('name')); // consigue el precio
    
    // saca el producto de favoritos
    $(`.btn_agregar_favorito[value='${id}']`).removeClass("fas fa-heart").addClass("far fa-heart").prop('disabled', false); //cambia el corazon nuevamente a vacio y lo habilita
    favoritos = favoritos.filter(producto => producto.id !==id); // saca el producto del array favoritos 
    $(`.prod__${id}`).remove(); 
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);

    // agrega el producto al carrito 
    for (const prod of catalogo) { 
        if (prod.precioVinilo ===precio && prod.id === id) {
            pullear_a_carrito(prod);
            sumarTotal(precio);
            $(".valor_total").html(`Total: $${total}`);
        }
        $(".cantidad__encarrito").html(` ${$(".carrito_container__productos").children().length} productos`);
    }

});


//----------------------------------------------------------------------------------------- sacar producto de favorito
$('.favoritos__productos').on('click', '.btn_borrar_favorito', function (e2) {
    e2.preventDefault();
    fav_id = parseInt($(e2.target).val());
    favoritos = favoritos.filter(element => element.id !==fav_id); // saca el producto del array favoritos 
    $(`.btn_agregar_favorito[value='${fav_id}']`).removeClass("fas fa-heart").addClass("far fa-heart").prop('disabled', false); //cambia el corazon nuevamente a vacio y lo habilita
    $(`.prod__${fav_id}`).remove();
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);
    
});


//----------------------------------------------------------------------------------------- agregar producto al carrito
$(".catalogo__productos").on("click", ".btn_agregar_producto", (e) => {
    e.preventDefault();
    id = parseInt($(e.target).attr('value'));
    precio = parseInt($(e.target).attr('name'));

    for (const producto of catalogo){
        if (producto.precioVinilo === precio && producto.id === id) { // condicion para que cada producto sea unico 
            pullear_a_carrito(producto);
            sumarTotal(precio);
            $(".valor_total").html(`Total: $${total}`);
        }

        $(".cantidad__encarrito").html(` ${$(".carrito_container__productos").children().length} productos`);
    }

});


//----------------------------------------------------------------------------------------- borrar producto del carrito
$('.carrito_container__productos').on('click', '.btn_borrar', function (e2) {
    e2.preventDefault();
    precio = parseInt($(e2.target).attr('name'));
    id = parseInt($(e2.target).attr('value'));

    for (const producto of catalogo) {
        if (producto.precioVinilo === precio && producto.id === id) {
            restarTotal(precio);
            $(".valor_total").html(`Total: $${total}`);
        }
    }
    e2.target.parentElement.remove();
    $(".cantidad__encarrito").html(`en carrito: ${$(".carrito_container__productos").children().length}`);
});



//----------------------------------------------------------------------------------------- comprar productos del carrito

$('.carrito_container').on('click', '.btn_comprar', function (e) {
    e.preventDefault();
    if ($(".carrito_container__productos").children().length===0){ // en caso de que haya 0 productos en el carrito muestra una alerta
        alert("no hay productos. Agregue un producto al carrito!");
    }

    // si hay productos en el carrito 
    else{
        $(".container__carrito").each(function() {
            id = parseInt($(this).attr('value'));
            carrito.push(catalogo.find(element => element.id == id)) // carga los productos al array carrito
        });
        carrito_enJSON    = JSON.stringify(carrito);
        sessionStorage.setItem('compra total', carrito_enJSON);

        // elimina elementos html 
        $(".container").remove();
        $(".cart").remove();
        crear_pago();

    }
});

