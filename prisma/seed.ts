import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.artist.deleteMany();

  const hash = await bcrypt.hash("password123", 10);

  const alex = await prisma.artist.create({
    data: {
      username: "alex",
      password: hash,
      firstName: "Alex",
      lastName: "Tong",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      bio: "hello. i wuv my dog blue.",
      email: "tongsalex@gmail.com",
    },
  });

  const brendan = await prisma.artist.create({
    data: {
      username: "brendan",
      password: hash,
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    },
  });

  const elmo = await prisma.artist.create({
    data: {
      username: "elmo",
      password: hash,
      imageUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
  });

  const irwin = await prisma.artist.create({
    data: {
      username: "irwin",
      password: hash,
      imageUrl:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    },
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "December 30th, The Law Return to NYC",
        subtitle: "A night to remember at Brooklyn Steel",
        content:
          "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. The energy was electric as The Law took the stage for their triumphant return to New York City. The crowd, packed wall to wall, erupted as the first notes rang out through the venue.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. The setlist spanned their entire discography, with deep cuts that had longtime fans singing every word.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. The encore lasted three songs, closing with a cover that brought the house down.",
        imageUrl:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
        artistId: alex.id,
      },
      {
        title: "Is It The End of the Weeknd?",
        subtitle: "Exploring the evolution of Abel's sound",
        content:
          "Phasellus sit amet erat. With the release of his latest album, fans and critics alike are asking: has The Weeknd reached his creative peak? The dark, moody R&B that defined his early mixtapes has given way to something more polished, more commercial.\n\nPrion eu mi. But is that necessarily a bad thing? The numbers speak for themselves — streaming records shattered, arena tours sold out in minutes.\n\nIn tempor, turpis nec euismod scelerisque. Perhaps the question isn't whether it's the end, but rather the beginning of something entirely new.",
        imageUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=500&fit=crop",
        artistId: alex.id,
      },
      {
        title: "The Underground Scene Lives On",
        subtitle: "Brooklyn warehouses keep the spirit alive",
        content:
          "Beneath the polished surface of New York's mainstream club scene, something raw and beautiful continues to thrive. In converted warehouses across Bushwick and Williamsburg, DJs spin till dawn for crowds who come for the music, not the scene.\n\nThese spaces — unmarked doors, concrete floors, sound systems that shake your bones — are the lifeblood of the city's creative pulse. No bottle service, no velvet ropes. Just music.\n\nThe underground isn't dying. It's evolving.",
        imageUrl:
          "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=500&fit=crop",
        artistId: alex.id,
      },
      {
        title: "Ed Banger Records: A Decade Later",
        subtitle: "How the French label changed electronic music",
        content:
          "Praesent blandit. Ten years ago, Ed Banger Records was at the center of a revolution. Justice, Breakbot, Busy P — these names defined an era of French electronic music that crossed over into the mainstream.\n\nMorbi porttitor lorem id ligula. The label's visual identity, crafted by So Me, became as iconic as the music itself. Those bold, graphic designs defined an aesthetic that a generation of artists tried to emulate.\n\nFusce consequat. Today, the legacy lives on in every blog post, every playlist, every late-night DJ set that draws from that golden era.",
        imageUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
        artistId: alex.id,
      },
      {
        title: "Fashion Meets Music at NYFW",
        subtitle: "The intersection of two creative worlds",
        content:
          "Quisque porta volutpat erat. New York Fashion Week has always been about more than clothes. This season, the connection between fashion and music felt stronger than ever.\n\nFrom runway soundtracks curated by underground DJs to after-parties that doubled as album listening sessions, the lines between these creative worlds continued to blur.\n\nThe result? A week that felt less like an industry event and more like a cultural moment.",
        imageUrl:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
        artistId: alex.id,
      },
    ],
  });

  await prisma.event.createMany({
    data: [
      {
        title: "kollectiv w/ Cashmere Cat",
        description:
          "Come see your favorite kitty at Brooklyn's longtime powerhouse, Output.",
        imageUrl:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop",
        artistId: alex.id,
      },
      {
        title: "kollectiv presents: Warehouse Sessions",
        description:
          "An all-night affair in the heart of Bushwick. Expect the unexpected.",
        imageUrl:
          "https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200&h=800&fit=crop",
        artistId: alex.id,
      },
      {
        title: "kollectiv x TOKiMONSTA",
        description:
          "The queen of future bass takes over our stage for one unforgettable night.",
        imageUrl:
          "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&h=800&fit=crop",
        artistId: alex.id,
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
