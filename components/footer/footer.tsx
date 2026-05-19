import FooterBottom from "./footer-bottom";
import FooterContact from "./footer-contact";
import FooterLinks from "./footer-links";
import FooterMap from "./footer-map";
import FooterProfile from "./footer-profile";

export default async function Footer() {
  return (
    <div className="py-4">
      <div className="space-y-between-section">
        <div className="grid grid-cols-4 space-x-between-items-sm">
          <FooterProfile />

          <FooterLinks className="col-span-3" />
        </div>

        <div className="flex flex-col lg:flex-row gap-between-items-lg">
          <FooterMap className="flex-1" />

          <FooterContact className="min-w-3xs" />
        </div>

        <FooterBottom />
      </div>
    </div>
  );
}
