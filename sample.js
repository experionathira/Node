var express=require("express");
var expres=express();
var app=express.Router();
var fs=require("fs");
var _= require("lodash");
var body_parser= require("body-parser");

expres.use(body_parser.urlencoded({extended:true}));
expres.use(body_parser.json());


app.route('/view').get( function(request, response) {
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      // var peopleJSON = JSON.stringify(data);
      var people=JSON.parse( data );

      console.log(people);
      

      response.send(people);
      
    }
    
  });




  // var people = [
  //   { name: 'Dave', location: 'Atlanta' },
  //   { name: 'Santa Claus', location: 'North Pole' },
  //   { name: 'Man in the Moon', location: 'The Moon' }
  // ];


  
  
});


app.route('/delete').delete(function(request,response){
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }

    else {
      var people=JSON.parse( data );
      delete people[0];
      people=JSON.stringify(people);
      fs.writeFile('people.json',people,function(err){
        if (err) {
          console.log("error");
        }
        else
        {
           console.log(people);
           response.send(people);
        }
      });

     

    }
  
  });
});

app.route('/view/:username')

.get( function(request, response) {
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      // var peopleJSON = JSON.stringify(data);
      var people=JSON.parse( data );

      console.log(people);
      

      response.send(_.find(people,{"name": request.params.username}));
      
    }
    
  });
});


app.route('/delete/:username')

.delete( function(request, response) {
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      var people=JSON.parse(data);
      _.remove(people,{"name":request.params.username});
      people=JSON.stringify(people);
      fs.writeFile('people.json',people,function(err){
        if(err){
          console.log("error");
        }
        else{
          console.log(people);
          response.send(people);
        }

      });
  
    }
  });
});


app.route('/update/:username/:age')

.put( function(request, response) {
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }

    else{
       
      var people =JSON.parse(data);

      people=people.filter(function(item){

      if(item.name==request.params.username){
        item.age=request.params.age;

      }
      return item;
      });

      people=JSON.stringify(people);
      fs.writeFile('people.json',people,function(err){
      if(err){
        console.log("error");
      }
      else{
        console.log(people);
        response.send(people);
      }

      });

    
    }
  });
});


app.route('/post')
.post (function (request,response){
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){

    if (err) {
      return console.log("error");
    }

    else{

      var content=request.body;
      var people=JSON.parse(data);
      console.log(people);
      people.push(content);
      people=JSON.stringify(people);
      fs.writeFile("people.json",people,function(err){
        if (err) {
          return console.log("error");
        }

        else {
          response.send(people);
          console.log("Upadted the file ");
        }
      });
    }
  });



});









expres.use('/',app);

expres.listen(8081, function(){
  console.log("server started");
});
