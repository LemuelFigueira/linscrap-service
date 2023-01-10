import { Router } from "express";
import puppeteer from "puppeteer";
import { LogService } from "../services/LogService";
import { ProfileExperienceService } from "../services/ProfileExperienceService";
import { ProfileHeaderService } from "../services/ProfileHeaderService";
import { ApiConstants } from "../utils/ApiConstants";


const router = Router();

router.get('/header', async (req, res) => {
  const log = new LogService(`${ApiConstants.PROFILE_ROUTE}${req.url}`)
  try {

    const browser = await puppeteer.launch()

    log.debug(ApiConstants.STARTING_BROWSER)

    const page = await browser.newPage()

    log.debug(ApiConstants.OPENING_NEW_PAGE)

    const service = new ProfileHeaderService()
    
    const promise = service.getProfileHeader(page)
    
    log.debug(ApiConstants.RETRIEVING_PERFIL_HEADER)

    const [header] = await Promise.all([promise])


    return res.status(200).json(header)
  } catch (error: any) {
    log.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})

router.get('/experiences', async (req, res) => {
  const log = new LogService(`${ApiConstants.PROFILE_ROUTE}${req.url}`)
  try {

    const browser = await puppeteer.launch()

    log.debug(ApiConstants.STARTING_BROWSER)

    const page = await browser.newPage()

    log.debug(ApiConstants.OPENING_NEW_PAGE)

    const service = new ProfileExperienceService()
    
    const promise = service.getProfileExperience(page)
    
    log.debug(ApiConstants.RETRIEVING_PERFIL_EXPERIENCES)

    const [header] = await Promise.all([promise])

    return res.status(200).json(header)
  } catch (error: any) {
    log.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})

export {
  router as profileRouter
}
