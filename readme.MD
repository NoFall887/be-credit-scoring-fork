## Run with Skaffold and Docker

Clone the project

```bash
  git clone https://github.com/magang-mknows/be-credit-scoring.git
```

Go to the project directory

Run to automatically build and deploy your application when your code changes.

```bash
  skaffold dev
```

## Change your host with custom host

1. Go to host file

```bash
C:/windows/system32/drivers/etc/hosts
```

2. Add new row in the last section

```bash
127.0.0.1 credit-scoring.dev"
```

3. Open it in your browser
4. If blocked by"NOT SECURE" chrome, click anywhere iniside this page. type "THISISUNSAFE". It will automatically open the not secure page

## Updating common services

1. After updating common, move to common directory

```bash
cd common
```

2. Run

```bash
npm run pub
```

3. Move to another services directory

```bash
cd ../<your service name>
```

4. update common module or package

```bash
npm update
```
