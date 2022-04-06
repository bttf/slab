import DataLoader from "dataloader";
import User from "@/data/models/User";
import type GoogleAuth from "@/data/models/GoogleAuth";
import getStuffByUserId from "./getStuffByUserId";

export const genLoaders = (viewer: User) => ({
  getStuffByUserId: new DataLoader<User["id"], GoogleAuth>((ids) =>
    getStuffByUserId(viewer, ids)
  ),
});
