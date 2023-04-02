const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
  checkPassword: async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  },
};
