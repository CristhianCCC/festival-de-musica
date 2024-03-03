
const {src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


//funcion para css ---------------------------------------------------------------
function css (done){
    //identificar el archivo de sass
    //compilar el archivo de sass
    //almacenarla en el disco duro 

    src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass() /*para mandar a llamar sass del package.json*/ )
    .pipe(dest("build/css") /*para guardarlo en el destino*/ );   //generalmente los pipes sirven para que una vez se ejecute la funcion por ejemplo del src automaticamente va a ejecurtar despues la que se pase por parametro en el pipe


    done(); //callback que avisa a gulp cuando lleguemos al final 
}

//funcion para imagenes-----------------------------------------------------------

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}


//funcion para imagenes aligerar imagenes-----------------------------------------
function versionwebp(done){
    const opciones = {
        quality: 50 //para ajustar la calidad de la imagen, va de 0 a 100
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones)) //para aplicar el objeto opciones 
    .pipe(dest('build/img')) //para almacenar las imagenes en build
    done();
}

function versionavif(done){
    const opciones = {
    quality: 50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}



function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));
    done();
}

//funcion para dev (para realizar cambios con live server)------------------------
//añadiendo un watch
function dev(done){
    watch ('src/scss/**/*.scss', css);
    watch ('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js=javascript;
exports.versionwebp=versionwebp;
exports.versionavif=versionavif;
exports.imagenes=imagenes;
exports.dev = parallel (imagenes, versionwebp, javascript, versionavif, dev); //para ejecutar 2 tareas al mismo tiempo


//comando para ejecutar funciones con gulp npx gulp y el nombre de la funcion, con json es npm run y el nombre de la funcion, ambos comandos son validos y funcionan bien
