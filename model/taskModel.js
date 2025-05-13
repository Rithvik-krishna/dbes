const express = require('express');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema ({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        minLength : 10
    },
    dueDate : {
        type : Number,
        required :true
    },
    status : {
        type : String,
        enum : [ 'pending' , 'completed' ]
    },
    userId : {
        required : true
    }
});

module.exports = mongoose.model("Task", taskSchema);