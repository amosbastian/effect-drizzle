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

Run

```
pnpm dev-drizzle
```

To see that when using `drizzle-orm` directly it does.
