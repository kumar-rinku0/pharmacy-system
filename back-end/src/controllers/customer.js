import Customer from "../models/customer.js";

// POST: Add new form entry
const handleSubmitForm = async (req, res) => {
  const { name, email, phone, address, postalCode } = req.body;
  const newForm = new Customer({
    fullName: name,
    email,
    phone,
    address,
    postalCode,
  });
  const savedForm = await newForm.save();
  return res.status(201).json(savedForm);
};
// GET: Get all submitted form entries
const handleGetAllForms = async (req, res) => {
  const forms = await Customer.find({}).sort({ createdAt: -1 });
  return res.status(200).json(forms);
};

const handleGetByEmailAddress = async (req, res) => {
  const { q } = req.query;
  const customer = await Customer.findOne({ email: q }).exec();
  if (!customer) {
    return res
      .status(400)
      .json({ message: "wrong email address!", status: "NOT OK" });
  }
  return res.status(201).json({ message: "okay.", customer: customer });
};

export { handleSubmitForm, handleGetAllForms, handleGetByEmailAddress };
