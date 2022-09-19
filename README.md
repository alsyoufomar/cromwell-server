# Cromwell Server

## Setting up

1. Rename the `.env.example` file to `.env`
2. Create a new database instance in [ElephantSQL](https://www.elephantsql.com/).
3. Edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Create another new instance in ElephantSQL (this will be your [Shadow Database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)).
5. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of the shadow database you just created. Leave `?schema=shadow` at the end.
6. Back in your ElephantSQL shadow database instance, go to the `Browser` tab and enter `CREATE SCHEMA shadow` then press the `Execute` button. This creates a schema for Prisma to use for the shadow database.
7. Run `npm ci` to install the project dependencies.
8. Run `npx prisma migrate reset` to execute the existing migration. Press `y` when it asks if you're sure.
9. Make sure to edit `KEY` variable in `.env`, swapping `somesecurestring` for an actual secure string. for example: `87664d1a-92dc-4ced-a758-9c898c32d525`
