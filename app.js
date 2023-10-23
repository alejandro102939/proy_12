const readline = require('readline');
const fs = require('fs');
const { Console } = require('console');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Producto {
    #codigoProducto;
    #nombreProducto;
    #inventarioProducto;
    #precioProducto;

    constructor(){
        this.#codigoProducto = '';
        this.#nombreProducto = '';
        this.#inventarioProducto = 0;
        this.#precioProducto = 0;
    }

    set setCodigoProducto(value){
        this.#codigoProducto = value;
    }
    get getCodigoProducto(){
        return this.#codigoProducto;
    }
    set setInventariProducto(value){
        this.#inventarioProducto = value;
    }
    get getInventarioProducto(){
        return this.#inventarioProducto;
    }
    set setNombreProducto(value){
        this.#nombreProducto = value;
    }
    get getNombreProducto(){
        return this.#nombreProducto;
    }
    set setPrecioProducto(value){
        this.#precioProducto = value;
    }
    get getPrecioProducto(){
        return this.#precioProducto;
    }
}

class ProductosTienda {
    #listaProducto;

    constructor(){
        this.#listaProducto = [];
    }

    get getListaProductos(){
        return this.#listaProducto;
    }


    agregarProducto(producto) {
        this.#listaProducto.push(producto);
        this.grabarArchivoProductos();
    }

    cargarArchivosProductos() {
        let datosArchivo = [];

        try {
            const data = fs.readFileSync('datos.json', 'utf8');
            datosArchivo = JSON.parse(data);
        } catch (error) {
            console.log(error);
        }

        let contador = 0;

        if (datosArchivo.length > 0) {
            datosArchivo.forEach(objeto => {
             contador++;
             let producto = new Producto;
             producto.setCodigoProducto = objeto.codigoProducto;  
             producto.setNombreProducto = objeto.nombreProducto;
             producto.setInventariProducto = objeto.inventarioProducto;
             producto.setPrecioProducto = objeto.precioProducto;
             this.#listaProducto.push(producto);
            });
        }

        console.log(`Total de productos cargados ==> ${contador}`);
    }

    grabarArchivoProductos() {
        const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
            return{
                codigoProducto: producto.getCodigoProducto,
                nombreProducto: producto.getNombreProducto,
                inventarioProducto: producto.getInventarioProducto,
                precioProducto: producto.getPrecioProducto
            };
        });

        const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);
        const nombreArchivo = 'datos.json';

        fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
        console.log(`DATOS GUARDADOS EN ${nombreArchivo}`);
    }

    mostrarProductos() {
        this.getListaProductos.forEach(producto =>{
            console.log(`| Codigo: ${producto.getCodigoProducto} | Nombre: ${producto.getNombreProducto} | Inventario: ${producto.getInventarioProducto} | Precio: ${producto.getPrecioProducto} |`);
        });
    }



}

let productosTienda = new ProductosTienda;

function agregarProductoDesdeConsola() {
    rl.question('Ingrese el codigo del producto: ', (codigo) => {
        rl.question('Ingrese el nombre del producto: ', (nombre) => {
            rl.question('Ingrese el inventario del producto: ', (inventario) => {
                rl.question('Ingrese el precio del producto: ', (precio) => {
                    const nuevoProducto = new Producto();
                    nuevoProducto.setCodigoProducto = codigo;
                    nuevoProducto.setNombreProducto = nombre;
                    nuevoProducto.setInventariProducto = inventario;
                    nuevoProducto.setPrecioProducto = precio;

                    productosTienda.agregarProducto(nuevoProducto);

                    console.clear(); // Limpiar la consola
                    console.log('Producto agregado exitosamente.');

                    mostrarMenu(); // Volver a mostrar el menu
                });
            });
        });
    });
}

function mostrarProductosDesdeConsola() {
    productosTienda.mostrarProductos();
    mostrarMenu(); // Volver a mostrar el menu
}

function mostrarMenu() {
    console.log('********************************************************');
    console.log('********** MENU PRINCIPAL ******************************');
    console.log('********************************************************');

    rl.question('Seleccione una opcion:\n1. Agregar Producto\n2. Mostrar Productos\n3. Salir\n', (opcion) => {
        switch (opcion) {
            case '1':
                agregarProductoDesdeConsola();
                break;
            case '2':
                mostrarProductosDesdeConsola();
                break;
            case '3':

                rl.close();
                break;
            default:
                console.log('Opcion no valida. Por favor, seleccione una opcion valida.');
                mostrarMenu();
                break;

        }
    });
}


function main() {
    console.clear();
    productosTienda.cargarArchivosProductos(); // Cargar datos del archivo
    mostrarMenu();
}



main(); // Inicia la aplicacion