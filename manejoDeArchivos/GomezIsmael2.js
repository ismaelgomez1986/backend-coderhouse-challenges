const fs = require('fs');
const path = require('path');

class Contenedor {

    constructor(fileName) {

        this.fileName = `./${fileName}.json`;
    }

    async getJson() {
        const data = await fs.promises.readFile(this.fileName, 'utf-8');
        return JSON.parse(data);
    }

    async updateFile(productos) {
        fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    async getAll() {
        const data = await this.getJson();
        return data;
    };

    async save(data) {
        if (!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
        let id = 1;
        const productos = await this.getJson();
        if (productos.length) {
            id = productos[productos.length - 1].id + 1;
        }
        const newProduct = {
            title: data.title,
            price: data.price,
            id: id
        }
        productos.push(newProduct);
        console.log(`se agrego ${newProduct.title} a ${this.fileName}`);
        return await this.updateFile(productos);
    }

    async getById(id) {
        const productos = await this.getJson();
        const busqueda = productos.find((dato) => dato.id === id);
        console.log(`El producto con id ${id} es:`);
        console.log(busqueda);
        return busqueda;
    }

    async deleteById(id) {
        const productos = await this.getJson();
        productos.splice(id - 1, 1);
        console.log(`Se removio el producto con id:${id} de sus productos`);
        return await this.updateFile(productos);
    }

    async deleteAll() {
        const productos = await this.getJson();
        productos.splice(0);
        console.log('Se borraron todos los productos de su lista');
        return await this.updateFile(productos);
    }
}

const main = async () => {
    const productos = new Contenedor('productos')

    console.log("1_ Llamado a todos los productos");
    const getAll = await productos.getAll();
    console.log(getAll);
    console.log("");

    console.log("2_ agregar un producto");
    const save = await productos.save({
        title: 'escuadra',
        price: 1500
    });
    console.log("");

    console.log("3_ Buscar producto por id");
    const buscarId = await productos.getById(2);
    console.log("");


    console.log("4_ Borrar producto por id");
    const borrarId = await productos.deleteById(2);
    console.log("");
    console.log("5_ Borrar todos los productos");
    const borrarTodo = await productos.deleteAll();
    console.log("");

    console.log("6_ Mostramos todos los productos(la lista fue borrada por completo en el paso 5).");
    const getAll2 = await productos.getAll();
    console.log(getAll2);

}

main();