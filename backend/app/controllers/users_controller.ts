import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import vine from '@vinejs/vine'
import User from '#models/user'
import { registerValidator } from '#validators/users_validator'
import { uniqueRule } from '#rules/unique'

export default class UsersController {
  async index() {
    return await User.all()
  }

  public async show({ params }: HttpContext) {
    return await User.findOrFail(params.id)
  }

  public async store({ request }: HttpContext) {
    const output = await request.validateUsing(registerValidator)
    const user = await User.create(output)

    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Verify your email address')
        .html(`Welcome <b>${user.name.toUpperCase()} ${user.lastName.toUpperCase()}</b>!`)
    })

    return user
  }

  public async update({ params, request }: HttpContext) {
    const validator = vine.compile(
      vine.object({
        email: vine
          .string()
          .email()
          .use(
            uniqueRule({ table: 'users', column: 'email', except: params.id, exceptColumn: 'id' })
          )
          .optional(),
      })
    )
    let output = await validator.validate({ id: params.id, ...request.body() })
    output = await request.validateUsing(registerValidator)
    const user = await User.findOrFail(params.id)
    await user?.merge(output).save()

    return user
  }

  public async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return user
  }
}
