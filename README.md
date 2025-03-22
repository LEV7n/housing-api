# housing-api

install:
npm i
php artisan migrate
php artisan db:seed --class=HousingSeeder

run:
php artisan serve
npm run dev
