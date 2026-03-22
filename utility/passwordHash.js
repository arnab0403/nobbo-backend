const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createPasswordHash(password){
    
    const pass = await bcrypt.hash(password, saltRounds);
    return pass;
}

const value = createPasswordHash("jdjdd");

console.log()

