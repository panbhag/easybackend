var GameScore = Parse.Object.extend("GameScore");
var Student = Parse.Object.extend("Student");
var Teacher = Parse.Object.extend("Teacher");

var should = chai.should();

Parse.initialize("QO46STJFu2cVmzDetUY5ajQJUC9mTliYdrdorVGg", "A8qOc368LPaVJyNiJshACnfbnc90EnRVrdMt6h6q");

//runs once before all tests
before(function(done){
  Parse.Cloud.run("initTest",{},function(){
    console.log("initialized test data");
    done();
  })
})

//runs once after all tests
after(function(done){
  Parse.Cloud.run("clearTestData",{},function(){
    console.log("cleared test data");
    done();
  })
})


describe("save method",function(){
     //pending things
     // negative assertions, create from assertion class

    //clears data after save method testing 
    after(function(done)
    {

      Parse.Cloud.run("clearGameScore",{},function(){
         console.log("cleared GameScore");
         done();
      })

    })

    it("should be able to save the object",function(done){
    
        var gameScore = new GameScore();
         
        gameScore.set("score", 1337);
        gameScore.set("playerName", "Sean Plott");
        gameScore.set("cheatMode", false);

        gameScore.save(null, {
          success: function(response) {

            response.should.have.property("id");
            response.should.have.property("createdAt");
            done();

            // Execute any logic that should take place after the object is saved.
            //alert('New object created with objectId: ' + gameScore.id);

          },
          error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);           
          }
        });

    })

})


describe('retrive by id',function(){

    //clears data after find by id testing
    after(function(done)
    {

      Parse.Cloud.run("clearGameScore",{},function(){
         console.log("cleared GameScore");
         done();
      })

    })

    it("should be able to save the object with all the fields",function(done){
    
        var gameScore = new GameScore();
         
        gameScore.set("score", 1337);
        gameScore.set("playerName", "Sean Plott");
        gameScore.set("cheatMode", false);

        gameScore.save(null, {
          success: function(response) {


            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.get(response.id, {
              success: function(gameScore) {
                // The object was retrieved successfully.
                gameScore.id.should.equal(response.id);
                gameScore.get("score").should.equal(1337);
                gameScore.get("playerName").should.equal("Sean Plott");
                gameScore.get("cheatMode").should.equal(false);
                done();
                //TODO: compare object attributes

              },
              error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
              }
            });

            
            // Execute any logic that should take place after the object is saved.
            //alert('New object created with objectId: ' + gameScore.id);

          },
          error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);           
          }
        });

    })
})


describe("update should update data",function(){

   //clears data after update testing
   after(function(done)
    {

      Parse.Cloud.run("clearGameScore",{},function(){
         console.log("cleared GameScore");
         done();
      })

  })

  it("should save all the updated data",function(done){




        var gameScore = new GameScore();
         
        gameScore.set("score", 1337);
        gameScore.set("playerName", "Sean Plott");
        gameScore.set("cheatMode", false);

        gameScore.save(null, {
          success: function(response) {


            var query = new Parse.Query(GameScore);
            query.get(response.id, {
              success: function(gameScore) {

                gameScore.set("score",100);
                gameScore.set("cheatMode",true);
                gameScore.set("playerName","Pankaj");

                gameScore.save(null,{success:function(saveResponse){

                  var freshQuery = new Parse.Query(GameScore);

                  freshQuery.get(response.id,{success:function(gameScoreUpdated){
                    gameScoreUpdated.id.should.equal(response.id);
                    gameScoreUpdated.get("score").should.equal(100);
                    gameScoreUpdated.get("playerName").should.equal("Pankaj");
                    gameScoreUpdated.get("cheatMode").should.equal(true);
                    done();
                  }
                })

                }})
                // The object was retrieved successfully.

                //TODO: compare object attributes

              },
              error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
              }
            });

            
            // Execute any logic that should take place after the object is saved.
            //alert('New object created with objectId: ' + gameScore.id);

          },
          error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);           
          }
        });


  })





})


