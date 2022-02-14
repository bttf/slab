"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  const sql = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "citext";

    CREATE SCHEMA v1;

    CREATE OR REPLACE FUNCTION v1.update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now() at time zone 'utc';
                RETURN NEW;
                    END;
    $$ language 'plpgsql';

    CREATE TABLE v1.users(
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ,
      email citext NOT NULL UNIQUE
    );

    CREATE TRIGGER users_on_update
    BEFORE UPDATE ON v1.users FOR EACH ROW EXECUTE PROCEDURE v1.update_modified_column();

    CREATE TABLE v1.google_auths (
      id SERIAL PRIMARY KEY,
      uuid uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      access_token TEXT,
      refresh_token TEXT,
      user_id INTEGER NOT NULL REFERENCES v1.users ON DELETE CASCADE,
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
      deleted_at TIMESTAMPTZ
    );

    CREATE TRIGGER update_google_auths_modtime
    BEFORE UPDATE ON v1.google_auths FOR EACH ROW EXECUTE PROCEDURE v1.update_modified_column();
  `;
  return db.runSql(sql);
};

exports.down = function (db) {
  const sql = `
    DROP SCHEMA v1 CASCADE;
  `;
  return db.runSql(sql);
};

exports._meta = {
  version: 1,
};
