## Run with Skaffold and Docker

Clone the project

```bash
git clone  https://github.com/magang-mknows/be-credit-scoring.git
```

Install Nginx ingress controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml
```

Go to the project directory

Run to automatically build and deploy your application when your code changes.

```bash
skaffold dev
```

**Note:**
If this error happen

```
Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io"
```

Try to run this command then try to run `skaffold dev`

```bash
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
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
