import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
import { invalidPassword, invalidEmail, userValid, validBodyLogin } from "./mocks/users.mock";
import Validations from "../middlewares/validations";
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUsers from "../database/models/UsersModel";

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes /login e /login/role', function() {
  beforeEach(function() {
    sinon.restore()
  })

  it('Deve retornar um erro se não for passado email não for passado /login', async function() {
    const {status, body} = await chai.request(app).post('/login').send({password: 'teste123'});
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })
  })
  it('Retorna erro se não for passado uma senha /login', async function() {
    const {status, body} = await chai.request(app).post('/login').send({email: 'admin@admin.com'})
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })
  })
  it('Deve retornar um erro se a senha estiver incorreta /login', async function() {
    const {status, body} = await chai.request(app).post('/login').send(invalidPassword);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: 'Invalid email or password'})
  });

  it('Deve retornar um erro se não existir o email /login', async function() {
    const {status, body} = await chai.request(app).post('/login').send(invalidEmail)
    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: 'Invalid email or password'})
  });

  it('Deve retornar um token caso seja possivel fazer o login /login', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userValid as any);
    sinon.stub(jwt, 'sign').returns();
    sinon.stub(Validations, 'validateLoginFields').returns();

    const {status, body} = await chai.request(app).post('/login').send(validBodyLogin);
    expect(status).to.equal(200);
  });

  it('Deve retornar um erro caso o email seja de formato invalido /login', async function() {
    const {status, body} = await chai.request(app).post('/login').send({email: 'teste.com', password: '1234567'});
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' })
  })

  it('Retorna erro caso não seja passado um token para /login/role', async function() {
    const {status, body} = await chai.request(app).get('/login/role').send();
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' })
  })

})