
//----------------------------------------------------------------------------------------- FUNNNNNCIONESSS


//----------------------------------------------------------------------------------------- FILTRAR POR NOMBRE
    $('.filtro__productos').on('input','.buscar_input', function() {
    var $items = $(".container__producto"); 
      var val = this.value;
      $items.hide().filter(function() {
        return new RegExp('^' + val, 'gi').test($(this).data('artista'));
      }).show();
    });

//----------------------------------------------------------------------------------------- FILTRAR POR TIPO
$(".filtro__productos").on("click", ".filtro_todos", () => {
    $("div[data='catalogo'] div[data-album='internacionales']").show();
    $("div[data='catalogo'] div[data-album='nacionales']").show();
})

$(".filtro__productos").on("click", ".filtro_nacionales", () => {
    $("div[data='catalogo'] div[data-album='nacionales']").show();
    $("div[data='catalogo'] div[data-album='internacionales']").hide();
})

$(".filtro__productos").on("click", ".filtro_internacionales", () => {
    $("div[data='catalogo'] div[data-album='internacionales']").show();
    $("div[data='catalogo'] div[data-album='nacionales']").hide();
})



//----------------------------------------------------------------------------------------- agregar a favorito

$(".catalogo__productos").on("click", ".btn_agregar_favorito", (e1) => {
    e1.preventDefault();
    favorito_id = $(e1.target)[0].value
    prod_favorito = $(e1.target)
    prod_favorito.html(`<i class="fas fa-heart"></i>`);
    prod_favorito.prop('disabled', true);
    producto_favorito = catalogo.find(favorito => favorito.id == favorito_id)

    pullear_favoritos(producto_favorito)

    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);
});



//----------------------------------------------------------------------------------------- agregar a carrito fav

$('.favoritos__productos').on('click', '.btn_agregar_producto_fav', function (e) {
    e.preventDefault();

    pr_id = parseInt($(e.target)[0].value);
    console.log(pr_id);
    producto_buscado = catalogo.find(producto => producto.id == pr_id)

    favoritos = favoritos.filter(kem => kem.id !==pr_id);
    $(`.prod__${pr_id}`).remove()
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);

    array_precio.push(producto_buscado.precioVinilo);
    console.log(array_precio)
    pullear_al_carrito(producto_buscado);
    actualizarTotal(array_precio);
    valorTotal = actualizarTotal(array_precio);
    $(".valor_total").html(`Total: $ ${valorTotal}`);
    $(".cantidad__encarrito").html(`${carrito.length} productos`);

    

});
//----------------------------------------------------------------------------------------- sacar de favorito

$('.favoritos__productos').on('click', '.btn_borrar_favorito', function (e2) {
    e2.preventDefault();
    fav_id = parseInt($(e2.target).val());
    console.log(fav_id);
    /*console.log(fav_precio);*/
    favoritos = favoritos.filter(key6 => key6.id !==fav_id);
    /*console.log(carrito);
    console.log(array_precio);*/
    $(`.prod__${fav_id}`).remove()
    $(".cantidad__enfavoritos").html(`${favoritos.length} favoritos`);
    

});


//----------------------------------------------------------------------------------------- agregar a carrito


$(".catalogo__productos").on("click", ".btn_agregar_producto", (e) => {
    e.preventDefault();
    producto_id = $(e.target)[0].value
    console.log(producto_id);
    producto_buscado = catalogo.find(producto => producto.id == producto_id)

    array_precio.push(producto_buscado.precioVinilo);
    console.log(array_precio)
    pullear_al_carrito(producto_buscado);
    actualizarTotal(array_precio);
    valorTotal = actualizarTotal(array_precio);
    $(".valor_total").html(`Total: $ ${valorTotal}`);
    $(".cantidad__encarrito").html(`${carrito.length} productos`);


});

//----------------------------------------------------------------------------------------- BORRAR PRODUCTO

