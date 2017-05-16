'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

module.exports = function (app) {

	/**
	* @api {post} /verify User
	* @apiName VerifyUser
	*/
    app.route('/api/verify').post(function (req, res) {
        if ((req.body.confirmationNumber % 1 === 0) === false) {
            return res.status(500);
        }
        // TODO: query a real database or file
        var membershipExpiration = new Date(2020, 1, 1, null, null, null, null);
        var users = [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                confirmationNumber: "4567",
                scanCode: "890",
                membershipId: "12345",
                membershipExpiration: membershipExpiration
            }
        ];

        var item = _.find(users, { lastName: req.body.lastName, confirmationNumber: req.body.confirmationNumber });

        if (!item) {
            return res.status(404);
        } else {
            // TODO: map your own object to the response
            var verifyResponse = {
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                membershipId: item.membershipId,
                membershipExpiration: item.membershipExpiration,
                isValid: true
            };
            return res.json(verifyResponse);
        }
    });

};