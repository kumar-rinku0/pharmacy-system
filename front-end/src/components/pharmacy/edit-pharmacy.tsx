import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function EditPharmacy() {
  const navigate = useNavigate();
  const [searchParames] = useSearchParams();
  const pharmacyId = searchParames.get("pharmacyId");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    domain: "",
    owner: "",
    logo: null as File | string | null,
    postalCode: "",
    registrationNumber: "",
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

    axios
      .put(
        `/api/pharmacy/update/pharmacyId/${pharmacyId}`,
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
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
  };

  const handleGetPharmay = (pharmacyId: string) => {
    axios
      .get(`/api/pharmacy/getbypharmacyid/${pharmacyId}`)
      .then((res) => {
        const { pharmacy } = res.data;
        setFormData((prev) => ({
          ...prev,
          ...pharmacy,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (pharmacyId && pharmacyId.length === 24) {
      handleGetPharmay(pharmacyId);
    } else {
      navigate("/dashboard/list-pharmacy");
    }
  }, [pharmacyId]);

  if (!pharmacyId || pharmacyId.length !== 24) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Update Pharmacy</h2>
        <p className="text-gray-600 mt-2">Fill in your pharmacy details</p>
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
            Update Pharmacy
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
        rows={3}
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
