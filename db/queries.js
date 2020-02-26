const database = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = "fuckboi"

module.exports = {
    user: {
        create: (user) => {
            return bcrypt.hash(user.password, 10)
            .then(hashedPassword => {
                return database("user")
                .insert({
                    full_name: user.full_name,
                    email: user.email,
                    password_digest: hashedPassword,
                })
                .returning(["id", "full_name", "email", "password_digest"])
            })
            .then(user => user[0])
    },
},
    login: {
            post: (request, response) => {
                database("user")
                .where({email: request.body.email})
                .first()
                .then(user => {
                    if (!user){
                        response.status(401).json({error: "no user with that email"})
                    }else{
                        return bcrypt
                        .compare(request.body.password, user.password_digest)
                        .then(isAuthenticated => {
                            if (!isAuthenticated){
                                response.status(401).json({error: "invalid credentials"})
                            }else{
                            return jwt.sign(user, SECRET, (error, token) => {
                                response.status(200).json({ token })
                            })
                        }
                        })
                    }
                })
            }
        }

}