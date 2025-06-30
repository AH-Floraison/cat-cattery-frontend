# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Troubleshooting

### 1. No Data Displayed

If the frontend page is empty or unable to load content, it's likely due to one of the following reasons:

- The database `mydb` has no data.
- There's a problem with the frontend-backend interface connection.

### 2. Verify the Issue

#### (1) Check Database Contents

Log in to MySQL and switch to your database:

```sql
USE mydb;
SHOW TABLES;
SELECT * FROM cat;
SELECT * FROM certificate;
SELECT * FROM environment;
SELECT * FROM contact;
```

If the results are empty, then there's no data in the database.

#### (2) Access Backend Interfaces

You can use Postman or a browser to access the following endpoints:

- http://localhost:3001/api/cats
- http://localhost:3001/api/certificates
- http://localhost:3001/api/environments
- http://localhost:3001/api/contacts

If the response is `[]` or `{}`, then the database has no data.

### 3. Solution

#### (1) Manually Insert Test Data

You can insert a test data record into the database using the MySQL command line, for example:

```sql
INSERT INTO cat (name, age, ...) VALUES ('小花', 2, ...);
```

(Please refer to the definitions in your models directory for the field names and table structure.)

#### (2) Add Data Using the Frontend Page

If your frontend has an "Add" button, you can use it to add data directly.

### 4. Summary

- Your project has been successfully started!
- The frontend page is currently empty because the database has no data.
- After inserting data, the page will display the content.

If you need **table creation SQL** or **specific statements for inserting test data**, please let me know the table name and fields, and I can help you write them!
If you encounter any problems while inserting data, feel free to ask me!
