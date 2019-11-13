const Mongodb = require('./Mongodb');
const mongoose = Mongodb.mongoose;
const Picture = require('./Picture');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    friend_list: [String],
    wait_list: [String]
});
var User = mongoose.model('User', UserSchema);


var CreateUser = function (username, name, password, avatar, done) {
    // Thêm thành công trả về _id user, ngược lại trả về error
    User.findOne({'username': username}, function (err, doc) {
        if (err) return console.log(err);
        else if (doc != null) return console.log('false');
    });
    
    let user = new User({
        username: username,
        name: name,
        password: password,
        avatar: avatar
    })

    user.save((err, data) => {
        if (err) console.log(err)
        else return (done(data._id));
    });
}



// var FindUserByUsername = function (username, done) {
//     User.findOne({username: username}, function (err, doc) {
//         if (err) return console.log(err);
//         return done(doc);
//     });
// };

// var FindUserByName = function (name, done) {
//     User.find({name: name}, function (err, doc) {
//         if (err) return console.log(err);
//         return done(doc);
//     });
// };

var Login = function (username, password, done) {
    // login thành công trả về _id của user, ngược lại trả về false.
    User.findOne({username: username, password: password}, function (err, doc) {
        if (err) return console.log(err);
        else if (doc == null) return done(false);
        else {
            return done(doc._id);
        }
    });
};

var CheckUsername = function (username, done) {
    //trả về false là username chưa bị sử dụng, true là đã bị sử dụng.
    User.findOne({username: username}, function (err, doc) {
        if (err) return console.log(err);
        else if (doc == null) return done(false);
        return done(true);
    });
};


module.exports = {
   // FindUserByName,
   // FindUserByUsername,
    CreateUser,
    Login,
    CheckUsername
};


//  User.findOne({username: 'ti'}).exec((err, user)=>{
//      console.log(user.name);
//
// }  );