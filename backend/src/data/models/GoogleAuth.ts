import {
  Association,
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Sequelize,
} from "sequelize";
import type User from "./User";

class GoogleAuth extends Model {
  public uuid!: string;
  public accessToken!: string;
  public refreshToken!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public userId!: number;

  getGoogleAuth!: BelongsToGetAssociationMixin<User>;

  static associations: {
    user: Association<GoogleAuth, User>;
  };

  static initialize: (sequelize: Sequelize) => void;
  static associate: (sequelize: Sequelize) => void;
}

GoogleAuth.initialize = (sequelize) => {
  GoogleAuth.init(
    {
      uuid: {
        type: DataTypes.UUIDV4,
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "access_token",
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "refresh_token",
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
    },
    {
      schema: "v1",
      tableName: "google_auths",
      modelName: "GoogleAuth",
      sequelize,
    }
  );
};

GoogleAuth.associate = (sequelize) => {
  const { User } = sequelize.models;

  GoogleAuth.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
};

export default GoogleAuth;
