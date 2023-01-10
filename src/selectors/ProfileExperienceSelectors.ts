export const profileExperienceSelectors = {
  experiences: "main section ul.pvs-list",
  multipleExperiences: "div.pvs-entity div:nth-child(2) > div:nth-child(2) > ul.pvs-list > li > div.pvs-list__container > div.scaffold-finite-scroll > div > ul.pvs-list",
  multipleExperience: {
    companyBadge: "div.pvs-entity div:nth-child(1) > a > div > div > img",
    companyName: "div.pvs-entity div:nth-child(2) > div:nth-child(1) span:nth-child(1) span",
    fullTime: "div.pvs-entity > div:nth-child(2) > div:nth-child(1) span:nth-child(2) span",
    workTime: "div.pvs-entity > div:nth-child(2) > div:nth-child(1) > a > span > span",
    details: "div.pvs-entity > div:nth-child(2) > div:nth-child(2) > ul",
    jobTitle: "div.pvs-entity > div:nth-child(2) > div:nth-child(1) span:nth-child(1) span",
    location: "div.pvs-entity > div:nth-child(2) > div:nth-child(1) span:nth-child(3) span",
  },
  experience: {
    companyName: "div.pvs-entity div:nth-child(2) > div:nth-child(1) > div:nth-child(1) span:nth-child(2) span",
    jobTitle: "div.pvs-entity div:nth-child(2) > div:nth-child(1) > div:nth-child(1) span:nth-child(1) span",
    companyBadge: "div.pvs-entity div:nth-child(1) > a > div > div > img",
    workTime: "div.pvs-entity div:nth-child(2) > div:nth-child(1) > div:nth-child(1) span:nth-child(3) span",
    location: "div.pvs-entity div:nth-child(2) > div:nth-child(1) > div:nth-child(1) span:nth-child(4) span",
    details: "div.pvs-entity div:nth-child(2) > div:nth-child(2) > ul"
  }
}