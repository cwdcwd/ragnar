exports.PORT = process.env.PORT || 5000; // use heroku's dynamic port or 5000 if localhost
exports.HOST=process.env.HOST || 'localhost';
exports.DEBUG = true;
exports.ENVIRONMENT = (process.env.STATE==='production')?'production':'sandbox';
exports.CALLBACK_URL = this.HOST+':' + this.PORT + '/oauth/callback';

exports.CLIENT_ID = process.env.CLIENT_ID;
exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
exports.API_VERSION = 'v29.0';

process.env.SFDC_USERNAME=process.env.CDF_USERNAME;
process.env.SFDC_PASSWORD=process.env.CDF_PASSWORD;