const express = require('express');
const cors = require('cors');
const { authRouter } = require('./routes/auth');
const shiftsRoute = require('./routes/shifts');  // Import the shifts route


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Routes
app.use('/api/auth', authRouter);  // Auth routes
app.use('/api/shifts', shiftsRoute);  // Shifts routes


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});