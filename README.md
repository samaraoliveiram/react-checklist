# ionic-checklist

## Contributing

> **Important**: *never* commit on master. Commit to another branch and make a pull request.
> This workflow is described [here](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

Fork the repository and install dependencies on the root folder

`yarn install`

Create `./server/.env` file in the server folder

```bash
DB_URL=my_db_url
DB_NAME=my_db_name
DB_USER=my_db_user
DB_PASS=my_db_pass
SECRET=my_secret
```

Run client and server applications in different terminals

**client**

`yarn client:start`

**server**

`yarn server:start`


