import {Menu, Sparkles} from "lucide-react";
import Link from "next/link";
import {Poppins} from "next/font/google";
import {UserButton} from "@clerk/nextjs";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

// If loading a variable font, you don't need to specify the font weight
const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ia
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <UserButton />
      </div>
    </div>
  );
};
