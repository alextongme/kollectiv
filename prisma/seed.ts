import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.artist.deleteMany();

  const hash = await bcrypt.hash("password123", 10);

  const swim = await prisma.artist.create({
    data: {
      username: "swim",
      password: hash,
      firstName: "SWIM",
      imageUrl: "/images/djs/swim.jpg",
      bio: "Brooklyn selector redefining late-night sets.",
    },
  });

  const heartstring = await prisma.artist.create({
    data: {
      username: "heartstring",
      password: hash,
      firstName: "DJ",
      lastName: "Heartstring",
      imageUrl: "/images/djs/dj-heartstring.jpg",
      bio: "Euphoria, heartbreak, and four-on-the-floor.",
    },
  });

  const kettama = await prisma.artist.create({
    data: {
      username: "kettama",
      password: hash,
      firstName: "KETTAMA",
      imageUrl: "/images/djs/kettama.jpg",
      bio: "From Cork to the global stage. House, breaks, and pure chaos.",
    },
  });

  const marlon = await prisma.artist.create({
    data: {
      username: "marlon",
      password: hash,
      firstName: "Marlon",
      lastName: "Hoffstadt",
      imageUrl: "/images/djs/marlon-hoffstadt.jpg",
      bio: "The German wunderkind who can't stop making hits.",
    },
  });

  const malugi = await prisma.artist.create({
    data: {
      username: "malugi",
      password: hash,
      firstName: "Malugi",
      imageUrl: "/images/djs/malugi.jpg",
      bio: "The happiest man in dance music. Sun-soaked grooves from Berlin.",
    },
  });

  const sara = await prisma.artist.create({
    data: {
      username: "saralandry",
      password: hash,
      firstName: "Sara",
      lastName: "Landry",
      imageUrl: "/images/djs/sara-landry.jpg",
      bio: "The High Priestess of Hard Techno.",
    },
  });

  const daftpunk = await prisma.artist.create({
    data: {
      username: "daftpunk",
      password: hash,
      firstName: "Daft",
      lastName: "Punk",
      imageUrl: "/images/djs/daft-punk.jpg",
      bio: "Robots. Legends. The foundation of modern electronic music.",
    },
  });

  const justice = await prisma.artist.create({
    data: {
      username: "justice",
      password: hash,
      firstName: "Justice",
      imageUrl: "/images/djs/justice.jpg",
      bio: "French electronic duo. The cross. The Marshall stacks. The fury.",
    },
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "SWIM Is the DJ You Should Have Been Listening to Yesterday",
        subtitle: "The Brooklyn selector redefining late-night sets",
        content:
          "There's a moment in every great DJ set where the room locks in — where the music stops being background and becomes the only thing that matters. SWIM finds that moment earlier than anyone else.\n\nOperating out of Brooklyn's underground circuit, SWIM has built a reputation for marathon sets that weave between UK garage, deep house, and left-field club music with a fluidity that feels almost effortless. But don't mistake ease for simplicity. Every transition is surgical, every track selection deliberate.\n\nWe caught SWIM's set at a Bushwick warehouse last month, and three hours in, nobody had left the dance floor. That tells you everything you need to know.",
        imageUrl: "/images/djs/swim.jpg",
        artistId: swim.id,
      },
      {
        title: "DJ Heartstring and the Art of Making a Room Cry on the Dancefloor",
        subtitle: "Euphoria, heartbreak, and four-on-the-floor",
        content:
          "DJ Heartstring doesn't just play records — they orchestrate emotional arcs. A set from Heartstring is less a DJ performance and more a guided journey through every feeling you've tried to avoid all week.\n\nThe signature sound sits at the intersection of trance-influenced builds, heartfelt vocal chops, and driving house rhythms. It shouldn't work. It works perfectly. One minute you're fist-pumping, the next you're hugging a stranger with tears in your eyes.\n\nIn an era where DJs compete to play the hardest, fastest, most abrasive sets, Heartstring's commitment to vulnerability is radical. Their recent Boiler Room set racked up millions of views not because of spectacle, but because of sincerity.\n\nIf you haven't experienced it yet, fix that immediately.",
        imageUrl: "/images/djs/dj-heartstring.jpg",
        artistId: heartstring.id,
      },
      {
        title: "KETTAMA: From Cork to the Global Stage",
        subtitle: "The Irish producer blending trad, house, and pure chaos",
        content:
          "KETTAMA came out of Cork, Ireland with a sound that nobody could quite categorize — and that's exactly the point. Part house, part breakbeat, part something that sounds like a late-night session in a Dublin pub filtered through a warehouse in East London.\n\nHis productions carry a raw, joyful energy that's become increasingly rare in electronic music. Tracks like the ones on his Houndstooth releases don't just make you dance; they make you grin while doing it. There's a looseness, a humor, a refusal to take things too seriously that sets him apart.\n\nLive, KETTAMA is a force. We saw him close out a festival tent at 4AM and the energy was indistinguishable from a headline slot. Decks drenched in sweat, crowd absolutely unhinged, every drop landing like a punchline to a joke the whole room was in on.\n\nCork's finest export since butter.",
        imageUrl: "/images/djs/kettama.jpg",
        artistId: kettama.id,
      },
      {
        title: "Marlon Hoffstadt Is Having the Best Year in Dance Music",
        subtitle: "The German wunderkind who can't stop making hits",
        content:
          "It's hard to scroll through any DJ's tracklist right now without seeing Marlon Hoffstadt's name. The Berlin-based producer has been on an absolute tear, dropping track after track of sleazy, vocal-driven house music that sounds like it was made specifically for the moment the sun comes up and nobody wants to go home.\n\nWhat makes Hoffstadt special isn't just the output — it's the consistency. Every release hits. The basslines are filthy, the vocals are catchy without being corny, and the arrangements have a pop sensibility that never sacrifices the underground edge.\n\nAt just barely into his twenties, Hoffstadt is producing at a level that veterans twice his age would envy. His Diynamic releases have become instant classics, and his remix work somehow manages to improve on already great originals.\n\nRemember this name. Actually, you already do.",
        imageUrl: "/images/djs/marlon-hoffstadt.jpg",
        artistId: marlon.id,
      },
      {
        title: "Malugi and the New Wave of Feel-Good House",
        subtitle: "Sun-soaked grooves from a producer who gets it",
        content:
          "Some music just sounds like summer. Malugi's productions are a masterclass in warmth — lush pads, bouncing basslines, and an ear for melody that makes every track feel like golden hour at your favorite outdoor party.\n\nIn a scene that often rewards darkness and aggression, Malugi's commitment to making people smile through music is both refreshing and necessary. The tracks aren't simple — there's real depth in the production, layers that reveal themselves on repeat listens. But the immediate impact is pure joy.\n\nWe've been spinning Malugi tracks in our radio sets for months now, and the response from listeners has been unanimous: more of this, please.\n\nThe world has enough hard techno. Give us more Malugi.",
        imageUrl: "/images/djs/malugi.jpg",
        artistId: malugi.id,
      },
      {
        title: "Sara Landry Doesn't Care If You Can't Keep Up",
        subtitle: "The hardest working woman in techno",
        content:
          "Sara Landry plays techno the way it was meant to be played: loud, fast, and without apology. In a genre that can sometimes feel like it's been smoothed down for mass consumption, Landry is a reminder that techno was born in darkness and sweat.\n\nHer sets are physical experiences. The kick drums hit your chest, the acid lines scrape your brain, and the pace never lets up. It's not for everyone, and she knows that. That's the point.\n\nBut what sets Landry apart from other hard techno DJs is her production chops. She's not just selecting — she's creating an arsenal of tracks purpose-built for maximum dancefloor destruction. Her releases have become essential weapons for DJs worldwide.\n\nWe caught her at Avant Gardner last month. Three hours of relentless energy. Half the crowd looked like they'd run a marathon by the end. Nobody left early.\n\nSara Landry is the real deal.",
        imageUrl: "/images/djs/sara-landry.jpg",
        artistId: sara.id,
      },
      {
        title: "Why Daft Punk Still Matters More Than Ever",
        subtitle: "Three years after the split, their influence only grows",
        content:
          "When Daft Punk announced their breakup with that now-iconic desert explosion video, it felt like the end of an era. And it was. But what's become clear in the years since is that the era they defined never actually ended — it just became the foundation for everything that followed.\n\nEvery producer making French house, every DJ dropping a vocoder-drenched vocal, every artist who understands that electronic music and pop aren't enemies — they're all working in the space that Thomas Bangalter and Guy-Manuel de Homem-Christo built.\n\nRandom Access Memories was supposed to be a departure. Instead, it became a blueprint. Get Lucky brought an entire generation to electronic music. Giorgio by Moroder is still the greatest piece of music storytelling in the genre's history.\n\nDiscovery turned 25 recently, and listening to it now, it sounds like it could have been released yesterday. That's not nostalgia talking — that's timelessness.\n\nWe may never see the helmets again. But every time you hear a four-on-the-floor beat with a French filter on it, they're right there.",
        imageUrl: "/images/djs/daft-punk.jpg",
        artistId: daftpunk.id,
      },
      {
        title: "Justice Is Back and They Brought the Entire Cross",
        subtitle: "The French duo's live show is still unmatched",
        content:
          "There's a reason Justice's live show is spoken about in hushed, reverent tones by people who've experienced it. Gaspard Augé and Xavier de Rosnay don't perform — they conduct a sonic assault that leaves venues structurally compromised.\n\nThe cross-shaped Marshall stack. The synchronized headbanging. The way Phantom transitions into Genesis and suddenly you're 19 again, discovering electronic music for the first time. It's church, if church had a better sound system.\n\nTheir latest album continues the duo's evolution from blog-house provocateurs to genuine rock stars of electronic music. The production is immaculate — thick, distorted, dripping with analog warmth. Nobody else sounds like this because nobody else would dare stack that many layers and somehow make it all groove.\n\nWe saw them at Terminal 5 last week. The floor was literally bouncing. Security looked concerned. The crowd didn't care.\n\nJustice live is not a concert. It's an event. And if you get the chance to witness it, cancel whatever else you had planned.",
        imageUrl: "/images/djs/justice.jpg",
        artistId: justice.id,
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        title: "kollectiv w/ KETTAMA",
        description:
          "The Irish selector brings his legendary energy to Brooklyn for an all-night house and breaks session.",
        imageUrl: "/images/djs/kettama.jpg",
        artistId: kettama.id,
      },
      {
        title: "kollectiv presents: Sara Landry — Warehouse Takeover",
        description:
          "Hard techno. No compromises. Bushwick warehouse. Bring earplugs.",
        imageUrl: "/images/djs/sara-landry.jpg",
        artistId: sara.id,
      },
      {
        title: "kollectiv x DJ Heartstring: Cry Dance",
        description:
          "An evening of euphoric, emotional house music. Tissues optional. Dancing mandatory.",
        imageUrl: "/images/djs/dj-heartstring.jpg",
        artistId: heartstring.id,
      },
      {
        title: "kollectiv x Marlon Hoffstadt: Sleaze Factory",
        description:
          "Vocal house, filthy basslines, and sunrise energy. Output, Brooklyn.",
        imageUrl: "/images/djs/marlon-hoffstadt.jpg",
        artistId: marlon.id,
      },
      {
        title: "kollectiv presents: Malugi — Golden Hour",
        description:
          "Rooftop session. Sun-soaked grooves. The happiest party in NYC.",
        imageUrl: "/images/djs/malugi.jpg",
        artistId: malugi.id,
      },
      {
        title: "kollectiv x Justice: Cross Night",
        description:
          "The French duo takes over Terminal 5 for one unforgettable night. Marshall stacks included.",
        imageUrl: "/images/djs/justice.jpg",
        artistId: justice.id,
      },
      {
        title: "kollectiv presents: SWIM — After Dark",
        description:
          "Deep house, UK garage, and left-field selections till dawn. Invite only.",
        imageUrl: "/images/djs/swim.jpg",
        artistId: swim.id,
      },
      {
        title: "kollectiv x Daft Punk: One More Time",
        description:
          "A night celebrating the legacy. Helmet optional. Dancing mandatory.",
        imageUrl: "/images/djs/daft-punk.jpg",
        artistId: daftpunk.id,
      },
    ],
  });

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
