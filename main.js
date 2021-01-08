const btnEmpezar = document.getElementById
('btnEmpezar') 
btnEmpezar.classList.add('hide')

const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const verde = document.getElementById('verde')
const amarillo = document.getElementById('amarillo')

const puntaje = document.getElementById('puntaje')
const record = document.getElementById('record')


let validacionRojo = false
let validacionVerde = false
let validacionAzul = false
let validacionAmarillo = false


swal({  
    title: 'Elige tu nivel: ', 
    buttons: {
        confirm: 'Padawan',
        cancel: 'Maestro Pokemon',
        roll: {
            text: 'Guerrero Sayajin', 
            value: true
        }, 
    }
})


let arreglo = []

const ULTIMO_NIVEL = 15



audiorojo = new Audio()
audiorojo.src = 'do_nota.mp3'
audiorojo.addEventListener('load', terminarCarga)

azulnota = new Audio()
azulnota.src = 'sol_nota.mp3'
azulnota.addEventListener('load', terminarCarga)

verdenota = new Audio()
verdenota.src = 'mi_nota.mp3'
verdenota.addEventListener('load', terminarCarga)


amarillonota = new Audio()
amarillonota.src = 'fa_nota.mp3'
amarillonota.addEventListener('load', terminarCarga)


function terminarCarga() {
    if(!validacionRojo) {
        validacionRojo = true
    }
    if(!validacionAzul) {
        validacionAzul = true
    }
    if(!validacionVerde) {
        validacionVerde = true
    }
    if(!validacionAmarillo) {
        validacionAmarillo = true
    }
    return 0
}

if(terminarCarga() === 0){
    setTimeout(() => btnEmpezar.classList.remove('hide'), 1000 )
    
}


class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        setTimeout(() => this.inicializar(), 200)
        this.generarSecuencia()
        setTimeout(() =>
        {this.siguienteNivel()}, 1000);
        
    }

    inicializar() {
        //Funcion que me quita el boton de 'Empezar' y me declara: el nivel donde estoy y los colores disponibles. 
        this.elegirColor = this.elegirColor.bind(this)
        this.nivel = 1 //Esta propiedad o atributo me permite saber cuantos colores van a ser iluminados en un futuro.
        this.record = 0
        this.puntaje = 0
        this.toggleBtnEmpezar()
        this.colores = {
            rojo, 
            azul, 
            verde,
            amarillo
        }
        arreglo.pop()
       

    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide'))
        {
            btnEmpezar.classList.remove('hide')
        } else{
            btnEmpezar.classList.add('hide')
        }
    }


    generarSecuencia() {
        //Funcion que inicializa un array con un tamaño de 10, luego lo llena con 0 y me itera en cada índice con un número aleatorio

        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        
    }
    

    siguienteNivel() {
        this.subnivel = 0
        //Activador de la iluminacións
        console.log(`subnivel: ${this.subnivel}`)
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        //Asignación de colores a cada indice del arreglo.
        switch(numero)
        {
            case 0: 
                return 'rojo'
            case 1: 
                return 'azul'
            case 2: 
                return 'verde'
            case 3: 
                return 'amarillo'
        }
    }

    transformarColorANumero(color){
        //Asignación de colores a cada indice del arreglo.
        switch(color)
        {
            case 'rojo': 
                return 0
            case 'azul': 
                return 1
            case 'verde': 
                return 2
            case 'amarillo': 
                return 3
        }
    }



    iluminarSecuencia() {
        //Funcion que va iterando y devolviendo el color que corresponde a cada indice del arreglo.
        for(let i = 0; i < this.nivel; i++)
        {
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 500 * i) //Es importante la multiplicación por i, ya que cada ronda va a tardar más la activación de iluminación. 
        }
    }

    iluminarColor(color)
    //Funcion que me activa la clase 'light' asignada a cada propiedad de colores CSS. 
    {   
        
        
        
        this.colores[color].classList.add('light')
        console.log(this.colores[color])
        if(this.colores[color] === rojo){
            audiorojo.play()
        } else if(this.colores[color] === azul){
            azulnota.play()
        } else if(this.colores[color] === verde){
            verdenota.play()
        } else {
            amarillonota.play()
        }
       

        setTimeout(() => {
            this.apagarColor(color)
        }, 450)

      

        
    }

    apagarColor(color) {
        
        
        this.colores[color].classList.remove('light')
        if(this.colores[color] === rojo){
            audiorojo.pause()
            audiorojo.currentTime = 0
        } else if(this.colores[color] === azul){
            azulnota.pause()
            azulnota.currentTime = 0
        } else if(this.colores[color] === verde){
            verdenota.pause()
            verdenota.currentTime = 0
        } else {
            amarillonota.pause()
            amarillonota.currentTime = 0
        }
        
        
    }




    agregarEventosClick()
    {
        this.colores.rojo.addEventListener('click', this.elegirColor) 
        this.colores.azul.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.amarillo.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick()
    {
        this.colores.rojo.removeEventListener('click', this.elegirColor)
        this.colores.azul.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev)
    {
        
        let nombreColor = ev.target.dataset.color
       
        
        
        let numeroColor = this.transformarColorANumero(nombreColor) 
        this.iluminarColor(nombreColor)
        console.log(numeroColor)
        console.log(this.secuencia[this.subnivel])
        if(numeroColor === this.secuencia[this.subnivel]){
            /* debugger */

            this.subnivel++
            console.log(`subnivel ${this.subnivel}`)
            if(this.subnivel === this.nivel)
            {
                this.nivel++
                this.puntaje++
                puntaje.textContent = `Tu puntaje es: ${this.puntaje}`
                this.eliminarEventosClick() 
                if(this.nivel === (ULTIMO_NIVEL + 1))
                {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel.bind(this), 1500)
                }
            }   
        } 
        else {
            console.log(arreglo)
            this.perdioElJuego()
        } 
    }

    ganoElJuego()
    {
        swal({
            title: 'Felicidades',
            text: 'Sigue con tu vida',
            icon: 'success',
            button: 'Chau',
        })
            .then(() => this.inicializar)   
    }

    perdioElJuego()
    {
        arreglo.push(this.puntaje)
        puntaje.textContent = `Puntaje final: ${this.puntaje}`
        record.textContent = `Record: ${arreglo[0]}`
        swal({
            title: 'Perdiste',
            text: 'Pero creo en ti',
            icon: 'error',
            button: 'Tu puedes',
        })
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()})    
    } 
        
}


function empezarJuego() {
    window.juego = new Juego()
}   

