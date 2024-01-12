import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import Header from "../Header";

export default function PageTemplate() {
  const {accessToken} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const location = (window.location.href.split('/'))
    if(location.slice(-1)[0] == '') {
      if(accessToken || localStorage.getItem("accessToken")) {
        api.defaults.headers.common.Authorization = `Bearer ${
          accessToken || localStorage.getItem("accessToken")
        }`;
        navigate("/scan");
      } else {
        navigate("/login");
      }
    }
  })

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
