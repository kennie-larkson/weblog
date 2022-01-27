# teesas

## Created the following APIs

1. Sign up
2. Login
3. Get lesson endpoint

JWT was used to generate a token on login and ensure the get endpoint passes
the token in the header to authenticate that a logged-in user is calling
the endpoint.

## Data structure :

Signup:
Request Payload{
childName: string;
email: string;
phoneNumber: number;
countryCode: number;
password: string;
confirmPassword: string;
grade: string;
}

Response Payload
{
status: true;
message: learner created successfully;
}

Sign in:
Request Payload
{
password: string;
confirmPassword: string;
}

Response Payload
{
status: true;
message: login successful;
token: “return generated token here”
}

Get Lessons:
Response Payload
{
{
"success": true,
"message": "Success.",
"data": [
{
“name”: string,“startdate”: date,
“duration”: number
}
]
}
