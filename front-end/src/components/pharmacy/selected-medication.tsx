import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

interface Medication {
  name: string;
  dosageInstructions: string;
  manufacturerName: string;
  manufacturerDate: string;
  expiryDate: string;
  maximumPurchaseLimit: number;
  blockDurationDays: number;
  blockedQuantity: number;
  price: number;
  quantity: number;
  isControlled: boolean;
  status: "active" | "discontinued" | "expired";
  totalPrice?: number;
}

const SelectedMedication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMeds = location.state?.selectedMeds || [];

  // State to store the quantity input for each medication
  const [medications, setMedications] = useState<Medication[]>(selectedMeds);

  // Handle quantity change and calculate total price
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedMeds = [...medications];
    updatedMeds[index].quantity = newQuantity;
    updatedMeds[index].totalPrice = newQuantity * updatedMeds[index].price;
    setMedications(updatedMeds);
  };

  const handleCheckOut = () => {
    // axios.post(`/api/transition/create?licence=${}&customerId=${}`, {medications: medications.map})
  };

  if (medications.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-medium text-gray-700">
          No medications selected.
        </p>
        <button
          onClick={() => navigate("/medication-list")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Selected Medications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-green-100 text-gray-700 uppercase tracking-wide">
            <tr>
              <th className="p-3 border">#id</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Manufacturer</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-center">
            {medications.map((med: any, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{med.name}</td>
                <td className="p-3 border">{med.manufacturerName}</td>
                <td className="p-3 border">${med.price.toFixed(2)}</td>
                <td className="p-3 border">
                  <input
                    type="number"
                    value={med.quantity}
                    onChange={(e) =>
                      handleQuantityChange(idx, parseInt(e.target.value) || 0)
                    }
                    className="w-20 p-1 border border-gray-300 rounded"
                    min="0"
                  />
                </td>
                <td className="p-3 border">
                  ${med.totalPrice?.toFixed(2) || med.price.toFixed(2)}
                </td>
                <td className="p-3 border capitalize">{med.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to List
        </button>
        <button
          onClick={handleCheckOut}
          //   disabled={}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default SelectedMedication;
