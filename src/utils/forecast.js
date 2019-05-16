const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6147f41f7be1da4d64e83983f04c53a6/${encodeURIComponent(latitude)}, ${encodeURIComponent(longitude)}`;

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            console.log(chalk.red.inverse(error));
            callback('Unable to connect to location services', undefined);
        } else if(body.error) {
            callback('Coordinate error', undefined);} 
        else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;