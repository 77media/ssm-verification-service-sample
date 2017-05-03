'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

module.exports = function (app) {

	/**
	* @api {get} /verify User
	* @apiName VerifyUser
	*/
    app.route('/api/verify').get(function (req, res) {
        if ((req.query.membership % 1 === 0) === false) {
            return res.status(404).send({
                message: 'User is invalid'
            });
        }
        var users = [
            {
                membership: '12341', firstName: 'first1', lastName: 'lastName1', id: 1
            },
            {
                membership: '12342', firstName: 'first2', lastName: 'lastName2', id: 2
            },
            {
                membership: '12343', firstName: 'first3', lastName: 'lastName3', id: 3
            },
            {
                membership: '12344', firstName: 'first4', lastName: 'lastName4', id: 4
            }
        ];

        var user = _.find(users, { membership: req.query.membership });

        if (!user) {
            return res.status(404).send({
                message: 'No users with that identifier has been found',
                verified: false
            });
        } else {
            user.verified = true;
            return res.json(user);
        }


    });

};