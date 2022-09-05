class Aplication {

    constructor() {
        this.registros = [];
       
    }
    ini() {
        this.cargarRJson();
        this.clickbtnRegistrodeU();
        this.clickbtnMostrarDatos();
    }
    clickbtnRegistrodeU() {
        $("#btnEnviar").click(
            function () {
                var vid = $("#txtId").val();
                var vnombre = $("#txtNombre").val(); //hace referencia al input text con id txtNombre y devuelve su valor
                var vapellido = $("#txtApellido").val();
                var vclave = $("#txtClave").val(); //hace referencia al input text con id txtClave y devuelve su valor
                var vmail = $("#txtMail").val(); //hace referencia al input text con id txtMail y devuelve su valor
                var vfechanac = $("#txtFechanac").val();
                var vpais = $("#txtPais").val();
                var vgenero = $('input[type="radio"]:checked').val();
                var unRegistro = new Registro(vid, vnombre, vapellido, vclave, vmail, vgenero, vfechanac, vpais);//crea una instancia de la clase registro
                app.registros.push(unRegistro);

            }
        );
    }
        clickbtnMostrarDatos() {
            $("#btnMostrar").click(function () {

                $("#tbl-registros tbody").empty(); 
                app.registros.forEach(registro => {
                    var $unTr = $('<tr id="tr-' + registro.idingreso + '"></tr>');//creo un elemento html de tipo tr
                    var $tdid = $("<td></td>").html(registro.idingreso);
                    var $tdapellido = $("<td></td>").html(registro.apellido);
                    var $tdnombre = $("<td></td>").html(registro.nombre);
                    var $tdemail = $("<td></td>").html(registro.email);
                    var $tdfechanac = $("<td></td>").html(registro.fechanac);
                    var $tdgenero = $("<td></td>").html(registro.genero);

                    var $btngestionar = $("<button class='btn' onclick=app.clickbtnBscRegistro('" + registro.idingreso + "') data-toggle='modal' data-target='#modalGestion'>Gestionar</button>");
                    var $tdcomando = $("<td></td>");
                    $tdcomando.append($btngestionar);//los relaciona y mete al boton en na celda

                    $unTr.append($tdid);
                    $unTr.append($tdapellido);
                    $unTr.append($tdnombre);
                    $unTr.append($tdemail);
                    $unTr.append($tdfechanac);
                    $unTr.append($tdgenero);
                    $unTr.append($tdcomando);
                    $("#tbl-registros").append($unTr);

                });
                    
                }
            );
        }
        //busca el elemnto en el array que elimina en el sig
        clickbtnBscRegistro(idingreso){
            var pos=-1;
            //busca el elemento Y MOSTRARLO
            app.registros.forEach( registro => {
                if(idingreso == registro.idingreso){
                    $("#TxtIdMod").val(registro.idingreso);
                    $("#TxtApeMod").val(registro.apellido);
                    $("#TxtNomMod").val(registro.nombre);
                    $("#TxtEmailMod").val(registro.email);
                    $("#TxtGenMod").val(registro.genero);
                    pos=app.registros.indexOf(registro);
                   
                }

            }
        )
                $("#btnEliminarReg").click(function(){
                    if(pos !== -1){
                        app.registros.splice( pos, 1);
                        $("#modalGestion").modal("hide");
                        $("#tr-"+idingreso).fadeOut();
                    }
                }
            )
        
        }
        //carga los objetos del json
        cargarRJson(){
            $.getJSON("js/registros.json",function(registrosjson){
                //each recorre los objetos
                $.each(registrosjson, function(indice, registro){
                    app.registros.push(new Registro(registro.idingreso, registro.nombre, registro.pellido, registro.clave, registro.email, registro.genero, registro.fechanac, registro.paisnac));
                })

            });
        }

}

// parte 2
$("documento").ready(function () {
        app = new Aplication();
        app.ini();
    });

