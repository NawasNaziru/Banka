Users = {
 
  ghtre1455zxcvfg1245ghtrd: {
    firstName: "Tallman",
    lastName: "Bill",
    email: "tallbill@gmail.com",
    salt: "ghtre145",
    hash: "5zxcvfg1245ghtrd",
    type: "client",
    _id: "ghtre1455zxcvfg1245ghtrd"
  },
  
  ghtre1455zxcvfg1245ghmnf: {
     firstName: "Adewale",
     lastName: "Bola",
     email: "adebola@gmail.com",
     salt: "ghtre145",
     hash: "5zxcvfg1245ghmnf",
     type: "client",
     _id: "ghtre1455zxcvfg1245ghtrd"
  }
  
}

module.exports.addUser = function (user) {
  Users.user._id = user;
}