# backend_phone_store

To run server write `npm run dev` in terminal

## Get /products

Returns an array of items products

> Full array look [here](https://github.com/mate-academy/product_catalog/blob/main/public/api/phones.json)

```json
  {
    "id": "1",
    "category": "phones",
    "phoneId": "apple-iphone-7-32gb-black",
    "itemId": "apple-iphone-7-32gb-black",
    "name": "Apple iPhone 7 32GB Black",
    "fullPrice": 400,
    "price": 375,
    "screen": "4.7' IPS",
    "capacity": "32GB",
    "color": "black",
    "ram": "2GB",
    "year": 2016,
    "image": "img/phones/apple-iphone-7/black/00.jpg"
  },
  ```
  ## Get /path to image

  Use path to image in `public` forlder 

  Example: `img/phones/apple-iphone-7/black/00.jpg`

  > img folder [here](https://github.com/mate-academy/product_catalog/tree/main/public/img)