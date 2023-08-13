import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/Modals/SearchModal";

// const inter = Inter({ subsets: ["latin"] });
const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "This is a airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentuser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar currentuser={currentuser} />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <div className=" pb-20 pt-28 ">{children}</div>
      </body>
    </html>
  );
}
