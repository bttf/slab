import sequelize, {
  Association,
  DataTypes,
  HasOneGetAssociationMixin,
  Model,
  Sequelize,
} from "../sequelize";
import type GoogleAuth from "./GoogleAuth";

class User extends Model {
  public id!: number;
  public uuid!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  getGoogleAuth!: HasOneGetAssociationMixin<GoogleAuth>;

  static associations: {
    googleAuth: Association<User, GoogleAuth>;
  };

  static initialize: (sequelize: Sequelize) => void;
  static associate: (sequelize: Sequelize) => void;
}

User.init(
  {
    uuid: {
      type: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    },
  },
  {
    schema: "v1",
    tableName: "users",
    modelName: "User",
    sequelize,
  }
);

User.associate = (sequelize) => {
  const { GoogleAuth } = sequelize.models;

  User.hasOne(GoogleAuth, {
    as: "googleAuth",
    foreignKey: "userId",
  });
};

export default User;
