# Public Routes


## **Wake up buka buka**

We should wake up buka buka. It'll be a shame if it misses some GET & POST requests.

_Request_

`POST /api/wakeup`

_Response_

`{msg: string}` 

## **Let buka buka sleep**

It was a long day, let's let buka buka rest.

_Request_

`POST /api/sleep`

_Response_

`{msg: string}`

## **Get happiness**

_Request_

`GET /api/happiness`

No params.

_Response_

`{ happiness: float }`

## **Set happiness**

_Request_

`POST /api/happiness`

Required Params:
` {happiness: number}`

_Response_

Empty

# Websocket events

## ** "happiness" **

_Event Name_

`happiness`

**Payload**
`{happiness: number}

**Frequency**

This event will trigger whenever buka buka's happiness changes.

## ** "sleep" **

**Event Name**

`sleep`

**Payload**
`{}`

**Frequency**

This event will trigger whenever buka buka sleeps.

## ** "awake" **

**Event Name**

`awake`

**Payload**
`{}`

**Frequency**

This event will trigger whenever buka buka wakes up.


