import AddressForm from "@/components/forms/address-form";
import PersonaLInformationForm from "@/components/forms/personal-information-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  return (
    <div className="min-h-screen">
      <div className="">
        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="space-x-10"
        >
          <TabsList className="w-56">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-4">
              <PersonaLInformationForm />

              <AddressForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
