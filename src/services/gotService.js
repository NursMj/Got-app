export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api'
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch: ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
  
  async getAllCharacters() {
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter)
  };

  async  getCharacter(id) {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(char);
  };

  getBook(id) {
    return this.getResource(`/books/${id}`)
  };

  getHouse(id) {
    return this.getResource(`/houses/${id}`)
  };

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  };

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    }
  };

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      title: house.title,
      overlord: house.overlord,
      ancestralWeappons: house.ancestralWeappons
    }
  };
}