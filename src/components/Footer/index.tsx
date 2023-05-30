export default function Footer() {
  return (
    <footer className="bg-gray-primary text-white px-12 pt-12">
      <div className="screen-width border-t-2 border-gray-600">
        <div className="flex flex-row align-center justify-between py-6">
          <div className="flex flex-row gap-5 align-center justify-start">
            <a className="cursor-pointer text-gray-400 text-sm hover:opacity-75 hover:delay-50">
              Support
            </a>
            <a className="cursor-pointer text-gray-400 text-sm hover:opacity-75 hover:delay-50">
              Contact us
            </a>
            <a className="cursor-pointer text-gray-400 text-sm hover:opacity-75 hover:delay-50">
              About us
            </a>
          </div>
          <span className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Vaultoniq
          </span>
        </div>
      </div>
    </footer>
  );
}
