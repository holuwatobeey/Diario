import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
describe('Entries', () => {
  it('should return welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Diario Api v1.0.0');
        done();
      });
  });
  it('should return all entries ', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.entries[0]).to.have.property('id').equal(1);
        expect(res.body.entries[0]).to.have.property('title').equal('My Title');
        expect(res.body.entries[0]).to.have.property('body').equal('The body');
        expect(res.body.entries[0]).to.have.property('date').equal('5-7-2018');
        expect(res.body.entries[0]).to.have.property('userId').equal(5);
        done();
      });
  });
  it('should return an entry if a valid id is passed', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.entry).to.have.property('title').equal('My Title');
        expect(res.body.entry).to.have.property('body').equal('The body');
        expect(res.body.entry).to.have.property('userId').equal(5);
        expect(res.body.entry).to.have.property('date').equal('5-7-2018');
        expect(res.body.entry).to.have.property('id').equal(1);
        done();
      });
  });
  it('should not return an entry with an invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/25')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status').equal('error');
        done();
      });
  });
});