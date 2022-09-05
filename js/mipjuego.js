class Aplication {
    constructor() {
        this.jugadores = [];
        this.jugador;
        this.tablero = [];
        this.intentos = 0;
        this.antpos = false;
    }




    ini() {
        this.clickbtnComenzarJ();
        this.dibujarTablero();
        this.clickTablaPuntaje();
        this.limpiarmodal();

    }
    clickbtnComenzarJ() {
        $("#btnModal").click(function () {
            var vnombre = $("#txtNombre").val();
            var vemail = $("#txtEmail").val();
            var vpais = $("#txtPais").val();
            app.jugador = new Jugador(vnombre, vemail, vpais, 0, new Date());
            app.clickCrearTablero();
            $("#tablero").empty();//sirve para vaciar lo que requiera 
            app.dibujarTablero();
            app.intentos = 0;// iniciando en 0
            app.jugarMemo();
            $("#modalJuego").modal("hide");//desaparece

        })

    }
    clickCrearTablero() {
        app.tablero = [
            new Cuadro("img/1.jpg", false),
            new Cuadro("img/1.jpg", false),
            new Cuadro("img/2.jpg", false),
            new Cuadro("img/2.jpg", false),
            new Cuadro("img/3.jpg", false),
            new Cuadro("img/3.jpg", false),
            new Cuadro("img/4.jpg", false),
            new Cuadro("img/4.jpg", false),
            new Cuadro("img/5.jpg", false),
            new Cuadro("img/5.jpg", false),
            new Cuadro("img/6.jpg", false),
            new Cuadro("img/6.jpg", false),

        ];
        app.tablero = app.mezclarcartas(app.tablero);


    }
    mezclarcartas(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // Mientras queden elementos a mezclar...
        while (0 !== currentIndex) {

            // Seleccionar un elemento sin mezclar...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // E intercambiarlo con el elemento actual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    dibujarTablero() {
        app.tablero.forEach(pos => {
            var direccion = "";
            if (pos.estado == false) {
                direccion = "img/signo.jpg";

            } else {
                direccion = pos.imagen;

            }
            var div = $('<div class="col-md-2 col-sm-4 p-2 text-center">');
            var img = $('<img src="' + direccion + '" class="img-fluid img-thumbnail signo borde">');
            div.append(img);
            $("#tablero").append(div);

        });

    }

    jugarMemo() {
        var carta = $("#tablero img");//selecciona todas las imagenes del tablero

        $.each(carta, function (posicion, dato) {
            if (app.tablero[posicion].estado == false) {
                $(dato).click(function () {
                    $(dato).attr('src', app.tablero[posicion].imagen)//cambiar el valor de la propiedad
                    if (app.intentos <= 20) {
                        if (app.antpos === false) {//si todavia no recorrio y no tiene ninguna carta guardada en la posicion
                            app.antpos = posicion;

                        } else {
                            app.intentos++;
                            if (app.tablero[posicion].imagen == app.tablero[app.antpos].imagen) {
                                app.tablero[posicion].estado = true;
                                app.tablero[app.antpos].estado = true;
                            }

                            setTimeout(() => { //se detiene se ejecuta lo que tiene adentro y sigue
                                if (app.desiciondelJuego() == true) {
                                    alert("GANADOR")
                                    app.jugador.puntaje= app.intentos;
                                    app.jugadores.push(app.jugador);
                                } else {
                                    $("#tablero").empty();//sirve para vaciar lo que requiera 
                                    app.dibujarTablero();
                                    app.jugarMemo();
                                }

                                app.antpos = false;
                            }, 300);

                        }

                    } else {
                        alert("¡¡PERDEDOR!!")
                        $("#tablero").empty();//sirve para vaciar lo que requiera 
                        app.dibujarTablero();

                    }
                })
            }

        })


    }

    clickTablaPuntaje() {
        $("#btnPuntajes").click(function () {
            $("#tbl-puntajes tbody").empty();
            app.jugadores.forEach(car => {
                var $unTr = $('<tr ></tr>');//creo un elemento html de tipo tr
                var $tdjugador = $("<td></td>").html(car.nombre);
                var $tdpais = $("<td></td>").html(car.pais);
                var $tdpntaje = $("<td></td>").html(car.puntaje);
                var $tdfecha = $("<td></td>").html(car.fecha);

                $unTr.append($tdjugador);
                $unTr.append($tdpais);
                $unTr.append($tdpntaje);
                $unTr.append($tdfecha);
                $("#tbl-puntajes").append($unTr);
            })

        })
    }

    limpiarmodal(){
        $("#btnIniciarJuego").click(function(){
            $("#txtNombre").val('');
            $("#txtEmail").val('');
            $("#txtPais").val('');
        });
    }

    desiciondelJuego() {
        var bandera=true;

        app.tablero.forEach(cubo => {
            if(cubo.estado == false){
                bandera= false;
            }
        });
        return bandera;
    }


}
//INICIO DE TODO EL JUEGO

$("document").ready(function () {// evento que espera a que la estructura del DOM este cargada y lista
    app = new Aplication();// crea una instancia de la clasa aplication
    app.ini();//llama al metodo ini de la clase aplication
});

