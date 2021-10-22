
    
    //----------------------------------------------------------------------------------------- BORRAR PRODUCTO DE PAGO



    
    function cargar_productos(){
        compra_total = sessionStorage.getItem("compra total");
        parse_compra_total = JSON.parse(compra_total);
        console.log(parse_compra_total)
        for (producto of parse_compra_total){    
        $(".total__productos").append(`
                <div class="total prod__${producto.id}">
                    <img src="${producto.portada}" alt="" class="total__cover">
                    <div class="info__pago">
                        <span><b>${producto.titulo}</b></span>
                        <span><b>${producto.artista}</b></span>
                        <span>$${producto.precioVinilo}</span>
                    </div>
                    <button class="btn__pago far fa-times-circle" value="${producto.id}" name="${producto.precioVinilo}"></button>           
                </div>
        `)
        }
    }
    
    function cargar_total(){
        $(".total__productos").append(`
        <div class="valor_total"><span>Total: $ ${valorTotal}</span> 
        
        `)
    }
    
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
                <option value="${valorTotal}">1 pago de $${valorTotal}</option>
                <option value="${cuotas(valorTotal, 3)}">3 pagos de $${cuotas(valorTotal, 3)} </option>
                <option value="${cuotas(valorTotal, 6)}">6 pagos de $${cuotas(valorTotal, 6)} </option>
                <option value="${cuotas(valorTotal, 12)}">12 pagos de $${cuotas(valorTotal, 12)} </option>
        </select>
        </div>
        
        <div class="form__comprar">
        <input type="submit" class="btn__form__comprar" value="confirmar compra">
        </form>
    `)
    }
    

//--------------------------------------------------------- terminar compra

    $(document).on('submit', ".form__pago", {once:true}, function(e) {
        e.preventDefault();

        $(".btn__form__comprar").prop("disabled", true);
        
        form_name = $(".form__name").val()
        form_email = $(".form__email").val()
        form_tel = $(".form__tel").val()
        form_cuotas = $("#numero__cuotas").find(":selected").text();

        form_datos.push(form_name, form_email, form_tel, form_cuotas)
        console.log(form_datos)

        $(".modal-content").append(`
            <h3>¡muchas gracias por tu compra ${form_name}!</h3>

            <p>detalles de la misma:</p><br>
                <ul>
                    <li>nombre: ${form_name}</li>
                    <li>mail: ${form_email}</li>
                    <li>telefono: ${form_tel}</li>
                    <li>forma de pago: ${form_cuotas}</li>
                </ul>
            <a href="./catalogo.html"><button class="btn_regresar">regresar al catalogo</button></a>
        `)
        $(".modal").css("display", "block")

        
        
    });
    
    function cuotas(valor, numeroCuotas){
        valor_parse = parseFloat(valor)
        numeroCuotas_parse = parseFloat(numeroCuotas)
        
        return Math.round((((valor_parse * (numeroCuotas_parse / 10)) + valor_parse) / numeroCuotas_parse))
        }



        
 //------------------------------------------------------   BORRAR PRODUCTOS
 $(document).on('click', ".btn__pago", function(e) {
    e.preventDefault();


prod_pago_id = parseInt($(e.target).val());
prod_pago_precio = parseInt($(e.target).attr("name"));

carrito = carrito.filter(keyy => keyy.id !==prod_pago_id);
array_precio = array_precio.filter(ke2 => ke2 !==prod_pago_precio);

$(`.prod__${prod_pago_id}`).remove()

valorTotal = actualizarTotal(array_precio);
$(".valor_total").html(`Total: $ ${valorTotal}`);
$(".cantidad__encarrito").html(`${carrito.length} productos`);
$("#numero__cuotas").html(`
    <option value="${valorTotal}">1 pago de $${valorTotal}</option>
    <option value="${cuotas(valorTotal, 3)}">3 pagos de $${cuotas(valorTotal, 3)} </option>
    <option value="${cuotas(valorTotal, 6)}">6 pagos de $${cuotas(valorTotal, 6)} </option>
    <option value="${cuotas(valorTotal, 12)}">12 pagos de $${cuotas(valorTotal, 12)} </option>
`)     

console.log(array_precio)
});

 //------------------------------------------------------   MODAL

 /*$(document).on('click', "#btn_modal", function(){
    $(".modal").css("display", "block")
});*/

$(document).on('click', ".closemd", function(){
    $(".modal").css("display", "none");
});

//------------------------------------------------- get data
$(".form__pago :input").each(function(){
    input_form = $(this); 
    console.log(input_form.val()) // This is the jquery object of the input, do what you will
   });



//agregar cambiar cantidad
//arreglar fav???kks