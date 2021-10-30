const express = require('express');
const router = express.Router();
let Guest = require('../models/guest')

/* GET home page. */
router.get('/', function(req, res) {
  Guest.find().then(guest => res.json(guest)).catch(err => res.status(400).json('Error' + err));
});

router.post('/add', function(req, res) {
    const name = req.body.name
    const attending = req.body.attending
    const Dietary = req.body.Dietary
    const numberOfGuests = req.body.numberOfGuests
    const guestName = req.body.guestName
    const guestMeal = req.body.guestMeal
    const guestDietary = req.body.guestDietary
    const Entree = req.body.Entree

    const guest = {
        name, 
        attending,
        Dietary,
        numberOfGuests,
        guestName, 
        guestMeal,
        guestDietary,
        Entree,
    }

    const newGuest = new Guest(guest);

    newGuest.save().then(() => res.json('Guest Added')).catch(err => res.status(400).json('Error' + err))
})

router.post('/update/:id', function(req, res) {
    Guest.findById(req.params.id).then(guest => {
        guest.name = req.body.name
        guest.attending = req.body.attending
        guest.Dietary = req.body.Dietary
        guest.numberOfGuests = req.body.numberOfGuests
        guest.guestName = req.body.guestName
        guest.guestMeal = req.body.guestMeal
        guest.guestDietary = req.body.guestDietary
        guest.Entree = req.body.Entree

        guest.save();
    }).then(() => res.json('Guest Updated')).catch(err => res.status(400).json('Error' + err))
})


module.exports = router;