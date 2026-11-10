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
     room      wall colour while it is open: sea, violet, dusk, ink, ember
     status    "available" or "sold"
     price     optional, e.g. "450 zł". Leave "" to show "Price on request".
     size      optional, e.g. "70 × 50 cm"
     year      optional, e.g. 2025
     commission  optional, true if it was painted to order
     en / pl   title, medium, desc (one or two sentences), alt (what the image shows)
   ===================================================== */
window.WORKS = [
  {
    id: "nebula-turtles",
    img: "images/01-nebula-turtles.jpg",
    thumb: "images/sm/01-nebula-turtles.jpg",
    w: 2100, h: 1460, crop: 1.07, origin: "55% 30%",
    room: "sea",
    status: "sold",
    price: "", size: "", year: "",
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
    id: "galaxy-bookmarks",
    img: "images/02-watercolor-galaxies.jpg",
    thumb: "images/sm/02-watercolor-galaxies.jpg",
    w: 1275, h: 1400, crop: 1.12, origin: "55% 30%",
    room: "violet",
    status: "available",
    price: "", size: "", year: "",
    en: {
      title: "Galaxy Bookmarks",
      medium: "Watercolor on paper, set of three",
      desc: "Three strips of night sky, small enough to live in a book.",
      alt: "Three bookmarks painted with watercolor galaxies"
    },
    pl: {
      title: "Galaktyczne zakładki",
      medium: "Akwarela na papierze, zestaw trzech",
      desc: "Trzy paski nocnego nieba, w sam raz do książki.",
      alt: "Trzy zakładki z galaktykami malowanymi akwarelą"
    }
  },
  {
    id: "sunset-mountains",
    img: "images/03-sunset-mountains.jpg",
    thumb: "images/sm/03-sunset-mountains.jpg",
    w: 1980, h: 1370, crop: 1.09, origin: "60% 25%",
    room: "dusk",
    status: "sold",
    price: "", size: "", year: "",
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
  }
];

/* Shows a short "more paintings are on the way" note at the end of the gallery wall.
   Set to false once the gallery is complete. */
window.MORE_COMING = true;
