import React, { useEffect, useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  _id: string;
  createdAt: string;
}

const CustomerList: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  useEffect(() => {
    axios
      .get(`/api/customer/all`)
      .then((res) => setForms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Submitted Forms</h2>
      <ul className="space-y-3">
        {forms.map((form) => (
          <li
            key={form._id}
            className="p-4 border rounded-md shadow-sm bg-white"
          >
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Phone:</strong> {form.phone}
            </p>
            <p>
              <strong>Address:</strong> {form.address}
            </p>
            <p>
              <strong>Postal Code:</strong> {form.postalCode}
            </p>
            <p className="text-sm text-gray-500">
              Submitted on: {new Date(form.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
