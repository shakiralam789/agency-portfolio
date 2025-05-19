import cn from "@/utilities/cn";

const logo = "/images/gif/logo.gif";

export default function Logo({ className = "" }) {
  return (
    <img
      className={cn("w-44", className)}
      src={logo}
      width={300}
      h={300}
      alt="logo"
    />
  );
}
