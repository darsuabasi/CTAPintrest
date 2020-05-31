const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        req.user_id = uid;
        next();
    } catch (err) {
        console.log("Code broke muahahahaha", err);
        res.status(401).json({message: "No authenticated user... fraud alert"});
    }
}

module.exports = {
    checkFirebaseToken
}