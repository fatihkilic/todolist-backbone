/**
* Include required library for running unit test.
*/
var supertest = require("supertest");
var should = require("should");
var express = require("express");
var bodyParser = require('body-parser');

/**
* To simulate real conditions is required
*/
var app = express();
app.use(bodyParser.json());

/**
* Bind the agent that node server will work
*/
var server = supertest.agent("http://localhost:3000");

/**
* Unit test begin
*/
describe("Checking",function(){
  /**
  * Case #1
  * GET request to the /
  */
  it("The home page whether is running or not",function(done){
    /**
    * Calling home page api
    */
    server
    .get("/")
    .expect("content-type","text/html; charset=UTF-8")
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      if(err){
        console.log("error");
        done(err);
      }
      else {
        done();
      }
    });
  });
  /**
  * Case #2
  * ADD todo
  */
  it("POST request to the /api/todoitems",function(done){
    server
    .post("/api/todoitems")
    .send({ title: 'You should write the test case', completed: 'false'})
    .expect(200) // HTTP response
    .end(function(err,res){
      if(err){
        console.log("error");
        done(err);
      }
    });
    server
    .post("/api/todoitems")
    .send({ title: 'Complete the task', completed: 'false'})
    .expect(200) // HTTP response
    .end(function(err,res){
      if(err){
        console.log("error");
        done(err);
      }
      else {
        done();
      }
    });
  });
  /**
  * Case #3
  * GET all todos
  */
  it("GET request to the /api/todoitems",function(done){
    server
    .get("/api/todoitems")
    .expect(200) // HTTP response
    .end(function(err,res){
      /**
      * To catch first _id in returned JSON for later use.
      */
      forPutMethod = JSON.parse(JSON.stringify(res.body[0]));
      forDeleteMethod = JSON.parse(JSON.stringify(res.body[1]));
      if(err){
        console.log("error");
        done(err);
      }
      else {
        done();
      }
    });
  });
  /**
  * Case #4
  * UPDATE the todo using PUT Method
  */
  it("PUT request to the /api/todoitems/id",function(done){
    server
    .put("/api/todoitems/" + forPutMethod['_id'])
    .send({title: 'Task has been completed!', completed: 'true'})
    .expect(200) // HTTP response
    .end(function(err,res){
      if(err){
        console.log("error");
        done(err);
      }
      else {
        done();
      }
    });
  });
  /**
  * Case #5
  * Delete the todo using DELETE Method
  */
  it("DELETE request to the /api/todoitems/id",function(done){
    server
    .del("/api/todoitems/" + forDeleteMethod['_id'])
    .expect(200) // HTTP response
    .end(function(err,res){
      if(err){
        console.log("error");
        done(err);
      }
      else {
        done();
      }
    });
  });
});
