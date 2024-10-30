import { Navigation } from "@/components/navigation";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center w-full">
        <Navigation />

        
      </div>
    </header>
  );
};

export default Header;
