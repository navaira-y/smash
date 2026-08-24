export interface Burger {
  id: string;
  tag: string;
  name: string;
  price: number;
  img: string;
  preview: string;
  desc: string;
  tags: string[];
}

export const BURGERS: Burger[] = [
  {
    id: 'smoke',
    tag: '#01 / SMOKED',
    name: 'THE SMOKE',
    price: 13,
    img: 'images/card-smoke.jpg',
    preview: 'images/burger-smoke.jpg',
    desc: 'Thick-cut applewood smoked bacon. Melted American. Toasted brioche bun. Smoke still rising when it hits the table.',
    tags: ['SMOKED BACON', 'TOASTED BRIOCHE', 'MELTED AMERICAN'],
  },
  {
    id: 'double',
    tag: '#02 / PREMIUM',
    name: 'THE DOUBLE',
    price: 16,
    img: 'images/card-double.jpg',
    preview: 'images/burger-double.jpg',
    desc: 'Two smashed patties, lacy crispy-edge crunch. Smash sauce, house pickles, on a bun that can barely hold it together.',
    tags: ['DOUBLE PATTY', 'MELTED AMERICAN', 'SMASH SAUCE'],
  },
  {
    id: 'smash',
    tag: '#03 / ICON',
    name: 'THE SMASH',
    price: 18,
    img: 'images/card-smash.jpg',
    preview: 'images/burger-smash.jpg',
    desc: 'Our icon. Double smash, double American, smashed onion. Built the way it should be. The full expression.',
    tags: ['DOUBLE SMASH', 'SMASHED ONION', 'LACEY CRUST'],
  },
];

export interface Patty {
  name: string;
  size: 'S' | 'M' | 'L';
  extra: number;
}

export const PATTIES: Patty[] = [
  { name: 'SINGLE SMASH', size: 'S', extra: 0 },
  { name: 'DOUBLE SMASH', size: 'M', extra: 6 },
  { name: 'TRIPLE SMASH', size: 'L', extra: 10 },
];

export interface Topping {
  name: string;
  extra: number;
  icon: string;
}

export const TOPPINGS: Topping[] = [
  { name: 'SMASHED ONION', extra: 2, icon: 'images/icon-onionring.png' },
  { name: 'SMOKED BACON', extra: 3, icon: 'images/icon-bacon.png' },
  { name: 'EXTRA AMERICAN', extra: 2, icon: 'images/icon-cheese.png' },
  { name: 'FRIED EGG', extra: 2, icon: 'images/icon-egg.png' },
  { name: 'HOUSE PICKLES', extra: 0, icon: 'images/icon-jalapeno.png' },
  { name: 'AVOCADO', extra: 2, icon: 'images/icon-avocado.png' },
];

export const STATS = [
  { value: 102, suffix: 'G', label: 'FRESH GROUND PATTY WEIGHT', desc: 'Hand-balled daily from an 80/20 chuck blend. Never frozen, never pre-formed.' },
  { value: 7, suffix: 'S', label: 'SECONDS SMASH CONTACT', desc: 'Patty hits steel and the crust locks in before the juices can escape.' },
  { value: 196, suffix: '°', label: 'CELSIUS SEAR TEMPERATURE', desc: 'Cast steel, ripping hot. First contact triggers the Maillard reaction within seconds.' },
  { value: 1, suffix: '', label: 'PATTY. ZERO COMPROMISE.', desc: 'No short cuts, no filler — every ingredient earns its place on a single perfect patty.' },
];

export const CRAFT_TILES = [
  { n: '01', tag: 'THE PRESS', name: 'SMASHED TO ORDER', img: 'images/craft.jpg', span: 'md:col-span-4' },
  { n: '02', tag: 'THE STACK', name: 'BUILT MID-AIR', img: 'images/hero-04.jpg', span: 'md:col-span-4' },
  { n: '03', tag: 'THE MELT', name: 'AMERICAN, FULLY GONE', img: 'images/hero-03.jpg', span: 'md:col-span-4' },
  { n: '04', tag: 'THE GRIND', name: '80/20, SAME-DAY', img: 'images/craft-beef.jpg', span: 'md:col-span-4' },
  { n: '05', tag: 'THE SEAR', name: '230°C CONTACT', img: 'images/sear.jpg', span: 'md:col-span-8' },
];

export const CUT_CARDS = [
  { n: '01', name: 'FRESH GROUND BEEF', img: 'images/craft-beef.jpg', desc: '80/20 chuck, ground in-house every morning. Never frozen, never pre-formed.' },
  { n: '02', name: 'THE PRESS', img: 'images/sear-bg.jpg', desc: 'Cast-iron press, one hard hit. The smash that builds the lacy crust.' },
  { n: '03', name: 'MELTED AMERICAN', img: 'images/card-cheese.jpg', desc: 'Two slices, fully melted. The glue that holds the whole stack together.' },
  { n: '04', name: 'THE CUT', img: 'images/cut.jpg', desc: 'Toasted brioche, cut face buttered and griddled until gold.' },
  { n: '05', name: 'OPEN FLAME', img: 'images/sear.jpg', desc: 'Finished over flame for the smoke no flat-top can fake.' },
  { n: '06', name: 'THE SMOKE', img: 'images/burger-smoke.jpg', desc: 'Served still smoking. Eat it before it settles.' },
];

export const STORY_CARDS = [
  { era: '1880s · HAMBURG', title: 'Where it began', img: 'images/story.jpg', desc: 'In a crowded Hamburg market, cooks flattened hand-chopped beef into thin discs, seared hard and served between bread. The blueprint never changed.' },
  { era: '1900s · ELLIS ISLAND', title: 'Across the Atlantic', img: 'images/booking.jpg', desc: 'German immigrants carried the habit across the ocean. On the docks of New York, the hamburger met the griddle — and the American bun.' },
  { era: '1920s · THE GRIDDLE', title: 'Born on an iron griddle', img: 'images/hero-02.jpg', desc: 'Somebody pressed down. The crust went lacy, the edges went crisp, and the smash burger was born on an iron griddle.' },
  { era: 'TODAY · EST. 2023', title: 'Still built by hand', img: 'images/hero-01.jpg', desc: 'No chutes, no automation, no shortcuts. Ball it, smash it, flip it once. Built by hand at 230 degrees.' },
];

export const NAV_LINKS = [
  { id: 'lineup', label: '01. Line-Up' },
  { id: 'build', label: '02. Build' },
  { id: 'overview', label: '03. Overview' },
  { id: 'sear', label: '04. Sear' },
  { id: 'craft', label: '05. Craft' },
  { id: 'cut', label: '06. The Cut' },
  { id: 'story', label: '07. Story' },
];
