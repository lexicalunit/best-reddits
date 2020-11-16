import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('User', () => {
  it('should get all users', () =>
    request(Server)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(2);
      }));

  it('should add a new user', () =>
    request(Server)
      .post('/api/v1/users')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('name').equal('test');
      }));

  it('should get an user by id', () =>
    request(Server)
      .get('/api/v1/users/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('name').equal('test');
      }));
});
