import ResBody from "../struct/ResBody"
import Router from "koa-router"
import Information from "../modal/information"
import { sysConfig } from "config"

const router: Router = new Router()

router.post("/addInfo", async ctx => {
  const res = await Information.createInformation(ctx.request.body)
  ctx.body = new ResBody({
    data: res
  })
})

router.get("/getAll", async ctx => {
  const res = await Information.findAll()
  ctx.body = new ResBody({
    data: res
  })
})

router.delete("/:id", async ctx => {
  const { id } = ctx.params
  const res = await Information.destroy({
    where: { id }
  })
  ctx.body = new ResBody({
    data: res
  })
})

router.get("/getByName", async ctx => {
  const { name } = ctx.query
  console.log("name: ", name)
  const res = await Information.findOne({
    where: { name }
  })
  ctx.body = new ResBody({
    data: res
  })
})

export default router
