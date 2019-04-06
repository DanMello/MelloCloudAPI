# MelloCloudAPI

Back-end for https://www.mellocloud.com which is my personal website.

# What I learned

1. I learned how to serve all static assets with NGINX and use Node js just to handle api calls.

2. I learned how to rewrite the url based on user agent, for example for mobile my url changes to m.mellocloud.com

3. I learned how to use NGINX as a router which based on url it decides what to do. For mellocloud.com and m.mellocloud.com it just renders static assets, for api.mellocloud.com it send the request to my node js app at localhost:3000 and handles api calls. Also all http requests to port 80 get redirected to https at port 443.

4. How to store sensitive information using dotenv.

5. How to setup passwordless ssh to keep server more secure and a deploy user with fewer privileges running the app.

6. Learned how to update, delete, add, and get data from databases (mysql) using knex and raw sql code.

7. Leaned how to handle errors and success responses, parse and send json.

8. Learned how to setup https with Let's Encrypt and certbot.
