// Admin layout — completely isolated from the public site.
// No Navbar, Footer, or any public-facing chrome is rendered here.
export default function AdminLayout({ children }) {
  return <>{children}</>;
}
