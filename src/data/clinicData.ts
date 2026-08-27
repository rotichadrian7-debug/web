import { 
  Treatment, 
  Product, 
  Doctor, 
  BeforeAfterCase, 
  Review,
  MembershipTier,
  ClinicLocation
} from '../types';

import clinicInteriorImg from '../assets/images/clinic_interior_1787835235714.jpg';
import cosmeticDoctorImg from '../assets/images/cosmetic_doctor_1787835249992.jpg';
import luxurySerumImg from '../assets/images/luxury_serum_1787835263114.jpg';
import luxuryCreamImg from '../assets/images/luxury_cream_1787835276809.jpg';
import facialTreatmentImg from '../assets/images/facial_treatment_1787835292044.jpg';

export const CLINIC_IMAGES = {
  interior: clinicInteriorImg,
  directorDoctor: cosmeticDoctorImg,
  serum: luxurySerumImg,
  cream: luxuryCreamImg,
  facial: facialTreatmentImg
};

export const CLINIC_INFO = {
  name: "ÉLAN Medical Aesthetics",
  tagline: "The Intersection of Precision Dermatology & Modern Elegance",
  subtitle: "Beverly Hills • Upper East Side Manhattan • Mayfair London",
  phone: "+1 (800) 845-ELAN",
  email: "concierge@elan-aesthetics.com",
  hours: "Mon – Sat: 8:30 AM – 7:30 PM | Sun: By Private Appointment",
  freeShippingThreshold: 150,
  promoCodes: {
    "WELCOME15": 0.15,
    "GLOW20": 0.20,
    "ELANVIP": 0.25
  },
  locations: [
    {
      id: "beverly-hills",
      name: "Beverly Hills Flagship Sanctuary",
      city: "Beverly Hills, CA",
      address: "9454 Wilshire Blvd, Penthouse Suite 400, Beverly Hills, CA 90212",
      phone: "+1 (310) 902-3844",
      hours: "Mon – Sat: 8:30 AM – 7:30 PM",
      features: "Private VIP Valet, Recovery Lounge, Heliport Access"
    },
    {
      id: "manhattan",
      name: "Manhattan Madison Avenue Suite",
      city: "Manhattan, NY",
      address: "780 Madison Avenue, 4th Floor, New York, NY 10065",
      phone: "+1 (212) 554-9120",
      hours: "Mon – Sat: 9:00 AM – 7:00 PM",
      features: "Private Concierge Suite, Laser Resurfacing Wing"
    },
    {
      id: "mayfair",
      name: "Mayfair London Private Clinic",
      city: "Mayfair, London",
      address: "24 Berkeley Square, Mayfair, London W1J 6EL",
      phone: "+44 20 7946 0912",
      hours: "Mon – Fri: 9:00 AM – 6:30 PM | Sat: 10:00 AM – 5:00 PM",
      features: "Regenerative Longevity Lab, Private Spa Suites"
    }
  ] as ClinicLocation[]
};

// MEMBERSHIP TIERS
export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "lumiere",
    name: "Lumière Privé",
    subtitle: "Essential Monthly Skin Health & Maintenance",
    pricePerMonth: 295,
    perks: [
      "1x Monthly Hydrafacial MD® Deluxe or Medical Peel",
      "15% Off All Skincare Boutique Formulations",
      "Complimentary B12 / Glutathione Radiance Booster",
      "Priority VIP Appointment Scheduling"
    ],
    isHighlighted: false
  },
  {
    id: "sculpt",
    name: "Sculpt & Glow Haute",
    subtitle: "Comprehensive Anti-Aging & Laser Remodeling",
    pricePerMonth: 595,
    perks: [
      "Monthly Credit: Morpheus8, Laser, or Botox Units",
      "20% Off All Medical Skincare Boutique Products",
      "Complimentary Quarterly 3D Multi-Spectral Skin Scan",
      "Dedicated Personal Aesthetic Concierge",
      "Invitations to Private Physician Masterclasses"
    ],
    isHighlighted: true
  },
  {
    id: "concierge",
    name: "Black Diamond Sovereign",
    subtitle: "Unlimited Physician Access & Bespoke Protocols",
    pricePerMonth: 1250,
    perks: [
      "Full Facial Sculpting & Dermal Filler Allocations",
      "Unlimited Platinum Laser & Exosome Infusions",
      "Monthly Full-Size Skincare Routine Delivered Free",
      "Private After-Hours Suite Booking & Home Visits",
      "Direct Physician WhatsApp Line with Dr. Elena Vance"
    ],
    isHighlighted: false
  }
];

