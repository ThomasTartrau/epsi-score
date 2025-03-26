import Logo from "@/components/custom/logo";
import { APP_NAME } from "@/lib/constants";
import { useSidebar } from "@/components/ui/sidebar";

export function NavHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex items-center">
      <Logo className="h-8 w-8" />
      {!isCollapsed && <h1 className="text-xl font-bold">{APP_NAME}</h1>}
    </div>
  );
}
