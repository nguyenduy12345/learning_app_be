import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

import { findUserByEmail, createUser, findUser, findUserById, findUserAndUpdate  } from "../repositories/user.repository.js";

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
  // const value = await registerRequestValidation.validateAsync({ fullName, email, password });
  // //   if (!fullName | !email | !password) throw new Error("enter your info");
    const checkUser = await findUserByEmail(email);
    if (checkUser) throw new Error(req.translate('user.emailExisted'));
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await createUser({
      fullName,
      email,
      password: hash,
    });
    return res.status(201).send({
      message: "Created success",
      newUser
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUser({ email });
    if (!user) throw new Error(req.translate('user.wrong'));
    const checkPassword = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!checkPassword) throw new Error(req.translate('user.wrong'));
    if(user.status) throw new Error(req.translate('user.banned'))
    const { _id } = user;
    const accessToken = jwt.sign({ _id }, process.env.ACCESS_TK_KEY);
    const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TK_KEY);
    res.status(201).send({
      message: "login success",
      data: {
        accessToken,
        refreshToken
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.currentUser;
    if(!user) throw new Error(req.translate('unauthorized'))
    res.status(200).send({
      data: {
        user
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const handleChangeAvatar = async (req, res) => {
  const { _id } = req.currentUser;
  const file = req.file;
  try {
    let urlImage;
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];
    await cloudinary.uploader.upload(
      dataUrl,
      {
        public_id: fileName,
        resource_type: "auto",
      },
      (err, result) => {
        if (err) throw new Error(req.translate('user.updateAvatarFailed'));
        if (result) {
          urlImage = result.secure_url;
          return urlImage;
        }
      }
    );
    await findUserAndUpdate(
      {
        _id,
      },
      {
        avatar: urlImage,
      }
    );
    res.status(201).send({
      message: req.translate('user.updateAvatarSuccess'),
      avatar: urlImage,
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  const body = req.body
  try {
    const { _id }= req.currentUser
    await findUserAndUpdate({
      _id
    },{
      ...body
    })
    res.status(201).send({
      message: req.translate('user.updateProfile'),
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
export { register, logIn, profile, updateProfile, handleChangeAvatar };
