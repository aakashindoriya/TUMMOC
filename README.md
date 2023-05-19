# TUMMOC
## Note :- 
          setting up cookies in deployed link is not working at this moment please clone the project and test it locally 😊
## Deployed Backend URL: [https://tummoc-production.up.railway.app/](https://tummoc-production.up.railway.app/)

## Deployed Frontend URL: [https://tummoc-aakashindoriya.vercel.app/](https://tummoc-aakashindoriya.vercel.app/)

To test this app locally, please follow the instructions below:

1. Frontend Setup:
   - Create a `.env` file in the frontend directory.
   - Add the following key-value pair to the `.env` file:
     ```
     REACT_APP_BASEURL="http://localhost:8080"
     ```
   - This sets the base URL for the frontend to `http://localhost:8080`.

2. Server Setup:
   - Create a `.env` file in the server directory.
   - Add the following key-value pairs to the `.env` file:
     ```
     MONGOURL="your-mongo-url"
     SESSIONSEC="aakash"
     JWT_SECRET="aaksh123"
     JWT_REFRESH_SECRET="dadidado"
     GOOGLEID="91641678163-4sac489efv75it7uehvj209c0sfhq0qk.apps.googleusercontent.com"
     GOOGLESEC="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"
     BASEURL="http://localhost:3000"
     ```
   - Replace `your-mongo-url` with the URL of your MongoDB instance.
   - These environment variables are required for the server to function properly.

**Note:** In the production app, some functionalities may not work as expected. To have the best experience, it is recommended to clone the repository and test the app locally.

Feel free to reach out if you have any questions or need further assistance!
