import { badRequest, serverError } from '../helpers/http-helper'
import { ServerError, InvalidParamError, MissingParamError } from '../errors'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignupController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['email', 'name', 'password', 'passwordConfirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        }
        catch (error) {
            return serverError(new ServerError())
        }
    }
}