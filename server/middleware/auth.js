import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
   
    
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).send('Authorization header missing or malformed');
}

const token = authHeader.split(' ')[1];

    // if (!req.headers.authorization) {
    //   res.status(401).json({ message: "unauthorised" });
    // }
    // const token = req.headers.authorization.split("")[1];
    if (!token) {
      res.status(401).json({ message: "unauthorised" });
    }

    const verified = jwt.verify(token, "12345");

    req.user = verified;
    return next();
  } catch (error) {
    console.log("auth malunctioned", error);
  }
};
export default verifyToken;
