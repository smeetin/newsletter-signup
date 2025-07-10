CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"consent_given_at" timestamp with time zone,
	"verification_token" varchar(255) NOT NULL,
	"verification_toke_expiry_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days' NOT NULL,
	"verification_sent_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email_verified_at" timestamp with time zone,
	"is_subscribed" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unsubscribed_at" timestamp with time zone,
	"ip_address" varchar(45),
	"privacy_policy_version" varchar(50) DEFAULT '1.0' NOT NULL,
	"consent_method" varchar(50) DEFAULT 'double_opt_in' NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email"),
	CONSTRAINT "subscribers_verification_token_unique" UNIQUE("verification_token")
);
