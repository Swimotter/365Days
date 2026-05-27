import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  unique,
  check,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// Enum definitions
export const podRoleEnum = pgEnum("pod_role", ["owner", "member"]);

export const weekStatusEnum = pgEnum("week_status", [
  "submissions_open",
  "guessing_open",
  "archived",
]);

export const guessSessionModeEnum = pgEnum("guess_session_mode", [
  "async",
  "sync",
]);

// User auth
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  displayName: text("display_name"),
  onboardingComplete: boolean("onboarding_complete").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Pods
export const pods = pgTable("pods", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  inviteCode: text("invite_code").notNull().unique(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const podMembers = pgTable(
  "pod_members",
  {
    id: text("id").primaryKey(),
    podId: text("pod_id")
      .notNull()
      .references(() => pods.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: podRoleEnum("role").notNull().default("member"),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.podId, t.userId)],
);

export const weeks = pgTable(
  "weeks",
  {
    id: text("id").primaryKey(),
    podId: text("pod_id")
      .notNull()
      .references(() => pods.id, { onDelete: "cascade" }),
    weekNumber: integer("week_number").notNull(),
    startsAt: timestamp("starts_at").notNull(),
    endsAt: timestamp("ends_at").notNull(),
    revealAt: timestamp("reveal_at").notNull(),
    status: weekStatusEnum("status").notNull().default("submissions_open"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.podId, t.weekNumber)],
);

export const submissions = pgTable(
  "submissions",
  {
    id: text("id").primaryKey(),
    weekId: text("week_id")
      .notNull()
      .references(() => weeks.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    caption: text("caption"),
    photoUrl: text("photo_url"),
    photoKey: text("photo_key"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    check(
      "has_content",
      sql`${t.caption} IS NOT NULL OR ${t.photoUrl} IS NOT NULL`,
    ),
  ],
);

export const guesses = pgTable(
  "guesses",
  {
    id: text("id").primaryKey(),
    weekId: text("week_id")
      .notNull()
      .references(() => weeks.id, { onDelete: "cascade" }),
    submissionId: text("submission_id")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    guesserId: text("guesser_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    guessedId: text("guessed_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isCorrect: boolean("is_correct"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.submissionId, t.guesserId)],
);

export const scores = pgTable(
  "scores",
  {
    id: text("id").primaryKey(),
    weekId: text("week_id")
      .notNull()
      .references(() => weeks.id, { onDelete: "cascade" }),
    podId: text("pod_id")
      .notNull()
      .references(() => pods.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pointsEarned: integer("points_earned").notNull().default(0),
    bonusPoints: integer("bonus_points").notNull().default(0),
    totalPoints: integer("total_points").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.weekId, t.userId)],
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  podMembers: many(podMembers),
  createdPods: many(pods, { relationName: "podCreator" }),
  submissions: many(submissions),
  guessesAsGuesser: many(guesses, { relationName: "guesser" }),
  guessesAsGuessed: many(guesses, { relationName: "guessed" }),
  scores: many(scores),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const podsRelations = relations(pods, ({ one, many }) => ({
  creator: one(users, {
    fields: [pods.createdBy],
    references: [users.id],
    relationName: "podCreator",
  }),
  members: many(podMembers),
  weeks: many(weeks),
  scores: many(scores),
}));

export const podMembersRelations = relations(podMembers, ({ one }) => ({
  pod: one(pods, { fields: [podMembers.podId], references: [pods.id] }),
  user: one(users, { fields: [podMembers.userId], references: [users.id] }),
}));

export const weeksRelations = relations(weeks, ({ one, many }) => ({
  pod: one(pods, { fields: [weeks.podId], references: [pods.id] }),
  submissions: many(submissions),
  guesses: many(guesses),
  scores: many(scores),
}));

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  week: one(weeks, { fields: [submissions.weekId], references: [weeks.id] }),
  user: one(users, { fields: [submissions.userId], references: [users.id] }),
  guesses: many(guesses),
}));

export const guessesRelations = relations(guesses, ({ one }) => ({
  week: one(weeks, { fields: [guesses.weekId], references: [weeks.id] }),
  submission: one(submissions, {
    fields: [guesses.submissionId],
    references: [submissions.id],
  }),
  guesser: one(users, {
    fields: [guesses.guesserId],
    references: [users.id],
    relationName: "guesser",
  }),
  guessed: one(users, {
    fields: [guesses.guessedId],
    references: [users.id],
    relationName: "guessed",
  }),
}));

export const scoresRelations = relations(scores, ({ one }) => ({
  week: one(weeks, { fields: [scores.weekId], references: [weeks.id] }),
  pod: one(pods, { fields: [scores.podId], references: [pods.id] }),
  user: one(users, { fields: [scores.userId], references: [users.id] }),
}));
