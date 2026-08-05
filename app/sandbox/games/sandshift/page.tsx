import SandboxGameFrame from "../../../games/SandboxGameFrame";

export const metadata = {
  title: "Sandshift — Current Build | Teo's Sandbox",
  robots: { index: false, follow: false },
};

export default function SandshiftSandboxPage() {
  return <SandboxGameFrame title="Sandshift" build="0.01" sourceUrl="https://sandshift.teoisthewinner.com/" />;
}
