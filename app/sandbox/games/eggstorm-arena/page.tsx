import SandboxGameFrame from "../../../games/SandboxGameFrame";

export const metadata = {
  title: "Eggstorm Arena — Current Build | Teo's Sandbox",
  robots: { index: false, follow: false },
};

export default function EggstormArenaSandboxPage() {
  return <SandboxGameFrame title="Eggstorm Arena" build="0.01" sourceUrl="https://egg.teoisthewinner.com/" />;
}
