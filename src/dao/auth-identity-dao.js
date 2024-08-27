const Dao = require("./dao");

class AuthIdentityDao extends Dao {
  constructor() {
    super("auth_identity");
  }

  createIndexes() {
    super.createIndex({ identity: 1 }, { unique: true });
    super.createIndex({ email: 1, password: 1 }, { unique: true });
    super.createIndex({ name: 1 });
  }
}

module.exports = new AuthIdentityDao();
