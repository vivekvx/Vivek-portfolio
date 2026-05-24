import { VoiceIntroButton } from "@/components/ui/voice-intro-button";
import type { PortfolioContent } from "@/content/portfolio";

export function HeroSection({ profile }: { profile: PortfolioContent["profile"] }) {
  return (
    <>
      <section className="hero full-row" id="home">
        <div className="rail hero-frame">
          <img src={profile.cityImage} alt="Grayscale city skyline" />
          <div className="hero-scan" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-tag">AI products · workflow tools · developer systems</p>
            <h1>{profile.headline}</h1>
            <p>{profile.summary}</p>
          </div>
        </div>
      </section>

      <section className="profile full-row">
        <div className="rail profile-grid">
          <div className="portrait">
            <img src={profile.portraitImage} alt={`${profile.name} portrait`} />
          </div>
          <div className="profile-copy">
            <p className="eyebrow">{profile.eyebrow}</p>
            <div className="name-row">
              <h2>{profile.name}.</h2>
              <span className="verified" aria-label="Verified">
                ✓
              </span>
              <VoiceIntroButton message={profile.voiceIntro} />
            </div>
            <p className="role-line">{profile.role}</p>
          </div>
        </div>
      </section>
    </>
  );
}
