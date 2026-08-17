'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { homeVideo } from '@/content/video';
import { cn } from '@/lib/cn';

/**
 * The home page video slot.
 *
 * Third-party embeds are loaded behind a click-to-play facade: until the visitor
 * presses play, the page makes no request to YouTube or Vimeo at all. That is what
 * keeps the site consent-banner-free (PLACEHOLDERS.md §2) and stops an embed from
 * quietly costing ~700KB and a set of tracking cookies on every home page view.
 *
 * Configure the slot in `content/video.ts`, not here.
 */
export function VideoSection({ showPlaceholder = false }: { showPlaceholder?: boolean } = {}) {
  const v = homeVideo;

  // No film configured yet. On an internal page a "video to commission" placeholder
  // is a useful reminder; on the page a prospect judges you by, it advertises an
  // unfinished site. Render nothing until a real video exists — the section then
  // returns automatically, with no code change, the moment content/video.ts is set.
  if (v.provider === 'none' && !showPlaceholder) return null;
  const [playing, setPlaying] = useState(false);

  const embedSrc =
    v.provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`
      : v.provider === 'vimeo'
        ? `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1`
        : null;

  return (
    <Section id="video" tone="warm" labelledBy="video-heading">
      <Container>
        <SectionHeading
          id="video-heading"
          eyebrow="Watch"
          align="center"
          title={
            <>
              Ninety seconds on <span className="text-aurora text-mint-300">how this works</span>
            </>
          }
          lead="Rather than read another page about wellbeing, hear what the assessment involves and what you get at the end of it."
        />

        <Reveal className="mt-12 sm:mt-14">
          <figure className="m-0">
            <div className="relative overflow-hidden rounded-lg bg-deep shadow-[0_24px_60px_-24px_rgba(42,16,48,0.55)] ring-1 ring-deep/10">
              <div className="aspect-video">
                {/* --- Self-hosted file: no third party involved at all. --- */}
                {v.provider === 'file' && v.src ? (
                  <video
                    className="size-full"
                    controls
                    preload="none"
                    poster={v.poster}
                    playsInline
                  >
                    <source src={v.src} type="video/mp4" />
                    {v.captionsSrc ? (
                      <track
                        kind="captions"
                        src={v.captionsSrc}
                        srcLang="en"
                        label="English"
                        default
                      />
                    ) : null}
                    Your browser cannot play this video.
                  </video>
                ) : null}

                {/* --- Third-party embed, only after an explicit click. --- */}
                {embedSrc && playing ? (
                  <iframe
                    className="size-full"
                    src={embedSrc}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null}

                {/* --- Facade for a configured embed that has not been started. --- */}
                {embedSrc && !playing ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group relative size-full cursor-pointer"
                  >
                    <Poster src={v.poster} />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <PlayMark />
                    </span>
                    <span className="sr-only">Play video: {v.title}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-6 pt-16 text-left text-lumen"
                    >
                      <span className="text-display-md">{v.title}</span>
                    </span>
                  </button>
                ) : null}

                {/* --- Nothing configured yet: the reserved space, designed. --- */}
                {v.provider === 'none' ? (
                  <div
                    className="relative size-full"
                    role="img"
                    aria-label={`Video placeholder: ${v.brief}`}
                  >
                    <Poster src={v.poster} />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <PlayMark muted />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 flex items-start gap-3 bg-gradient-to-t from-void/92 via-void/60 to-transparent p-5 pt-16 sm:p-7 sm:pt-20"
                    >
                      <Icon name="compass" className="mt-0.5 size-4 shrink-0 text-mint-300" />
                      <span className="text-left text-[0.8125rem] leading-snug text-lumen-soft">
                        <span className="font-semibold uppercase tracking-[0.1em] text-mint-300">
                          Video to commission · {v.targetLength}
                        </span>
                        <br />
                        {v.brief}
                      </span>
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {v.transcriptHref ? (
              <figcaption className="mt-4 text-center text-sm text-lumen-muted">
                Prefer to read?{' '}
                <a href={v.transcriptHref} className="link-draw font-medium text-mint-300">
                  Read the full transcript
                </a>
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Plain <img> rather than next/image on purpose: the poster ships as SVG, which
 * gains nothing from raster optimisation and would otherwise require enabling
 * `dangerouslyAllowSVG` in next.config. Swap to next/image if you replace the
 * poster with a photographic JPEG.
 */
function Poster({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

function PlayMark({ muted = false }: { muted?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-16 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 ease-[var(--ease-out-soft)] sm:size-20',
        muted
          ? 'border-white/25 bg-white/10'
          : 'border-white/35 bg-white/15 group-hover:scale-105 group-hover:bg-white/25'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn('ml-1 size-7 sm:size-8', muted ? 'fill-white/55' : 'fill-white')}
        aria-hidden="true"
      >
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
  );
}
