// ONE place to edit invitation content. Set a value to null/'' to hide the UI that depends on it.
export const wedding = {
  groomName: 'Pandi Kirubhakaran E',
  brideName: 'Sowmiya C',
  groomShort: 'Kirubha', brideShort: 'Sowmy',
  weddingDate: '2026-11-20',            // YYYY-MM-DD
  weddingTime: null as string | null,   // TODO: e.g. '09:00' (24h) — hides time + Add to Calendar until set
  timezone: 'Asia/Kolkata',
  tzOffset: '+05:30',
  receptionDate: null as string | null, // TODO
  receptionTime: null as string | null, // TODO
  venueName: null as string | null,     // TODO
  venueAddress: null as string | null,  // TODO
  mapsUrl: 'https://maps.app.goo.gl/pfJ36xvUDDEWG9Es8',
  musicPath: '/audio/wedding-bgm.mp3',
  invitationUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  enableGallery: false,
  gallery: [] as { src: string; alt: string }[],   // 4–8 images in /public/images
  enableStory: false,
  story: { text: '', photo: '' },
};
export const weddingStart = () => new Date(`${wedding.weddingDate}T${wedding.weddingTime ?? '00:00'}:00${wedding.tzOffset}`);
