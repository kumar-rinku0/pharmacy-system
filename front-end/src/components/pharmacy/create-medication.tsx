import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

interface MedicationFormData {
  name: string;
  dosageInstructions: string;
  manufacturerName: string;
  manufacturerDate: string;
  expiryDate: string;
  maximumPurchaseLimit: string;
  blockDurationDays: string;
  blockedQuantity: string;
  price: string;
  isControlled: boolean;
}

const CreateMedication = () => {
  const [form, setForm] = useState<MedicationFormData>({
    name: "",
    dosageInstructions: "",
    manufacturerName: "",
    manufacturerDate: "",
    expiryDate: "",
    maximumPurchaseLimit: "",
    blockDurationDays: "",
    blockedQuantity: "",
    price: "",
    isControlled: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "isControlled") {
      return setForm((prev) => ({
        ...prev,
        [name]: !prev.isControlled,
      }));
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...form,
      maximumPurchaseLimit: Number(form.maximumPurchaseLimit),
      blockDurationDays: Number(form.blockDurationDays),
      blockedQuantity: Number(form.blockedQuantity),
      price: Number(form.price),
    };

    axios
      .post(`/api/medications/create`, payload)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message
        );
      });
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "dosageInstructions", label: "Dosage Instructions", type: "text" },
    { name: "manufacturerName", label: "Manufacturer", type: "text" },
    { name: "manufacturerDate", label: "Manufacturer Date", type: "date" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    {
      name: "maximumPurchaseLimit",
      label: "Max Purchase Limit",
      type: "number",
    },
    {
      name: "blockDurationDays",
      label: "Block Duration (days)",
      type: "number",
    },
    { name: "blockedQuantity", label: "Blocked Quantity", type: "number" },
    { name: "price", label: "Price", type: "number" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Add Medication
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {fields.map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={(form as any)[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Checkbox */}
        <div className="flex items-center col-span-full">
          <input
            id="isControlled"
            name="isControlled"
            type="checkbox"
            checked={form.isControlled}
            onChange={handleChange}
            className="h-4 w-4 mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isControlled" className="text-sm text-gray-700">
            Controlled Medication
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Medication
        </button>
      </form>
    </div>
  );
};

export default CreateMedication;
