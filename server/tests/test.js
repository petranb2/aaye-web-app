const User = require('./userModel.js');

(async () => {


    let user = new User('marko@gmail.com', '1', new Date());

    user.save();
/*
    User.findById("2", function (err, user) {

        console.log('in callback method');
        if (err) console.log(err);

        console.log(user);
    });

    User.findByUsername("anna maria", function (err, user) {

        console.log('in callback method');
        if (err) console.log(err);

        console.log(user);
    });
*/
})();

