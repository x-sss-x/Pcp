<div style="display:flex;justify-content:center;">
  <img src="./public/HandicAppLogo.png"/>
</div>
<h2 style="text-align:center;"> Handic App</h2>

**_<h4>Steps to work on dev environment</h4>_**

> 1. Pull the changes from your local repository using<br>

```bash
git pull origin main
```

> 2. Install the dependencies

```bash
npm install
```

> 3. Create `.env` file in root project directory

```javascript
DATABASE_URL = <your_local_db_url>
SUPABASE_SERVICE_ROLE_KEY = <local_supabase_role_key>
GOOGLE_CLIENT_ID = <your_google_client_id>
GOOGLE_CLIENT_SECRET = <your_google_client_secret>
```

above values are available when run

```bash
npx supbase status
```

To get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` watch this
[Vedio](https://www.youtube.com/embed/tjCxuDh5e9I)

> 4. Create `.env.local` file in root project directory

```javascript
NEXT_PUBLIC_SUPABASE_URL = <local_supabase_api_url>
NEXT_PUBLIC_ANNON_KEY = <local_supabase_anon_key>
NEXTAUTH_URL = "http://localhost:3000" //this should be your next app server url
NEXTAUTH_SECRET = "secrete"
```

> 5. Push the shema changes to supabase

```bash
npx prisma db push
```

> 6. Seed the data to database

```bash
npx prisma db seed
```

> 7. Generate types in supabase

```bash
npx supabase gen types typescript --local > ./types/supabase.ts
```

> 8. Run dev server

```bash
npx supabase gen types typescript --local > ./types/supabase.ts
```
