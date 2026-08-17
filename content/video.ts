/**
 * The home page video slot.
 *
 * Nothing here is fabricated: until a real film exists, `provider: 'none'` renders a
 * designed placeholder carrying the brief for the video that belongs in the slot,
 * exactly as `ImageFrame` does for photography.
 *
 * To ship a real video, set `provider` and the matching field:
 *
 *   - 'file'    → drop an .mp4 in /public/video and set `src: '/video/intro.mp4'`.
 *                 Self-hosted, no third-party requests at all. Best for privacy.
 *   - 'youtube' → set `id` to the video ID only (not the full URL).
 *   - 'vimeo'   → set `id` to the numeric video ID.
 *
 * YouTube and Vimeo are loaded behind a click-to-play facade, so no third-party
 * cookies or requests occur until the visitor actively presses play. That keeps the
 * site free of a consent banner (see PLACEHOLDERS.md §2) — do not swap the facade
 * for a bare <iframe> without revisiting the privacy policy.
 */
export type VideoProvider = 'none' | 'file' | 'youtube' | 'vimeo';

export interface VideoConfig {
  provider: VideoProvider;
  /** Video ID for youtube/vimeo. Ignored otherwise. */
  id?: string;
  /** Path under /public for a self-hosted file, e.g. '/video/intro.mp4'. */
  src?: string;
  /** Poster frame shown before play. An SVG ships by default. */
  poster: string;
  /** Accessible name for the player. Describe the film, not the format. */
  title: string;
  /**
   * WebVTT captions for a self-hosted file, e.g. '/video/intro.en.vtt'.
   * Legally and practically required — care staff often watch on shift, muted.
   */
  captionsSrc?: string;
  /** Shown beneath the player. A transcript link is an accessibility win, not optional polish. */
  transcriptHref?: string;
  /** The film to commission. Shown in the placeholder state. */
  brief: string;
  /** Roughly how long the finished film should run. */
  targetLength: string;
}

export const homeVideo: VideoConfig = {
  provider: 'none',
  poster: '/images/video-poster.svg',
  title: 'How Ample Care works with care providers',
  brief:
    'A 90-second introduction from the founder: the wellbeing problem care providers actually face, what the assessment involves for staff, and what a registered manager receives at the end.',
  targetLength: '60–120 seconds',
};
