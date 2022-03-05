import fs from "fs";
import path from "path";
import { ModelStatic, Sequelize } from "sequelize";

const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  PGCERT,
} = process.env;

export const sequelize = new Sequelize(PGDATABASE || "", PGUSER || "", PGPASSWORD, {
  host: PGHOST,
  port: parseInt(PGPORT || "5432", 10),
  dialect: "postgres",
  dialectOptions:
    NODE_ENV === "production"
      ? {
          ssl: {
            ca: PGCERT,
          },
        }
      : undefined,
});

const modelsPath = path.join(__dirname, "models");

interface ExtendedModel extends ModelStatic<any> {
  initialize: (sequelize: Sequelize) => void;
  associate: (sequelize: Sequelize) => void;
}

const models: ExtendedModel[] = [];

const init = async () => {
  await Promise.all(
    fs
      .readdirSync(modelsPath)
      .filter((filename) => filename.indexOf(".") !== 0)
      .map(async (filename) => {
        const model: ExtendedModel = await import(
          path.join(modelsPath, filename)
        );
        models.push(model);
      })
  );

  models.forEach((model) => {
    if (
      !(model instanceof Sequelize) &&
      typeof model.initialize === "function"
    ) {
      model.initialize(sequelize);
    }
  });

  models.forEach((model) => {
    if (
      !(model instanceof Sequelize) &&
      typeof model.associate === "function"
    ) {
      model.associate(sequelize);
    }
  });
};

export default init;
