## Cloudflare Worker

cloudflare worker + tiny request router + uploadthing

Test the POST route with a raw JSON body that contains metadata about the file uploaded:

```bash
{
  "files": [
    {
      "name": "example.jpg",
      "size": 123456,
      "type": "image/jpeg"
    }
  ]
}
```

Send it to this endpoint:

```bash
http://localhost:8787/api/uploadthing?slug=videoAndImage&actionType=upload
```
