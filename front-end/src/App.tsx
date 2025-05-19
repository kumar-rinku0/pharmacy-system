import { Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "sonner";

// components
import Pharmacy from "./components/pharmacy/pharmacy";
import MedicationList from "./components/pharmacy/medications";
import CreateMedication from "./components/pharmacy/create-medication";
import SelectedMedication from "./components/pharmacy/selected-medication";
import Login from "./components/pharmacy/login";
import Signup from "./components/pharmacy/signup";
import Dashboard from "./components/pharmacy/dashboard";
import Header from "./components/header";
import Profile from "./components/profile";
import Settings from "./components/settings";
import Notifications from "./components/notification";
import CustomerList from "./components/customer/customer-view";
import SearchCustomer from "./components/pharmacy/search";
import CreateCustomer from "./components/customer/create-customer";
import CreatePharmacy from "./components/pharmacy/create-pharmacy";
import Homepage from "./components/pharmacy/homepage";
import Logout from "./components/logout";
import { useAuth } from "./components/provider/auth-provider";
import NoPage from "./components/no-page";
import EditPharmacy from "./components/pharmacy/edit-pharmacy";

{
  /* <PharmacyForm /> */
}
function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {isAuthenticated && (
          <Route path="/dashboard" element={<Header />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/list-pharmacy" element={<Pharmacy />} />
            <Route
              path="/dashboard/create-pharmacy"
              element={<CreatePharmacy />}
            />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route
              path="/dashboard/notifications"
              element={<Notifications />}
            />
            <Route path="/dashboard/search" element={<SearchCustomer />} />
            <Route path="/dashboard/customer" element={<CreateCustomer />} />
            <Route path="/dashboard/customer-list" element={<CustomerList />} />
            <Route path="/dashboard/edit" element={<EditPharmacy />} />
            <Route
              path="/dashboard/medication"
              element={<CreateMedication />}
            />
            <Route
              path="/dashboard/:customerId/medication-list"
              element={<MedicationList />}
            />
            <Route
              path="/dashboard/:customerId/select-medication"
              element={<SelectedMedication />}
            />
          </Route>
        )}
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
