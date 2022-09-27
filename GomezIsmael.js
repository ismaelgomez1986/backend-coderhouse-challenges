/**  DESAFÍO ENTREGABLE 1 "PRINCIPIOS BÁSICOS DE JAVASCRIPT: CLASES */

class User {

    constructor(name, lastName, books=[], pets=[]) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`;
    }

    addPet(pet) {
        this.pets.push(pet);
        return this.pets;
    }

    countPet() {
        return this.pets.length;
    }

    addBook(name, author) {
        this.books.push({name, author});
        return this.books;
    }

    getBookNames() {
        const bookName=[];
        this.books.forEach((book) => {
            bookName.push(book.name);
        });
        return bookName;
    }

}

const usuario = new User('Fulano', 'Perez');

console.log(usuario.getFullName());
console.log(usuario.addPet('perro'));
console.log(usuario.addPet('gato'));
console.log(usuario.addBook('El señor de las moscas', 'William Golding'));
console.log(usuario.addBook('Fundacion', 'Isaac Asimov'));
console.log(usuario.countPet());
console.log(usuario.getBookNames());

