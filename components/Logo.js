import cn from "@/utilities/cn";

const navLogo = "/images/gif/comp.gif";

export default function Logo({ className = "" }) {
  return (
    <img
      className={cn("w-48", className)}
      src={navLogo}
      width={300}
      h={300}
      alt="logo"
    />
  );
}
