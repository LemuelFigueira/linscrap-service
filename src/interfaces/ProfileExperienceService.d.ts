declare type ProfileExperienceSelectors = {
  experiences: string
  multipleExperiences: string
  multipleExperience: MultipleExperience
  experience: Experience
}

declare type ProfileExperienceResponse = {
  company: {
      badge: string | null | undefined;
      name: string | null | undefined;
  };
  jobTitle: string | undefined;
  workTime: string | undefined;
  location: string | undefined;
}

type MultipleExperience = Experience & {
  fullTime: string
}

type Experience = {
  companyName: string
  jobTitle: string
  companyBadge: string
  workTime: string
  location: string
  details: string
}