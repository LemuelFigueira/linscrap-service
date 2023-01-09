import { Page } from "puppeteer";

export class ProfileHeaderService {

  url: string;
  cookie: string;
  linkedinUrl: string;

  constructor() {
    this.url = process.env.APP_LINKEDIN_PROFILE_URL || "Falta Url"
    this.cookie = process.env.APP_LINKEDIN_COOKIE || "Falta cookie"
    this.linkedinUrl = process.env.APP_LINKEDIN_URL || "Falta linkedinUrl"
  }


  private getSelectors() {
    return {
      userName: ".pv-text-details__left-panel h1",
      jobTitle: "div.pv-text-details__left-panel .text-body-medium",
      location: "span.text-body-small.inline.t-black--light.break-words",
      companyName: "span.pv-text-details__right-panel-item-text.hoverable-link-text.break-words.text-body-small.t-black",
      companyBadge: "img.ember-view.pv-text-details__right-panel-item-text-image.EntityPhoto-square-1",
      about: "div.display-flex.ph5.pv3 > div > div > div > span",
    }
  };

  async getProfileHeader(page: Page): Promise<ProfileHeaderResponse> {

    const url = process.env.APP_LINKEDIN_PROFILE_URL
    const cookie = process.env.APP_LINKEDIN_COOKIE
    const linkedinUrl = process.env.APP_LINKEDIN_URL

    this.validateProfileUrl(url)

    await page.setCookie({
      name: "li_at",
      value: cookie,
      url: linkedinUrl,
    })

    await page.goto(url)

    const selectors = this.getSelectors()

    const pageSelectorsPromises = []
    for (const [key, value] of Object.entries(selectors).filter(([key]) => key !== 'experienceWithPromotion')) {
      pageSelectorsPromises.push(page.waitForSelector(value as any))
    }
    await Promise.all(pageSelectorsPromises)



    const userName = await page.$eval(selectors.userName, (el) => el.textContent?.replace('\n', '').trim())
    const jobTitle = await page.$eval(selectors.jobTitle, (el) => el.textContent?.replace('\n', '').trim())
    const location = await page.$eval(selectors.location, (el) => el.textContent?.replace('\n', '').trim())
    const companyName = await page.$eval(selectors.companyName, (el) => el.textContent?.replace('\n', '').trim())
    const companyBadge = await page.$eval(selectors.companyBadge, (el) => el.getAttribute('src'))
    const about = await page.$eval(selectors.about, (el) => el.textContent?.replace('\n', '').trim())

    const perfil = { userName, jobTitle, location, companyName, companyBadge, about } as ProfileHeaderResponse

    return perfil
  };

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