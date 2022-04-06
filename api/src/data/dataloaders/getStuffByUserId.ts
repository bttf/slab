import db from "@/data";
import User from "@/data/models/User";

// TODO This dataloader is dumb don't use iti not meant for use CAUTION
export default async function getStuffByUserId(
  _viewer: User,
  userIds: readonly number[]
) {
  return db.GoogleAuth.findAll({
    where: {
      userId: userIds,
    },
  });
}
