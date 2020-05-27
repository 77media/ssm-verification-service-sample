'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    serveStatic = require('serve-static');

module.exports = function (app) {

	/**
	* @api {post} /verify Verify MemberID [POST]
    * @apiName VerifyMemberPOST
    * @apiParam {Number} [memberIdentifier] Membership ID number to look up
	*/
    app.route('/api/verify').post(function (req, res) {
        if ((req.body.memberIdentifier % 1 === 0) === false) {
            return returnStatus(res, 500);
        }
        
        const memberData = validateMember(req.body.memberIdentifier);

        if (memberData) {
            res.json(memberData);
        }
        else {
            res.status(404)
            res.json({
                isValid : false,  	
                firstName : "",
                lastName : "",
                email : "",
                dateOfBirth : "",
              })
        }
    });

	/**
	* @api {get} /verify Verify MemberID [GET]
    * @apiName VerifyMemberGET
    * @apiParam {Number} [memberIdentifier] Membership ID number to look up
	*/
    app.route('/api/verify').get(function (req, res) {
        const params = req.query;
        
        if ((params.length === 0) || ((params.memberIdentifier % 1 === 0) === false)) {
            return returnStatus(res, 500);
        }
        
        const memberData = validateMember(params.memberIdentifier);

        if (memberData) {
            res.json(memberData);
        }
        else {
            returnStatus(res, 404);
        }
    });

    function validateMember(memberId) {
        // TODO: query a real database or file
        var membershipExpiration = new Date(2020, 1, 1, null, null, null, null);
        var users = [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@fakeemail.com",
                dateOfBirth: "07-04-1980",
                country: "United States",
                region: "Kansas",
                address: "1234 Main Street",
                address2: null,
                city: "Beverly Hills",
                postal: "45331",
                gender: "male",
                position: "Coach",
                memberIdentifier: "4567",
                scanCode: "890",
                membershipExpiration: membershipExpiration
            },
            {
                id: 1,
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@fakeemail.com",
                dateOfBirth: "01-01-1990",
                country: "United States",
                region: "Colorado",
                address: "6789 Something Blvd",
                address2: null,
                city: "Springfield",
                postal: "62471",
                gender: "female",
                position: "Parent",
                memberIdentifier: "1234",
                scanCode: "111",
                membershipExpiration: membershipExpiration
            }
        ];

        var item = _.find(users, { memberIdentifier: memberId });

        if (!item) {
            return null;
        } else {
            // TODO: map your own object to the response
            var verifyResponse = {
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                dateOfBirth: item.dateOfBirth,
                country: item.country,
                region: item.region,
                address: item.address,
                address2: item.address2,
                city: item.city,
                postal: item.postal,
                gender: item.gender,
                position: item.position,
                membershipExpiration: item.membershipExpiration,
                memberIdentifier: item.memberIdentifier,
                isValid: true
            };
            return verifyResponse;
        }
    };

    function returnStatus(res, status) {
        res.status(status).end();
    }

    // set the static files location /public/img will be /img for users
    app.use(serveStatic(path.resolve('public')));




    app.use('/', function (req, res) {
        res.sendfile(path.resolve('public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });

};