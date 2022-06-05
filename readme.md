# Full Stack Web Development - Assignment 1 (Placemark)  
# Project Name: CraftSpot  
## Project Description:
CraftSpot is a place for you to keep track of your favourite craft spots i.e. shops, exhibitions, classes and more. Sign up and make a list of your favourite crafts, then delve a little deeper and save details of where you can find the best yarn, knitting classes, sewing workshops etc. Keep all this info in one place so you can come back to it any time.

## Project Update:
This project has been updated for use as a backend api with a svelte frontend created separately.

### The following technologies have been used in the making of the CraftSpot web application:
* node.js, 
* Hapi
* Handlebars
* MongoDB
* Mongoose
* Cloudinary
* Glitch
* Heroku
* Git/GitHub
* JWT
* Joi
* Bulma
* Fontawesome
* Chai
* Mocha
* Swagger
* Svelte
* Leaflet
* Frappe Charts

## Project Status: Deployed 
* Heroku : https://limitless-cliffs-75212.herokuapp.com/documentation
* AWS: http://18.206.159.230:4000/documentation
* Netlify (Frontend svelte application using placemark API) : https://craftspot-svelte.netlify.app/ 

## Features
* CRUD Functionality for user, craft and spot details.
* Upload/delete image functionality on Spot View page for multiple images. 
* Gallery page with all Spot images included.
* Admin User can see data analytics and user list. Can delete a user.
* API Endpoints and Tests.
* JWT Security.
* Database Seeding.
* Security features such as sanitization and hashing and salting of passwords.
* Charts showing relevant application data.
* Spots (POIs) shown on a map, with map layers based on categories.

## Visuals
### Swagger Documentation:

![image](https://user-images.githubusercontent.com/76408967/172056684-90d51f99-9124-4f61-a73b-3aa547a71c17.png)

### Homepage:

![craftspot-homepage](https://user-images.githubusercontent.com/76408967/160115349-6fbda564-4eb0-4134-b36f-f936d7b73576.PNG)

### User dashboard:

![craftspot-user-dashboard](https://user-images.githubusercontent.com/76408967/160115394-5c26fdd3-34fd-43ee-aa7a-65630c4e7a8f.PNG)

### User Spot List:

![craftspot-user-spotlist](https://user-images.githubusercontent.com/76408967/160115415-0c909429-1729-4c04-9786-d776a07040d0.PNG)

## Roadmap
Possible future additions:
* Allow a user to list and track their craft projects.
* Allow a user to their Spot locations on a map. (Now included)
* Allow all users to see all available locations (list/map). (Now included)

## References
Helpful online resources used in this project:

* https://github.com/antoniogiordano/hacli - admin authorization (rbac).
* https://www.npmjs.com/package/hapi-error?activeTab=readme hapi error plugin.
* https://bulma.io/documentation/form/select/ Bulma use of select option for categories drop down menu.
* https://mongoosejs.com/docs/api.html#query_Query-lean Mongoose lean documentation.
* https://cloudinary.com/documentation/image_upload_api_reference Accessing cloudinary public_id for use in delete functionality.
* https://akhromieiev.com/tutorials/using-cors-in-hapi/ CORS in Hapi