// DOCTORS / SPECIALISTS
export const DOCTORS: Doctor[] = [
  {
    id: "dr-elena-vance",
    name: "Dr. Elena Vance, MD",
    title: "Medical Director & Board-Certified Cosmetic Dermatologist",
    credentials: "Harvard Medical School • Johns Hopkins Dermatology Fellowship",
    experienceYears: 16,
    specialties: ["Micro-Targeted Neuromodulators", "Facial Balancing & Biostimulators", "Laser Melasma Protocols"],
    specializations: ["Micro-Targeted Neuromodulators", "Facial Balancing & Biostimulators", "Laser Melasma Protocols"],
    bio: "Dr. Vance is an internationally recognized authority in natural aesthetic harmonization and regenerative dermatology, pioneering gentle non-surgical rejuvenation techniques.",
    education: "MD, Harvard Medical School; Dermatology Residency, Johns Hopkins Hospital",
    image: cosmeticDoctorImg,
    rating: 4.98,
    reviewsCount: 420,
    locations: ["Beverly Hills, CA", "Manhattan, NY"],
    clinicLocations: ["Beverly Hills, CA", "Manhattan, NY"],
    proceduresCount: "12,000+"
  },
  {
    id: "dr-marcus-sterling",
    name: "Dr. Marcus Sterling, MD, FACS",
    title: "Double Board-Certified Facial Plastic Surgeon",
    credentials: "Stanford University • Yale School of Medicine",
    experienceYears: 19,
    specialties: ["Deep Plane Facelift & Neck Contouring", "Structural Jawline & Chin Architecture", "Precision Blepharoplasty"],
    specializations: ["Deep Plane Facelift & Neck Contouring", "Structural Jawline & Chin Architecture", "Precision Blepharoplasty"],
    bio: "Dr. Sterling combines surgical mastery with artistic restraint, delivering results that preserve the patient's individual identity while restoring youthful vitality.",
    education: "MD, Yale; Facial Plastic & Reconstructive Surgery Fellowship, Stanford",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    rating: 4.99,
    reviewsCount: 385,
    locations: ["Beverly Hills, CA", "Mayfair, London"],
    clinicLocations: ["Beverly Hills, CA", "Mayfair, London"],
    proceduresCount: "8,500+"
  },
  {
    id: "sarah-lin-rn",
    name: "Sarah Lin, RN, BSN, CANS",
    title: "Master Aesthetic Nurse Specialist & Key Opinion Leader",
    credentials: "Certified Aesthetic Nurse Specialist • Allergan National Trainer",
    experienceYears: 11,
    specialties: ["Russian Lip Architecture", "Under-Eye Tear Trough Restoration", "Sculptra Full Body Biostimulation"],
    specializations: ["Russian Lip Architecture", "Under-Eye Tear Trough Restoration", "Sculptra Full Body Biostimulation"],
    bio: "Sarah is celebrated for her ultra-gentle micro-cannula technique that minimizes bruising and achieves undetectable, photogenic enhancement.",
    education: "BSN, UCLA School of Nursing; Advanced Injectable Fellowship, London",
    image: "https://images.unsplash.com/photo-1594824813576-2f0cb490a078?auto=format&fit=crop&w=600&q=80",
    rating: 4.97,
    reviewsCount: 512,
    locations: ["Beverly Hills, CA", "Manhattan, NY"],
    clinicLocations: ["Beverly Hills, CA", "Manhattan, NY"],
    proceduresCount: "14,000+"
  },
  {
    id: "chloe-dupres-le",
    name: "Chloe Duprès, LE, CLT",
    title: "Lead Medical Aesthetician & Laser Technologies Director",
    credentials: "CIDESCO International Diploma • Sciton & InMode Certified Laser Master",
    experienceYears: 14,
    specialties: ["Halo™ Hybrid Fractional Laser", "Morpheus8 RF Skin Tightening", "Cosmelan Depigmentation Protocol"],
    specializations: ["Halo™ Hybrid Fractional Laser", "Morpheus8 RF Skin Tightening", "Cosmelan Depigmentation Protocol"],
    bio: "Chloe specializes in advanced clinical energy devices and chemical peel formulations to treat hyperpigmentation, acne scarring, and skin texture.",
    education: "CIDESCO Paris; Advanced Medical Laser Sciences Institute",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    rating: 4.98,
    reviewsCount: 290,
    locations: ["Manhattan, NY", "Mayfair, London"],
    clinicLocations: ["Manhattan, NY", "Mayfair, London"],
    proceduresCount: "9,200+"
  }
];

