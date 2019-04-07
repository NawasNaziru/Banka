//Dbase defnition

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

var resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

var Location = mongoose.model('Location', locationSchema);


//Dbase manipulation using mongoose

Location.create([{name: 'Starlight',
address: '125 High Street, Reading, RG6 1PS',
rating: 3,
facilities: ['Hot drinks', 'Food', 'Premium wifi'],
coords: [8.675277, 9.081999],
openingTimes: [{
days: 'Monday - Friday',
opening: '7:00am',
closing: '7:00pm',
closed: false
}, {
days: 'Saturday',
opening: '8:00am',closing: '5:00pm',
closed: false
}, {
days: 'Sunday',
closed: true
}]},{name: 'Pigeon',
address: '125 High Street, Reading, RG6 1PS',
rating: 3,
facilities: ['Hot drinks', 'Food', 'Premium wifi'],
coords: [7.4571776, 9.0652672],
openingTimes: [{
days: 'Monday - Friday',
opening: '7:00am',
closing: '7:00pm',
closed: false
}, {
days: 'Saturday',
opening: '8:00am',closing: '5:00pm',
closed: false
}, {
days: 'Sunday',
closed: true
}]},{name: 'NITU',
address: '128 Down Street, kuala lumpur, Malaysia',
rating: 3,
facilities: ['Books', 'Food', 'Premium wifi'],
coords: [7.4571761, 9.0652690],
openingTimes: [{
days: 'Monday - Friday',
opening: '7:00am',
closing: '7:00pm',
closed: false
}, {
days: 'Saturday',
opening: '8:00am',
closing: '5:00pm',
closed: false
}, {
days: 'Sunday',
closed: true
}]},{name: 'Darul Iman',
address: '125 Raudah Street, Mecca, KSA',
rating: 3,
facilities: ['Tea', 'Food', 'Premium wifi'],
coords: [3.3792057, 6.5243793],
openingTimes: [{
days: 'Monday - Friday',
opening: '7:00am',
closing: '7:00pm',
closed: false
}, {
days: 'Saturday',
opening: '8:00am',closing: '5:00pm',
closed: false
}, {
days: 'Sunday',
closed: true
}]}], function(error){
   if(error){
     console.log(error);
   }
 else console.log('successfully added')
 }
);
