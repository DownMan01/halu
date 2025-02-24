const db = require("../db");

class Airdrop {
  static getAll(callback) {
    db.query("SELECT * FROM airdrops", callback);
  }

  static getById(id, callback) {
    db.query("SELECT * FROM airdrops WHERE id = ?", [id], callback);
  }

  static create(data, callback) {
    db.query("INSERT INTO airdrops SET ?", data, callback);
  }

  static update(id, data, callback) {
    db.query("UPDATE airdrops SET ? WHERE id = ?", [data, id], callback);
  }

  static delete(id, callback) {
    db.query("DELETE FROM airdrops WHERE id = ?", [id], callback);
  }
}

module.exports = Airdrop;
