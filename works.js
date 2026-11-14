/* =====================================================
   THE PAINTINGS
   One entry per work. The homepage and the gallery both
   read this list, so a change here shows up everywhere.

   To add a painting:
     1. Put the full-size photo in images/ and a smaller
        copy (about 1100px on the long side) in images/sm/.
     2. Copy an entry below and fill it in.

   Fields
     id        used in links: gallery.html#id (lowercase, dashes)
     img       full-size photo, used for the close-up
     thumb     small copy, used on the gallery wall
     w, h      pixel size of the full-size photo
     crop      optional zoom to hide easel or desk edges (1 = none)
     origin    optional point the crop zooms towards ("x% y%")
     focus     the most striking detail ("x% y%"). Gallery thumbnails open
               zoomed in on it and ease back to the whole painting.
     zoom      optional, how far in the thumbnail starts (default 1.8)
     photos    optional alternate photos, each with src, w, h, and bilingual alt
     room      wall colour while it is open: sea, reef, violet, dusk, ink, ember
     status    "available" or "sold"
     price     optional: { tier: "small" } for commission pricing, or
               { label: { en, pl } } for a fixed product price.
     size      optional, width × height, e.g. "70 × 50 cm"
     year      optional, e.g. 2025
     commission  optional, true if it was painted to order
     en / pl   title, medium, desc (one or two sentences), alt (what the image shows)
   ===================================================== */
