import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import HTTPMap from '../utils/httpStatusMap';

describe('HTTPMap Tests', function () {
  it('Verifica as chamadas da funcao HTTPMap', function() {
    const succes = HTTPMap('SUCCESSFUL');
    const invalid = HTTPMap('INVALID_DATA');
    const notFound = HTTPMap('NOT_FOUND');
    const conflict = HTTPMap('CONFLICT');
    const unauthorized = HTTPMap('UNAUTHORIZED');
    const defaultReturn = HTTPMap('teste');
    expect(succes).to.equal(200);
    expect(invalid).to.equal(400);
    expect(notFound).to.equal(404);
    expect(conflict).to.equal(409);
    expect(unauthorized).to.equal(401);
    expect(defaultReturn).to.equal(500);
  })
})