import db from "../index.js";
import { OAuthProvider } from "../../types/oauthProvider.js";

interface CreateOAuthInstanceParams {
  userId: string;
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  redirectUri?: string | null;
}

interface UpdateOAuthInstanceParams {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string | null;
}

export const createOAuthInstance = async (
  params: CreateOAuthInstanceParams
) => {
  const result = await db.client
    .insertInto("oauth_instances")
    .values({
      user_id: params.userId,
      provider: params.provider,
      client_id: params.clientId,
      client_secret: params.clientSecret,
      redirect_uri: params.redirectUri ?? null,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
};

export const getOAuthInstancesByUserId = async (userId: string) => {
  const instances = await db.client
    .selectFrom("oauth_instances")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();

  return instances;
};

export const getOAuthInstanceByProvider = async (
  userId: string,
  provider: OAuthProvider
) => {
  const instance = await db.client
    .selectFrom("oauth_instances")
    .selectAll()
    .where("user_id", "=", userId)
    .where("provider", "=", provider)
    .executeTakeFirst();

  return instance;
};

export const updateOAuthInstance = async (
  userId: string,
  provider: OAuthProvider,
  params: UpdateOAuthInstanceParams
) => {
  const result = await db.client
    .updateTable("oauth_instances")
    .set({
      ...(params.clientId && { client_id: params.clientId }),
      ...(params.clientSecret && { client_secret: params.clientSecret }),
      ...(params.redirectUri !== undefined && {
        redirect_uri: params.redirectUri,
      }),
      updated_at: new Date().toISOString(),
    })
    .where("user_id", "=", userId)
    .where("provider", "=", provider)
    .returningAll()
    .executeTakeFirst();

  return result;
};

export const deleteOAuthInstance = async (
  userId: string,
  provider: OAuthProvider
) => {
  const result = await db.client
    .deleteFrom("oauth_instances")
    .where("user_id", "=", userId)
    .where("provider", "=", provider)
    .returningAll()
    .executeTakeFirst();

  return result;
};
