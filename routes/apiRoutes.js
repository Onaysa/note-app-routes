const router = require("express").Router();
const fs = require("fs");
const {readFromFile, writeToFile, readAndAppend}= require("../helpers/fsUtils");
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes", (req, res) => {
 readFromFile("./db/db.json") .then(function(data){
  let allNotes = JSON.parse(data);
  console.log(data,allNotes);
  res.json(allNotes) 

 }) .catch(function(err){
    console.log(err)
    res.json(err)
 })

});

router.post("/api/notes", (req, res) => {
  
  console.log(req.body);
 

if (req.body) {
let newNote = {
   
     title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
      
    };
    
    readAndAppend(newNote, "./db/db.json");

    res.json(`Note has been added`);
    const saveNote = {
      status: 'success',
      body: newNote,
    };

    res.json(saveNote);
  } else {
    res.json('Error in posting Note')
  }
  //db is array, think about array function to add new element or value of an array
  //think about update the revised db with new data into the db.json file
});

router.delete("/api/notes", (req, res) => {

});

module.exports = router;
