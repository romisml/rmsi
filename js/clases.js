class Registro{
    
    constructor(idingreso,nombre,apellido,clave,email,genero,fechanac,paisnac){
        this.idingreso= idingreso;
        this.nombre= nombre;
        this.apellido= apellido;
        this.clave= clave;
        this.email = email;
        this.genero=genero;
        this.fechanac=fechanac;
        this.paisnac= paisnac;
    }
    
}

class Jugador{
    constructor(nombre,email,pais,puntaje,fecha){
        this.nombre= nombre;
        this.email= email;
        this.pais= pais;
        this.puntaje= puntaje;
        this.fecha= fecha;
    }
    //
    actualizarPuntaje(puntaje){
        this.puntaje=puntaje;
    }
}
class Cuadro{
    constructor(imagen,estado){
        this.imagen= imagen;
        this.estado= estado;
    }
     actualizarEstado(estado){
        this.estado=estado;
    }
}