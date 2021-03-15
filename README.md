**Локальный деплой проекта**

Создаем базу данных и пользователя

`sudo -u postgres psql`

`postgres=# create database casein;`

`postgres-# create user casein with password 'password';`

`postgres-# grant all privileges on database casein to casein;`

Создаем в директории CaseIn файл local_settings.py по образу и подобию local_settings_example.py

Компилируем фронт

`cd frontend`

`npm run build`

Проводим миграции
`./manage.py collectstatic`

`./manage.py makemigrations`

`./manage.py migrate`

Запускаем

`./manage.py runserver`