// CLINICAL TREATMENTS
export const TREATMENTS: Treatment[] = [
  {
    id: "botox-dysport-neuromodulator",
    name: "Precision Neuromodulators (Botox® & Dysport®)",
    category: "injectables",
    subtitle: "Subtle, Expression-Preserving Wrinkle Smoothing",
    shortDesc: "Micro-dosed precision injections that smooth forehead lines, crow's feet, and frown lines without a frozen look.",
    fullDesc: "Our signature micro-droplet neuromodulator technique specifically targets hyperactive facial muscles while preserving natural emotion and subtle brow elevation. Administered with ultra-fine Japanese needles for absolute comfort.",
    priceStartingAt: 450,
    duration: "30 Minutes",
    downtime: "Zero Downtime",
    longevity: "3 - 5 Months",
    resultsDuration: "Full effect in 7–14 days",
    recommendedSessions: "Every 3–4 months for collagen preservation",
    targetConcerns: ["Forehead creases", "Glabella frown lines", "Crow's feet", "Masseter jaw slimming", "Gummy smile"],
    benefits: [
      "Preserves natural facial expression & dynamic animation",
      "Prevents static line etching into epidermal collagen",
      "Slims bulky masseters to create a tapered V-line face",
      "Painless micro-injection technique with zero bruising"
    ],
    image: cosmeticDoctorImg,
    isPopular: true,
    featured: true
  },
  {
    id: "bespoke-lip-architecture-filler",
    name: "Architectural Lip Rejuvenation & Dermal Fillers",
    category: "injectables",
    subtitle: "Golden Ratio Volume Restoration & Vermilion Definition",
    shortDesc: "Custom micro-cannula hyaluronic acid placement designed for soft, hydrated, natural pillowy fullness.",
    fullDesc: "We design lip volume according to your unique dental bite and profile proportions. Using flexible micro-cannulas, we contour the cupid's bow, support oral commissures, and add smooth hydration without shelfing or duck-lips.",
    priceStartingAt: 850,
    duration: "45 Minutes",
    downtime: "Mild swelling (24-48h)",
    longevity: "9 - 14 Months",
    resultsDuration: "Immediate with refinement over 2 weeks",
    recommendedSessions: "Annual maintenance refresh",
    targetConcerns: ["Thin lips", "Asymmetric volume", "Vertical lipstick lines", "Dehydrated lip texture", "Downturned mouth corners"],
    benefits: [
      "Golden ratio anatomical balance suited to your profile",
      "Smooth, supple hydration with zero lumpiness or migration",
      "Micro-cannula technique prevents bruising and vascular occlusion",
      "Reversible hyaluronic acid formulations (Restylane Kysse / Volbella)"
    ],
    image: facialTreatmentImg,
    isPopular: true,
    featured: true
  },
  {
    id: "morpheus8-rf-microneedling",
    name: "Morpheus8™ Subdermal RF Remodeling",
    category: "laser",
    subtitle: "Deep 4mm Subdermal Collagen Induction & Jawline Contouring",
    shortDesc: "FDA-cleared fractional radiofrequency that melts submental fat while dramatically contracting loose skin.",
    fullDesc: "Morpheus8 combines gold-plated microneedling with targeted radiofrequency energy up to 4mm deep into the subdermal adipose matrix. It restructures deep SMAS tissue, tightens jowls, sharpens jawlines, and resolves acne scars.",
    priceStartingAt: 1100,
    duration: "60 Minutes",
    downtime: "2-3 Days Mild Pinkness",
    longevity: "18 - 24 Months",
    resultsDuration: "Visible tightening at 3 weeks, peak results at 3 months",
    recommendedSessions: "Series of 2-3 sessions spaced 4-6 weeks apart",
    targetConcerns: ["Jowl sagging & laxity", "Submental double chin", "Acne scars & large pores", "Crepey neck & chest skin", "Nasolabial skin folds"],
    benefits: [
      "Subdermal adipose remodeling for crisp jawline contour",
      "Dramatically stimulates Type I and Type III dermal collagen",
      "Safe on all Fitzpatrick skin tones without risk of hyperpigmentation",
      "Medical topical numbing ensures comfortable procedure"
    ],
    image: clinicInteriorImg,
    isPopular: true,
    featured: true
  },
  {
    id: "halo-hybrid-fractional-laser",
    name: "Halo™ Hybrid Fractional Laser Resurfacing",
    category: "laser",
    subtitle: "Dual-Wavelength Glow & Deep Melasma Reversal",
    shortDesc: "The world's first hybrid laser combining ablative and non-ablative wavelengths to erase years of sun damage.",
    fullDesc: "Halo precisely targets epidermal pigment, stubborn sun spots, and melasma while simultaneously stimulating dermal neocollagenesis. Eliminates years of solar damage with a fraction of the recovery time of traditional CO2 lasers.",
    priceStartingAt: 1400,
    duration: "75 Minutes",
    downtime: "3-4 Days (Bronzing & light peeling)",
    longevity: "2 - 3 Years with proper sun defense",
    resultsDuration: "Luminous 'Halo Glow' appears at day 5–7",
    recommendedSessions: "1–2 annual sessions for glass skin clarity",
    targetConcerns: ["Stubborn melasma", "Solar lentigines & dark spots", "Coarse uneven texture", "Enlarged pores", "Fine perioral & periorbital lines"],
    benefits: [
      "Dual-wavelength technology repairs surface and deep dermis in one session",
      "Eliminates brown spots and hormonal hyperpigmentation",
      "Creates a pore-less, porcelain 'glass skin' luminosity",
      "Integrated integrated sapphire cooling for patient comfort"
    ],
    image: facialTreatmentImg,
    isPopular: false,
    featured: true
  },
  {
    id: "hydrafacial-md-deluxe",
    name: "Hydrafacial MD® Deluxe Platinum with Exosomes",
    category: "facials",
    subtitle: "Vortex-Fusion Deep Extraction, Peptides & Exosome Infusion",
    shortDesc: "The ultimate red-carpet clinical facial. Cleanses, painlessly extracts pores, and infuses human-derived regenerative exosomes.",
    fullDesc: "A multi-step medical treatment that uses patented vortex suction to dislodge impurities while bathing the skin in hyaluronic acid, copper peptides, and pure antioxidant serums, completed with lymphatic drainage and medical LED therapy.",
    priceStartingAt: 380,
    duration: "60 Minutes",
    downtime: "Zero Downtime (Instant Glow)",
    longevity: "4 - 6 Weeks",
    resultsDuration: "Immediate red-carpet radiance upon completion",
    recommendedSessions: "Monthly maintenance protocol",
    targetConcerns: ["Congested pores & blackheads", "Dull dry winter skin", "Surface dehydration", "Mild redness", "Event prep glow"],
    benefits: [
      "Painless vortex extraction removes sebum and dead keratinocytes",
      "Custom booster infusions (Exosomes, Vitamin C, Brightenol)",
      "Medical-grade LED blue/red light reduces inflammation and bacteria",
      "Instant high-shine hydration with zero redness"
    ],
    image: luxuryCreamImg,
    isPopular: true,
    featured: false
  },
  {
    id: "sculptra-biostimulator",
    name: "Sculptra® Aesthetic Poly-L-Lactic Biostimulator",
    category: "anti-aging",
    subtitle: "Internal Collagen Regeneration for Structural Support",
    shortDesc: "Injectable biostimulator that triggers your body's own natural collagen production to restore youthful facial architecture.",
    fullDesc: "Unlike traditional hyaluronic fillers that physically occupy space, Sculptra uses micro-particles of Poly-L-Lactic Acid (PLLA) to stimulate deep fibroblasts. Over 3–6 months, it produces a thick network of fresh Type I collagen for a soft, natural lift.",
    priceStartingAt: 950,
    duration: "45 Minutes",
    downtime: "Minimal (Resume daily routine immediately)",
    longevity: "Up to 24+ Months",
    resultsDuration: "Gradual subtle lifting beginning at 6 weeks",
    recommendedSessions: "2–3 sessions spaced 6 weeks apart",
    targetConcerns: ["Hollow temples", "Sunken cheek fat pads", "Deep smile folds", "Crepey skin laxity", "Décolletage wrinkles"],
    benefits: [
      "Builds genuine biological collagen rather than artificial volume",
      "100% natural, gradual results that never look puffy or overfilled",
      "Longest-lasting injectable aesthetic treatment on the market",
      "Restores youthful facial oval and firm skin density"
    ],
    image: luxurySerumImg,
    isPopular: false,
    featured: true
  }
];

