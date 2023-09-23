# pizzaportal
Purpose of this project was to learn how to make API. All API routes was make with express. Database is MongoDB and I use mongoose to maintain it easily.



Main functionality:  
- Create users, delete and change values. Create session token via jsonwebtoken.
- Create orders and delete it.
- Make menu and render on client side atumaticly.

Routes in API:

1. employee
   - PUT (Put users in database)
   - POST (Login to admin panel)
   - DELETE (Delete user)
   - GET (Get all users)
   - PATCH (Patch user)
2. menu
   - PUT
   - DELETE
   - GET
   - PATCH
3. orders
   - PUT
   - DELETE
   - GET
   - PATCH
   
Admin panel is in route "/admin".

# All dishes are sort and render automatically by category.
![Zrzut ekranu z 2022-01-18 16-32-45](https://user-images.githubusercontent.com/22731382/149967884-9220bf2b-a40f-4b2a-8757-8aed6dfc4b76.png)

