import { scenes } from "../deckData";
import DubaiMallDeck from "./DubaiMallDeck";

type PageProps = {
  params: Promise<{ scene?: string[] }>;
};

export function generateStaticParams() {
  return [
    {},
    ...scenes.map((scene) => ({
      scene: [scene]
    }))
  ];
}

export default async function DeckScenePage({ params }: PageProps) {
  const { scene } = await params;
  const requestedScene = scene?.[0] ?? "intro";
  const activeScene = scenes.some((deckScene) => deckScene === requestedScene) ? requestedScene : "intro";

  return <DubaiMallDeck activeScene={activeScene} />;
}
