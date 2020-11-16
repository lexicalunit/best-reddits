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
        expect(r.body).to.be.an('array').of.length(1);
      }));

  it('should add a new user', () =>
    request(Server)
      .post('/api/v1/users')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('name').equal('test');
      }));

  it('should get a user by id', () =>
    request(Server)
      .get('/api/v1/users/c558d991-8c8e-40d1-af48-2d680d8cd075')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('name').equal('Amy Troschinetz');
      }));

  it('should update a user by id', () =>
    request(Server)
      .put('/api/v1/users/c558d991-8c8e-40d1-af48-2d680d8cd075')
      .send({ name: 'Just Amy' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('name').equal('Just Amy');
      }));

  it('should get a user favorites by id', () =>
    request(Server)
      .get('/api/v1/users/c558d991-8c8e-40d1-af48-2d680d8cd075/favorites')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(1);
      }));

  it('should add a new favorite', () =>
    request(Server)
      .post('/api/v1/favorites')
      .send({ link: 'http://example.com', user_id: 'c558d991-8c8e-40d1-af48-2d680d8cd075' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('object').that.has.property('link').equal('http://example.com');
      }));

  it('should get a favorite by id', () =>
    request(Server)
      .get('/api/v1/favorites/43da97e3-b219-4215-b31c-16171c413b49')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('link')
          .equal('https://www.reddit.com/r/hognosesnakes/');
      }));

  it('should delete a favorite by id', () =>
    request(Server)
      .delete('/api/v1/favorites/43da97e3-b219-4215-b31c-16171c413b49')
      .then((r) => {
        expect(r.status).to.eq(204);
      }));
});
