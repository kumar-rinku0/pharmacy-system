import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../provider/auth-provider";

export default function CreatePharmacy() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    domain: "",
    owner: "",
    licenceExpiry: "",
    logo: null as File | null,
    postalCode: "",
    registrationNumber: "",
    establishedDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;
    if (name === "logo" && files) {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = new FormData();
    for (const key in formData) {
      const value = (formData as any)[key];
      if (value !== null) {
        submissionData.append(key, value);
      }
    }
    if (isAuthenticated && user) {
      axios
        .post("/api/pharmacy/create", submissionData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate(`/dashboard/list-pharmacy`);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message ||
              err.response?.data?.error ||
              err.message
          );
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="py-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Pharmacy Registration
        </h2>
        <p className="text-gray-600">Fill in your pharmacy details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Pharmacy Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />
        <Input
          label="Owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          required
        />
        <FileInput label="Logo" name="logo" onChange={handleChange} />
        <Input
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <Input
          label="Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
        />

        <SelectInput
          label="License Expiry Duration (In Days)"
          name="licenceExpiry"
          value={formData.licenceExpiry}
          onChange={handleChange}
          required
          options={[
            { label: "One Month", value: "30" },
            { label: "Six Months", value: "180" },
            { label: "One Year", value: "365" },
            { label: "Lifetime", value: "99999" },
          ]}
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          textarea
          required
        />

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md"
          >
            Register Pharmacy
          </button>
        </div>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  required = false,
}: InputProps) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {textarea ? (
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        rows={2}
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    )}
  </div>
);

const FileInput = ({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>
);

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { label: string; value: string }[];
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
      <option value="">Select Duration</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
