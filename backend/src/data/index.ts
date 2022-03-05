import fs from "fs";
import path from "path";
import { Model, ModelDefined, ModelStatic, Sequelize } from "sequelize";

const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  PGCERT,
} = process.env;

if (!PGDATABASE || !PGUSER || !PGPORT) {
  throw new Error(
    "Environment variables PGDATABASE, PGUSER, PGPORT need to be set"
  );
}

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: parseInt(PGPORT, 10),
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

const db: { [key: string]: ExtendedModel | Sequelize } = {};
const modelsPath = path.join(__dirname, "models");

interface ExtendedModel extends ModelStatic<any> {
  initialize: (sequelize: Sequelize) => void;
  associate: (sequelize: Sequelize) => void;
}

const init = async () => {
  await Promise.all(
    fs
      .readdirSync(modelsPath)
      .filter((filename) => filename.indexOf(".") !== 0)
      .map(async (filename) => {
        const model: ExtendedModel = await import(
          path.join(modelsPath, filename)
        );
        db[model.name] = model;
      })
  );

  Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    if (
      !(model instanceof Sequelize) &&
      typeof model.initialize === "function"
    ) {
      model.initialize(sequelize);
    }
  });

  Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    if (
      !(model instanceof Sequelize) &&
      typeof model.associate === "function"
    ) {
      model.associate(sequelize);
    }
  });

  db.sequelize = sequelize;
};

init();

export default db;
