const mongoose = require('mongoose');

let uri = 'mongodb+srv://NodeJS:123@cluster0.ghscqmo.mongodb.net/thesis_management?retryWrites=true&w=majority'

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connect successfully");
  } catch (error) {
    console.log('connect failure');
  }
}

module.exports = { connect };