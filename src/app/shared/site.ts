/** Company facts and page content, kept in one place so copy edits don't touch templates. */
export const COMPANY = {
  name: 'Houston Electron Microscopy, Inc.',
  short: 'Houston Electron Microscopy',
  phone: '+1 281-888-4261',
  phoneHref: 'tel:+12818884261',
  street: '12919 Southwest Fwy, Suite 140',
  city: 'Stafford, TX 77477 USA',
  mapUrl: 'https://maps.google.com/?q=12919+Southwest+Fwy+Suite+140+Stafford+TX+77477',
  parentSite: 'https://www.houstonem.com',
};

export const LINKS = {
  semEds: `${COMPANY.parentSite}/services.html`,
  gallery: `${COMPANY.parentSite}/galleriesdirectory.html`,
  about: `${COMPANY.parentSite}/about.html`,
};

export const CAPABILITIES = [
  'Analysis of carbon based materials',
  'Analysis of particles as small as 10 microns',
  'Identification of polymers and plastics',
  'Identification of contaminants',
  'Analysis of polymers, coatings, fibers, rubber and resin',
  'Deformulation of composites',
];

export const BENEFITS = [
  { icon: 'target', title: 'Particles down to 10 µm', text: 'Identify contaminants and inclusions too small for bulk FT-IR.' },
  { icon: 'layers', title: 'Three measurement modes', text: 'Transmission, reflection and ATR, chosen for your sample.' },
  { icon: 'scope', title: 'Paired with SEM/EDS', text: 'Molecular and elemental answers from one laboratory.' },
  { icon: 'library', title: 'Library matching', text: 'Spectra matched against a large reference library.' },
];

export const STATS = [
  { value: '10 µm', label: 'Smallest analyzable area' },
  { value: '4000–400', label: 'Spectral range, cm⁻¹' },
  { value: '3', label: 'Modes: transmission, reflection, ATR' },
  { value: 'iN10', label: 'Thermo Scientific™ Nicolet™ infrared microscope' },
];

export const SERVICES = [
  {
    title: 'Micro FT-IR Analysis',
    text: 'Molecular identification of organic and some inorganic materials, from bulk samples down to 10 micron particles, with functional group maps and spectra.',
    items: ['Unknown material identification', 'Polymer and plastic identification', 'Functional group mapping', 'Liquids by ATR'],
    link: '/micro-ftir',
    external: false,
    cta: 'Explore micro FT-IR',
  },
  {
    title: 'SEM/EDS Analysis',
    text: 'High magnification imaging and elemental analysis with ColorSEM technology, ideal for pairing with micro FT-IR for a complete picture of a material.',
    items: ['High resolution SEM imaging', 'EDS elemental analysis', 'ColorSEM elemental maps', 'Particle and surface analysis'],
    link: LINKS.semEds,
    external: true,
    cta: 'View SEM/EDS services',
  },
  {
    title: 'Contaminant & Failure Analysis',
    text: 'Find out what an unknown residue, particle or defect is, and why a part failed, by combining molecular structure with elemental composition.',
    items: ['Contaminant identification', 'Failure analysis investigations', 'Deformulation of composites', 'Geological samples'],
    link: '/contact',
    external: false,
    cta: 'Discuss your project',
  },
];

export const STEPS = [
  { title: 'Tell us about your sample', text: 'Call or send a request describing the material and the question you need answered.' },
  { title: 'Send it to our lab', text: 'Ship or bring your sample to our laboratory in Stafford, Texas.' },
  { title: 'Get spectra and answers', text: 'We analyze it and return the spectra, maps and an interpretation of the results.' },
];

export const MATERIALS = [
  {
    key: 'polymers',
    label: 'Polymers & Plastics',
    text: 'Identify polymer type and additives in plastics such as PVC, and confirm a material matches its specification.',
    image: 'images/polymer-pvc.jpg',
    alt: 'Micro FT-IR analysis of a PVC polymer sample',
  },
  {
    key: 'contaminants',
    label: 'Contaminants',
    text: 'Pinpoint unknown organic contaminants as small as 10 microns on parts, in products or in process streams.',
    image: 'images/micro-ftir-analysis.jpg',
    alt: 'Micro FT-IR analysis identifying material composition',
  },
  {
    key: 'coatings',
    label: 'Coatings & Layers',
    text: 'Map functional groups across coatings, laminates and multilayer structures to see what each layer is made of.',
    image: 'images/functional-group-map.jpg',
    alt: 'Optical image of analyzed area with functional group map, intensity map and FT-IR spectra',
  },
  {
    key: 'liquids',
    label: 'Liquids & Oils',
    text: 'Analyze liquids, oils and residues with the ATR attachment to reveal their functional groups.',
    image: 'images/ftir-oil.jpg',
    alt: 'Liquid analyzed with the ATR attachment, micro FT-IR spectra and functional groups',
  },
  {
    key: 'fibers',
    label: 'Fibers, Rubber & Resin',
    text: 'Characterize fibers, rubbers, resins and composites, including deformulation of composite materials.',
    image: 'images/ftir-spectroscopy.png',
    alt: 'Micro FT-IR spectroscopy of organic materials',
  },
];

export const CASES = [
  {
    title: 'Mapping a half-inch sample',
    text: 'An optically magnified area of a small sample, with the functional group map and the spectra produced by micro FT-IR.',
    image: 'images/ftir-map-spectra.jpg',
  },
  {
    title: 'Identifying the layers of a reinforced hose',
    text: 'Both materials of a reinforced hose analyzed by micro FT-IR; the spectra show the functional groups that identify each one.',
    image: 'images/material-identification.jpg',
  },
  {
    title: 'An unknown contaminant: corn silk',
    text: 'A contaminant of unknown origin was identified as a silk hair from corn by matching its spectrum against our library.',
    image: '',
  },
];

export const FAQS = [
  {
    q: 'What is FT-IR?',
    a: 'Fourier Transform Infrared Spectroscopy measures how a sample absorbs or reflects infrared light across a range of frequencies (4000 to 400 cm⁻¹). Molecular bonds absorb energy at specific frequencies, producing a spectrum that acts as a molecular fingerprint. The Fourier Transform is the mathematical process that turns the raw data into that readable spectrum.',
  },
  {
    q: 'How small a sample can you analyze?',
    a: 'Micro FT-IR can analyze an area or particle as small as 10 microns, which makes it well suited to contaminants, inclusions and thin layers.',
  },
  {
    q: 'What materials can micro FT-IR identify?',
    a: 'Polymers, plastics, coatings, fibers, rubber, resin, powders, residues and liquids, along with some inorganic materials. It reveals chemical composition and functional groups.',
  },
  {
    q: 'Which measurement modes do you offer?',
    a: 'Transmission, reflection and ATR (attenuated total reflectance). Liquids are analyzed with the ATR attachment.',
  },
  {
    q: 'Why pair micro FT-IR with SEM/EDS?',
    a: 'Micro FT-IR gives the molecular structure of a material, while SEM/EDS gives high magnification images and elemental composition. Together they provide a more thorough analysis, especially for failure analysis and unknowns.',
  },
  {
    q: 'What instrument do you use?',
    a: 'A Thermo Scientific™ Nicolet™ iN™10 Infrared Microscope.',
  },
];