// MEDICAL-GRADE SKINCARE BOUTIQUE PRODUCTS
export const PRODUCTS: Product[] = [
  {
    id: "elan-c-radiance-ferulic-serum",
    name: "C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir",
    subtitle: "Clinical Antioxidant & Melanogenesis Inhibitor",
    line: "Cellular Longevity Series",
    category: "serums",
    price: 148,
    originalPrice: 175,
    rating: 4.97,
    reviewsCount: 318,
    volume: "30ml / 1.0 fl oz",
    shortDesc: "Pharmaceutical-grade 15% chirally correct L-Ascorbic Acid stabilized with 1% Ferulic Acid and 1% Vitamin E for glass-skin clarity.",
    fullDesc: "Formulated at an optimal pH of 2.8 for maximum cellular absorption, this physician-strength antioxidant serum neutralizes free radicals, accelerates collagen synthesis by up to 8x, and fades stubborn sun spots and melasma.",
    activeIngredients: [
      { name: "Pure L-Ascorbic Acid", percentage: "15.0%", purpose: "Collagen synthesis & melanocyte inhibition" },
      { name: "Ferulic Acid", percentage: "1.0%", purpose: "Doubles photoprotective efficacy and stabilizes Vitamin C" },
      { name: "Alpha-Tocopherol (Vitamin E)", percentage: "1.0%", purpose: "Lipid barrier replenishment & free-radical quench" },
      { name: "Low-Molecular Hyaluronic Acid", percentage: "0.5%", purpose: "Deep dermal water binding" }
    ],
    keyBenefits: [
      "Fades sun damage, age spots, and post-inflammatory hyperpigmentation",
      "Protects against environmental pollution and UV-induced oxidation",
      "Improves skin firmness, brightness, and pore smoothness in 14 days",
      "Cold-filled in dark amber apothecary glass with nitrogen blanket"
    ],
    howToUse: "In the morning after cleansing, apply 4–5 drops to dry face, neck, and chest. Follow with Phyto-Peptide Lift Cream and Mineral Silk SPF 50+.",
    clinicalResults: [
      "96% observed visible lightening of dark spots in 28 days",
      "94% showed measurable improvement in dermal firmness",
      "98% reported brighter skin luminosity without irritation"
    ],
    skinTypes: ["All Skin Types", "Dry", "Combination", "Sensitive", "Normal"],
    targetConcerns: ["Melasma", "Hyperpigmentation", "Dullness", "Fine lines", "Loss of firmness"],
    inStock: true,
    stockCount: 42,
    badge: "Bestseller",
    image: luxurySerumImg,
    isBestseller: true,
    isNew: false
  },
  {
    id: "elan-peptide-cellular-sculpt-cream",
    name: "Phyto-Peptide Cellular Lift & Barrier Cream",
    subtitle: "Deep SMAS Biomimetic Collagen Rebuilder",
    line: "Regenerative Dermal Series",
    category: "creams",
    price: 165,
    originalPrice: 195,
    rating: 4.98,
    reviewsCount: 245,
    volume: "50ml / 1.7 fl oz",
    shortDesc: "A rich, velvet emulsion combining 6 signal peptides, biomimetic ceramides, and botanical squalane to visibly lift and firm.",
    fullDesc: "Developed to mimic the results of in-clinic collagen biostimulators, this luxurious cream delivers concentrated copper tripeptides and multi-molecular ceramides deep into the stratum corneum to reinforce lipid architecture and lift sagging contours.",
    activeIngredients: [
      { name: "Copper Tripeptide-1 (GHK-Cu)", percentage: "2.0%", purpose: "Stimulates collagen, elastin, and glycosaminoglycan synthesis" },
      { name: "Palmitoyl Tripeptide-38 (Matrixyl Synthe'6)", percentage: "3.0%", purpose: "Fills in wrinkle depth across forehead and crow's feet" },
      { name: "Ceramide NP/AP/EOP Complex", percentage: "1.5%", purpose: "Restores intercellular lipid barrier" },
      { name: "100% Sugarcane Squalane", percentage: "5.0%", purpose: "Weightless non-comedogenic hydration" }
    ],
    keyBenefits: [
      "Visibly firms jowls, jawline, and nasolabial contours",
      "Restores compromised lipid barriers post-laser and chemical peel",
      "Delivers intense 48-hour dewy hydration with a matte velvet finish",
      "Soothes sensitive, rosacea-prone skin with Centella Asiatica"
    ],
    howToUse: "Apply morning and evening to face, neck, and décolletage after serums. Massage upward along jawline for lifting lymphatic drainage.",
    clinicalResults: [
      "97% showed increased skin elasticity and dermal thickness in 14 days",
      "99% reported immediate barrier comfort and relief from tightness",
      "92% observed reduced fine line depth around smile lines"
    ],
    skinTypes: ["All Skin Types", "Dry", "Combination", "Sensitive", "Normal"],
    targetConcerns: ["Sagging skin", "Crepey texture", "Compromised barrier", "Dryness", "Expression lines"],
    inStock: true,
    stockCount: 38,
    badge: "Physician Favorite",
    image: luxuryCreamImg,
    isBestseller: true,
    isNew: false
  },
  {
    id: "elan-retinoid-bakuchiol-elixir",
    name: "Micro-Encapsulated 0.75% Retinoid + Bakuchiol",
    subtitle: "Zero-Flake Dermal Cellular Renewal Elixir",
    line: "Nocturnal Resurfacing Series",
    category: "retinoids",
    price: 135,
    rating: 4.95,
    reviewsCount: 189,
    volume: "30ml / 1.0 fl oz",
    shortDesc: "Time-released micro-encapsulated hydroxypinacolone retinoate paired with 1% botanical Bakuchiol and Niacinamide.",
    fullDesc: "Achieve the clinical power of prescription tretinoin without erythema, peeling, or barrier disruption. Our lipid-encapsulated retinoid penetrates slowly overnight to accelerate cellular turnover, clear stubborn pores, and erase deep wrinkles.",
    activeIngredients: [
      { name: "Hydroxypinacolone Retinoate (HPR)", percentage: "0.75%", purpose: "Direct retinoic acid receptor binder without conversion irritation" },
      { name: "Organic Bakuchiol", percentage: "1.0%", purpose: "Plant-derived retinol alternative that stabilizes Vitamin A" },
      { name: "Niacinamide (Vitamin B3)", percentage: "4.0%", purpose: "Pore refinement, sebum control, and barrier support" },
      { name: "Bisabolol & Allantoin", percentage: "0.8%", purpose: "Calms inflammation and prevents redness" }
    ],
    keyBenefits: [
      "Stimulates rapid cellular turnover without dryness or peeling",
      "Shrinks enlarged pores and dissolves blackheads",
      "Smooths stubborn dynamic lines across forehead and eye area",
      "Safe for sensitive skin that cannot tolerate standard retinol"
    ],
    howToUse: "Use at night only. Dispense 1 pump onto clean, dry skin. Start 2–3 nights per week and gradually build to nightly use. Always apply SPF 50+ in the morning.",
    clinicalResults: [
      "95% experienced zero redness or flaking during 6-week trial",
      "93% noticed visible pore reduction and smoother skin texture",
      "91% showed significant wrinkle softening around the eyes"
    ],
    skinTypes: ["All Skin Types", "Dry", "Combination", "Oily", "Sensitive"],
    targetConcerns: ["Acne scars", "Enlarged pores", "Fine lines", "Uneven texture", "Hyperpigmentation"],
    inStock: true,
    stockCount: 29,
    badge: "Gentle Formula",
    image: luxurySerumImg,
    isBestseller: false,
    isNew: true
  },
  {
    id: "elan-mineral-silk-spf-50",
    name: "Mineral Silk Tinted Glow Defense SPF 50+",
    subtitle: "100% Non-Nano Zinc Broad Spectrum Photoprotection",
    line: "Photoprotection Series",
    category: "spf",
    price: 68,
    rating: 4.99,
    reviewsCount: 410,
    volume: "50ml / 1.7 fl oz",
    shortDesc: "Ultra-sheer universal tint with 20.4% Non-Nano Zinc Oxide, antioxidant Ectoin, and iron oxides to block HEV Blue Light.",
    fullDesc: "The holy grail of medical sunscreens. Provides 100% physical mineral defense against UVA, UVB, infrared radiation, and screen blue light. The adaptive universal tint blurs imperfections and melts into all skin tones with a luminous, non-greasy glow.",
    activeIngredients: [
      { name: "Non-Nano Micronized Zinc Oxide", percentage: "20.4%", purpose: "Broad spectrum physical UV barrier" },
      { name: "Ectoin & Polygonum Extract", percentage: "1.0%", purpose: "Cellular defense against blue light & thermal heat aging" },
      { name: "Adaptive Iron Oxides", percentage: "0.5%", purpose: "Prevents melasma recurrence from visible light" },
      { name: "Hyaluronic Acid & Jojoba Esters", percentage: "1.0%", purpose: "Lightweight, breathable skin hydration" }
    ],
    keyBenefits: [
      "100% pure mineral physical filter — zero chemical sunscreens",
      "Universal adaptive tint leaves zero white cast or chalkiness",
      "Protects melasma patients against blue light and heat-induced pigmentation",
      "Doubles as a silky, dewy primer under makeup or worn alone"
    ],
    howToUse: "Apply generously 15 minutes before sun exposure as the final step in your morning routine. Reapply every 2 hours if in direct sunlight.",
    clinicalResults: [
      "100% agreed it left zero white cast on all skin tones tested",
      "98% reported it did not clog pores or cause breakouts",
      "96% loved the radiant, luminous 'no-makeup' skin finish"
    ],
    skinTypes: ["All Skin Types", "Sensitive", "Post-Procedure", "Combination", "Dry", "Oily"],
    targetConcerns: ["Sun protection", "Melasma prevention", "Blue light aging", "Redness", "Uneven tone"],
    inStock: true,
    stockCount: 75,
    badge: "Must-Have",
    image: luxuryCreamImg,
    isBestseller: true,
    isNew: false
  },
  {
    id: "elan-amino-cleansing-milk",
    name: "Pure Cleansing Botanical Amino Milk",
    subtitle: "pH 5.5 Hydrating Stratum Corneum Cleanser",
    line: "Purification Series",
    category: "cleansers",
    price: 58,
    rating: 4.92,
    reviewsCount: 160,
    volume: "150ml / 5.1 fl oz",
    shortDesc: "Sulfate-free milky cleanser infused with 11 amino acids, green tea polyphenols, and colloidal oat.",
    fullDesc: "Gently removes makeup, SPF, and microscopic pollutants while keeping your skin's natural acid mantle intact. Leaves skin feeling baby-soft, calm, and hydrated without squeakiness or tightness.",
    activeIngredients: [
      { name: "Amino Acid Surfactant Base (Apple/Oat)", percentage: "8.0%", purpose: "Gentle non-stripping cleansing" },
      { name: "Colloidal Oatmeal & Bisabolol", percentage: "1.5%", purpose: "Anti-inflammatory and soothing" },
      { name: "Green Tea Polyphenols (EGCG)", percentage: "1.0%", purpose: "Antioxidant environmental shield" }
    ],
    keyBenefits: [
      "Preserves stratum corneum moisture and natural microbiome",
      "Melt away stubborn waterproof makeup and mineral sunscreen",
      "Soothes erythema and tight, irritated post-laser skin",
      "Zero fragrance, essential oils, parabens, or sulfates"
    ],
    howToUse: "Massage 2 pumps onto dry or damp skin for 60 seconds. Rinse thoroughly with lukewarm water. Use morning and night.",
    skinTypes: ["All Skin Types", "Sensitive", "Dry", "Post-Procedure", "Combination"],
    targetConcerns: ["Dehydration", "Redness", "Sensitized skin", "Makeup removal"],
    inStock: true,
    stockCount: 50,
    badge: "Clean Formula",
    image: luxuryCreamImg,
    isBestseller: false,
    isNew: false
  },
  {
    id: "elan-post-procedure-recovery-balm",
    name: "Medical Post-Procedure Arnica & EGF Recovery Salve",
    subtitle: "Intensive Barrier Reconstruction & Bruise Relief",
    line: "Clinical Recovery Series",
    category: "post-procedure",
    price: 110,
    rating: 4.99,
    reviewsCount: 175,
    volume: "60ml / 2.0 fl oz",
    shortDesc: "Sterile medical balm infused with Arnica Montana, Epidermal Growth Factors (EGF), and Madecassoside to slash healing time by 50%.",
    fullDesc: "Prescribed after Morpheus8, Halo Laser, Dermal Fillers, and chemical peels. This oxygen-permeable occlusive balm forms a protective breathable shield that reduces bruising, calms burning sensations, and accelerates re-epithelialization.",
    activeIngredients: [
      { name: "Liposomal Arnica Montana + Bromelain", percentage: "3.0%", purpose: "Accelerates bruise and hematoma clearance" },
      { name: "sh-Oligopeptide-1 (Recombinant Human EGF)", percentage: "1.5%", purpose: "Dramatically accelerates cellular wound healing" },
      { name: "Centella Asiatica (Madecassoside 95%)", percentage: "2.0%", purpose: "Suppresses pro-inflammatory cytokines" },
      { name: "Medical Grade Petrolatum & Dimethicone", percentage: "45.0%", purpose: "Breathable semi-occlusive protective film" }
    ],
    keyBenefits: [
      "Reduces post-injection swelling and bruising time in half",
      "Instantly cools stinging and heat sensations after fractional lasers",
      "Forms a sterile protective shield that locks in moisture",
      "Non-comedogenic and hypoallergenic formulation"
    ],
    howToUse: "Apply a generous layer to treated skin immediately following procedure. Reapply 3–4 times daily until redness and peeling subside.",
    skinTypes: ["Post-Procedure", "Sensitive", "Dry", "All Skin Types"],
    targetConcerns: ["Post-laser healing", "Bruising from injectables", "Severe flaking", "Erythema"],
    inStock: true,
    stockCount: 30,
    badge: "Clinical Prescription",
    image: luxuryCreamImg,
    isBestseller: false,
    isNew: false
  },
  {
    id: "elan-glass-skin-protocol-bundle",
    name: "The Ultimate Glass Skin Radiance Protocol (4-Piece Set)",
    subtitle: "Complete Physician-Prescribed AM/PM Transformation Set",
    line: "Clinical Curated Sets",
    category: "bundles",
    price: 360,
    originalPrice: 439,
    rating: 5.0,
    reviewsCount: 142,
    volume: "4 Full Size Products",
    shortDesc: "Includes C-Radiance 15% Serum, Phyto-Peptide Lift Cream, Mineral Silk SPF 50+, and Pure Cleansing Milk. (Save $79)",
    fullDesc: "The complete at-home clinical regimen recommended by Dr. Elena Vance for achieving undeniable porcelain clarity, collagen density, and luminous barrier resilience. Includes our top 4 medical-grade hero formulations packaged in a bespoke gift box.",
    activeIngredients: [
      { name: "15% Vitamin C + Ferulic", percentage: "Active", purpose: "Morning brightness and antioxidant defense" },
      { name: "Multi-Peptide Matrixyl Complex", percentage: "Active", purpose: "Daily firming & structural collagen repair" },
      { name: "20.4% Mineral Zinc Glow SPF 50+", percentage: "Active", purpose: "Blue light & solar defense" },
      { name: "Botanical Amino Cleansing Milk", percentage: "Active", purpose: "pH 5.5 gentle barrier purification" }
    ],
    keyBenefits: [
      "Saves $79 compared to purchasing formulations individually",
      "Complete 24-hour AM/PM synergistic protocol",
      "Includes luxurious embossed ÉLAN keepsake vanity box",
      "Complimentary private 15-minute video consultation with our aesthetic team"
    ],
    howToUse: "Follow the included Dr. Vance 4-Step Clinical Protocol Guide for morning and evening application.",
    skinTypes: ["All Skin Types", "Dry", "Combination", "Sensitive", "Normal"],
    targetConcerns: ["Melasma", "Loss of firmness", "Dullness", "Fine lines", "Barrier repair"],
    inStock: true,
    stockCount: 15,
    badge: "Save $79 • Best Value",
    image: luxurySerumImg,
    isBestseller: true,
    isNew: false
  },
  {
    id: "elan-post-laser-recovery-box",
    name: "The Complete Post-Procedure Laser Recovery Box",
    subtitle: "3-Piece Rapid Healing & Barrier Restoration Kit",
    line: "Clinical Curated Sets",
    category: "bundles",
    price: 245,
    originalPrice: 283,
    rating: 4.99,
    reviewsCount: 98,
    volume: "3 Full Size Products",
    shortDesc: "Includes Medical Recovery Balm, Mineral Silk SPF 50+, and Pure Cleansing Milk for rapid laser and peel downtime recovery. (Save $38)",
    fullDesc: "Specifically curated by our laser specialists for post-Morpheus8, Halo, and chemical peel recovery. Accelerates skin re-epithelialization, prevents post-inflammatory hyperpigmentation, and ensures zero irritation.",
    activeIngredients: [
      { name: "EGF & Arnica Montana Salve", percentage: "Active", purpose: "Immediate soothing & bruise clearance" },
      { name: "Non-Nano Zinc SPF 50+", percentage: "Active", purpose: "Essential UV & heat defense" },
      { name: "Colloidal Oat Amino Cleanser", percentage: "Active", purpose: "Ultra-gentle cleansing" }
    ],
    keyBenefits: [
      "Saves $38 compared to individual items",
      "Cuts visible redness and downtime in half",
      "Guaranteed hypoallergenic and fragrance-free",
      "Crucial for protecting your clinical laser investment"
    ],
    howToUse: "Use exclusively for the first 7–10 days post-procedure as instructed by your clinician.",
    skinTypes: ["Post-Procedure", "Sensitive", "Dry", "All Skin Types"],
    targetConcerns: ["Post-laser healing", "Bruising", "Erythema", "Peeling"],
    inStock: true,
    stockCount: 22,
    badge: "Essential Kit",
    image: luxuryCreamImg,
    isBestseller: false,
    isNew: false
  }
];

