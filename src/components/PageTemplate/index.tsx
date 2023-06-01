import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function PageTemplate() {
  return (
    <div className="h-screen">
      <main className="h-full">
        <div className="">
          <Header />
        </div>

        <div>
          <Outlet />
        </div>

        {/* <div className="h-auto">
          <Footer />
        </div> */}
      </main>
    </div>
  );
}
