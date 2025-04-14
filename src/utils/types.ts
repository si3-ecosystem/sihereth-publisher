export interface LandingTypes {
  title: string;
  headline: string;
  hashTags: string[];
  region: string;
  organizationAffiliations: string[];
  communityAffiliations: string[];
  superPowers: string[];
  image:
    | string
    | {
        file: File;
        fieldName: string;
      };
  name: string;
  fullName: string;
  pronoun: string;
}

export interface ValueTypes {
  experience: string;
  values: string;
}

export interface LiveTypes {
  image: string | { file: File; fieldName: string };
  video: string | { file: File; fieldName: string };
  details: {
    title: string;
    heading: string;
    body: string;
  }[];
}

export interface TimelineTypes {
  title: string;
  to: string;
  from: string;
}

interface SocialChannelTypes {
  text: string;
  url: string;
}

interface AvailableTypes {
  avatar: string;
  availableFor: string[];
}

interface OrganizationImage {
  file: File;
  fieldName: string;
}

export interface ContentState {
  landing: LandingTypes;
  value: ValueTypes;
  live: LiveTypes;
  organizations: Array<string | OrganizationImage>;
  timeline: TimelineTypes[];
  available: AvailableTypes;
  isNewWebpage: boolean;
  socialChannels: SocialChannelTypes[];
  slider: string[];
}
