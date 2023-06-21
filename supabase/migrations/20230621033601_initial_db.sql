create type "public"."Role" as enum ('HANDICAPP', 'ORG', 'USER');

create table "public"."Account" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid not null,
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text
);


create table "public"."Comment" (
    "id" uuid not null default gen_random_uuid(),
    "content" text not null,
    "postId" uuid not null,
    "userId" uuid not null,
    "createdAt" timestamp(6) with time zone not null default CURRENT_TIMESTAMP
);


create table "public"."Jobs" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text not null,
    "qualification" text not null,
    "experience" text not null,
    "salary" integer not null default 0,
    "location" text not null,
    "createdAt" timestamp(6) with time zone not null default CURRENT_TIMESTAMP,
    "userId" uuid
);


create table "public"."Like" (
    "id" uuid not null default gen_random_uuid(),
    "postId" uuid not null,
    "userId" uuid not null
);


create table "public"."Post" (
    "id" uuid not null default gen_random_uuid(),
    "content" text,
    "media_url" text not null,
    "userId" uuid not null,
    "createdAt" timestamp(6) with time zone not null default CURRENT_TIMESTAMP
);


create table "public"."SavedPost" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid not null,
    "postId" uuid not null,
    "createdAt" timestamp(6) with time zone not null default CURRENT_TIMESTAMP
);


create table "public"."Session" (
    "id" uuid not null default gen_random_uuid(),
    "sessionToken" text not null,
    "userId" uuid not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."User" (
    "id" uuid not null default gen_random_uuid(),
    "role" "Role" not null default 'USER'::"Role",
    "name" text,
    "username" text,
    "password" text,
    "bio" text,
    "address" text,
    "email" text,
    "emailVerified" timestamp(3) without time zone,
    "image" text
);


create table "public"."VerificationToken" (
    "identifier" text not null,
    "token" text not null,
    "expires" timestamp(3) without time zone not null
);


CREATE UNIQUE INDEX "Account_pkey" ON public."Account" USING btree (id);

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX "Comment_pkey" ON public."Comment" USING btree (id);

CREATE UNIQUE INDEX "Jobs_pkey" ON public."Jobs" USING btree (id);

CREATE UNIQUE INDEX "Like_pkey" ON public."Like" USING btree (id);

CREATE UNIQUE INDEX "Post_pkey" ON public."Post" USING btree (id);

CREATE UNIQUE INDEX "SavedPost_pkey" ON public."SavedPost" USING btree (id);

CREATE UNIQUE INDEX "Session_pkey" ON public."Session" USING btree (id);

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE INDEX "User_id_idx" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);

alter table "public"."Account" add constraint "Account_pkey" PRIMARY KEY using index "Account_pkey";

alter table "public"."Comment" add constraint "Comment_pkey" PRIMARY KEY using index "Comment_pkey";

alter table "public"."Jobs" add constraint "Jobs_pkey" PRIMARY KEY using index "Jobs_pkey";

alter table "public"."Like" add constraint "Like_pkey" PRIMARY KEY using index "Like_pkey";

alter table "public"."Post" add constraint "Post_pkey" PRIMARY KEY using index "Post_pkey";

alter table "public"."SavedPost" add constraint "SavedPost_pkey" PRIMARY KEY using index "SavedPost_pkey";

alter table "public"."Session" add constraint "Session_pkey" PRIMARY KEY using index "Session_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."Account" add constraint "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_userId_fkey";

alter table "public"."Comment" add constraint "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Comment" validate constraint "Comment_postId_fkey";

alter table "public"."Comment" add constraint "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Comment" validate constraint "Comment_userId_fkey";

alter table "public"."Jobs" add constraint "Jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Jobs" validate constraint "Jobs_userId_fkey";

alter table "public"."Like" add constraint "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Like" validate constraint "Like_postId_fkey";

alter table "public"."Like" add constraint "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Like" validate constraint "Like_userId_fkey";

alter table "public"."Post" add constraint "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Post" validate constraint "Post_userId_fkey";

alter table "public"."SavedPost" add constraint "SavedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SavedPost" validate constraint "SavedPost_postId_fkey";

alter table "public"."SavedPost" add constraint "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SavedPost" validate constraint "SavedPost_userId_fkey";

alter table "public"."Session" add constraint "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Session" validate constraint "Session_userId_fkey";


create policy "any 1rma4z_0"
on "storage"."objects"
as permissive
for select
to anon
using ((bucket_id = 'posts'::text));


create policy "any 1rma4z_1"
on "storage"."objects"
as permissive
for insert
to anon
with check ((bucket_id = 'posts'::text));


create policy "any 1rma4z_2"
on "storage"."objects"
as permissive
for update
to anon
using ((bucket_id = 'posts'::text));


create policy "any 1rma4z_3"
on "storage"."objects"
as permissive
for delete
to anon
using ((bucket_id = 'posts'::text));