window.PRICE_FROM = { small: 200, medium: 500, large: 800 };
window.WORKS = [
  {
    id: "nebula-turtles",
    img: "images/01-nebula-turtles.jpg",
    thumb: "images/sm/01-nebula-turtles.jpg",
    w: 2000, h: 1400, focus: "19% 37%", zoom: 2,
    room: "sea",
    status: "sold",
    price: { tier: "large" }, size: "100 × 70 cm", year: "",
    en: {
      title: "Nebula Turtles",
      medium: "Acrylic on canvas",
      desc: "Six sea turtles, one nebula. Deep water and deep space turn out to be the same blue.",
      alt: "Six sea turtles swimming through a blue nebula"
    },
    pl: {
      title: "Żółwie w mgławicy",
      medium: "Akryl na płótnie",
      desc: "Sześć żółwi morskich i jedna mgławica. Głębia oceanu i głębia kosmosu mają ten sam błękit.",
      alt: "Sześć żółwi morskich płynących przez niebieską mgławicę"
    }
  },
  {
    id: "seahorse",
    img: "images/04-seahorse.jpg",
    thumb: "images/sm/04-seahorse.jpg",
    w: 1500, h: 2000, focus: "47% 36%", zoom: 2,
    room: "reef",
    status: "available",
    price: { tier: "small" }, size: "30 × 40 cm", year: "",
    en: {
      title: "Seahorse",
      medium: "Acrylic on canvas",
      desc: "A lone seahorse in the shallows, with sunlight breaking through the surface above.",
      alt: "An orange seahorse in blue water with seaweed and coral, sunlight coming through the surface"
    },
    pl: {
      title: "Konik morski",
      medium: "Akryl na płótnie",
      desc: "Samotny konik morski na płyciźnie, a nad nim słońce przebijające się przez taflę wody.",
      alt: "Pomarańczowy konik morski w błękitnej wodzie wśród wodorostów i koralowca, z góry wpada światło słońca"
    }
  },
  {
    id: "sunset-mountains",
    img: "images/03-sunset-mountains.jpg",
    thumb: "images/sm/03-sunset-mountains.jpg",
    w: 2000, h: 1400, focus: "31% 30%", zoom: 1.9,
    room: "dusk",
    status: "sold",
    price: { tier: "large" }, size: "100 × 70 cm", year: "",
    en: {
      title: "Sunset Mountains",
      medium: "Acrylic on canvas, palette knife",
      desc: "Ridge after ridge of blue under an orange sky, laid on thick with a palette knife.",
      alt: "Layered blue mountain ridges under an orange and pink sunset"
    },
    pl: {
      title: "Góry o zachodzie słońca",
      medium: "Akryl na płótnie, szpachelka",
      desc: "Pasmo za pasmem błękitnych gór pod pomarańczowym niebem, kładzione grubo szpachelką.",
      alt: "Warstwy błękitnych gór pod pomarańczowo-różowym zachodem słońca"
    }
  },
  {
    id: "color-me-surprised",
    img: "images/05-color-me-surprised.jpg",
    thumb: "images/sm/05-color-me-surprised.jpg",
    w: 1520, h: 1840, focus: "60% 66%", zoom: 1.7,
    room: "ember",
    status: "available",
    price: { tier: "small" }, size: "38 × 46 cm", year: "",
    en: {
      title: "Color Me Surprised",
      medium: "Acrylic on canvas",
      desc: "A figure in pinks and blues against dripping yellow. Natural skin tones were never the plan.",
      alt: "Expressive female nude torso in pink, blue and violet on a yellow and teal background"
    },
    pl: {
      title: "Color Me Surprised",
      medium: "Akryl na płótnie",
      desc: "Sylwetka w różach i błękitach na tle spływającej żółci. Naturalne kolory skóry nie były w planie.",
      alt: "Ekspresyjny akt kobiecy w różach, błękitach i fioletach na żółto-turkusowym tle"
    }
  },
  {
    id: "whale",
    img: "images/06-whale.jpg",
    thumb: "images/sm/06-whale.jpg",
    w: 1600, h: 1984, focus: "42% 47%", zoom: 1.8,
    room: "violet",
    status: "available",
    price: { tier: "small" }, size: "40 × 50 cm", year: "",
    en: {
      title: "Whale",
      medium: "Acrylic on canvas",
      desc: "A humpback rising through water that can't decide between sea and aurora.",
      alt: "A humpback whale swimming upward through swirling teal, violet and red water"
    },
    pl: {
      title: "Wieloryb",
      medium: "Akryl na płótnie",
      desc: "Humbak wynurza się z wody, która nie może się zdecydować, czy jest morzem, czy zorzą.",
      alt: "Humbak płynący ku górze przez wirującą turkusową, fioletową i czerwoną wodę"
    }
  },
  {
    id: "galaxy-bookmarks",
    img: "images/07-galaxy-bookmarks.jpg",
    thumb: "images/sm/07-galaxy-bookmarks.jpg",
    w: 1760, h: 2200, focus: "50% 50%", zoom: 1.5,
    photos: [
      {
        src: "images/07-galaxy-bookmarks.jpg", w: 1760, h: 2200,
        alt: {
          en: "Three galaxy bookmarks laid side by side on patterned fabric",
          pl: "Trzy galaktyczne zakładki ułożone obok siebie na wzorzystym materiale"
        }
      },
      {
        src: "images/09-galaxy-bookmarks-detail.jpg", w: 1760, h: 2200,
        alt: {
          en: "Three galaxy bookmarks held up in front of a window",
          pl: "Trzy galaktyczne zakładki trzymane na tle okna"
        }
      }
    ],
    room: "violet",
    status: "available",
    price: {
      label: {
        en: "PLN 80 / set of 3 · PLN 30 each",
        pl: "80 zł / zestaw 3 szt. · 30 zł / szt."
      }
    }, size: "55 × 200 mm", year: "",
    en: {
      title: "Galaxy Bookmarks",
      medium: "Watercolor on paper, sold individually or in sets of three",
      desc: "Watercolor bookmarks painted with galaxies and starlight.",
      alt: "Three bookmarks painted with watercolor galaxies"
    },
    pl: {
      title: "Galaktyczne zakładki",
      medium: "Akwarela na papierze, pojedynczo lub w zestawie trzech",
      desc: "Akwarelowe zakładki z galaktykami i gwiezdnym pyłem.",
      alt: "Trzy zakładki z galaktykami malowanymi akwarelą"
    }
  },
  {
    id: "flower-meadow",
    img: "images/08-flower-meadow.jpg",
    thumb: "images/sm/08-flower-meadow.jpg",
    w: 1650, h: 2200, focus: "50% 50%", zoom: 1.5,
    photos: [
      {
        src: "images/08-flower-meadow.jpg", w: 1650, h: 2200,
        alt: {
          en: "Three watercolor bookmarks with small flowers on a patterned fabric",
          pl: "Trzy akwarelowe zakładki w drobne kwiaty na wzorzystym materiale"
        }
      },
      {
        src: "images/10-flower-meadow-detail.jpg", w: 1650, h: 2200,
        alt: {
          en: "Three floral watercolor bookmarks held in a hand",
          pl: "Trzy kwiatowe zakładki akwarelowe trzymane w dłoni"
        }
      }
    ],
    room: "ember",
    status: "available",
    price: {
      label: {
        en: "PLN 80 / set of 3 · PLN 30 each",
        pl: "80 zł / zestaw 3 szt. · 30 zł / szt."
      }
    }, size: "55 × 200 mm", year: "",
    en: {
      title: "Flower Meadow",
      medium: "Watercolor on paper, sold individually or in sets of three",
      desc: "Light, colorful bookmarks with delicate meadow flowers.",
      alt: "Three watercolor bookmarks decorated with delicate meadow flowers"
    },
    pl: {
      title: "Kwietna łąka",
      medium: "Akwarela na papierze, pojedynczo lub w zestawie trzech",
      desc: "Jasne, kolorowe zakładki z delikatnymi kwiatami łąkowymi.",
      alt: "Trzy akwarelowe zakładki ozdobione delikatnymi kwiatami łąkowymi"
    }
  }
];

/* Shows a short "more paintings are on the way" note at the end of the gallery wall.
   Set to false once the gallery is complete. */
window.MORE_COMING = true;
