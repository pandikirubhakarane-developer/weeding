// One place to manage all wedding invitation details.

export const wedding = {
  groomName: "Pandi Kirubhakaran E",
  brideName: "Sowmiya C",

  groomShort: "Kirubha",
  brideShort: "Sowmy",

  // Wedding / Muhurtham
  weddingDate: "2026-11-20",
  weddingTime: "09:00" as string | null,

  // Timezone
  timezone: "Asia/Kolkata",
  tzOffset: "+05:30",

  // Nichayathartham
  engagementDate: "2026-11-19" as string | null,
  engagementTime: null as string | null,

  // Reception
  receptionDate: "2026-11-19" as string | null,
  receptionTime: "18:00" as string | null,

  // Event end times
  receptionEndTime: "19:00",
  weddingEndTime: "10:00",

  // Venue
  venueName: "VNR Nadar Mahal" as string | null,
  venueAddress: "Chinnamanur, Theni, Tamil Nadu" as string | null,

  // Confirm this is the correct venue map link
  mapsUrl: "https://maps.app.goo.gl/pfJ36xvUDDEWG9Es8",

  // Background music
  musicPath: "/audio/wedding-bgm.mp3",

  // Invitation URL
  invitationUrl: process.env.NEXT_PUBLIC_SITE_URL || "",

  // Gallery
  enableGallery: false,

  gallery: [] as {
    src: string;
    alt: string;
  }[],

  // Love Story
  enableStory: false,

  story: {
    text: "",
    photo: "",
  },
};

// Wedding countdown starts at 9:00 AM IST
export const weddingStart = () =>
  new Date(
    `${wedding.weddingDate}T${wedding.weddingTime ?? "00:00"}:00${wedding.tzOffset}`,
  );
