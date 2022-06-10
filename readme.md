
# Muskoka Grown COA API

This API will return lot data when provided with the lot number.


## API Reference

#### Get data for a lot number 

```http
  GET /api/:lotNum
```


#### Refresh Database

Purges the current database, then pulls raw data from Google Sheets.
```http
  GET /refresh
```

## Authors

- [@marchurst](https://www.github.com/MarcHurst)



## Tech Stack

**Server:** Node, Express, MongoDB, Google API, Google Auth


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DBSTRING` - Your connection string for MongoDB.

`SSID` - For the target spreadsheet.