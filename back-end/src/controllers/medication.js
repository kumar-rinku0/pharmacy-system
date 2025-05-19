import Medication from "../models/medication.js";

const handleCreateMedication = async (req, res) => {
  const medication = new Medication(req.body);
  await medication.save();
  return res
    .status(201)
    .json({ medication: medication, message: "medication created." });
};

const handleGetAllMedications = async (req, res) => {
  const medications = await Medication.find();
  return res.status(200).json({ medications: medications, message: "okay!" });
};

const handleGetMedicationById = async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (!medication) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(medication);
};

const handleUpdateMedication = async (req, res) => {
  const updated = await Medication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(updated);
};

const handleDeleteMedication = async (req, res) => {
  const deleted = await Medication.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  return res.status(200).json({ message: "Deleted successfully" });
};

// POST selected medications
// const handleSubmitSelectedMedications = async (req, res) => {
//   const selectedMeds = req.body;

//   if (!Array.isArray(selectedMeds) || selectedMeds.length === 0) {
//     return res.status(400).json({ message: "No medications provided." });
//   }

//   const inserted = await Medication.insertMany(selectedMeds);
//   res.status(201).json({ message: "Medications submitted.", data: inserted });
// };

export {
  handleCreateMedication,
  handleGetAllMedications,
  handleGetMedicationById,
  handleUpdateMedication,
  handleDeleteMedication,
};
