import axios from "axios";
import {
  ClipboardCopy,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../provider/auth-provider";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

type PharmacyType = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  userId: string;
  address: string;
  domain: string;
  logo: string;
  owner: string;
  postalCode: string;
  registrationNumber: string;
  establistedAt: string;
  licenceKey: string;
  licenceExpiry: string;
};

const Pharmacy = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState<PharmacyType[] | null>(null);
  const [copiedLicence, setCopiedLicence] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleGetPharmacies = (id: string) => {
    setLoading(true);
    axios
      .get(`/api/pharmacy/getbyuserid/${id}`)
      .then((res) => {
        console.log(res.data);
        const { pharmacys } = res.data;
        setPharmacies(pharmacys);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message || err.response.data.error || err.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCopy = (licence: string) => {
    navigator.clipboard.writeText(licence);
    setCopiedLicence(licence);
    setTimeout(() => setCopiedLicence(null), 2000);
  };

  const handleDelete = (pharmacyId: string) => {
    if (isAuthenticated && user?._id) {
      axios
        .delete(`/api/pharmacy/delete/pharmacyId/${pharmacyId}`)
        .then((res) => {
          console.log(res.data);
          handleGetPharmacies(user._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      handleGetPharmacies(user._id);
    }
  }, [isAuthenticated, user?._id]);

  if (loading || !pharmacies) {
    return (
      <div className="flex h-[90vh] justify-center items-center">
        <FaSpinner size={20} className="animate-spin" />
      </div>
    );
  }

  if (pharmacies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          No Pharmacies Created Yet!
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4">
        {pharmacies.map((pharmacy, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md transition overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex gap-5 text-lg font-semibold text-blue-800">
                {pharmacy.logo && pharmacy.logo.length > 10 && (
                  <img src={pharmacy.logo} alt="logo" width={40} height={40} />
                )}
                {pharmacy.name}
              </span>
              {expandedIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {expandedIndex === index && (
              <div className="px-5 pb-4 pt-2 text-sm text-gray-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span>
                    <span className="font-medium">Licence:</span>{" "}
                    {pharmacy.licenceKey}
                  </span>
                  <button
                    onClick={() => handleCopy(pharmacy.licenceKey)}
                    title={
                      copiedLicence === pharmacy.licenceKey
                        ? "Copied!"
                        : "Copy to clipboard"
                    }
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    {copiedLicence === pharmacy.licenceKey ? (
                      <ClipboardCheck className="w-4 h-4" />
                    ) : (
                      <ClipboardCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p>
                  <span className="font-medium">Owner:</span> {pharmacy.owner}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {pharmacy.phone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {pharmacy.email}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {pharmacy.address}
                </p>
                <p>
                  <span className="font-medium">Expiry:</span>{" "}
                  {pharmacy.licenceExpiry}
                </p>
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant={"destructive"}>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your pharmacy and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(pharmacy._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() =>
                      navigate(`/dashboard/edit?pharmacyId=${pharmacy._id}`)
                    }
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pharmacy;