// BEFORE & AFTER CLINICAL CASES
export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "case-1-facial-balancing",
    title: "Full Midface & Perioral Structural Balancing",
    treatmentName: "Hyaluronic Acid Dermal Filler & Neuromodulators",
    category: "Injectables",
    patientAge: "Age 38",
    timeline: "4 Weeks Post-Treatment",
    concerns: ["Midface volume deflation", "Deep nasolabial folds", "Under-eye hollowing"],
    doctorName: "Dr. Elena Vance, MD",
    beforeImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description: "Multi-point cannula placement of cross-linked hyaluronic acid in the lateral zygomatic arch, piriform aperture, and tear troughs. Softened fatigue lines while elevating the midface naturally.",
    treatmentsUsed: ["Restylane Lyft (2.0cc)", "Juvéderm Volbella (1.0cc)", "Botox Glabella (20 Units)"]
  },
  {
    id: "case-2-halo-laser-melasma",
    title: "Halo™ Hybrid Laser & Melasma Pigment Resurfacing",
    treatmentName: "Halo Hybrid Fractional Laser + Cosmelan Maintenance",
    category: "Laser & Pigment",
    patientAge: "Age 44",
    timeline: "6 Weeks Post-Treatment",
    concerns: ["Stubborn hormonal melasma", "Sun freckling", "Coarse cheek texture"],
    doctorName: "Dr. Elena Vance, MD & Chloe Duprès, LE",
    beforeImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    description: "Single session of Halo Dual-Wavelength Laser (1470nm non-ablative + 2940nm ablative) followed by daily application of Élan C-Radiance 15% Ferulic and Mineral Silk SPF 50+.",
    treatmentsUsed: ["Halo Hybrid Laser (Single Pass)", "Élan C-Radiance Ferulic Serum", "Élan Mineral Silk SPF 50+"]
  },
  {
    id: "case-3-morpheus8-jawline",
    title: "Morpheus8 Subdermal Remodeling & Jawline Lift",
    treatmentName: "Morpheus8 RF Microneedling (Series of 3)",
    category: "Skin Tightening",
    patientAge: "Age 51",
    timeline: "3 Months Post-Series",
    concerns: ["Submental laxity", "Early jowling", "Crepey neck texture"],
    doctorName: "Dr. Marcus Sterling, MD, FACS",
    beforeImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    description: "Three sessions of Morpheus8 at depths of 4.0mm and 2.5mm targeting subdermal adipose tissue and SMAS layer stimulation. Restored crisp jawline definition without surgery.",
    treatmentsUsed: ["Morpheus8 Full Face & Neck (3 Sessions)", "Exosome Regenerative Infusion", "Phyto-Peptide Cellular Lift Cream"]
  },
  {
    id: "case-4-lip-restoration",
    title: "Architectural Lip Proportions & Vermilion Definition",
    treatmentName: "Bespoke Restylane Kysse Lip Rejuvenation",
    category: "Injectables",
    patientAge: "Age 29",
    timeline: "2 Weeks Post-Procedure",
    concerns: ["Thin upper lip", "Asymmetrical smile", "Undefined cupid's bow"],
    doctorName: "Sarah Lin, RN, BSN",
    beforeImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    description: "0.8cc Restylane Kysse micro-aliquot threading along the vermilion border and medial tubercles to achieve lush, pillowy balance that moves naturally during speech and smiling.",
    treatmentsUsed: ["Restylane Kysse (0.8cc)", "Topical Post-Lip Arnica Recovery Glaze"]
  }
];

