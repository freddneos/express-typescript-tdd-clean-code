import { SignupController } from "./signup";

describe('Signup Controller ', () => {
    test('should return 400 if no name is provided', () => {
        const sut = new SignupController();
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email",
                password: "any_password",
                passwordConfirmation: "any_password"

            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})