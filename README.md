Create a db

```
createdb example
```

Update `DATABASE_URL` in `.env`

Run

```
pnpm db:push
pnpm dev
```

To see that with `Effect` it does not properly transform the date to a string

```
string user_b329aa7b399b4f5b8b11870f3b25f66d
object 2024-09-25T06:48:38.961Z
object 2024-09-25T06:48:38.961Z
object null
```

Run

```
pnpm dev-drizzle
```

To see that when using `drizzle-orm` directly it does:

```
string user_b329aa7b399b4f5b8b11870f3b25f66d
string 2024-09-25 08:48:38.961462+02
string 2024-09-25 08:48:38.961462+02
object null
```
