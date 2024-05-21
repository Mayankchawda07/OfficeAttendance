const jwt = require("jsonwebtoken");
const employee = require('../modals/employeeModal')
const bcrypt = require("bcrypt");
const sendEmail = require("../Utils/sendMail");
const nodemailer = require("nodemailer");



exports.addEmployee = async (req, res) => {
    const { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(422).json({ error: 'Please fill all fields properly' });
    }

    try {
        // Check if the user with the provided email already exists
        const existingEmployee = await employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({
                status: "False",
                message: "Employee with this email already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new employee
        const newEmployee = await employee.create({ name, email, phone, password: hashedPassword, salary, loginType, designation, isBlocked, gender, profile, DOB, role });

        res.status(200).json({
            status: "True",
            message: "Employee Registered Successfully",
            email: newEmployee.email // Return the registered email if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Employee Registration Failed"
        });
    }
};


exports.updateEmployee = async (req, res) => {
    const { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role } = req.body;
    const getusername = await employee.findById(req.params.id);
    const na = getusername.name;
    const data = await employee.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        message: " Data Updated",
        id: req.params.id
        // data: data,
    });
};

exports.getEmployee = async (req, res) => {
    const datas = await employee.find().populate('role').sort({ createdAt: -1 });
    res.status(200).json({
        status: "success",
        message: "Employees found successfully",
        data: datas,
    });
};

exports.getSingleEmpolyee = async (req, res) => {
    try {
        const userFound = await employee.findById(req.params.id).populate('role');
        res.status(200).json({
            status: "success",
            message: " Data Found",
            data: userFound,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

exports.login_employee = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the employee by email and populate the role
        const adminFound = await employee.findOne({ email }).populate('role');

        // If the employee is found, compare the passwords
        if (adminFound) {
            const isMatch = await bcrypt.compare(password, adminFound.password);

            if (isMatch) {
                const id = adminFound._id;
                const token = jwt.sign({ id }, 'Verify_token@attendance', { expiresIn: "30d" });

                return res.status(200).json({
                    status: "success",
                    message: "Logged in successfully",
                    admindata: adminFound,
                    adminFound: {
                        _id: adminFound._id,
                        token,
                        email: adminFound.email,
                        phone: adminFound.phone,
                    }
                });
            } else {
                // If passwords do not match
                return res.status(401).json({
                    status: "False",
                    message: "Invalid credentials"
                });
            }
        } else {
            // If no employee is found with the given email
            return res.status(401).json({
                status: "False",
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Login failed"
        });
    }
};


exports.forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;
       
        // Check if the employee with the given email exists
        const checkIsAvailable = await employee.findOne({ email });
        if (!checkIsAvailable) {
            return res.status(404).json({
                status: "False",
                message: "E-mail not found"
            });
        }
        
        // Create Reset Token
        const randomNumbers = Math.floor(1000 + Math.random() * 9000);
        const resetToken = randomNumbers.toString();

        // Save token to database
        checkIsAvailable.otp = resetToken;
         await checkIsAvailable.save();
       
        // Prepare the email content
        const message = `
            <html>
            <body>
                <div>
                    <h2>Hello ${checkIsAvailable.name}</h2>
                    <p><b>RESET PASSWORD</b></p>
                    <p>YOUR OTP CODE: ${resetToken}</p>
                    <p>Regards...</p>
                    <p>Workholic's Managment</p>
                </div>
            </body>
            </html>
        `;
        const subject = "Workholics password reset details";
        const send_to = checkIsAvailable.email;

        // Send the email

        await sendEmail({
            email: send_to,
            subject: subject,
            message: message,
        });

        // Send success response
        res.status(200).json({
            status: "success",
            message: "User found. Please check email and SMS for OTP code",
            data: { adminid: checkIsAvailable._id },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "OTP not sent due to server error"
        });
    }
};

exports.verifyotp = async (req, res) => {
    try {
      const { employeeid, otp } = req.body;
      const userFound = await employee.findOne({ _id: employeeid, otp });
      if (userFound) {
        userFound.otp = "";
        // userFound.isOtpVerified = true;
        userFound.save();
        res.status(200).json({
          status: "success",
          message: "OTP Verified Successfully...",
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "Details Not Match...",
        });
        // return next(new AppErr("Details not match.", 404));
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Server error"
        });
    }
  };


  exports.updatepassword = async (req, res) => {
    const { id, newpassword } = req.body;
    const check_id = await employee.findOne({
      _id: id,
    });
    if (!check_id) {
      res.status(404).json({
        status: "Fail",
        message: "Details Not Match",
      });
      return;
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    const findandupdate = await Admin.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword, otp: "" },
      { new: true }
    );
    // Finally Update details
    const email = check_id?.email;
    const message = `
  <html>
  <body><div>
  <h2>Hello ${check_id?.name}</h2>
      <p><b> Password Updated Successfully ... </b></p>  
     
      <p>Regards...</p>
      <p>HEART2HEART Team</p>
      </div></body>
      </html>   
    `;
    const subject = "Workholic Password Update Successfully";
    const send_to = email;
  
    sendEmail({
      email: send_to,
      subject: subject,
      message: message,
    });
  
    res.status(200).json({
      status: "success",
      message: "Password Update Successfully",
    });
  };



// exports.forgetpassword = async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const checkIsAvailable = await employee.findOne({ email });
//         if (!checkIsAvailable) {
//             console.error(error);
//             res.status(420).json({
//                 status: "False",
//                 message: "E-mail not found"
//             });
//         } else {
//             // Create Reste Token
//             const randomTxt = Math.random()
//                 .toString(36)
//                 .substring(7)
//                 .toLocaleUpperCase();
//             const randomNumbers = Math.floor(1000 + Math.random() * 9000);
//             let resetToken = randomNumbers;
//             // save token to db START ======
//             checkIsAvailable.otp = resetToken;
//             checkIsAvailable.save();

//             const email = checkIsAvailable?.email;
//             const message = `
//     <html>
//     <body><div>
//     <h2>Hello ${checkIsAvailable?.name}</h2>
//         <p><b>RESET PASSWORD </b></p>  
//         <p>YOUR OTP CODE : ${resetToken}</p>
        
//         <p>Regards...</p>
//         <p>HEART2HEART TEAM</p>
//         </div></body>
//         </html>   
//       `;
//             const subject = "HEART2HEART PASSWORD RESET DETAIL";
//             const send_to = email;

//             sendEmail({
//                 email: send_to,
//                 subject: subject,
//                 message: message,
//             });

//             res.status(200).json({
//                 status: "success",
//                 message: " User Found/Please Check Email and SMS For OTP Code",
//                 data: { adminid: checkIsAvailable._id },
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: "False",
//             message: "OTP not send"
//         });
//     }
// };
