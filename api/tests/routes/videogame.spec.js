/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn, Genero } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};
const genre = {
  name: 'Action'
}

xdescribe('Verifing routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  describe('1. GET /videogames', () => {
    it('should get 200', (done) => {
      agent.get('/videogames').expect(200)
      done()
    });
  });
  describe('2. GET /genres', () => {
    it('should get 200', (done) => {
      agent.get('/genres').expect(200)
      done()
    });
  });
  describe('3. GET /plataformas', () => {
    it('should get 200', () =>
      agent.get('/plataformas').expect(200)
    );
  });
  describe('4. POST /videogame', () => {
    it('should get 200', (done) => {
      agent.post('/videogame')
      .send({
      name: "Henry",
      description: "un video juego full stack",
      released: '2020',
      rating: 10,
      image:'https://avatars.githubusercontent.com/u/57154655?s=200&v=4',
      genre: [4, 3, 10],
      plat: [6, 4, 5]
      }).expect(200)
      done()
    });
  });
});

xdescribe("Verifing responses", () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(() => {
    Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame));
    Genero.sync({forse: true})
    .then(() => Genero.create(genre));
  });

  //TESTING TO GET /videogames

  describe("1. GET /videogames", () => {
    it("should get an array whit length to equal 15", () => {
      agent.get("/videogames")
      .end((err,res) => {
        expect(res.body.length).to.equal(15)
      })
    });
    it("when send cant=1 as query, should get an array whit length to equal 2", () => {
      agent.get("/videogames?cant=1")
      .end((err,res) => {
        expect(res.body.length).to.equal(2) //devuelve dos valores porque al principio de este test estoy creando
      })                                    // un segundo valor en la tabla, mas el que pido al endpoint
    });
    it("when send name=grannddd as query, should get an array whit length to equal 5(from API)", () => {
      agent.get("/videogames?name=grannddd")
      .end((err,res) => {
        expect(res.body.length).to.equal(5)
      })
    });
  })
  
  //TESTING TO GET /videogame

  describe("2. GET /videogame", () => {
    it("should get an object", () => {
      agent.get("/videogame/1")
      .end((err,res) => {
        expect(typeof res.body).to.equal('object')
      })
    });
    it("should a string whit the name of the game", () => {
      agent.get("/videogame/1")
      .end((err,res) => {
        expect(res.body.name).to.equal('D/Generation HD')
      })
    });
  })

  //TESTING TO GET /genres

  describe("3. GET /genres", () => {
    it("should get a name property", () => {
      agent.get("/genres")
      .end((err,res) => {
        expect(res.body[0].name !== undefined).to.equal(true)
      })
    });
  })

  //TESTING TO GET /plataformas

  describe("4. GET /plataformas", () => {
    it("should get a name property", () => {
      agent.get("/plataformas")
      .end((err,res) => {
        expect(res.body[0].name !== undefined).to.equal(true)
      })
    });
  })

  //TESTING TO POST /videogame

  describe("5. POST /videogame", () => {
    it("should send 400 if property name is not sent", () => {
      agent.post("/videogame")
      .send({
        
        description: "un video juego full stack",
        released: '2020',
        rating: 10,
        image:'https://avatars.githubusercontent.com/u/57154655?s=200&v=4',
        genre: [4, 3, 10],
        plat: [6, 4, 5]
        })
      .expect(400)
    });
  })
})
