export interface LinkTypes {
  type: string;
  title: string;
  link: string;
}

export interface VideoTypes {
  path: string;
  id: number | null;
}

export interface NavbarTypes {
  websiteName: string;
  links: LinkTypes[];
}

export interface LandingTypes {
  title: string;
  headline: string;
  brandPilars: string;
  hashTags: string[];
  region: string;
  organizationAffiliations: string[];
  communityAffiliations: string[];
  superPowers: string[];
  image: string;
  name: string;
  pronoun: string;
}

export interface ValueTypes {
  title: string;
  description: string;
  TVName: string;
  video: VideoTypes;
  links: LinkTypes[];
  button: {
    text: string;
    link: string;
  };
}

export interface VisionTypes {
  title: string;
  description: string;
}

export interface CVTypes {
  present: {
    title: string;
    highlights: string[];
  };
  past: {
    title: string;
    highlights: {
      year: string;
      text: string;
    }[];
  };
  future: {
    title: string;
    text: string;
  };
}

export interface AvailableTypes {
  title: string;
  marque: string[];
  socialChannels: {
    text: string;
    url: string;
  }[];
}

export interface ContentState {
  navbar: NavbarTypes;
  landing: LandingTypes;
  value: ValueTypes;
  vision: VisionTypes;
  CV: CVTypes;
  available: AvailableTypes;
  isNewWebpage: boolean;
}
