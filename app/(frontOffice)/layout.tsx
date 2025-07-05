import Navbar from "../components/frontOffice/Navbar";

export default function frontOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar />
        {children}
    </>
  );
}