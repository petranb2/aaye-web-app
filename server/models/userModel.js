const { getPool } = require('./connectionPool.js')
const { trim, ltrim, rtrim, isEmpty, isDate, isInt } = require('validator');
const { VarChar, DateTime, Int, Text } = require('mssql');
var bcrypt = require('bcrypt');
/** Class representing a user. */
class User {
    /**
     * Create a user.
     * @param {string} username 
     * @param {string} password
     * @param {Date} createdDate
     */
    constructor(username, password, createdDate) {
        this.username = trim(username);
        this.password = password;
        this.createdDate = createdDate;
    }

    static async getAllUsers(callBack) {
        try {
            const pool = await getPool();
            let request = await pool.request();
            let query = `select * from users`;
            const { recordset } = await request.query(query);
            callBack(null,recordset)
        } catch (err) {
            // ... error checks
            callBack(err,null)
        }
    }

    static async findById(id, callBack) {

        try {
            if (!isInt(id)) {
                console.log('id is required');
                return;
            }
        } catch (err) {
            callBack(err, null);
            return;
        }


        try {
            const pool = await getPool();
            let request = await pool.request();
            let query = `select * from users where id=@id`;
            request.input('id', Int, id);
            const { recordset } = await request.query(query);
            callBack(null, recordset[0]);
        } catch (err) {
            callBack(err, null);
        }
    }
    static async findByUsername(username, callBack) {

        try {
            if (isEmpty(username)) {
                console.log('Username is required');
                return
            }
        } catch (err) {
            callBack(err, null);
            return;
        }


        try {
            const pool = await getPool();
            let request = await pool.request();
            let query = `select * from users where username=@username`;
            request.input('username', VarChar(50), username);
            const { recordset } = await request.query(query);
            callBack(null, recordset[0]);
        } catch (err) {
            callBack(err, null);
        }
    }

    async save() {

        let errors = [];

        if (isEmpty(this.username)) {
            errors.push('Username is required');
        }
        if (isEmpty(this.password)) {
            errors.push('Password is required');
        }
        if (!isDate(this.createdDate)) {
            errors.push('Date is required');
        }

        if (errors.length > 0) {
            console.log(errors);
            return;
        }
        // hash the password with bcrypt
        console.log('pass for hash:'+this.password)
        this.password = await bcrypt.hash(this.password, 10);

        try {

            const pool = await getPool();
            let request = await pool.request();
            request.input('username', VarChar(50), this.username);
            request.input('password', Text, this.password);
            request.input('createdDate', DateTime, this.createdDate);
            let query = `insert into users (username,password,dateCreated) values (@username,@password,@createdDate)`;
            const result = await request.query(query);
            console.log(result);
            return result
        } catch (err) {
            // ... error checks
            console.log(err);
        }
    }

}

module.exports = User;