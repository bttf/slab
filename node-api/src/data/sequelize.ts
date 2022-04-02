import { Sequelize } from "sequelize";

export * from "sequelize";

const {
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
  PGCERT,
} = process.env;

export default new Sequelize(PGDATABASE || "", PGUSER || "", PGPASSWORD, {
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
