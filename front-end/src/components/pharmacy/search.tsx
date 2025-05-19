import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ContentProp } from "./search/columns";
import { toast } from "sonner";
import Searching from "./search/searching";

const SearchCustomer = () => {
  const [content, setContent] = useState<ContentProp[] | null>(null);

  useEffect(() => {
    handleInitialFetch();
  }, []);

  const handleInitialFetch = () => {
    axios
      .get(`/api/transition/getbysearch?email=&postal=&medic=`, {
        headers: {
          licencekey: "98e8a240b07648ab86b45ee746caedbd",
        },
      })
      .then((res) => {
        console.log(res.data);
        setContent(res.data.transitions);
      })
      .catch((err) => {
        setContent([]);
        console.log(err);
        toast.error(
          err.response.data.message || err.response.data.error || err.message
        );
      });
  };

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.currentTarget;
    const formData = new FormData(form);
    axios
      .get(
        `/api/transition/getbysearch?email=${formData.get(
          "email"
        )}&postal=${formData.get("postal")}&medic=${formData.get("medic")}`,
        {
          headers: {
            licencekey: "98e8a240b07648ab86b45ee746caedbd",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setContent([...res.data.transitions]);
      })
      .catch((err) => {
        setContent([]);
        console.log(err);
        toast.error(
          err.response.data.message || err.response.data.error || err.message
        );
      });
  };
  return (
    <>
      <div className="min-h-fit w-full bg-transparent p-2">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <form
            onSubmit={handleSearchClick}
            className="w-full md:w-auto flex flex-col gap-2 items-center"
          >
            <div className="relative w-full max-w-lg">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Advance Search Customer by E-mail, Medication & Postal code!
              </label>
              <div className="flex shadow-sm rounded-lg">
                <input
                  className="flex-1 min-w-0 block w-full px-2 py-2 text-base border-gray-300 rounded-l-lg border focus:ring-indigo-500 focus:border-indigo-500"
                  type="email"
                  name="email"
                  id="search"
                  // value={info || ""}
                  placeholder="hello@user.com"
                />
                <input
                  className="flex-1 min-w-0 block w-full pl-2 pr-1 py-2 text-base border-gray-300 border focus:ring-indigo-500 focus:border-indigo-500"
                  type="number"
                  name="postal"
                  id="search"
                  // value={info || ""}
                  placeholder="postal code"
                />
                <input
                  className="flex-1 min-w-0 block w-full px-2 py-2 text-base border-gray-300 border focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  name="medic"
                  id="search"
                  // value={info || ""}
                  placeholder="medication"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Searching content={content} />
      {/* <Searching /> */}
    </>
  );
};

// const SearchResult = ({ content }: { content: ContentProp[] }) => {
//   // return <Searching />;
// };

export default SearchCustomer;