$('.carrito__productos').on('click', '.btn_borrar_prod', function (e2) {
    e2.preventDefault();
    prod_id = parseInt($(e2.target).val());
    prod_precio = parseInt($(e2.target).attr("name"));
    /*console.log(fav_id);
    console.log(fav_precio);*/
    carrito = carrito.filter(keyy => keyy.id !==prod_id);
    array_precio = array_precio.filter(ke2 => ke2 !==prod_precio);
    
    /*console.log(carrito);
    console.log(array_precio);*/
    $(`.prod__${prod_id}`).remove()

    valorTotal = actualizarTotal(array_precio);
    $(".valor_total").html(`Total: $ ${valorTotal}`);
    $(".cantidad__encarrito").html(`${carrito.length} productos`);

});


//----------------------------------------------------------------------------------------- comprar productos
// EMPIEZA llamada AJAX
const URLGET2   = "https://jsonplaceholder.typicode.com/posts"

$('.carrito_container').on('click', '.btn_comprar', function (e) {
    e.preventDefault();
    
    if (carrito.length===0){
        alert("no hay productos. Agregue un producto al carrito!")
    }

    else{
        carrito.forEach(function(producto) {
            dato = { id: `${producto.id}`, title: `${producto.titulo}`}
            infoPost.push(dato)})

        titulos_comprados = (getTitle(infoPost)).join(", ")

       $.post(URLGET2, infoPost ,(respuesta, estado) => {
            if(estado === "success"){
                msg_ajax = `se compraron los titulos: ${titulos_comprados}`
                alert(msg_ajax)
            }  
        });
// FIN llamada AJAX
        $(document).ready(function(){
                console.log("comprar")
                carrito_enJSON    = JSON.stringify(carrito);
                localStorage.setItem('compra total', carrito_enJSON);

                total_enJson = JSON.stringify(valorTotal);
                localStorage.setItem('total', total_enJson);
                $(".container").remove()
                $(".derecha").remove()
                crear_pago();
            

        });

    }
}

);




//----------------------------------------------------------------------------------------- mostrar / ocultar carrito


$(".mostrar_carrito").click(() => {

    $(".carrito_container").toggle("fast");
    $(".derecha").toggleClass('active');
    return false;
    
    
});

$(".mostrar_favoritos").click(() => {
    $(".favoritos__productos").toggle("fast");
    return false;
});



/*funciones*/




function pullear_al_carrito(prod){
    carrito.push(prod);
    //precio_total.push(prod);
    $(".carrito__productos").append(`
            <div class="container__carrito prod__${prod.id}">
            <img src="${prod.portada}" alt="" class="cover_min">
                <div class="info_carrito">
                    <span><b>${prod.titulo}</b></span>
                    <span>$${prod.precioVinilo}</span>
                </div>
                <button class="btn_borrar_prod far fa-times-circle" value="${prod.id}" name="${prod.precioVinilo}"></button>           
            </div>
        `)

    return carrito;
}



function pullear_favoritos(fav){
    favoritos.push(fav);
    //precio_total.push(prod);
    $(".favoritos__productos").append(`
            <div class="container__favorito prod__${fav.id}">
            <img src="${fav.portada}" alt="" class="cover_min">
                <div class="info_favoritos">
                    <span><b>${fav.titulo}</b></span>
                    <span><b>${fav.artista}</b></span>
                    <span>$${fav.precioVinilo}</span>
                </div>
                <button class="btn_borrar_favorito far fa-times-circle" value="${fav.id}"></button>         
                <button class="btn_agregar_producto_fav fas fa-shopping-cart" value="${fav.id}" name="${fav.precioVinilo}"></button>         
            </div>
        `)

    return favoritos;
}




function actualizarTotal(array){
    precio_total = array.reduce((a, b) => a + b, 0);
    
    return precio_total;
}

function getTitle(array) {
    return array.map(function(item) { return item["title"]; });
  } 


