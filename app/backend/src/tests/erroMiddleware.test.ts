import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';

describe('errorMiddleware', () => {
  beforeEach(function() {
    sinon.restore()
  });
  it('Retorna o status correto e a message correta', () => {
    const error = {
      name: 'Custom error',
      statusCode: 404,
      message: 'Not Found',
    };

    const jsonSpy = sinon.spy();
    const statusSpy = sinon.stub().returns({ json: jsonSpy });

    const res = { status: statusSpy } as unknown as Response;

    errorMiddleware(error, {} as any, res, {} as any);

    expect(statusSpy.calledWith(404)).to.be.true;
    expect(jsonSpy.calledWith({ message: 'Not Found' })).to.be.true;
  });
});
