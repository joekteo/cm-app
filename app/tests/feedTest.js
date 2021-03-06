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
      .post('/feed/testTitle')
      .end(function(err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.title).to.be.a('string');
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
        expect(res.body.comment[0]).to.be.a('object');
        done();
      });
  });

  it('get all feed', function(done) {
    chai.request(server)
      .post('/feed/KG_RETIRES')
      // .send({title: 'Kevin Garnett is retiring!!!', time: Date.now()})
      .end(function(data) {
        console.log(data.body);
      });
    var pastTime = Date.now() - (10 * 60 * 1000);
    chai.request(server)
      .get('/feed/50/' + pastTime)
      .end(function(err, res) {
        console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.be.a('Array');
        done();
      });
  });
});
