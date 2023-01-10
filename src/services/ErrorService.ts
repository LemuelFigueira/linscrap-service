export class ErrorService {
  errors: any[] = []
  
  constructor() {
    this.errors = []
  }

  addError(error: any) {
    this.errors.push(error)
  }

  getErrors() {
    return this.errors.join(', ')
  }

  hasErrors() {
    return this.errors.length > 0
  }

  clearErrors() {
    this.errors = []
  }
}