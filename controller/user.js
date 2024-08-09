const userModal = require("../models/user.js");
const { jwtToken } = require("../utils/generateToken.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ message: "All fields are required" });
    }
    const foundUser = await userModal.findOne({ email: email });
    if (foundUser) {
      return res.status(403).send({ message: "User already registered" });
    }
    let salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
    };
    const newUser = userModal(user);
    await newUser.save();
    return res
      .status(200)
      .cookie("token", jwtToken().generateToken(user))
      .send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).send("Error");
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email: emails, password: passwords } = req.body;
    if (!emails || !passwords) {
      res.status(400).send({ message: "All fields are required" });
    }
    const user = await userModal.findOne({ email: emails });
    const users = {
      name: user?.name,
      email: user?.email,
      password: user?.password,
    };
    if (user) {
      const password = user.password;
      const isSame = bcrypt.compareSync(passwords, password);
      if (isSame) {
        res
          .status(200)
          .cookie("token", jwtToken().generateToken(users))
          .send({ message: "User login successfully" });
      } else {
        res.status(400).send({ message: "User not login successfully" });
      }
    } else {
      res.status(400).send({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModal.find({}).select("-password");
    if (users) {
      res
        .status(200)
        .send({ message: `${users.length} users found`, users: users });
    } else {
      res.status(200).send({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

const getUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userModal.findOne({ email: email }).select("-password");
    res.status(200).send({ message: "User found ", user: user });
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

const searchUser = async (req, res) => {
  try {
    const { name } = req.query;
    const aggregate = [
      {
        $match: { name: { $regex: `${name}`, $options: "i" } },
      },
      {
        $project: {
          _id: 0,
          name: 1,
        },
      },
    ];
    const resp = await userModal.aggregate(aggregate);
    if (resp) {
      res.status(200).send({ message: "Done", names: resp });
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ message: "All fields are required" });
    }
    const user = await userModal.findOne({ email: email });
    if (user) {
      const resp = await userModal.deleteOne({ email: email });
      if (resp) {
        res.status(200).send({ message: "User Deleted Successfully" });
      }
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

const deleteAllUser = async (req, res) => {
  try {
    const response = await userModal.deleteMany({});
    console.log(response);
    if (response) {
      res.status(200).send({
        message: ` ${response?.deletedCount} User Deleted Successfully`,
      });
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await userModal.findOne({ email: email });
    if (user) {
      const resp = await userModal.updateOne({ email: email }, { name: name });
      if (resp) {
        res.status(200).send({ message: "Updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  deleteAllUser,
  updateUser,
  searchUser,
};
