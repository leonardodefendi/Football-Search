import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from "../database/models/MatchesModel";
import { InvaliCreatedMatches, bodyReturnCreatedMatch, matches, matchesFinished, matchesInProgres, scoreMatchesUpdate, teamAway, teamHome, teamsWithSameId, validCreatedMatches } from "./mocks/matchs.mock";
import { token } from "./mocks/users.mock";
import SequelizeTeam from "../database/models/TeamsModel";
chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes rota /matches', function () {
  beforeEach(function() {
    sinon.restore()
  });

  it('Verifica se é possivel retornar todos os times com o método get', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const {status, body} = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matches);
  });
  it('Verifica se não encontrar nenhuma partida /matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves([]);
    const {status, body} = await chai.request(app).get('/matches');
    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Teams not found' });
  })
  it('Verifica se é possivel retornar os times filtrando por inProgress=true', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgres as any);
    const {status, body} = await chai.request(app).get('/matches').query({inProgress: 'true'});
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesInProgres);
  });

  it('Verifica se é possivel retornar os times filtrando por inProgress=false', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesFinished as any);
    const {status, body} = await chai.request(app).get('/matches').query({inProgress: 'false'});
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(matchesFinished);
  })

  it('Verifica se é possivel atualizar o progresso de uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    const {status, body} = await chai.request(app).patch('/matches/47/finish').set('Authorization', token);
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({message: 'Finished'});
  })

  it('Verifica se é possivel atualizar o score de uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    const {status, body} = await chai.request(app).patch('/matches/1').send(scoreMatchesUpdate).set('Authorization', token);
    expect(status).to.equal(200);
    expect(body).to.deep.equal({message: 'ok'})
  })

  it('Verifica se ao tentar criar o time, for passado um time inexistente retorna erro', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(undefined).onSecondCall().resolves(undefined);
    const {status, body} = await chai.request(app).post('/matches').send(InvaliCreatedMatches).set('Authorization', token);
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });

  it('Verifica se for passado um time existente, é possivel cadastrar a partida', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamHome as any).onSecondCall().resolves(teamAway as any);
    const {status, body} = await chai.request(app).post('/matches').send(validCreatedMatches).set('Authorization', token);
    expect(status).to.equal(201);
    expect(body).to.have.property('id');
  })
  it('Verifica se não é possivel criar uma partida com dois times iguais', async function() {
  sinon.stub(SequelizeTeam, 'findByPk').resolves(teamHome as any).onSecondCall().resolves(teamHome as any);
  const {status, body} = await chai.request(app).post('/matches').send(teamsWithSameId).set('Authorization', token);
  expect(status).to.equal(422);
  expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })
})