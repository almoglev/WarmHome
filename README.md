# WarmHome

WarmHome is your platform to find & list houses for sale or for rent.<br />
It's a hands-on React with Firebase v9 project I developed while self-learning the course [React Front To Back 2022](https://www.udemy.com/course/react-front-to-back-2022/) by Brad Traversy on Udemy.<br />
The application uses the Context API along with the useContext and useReducer hooks for state management.

👉 [Click here]() for live demo!


## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will add a lat/lng field to the form.

### Run

```bash
npm start
```