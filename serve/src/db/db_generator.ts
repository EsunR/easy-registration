import Information from "../modal/information"
import { databaseConfig } from "../config"
import db from "./index"

Information.sync()

export default function() {
  db.sequelize
    .sync({
      force: databaseConfig.rebuild
    })
    .then(() => {
      console.log("DataBase Sync done")
    })
  db.connectTest()
}
