export default class GotService {

    constructor () {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}/${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        const some = await res.json();
        return some;
    };

    getAllCharacters = async () => {
        const res = await this.getResource('characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
       const character = await this.getResource(`characters/${id}`);
       return this._transformCharacter(character);
    }


    getAllBooks = async () => {
        const res = await this.getResource(`books/`)
        return res.map(this._transformBook)
    }

    getBook = async (id) => {
        const book = await this.getResource(`books/${id}`)
        return this._transformBook(book)
    }

    getAllHouses = async ()  => {
        const res = await this.getResource(`houses/`)
        return res.map(this._transformHouse)
    }

    getHouse = async (id) => {
        const house = await this.getResource(`houses/${id}/`)
        return this._transformHouse(house)
    }


    _transformCharacter = (char) => {
        return {
            id: char.url.split("/")[5],
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }



    _transformHouse = (house) => {
        return {
            id: house.url.split("/")[5],
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook = (book) => {
        return {
            id: book.url.split("/")[5],
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }



}

// const got = new GotServcie();
// got.getAllCharacters()
//     .then(res =>{ 
//         console.log(res.forEach(item => console.log(item.name)));
//     });
//
// got.getCharacter(130)
//     .then(res => console.log(res));


// let url = 'https://jsonplaceholder.typicode.com/posts/',
//     data = {
//         username: 'example'
//     };

// fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) => console.log('Seccess', myJson))
//     .catch(error => console.error('Error', error));



// getResource(url + '1000')
//     .then((myJson) => console.log('Success', myJson))
//     .catch(error => console.log('Error', error));