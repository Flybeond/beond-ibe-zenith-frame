import ZenithEmbedBody from "./ZenithEmbedBody";

export default function ZenithSearchEmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ZenithEmbedBody>{children}</ZenithEmbedBody>;
}
