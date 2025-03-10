let navbar = {
  websiteName: "SI HER",
  links: ["VALUE", "LIVE", "TIMELINE", "CONNECT"]
};
let landing = {
  title: " KARA",
  subTitle: "& I create equitable platforms for the new economy.",
  hashTagTitle: "WHAT I STAND FOR:",
  hashTags: ["COLLABORATION", "EQUITY", "IMPACT", "DECENTRALIZATION", "EDUCATION"],
  categories: {
    region: "Middle East",
    superPower: ["Web3 Founder"],
    organizationAffiliations: ["Web3 Founder"],
    communityAffiliations: ["Si Her"]
  },
  userimg: {
    path: "https://kara.siher.eth.limo/images/karafuture.png",
    id: null
  },
  name: "Kara Howard",
  pronoun: "SHE/HER"
};
let value = {
  title: "MY VALUE",
  description:
    "My career began as an Equity Research analyst on Wall St. I started the MBA program at NYU in the Fall of 2008, right as the market crashed, with Occupy Wall St. protests happening outside our campus doors. As often happens, times of crises create opportunity and I shifted my career focus from finance to marketing & entrepreneurship. I began my entrepreneurial journey with ups and downs and great learning - most importantly, discovering my passion and purpose in supporting women in elevating their voices and professional and personal success. I have led and participated in women-related communities in investing, startups, technology, AI, futurism, product and data science. I have placed over 350 women in speaking opportunities and experience shared value and fulfillment when I see women stepping into their full potential. I bring the value of ten years in finance, and ten years of community architecting & growth marketing, to Si Her as it`s platform creator. And my exploration in Equity Research continues.",
  TVName: "SI HER TV",
  video: {
    path: "https://lvpr.tv?v=33e86xt51h1f718x",
    id: null
  },
  links: [
    {
      type: "WEBSITE",
      title: "WE ARE SI3",
      link: "https://www.si-her.live/"
    },
    {
      type: "YOUTUBE",
      title: "UNLOCKING NFT'S FOR META IMPACT",
      link: "https://www.youtube.com/watch?v=y-Bz60q298c"
    },
    {
      type: "PODCAST",
      title: "DIVERSITY IN THE NEW ECONOMY",
      link: "https://podcasters.spotify.com/pod/show/b-r-i/episodes/Diversity-in-the-new-economy-e26pn30/a-aa40rlt"
    }
  ],
  button: {
    text: "TIP IN CRYPTO",
    link: "https://www.si-her.live/"
  }
};
let vision = {
  title: "MY VISION",
  description:
    "I envision a near-term future that is operating with values based on inclusion, equity, and decentralized decision-making. I am hopeful to support in creating platforms that streamline cooperation and accelerate our human potential."
};
let CV = {
  present: {
    title: "Present",
    highlights: ["WeAreSi3", "Unlocking NFT´s for Meta Impact", "Diversity in the New Economy"]
  },
  past: {
    title: "Past",
    highlights: [
      {
        year: "2002-10",
        text: "EQUITY RESEARCH ASSOCIATE / FINANCIAL ANALYST"
      },
      {
        year: "2004",
        text: "BSC FROM UW-MADISON - PERSONAL FINANCE"
      },
      {
        year: "2012",
        text: "MBA FROM NYU STERN - MARKETING & ENTREPRENEURSHIP"
      },
      {
        year: "2015-19",
        text: "VP OF GROWTH & PARTNERSHIPS AT CLEVERTAP"
      },
      {
        year: "2017-21",
        text: "MANAGED THE FEMININE INTELLIGENCE"
      },
      {
        year: "2022",
        text: "PERSONAL DEVELOPMENT RETREAT"
      },
      {
        year: "2023",
        text: "INITIATED SI3 & SI HER TALENT COLLECTIVE"
      }
    ]
  },
  future: {
    title: "Future",
    text: "I envision a near-term future that is operating with values based on inclusion, equity, and decentralized decision-making. I am hopeful to support in creating platforms that streamline cooperation and accelerate our human potential."
  }
};

let available = {
  title: "I’M AVAILABLE FOR",
  marque: [
    {
      heading: "speaking"
    },
    {
      heading: "advising"
    },
    {
      heading: "collabs"
    }
  ],
  socialChannels: [
    {
      text: "linkedin",
      url: "www.linkedin.com"
    },
    {
      text: "instagram",
      url: "www.instagram.com"
    },
    {
      text: "twitter",
      url: "www.twitter.com"
    },
    {
      text: "email",
      url: "kara@si3.space"
    }
  ]
};

export const countries = [
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Central America", label: "Central America" },
  { value: "Caribbean", label: "Caribbean" },
  { value: "Central & South Asia", label: "Central & South Asia" },
  { value: "Northeastern Asia", label: "Northeastern Asia" },
  { value: "Southeastern Asia", label: "Southeastern Asia" },
  { value: "Australia and Oceania", label: "Australia and Oceania" },
  { value: "Northern Europe", label: "Northern Europe" },
  { value: "Southern Europe", label: "Southern Europe" },
  { value: "Eastern Europe", label: "Eastern Europe" },
  { value: "Western Europe", label: "Western Europe" },
  { value: "Middle East", label: "Middle East" },
  { value: "Northern Africa", label: "Northern Africa" },
  { value: "Southern Africa", label: "Southern Africa" }
];

export const languagesByRegion = {
  Africa: ["Afrikaans", "Amharic", "Arabic", "Hausa", "Igbo", "Somali", "Swahili", "Xhosa", "Yoruba", "Zulu"],
  Asia: [
    "Arabic",
    "Bengali",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Hindi",
    "Japanese",
    "Korean",
    "Malay",
    "Punjabi",
    "Tamil",
    "Telugu",
    "Thai",
    "Urdu",
    "Vietnamese"
  ],
  Europe: [
    "Albanian",
    "Basque",
    "Bulgarian",
    "Catalan",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "Galician",
    "German",
    "Greek",
    "Hungarian",
    "Icelandic",
    "Italian",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swedish",
    "Ukrainian",
    "Welsh"
  ],
  MiddleEast: ["Arabic", "Hebrew", "Kurdish (Kurmanji)", "Kurdish (Sorani)", "Persian", "Pashto"],
  Americas: ["English", "French", "Haitian Creole", "Portuguese", "Quechua", "Spanish"],
  Oceania: ["Hawaiian", "Maori", "Samoan"]
};

export default { navbar, landing, value, vision, CV, available };
