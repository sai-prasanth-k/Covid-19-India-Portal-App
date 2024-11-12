const jwt = require('jsonwebtoken');

const authenticationToken = (request, response) => {
    const authHeader = request.headers['authorization'];
    let token;
    if (authHeader) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return response.status(401).send('Invalid JWT Token');
    }
    jwt.verify(token, "MY_SECRET_KEY", (err, user) => {
        if (err) {
            return response.status(400).send("Invalid JWT Token");
        }
        request.username = user.username;
        next();
    })
}

module.exports = {authenticationToken};