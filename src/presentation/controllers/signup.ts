import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['email', 'name', 'password', 'passwordConfirmation']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        return {
            statusCode: 200,
            body: ''
        }
    }
}