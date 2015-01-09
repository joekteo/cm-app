'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var server = 'http://localhost:' + (process.env.PORT || 3000);
require('../../server.js');
chai.use(chaihttp);

describe('Feed Backend Tests', function() {

  it('create a new post and saves to the database', function(done) {
    chai.request(server)
      .post('/feed/546e84559fdea70b002bb182/leagueoflegends')
      .send({cnt:'this is fake content', comment:'this is a test'})
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.content).to.be.a('string');
        expect(res.body.comment).to.be.a('array');
        done();
      });
  });

  it('adds a comment to the exact post', function(done) {
    chai.request(server)
      .post('/comments/546e84559fdea70b002bb182')
      .send({author:'fakeUser05', cnt:'this is fake content'})
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.comment[1]).to.be.a('object');
        done();
      });
  });

  it('get all feed', function(done) {
    chai.request(server)
      .get('/feed/546e84559fdea70b002bb182/3')
      .end(function(err, res) {
        console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.be.a('Array');
        expect(Array.isArray(res.body)).to.equal(true);
        done();
      });
  });
});
