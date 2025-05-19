import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
}

const CreateCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(`/api/customer/submit`, formData)
      .then((res) => {
        console.log(res.data);
        const { _id } = res.data;
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate(`/${id}/${_id}/medication-list`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || err.response.data.error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              Customer Registration
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ajit"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ajit@example.com"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="phone"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder=" 123-4567"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                id="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8 nit"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="postalCode"
              >
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12345"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  isSubmitting
                    ? "bg-green-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : submitSuccess ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Submitted Successfully!
                  </span>
                ) : (
                  "Register Now"
                )}
              </button>
            </div>
          </form>

          <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
