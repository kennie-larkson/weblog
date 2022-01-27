# teesas

## How to run the code

1. Clone to repo in your favorite directory using the command `git clone https://github.com/kennie-larkson/teesas.git`
2. CD into the `teesas` folder and run the command `npm install` to install the dependencies.
3. Run the command `npm start` to start the application
4. Visit the postman collection file for a link to test all endpoint

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