describe("find",function(){

  it("should find by single constrain",function(done){

    var query = new Parse.Query(Student);
    query.equalTo("rank", 1);
    query.find().then(function(results) {

        results.should.have.length(1);
        results[0].get("name").should.equal("Pankaj");
        done();

      });
  })

  
  it("should find by multiple constrains",function(done){

    var query = new Parse.Query(Student);
    query.equalTo("rank", 3);
    query.equalTo("stream","science")
    query.find().then(function(results) {

        results.should.have.length(1);
        results[0].get("name").should.equal("Sachin");
        done();

      });
  })



  it("should find by $not equal to",function(done){
    var query = new Parse.Query(Student);
    query.notEqualTo("stream","science")
    query.find(function(results) {

        results.should.have.length(2);
        results[0].get("name").should.equal("Satish");
        results[1].get("name").should.equal("Aman");
        done();

      })
  });



  it("should find by greater than",function(done)
  {
        var query = new Parse.Query(Student);
        query.greaterThan("score",80)
        query.find(function(results) {

        results.should.have.length(2);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        done();

      })
  });
  it("should find by greater than or equal to",function(done)
  {
        var query = new Parse.Query(Student);
        query.greaterThanOrEqualTo("score",80)
        query.find(function(results) {

        results.should.have.length(3);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        results[2].get("name").should.equal("Sachin");
        done();

      })
  });
  it("should find by less than",function(done)
  {
        var query = new Parse.Query(Student);
        query.lessThan("score",80);
        query.find(function(results) {

        results.should.have.length(2);
        results[0].get("name").should.equal("Satish");
        results[1].get("name").should.equal("Aman");
        done();

      })
  });
  it("should find by lest than or equal to",function(done)
  {
        var query = new Parse.Query(Student);
        query.lessThanOrEqualTo("score",80)
        query.find(function(results) {

        results.should.have.length(3);
        results[0].get("name").should.equal("Sachin");
        results[1].get("name").should.equal("Satish");
        results[2].get("name").should.equal("Aman");
        done();

      })
  });


  it("should find by included in",function(done)
  {
        var query = new Parse.Query(Student);
        query.containedIn("rank",[1,2,3])
        query.find(function(results) {

        results.should.have.length(3);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        results[2].get("name").should.equal("Sachin");
        done();

      })
  });
  it("should find by not included in",function(done)
  {
        var query = new Parse.Query(Student);
        query.notContainedIn("rank",[1,2,3])
        query.find(function(results) {

        results.should.have.length(2);
        results[0].get("name").should.equal("Satish");
        results[1].get("name").should.equal("Aman");
        done();

      })
  });
  it("should find objects if field exists",function(done)
  {
        var query = new Parse.Query(Student);
        query.exists("defaulter")
        query.find(function(results) {

        results.should.have.length(1);
        results[0].get("name").should.equal("Pankaj");
        done();

      })
  });
  it("should find objects if field doesnot exists",function(done){

        var query = new Parse.Query(Student);
        query.doesNotExist("defaulter")
        query.find(function(results) {

        results.should.have.length(4);
        results[0].get("name").should.equal("Ajit");
        results[1].get("name").should.equal("Sachin");
        results[2].get("name").should.equal("Satish");
        results[3].get("name").should.equal("Aman");
        done();

  });

  });      

  it("should find by matchesKeyInQuery",function(done){
      var teacherQuery = new Parse.Query(Teacher);
      teacherQuery.equalTo("branch","science");
      var studentQuery = new Parse.Query(Student);
      studentQuery.matchesKeyInQuery("stream","branch",teacherQuery); //students of bawa
      studentQuery.find(function(results){
        results.should.have.length(3);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        results[2].get("name").should.equal("Sachin");
        done();
      })
  });
  it("should find by doesNotMatchKeyInQuery",function(done){
      var teacherQuery = new Parse.Query(Teacher);
      teacherQuery.equalTo("branch","commerce");
      var studentQuery = new Parse.Query(Student);
      studentQuery.doesNotMatchKeyInQuery("stream","branch",teacherQuery); //students of bawa
      studentQuery.find(function(results){
        results.should.have.length(3);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        results[2].get("name").should.equal("Sachin");
        done();
      })
  });
  it("should select selected fields only");
  it("should search in array for particular value",function(done){
    var query = new Parse.Query(Student);
    query.equalTo("subjects", "chemistry");
    query.find().then(function(results) {

        results.should.have.length(1);
        results[0].get("name").should.equal("Pankaj");
        done();

      });
  });

  it("should search in array for all values",function(done){
    var query = new Parse.Query(Student);
    query.containsAll("subjects", ["chemistry","history"]);
    query.find().then(function(results) {
        results.should.have.length(1);
        results[0].get("name").should.equal("Pankaj");
        done();

      });
  });
  it("should search in array for a set of fields");
  it("startsWith",function(done){
    var query = new Parse.Query(Student);
    query.startsWith("name", "Sa");
    query.find().then(function(results){
      results.should.have.length(2);
      results[0].get("name").should.equal("Sachin");
      results[1].get("name").should.equal("Satish");
      done();
    })
  });

  it("count queries",function(done){
    var query = new Parse.Query(Student);
    query.startsWith("name", "Sa");
    query.count().then(function(result){
      console.log(result);
      result.should.equal(2);
      done();
    })
  });

  
  
  it("should limit the number of records",function(done){
        var query = new Parse.Query(Student);
        query.limit(2)
        query.find().then(function(results){
        results.should.have.length(2);
        results[0].get("name").should.equal("Pankaj");
        results[1].get("name").should.equal("Ajit");
        done();
    })
  });


  it("should skip records",function(done){
        var query = new Parse.Query(Student);
        query.limit(2);
        query.skip(1);
        query.find().then(function(results){
        results.should.have.length(2);
        results[0].get("name").should.equal("Ajit");
        results[1].get("name").should.equal("Sachin");
        done();
  });

  })


it("should sort ascending by a field",function(done){
        var query = new Parse.Query(Student);
        query.ascending("name");
        query.find().then(function(results){
        results[0].get("name").should.equal("Ajit");
        results[1].get("name").should.equal("Aman");
        done();
  });

});

it("should sort descending by a field",function(done){
        var query = new Parse.Query(Student);
        query.descending("name");
        query.find().then(function(results){
        results[0].get("name").should.equal("Satish");
        results[1].get("name").should.equal("Sachin");

        done();
  });

});


it("should sort ascending by multiple fields",function(done){
        var query = new Parse.Query(Student);
        query.ascending("stream,name");
        query.find().then(function(results){
        results[0].get("name").should.equal("Aman");
        results[1].get("name").should.equal("Satish");
        results[2].get("name").should.equal("Ajit");
        results[3].get("name").should.equal("Pankaj");
        results[4].get("name").should.equal("Sachin");
        done();
      });
});

it("should sort descending by multiple fields",function(done){
        var query = new Parse.Query(Student);
        query.descending("stream,-name");
        query.find().then(function(results){
          results[0].get("name").should.equal("Sachin");
          results[1].get("name").should.equal("Pankaj");
          results[2].get("name").should.equal("Ajit");
          results[3].get("name").should.equal("Satish");
          results[4].get("name").should.equal("Aman");
          done();
      });
});

it("relational queries");

it("compound queries",function(done){

  var queryA = new Parse.Query(Student);
  queryA.startsWith("name", "A");

  var queryP = new Parse.Query(Student);
  queryP.startsWith("name", "P");

  var mainQuery = Parse.Query.or(queryA, queryP);

  mainQuery.find().then(function(results){
          results.should.have.length(3);
          results[0].get("name").should.equal("Pankaj");
          results[1].get("name").should.equal("Ajit");
          results[2].get("name").should.equal("Aman");
          done();
      });
})

})

describe("files");
describe("analytics");
describe("users");
describe("roles");
describe('fb users');
describe("cloud functions");
describe('geo points');
describe("push");





