import { Origami } from "lucide-react";
import { Kodchasan } from "next/font/google";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import { Assets, newlandTheme } from "@/constants";
import { cn } from "@/utils";

const kodchasan = Kodchasan({
  weight: "400",
  subsets: ["latin"],
});

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-2 sm:p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div
          className={cn(
            "flex items-center gap-2 self-center font-medium",
            !newlandTheme && kodchasan.className,
          )}
        >
          {newlandTheme ? (
            <div className="relative flex size-8 items-center justify-center rounded-lg text-primary-foreground">
              <Image
                className="dark:invert"
                src={Assets.icons.newland}
                alt="Newland logomarca"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <Origami size={18} className="text-black dark:text-white" />
          )}
          {newlandTheme ? "GRUPO NEW" : "SmartStock"}
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
