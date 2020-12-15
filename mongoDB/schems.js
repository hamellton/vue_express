const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let contacts = new Schema({
	_id: String,
	name: String,
	value: String
})
let mongos = mongoose.model('mongos', contacts)

// const mongoSchema = new Schema({
// 	_id: String,
// 	name: String,
// 	value: String
// })

module.exports = mongos