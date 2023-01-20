import jwt from 'jsonwebtoken';

const secret = 'Ehjh8$jijh*(&*@#kl3j#289;j{]29%';
const expiration = '21d';

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration });
    }
}

