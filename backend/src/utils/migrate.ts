import { migrate } from "drizzle-orm/bun-sql/migrator";

import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

const postgres = new SQL({ url: process.env.DATABASE_URL });
const db = drizzle(postgres);

migrate(db, { migrationsFolder: "./drizzle" });