// REVIEWS & TESTIMONIALS
export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Genevieve Montgomery",
    author: "Genevieve Montgomery",
    rating: 5,
    isVerified: true,
    verified: true,
    treatment: "Halo Laser & Facial Balancing",
    type: "Treatment",
    subject: "Halo Laser & Facial Balancing with Dr. Vance",
    comment: "Dr. Vance is an artist. I was terrified of looking overdone or frozen, but my results are so subtle that friends simply asked if I had just returned from a 2-month wellness retreat in Switzerland. The clinic in Beverly Hills is pure heaven.",
    date: "2 weeks ago",
    location: "Beverly Hills, CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-2",
    name: "Charlotte DuMont",
    author: "Charlotte DuMont",
    rating: 5,
    isVerified: true,
    verified: true,
    treatment: "The Glass Skin Protocol Set",
    type: "Skincare Product",
    subject: "The Glass Skin Protocol Bundle",
    comment: "I have used La Mer and SkinCeuticals for years, but the Élan C-Radiance and Peptide Lift Cream completely transformed my stubborn melasma and texture within 20 days. Plus, the packaging and texture are sheer luxury.",
    date: "1 month ago",
    location: "Manhattan, NY",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-3",
    name: "Victoria Sterling-Hayes",
    author: "Victoria Sterling-Hayes",
    rating: 5,
    isVerified: true,
    verified: true,
    treatment: "Morpheus8 RF & Hydrafacial Platinum",
    type: "Treatment",
    subject: "Morpheus8 & Hydrafacial Platinum with Chloe",
    comment: "The precision and comfort level were unmatched. Chloe explained every step of the Morpheus8 treatment and provided the post-laser recovery box. My jawline looks tighter than it did in my 30s.",
    date: "3 weeks ago",
    location: "Mayfair, London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-4",
    name: "Isabella Rossi",
    author: "Isabella Rossi",
    rating: 5,
    isVerified: true,
    verified: true,
    treatment: "Mineral Silk Tinted SPF 50+",
    type: "Skincare Product",
    subject: "Mineral Silk Tinted SPF 50+",
    comment: "I threw away my foundation. This sunscreen gives such a healthy, radiant lit-from-within glow with 100% mineral zinc. It never pills under makeup and feels weightless.",
    date: "Just now",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  }
];

