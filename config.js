var config = require('config');

// Config Object
var Config = {};

// Site
Config.Site = config.get('Site')

// Meta
Config.Meta = config.get('Meta')

// Database
Config.Database = config.get('Database')

// SendGrid
Config.SendGrid = config.get('SendGrid')

// NotifyEmails
Config.NotifyEmails = config.get('NotifyEmails')

module.exports = Config
