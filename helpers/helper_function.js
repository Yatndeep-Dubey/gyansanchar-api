const jwt = require('jsonwebtoken')

exports.createToken = async (userId) => {
       const payload = {userId}
       const options = {
        expiresIn: '1y'
      }
  const token =   jwt.sign(payload,'gyansanchar',options);
   return token;
};
exports.createAdminToken = async (userId) => {
  const payload = {userId}
  const options = {
   expiresIn: '12h'
 }
const token =   jwt.sign(payload,'gyansanchar',options);
return token;
};



exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) return next(res.status(400).json({
    success:true,
    message:"Header is not available"
  }))
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ')
  const token = bearerToken[1]
  jwt.verify(token, 'gyansanchar', (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return next(res.status(400).json({
        success:false,
        message:message
      }))
    }
    req.payload = payload
    next()
  })
}



