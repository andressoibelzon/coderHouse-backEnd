const fs = require('fs');

class Contenedor{
    #products
    constructor() {
        this.#products = []
    }
        save(product) { //funcion que guarda todos los productos pusheandolos, puedo agregar indefeinido y los agrega
            this.#products.push(product)
        }
        haveAll() { //funcion que retorna todos los productos guardados
            return this.#products
        }
}

class ContenedorFile { //guarda en el archivos products un json [{"id", "title", "price"}]
    #products
    #path

    constructor(path) {
        this.#path = path
        this.#products = []

    }

    async save(product) {
        this.#products.push(product)
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
        return product.id
    }
    
    async getById(id) {
        this.#products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
        const idFind = this.#products.find(item => item.id === id)
        try {
            return JSON.stringify(idFind)
        } catch (error) {
            null;
        }
    }

    async getAll() { //funhcion que leee los archivos guardados en products.txt parseado
        this.#products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
        return this.#products
    }

    
    async deleteById(id) {
        this.#products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
        const idDelete = this.#products.splice(0, id)
        try {
            return JSON.stringify(idDelete)
        } catch (error) {
            null
        }
        
    }

    }



async function test() { //funcion para probar
    const filePath = './products.txt'
    await fs.promises.writeFile(filePath, '[]')
    const contenedor = new ContenedorFile(filePath)

    await contenedor.save({
        id : 1,
        title: 'manzana',
        price: 10.33
    })

    await contenedor.save({
        id: 2,
        title: 'banana',
        price: 15.35
    })

    await contenedor.save({
        id : 3,
        title: 'naranja',
        price: 52.30
    })
    
    contenedor.save({id: 4, title: 'sandia', price: 8.55 });
    console.log(await contenedor.getById(2));
    console.log(await contenedor.getAll());
    console.log(await contenedor.deleteById(3));
    // console.log(contenedor.deleteAll());

}

test()


