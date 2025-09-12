"use client"
import Link from "next/link";
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks";

const Header = () => {
  const { links } = useLocalizedLinks();
  
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href={links.home} className="hover:underline">
        Blog
      </Link>
      .
    </h2>
  );
};

export default Header;
