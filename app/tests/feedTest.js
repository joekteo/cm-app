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
        console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.cnt).to.be.a('string');
        expect(res.body.comment).to.be.a('array');
        done();
      });
  });

  it('adds a comment to the exact post', function(done) {
    chai.request(server)
      .get('/comments/:titleID/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.comment).to.be.a('string');
        expect(res.body.length).to.eql(1);
        done();
      });
  });

  it('get all feed', function(done) {
    chai.request(server)
      .get('/comments/:ref')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.be.a('Array');
        expect(Array.isArray(res.body)).to.equal(true);
        done();
      });
  });
});
