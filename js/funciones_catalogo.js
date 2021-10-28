

//----------------------------------------------------------------------------------------- agregar producto a favorito

$(".catalogo__productos").on("click", ".btn_agregar_favorito", (e1) => {
    e1.preventDefault();
    favorito_id = $(e1.target)[0].value

    prod_favorito = $(e1.target)

    producto_favorito = catalogo.find(favorito => favorito.id == favorito_id)

    prod_favorito.removeClass("far fa-heart").addClass("fas fa-heart");
    prod_favorito.prop('disabled', true);
    pullear_favoritos(producto_favorito)
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);
});



//----------------------------------------------------------------------------------------- agregar producto a carrito fav

$('.favoritos__productos').on('click', '.btn_agregar_producto_fav', function (e) {
    e.preventDefault();

    id = parseInt($(e.target).attr('value')) //id
   precio= parseInt($(e.target).attr('name'))
    

    $(`.btn_agregar_favorito[value='${id}']`).removeClass("fas fa-heart").addClass("far fa-heart").prop('disabled', false);

    favoritos = favoritos.filter(kem => kem.id !==id);
    $(`.prod__${id}`).remove()
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);


    for (const prod of catalogo) {
        if (prod.precioVinilo ===precio&& prod.id === id) {
            pullear_a_carrito(prod)
            sumarTotal(precio)
            $(".valor_total").html(`Total: $${total}`)
        }

        $(".cantidad__encarrito").html(` ${$(".carrito_container__productos").children().length} productos`)
    }



});
//----------------------------------------------------------------------------------------- sacar producto de favorito

$('.favoritos__productos').on('click', '.btn_borrar_favorito', function (e2) {
    e2.preventDefault();
    fav_id = parseInt($(e2.target).val());
    console.log(fav_id);

    favoritos = favoritos.filter(element => element.id !==fav_id);
    $(`.btn_agregar_favorito[value='${fav_id}']`).removeClass("fas fa-heart").addClass("far fa-heart").prop('disabled', false);

    $(`.prod__${fav_id}`).remove()
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);
    

});


//----------------------------------------------------------------------------------------- agregar producto al carrito



$(".catalogo__productos").on("click", ".btn_agregar_producto", (e) => {
    e.preventDefault()
        precio = parseInt($(e.target).attr('name'))
        id = parseInt($(e.target).attr('value'))

        for (const producto of catalogo) {
            if (producto.precioVinilo === precio && producto.id === id) {
                pullear_a_carrito(producto)
                sumarTotal(precio)
                $(".valor_total").html(`Total: $${total}`)
            }

            $(".cantidad__encarrito").html(` ${$(".carrito_container__productos").children().length} productos`)
        }

    });
//----------------------------------------------------------------------------------------- borrar producto del carrito

$('.carrito_container__productos').on('click', '.btn_borrar', function (e2) {
    e2.preventDefault()
    precio = parseInt($(e2.target).attr('name'))
    id = parseInt($(e2.target).attr('value'))
    for (const producto of catalogo) {
        if (producto.precioVinilo === precio && producto.id === id) {
            restarTotal(precio)
            $(".valor_total").html(`Total: $${total}`)
        }
    }
    e2.target.parentElement.remove() 

    $(".cantidad__encarrito").html(`en carrito: ${$(".carrito_container__productos").children().length}`)
})



//----------------------------------------------------------------------------------------- comprar productos del carrito

$('.carrito_container').on('click', '.btn_comprar', function (e) {
    e.preventDefault();
    
    if ($(".carrito_container__productos").children().length===0){
        alert("no hay productos. Agregue un producto al carrito!")
    }

    else{
                console.log("comprar")
                $(".container__carrito").each(function() {
                    id = parseInt($(this).attr('value'))
                    carrito.push(catalogo.find(element => element.id == id))
                });
                carrito_enJSON    = JSON.stringify(carrito);
                sessionStorage.setItem('compra total', carrito_enJSON);

                $(".container").remove()
                $(".cart").remove()
                crear_pago();

    }
}

);

