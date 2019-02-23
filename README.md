# TrelloLight
TrelloLight is a minimalist project management tool inspired by the application Trello.

## Getting Started
To install this application on your desktop, you need to have npm, pip, and virtualenv installed.
Start by cloning the project : 
```bash
git clone git@github.com:adele-galteau/TrelloLight.git
```
## Installing
First, you need to create a dev env/ folder into back/ folder:
```bash
cd TrelloLight/back/
virtualenv env -p python3
```
Then:
```bash
source env/bin/activate
pip install -r requirements.txt
python manage.py db upgrade
python manage.py fixtures
python manage.py runserver
```
And in an other shell:
```bash
cd TrelloLight/front/
npm install
npm start
```
Finally, open your brower at http://localhost:8080

Enjoy !
