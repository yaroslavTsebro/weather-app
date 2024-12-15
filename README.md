How to run:
docker compose up --build

Extra:
1. added config module
2. added hash module (as for me its better to use argon2 or node:crypto, but didnt have enough time)
3. added jwt module
4. added 2 token auth (email + google oauth)
5. added favorites module
6. added cron job for deletion not relevant data
7. used strategy pattern
8. changed logger to winston impl (not enough time to add custom impl)
9. Gateway (nginx)
10. Others

What could be done to improve code quality:
1. move using nest exceptions into using custom exceptions (now its 30%)
2. tie more to interfaces 
3. add more tests
4. check code after some amount of time and make changes
5. create separate env's
6. configure ci/cd (i could do it me)

Task:

Створити проджект на nest який буде фетчити дані із
https://openweathermap.org/api/one-call-3#current
І записувати в БД
Продежект повинен мати 2 доступні АПІ
 - POST який приймає lat, lon, part витягує дані із weatherAPI і записує в БД
 - GET який приймає дані lat, lon і part і по цим даним витягує дані із БД і повертає
у відповіді
Вимоги до проджекта
 - для GET АПІ використовувати interceptor nest для форматування відповіді у вигляді
{
 "sunrise":1684926645,
 "sunset":1684977332,
 "temp":292.55,
 "feels_like":292.87,
 "pressure":1014,
 "humidity":89,
 "uvi":0.16,
 "wind_speed":3.13
}
 - продект повинен мати Dockerfile і запускатись під докером
 - в якості БД використовувати Postgres дані можна зберігати в JSON форматі
 - unit tests опціонально
