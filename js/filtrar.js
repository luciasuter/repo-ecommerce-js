
//----------------------------------------------------------------------------------------- FILTRAR POR NOMBRE EN INPUT

/* filtra los albums en base al nombre del artista que se escriba*/
$('.box_filtro').on('input','.buscar_input', function() {
    var $item = $(".container__producto"); 
      var val = this.value;
      $item.hide().filter(function() {
        return new RegExp('^' + val, 'gi').test($(this).data('artista'));
      }).show();
    });

//----------------------------------------------------------------------------------------- FILTRAR POR TIPO

/* filtra los albums en base a si son nacionales, internacionales o de lo contrario los muestra a todos*/

$(".box_filtro").on("click", ".filtro_todos", () => {  // todos
    $("div[data='catalogo'] div[data-album='internacionales']").show();
    $("div[data='catalogo'] div[data-album='nacionales']").show();
})

$(".box_filtro").on("click", ".filtro_nacionales", () => { // nacionales
    $("div[data='catalogo'] div[data-album='nacionales']").show();
    $("div[data='catalogo'] div[data-album='internacionales']").hide();
})

$(".box_filtro").on("click", ".filtro_internacionales", () => { // internacionales
    $("div[data='catalogo'] div[data-album='internacionales']").show();
    $("div[data='catalogo'] div[data-album='nacionales']").hide();
})


//----------------------------------------------------------------------------------------- FILTRAR POR GENERO

/* filtra los albums en base a su genero, alternative, soundtrack, rock o de lo contrario los muestra a todos*/

$(".box_filtro").on("click", ".filtro_genero_todos", () => {     // todos los productos
    $("div[data='catalogo'] div[data-genero='alternative']").show();
    $("div[data='catalogo'] div[data-genero='soundtrack']").show();
    $("div[data='catalogo'] div[data-genero='rock']").show();
})

$(".box_filtro").on("click", ".filtro_alternative", () => {      // productos => alternative
    $("div[data='catalogo'] div[data-genero='alternative']").show();
    $("div[data='catalogo'] div[data-genero='soundtrack']").hide();
    $("div[data='catalogo'] div[data-genero='rock']").hide();
})

$(".box_filtro").on("click", ".filtro_soundtrack", () => {       // productos => soundtrack
    $("div[data='catalogo'] div[data-genero='soundtrack']").show();
    $("div[data='catalogo'] div[data-genero='alternative']").hide();
    $("div[data='catalogo'] div[data-genero='rock']").hide();
})

$(".box_filtro").on("click", ".filtro_rock", () => {             // productos => rock
    $("div[data='catalogo'] div[data-genero='rock']").show();
    $("div[data='catalogo'] div[data-genero='soundtrack']").hide();
    $("div[data='catalogo'] div[data-genero='alternative']").hide();
})
