import FooterBottom from "./footer-bottom";
import FooterContact from "./footer-contact";
import FooterLinks from "./footer-links";
import FooterMap from "./footer-map";
import FooterProfile from "./footer-profile";

export default async function Footer() {
  return (
    <div className="space-y-between-items-lg py-4 mt-4">
      <div className="grid grid-cols-4 gap-between-items space-x-between-items-sm">
        <FooterProfile className="col-span-4 lg:col-span-1" />

        <FooterLinks className="col-span-4 lg:col-span-3" />
      </div>

      <div className="flex flex-col lg:flex-row gap-between-items-lg">
        <FooterMap className="flex-1" />

        <FooterContact className="max-w-3xs" />
      </div>

      <FooterBottom />
    </div>
  );
}
