import { Outlet } from "react-router";
import SideNav from "./side-nav";

const Header = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <SideNav />
      <div className="w-full overflow-x-auto bg-accent dark:bg-primary">
        {/* <div className="sm:h-[calc(99vh-60px)] overflow-auto"> */}
        <div className="sm:h-[100vh] overflow-y-auto">
          {/* <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh-120px)] overflow-y-auto relative"> */}
          <div className="w-full flex justify-center mx-auto overflow-auto h-[100vh] overflow-y-auto relative">
            <div className="w-full md:max-w-6xl xl:max-w-none xl:w-7xl pt-1 pl-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
