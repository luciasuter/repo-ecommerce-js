
function crear_pago(){
$(".container__2").css({
    "display": "grid",  
    "height": "100vh",
    "grid-template-columns": "10% 80% 10%",
    "grid-template-areas": "'. centro .' ",
    "background-color": "burlywood"})

$(".container__2").append(`
    <div class="container__pago">
        <h2>PAGAR</h2>
        <div class="container__pago__elementos">
            <div class="total__productos">
                <h3>productos en carrito</h3>
            </div>
            <div class="datos__pago">
                <h3>por favor completa los siguientes datos</h3>
                <div class="container__form__pago"></div>
            </div>
        </div>
    </div>
`);
cargar_productos();
cargar_total();
cargar_form();
}

