import User from "../models/user.js";
import bcrypt from "bcryptjs";

export function generatePassword(length, includeNumeric = true) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numeric = "0123456789";

  let characters = alphabet;
  if (includeNumeric) {
    characters += numeric;
  }

  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

export const isRightUser = async function (email, password) {
  const user = await User.findOneAndUpdate(
    { email },
    { lastLogin: Date.now() },
    { new: true }
  );
  if (!user) {
    return { message: "wrong email." };
  }
  const isOk = await bcrypt.compare(password.trim(), user.password);
  if (!isOk) {
    return { message: "wrong password." };
  }
  return user;
};

export function getTodayTimestamp(timeStr, extraMinutes = 0) {
  console.log(timeStr);
  const [hours, minutes] = timeStr.split(":").map(Number);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // Note: 0-based (0 = January)
  const day = now.getDate();

  const localDate = new Date(
    year,
    month,
    day,
    hours,
    minutes + extraMinutes,
    0,
    0
  );

  const timezoneOffsetMs = localDate.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(localDate.getTime() - timezoneOffsetMs);

  return utcDate.toISOString(); // Returns UTC timestamp
}

export function getTimeStempByTimeStemp(time) {
  const localDate = new Date(time);

  // IST is UTC + 5:30 => 5.5 * 60 * 60 * 1000 = 19800000 ms
  const istOffset = 5.5 * 60 * 60 * 1000;

  const istDate = new Date(localDate.getTime() + istOffset);

  // Format to ISO string but remove the 'Z' to indicate it's not UTC
  return istDate.toISOString();
}
