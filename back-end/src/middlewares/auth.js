// user is logged in or not check.
import { getUser } from "../utils/jwt.js";

const isLoggedInCheck = (req, res, next) => {
  const cookie = req.cookies?.JWT_TOKEN;
  let user = getUser(cookie);
  req.user = user;
  return next();
};

const onlyLoggedInUser = (req, res, next) => {
  // req.session.originalUrl = req.originalUrl;
  let user = req.user;
  if (!user || user == null) {
    user = getUser(req.cookies?.JWT_TOKEN);
    req.user = user;
  }
  if (!user) {
    return res.status(400).send({ type: "error", msg: "login to access!" });
  }
  return next();
};

const onlyAdmin = (req, res, next) => {
  let user = req.user;
  if (!user || user == null) {
    user = getUser(req.cookies?.JWT_TOKEN);
    req.user = user;
  }
  if (!user.roleInfo) {
    return res.status(400).send({ type: "error", msg: "login to access!" });
  }
  if (user.roleInfo.role !== "admin") {
    return res
      .status(400)
      .send({ type: "error", msg: "don't have right access!" });
  }
  return next();
};
const onlyEmployee = (req, res, next) => {
  let user = req.user;
  if (!user || user == null) {
    user = getUser(req.cookies?.JWT_TOKEN);
    req.user = user;
  }
  if (!user.roleInfo) {
    return res.status(400).send({ type: "error", msg: "login to access!" });
  }
  if (user.roleInfo.role !== "employee") {
    return res
      .status(400)
      .send({ type: "error", msg: "don't have right access!" });
  }
  return next();
};

const onlyManagerAdmin = (req, res, next) => {
  let user = req.user;
  if (!user || user == null) {
    user = getUser(req.cookies?.JWT_TOKEN);
    req.user = user;
  }
  if (!user.roleInfo) {
    return res.status(400).send({ type: "error", msg: "login to access!" });
  }
  if (user.roleInfo.role === "employee") {
    return res
      .status(400)
      .send({ type: "error", msg: "don't have right access!" });
  }
  return next();
};
const onlyEmployeeManager = (req, res, next) => {
  let user = req.user;
  if (!user || user == null) {
    user = getUser(req.cookies?.JWT_TOKEN);
    req.user = user;
  }
  if (!user.roleInfo) {
    return res.status(400).send({ type: "error", msg: "login to access!" });
  }
  if (user.roleInfo.role === "admin") {
    return res
      .status(400)
      .send({ type: "error", msg: "don't have right access!" });
  }
  return next();
};

export {
  isLoggedInCheck,
  onlyLoggedInUser,
  onlyAdmin,
  onlyEmployee,
  onlyManagerAdmin,
  onlyEmployeeManager,
};
