import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from "../database/models/TeamsModel";
import {team, teams} from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function() {

  beforeEach(function() {
    sinon.restore()
  })
  it('Verifica se retorna todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Verifica se é possivel filtrar pelo id', async function() {
    sinon.stub(SequelizeTeam,'findByPk').resolves(team as any);
    const {status, body} = await chai.request(app).get('/teams/2');
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Verifica se não conseguir encontrar um time pelo id', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const {status, body} = await chai.request(app).get('/teams/3');
    expect(status).to.be.equal(404);
    expect(body).to.deep.equal({message: 'Team not found'})
  });


});