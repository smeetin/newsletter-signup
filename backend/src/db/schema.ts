import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const subscriberTable = pgTable("subscribers", {
  id: serial("id").primaryKey(),

  // Minimal data collection
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }),

  // Double opt-in consent management
  consentGivenAt: timestamp("consent_given_at", { withTimezone: true }),

  // Double opt-in mechanism
  verificationToken: varchar("verification_token", { length: 255 })
    .unique()
    .notNull(),
  verificationTokenExpiryAt: timestamp("verification_toke_expiry_at", {
    withTimezone: true,
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP + INTERVAL '7 days'`),
  verificationSentAt: timestamp("verification_sent_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  // A user is only truly subscribed once this field is populated
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),

  // Should be true only after successful email verification
  isSubscribed: boolean("is_subscribed").notNull().default(false),

  // Timestamp for the last update to the subscriber's record (e.g., unsubscribe)
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  // Timestamp when the user explicitly unsubscribed.
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),

  // IP addr captured at signup for GDPR compliance
  ipAddress: varchar("ip_address", { length: 45 }),

  privacyPolicyVersion: varchar("privacy_policy_version", { length: 50 })
    .notNull()
    .default("1.0"),
  consentMethod: varchar("consent_method", { length: 50 })
    .notNull()
    .default("double_opt_in"),
});
