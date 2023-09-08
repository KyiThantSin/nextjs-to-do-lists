import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lists It Easy",
  description: "Daily to do lists ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: "20px" }}>
        <AuthProvider>
          <div style={{ position: "sticky", top: 0, background: "#fff" }}>
            <NavBar />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
