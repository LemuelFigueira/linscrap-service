import { Page } from "puppeteer"

export class ProfileExperienceService {

  profileUrl: string;
  cookie: string;
  linkedinUrl: string;
  experiencePath: string;

  constructor() {
    this.profileUrl = process.env.APP_LINKEDIN_PROFILE_URL || "Falta Url"
    this.experiencePath = process.env.APP_LINKEDIN_PROFILE_EXPERIENCE_PATH || "Falta experiencePath"
    this.cookie = process.env.APP_LINKEDIN_COOKIE || "Falta cookie"
    this.linkedinUrl = process.env.APP_LINKEDIN_URL || "Falta linkedinUrl"
  }


  getSelectors(): ProfileExperienceSelectors {
    return {
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
  }

  getProfileExperience = async (page: Page): Promise<ProfileExperienceResponse[]> => {
  
    const url = this.profileUrl + this.experiencePath

    this.validateProfileUrl(url)
  
    await page.setCookie({
      name: "li_at",
      value: this.cookie,
      url: this.linkedinUrl,
    })
  
    await page.goto(url)

  
    const selectors: ProfileExperienceSelectors = this.getSelectors()
  
    await Promise.all([page.waitForSelector(selectors.experiences)])
    await Promise.all([page.waitForSelector(selectors.experience.companyName)])
  
    const experiences = await page.$eval(selectors.experiences, (el, params) => {
      const { selectors } = params
  
      const result = []
  
      for (const item of Array.from(el.children)) {
  
        let jobTitle: string | undefined | null,
          companyBadge: string | undefined | null,
          companyName: string | undefined | null,
          workTime: string | undefined | null,
          location: string | undefined | null,
          fullTime: string | undefined | null
  
        const multipleExperiences = item.querySelector(selectors.multipleExperiences)?.children
  
        if (multipleExperiences) {
  
          companyName = item.querySelector(selectors.multipleExperience.companyName)?.textContent?.replace('\n', '').trim() as string
          companyBadge = item.querySelector(selectors.multipleExperience.companyBadge)?.getAttribute('src') as string
          fullTime = item.querySelector(selectors.multipleExperience.fullTime)?.textContent?.replace('\n', '').trim()
  
          const list = Array.from(multipleExperiences).map(item => ({
            company: {
              badge: companyBadge,
              name: companyName
            },
            jobTitle: item.querySelector(selectors.multipleExperience.jobTitle)?.textContent?.replace('\n', '').trim(),
            workTime: item.querySelector(selectors.multipleExperience.workTime)?.textContent?.replace('\n', '').trim(),
            // TODO: SERIALIZAR DETAILS
            location: item.querySelector(selectors.multipleExperience.location)?.textContent?.replace('\n', '').trim()
          }))
  
          for (const item2 of list) {
            result.push(item2)
          }
  
        } else {
          jobTitle = item.querySelector(selectors.experience.jobTitle)?.textContent?.replace('\n', '').trim()
          companyBadge = item.querySelector(selectors.experience.companyBadge)?.getAttribute('src')
          companyName = item.querySelector(selectors.experience.companyName)?.textContent?.replace('\n', '').trim()
          workTime = item.querySelector(selectors.experience.workTime)?.textContent?.replace('\n', '').trim()
          location = item.querySelector(selectors.experience.location)?.textContent?.replace('\n', '').trim()
  
          // TODO: SERIALIZAR DETAILS
          result.push({
            company: {
              badge: companyBadge,
              name: companyName
            },
            jobTitle,
            workTime,
            location
          })
        }
  
      }
  
      return result
  
    }, {
      selectors
    })
  
    return experiences
  }
  
  validateProfileUrl(url: string) {
    if (!url) {
      throw new Error('Please provide a valid profile url')
    }
    if (!url.includes
      ('https://www.linkedin.com/in/')) {
      throw new Error('Please provide a valid profile url')
    }
  }
}