import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from "../database/models/MatchesModel";
import { matches, matchesFinished, matchesInProgres } from "./mocks/matchs.mock";
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
})