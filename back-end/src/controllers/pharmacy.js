import Pharmacy from "../models/pharmacy.js";

export const handleGetPharmacyByUserId = async (req, res) => {
  const { userId } = req.params;
  const pharmacys = await Pharmacy.find({ userId: userId });
  return res
    .status(200)
    .json({ message: "its all pharmacy", pharmacys: pharmacys });
};

export const handleGetPharmacyByPharmacyId = async (req, res) => {
  const { pharmacyId } = req.params;
  const pharmacy = await Pharmacy.findById(pharmacyId);
  return res
    .status(200)
    .json({ message: "desired pharmacy!", pharmacy: pharmacy });
};

export const handleCreatePharmacy = async (req, res) => {
  const obj = req.body;
  const url = req.url;
  const { licenceExpiry } = obj;
  const user = req.user;
  const pharmacy = new Pharmacy({
    ...obj,
    logo: url,
    userId: user._id,
    licenceExpiry: Date.now() + licenceExpiry * 24 * 60 * 60 * 1000,
  });
  await pharmacy.save();

  return res
    .status(201)
    .json({ message: "pharmacy created.", pharmacy: pharmacy });
};

export const handleUpdatePharmacy = async (req, res) => {
  const { pharmacyId } = req.params;
  const obj = req.body;
  const url = req.url;
  console.log(url);
  if (!url) {
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      { ...obj },
      { new: true }
    );
    return res
      .status(201)
      .json({ message: "pharmacy updated.", pharmacy: pharmacy });
  }
  const pharmacy = await Pharmacy.findByIdAndUpdate(
    pharmacyId,
    { ...obj, logo: url },
    { new: true }
  );
  return res
    .status(201)
    .json({ message: "pharmacy updated.", pharmacy: pharmacy });
};

export const handleDeletePharmacy = async (req, res) => {
  const { pharmacyId } = req.params;
  const pharmacy = await Pharmacy.findByIdAndDelete(pharmacyId);

  return res
    .status(201)
    .json({ message: "pharmacy deleted.", pharmacy: pharmacy });
};
