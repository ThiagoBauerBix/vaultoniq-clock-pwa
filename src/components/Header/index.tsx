import { SignOut } from "@phosphor-icons/react";
import Logo from "../../assets/images/vaultoniq_logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // const { logout } = useAuth();
  function handleLogout() {
    // logout();
    navigate("/login");
  }
  return (
    <header className="bg-black-primary text-white drop-shadow-2xl px-12">
      <div className="screen-width bg-black-primary">
        <div className="bg-black-primary flex flex-row align-center justify-between py-6">
          <img
            src={Logo}
            alt="logo"
            className="pointer hidden md:block bg-transparent"
          />
          <div className="bg-black-primary flex flex-row items-center gap-2">
            <SignOut
              onClick={handleLogout}
              className="bg-black-primary inline mr-2 text-center cursor-pointer"
              color="#fff"
              weight="fill"
              size={32}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
