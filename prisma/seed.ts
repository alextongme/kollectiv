import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.artist.deleteMany();

  const hash = await bcrypt.hash("password123", 10);
  const demoHash = await bcrypt.hash("demo123", 10);

  // Demo user
  const demo = await prisma.artist.create({
    data: {
      username: "demo",
      password: demoHash,
      firstName: "Demo",
      lastName: "User",
      bio: "A demo account for exploring THE KOLLECTIVE.",
      email: "demo@kollectiv.nyc",
    },
  });

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
      // DJ articles
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
          "KETTAMA came out of Cork, Ireland with a sound that nobody could quite categorize — and that's exactly the point. Part house, part breakbeat, part something that sounds like a late-night session in a Dublin pub filtered through a warehouse in East London.\n\nHis productions carry a raw, joyful energy that's become increasingly rare in electronic music. There's a looseness, a humor, a refusal to take things too seriously that sets him apart.\n\nLive, KETTAMA is a force. We saw him close out a festival tent at 4AM and the energy was indistinguishable from a headline slot. Decks drenched in sweat, crowd absolutely unhinged, every drop landing like a punchline to a joke the whole room was in on.\n\nCork's finest export since butter.",
        imageUrl: "/images/djs/kettama.jpg",
        artistId: kettama.id,
      },
      {
        title: "Marlon Hoffstadt Is Having the Best Year in Dance Music",
        subtitle: "The German wunderkind who can't stop making hits",
        content:
          "It's hard to scroll through any DJ's tracklist right now without seeing Marlon Hoffstadt's name. The Berlin-based producer has been on an absolute tear, dropping track after track of sleazy, vocal-driven house music that sounds like it was made specifically for the moment the sun comes up and nobody wants to go home.\n\nWhat makes Hoffstadt special isn't just the output — it's the consistency. Every release hits. The basslines are filthy, the vocals are catchy without being corny, and the arrangements have a pop sensibility that never sacrifices the underground edge.\n\nRemember this name. Actually, you already do.",
        imageUrl: "/images/djs/marlon-hoffstadt.jpg",
        artistId: marlon.id,
      },
      {
        title: "Why Daft Punk Still Matters More Than Ever",
        subtitle: "Three years after the split, their influence only grows",
        content:
          "When Daft Punk announced their breakup with that now-iconic desert explosion video, it felt like the end of an era. And it was. But what's become clear in the years since is that the era they defined never actually ended — it just became the foundation for everything that followed.\n\nEvery producer making French house, every DJ dropping a vocoder-drenched vocal, every artist who understands that electronic music and pop aren't enemies — they're all working in the space that Thomas and Guy-Manuel built.\n\nDiscovery turned 25 recently, and listening to it now, it sounds like it could have been released yesterday. That's not nostalgia talking — that's timelessness.\n\nWe may never see the helmets again. But every time you hear a four-on-the-floor beat with a French filter on it, they're right there.",
        imageUrl: "/images/djs/daft-punk.jpg",
        artistId: daftpunk.id,
      },
      {
        title: "Justice Is Back and They Brought the Entire Cross",
        subtitle: "The French duo's live show is still unmatched",
        content:
          "There's a reason Justice's live show is spoken about in hushed, reverent tones by people who've experienced it. Gaspard Augé and Xavier de Rosnay don't perform — they conduct a sonic assault that leaves venues structurally compromised.\n\nThe cross-shaped Marshall stack. The synchronized headbanging. The way Phantom transitions into Genesis and suddenly you're 19 again, discovering electronic music for the first time. It's church, if church had a better sound system.\n\nWe saw them at Terminal 5 last week. The floor was literally bouncing. Security looked concerned. The crowd didn't care.\n\nJustice live is not a concert. It's an event.",
        imageUrl: "/images/djs/justice.jpg",
        artistId: justice.id,
      },

      // General / guide articles
      {
        title: "The Best DJ Equipment to Buy in 2026",
        subtitle: "From beginner controllers to pro CDJs — our picks this year",
        content:
          "Whether you're just starting out or upgrading your booth, the DJ gear landscape in 2026 has never been better. Here's what we're recommending.\n\nFor beginners, the Pioneer DDJ-FLX4 remains the best entry point. It's affordable, works with both Rekordbox and Serato, and the build quality punches way above its price. Pair it with a decent pair of headphones — the Audio-Technica ATH-M50x is still the move — and you're ready to start mixing.\n\nFor intermediate DJs ready to go standalone, the Denon SC Live 4 is a game-changer. Built-in speakers, streaming integration, and no laptop required. It's the all-in-one setup we wish existed five years ago.\n\nFor the pros, nothing touches the Pioneer CDJ-3000 and DJM-V10 combo. It's the industry standard for a reason. The jog wheels feel incredible, the sound quality is pristine, and every club in the world will have them.\n\nOther gear we're loving: the Teenage Engineering TX-6 for experimental sets, the Allen & Heath Xone:96 for analog warmth, and the Novation Launchpad X if you're doing live production.\n\nDon't sleep on good monitors either. The KRK Rokit 5 G4s or Yamaha HS5s will transform your bedroom practice sessions.",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&h=500&fit=crop",
        artistId: demo.id,
      },
      {
        title: "How to Throw a House Party That Actually Goes Off",
        subtitle: "A guide from people who've done it (many times)",
        content:
          "Throwing a great house party is an art form. It's not about having the biggest space or the most expensive sound system — it's about creating the right conditions for something magical to happen. Here's what we've learned.\n\nThe sound system matters more than you think. You don't need club-level gear, but a single Bluetooth speaker isn't going to cut it. A pair of powered speakers (even cheap ones like Mackie Thumps) on stands will transform the vibe. Point them at the dance floor, not the ceiling.\n\nLighting is everything. Kill the overheads. String lights, colored bulbs, or even a cheap LED par can from Amazon will make any living room feel like a venue. Red and amber tones work best — nobody looks good under fluorescent lights.\n\nCurate the music. This is the most important one. Don't just throw on a Spotify playlist and hope for the best. Either DJ the party yourself or find someone who will. The energy arc matters: start mellow, build through the night, peak around 1-2AM, then wind it down.\n\nKitchen is always the social hub. Make sure there's space there for people to congregate. Cooler of drinks, some snacks, good conversation.\n\nInvite the right mix of people. You want connectors — people who know people, who'll introduce strangers to each other. A party is only as good as the people in it.\n\nSet an end time and stick to it. Neighbors are your long-term relationship. The party is one night. Respect both.",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
        artistId: demo.id,
      },
      {
        title: "10 NYC Clubs You Need to Visit Before You Die",
        subtitle: "The definitive guide to New York's best dancefloors",
        content:
          "New York City's club scene is the deepest in the world. Here are the spots we keep coming back to.\n\n1. Nowadays (Ridgewood) — The outdoor space in summer is unbeatable. Great sound, great bookings, great people. The bar for what a Brooklyn club should be.\n\n2. Basement (Chinatown) — Dark, sweaty, perfect. The Funktion-One system in there hits different at 3AM. If the lineup says techno, go.\n\n3. Good Room (Greenpoint) — Two rooms, consistently excellent bookings, and a front bar that's perfect for taking a breather. The Saturday night residencies are always worth checking.\n\n4. Knockdown Center (Bushwick) — For the big nights. Former factory, massive space, production value that rivals European festivals. When they go all out, there's nothing like it in the city.\n\n5. Public Records (Gowanus) — Audiophile-grade sound system and a vegan restaurant attached. The listening bar upstairs is just as good as the dancefloor downstairs. Culture.\n\n6. Bossa Nova Civic Club (Bushwick) — Tiny room, huge energy. The best small club in Brooklyn. If it's packed, that's because it's supposed to be.\n\n7. Avant Gardner (East Williamsburg) — The mega-venue done right. Multiple rooms, outdoor space, and bookings that range from mainstream to underground.\n\n8. Jupiter Disco (Bushwick) — Intimate, vinyl-focused, and always a vibe. Perfect for the nights when you want to actually hear the music.\n\n9. House of Yes (Bushwick) — Not just a club — an experience. Circus performers, themed nights, and a crowd that comes to participate, not spectate.\n\n10. Somewhere Nowhere (Chelsea) — Rooftop pool club with Manhattan skyline views. More lounge than rave, but on the right night with the right DJ, it transforms.",
        imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=500&fit=crop",
        artistId: demo.id,
      },
      {
        title: "The Best Ear Protection for Clubbing in 2026",
        subtitle: "Save your hearing without killing the vibe",
        content:
          "Let's be real: if you're going out regularly without ear protection, you're speedrunning tinnitus. The good news is that modern earplugs are invisible, comfortable, and actually preserve sound quality. Here's what we recommend.\n\nBest overall: Loop Experience Plus. These are the ones we see most often in DJ booths and on dancefloors. They reduce volume by about 18dB while keeping the music clear and balanced. The low-profile design means nobody will notice you're wearing them. Around $35.\n\nBest budget: Eargasm High Fidelity. Similar concept to Loop but about $10 cheaper. The sound reduction is slightly less even across frequencies, but for the price, they're excellent. Great starter pair.\n\nBest for DJs: ACS Custom Moulded. If you're DJing regularly or going out multiple times a week, invest in custom-moulded plugs. An audiologist takes an impression of your ear canal, and the result is a perfect fit with interchangeable filters for different dB reduction. They cost $150-200 but will last years.\n\nBest for festivals: Earos One. Designed specifically for live music with a unique open-ear design that feels like you're not wearing anything. 17dB reduction. Perfect for long days at outdoor festivals where comfort matters.\n\nPro tip: keep a pair on your keychain. You'll always have them when you need them. The Loop carrying case clips right on.\n\nYour future self will thank you. Tinnitus is permanent. Good earplugs are $30.",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
        artistId: demo.id,
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
