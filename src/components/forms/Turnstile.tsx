"use client";

import { useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile widget, rendered explicitly so React controls its lifecycle.
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<TurnstileApi> | undefined;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile unavailable")));
    script.onerror = () => {
      scriptPromise = undefined; // allow a later retry
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  siteKey: string;
  action: string;
  /** Called with a fresh token, or "" when the token expires or the challenge errors. */
  onToken: (token: string) => void;
  /** Called when the widget can't load or run at all. */
  onUnavailable?: () => void;
  className?: string;
  ref?: React.Ref<TurnstileHandle>;
};

export function Turnstile({ siteKey, action, onToken, onUnavailable, className, ref }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  // Keep the latest callbacks without re-rendering the widget.
  const callbacks = useRef({ onToken, onUnavailable });
  useEffect(() => {
    callbacks.current = { onToken, onUnavailable };
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      callbacks.current.onToken("");
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !container.current) return;
        widgetId.current = api.render(container.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          size: "flexible",
          callback: (token: string) => callbacks.current.onToken(token),
          "expired-callback": () => callbacks.current.onToken(""),
          "timeout-callback": () => callbacks.current.onToken(""),
          "error-callback": () => {
            callbacks.current.onToken("");
            // Returning nothing lets Turnstile show its own retry UI.
          },
        });
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onUnavailable?.();
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey, action]);

  return <div ref={container} className={className} />;
}
