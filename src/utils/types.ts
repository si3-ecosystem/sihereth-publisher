export interface LinkTypes {
  type: string;
  title: string;
  link: string;
}

export interface LandingTypes {
  title: string;
  headline: string;
  hashTags: string[];
  region: string;
  organizationAffiliations: string[];
  communityAffiliations: string[];
  superPowers: string[];
  image: string;
  fullName: string;
  pronoun: string;
}

export interface ValueTypes {
  experience: string;
  values: string;
}

export interface LiveTypes {
  image: string;
  url: string;
  walletUrl: string;
  details: {
    title: string;
    heading: string;
    url: string;
  }[];
}

export interface TimelineTypes {
  title: string;
  to: string;
  from: string;
}

export interface SocialChannelTypes {
  icon: string;
  url: string;
}

export interface AvailableTypes {
  avatar: string;
  availableFor: string[];
  ctaText: string;
  ctaUrl: string;
}

export interface ContentState {
  landing: LandingTypes;
  value: ValueTypes;
  live: LiveTypes;
  organizations: string[];
  timeline: TimelineTypes[];
  available: AvailableTypes;
  isNewWebpage: boolean;
  socialChannels: SocialChannelTypes[];
  slider: string[];
}
