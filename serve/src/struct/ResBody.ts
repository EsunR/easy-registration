export default class ResBody {
  success: boolean
  data: any
  msg: string
  constructor({
    success = true,
    data = null,
    msg = ""
  }: {
    success?: boolean
    data?: any
    msg?: string
  }) {
    this.success = success
    this.data = data
    this.msg = msg
  }
}
