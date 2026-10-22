import meta from "@/config/image-meta.json";

const WIDTHS = [640, 1280, 1920] as const;

type ImageName = keyof typeof meta;

type PictureProps = {
  /** File name in /images-src without extension, e.g. "jet-g550" */
  name: ImageName | (string & {});
  alt: string;
  /** Standard `sizes` attribute. Defaults to full viewport width. */
  sizes?: string;
  /** Use for the LCP image only: loads eagerly with high fetch priority. */
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** Responsive WebP <img> for photos produced by `npm run images`. */
export function Picture({ name, alt, sizes = "100vw", priority = false, className, style }: PictureProps) {
  const dims = (meta as Record<string, { width: number; height: number }>)[name] ?? { width: 1920, height: 1280 };
  const srcSet = WIDTHS.filter((w, i) => i === 0 || dims.width > WIDTHS[i - 1])
    .map((w) => `/images/${name}-${w}.webp ${Math.min(w, dims.width)}w`)
    .join(", ");

  return (
    // eslint-disable-next-line @next/next/no-img-element -- images are pre-optimised at build time
    <img
      src={`/images/${name}-1280.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={dims.width}
      height={dims.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={style}
    />
  );
}
