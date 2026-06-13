import faceWashImage from '../assets/facewash.png';
import moisturizerImage from '../assets/moisturizer.png';

export interface Review {
  id: string;
  heading: string;
  name: string;
  date?: string;
  rating: number;
  review: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  benefits: string[];
  weight: string;
  image: string;
  description: string;
  detailedBenefits: string[];
  idealFor: string[];
  howToUse: string[];
  ingredients: string[];
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'neva-face-wash',
    name: 'Neva Face Wash',
    tagline: 'Deep cleansing formula',
    price: 399,
    originalPrice: 499,
    rating: 5.0,
    ratingCount: 12,
    benefits: [
      'Unclogs pores',
      'Fights acne',
      'Exfoliates gently',
      'Soothes inflammation',
      'Ideal for all skin types'
    ],
    weight: '30 ML',
    image: faceWashImage,
    description: 'Say goodbye to breakouts with our deep cleansing Facewash. Expertly formulated to target acne, blackheads, and clogged pores, this gentle yet powerful cleanser penetrates deep into the skin to remove excess oil, dirt, and dead skin cells. Enriched with Salicylic Acid (BHA), it helps reduce acne while promoting a clearer, healthier complexion. Designed for daily use on acne-prone skin, it leaves your face feeling fresh, clean, and balanced without over-drying.',
    detailedBenefits: [
      'Unclogs Pores: Salicylic acid penetrates deep to clear pores, reducing blackheads and whiteheads.',
      'Fights Acne: Helps prevent future breakouts by controlling excess oil and bacteria.',
      'Exfoliates Gently: Removes dead skin cells without irritation, promoting smoother, healthier skin.',
      'Soothes Inflammation: Reduces redness and swelling caused by acne.',
      'Ideal for all skin types: Balances oil production and purifies skin without over-drying.'
    ],
    idealFor: [
      'Oily and acne-prone skin that needs gentle yet effective cleansing.',
      'Individuals struggling with blackheads, whiteheads, and clogged pores.',
      'Skin prone to breakouts or excess oil production.',
      'Anyone looking for a daily facewash that exfoliates without over-drying.',
      'Those who want to calm redness and inflammation while promoting a clearer complexion.'
    ],
    howToUse: [
      'Apply a small amount of the deep cleansing Facewash to damp skin.',
      'Gently massage in circular motions to help remove dirt, oil, and impurities, then rinse thoroughly with water.',
      'For best results, use twice daily-morning and evening.',
      'Follow with a lightweight moisturizer and SPF during the day to protect and hydrate your skin.'
    ],
    ingredients: [
      'Salicylic Acid - Exfoliates and unclogs pores to reduce breakouts.',
      'Niacinamide - Control acne-causing bacteria.',
      'Green Tea Extract - Rich in antioxidants, reduces redness and irritation.',
      'Lactic Acid - Gently exfoliates and promotes smooth skin.'
    ],
    reviews: [
      {
        id: 'face-wash-review-1',
        heading: 'Visible Reduction In Pimples & Blackheads',
        name: 'Shibra Ansari',
        date: '13 May 2026',
        rating: 5,
        review: 'Maine kaafi face wash try kiye hain but isse jaisa result nahi mila. Chhote pimples aur blackheads visibly kam hue hain. Skin pehle se zyada smooth lagti hai.',
        verified: true
      },
      {
        id: 'face-wash-review-2',
        heading: 'Perfect Before Wedding Season',
        name: 'Vani Arora',
        date: '27 Dec 2025',
        rating: 5,
        review: "I started using this before my wedding skincare routine and I'm genuinely impressed. My skin looks clearer, less oily, and more healthy overall.",
        verified: true
      },
      {
        id: 'face-wash-review-3',
        heading: 'Lightweight & Non-Drying',
        name: 'Rahul S.',
        date: '7 Jan 2025',
        rating: 5,
        review: 'Very lightweight and non-drying face wash. I noticed fewer pimples and less redness within a few days. Good product for daily use.',
        verified: true
      },
      {
        id: 'face-wash-review-4',
        heading: 'Balanced & Fresh Skin',
        name: 'Sachin Bansal',
        date: '13 Nov 2025',
        rating: 5,
        review: 'Most acne face washes make my skin feel stretchy, but this one keeps it balanced. My face feels fresh and smoother after every wash.',
        verified: true
      },
      {
        id: 'face-wash-review-5',
        heading: 'Fresh Skin',
        name: 'Kirat K. Singh',
        date: '18 Jan 2026',
        rating: 5,
        review: 'Meri skin bahut oily thi aur baar-baar pimples ho jaate the. Is face wash ko use karne ke baad skin kaafi clean aur fresh lagti hai. Oil bhi control rehta hai.',
        verified: true
      },
      {
        id: 'face-wash-review-6',
        heading: 'Best Face Wash For Acne-Prone Skin',
        name: 'Aanchal Mehta',
        date: '17 Feb 2026',
        rating: 5,
        review: "This is honestly one of the best salicylic acid face washes I've tried. My small bumps and blackheads reduced a lot, and my skin texture looks smoother now.",
        verified: true
      },
      {
        id: 'face-wash-review-7',
        heading: 'Helped Calm My Active Acne',
        name: 'Kritika Jain',
        date: '22 Nov 2025',
        rating: 5,
        review: '2 weeks use karne ke baad meri active acne problem kaafi control hui hai. Skin clean lagti hai aur redness bhi pehle se kam hui hai.',
        verified: true
      },
      {
        id: 'face-wash-review-8',
        heading: 'Finally Found Something That Works',
        name: 'Harish M. Rao',
        date: '19 Oct 2025',
        rating: 5,
        review: 'Main honestly expectations ke bina use kar raha tha but results are surprising the. Pimples kam hue aur skin texture bhi improve hua.',
        verified: true
      },
      {
        id: 'face-wash-review-9',
        heading: 'Best For Humid Weather',
        name: 'Mansi Gupta',
        date: '19 Nov 2025',
        rating: 5,
        review: 'Bhopal ki garmi aur humidity mein meri skin bahut oily ho jaati hai, but ye face wash skin ko fresh aur non-greasy rakhta hai.',
        verified: true
      },
      {
        id: 'face-wash-review-10',
        heading: 'Breakout Control That Actually Works',
        name: 'Priya Nair',
        rating: 5,
        review: "I've been dealing with frequent breakouts for a long time, but after using this face wash, my skin feels much calmer. New pimples have reduced noticeably.",
        verified: true
      },
      {
        id: 'face-wash-review-11',
        heading: 'Great Oil Control',
        name: 'Kavya Mishra',
        date: '10 Oct 2025',
        rating: 5,
        review: 'My T-zone used to get very oily, especially in the afternoon. This face wash helps control oil without making my skin feel tight or dry.',
        verified: true
      },
      {
        id: 'face-wash-review-12',
        heading: 'Reduces Acne Marks Slowly',
        name: 'Adrija Bose',
        date: '2 Oct 2025',
        rating: 5,
        review: 'It not only helped with pimples but also reduced my acne marks gradually. My skin looks more balanced now.',
        verified: true
      }
    ]
  },
  {
    id: 'intense-night-repair-cream',
    name: 'Intense Night Repair Cream',
    tagline: 'Overnight dark spot & pigmentation care',
    price: 599,
    originalPrice: 799,
    rating: 5.0,
    ratingCount: 9,
    benefits: [
      'Reduces dark spots',
      'Fades tanning',
      'Restores skin glow',
      'Improves texture & tone'
    ],
    weight: '50 GM',
    image: moisturizerImage,
    description: 'Neva Intense night Cream works overnight to target dark spots, acne marks, and pigmentation while you sleep. It is formulated to help even out skin tone and enhance your natural glow for a brighter, healthier-looking complexion. Lightweight yet effective, it helps rejuvenate and restore your skin through the night. Suitable for both men and women, it fits perfectly into any night time skincare routine.',
    detailedBenefits: [
      'Reduces Dark Spots & Pigmentation: Helps fade stubborn spots and uneven patches.',
      'Fades Tanning: Brightens skin and restores clarity after sun exposure.',
      'Restores Skin Glow: Promotes a radiant, healthy-looking complexion overnight.',
      'Improves Texture & Tone: Smooths and evens skin while you sleep for softer, more balanced skin.'
    ],
    idealFor: [
      'Individuals with dark spots, acne marks, or pigmentation concerns.',
      'Those seeking an even skin tone, restored clarity, and a natural glow.',
      'Men and women looking for an effective overnight skincare solution.',
      'Anyone wanting to improve skin texture, tone, and overall radiance while they sleep.'
    ],
    howToUse: [
      'Cleanse your face thoroughly with Neva deep cleansing facewash before bedtime.',
      'Take a desired amount of the Night Miracle Cream and apply evenly over your face and neck in a thin layer.',
      'Leave it overnight.',
      'Do not massage or rub.',
      'Next morning wash your face with gentle facewash.',
      'Use daily at night for best results.'
    ],
    ingredients: [
      'Alpha Arbutin: Brightens skin and helps reduce pigmentation for a more even tone.',
      'Peptides: Support skin repair, boost elasticity, and promote firmness.',
      'Multivitamins: Nourish and revitalize dull, tired skin for a healthy glow.',
      'Advanced Skin Actives: Target discoloration and improve overall skin tone and clarity.'
    ],
    reviews: [
      {
        id: 'night-cream-review-1',
        heading: 'Visible Glow in 3 Days',
        name: 'Ridhi Verma',
        date: '16 Nov 2025',
        rating: 5,
        review: 'I started using this night cream daily and within 3 days my skin started looking more fresh and glowing. It feels soft in the morning and dark spots look lighter.',
        verified: true
      },
      {
        id: 'night-cream-review-2',
        heading: 'Perfect Night Skincare Routine',
        name: 'Arjun Pal',
        date: '02 Dec 2025',
        rating: 5,
        review: 'This cream has become part of my nightly routine. It absorbs quickly and I wake up with hydrated, healthy-looking skin every morning all thanks to my wife for recommending this cream.',
        verified: true
      },
      {
        id: 'night-cream-review-3',
        heading: 'Reduced Pigmentation Noticeably',
        name: 'Armin Kaur',
        date: '10 Feb 2026',
        rating: 5,
        review: 'My pigmentation has reduced gradually and my skin looks more balanced. I can see a natural brightness coming back.',
        verified: true
      },
      {
        id: 'night-cream-review-4',
        heading: 'Holy Grail For Me',
        name: 'Asmita Pathak',
        date: '20 Apr 2026',
        rating: 5,
        review: 'I can actually see my skin renewing over time. It looks healthier, brighter, and more even-toned than before.',
        verified: true
      },
      {
        id: 'night-cream-review-5',
        heading: 'Skin Feels Brighter Every Morning',
        name: 'Meera Nair',
        date: '08 Jun 2026',
        rating: 5,
        review: "I've been using this night cream for a few weeks now and my skin looks visibly brighter in the morning. It feels soft and well-rested.",
        verified: true
      },
      {
        id: 'night-cream-review-6',
        heading: 'Noticeable Glow Boost',
        name: 'Padmja Mohanty',
        date: '10 Jul 2026',
        rating: 5,
        review: 'My skin has started looking more radiant and healthy. Friends even noticed the glow on my face.',
        verified: true
      },
      {
        id: 'night-cream-review-7',
        heading: 'Fresh & Rested Skin Look',
        name: 'Ayra Zisan',
        date: '25 Jun 2026',
        rating: 5,
        review: 'Every morning my skin looks fresh and well-rested. It has improved my overall skin texture a lot.',
        verified: true
      },
      {
        id: 'night-cream-review-8',
        heading: 'Skin Feels Treated, Not Just Moisturized',
        name: 'Ankita Singh',
        date: '20 Jan 2026',
        rating: 5,
        review: 'Skin ko proper treatment jaisa feel deta hai. Quality clearly high-end skincare jaisi lagti hai.',
        verified: true
      },
      {
        id: 'night-cream-review-9',
        heading: 'Visible Difference in Product Quality',
        name: 'K.M Laxmi',
        date: '05 Nov 2025',
        rating: 5,
        review: 'Bohot saare night creams use kiye hain, but iski quality clearly better hai. Skin pe irritation bilkul nahi hota.',
        verified: true
      }
    ]
  }
];
