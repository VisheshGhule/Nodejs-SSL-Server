const express = require('express');
const app = express();
const hostname = '54.188.26.38'; // Your server ip address
const port = 3000;

const version = '1.0.0';

app.get('/', (req, res) => {
    // set response content    
    res.sendFile(__dirname + "/html/index.html"); 
    console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

})

// Health check
app.get('/health', (req, res) => {    
    res.sendStatus(200);
    console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);
})

app.listen(port, '0.0.0.0', () => {
    console.log(`[Version ${version}]: Server running at http://0.0.0.0:${port}/`);
});
