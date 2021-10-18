
    
    //----------------------------------------------------------------------------------------- BORRAR PRODUCTO DE PAGO



    
    function cargar_productos(){
        for (producto of carrito){    
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
        <div class="valor_total"><span>Total: $ ${valorTotal}</span></div>
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
                <option value="1">1 pago de $${valorTotal}</option>
                <option value="3">3 pagos de $${cuotas(valorTotal, 3)} </option>
                <option value="6">6 pagos de $${cuotas(valorTotal, 6)} </option>
                <option value="12">12 pagos de $${cuotas(valorTotal, 12)} </option>
        </select>
        </div>
        
        <div class="form__comprar">
        <input type="submit" class="btn__form__comprar" value="confirmar compra">
        </form>
    `)
    }

    $(".container__form__pago").on('submit', ".form__comprar", function(e) {
        e.preventDefault();
        console.log("yoii")
        return false;
    });
    
    function cuotas(valor, numeroCuotas){
        valor_parse = parseFloat(valor)
        numeroCuotas_parse = parseFloat(numeroCuotas)
        
        return Math.round((((valor_parse * (numeroCuotas_parse / 10)) + valor_parse) / numeroCuotas_parse))
        }



        
 //------------------------------------------------------   NO FUNCIONA ESO

 $(".total__productos").on('click', ".btn__pago", function(e) {
    e.preventDefault();
console.log("test")
});

    
 /* 
prod_pago_id = parseInt($(e.target).val());
prod_pago_precio = parseInt($(e.target).attr("name"));

carrito = carrito.filter(keyy => keyy.id !==prod_pago_id);
array_precio = array_precio.filter(ke2 => ke2 !==prod_pago_precio);

$(`.prod__${prod_pago_id}`).remove()

valorTotal = actualizarTotal(array_precio);
$(".valor_total").html(`Total: $ ${valorTotal}`);
$(".cantidad__encarrito").html(`${carrito.length} productos`);       

*/