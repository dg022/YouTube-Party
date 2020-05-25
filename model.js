var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CodeSchema = new Schema({
 
  code: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Code = mongoose.model("Code", CodeSchema);

// Export the Article model
module.exports = Code;