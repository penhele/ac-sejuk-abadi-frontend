import AddressForm from "@/components/forms/address-form";
import PersonaLInformationForm from "@/components/forms/personal-information-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/contants/routes";
import Link from "next/link";

export default function AccountPage() {
  const items = [
    {
      value: "item-1",
      trigger: "Pembelian",
      content: [
        {
          label: "Daftar Transaksi",
          href: "#",
        },
        {
          label: "Menunggu Pembayaran",
          href: "#",
        },
      ],
    },
    {
      value: "item-2",
      trigger: "Profil",
      content: [
        {
          label: "Wishlist",
          href: ROUTES.WISHLIST,
        },
        {
          label: "Cart",
          href: ROUTES.CART,
        },
        {
          label: "Pengaturan",
          href: ROUTES.ACCOUNT,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row space-x-between-section h-fit">
      <div className="min-w-3xs border p-inside-card rounded-lg">
        <div className="">
          {items.map((item, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              defaultValue={item.value}
            >
              <AccordionItem value={item.value}>
                <AccordionTrigger className="font-bold">
                  {item.trigger}
                </AccordionTrigger>

                <AccordionContent key={index}>
                  {item.content.map((subItem, index) => (
                    <Link key={index} href={subItem.href}>
                      <Button
                        size={"xs"}
                        variant={"ghost"}
                        className="w-full justify-start font-normal h-8"
                      >
                        {subItem.label}
                      </Button>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-fit w-full">
        <PersonaLInformationForm />

        <AddressForm />
      </div>
    </div>
  );
}

// import AddressForm from "@/components/forms/address-form";
// import PersonaLInformationForm from "@/components/forms/personal-information-form";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function AccountPage() {
//   return (
//     <div className="min-h-screen">
//       <div className="">
//         <Tabs
//           defaultValue="account"
//           orientation="vertical"
//           className="space-x-10"
//         >
//           <TabsList className="w-56">
//             <TabsTrigger value="account">Account</TabsTrigger>
//             <TabsTrigger value="password">Password</TabsTrigger>
//             <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           </TabsList>

//           <TabsContent value="account">
//             <div className="space-y-4">
//               <PersonaLInformationForm />

//               <AddressForm />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
