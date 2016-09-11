var env = process.env.NODE_ENV || 'dev';
if (env === 'production') {
	module.exports = {
		server: process.env.DB_SERVER
	}
} else {
	module.exports = {
		server: 'localhost'
	}
}
