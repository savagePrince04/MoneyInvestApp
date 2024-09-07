const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

try {
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1")
    console.log("Server Working fine")
} catch (error) {
console.log(error)
}

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
