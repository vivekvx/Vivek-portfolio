import { ThemeProvider } from "@/components/providers/theme-provider";
import { AboutSection } from "@/components/sections/about-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { GitHubActivitySection } from "@/components/sections/github-activity-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SocialLinksSection } from "@/components/sections/social-links-section";
import { StackSection } from "@/components/sections/stack-section";
import { CommandPalette } from "@/components/ui/command-palette";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { portfolioContent } from "@/content/portfolio";

function Divider() {
  return (
    <div className="divider full-row">
      <div className="rail pattern" />
    </div>
  );
}

export function PortfolioShell() {
  return (
    <ThemeProvider>
      <div className="site-shell">
        <header className="topbar full-row">
          <div className="rail">
            <a className="brand" href="#home" aria-label="Go to home">
              {portfolioContent.profile.initials}
            </a>
            <nav className="desktop-nav" aria-label="Primary navigation">
              {portfolioContent.navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="toolbar">
              <CommandPalette links={portfolioContent.quickActions} copyActions={portfolioContent.copyActions} />
              <a className="pill-button" href={portfolioContent.profile.mailUrl}>
                <span aria-hidden="true">✉️</span>
                <span>mail</span>
              </a>
              <a
                className="icon-button"
                href={portfolioContent.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub"
              >
                <img src="/assets/icons/github.svg" alt="" aria-hidden="true" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main>
          <HeroSection profile={portfolioContent.profile} />
          <Divider />
          <SocialLinksSection socialLinks={portfolioContent.socialLinks} />
          <Divider />
          <ExperienceSection experience={portfolioContent.experience} />
          <Divider />
          <GitHubActivitySection />
          <Divider />
          <AboutSection about={portfolioContent.about} />
          <Divider />
          <StackSection stackGroups={portfolioContent.stackGroups} />
          <AchievementsSection achievements={portfolioContent.achievements} />
          <ProjectsSection projects={portfolioContent.projects} />
          <footer className="footer full-row">
            <div className="rail footer-rail">
              <p>VIVEK SAHU</p>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}
