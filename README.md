# Getir Case Study

### Installation

Install dependencies

```bash
$ npm install
```

### Config

Available environment variables are

`PORT`  
(default: 3000)

`MONGODB_URI`  
(default: mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true)

### Testing

Project uses [JEST](https://jestjs.io) for testing.

To start unit tests

```bash
$ npm run test
```

### API Routes

Host: `https://getir-case-study-ok.herokuapp.com/`

`POST /records`

| Parameters | Type              | Description                   | Optional |
| ---------- | ----------------- | ----------------------------- | -------- |
| startDate  | Date (YYYY-MM-DD) | Starting date constraint      | no       |
| endDate    | Date (YYYY-MM-DD) | End date constraint           | no       |
| minCount   | integer           | Minimum totalCount constraint | no       |
| maxCount   | integer           | Maximum totalCount constraint | no       |

#### Request Body

```jsx
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

#### Response Payload

```jsx
{
  "code":0,
  "msg":"Success",
  "records":[
    {
    "key":"TAKwGc6Jr4i8Z487",
    "createdAt":"2017-01-28T01:22:14.398Z",
    "totalCount":2800
    },
    {
    "key":"NAeQ8eX7e5TEg7oH",
    "createdAt":"2017-01-27T08:19:14.135Z",
    "totalCount":2900
    }
  ]
}
```

### License

[WTFPL](LICENSE.md)
