import jwt from 'jsonwebtoken';

const genrateAccessToken = (userId, res) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN, {
        expiresIn : '15d'
    });

    res.cookie("jwtToken", accessToken, {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "strict"
    })
}

export default genrateAccessToken;