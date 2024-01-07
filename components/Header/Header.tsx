import { getServerSession } from "next-auth";
import { DarkModeToggle } from "../DarkMode/DarkModeToggle";
import UserDropDown from "../UserComponent/UserDropDown";

import Logo from "./Logo";
import { authOptions } from "@/auth";
import Link from "next/link";
import { MessageSquareTextIcon } from "lucide-react";
import CustomToolTip from "../ui/customToolTip";
import CreateChatButton from "../Chat/CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "../LanguageSelect";
import CreateNewMessage from "./CreateNewMessage";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center sm:justify-center p-5 pl-2 max-w-7xl mx-auto  bg-white dark:bg-gray-900">
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4 md:space-x-6 relative">
          <LanguageSelect />
          {session ? (
            <>
              <CustomToolTip tooltip="Message">
                <CreateNewMessage />
              </CustomToolTip>

              <CustomToolTip tooltip="Create Chat">
                <CreateChatButton />
              </CustomToolTip>
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}
          <DarkModeToggle />
          <UserDropDown session={session} />
        </div>
      </nav>
      <UpgradeBanner />
    </header>
  );
}
