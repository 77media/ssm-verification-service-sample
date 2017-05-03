# ssm-verification-service-sample
Sample user verification service that will either return a formatted user object or false.


## valid verification

#### request
HTTP GET
http://localhost:3000/api/verify?membership=12342

#### result

`{
    membership: "12342",
    firstName: "first2",
    lastName: "lastName2",
    id: 2,
    verified: true
}`

## invalid verification


HTTP GET
http://localhost:3000/api/verify?membership=12348

## sample result

`{
    message: "No users with that identifier has been found",
    verified: false
}`