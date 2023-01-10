export class ApiConstants {

  static PROFILE_ROUTE = "/profiles"

  static STARTING_BROWSER = "Starting browser"
  static OPENING_NEW_PAGE = "Opening new page"

  static RETRIEVING_PERFIL_HEADER = "Retrieving perfil header"
  static RETRIEVING_PERFIL_EXPERIENCES = "Retrieving perfil experiences"
  
  static ERROR_INVALID_PARAMETERS = "Invalid parameters provided"
  static ERROR_REQUIRED_PARAMETER = "Required parameter $s not provided"
  static ERROR_REQUIRED_QUERY_PARAMETER = "Required query parameter $s not provided"
  static ERROR_REQUIRED_HEADER = "Required header $s not provided"

  static formatar(param: keyof Omit<typeof ApiConstants, 'prototype'>, ...args: any[]){
    return `${ApiConstants[param]}`.replace(/\$s/g, args[0])
  }
  
}