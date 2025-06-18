import UserMenu from "./UserMenu";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full px-6 py-4 flex justify-end shadow bg-white sticky top-0 z-10">
        <UserMenu />
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
