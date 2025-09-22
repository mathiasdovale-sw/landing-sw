import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-none mb-8 text-center md:text-left text-gray-900 max-w-4xl mx-auto">
      {children}
    </h1>
  );
}
