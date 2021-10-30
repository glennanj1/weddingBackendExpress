const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GuestSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    attending: {type: Boolean, required: true},
    numberOfGuests: {type: Number, required: true},
    Entree: {type: String},
    Dietary: {type: String, maxLength: 100},
    guestName: {type: String},
    guestMeal: {type: String},
    guestDietary: {type: String, maxLength: 100},
  }
);


//Export model
module.exports = mongoose.model('Guest', GuestSchema);