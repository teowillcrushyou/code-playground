import SandboxGameFrame from "../../../games/SandboxGameFrame";

export const metadata = {
  title: "Northline — Current Build | Teo's Sandbox",
  robots: { index: false, follow: false },
};

export default function NorthlineSandboxPage() {
  return <SandboxGameFrame title="Northline" build="0.02" sourceUrl="https://zeathe.teoisthewinner.com/" />;
}
