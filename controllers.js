const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const model = require("./models")

class Controller {
    home = (req, res) => {
        res.status(200).send("Welcome to Teesas");
    };

    signup = async (req, res) => {
        const newUser = {
            childName: req.user.childName,
            email: req.user.email,
            phoneNumber: req.user.phoneNumber,
            countryCode: req.user.countryCode,
            grade: req.user.grade,
            password: req.user.password
        }
        try {
            await model.User.create(newUser)
            console.log("Successful");
            return res.status(200).json({ status: true, message: "Learner created successfully." });
        } catch (error) {
            console.log("error", error);
        }
        return;
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("No email or password");
            return res.status(200).send({
                message: "No email or password",
            });

        }

        try {
            const user = await model.User.findOne({ where: { email } })

            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const id = user.id
                    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
                        expiresIn: "30d",
                    });
                    console.log("Log in successful");
                    return res.status(200).json({ status: true, message: "Log in successful", token })
                } else {
                    return res.status(404).json({ status: false, message: "Wrong password" })
                }

            } else {
                return res.status(404).json({ status: false, message: "User does not exist" })
            }



        } catch (error) {
            res.status(404).json({ message: "Log in not successful" })
            console.log("Log in not successful");
            return
        }



    };

    getLessons = async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(404).json({ message: "No authorization token" });
            return;
        }

        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { id, email } = decoded;
            const user = await model.User.findOne({ where: { id: id } })
            if (user) {
                return res.status(200).json({
                    status: true,
                    message: "Success",
                    data: [
                        {
                            name: "Lawal",
                            startDate: new Date().getDate(),
                            duration: 4
                        }
                    ]
                })
            }

        } catch (error) {
            console.log("Oops, get lesson error", error);
            return res.send(400).json({ message: "No authorized access to this route" });
        }
    };
}

const controller = new Controller();

module.exports = controller;



// {
// 	"childName": "Kennie Lark",
// 	"email": "larkson@email.com",
// 	"password": "myfunkypassword1234",
// 	"confirmPassword": "myfunkypassword1234",
// 	"phoneNumber": 123456789,
// 	"countryCode": 234,
// 	"grade": "PRIMARY ONE"
// }


// {
//     "status": true,
//     "message": "Log in successful",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsYXJrc29uQGVtYWlsLmNvbSIsImlhdCI6MTY0MzI4MTU5NCwiZXhwIjoxNjQ1ODczNTk0fQ._uyAI181_YQ-BRY5VcakysI-nOBumHWc7JqVV2HYWz4"
// }
