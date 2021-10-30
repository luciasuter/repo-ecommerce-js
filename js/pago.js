
function crear_pago(){
    $("title").html('BLACK CAT RECORDS :: pago');
    $(".titulo").removeClass('titulo_link hvr-underline-reveal');
    $("body").addClass('body-color-bg');
    $(".footer").css('position', 'fixed');

    $(".container__2").addClass('size');
    $(".container__2").append(`

        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="closemd">&times;</span>
            </div>
        </div>

        <div class="container__pago">
            <div class="container__pago__elementos">
                <h3>productos en carrito</h3>
                <div class="total__productos"></div>
                <div class="total_valor"></div>
            </div>
                <div class="datos__pago">
                    <h3>por favor completa los siguientes datos</h3>
                    <div class="container__form__pago"></div>
            </div>
        </div>
    `);
    
    cargar_productos();
    cargar_total();
    cargar_form();
}
