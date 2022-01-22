# WarmHome

WarmHome is your platform to find & list houses for sale or for rent. You can sign in using your email or via Google OAuth, then you can list your house and give it an offer or discount. In addition, you can upload photos of the property and it'll be saved to Firebase storage.<br />
It's a hands-on React with Firebase v9 project I developed while self-learning the course [React Front To Back 2022](https://www.udemy.com/course/react-front-to-back-2022/) by Brad Traversy on Udemy.<br />

👉 [Click here]() for live demo!


## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will add a lat/lng field to the form.

### Run

```bash
npm start
```
