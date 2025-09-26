import { TopMenu, Footer } from "@/components";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <TopMenu />

      <div>{children}</div>

      <footer>
        <Footer />
      </footer>
    </main>
  );
}
