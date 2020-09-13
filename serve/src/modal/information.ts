import db from "../db/index"
import { DataTypes, Model } from "sequelize"

class Information extends Model {
  static createInformation = (info: any) => {
    const information = Information.build(info)
    return information.save()
  }
}

Information.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    sex: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.STRING
    },
    qq: {
      type: DataTypes.STRING
    },
    home: {
      type: DataTypes.STRING
    },
    birthday: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING
    },
    hobby: {
      type: DataTypes.STRING
    },
    want_to_join: {
      type: DataTypes.INTEGER
    },
    talk: {
      type: DataTypes.TEXT
    },
    has_exp: {
      type: DataTypes.TEXT
    },
    self_introduction: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "information",
    paranoid: true
  }
)

export default Information
