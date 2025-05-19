import { Pill, ShoppingCart, Package, User, Clock } from "lucide-react";
import TopNav from "../partials/top-nav";

const Dashboard = () => {
  return (
    <main className="flex-1 overflow-hidden">
      <TopNav />
      <div className="p-6 h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Today's Rx
                  </p>
                  <h3 className="mt-1 text-2xl font-light text-gray-900">24</h3>
                </div>
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  +12% from yesterday
                </span>
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ready for Pickup
                  </p>
                  <h3 className="mt-1 text-2xl font-light text-gray-900">8</h3>
                </div>
                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  2 new since morning
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low Stock
                  </p>
                  <h3 className="mt-1 text-2xl font-light text-gray-900">5</h3>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <Pill className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Needs reorder
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Patients
                  </p>
                  <h3 className="mt-1 text-2xl font-light text-gray-900">
                    142
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <User className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  3 new today
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-light text-gray-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-indigo-100 text-indigo-600">
                    <ShoppingCart className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      New prescription received
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For John Smith • 9:42 AM
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-green-100 text-green-600">
                    <Package className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Prescription ready
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For Sarah Johnson • 11:15 AM
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-amber-100 text-amber-600">
                    <Pill className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Low stock alert
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Amoxicillin 500mg • 12 items left
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
            <div className="p-5 border-b border-indigo-200">
              <h3 className="font-light text-indigo-800">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-5">
              <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition border border-gray-200">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mb-2">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  New Rx
                </span>
              </button>
              <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition border border-gray-200">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mb-2">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  New Patient
                </span>
              </button>
              <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition border border-gray-200">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600 mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Inventory
                </span>
              </button>
              <button className="bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition border border-gray-200">
                <div className="p-2 rounded-full bg-amber-100 text-amber-600 mb-2">
                  <Pill className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Reorder
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>RxPremium Dashboard • {new Date().getFullYear()}</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
