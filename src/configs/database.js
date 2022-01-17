const mongoose = require('mongoose');

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', async () => {
    console.log(`MongoDB connected`);
});
mongoose.connection.on('disconnected', () => console.log(`MongoDB disconnected at ${uri}`));
mongoose.connection.on('error', (error) => console.error('ERROR CONNECTION MONGODB', error));

module.exports = mongoose;