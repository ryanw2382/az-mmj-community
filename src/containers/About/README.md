# Project Plan


## 1. Introduction 
*In this section provide an introduction to the project. This can be similar to a summary of the vision document. Provide the information needed to understand the project. What problem are you trying to solve?*

This app is meant to bridge the gap between perception and reality regarding the legal cannabis industry here in Arizona.

While our main focus will ultimately be on making sure we provide the most up to date data and information for patients and consumers, the chat is meant to be a forum for users to interact with each other for information not readily available yet though our app.

Our group project is the starting build for an app for the legal cannabis industry which will look at automating state compliance requirements for dispensaries with the end goal of freeing up the heavy time commitments to focus on providing a better experience for patients. 

## 2. Description


### 2.1 Overview
*In this section provide an overview of the development plan. How will development be conducted? What will be developed first? Are there any special considerations that need to be accounted for before, during or after development?*

Development will be conducted daily to ensure that product is finished in time.
We have an extremely reduced time period to get the project up and running and will be utilizing a lot of Google Cloud products to speed up our development time.

### 2.2 Organizational Diagrams
*Use this section to provide any diagrams or illustrations that accompany the development plan.*

### 2.3 Details
_Encouraged to use a project management tool like Trello or other to organize, track progress, and delegate responsibilities._ 
*This section, including following sections and subsections, will provide any in depth detailing about the plan that are required in order to outline the development procedure and process. What is the order in which the components will be worked on and why?*

Since our team is extremely small, we will be relying more on constant communication and GitHub to manage our project and to stay up to date with code that each of us develops.  The main features / functionality that has been built into the app are as follows:

* **App Shell** - The shell of the app.  
* **Dashboard (Admin Only)**- To be able to view some statistics about user registrations and current user counts.  This is not a separate view only visible by routing, this is a view that requires you to be an admin to be able to access it... period.
* **Chat**
  * **Private** - Anyone can privately chat with another app user.  Cloud functions send you a desktop alert if someone sends you a private message when your app is in the background.
  * **Public** - A Chat-room meant for people to ask others within the community questions and to bounce ideas off each other and to clarify something that they might not be sure about.
  * **Predefined Chat Message List (Admin Only)** - Predefined messages can be sent in both private and public chat but only admin can access, add, edit or delete messages available to everyone.
* **A Tasks list (Admin Only)** - That shows the tasks by title, but allows you to add details to it when you click on it, assign a "Helper"(which pulls up a list of registered users), and replaces the avatar of the person who created the task with a green check mark when the task is marked as completed.  Also, only the user that created the task is able to delete it. Also, have a cloud function that sends out a desktop notification to people that are subscribed to receive it when a new task is created.
* **Cannabis** - These pages are meant to provide information for the consumer on the most popular of these products. Information will include the different effects that particular strain produces when consumed and what medical benefit they provide to the patient.  Currently this is also the list that will end up going under admin for us to manage and then display completely differently on these pages.
  * **Flowers** - Displays information on popular cannabis flowers. Have added sample data.
  * **Edibles** - Displays information on popular cannabis edibles.  Have added sample data.
  * **Extracts** - Displays information on popular cannabis extracts.  Have added sample data.
* **About Page** - Page that takes a README.md file and displays it on the page.  Figured this would be a good way to provide information about the project for the demo.  Will be changed as we continue to work on the app.
* **Contact Us Page** - Nothing special here.
* **Settings**
  * **Theme** - Allows the user to change the appearance of the app.  This is only for their local state.  So its a personal preference on how they want to view the site.
  * **Language** - Have language support for currently 4 languages and as we build out more features, we have to continuously make sure those are all updated.  Right now they are for most of the app in English, but not German, Bosnian, Russian.  Will be adding Spanish language support as the next language.
* **Administration (Admin Only)**
  * **Users** - Allows us to view ALL registered users and the last time they were online, this list can be searched, sorted and filtered by both Name and Email.  When a user is selected, we can make view their information, make them an administrator, add them to a Role, or give them select grants to do certain functionality.
  * **Roles** - Used for creation of new Roles which is a collection of Grants. So i could specify that managers can create, view, edit, or delete cannabis products but a supervisor can only create, view or edit and assign that group of Grants to that user. Or, if you want to have an elevated user tier where they can edit the content but not create new content or delete existing.
  * **Dispensaries** - A place for us to add in dispensaries or edit/delete which will (in the future) automatically update the Points on the Map.
