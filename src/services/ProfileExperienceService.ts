import { Page } from "puppeteer"
import { profileExperienceSelectors } from "@selectors/ProfileExperienceSelectors";

export class ProfileExperienceService {

  private profileUrl: string;
  private linkedinUrl: string;
  private experiencePath: string;

  constructor(userName: string, private cookie: string) {
    this.experiencePath = process.env.APP_LINKEDIN_PROFILE_EXPERIENCE_PATH || "Falta experiencePath"
    this.linkedinUrl = process.env.APP_LINKEDIN_URL || "Falta linkedinUrl"
    this.profileUrl = `${this.linkedinUrl}/in/${userName}`
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

  
    const selectors: ProfileExperienceSelectors = profileExperienceSelectors
  
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