import Footer from "./footer";
import Header from "./header";

export const MainLayout = ({ children }: HocProps) => {
  return (
    <div>
      <Header />
        <div>{children}</div>
      <Footer />
    </div>
  );
};
