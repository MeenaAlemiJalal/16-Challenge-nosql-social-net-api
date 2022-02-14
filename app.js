const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect('mongodb+srv://meena:12345@cluster0.rfrsx.mongodb.net/social-net-api?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));