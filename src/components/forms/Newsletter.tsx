import { useState } from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { subscribeNewsletter } from "@/lib/commerce";
import { track } from "@/lib/analytics";

export function Newsletter() {
  const { t } = usePreferences();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "invalid">("idle");

  return (
    <section className="bg-sand text-foreground">
      <div className="pad-x mx-auto max-w-[1500px] py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="section-type uppercase">{t("newsletter.title")}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">
              {t("newsletter.body")}
            </p>
          </div>
          <form
            className="w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await subscribeNewsletter(email);
              if (res.status === "ok") {
                setState("ok");
                setEmail("");
                track("newsletter_signup");
              } else {
                setState("invalid");
              }
            }}
          >
            <label htmlFor="newsletter-email" className="label-xs opacity-70">
              {t("newsletter.placeholder")}
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                placeholder={t("newsletter.placeholder")}
                className="w-full border-b border-foreground/30 bg-transparent pb-3 text-sm outline-none placeholder:text-foreground/45"
              />
              <button
                type="submit"
                className="shrink-0 bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#F8F4EC] transition-colors hover:bg-terracotta"
              >
                {t("newsletter.cta")}
              </button>
            </div>
            <p aria-live="polite" className="mt-3 text-sm">
              {state === "ok" && t("newsletter.success")}
              {state === "invalid" && t("newsletter.invalid")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
