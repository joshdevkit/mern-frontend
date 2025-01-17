import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, AppWindow } from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="md:hidden ">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Link href="/">
            <AppWindow className="text-red-500" />
          </Link>
          <nav className="flex flex-col items-left gap-3 mt-6 lg:gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
