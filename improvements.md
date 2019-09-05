# Requests

power command: `cmd0=PutZone_OnOff%2F<value>`, where value = `ON/OFF`

`set volume`
```javascript
POST http://192.168.1.10/MainZone/index.put.asp HTTP/1.1
Host: 192.168.1.10
Connection: keep-alive
Content-Length: 31
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Origin: http://192.168.1.10
Referer: http://192.168.1.10/MainZone/index.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,mk;q=0.8,nl;q=0.7,hr;q=0.6
Cookie: ZoneName=MAIN%20ZONE
cmd0=PutMasterVolumeSet%2F-74.0
```

`internet radio`
```javascript
POST http://192.168.1.10/MainZone/index.put.asp HTTP/1.1
Host: 192.168.1.10
Connection: keep-alive
Content-Length: 71
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Origin: http://192.168.1.10
Referer: http://192.168.1.10/MainZone/index.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,mk;q=0.8,nl;q=0.7,hr;q=0.6
Cookie: ZoneName=MAIN%20ZONE

cmd0=PutZone_InputFunction%2FIRADIO&cmd1=aspMainZone_WebUpdateStatus%2F
```

`tv audio`
```javascript
POST http://192.168.1.10/MainZone/index.put.asp HTTP/1.1
Host: 192.168.1.10
Connection: keep-alive
Content-Length: 67
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Origin: http://192.168.1.10
Referer: http://192.168.1.10/MainZone/index.html
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,mk;q=0.8,nl;q=0.7,hr;q=0.6
Cookie: ZoneName=MAIN%20ZONE

cmd0=PutZone_InputFunction%2FTV&cmd1=aspMainZone_WebUpdateStatus%2F
```

# Icons

## to implement

```javascript
import React from "react";
import Icons from "../../assets/icons/icons.svg"; // Path to your icons.svg
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default Icon;
```

```javascript
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">

    <symbol id="icon-account-group" viewBox="0 0 512 512">
      <path d="m256 301l0-41c7-7 19-24 21-60 10-5 16-16 16-30 0-12-4-22-12-28 7-13 18-37 12-60-7-28-48-39-81-39-29 0-65 8-77 30-12-1-20 2-26 9-15 16-8 46-4 62 1 2 2 4 2 5l0 42c0 41 24 63 42 71l0 39c-8 3-17 7-26 10-56 20-104 37-112 64-11 31-11 102-11 105 0 6 5 11 11 11l384 0c6 0 10-5 10-11 0-3 0-74-10-105-11-31-69-48-139-74z m-235 168c1-20 3-66 10-88 5-16 57-35 99-50 12-4 23-8 34-12 4-2 7-6 7-10l0-54c0-4-3-9-8-10-1 0-35-12-35-54l0-42c0-3-1-5-2-11-2-8-9-34-2-41 3-4 11-3 15-2 6 1 11-2 13-8 3-13 29-22 60-22 31 0 57 9 60 22 5 17-6 37-11 48-3 6-5 10-5 14 0 5 5 10 11 10 3 0 5 6 5 11 0 4-2 11-5 11-6 0-11 4-11 10 0 43-16 55-16 55-3 2-5 6-5 9l0 54c0 4 2 8 7 10 51 19 125 41 132 62 8 22 9 68 10 88l-363 0z m480-94c-8-25-49-51-138-84l0-20c7-7 19-25 21-61 4-2 7-5 10-9 4-5 6-13 6-20 0-13-5-23-13-28 7-15 19-41 13-64-4-15-21-31-40-39-19-7-38-6-54 5-5 3-6 10-3 15 3 4 10 6 15 3 12-9 25-6 34-3 15 6 25 18 27 24 4 17-6 40-12 52-3 6-4 10-4 13 0 3 1 6 3 8 2 2 4 3 7 3 4 0 6 6 6 11 0 3-1 6-3 8-1 2-2 2-3 2-6 0-10 5-10 11 0 43-17 55-17 55-3 2-5 5-5 9l0 32c0 4 3 8 7 10 83 31 127 56 133 73 7 22 9 68 10 88l-43 0c-6 0-11 5-11 11 0 6 5 11 11 11l53 0c6 0 11-5 11-11 0-3 0-74-11-105z"/>
    </symbol>

    <symbol id="icon-arrow-down" viewBox="0 0 512 512">
      <path d="m508 109c-4-4-11-3-15 1l-237 269-237-269c-4-4-11-5-15-1-5 4-5 11-1 15l245 278c2 2 5 3 8 3 3 0 6-1 8-3l245-278c4-4 4-11-1-15z"/>
    </symbol>

    <symbol id="icon-arrow-left" viewBox="0 0 512 512">
      <path d="m133 256l269-237c4-4 5-11 1-15-4-5-11-5-15-1l-278 245c-2 2-3 5-3 8 0 3 1 6 3 8l278 245c2 2 4 3 7 3 3 0 6-1 8-4 4-4 3-11-1-15z"/>
    </symbol>

    <symbol id="icon-arrow-right" viewBox="0 0 512 512">
      <path d="m402 248l-278-245c-4-4-11-4-15 1-4 4-3 11 1 15l269 237-269 237c-4 4-5 11-1 15 2 3 5 4 8 4 3 0 5-1 7-3l278-245c2-2 3-5 3-8 0-3-1-6-3-8z"/>
    </symbol>
</svg>
```

usage: `<Icon name="arrow-down" color="#FFFFFF" size={35} />`
