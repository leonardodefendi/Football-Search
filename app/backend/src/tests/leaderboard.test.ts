import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from "../database/models/MatchesModel";
import SequelizeTeam from "../database/models/TeamsModel";
import { allMatches, matchesOrder, matchesOrderAway, matchesOrderLeader } from "./mocks/matchs.mock";
import { allTeams } from "./mocks/teams.mock";
chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes rota /leaderboard/home', function() {
  beforeEach(function() {
    sinon.restore()
  });
  it('Verifica se retorna corretamente em /leaderboard/home', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);
    const {status, body} = await chai.request(app).get('/leaderboard/home');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesOrder)
  })
  it('Verifica se retorna corretamente em /leaderboard/away', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);
    const {status, body} = await chai.request(app).get('/leaderboard/away');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesOrderAway)
  })
  it('Verifica se retorna corretamente em /leaderboard', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);
    const {status, body} = await chai.request(app).get('/leaderboard');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesOrderLeader)
  })
})