* **My Account** - Page that you can go to update your Name, display image and the email thats on file, if you did not use an oAuth provider to login, you can also change your password here.  You can also choose to delete your account from this page as well.  That action signs you out, and sends an email confirming that the account has been deleted.  Cloud functions send the email, and update the total user count for display on the admin dashboard.
* **Firebase Authentication** - Utilizing secure account creation with firebase and oAuth providers to manage user accounts.
* **Firebase Real-time Database** - This is where most of our data is stored and is instrumental when integrated with React for persisting state.  Also would not be able to build out our "presence" system without it.  Presence refers to within our chat pages and our user management displaying and keeping track of if a user is online, or when the last time a user was online.  Can do fun things like create a cloud function that sends an email to a user when they have not logged into the app  for the past X days.
* **Firebase Storage** - Underlying technology is Google Cloud Storage. Used for support of sending images and files within both the private and public chats, storage for profile images and other images, with buckets explicitly set for each category of image.
* **Firebase hosting** - Firebase hosting provides a free tier and a paid tier for deploying and hosting apps.  All tiers have full SSL support and a free sub-domain to host your app on.  New tech is requiring everything to be secure now.  Even Google is giving higher priority in their search results for apps that are served over HTTPS only.
* **Firebase Cloud Functions** - After figuring it out a little bit, we added functionality for things like onNewUserCreation - send welcome email, email verification on accounts created with just an email an a password, lost password email, send email on account deletion saying we have officially deleted their account, when a new message is received in chat - sends a desktop notification to that user(if enabled when logging into the app for the first time).
* **Google Maps** - We created a map and integrated it with our app to display locations of Legal Medical Marijuana Dispensaries within Arizona, we also added some location information for places that doing MMJ Card Certification and some legal smoke shops for finding accessories to help them with administering their medication.
* **Service Workers** - Setup to support off-line use of the app.  The service worker caches that app data locally so if you lose your internet connect, thats where its served from until it can re-establish your connection. Then it checks to make sure you have the most up to date version of the content you are viewing.
* **WebApp Manifest** - This guy is really cool.  When you view the site on mobile for the first time, you will first be asked to allow notifications.  When allowed, you will be prompted to add the app to your home-screen.  If you select yes, it will download and link an image with the title Arizona Cannabis onto your home screen for quick and easy access.  On Android what this means is that you have an icon that makes it look like an app, on your home screen, that when you click, opens up the web app but for all intents and purposes looks, acts, and seems like it's a native app that you installed from the Google Play Store.  If you go to your apps list on your phone, it will be right up there at the top - Arizona Cannabis.  Will even show app stats like native ones do.  Who needs to build apps for the play store... Get the same features with a lot less hassle.


#### Stretch Goals:
* add in support for different locales(Done)
* Build out a presence system(Done)
* Start planning out business requirements


## 3. Team


#### Members: 
*List the team members*
* Andrew Peterson
* Ryan Wilson

#### Roles:
*List each team members role to be performed during the development*
   
#### Team Assignments:
```
| Member name     | Role                   |
|-----------------|:----------------------:|
| Andrew Peterson | Developer              |
| Ryan Wilson     | Project Manager        |
|             	  |                        |
```
## 4. Estimates and Deadlines
*List here rough estimates for time and code. These should provide a course outline for the required man power for the project.*
* Links and invites to whatever project management tool you're using. (Trello, Zenkit, or whatever works for your team [alternatives](https://www.workzone.com/blog/trello-alternatives/))
* Submit Retro doc to instructor every friday.

#### Project will take approximately two weeks to complete
* first day: Setting up project repo assigning tasks.
* day two - five: working on different components.
* day six - ten: finishing up code and working on presentation




# Minimum Project requirements
* Full CRUD on as least 2 entities
* At least 1 one-to-many relationships
* Two types of user roles, for example standard and admin.
* Instructor approval
* Super rad and fun!