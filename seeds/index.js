const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Mongo connected!")
    })
    .catch(err => {
        console.log("Mongo error:")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61eac649c3f7d33db93a42f3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis sagittis sagittis. Sed eleifend a justo in luctus. In consequat sapien tincidunt viverra ultrices. Mauris elementum egestas maximus. Nulla non.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
images: [
    {
        url: 'https://res.cloudinary.com/blucheez/image/upload/v1642945282/YelpCamp/j7fwnsoumes0cichxahy.jpg',
        filename: 'YelpCamp/j7fwnsoumes0cichxahy'
    },
    {
        url: 'https://res.cloudinary.com/blucheez/image/upload/v1642945283/YelpCamp/oys2npfucigln7bbq9lt.jpg',
        filename: 'YelpCamp/oys2npfucigln7bbq9lt'
    }
]
        })
await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