// COMPLIMENTARY DELUXE SAMPLES LIST (FOR CART)
export const FREE_SAMPLES_LIST = [
  { id: "sample-1", name: "C-Radiance 15% Ferulic Serum (5ml Deluxe Vial)", desc: "Antioxidant brightening shield" },
  { id: "sample-2", name: "Phyto-Peptide Lift Cream (7ml Luxury Jar)", desc: "Cellular firming moisturizer" },
  { id: "sample-3", name: "Micro-Retinoid 0.75% Night Elixir (5ml)", desc: "Gentle wrinkle resurfacing" },
  { id: "sample-4", name: "Mineral Silk Tinted SPF 50+ (10ml Tube)", desc: "100% Zinc tinted glow defense" },
  { id: "sample-5", name: "Post-Laser Arnica & EGF Recovery Salve (10ml)", desc: "Barrier repair soothing balm" }
];

// CLINIC FAQS
export const CLINIC_FAQS = [
  {
    q: "How do I know whether I need Injectables or Laser Resurfacing?",
    a: "During your comprehensive consultation, our board-certified physicians use high-resolution 3D multi-spectral skin imaging to analyze both structural volume and epidermal texture. As a rule of thumb: neuromodulators and dermal fillers address dynamic expression lines and structural volume loss, while lasers and RF microneedling restore surface texture, pore size, pigment, and skin laxity."
  },
  {
    q: "Are the skincare products on your boutique medical-grade?",
    a: "Yes. Every Élan formula is developed by board-certified dermatologists and plastic surgeons, manufactured in FDA-registered labs, and formulated with clinical concentrations of chirally correct active ingredients that penetrate deeper than over-the-counter cosmetics."
  },
  {
    q: "What is your shipping policy and return guarantee?",
    a: "We provide complimentary cold-chain express shipping on all orders over $150. All medical skincare products are backed by our 30-Day Radiant Guarantee: if a product does not suit your skin type, our clinical concierge will exchange it for a tailored formula or provide a full refund."
  },
  {
    q: "Can I book a virtual skin consultation if I don't live near Beverly Hills, NY, or London?",
    a: "Absolutely. We offer 30-minute HD Tele-Dermatology video consultations where an aesthetic specialist designs a personalized clinical home skincare prescription tailored to your skin goals and ships your regimen directly to your door."
  }
];
