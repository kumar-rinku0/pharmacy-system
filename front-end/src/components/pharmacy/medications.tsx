import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

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
}

const MedicationList = () => {
  const { id, customerId } = useParams<{ id: string; customerId: string }>();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/medications/getAll`)
      .then((res) => {
        setMedications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch medications.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (name: string) => {
    setSelected((prev) => {
      const updated = new Set(prev);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const selectedMeds = medications.filter((med) => selected.has(med.name));
    navigate(`/${id}/${customerId}/select-medication`, {
      state: { selectedMeds },
    });
  };

  const filteredMeds = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm)
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
        Medication List
      </h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
      />

      <form onSubmit={handleSubmit}>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left text-sm">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Manufacturer</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.map((med) => (
              <tr key={med.name} className="text-sm hover:bg-gray-50">
                <td className="p-2 border">{med.name}</td>
                <td className="p-2 border">{med.manufacturerName}</td>
                <td className="p-2 border">${med.price.toFixed(2)}</td>
                <td className="p-2 border capitalize">{med.status}</td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selected.has(med.name)}
                    onChange={() => handleCheckboxChange(med.name)}
                    className="h-4 w-4 text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            type="submit"
            disabled={selected.size === 0}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Submit Selected
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicationList;
