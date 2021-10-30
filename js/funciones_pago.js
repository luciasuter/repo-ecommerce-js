//--------------------------------------------------------- CARGAR PRODUCTOS
    function cargar_productos(){
        compra_total = sessionStorage.getItem("compra total");
        parse_compra_total = JSON.parse(compra_total);
        for (producto of parse_compra_total){    
            $(".total__productos").append(`
                    <div class="total prod__${producto.id}">
                        <img src="${producto.portada}" alt="" class="total__cover">
                        <div class="info__pago">
                            <span><b>${producto.titulo}</b></span>
                            <span><b>${producto.artista}</b></span>
                            <span>$${producto.precioVinilo}</span>
                        </div>
                        <button class="btn__sacar far fa-times-circle" value="${producto.id}" name="${producto.precioVinilo}"></button>           
                    </div>`
            );
        }
    };


//--------------------------------------------------------- CARGA EL $ TOTAL
    function cargar_total(){
        $(".total_valor").append(`
            <span>Total: $ ${total}</span>`
        );
    };


//--------------------------------------------------------- CARGA FORM
    function cargar_form(){
        $(".container__form__pago").append(`
            <form class="form__pago">
                <div class="form__item">
                    <label for="form__name">nombre</label>
                    <input class="form__name" type="text" placeholder="jon doe">
                </div>
        
                <div class="form__item">
                    <label for="form__email">e-mail</label>
                    <input class="form__email" type="text" placeholder="jondoe@xmy.com">
                </div>
            
                <div class="form__item">
                    <label for="form__tel">telefono</label>
                    <input class="form__tel" type="text" placeholder="01143348294">
                </div>
                
                <div class="form__item">
                    <label for="numero__cuotas">cantidad de cuotas</label>
                    <select id="numero__cuotas">
                        <option value="${total}">1 pago de $${total}</option>
                        <option value="${cuotas(total, 3)}">3 pagos de $${cuotas(total, 3)} </option>
                        <option value="${cuotas(total, 6)}">6 pagos de $${cuotas(total, 6)} </option>
                        <option value="${cuotas(total, 12)}">12 pagos de $${cuotas(total, 12)} </option>
                    </select>
                </div>
                
                <div class="form__comprar">
                <input type="submit" class="btn__form__comprar" value="confirmar compra">
            </form>`
        );
    };


//---------------------------------------------------------  BORRAR PRODUCTOS
$(document).on('click', ".btn__sacar", function(e) {
    e.preventDefault();
    precio = parseInt($(e.target).attr('name'));
    restarTotal(precio);
    $(".total_valor").html(`Total: $${total}`).css('color', '#fff');
    // borra el elemento 
    e.target.parentElement.remove();
    // cambia el valor de las cuotas
    $("#numero__cuotas").html(`
        <option value="${total}">1 pago de $${total}</option>
        <option value="${cuotas(total, 3)}">3 pagos de $${cuotas(total, 3)} </option>
        <option value="${cuotas(total, 6)}">6 pagos de $${cuotas(total, 6)} </option>
        <option value="${cuotas(total, 12)}">12 pagos de $${cuotas(total, 12)} </option>
    `);
    
    // si se borran todos los productos se muestra un mensaje de aviso y se deshabilita el boton de compra 
    if (total === 0){
        $(".btn__form__comprar").prop("disabled", true);
    $(".container__pago").append(`<div class="aviso"> <span class="aviso_txt">hay 0 elementos en el carrito.</span><a href="catalogo.html"><button class="btn_return">volver al catalogo</button></a></div>`)
    $(".aviso").fadeIn('fast').css('display', 'flex');
    }

});

//--------------------------------------------------------- TERMINAR COMPRA
    $(document).on('submit', ".form__pago", {once:true}, function(e) {
        e.preventDefault();

        $(".btn__form__comprar").prop("disabled", true);
        // se consiguen los valores del form 
        form_name = $(".form__name").val();
        form_email = $(".form__email").val();
        form_tel = $(".form__tel").val();
        form_cuotas = $("#numero__cuotas").find(":selected").text();

        form_datos.push(form_name, form_email, form_tel, form_cuotas);
        datosCompra_enJSON = JSON.stringify(form_datos);
        sessionStorage.setItem('datos de compra', datosCompra_enJSON); // se guardan esos datos en un json 

        // se carga el contenido del modal y se muestra el mismo 
        $(".modal-content").append(`
            <h3>¡muchas gracias por tu compra, ${form_name}!</h3>
            <p>detalles de la misma:</p>
                <ul>
                    <li>nombre: ${form_name}</li>
                    <li>mail: ${form_email}</li>
                    <li>telefono: ${form_tel}</li>
                    <li>forma de pago: ${form_cuotas}</li>
                </ul>
            <a href="./catalogo.html"><button class="btn_regresar">regresar al catalogo</button></a>
        `)
        $(".modal").css("display", "block");
    });


//--------------------------------------------------------- FUNCION CUOTAS
    
    function cuotas(valor, numeroCuotas){
        valor_parse = parseFloat(valor);
        numeroCuotas_parse = parseFloat(numeroCuotas);
        
        return Math.round((((valor_parse * (numeroCuotas_parse / 10)) + valor_parse) / numeroCuotas_parse));
        }

//---------------------------------------------------------   CERRAR MODAL
$(document).on('click', ".closemd", function(){
    $("#myModal").css("display", "none");
});

