// Import component PortfolioPage yang sudah kita buat tadi
import UserPage from "@/components/admin/pages/user/page"; 

export default function Page() {
  // Arahkan ke UserPage, bukan PortfolioPage
  return <UserPage />;
}