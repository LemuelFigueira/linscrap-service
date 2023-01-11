import { Router } from "express";
import { LogService } from "@services/LogService";
import { ProfileExperienceService } from "@services/ProfileExperienceService";
import { ProfileHeaderService } from "@services/ProfileHeaderService";
import { ApiConstants } from "@utils/ApiConstants";
import { Page } from 'puppeteer'
import chrome from "chrome-aws-lambda";
const puppeteer = chrome.puppeteer
import { ErrorService } from "@services/ErrorService";

const router = Router();

router.get('/header/:userName', async (req, res) => {
  const log = new LogService(`${ApiConstants.PROFILE_ROUTE}${req.url}`)
  try {

    const errorService = new ErrorService()

    const cookie = req.headers?.li_at as string
    const userName = req.params?.userName as string

    if (!userName) errorService.addError(ApiConstants.formatar('ERROR_REQUIRED_PARAMETER', 'userName'))
    if (!cookie) errorService.addError(ApiConstants.formatar('ERROR_REQUIRED_PARAMETER', 'li_at'))

    if (errorService.hasErrors()) throw new Error(errorService.getErrors())

    const browser = await puppeteer.launch()

    log.debug(ApiConstants.STARTING_BROWSER)

    const page = await browser.newPage()

    log.debug(ApiConstants.OPENING_NEW_PAGE)

    const service = new ProfileHeaderService(userName, cookie)

    const promise = service.getProfileHeader(page as unknown as Page)

    log.debug(ApiConstants.RETRIEVING_PERFIL_HEADER)

    const [header] = await Promise.all([promise])

    browser.close()

    return res.status(200).json(header)
  } catch (error: any) {
    log.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})

router.get('/experiences/:userName', async (req, res) => {
  const log = new LogService(`${ApiConstants.PROFILE_ROUTE}${req.url}`)
  try {

    const errorService = new ErrorService()

    const cookie = req.headers?.li_at as string
    const userName = req.params?.userName as string

    if (!userName) errorService.addError(ApiConstants.formatar('ERROR_REQUIRED_PARAMETER', 'userName'))
    if (!cookie) errorService.addError(ApiConstants.formatar('ERROR_REQUIRED_HEADER', 'li_at'))

    if (errorService.hasErrors()) throw new Error(errorService.getErrors())

    const browser = await puppeteer.launch()

    log.debug(ApiConstants.STARTING_BROWSER)

    const page = await browser.newPage()

    log.debug(ApiConstants.OPENING_NEW_PAGE)

    const service = new ProfileExperienceService(userName, cookie)

    const promise = service.getProfileExperience(page as unknown as Page)

    log.debug(ApiConstants.RETRIEVING_PERFIL_EXPERIENCES)

    const [header] = await Promise.all([promise])

    browser.close()

    return res.status(200).json(header)
  } catch (error: any) {
    log.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})

export {
  router as profileRouter
}
