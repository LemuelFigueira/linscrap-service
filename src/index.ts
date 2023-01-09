import pup from 'puppeteer';
import { ProfileExperienceService } from './services/ProfileExperienceService';
import { ProfileHeaderService } from './services/ProfileHeaderService';

require('dotenv').config()

function log(...args: any[]) {
  console.info(new Date() + ' - ', ...args)
}

const main = async () => {

  const browser = await pup.launch()

  const perfilPage = await browser.newPage()
  const experiencesPage = await browser.newPage()

  const profileHeaderService = new ProfileHeaderService()
  const profileExperienceService = new ProfileExperienceService()

  const perfil = await profileHeaderService.getProfileHeader(perfilPage)
  const experiences = await profileExperienceService.getProfileExperience(experiencesPage)

  log(perfil)
  log(experiences)

  await browser.close()
}

main()