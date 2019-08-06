[![Build Status](https://travis-ci.com/sebastianhaberey/react-timesheet.svg?branch=master)](https://travis-ci.com/sebastianhaberey/react-timesheet)

# react-timesheet

Drag and drop your monthly CSV time data into this react app to display a printable,
formatted time sheet. Intended for freelancers like me who keep track of their 
project hours using apps such as 
[Time Recording Pro](https://play.google.com/store/apps/details?id=com.dynamicg.timerecording.pro).

Sadly, it's currently only available in German.

## Demo

Try it [here](https://timesheet.haberey.com/).

## Screenshot (App)

![Screenshot](https://raw.githubusercontent.com/sebastianhaberey/react-timesheet/master/doc/screenshot.png)

## Screenshot (Printing with Chrome)

![Printing](https://raw.githubusercontent.com/sebastianhaberey/react-timesheet/master/doc/printing.png)

## Input File Format

The app expects a valid CSV file and will use the first date column matching format **MM.DD.YYYY**
and the first duration column matching format **HH:MM**. If there is a header row
or totals row, they will be ignored.

## Bank Holiday Region

Bank holidays displayed in the calendar are those of Berlin area. 
The bank holiday region can be changed by specifying an URL parameter like so:

https://timesheet.haberey.com/?region=BW

For a list of valid region codes see https://feiertage-api.de/. BTW, thanks for providing this service, guys!
