# ssm-verification-service-sample
Sample user verification service that will either return a formatted user object or false.



## Request
A POST is preferred to a GET because more fields can be sent and data is not logged in the url like in a GET, however we support both.

In production, the route should always be secured with SSL encryption via https.




#### Specification

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| memberIdentifier | Yes | String | Different organizations use varying names for this, but it is typically the “Membership Number”.|


#### POST

**Example Request**

HTTP *\[POST\] https://ssm-verification-service-sample.azurewebsites.net/api/verify*

```javascript
{  
    "memberIdentifier": "4567"
}  
```

#### GET

77 Media does support a GET request, but note that the `memberIdentifier` paramater will be exposed as part of your query string.

**Example Request**

HTTP *\[GET\] https://ssm-verification-service-sample.azurewebsites.net/api/verify??memberIdentifier=4567*

<br />
___

<br />


## Response

The following fields are required in the user registration process. Any field not passed to the platform in the service must be manually filled out by your members.

#### Specification

| Field|Required|Type|Notes |
| --- | --- | --- | --- |
| isValid|Yes|Boolean|Whether or not the user is a valid member. |
| firstName | Yes | String |  |
| lastName | Yes | String | Do not include suffixes such as Jr, Sr, III, etc. |
| email | Yes | String |  |
| dateOfBirth | Yes | Date | Must follow the format “0001-01-01T00:00:00”. |
| country | No | String | Must use “United States” and not “USA” or “United States of America”. |
| region | No | String | State, province, or territory.  Do not use abbreviations such as “IN”, “NSW”, “AB”. |
| address | No | String |  |
| address2 | No | String |  |
| city | No | String |  |
| postal | No | String |  |
| gender | No | String | Must follow the format “Male”, “Female”, or null. |
| position | No | String | A comma separated list of positions held by the user.  Must be chosen from the following: “Administrator”, “Athlete”, “Coach”, “Official”, “Other”, “Parent”, or “Volunteer”. |
| membershipExpiration | No | Date | This is the date the user’s membership will expire.  Must follow the format “2020-01-01T00:00:00”. |

#### Options
Membership expiration can be used if you want to require your members to verify again after their membership has expired. Post expiration, your members will not be able to complete courses on the platform until after they have re-verified their membership.

```javascript
    membershipExpiration: DataTypes.DATE
```
**NOTE: ** Additional, non-specified fields in the response will be ignored.



#### Example Response

```javascript
{  
  "isValid": true,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "dateOfBirth": "1997-02-14T00:00:00",
  "country": null,
  "region": null,
  "address": null,
  "address2": null,
  "city": null,
  "postal": null,
  "gender": null,
  "position": null,
  "membershipExpiration": "2020-01-01T00:00:00" 
}
```

## Invalid Verifications

In the case of a member id that is invalid, the service should return a `400 Bad Request` status.

### Example

**Request**

HTTP *\[POST\]
https://ssm-verification-service-sample.azurewebsites.net/api/verify*

```javascript
{ 
    "memberIdentifier": "12324"
}
```

**Response**


> **400 Bad Request**


## Process Overview

1. Your organization would direct all of your members to register on the SafeSport portal using a special link. This link would be specific to your organization only and would automatically open a dialog box with your organization auto-selected. All that your members would have to enter would be their member identifier.

2. Once a members has entered their member identifier, this identifier would then be passed to your organization’s web service. Your system would then determine and return whether or not the membership is valid, indicated by the `isValid` field.

3. If the identifier is valid, your organization passes back that it is valid as well as the user’s information to complete the SafeSport registration form. Some of the fields are required but you may pass back as many or as few of the optional fields as you wish. For any field not passed back, users must enter the information themselves.

4. If the identifier is NOT valid, then your organization will pass back that it is invalid. The user then has the opportunity to re-enter or contact your organization for help.
