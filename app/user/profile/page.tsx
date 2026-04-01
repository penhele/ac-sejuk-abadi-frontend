// app/profile/page.tsx
import ProfilePageContent from "@/components/user/profile/profile-page-content";

export const metadata = {
  title: "Profil Pengguna | NamaApp",
  description: "Kelola informasi pribadi dan keamanan akun Anda.",
};

export default function Page() {
  // Tambahkan console log untuk debugging jika diperlukan
  console.log("Rendering Profile Page Entry");

  return <ProfilePageContent />;
}