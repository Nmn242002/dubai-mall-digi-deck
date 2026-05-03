"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Scene, scenes } from "../deckData";

type Chapter = {
  id: Exclude<Scene, "intro" | "welcome" | "menu">;
  eyebrow: string;
  title: string;
  detail: string;
  image: string;
  next: Scene;
  previous: Scene;
};

const videos = {
  skyline: "/videos/intro.mp4",
  mall: "https://www.pexels.com/download/video/17864341/?fps=25.0&h=1080&w=1920"
};

const images = {
  fountain: "https://commons.wikimedia.org/wiki/Special:FilePath/Dubai%20Fountain%20from%20Burj%20Khalifa%20%2815795939749%29.jpg?width=1400",
  fashion: "https://commons.wikimedia.org/wiki/Special:FilePath/Dubai%20mall%20fashion%20avenue.JPG?width=1400",
  aquarium: "https://commons.wikimedia.org/wiki/Special:FilePath/Dubai%20Mall%20Aquarium%20View.jpg?width=1400",
  dining: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
  waterfall: "https://commons.wikimedia.org/wiki/Special:FilePath/Dubai%20Mall%20waterfall%20%283980640721%29.jpg?width=1400"
};

const chapters: Chapter[] = [
  {
    id: "fashion",
    eyebrow: "Luxury Retail",
    title: "Fashion Avenue",
    detail: "Fashion Avenue is Dubai Mall's refined luxury retail district, built around flagship boutiques, watches, jewelry, couture, beauty, and personal shopping moments.",
    image: images.fashion,
    previous: "menu",
    next: "aquarium"
  },
  {
    id: "aquarium",
    eyebrow: "Icon Experience",
    title: "Dubai Aquarium",
    detail: "The aquarium turns a shopping visit into a full attraction, with a vast viewing panel, marine life, family experiences, and a strong central landmark.",
    image: images.aquarium,
    previous: "fashion",
    next: "dining"
  },
  {
    id: "dining",
    eyebrow: "Global Tables",
    title: "Dining Districts",
    detail: "Dining spans quick cafes, relaxed restaurants, destination terraces, and fountain-facing tables, giving visitors a natural pause between shopping and attractions.",
    image: images.dining,
    previous: "aquarium",
    next: "waterfall"
  },
  {
    id: "waterfall",
    eyebrow: "Indoor Landmark",
    title: "Human Waterfall",
    detail: "The Human Waterfall is an instantly recognizable indoor landmark, used for orientation, photos, meeting points, and a dramatic pause inside the mall.",
    image: images.waterfall,
    previous: "dining",
    next: "fountain"
  },
  {
    id: "fountain",
    eyebrow: "Evening Finale",
    title: "Fountain View",
    detail: "The Dubai Fountain closes the journey outside with choreographed water, music, light, lakefront energy, and the Burj Khalifa skyline in view.",
    image: images.fountain,
    previous: "waterfall",
    next: "menu"
  }
];

function deckPath(scene: Scene) {
  return scene === "intro" ? "/deck" : `/deck/${scene}`;
}

function VideoStage({
  source,
  poster,
  muted
}: {
  source: string;
  poster: string;
  muted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <video ref={videoRef} className="deck-video" autoPlay muted={muted} loop playsInline poster={poster}>
        <source src={source} type="video/mp4" />
      </video>
      <div className="video-shade" />
    </>
  );
}

function NavButton({ href, children, variant = "light" }: { href: string; children: React.ReactNode; variant?: "light" | "dark" | "clear" }) {
  return (
    <Link className={`nav-button ${variant}`} href={href}>
      {children}
    </Link>
  );
}

export default function DubaiMallDeck({ activeScene }: { activeScene: string }) {
  const scene = scenes.some((deckScene) => deckScene === activeScene) ? (activeScene as Scene) : "intro";
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const activeChapter = useMemo(() => chapters.find((chapter) => chapter.id === scene), [scene]);

  useEffect(() => {
    setMenuOpen(false);
  }, [scene]);

  return (
    <main className="deck-shell">
      <section className={`deck-slide ${scene === "intro" ? "active" : ""}`} aria-label="Dubai Mall intro video">
        <VideoStage
          source={videos.skyline}
          muted={muted}
          poster={images.fountain}
        />
        <button className="sound-button" type="button" onClick={() => setMuted((value) => !value)}>
          {muted ? "Sound Off" : "Sound On"}
        </button>
        <div className="intro-logo">
          <span>Dubai Mall</span>
          <small>Video 1 of 2</small>
        </div>
        <div className="enter-row">
          <NavButton href={deckPath("welcome")}>Enter</NavButton>
        </div>
        <Link className="video-slider-arrow video-next" href={deckPath("welcome")} aria-label="Go to second video" />
      </section>

      <section className={`deck-slide ${scene === "welcome" ? "active" : ""}`} aria-label="Dubai Mall welcome video">
        <VideoStage
          source={videos.mall}
          muted={muted}
          poster={images.aquarium}
        />
        <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "Close Menu" : "Menu"}
        </button>
        <div className="top-line" />
        <nav className={`deck-menu ${menuOpen ? "open" : ""}`} aria-label="Main menu">
          {chapters.map((chapter) => (
            <Link key={chapter.id} href={deckPath(chapter.id)}>
              {chapter.title}
            </Link>
          ))}
        </nav>
        <div className="welcome-copy">
          <p>Video 2 of 2</p>
          <h1>Where the city comes indoors.</h1>
        </div>
        <div className="welcome-actions">
          <NavButton href={deckPath("menu")}>Continue</NavButton>
        </div>
        <Link className="video-slider-arrow video-prev" href={deckPath("intro")} aria-label="Go to first video" />
        <Link className="video-slider-arrow video-next" href={deckPath("menu")} aria-label="Go to menu" />
      </section>

      <section className={`deck-slide menu-slide ${scene === "menu" ? "active" : ""}`} aria-label="Dubai Mall chapter menu">
        <div className="menu-backdrop" />
        <div className="menu-wash" />
        <NavButton href={deckPath("intro")} variant="dark">Replay</NavButton>
        <div className="top-line blue" />
        <div className="menu-title">
          <p>Main Menu</p>
          <h2>Choose Your Dubai Mall Chapter</h2>
        </div>
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <Link className="chapter-card" key={chapter.id} href={deckPath(chapter.id)}>
              <span className="chapter-thumb" style={{ backgroundImage: `url(${chapter.image})` }} />
              <span className="chapter-text">
                <small>{chapter.eyebrow}</small>
                <b>{chapter.title}</b>
                <em>{chapter.detail}</em>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {activeChapter && (
        <section className="deck-slide chapter-slide active" aria-label={activeChapter.title}>
          <div className="chapter-backdrop" style={{ backgroundImage: `url(${activeChapter.image})` }} />
          <div className="chapter-shade" />
          <NavButton href={deckPath("menu")} variant="dark">Menu</NavButton>
          <Link className="deck-arrow previous" href={deckPath(activeChapter.previous)} aria-label="Previous slide" />
          <Link className="deck-arrow next" href={deckPath(activeChapter.next)} aria-label="Next slide" />
          <article className="chapter-content">
            <p>{activeChapter.eyebrow}</p>
            <h2>{activeChapter.title}</h2>
            <span>{activeChapter.detail}</span>
          </article>
        </section>
      )}
    </main>
  );
}
