type Lang = "en" | "zh";

interface LandingProps {
  lang: Lang;
}

export default function Landing({ lang }: LandingProps) {
  const t = (en: string, zh: string) => (lang === "en" ? en : zh);

  return (
    <div className="from-royalheart-cream via-royalheart-darkblush to-royalheart-cream relative overflow-hidden bg-gradient-to-r px-6 py-20 text-center">
      <div className="relative z-10 mx-auto max-w-xl text-black">
        <p className="text-gold mb-3 text-xs font-bold tracking-[0.25em]">
          {t("HANDMADE WITH LOVE", "用心手作")}
        </p>

        <div className="mb-4 font-serif text-5xl leading-tight font-semibold md:text-6xl">
          {t("Royal Heart", "御心屋")}
          <p className="block">{t("House", "")}</p>
        </div>

        <p className="mb-8 text-base font-light text-gray-800">
          {t(
            "Custom cakes, fresh pastries & dim sum — order online, pick up fresh.",
            "定制蛋糕、新鲜糕点与点心 — 在线下单，现做现取。",
          )}
        </p>
      </div>
    </div>
  );
}
