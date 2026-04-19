export default function HandarbeidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-hobby="handarbeid" data-page-hobby="handarbeid">
      {children}
    </div>
  );
}
