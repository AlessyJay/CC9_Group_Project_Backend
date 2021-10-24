const { User } = require('../models');
// Config passport-jwt
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
// config JwtStrategy options มีรูปแบบเป็น Obj
const options = {
  secretOrKey: process.env.JWT_SECRET_KEY, // define secret key to verify token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // define where to extract jwt from
};

// verify token สำเร็จจะะไปทำงาน Cbfn ด้านหลัง หรือก้อน (payload, done) => payload is token payload, done is callback fn โดย done === next()
// done รับ parameter 2 ตัว คือ err, user (user = req.user)
//  แต่หากไม่สำเร็จ จะส่ง res with status 401 and message 'Unauthorized'

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) return done(null, false);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

// applie strategy to password

passport.use('jwt', jwtStrategy);
