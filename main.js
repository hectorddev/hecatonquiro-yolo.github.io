const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const verde = document.getElementById('verde')
const amarillo = document.getElementById('amarillo')
const audiorojo = document.getElementById('rojo_nota')
const azulnota = document.getElementById('azul_nota')
const verdenota = document.getElementById('verde_nota')
const amarillonota = document.getElementById('amarillo_nota')

const btnEmpezar = document.getElementById
('btnEmpezar') 



const ULTIMO_NIVEL = 10


class Juego {
    constructor() {
        
        this.inicializar = this.inicializar.bind(this)

        setTimeout(() => this.inicializar(), 100)
        this.generarSecuencia()
        setTimeout(() =>
        {this.siguienteNivel()}, 1000);
        
    }

    inicializar() {
        //Funcion que me quita el boton de 'Empezar' y me declara: el nivel donde estoy y los colores disponibles. 
        this.elegirColor = this.elegirColor.bind(this)
        this.nivel = 1 //Esta propiedad o atributo me permite saber cuantos colores van a ser iluminados en un futuro.

        this.toggleBtnEmpezar()
        this.colores = {
            rojo, 
            azul, 
            verde,
            amarillo
        }

    

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
        } else if(this.colores[color] === azul){
            azulnota.pause()
        } else if(this.colores[color] === verde){
            verdenota.pause()
        } else {
            amarillonota.pause()
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
            this.perdioElJuego()
        } 
    }

    ganoElJuego()
    {
        swal({
            title: 'Buen Trabajo',
            text: 'Has Ganado el Juego',
            icon: 'success',
            button: 'Enviciate',
        })
            .then(() => this.inicializar)   
    }

    perdioElJuego()
    {
        swal({
            title: 'Perdiste',
            text: 'No lo intentes de nuevo :)',
            icon: 'error',
            button: 'No juegues de nuevo',
        })
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()})    
    } 
        
}


function empezarJuego() {
    window.juego = new Juego()
}   

