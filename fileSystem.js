class Directorio {
    constructor(unNombre) {
        this.nombre = unNombre;
        this.archivos = [];
        this.carpetas = [];
        this.padre = null;
    }

    agregarArchivo(unArchivo) {
        this.archivos.push(unArchivo);
    }

    agregarSubdirectorio(unDirectorio) {
        unDirectorio.padre = this;
        this.carpetas.push(unDirectorio);
    }
}

class FileSystem {
    constructor(rutaActual) {
        this.root = new Directorio(rutaActual); // para crear un nuevo fyleSystem el usuario debe colocar una rutaActual
        this.directorioActual = this.root;
    }

    cd(dirName) {
        if (dirName === "..") {
            if (this.directorioActual !== this.root) {
                this.directorioActual = this.directorioActual.padre;
            }
        } else {
            const objetivo = this.directorioActual.carpetas.find(dir => dir.nombre === dirName);
            if ( objetivo ) {
                this.directorioActual = objetivo;
            } else {
                console.log(`Directorio '${dirName}' no encontrado.`);
            }
        }
    }

    touch(fileName) {
        this.directorioActual.agregarArchivo(fileName);
    }

    ls() {
        this.directorioActual.archivos.forEach(archivo => console.log(archivo));
        this.directorioActual.carpetas.forEach(dir => console.log(dir.nombre));
    }

    mkdir(dirName) {
        const nuevaCarpeta = new Directorio(dirName);
        nuevaCarpeta.parent = this.directorioActual;
        this.directorioActual.agregarSubdirectorio(nuevaCarpeta);
    }

    pwd() {
        let esteDirectorio = this.directorioActual;
        let path = '';
        while ( esteDirectorio ){
            path = `/${esteDirectorio.nombre}${path}` 
            esteDirectorio = esteDirectorio.padre;
        }
        console.log( path );
    }
}

// Ejemplos de uso
const fileSystem = new FileSystem('home'); // tomo como ruta 'home'
fileSystem.mkdir('unDirectorio'); // creo una carpeta nueva llamada unDirectorio
fileSystem.pwd(); // muestro por pantalla la ruta actual
fileSystem.cd('unDirectorio'); // cambio a la carpeta unDirectorio
fileSystem.pwd();
fileSystem.cd('..'); // vuelvo a la carpeta anterior
fileSystem.touch('holaMundo.txt'); // creo un archivo
fileSystem.ls(); // lista los archivos y las carpetas en el directorio actual
fileSystem.cd('dnjaidn');