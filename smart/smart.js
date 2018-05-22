"use strict";

var BirthdayItem = function(text) {
  if(text) {
    var obj = JSON.parse(text);
    this.nickname = obj.nickname;
    this.birthday = obj.birthday;
    this.from = obj.from;
  } else {
    this.nickname = "";
    this.birthday = "";
    this.from = "";
  }
};

BirthdayItem.prototype = {
  toString: function() {
    return JSON.stringify(this);
  }
};

var TheBirthday = function() {
  LocalContractStorage.defineMapProperty(this, "birthday", {
    parse: function(text) {
      return new BirthdayItem(text);
    },
    stringify: function(o) {
      return o.toString();
    }
  });
};

TheBirthday.prototype = {
  init: function() {
  },
  bind: function(nickname, birthday) {
    var value = Blockchain.transaction.value;
    var from = Blockchain.transaction.from;
    var birthday = this.birthday.get(from);
    if(birthday){
        throw new Error("This wallet has been bind birthday!")
    }
    var birthdayItem = new BirthdayItem();
    birthdayItem.nickname = nickname;
    birthdayItem.birthday = birthday;
    birthdayItem.from = from;
    this.birthday.put(from, birthdayItem);
  },
  get: function(fromAddress) {
    return this.birthday.get(fromAddress);
  }
}

module.exports = TheBirthday;