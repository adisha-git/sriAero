import { LogoMark } from "@/components/brand/Logo";

const LIGHTS = 7;

/**
 * Runway edge lights switch on in sequence, then the logo appears, then the
 * overlay fades out (all within ~1s). Pure CSS, so it never blocks rendering.
 * Shown once per browser session.
 */
export function Preloader() {
  return (
    <>
      <script
        // Runs before the overlay is parsed so repeat visits never see it.
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("sa-pre")){document.documentElement.dataset.preloaded="1"}else{sessionStorage.setItem("sa-pre","1")}}catch(e){}`,
        }}
      />
      <div
        aria-hidden="true"
        className="preloader blueprint pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center [animation:preloader-out_0.25s_ease_0.75s_forwards] [[data-preloaded]_&]:hidden"
      >
        <div className="relative h-40 w-64 [perspective:320px]">
          <div className="absolute inset-0 [transform:rotateX(58deg)] [transform-origin:50%_100%]">
            {[0, 1].map((side) => (
              <div key={side} className={`absolute inset-y-0 flex flex-col-reverse justify-between ${side ? "right-6" : "left-6"}`}>
                {Array.from({ length: LIGHTS }).map((_, i) => (
                  <span
                    key={i}
                    className="block size-2.5 rounded-full bg-amber opacity-10 shadow-[0_0_12px_3px_rgb(232_163_61/0.65)]"
                    style={{ animation: `runway-light 0.22s ease-out ${i * 0.045}s forwards` }}
                  />
                ))}
              </div>
            ))}
            {/* centreline */}
            <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col-reverse justify-between">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-4 w-1"
                  style={{ animation: `fade-in 0.15s ease-out ${0.1 + i * 0.05}s forwards`, backgroundColor: "rgb(245 247 250 / 0.55)", opacity: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 opacity-0 [animation:rise-in_0.3s_var(--ease-flight)_0.35s_forwards]">
          <LogoMark className="size-10" />
          <span className="font-display text-3xl font-semibold tracking-tight text-cloud">
            Sri<span className="font-light text-sky">Aero</span>
          </span>
        </div>
        <p className="label-mono mt-4 text-sky/80 opacity-0 [animation:fade-in_0.2s_ease_0.45s_forwards]">
          RWY 35R · Lights on
        </p>
      </div>
    </>
  );
}
