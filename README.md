# ORGANISE
The following is an app designed to help clients organise themselves on a day to day basis. 

## Background

The app consists of the following features

*  Dashboard - shows the current weather and the top two results from functions below
*  Calendar - different views, add important events
*  Todo - keep track of smaller tasks that need to be done
*  Social - top news headlines of the day

## Build

The app uses a few external components to run as it does. The following are:

* Back4App Parse Server -> This is the main storage/database for the app, it is an open source server that is highly customisable and very lightweight. This is used for storing user information, calendar events and todo events.
* OpenWeatherMap -> This is where the information about the weather shown on the dashboard is taken from.
* GoogleNews -> This is where the information for the top news headlines are taken from.

## Architecture

This app is built using good software architecture. It complies to a three-tier software architecture with the following tiers being

1.  Presentation Layer -> Information is displayed to the DOM primarily through HTML
2.  Application Layer -> Consists of the *name.page.ts, consists of all the business logic behind the app
3.  Data Layer -> Services that the app uses, these deal with the raw data both internally and externally along with API calls 

## Running 

The app can be easily ran by firstly installing the required dependencies `npm install` followed by `ionic serve`.