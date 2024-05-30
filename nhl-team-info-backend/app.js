const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../nhl-team-info-frontend/build')));


app.use("*",cors());

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../nhl-team-info-frontend/build/index.html'));
});

const port = process.env.PORT || 5000;

app.use(express.json());

// Route files
const teamRoutes = require('./routes/teamroutes');

// Use Routes
app.use('/api/teams', teamRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/",(req,res)=>{
    res.send("Inside the server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});