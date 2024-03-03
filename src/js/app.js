document.addEventListener('DOMContentLoaded', function(){ 
    iniciarapp();
});

function iniciarapp(){ //mandando a llamar las funciones
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){ //funcion para cuando se de click en algun enlace del lineup el navegador lo dirija a esa seccion de la pagina
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener ('click', function(e){
            e.preventDefault(); //para eliminar el comportamiento por defecto del navegador de guiar al usuario de golpe a la seccion de la pagina
            const seccionScroll=e.target.attributes.href.value; //configurando el nuevo comportamiento para que no lleve al usuario de golpe a la seccion de la pagina
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        })
    });
}

function crearGaleria(){ //creando la funcion para la galeria
    const galeria = document.querySelector('.galeria-imagenes'); //seleccionando la clase del html donde se va a agregar la galeria
        for(let i = 1; i<=12; i++){ //ciclo para mandar a llamar la imagen de la galeria
            const imagen=document.createElement('picture'); //agregando etiqueta 'picture' para generar el html
            imagen.innerHTML = //codigo para añadir de donde viene el contenido en este caso de carpeta img y se pone i ya que es el iterador del ciclo 
            ` 
            <source srcset="build/img/thumb/${i}.avif" type="image/avif"> 
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy"  width="200" height="300" src="build/img/thumb/${i}" alt="imagen galeria">
            `;
            imagen.onclick = function (){ //funcion para que cuando se de click muestre la imagen en tamaño mas grande
                mostrarImagen(i);
            }
            galeria.appendChild(imagen); //para mostrar las imagenes en pantalla 
        }
}

function mostrarImagen(id){
    const imagen=document.createElement('picture'); //agregando etiqueta 'picture' para generar el html
            imagen.innerHTML = //codigo para añadir de donde viene el contenido en este caso de carpeta img y se pone i ya que es el iterador del ciclo 
            ` 
            <source srcset="build/img/grande/${id}.avif" type="image/avif"> 
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy"  width="200" height="300" src="build/img/grande/${id}" alt="imagen galeria">
            `;
            const overlay = document.createElement('DIV'); //overlay es una funcion para oscurecer el fondo de pantalla cuando se abre una imagen para mostrar en tamaño grande
            overlay.appendChild(imagen);
            overlay.classList.add('overlay'); //para añadirle una clase y despues darle estilos con CSS
            overlay.onclick = function(){ //para que cuando se de click en cualquier parte de la pantalla la imagen se cierre y no sea solo presionando la X
                const body = document.querySelector('body'); //el codigo de abajo es reutilizable para esta funcion
                body.classList.remove('fijar-body')  
                overlay.remove();
            }


            //boton para cerrar modal
            const cerrarModal=document.createElement('P'); //creando boton para cerrar ventana
            cerrarModal.textContent= 'X';
            cerrarModal.classList.add('btn-cerrar'); //dandole una clase para darle estilos con css
            cerrarModal.onclick = function(){ //funcion para cerrar ventana con imagen, se usa el overlay.remove
                const body = document.querySelector('body'); 
                body.classList.remove('fijar-body') //.remove para eliminar la clase fijar-body y poder realizar scroll otra vez una vez se haya cerrado la imagen 
                overlay.remove();
            }
            overlay.appendChild(cerrarModal);

            const body = document.querySelector('body'); //se selecciona todo el body y para mostrar la imagen en pantalla se usan esta linea y body.appenchild(overlay)
            body.appendChild(overlay); // se aplica el overlay a todo el body que es oscurecer la pantalla mientras se va a mostrar la imagen
            body.classList.add('fijar-body') //clase para fijar body y que no se pueda hacer scroll mientras la imagen esta abierta
}
