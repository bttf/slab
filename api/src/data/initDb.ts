import fs from "fs";
import path from "path";
import sequelize, { ModelStatic, Sequelize } from "./sequelize";

const modelsPath = path.join(__dirname, "models");

interface ExtendedModel extends ModelStatic<any> {
  associate: (sequelize: Sequelize) => void;
}

const models: ExtendedModel[] = [];

const init = async () => {
  await Promise.all(
    fs
      .readdirSync(modelsPath)
      .filter((filename) => filename.indexOf(".") !== 0)
      .map(async (filename) => {
        const { default: model }: { default: ExtendedModel } = await import(
          path.join(modelsPath, filename)
        );
        models.push(model);
      })
  );

  models.forEach((model) => {
    if (typeof model.associate === "function") {
      model.associate(sequelize);
    }
  });
};

export default init;
