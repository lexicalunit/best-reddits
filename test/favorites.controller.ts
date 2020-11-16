import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Favorites', () => {
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
