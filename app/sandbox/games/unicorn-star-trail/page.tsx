import UnicornStarTrail from "./UnicornStarTrail";

export const metadata = {
  title: "Unicorn Star Trail - Current Build | Teo's Sandbox",
  description: "Collect ten stars with a rainbow unicorn before the trail timer runs out.",
  robots: { index: false, follow: false },
};

export default function UnicornStarTrailPage() {
  return <UnicornStarTrail />;
}
