-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test@user.com'
        ),
       ('test2user2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test2',
        'User2',
        'test2@user2.com'
        );

INSERT INTO companies (name, url, address, lat, lng, username)
VALUES ('Saiko Sushi Coronado',
        'http://saikosushisd.com/',
        '116 Orange Ave, Coronado CA, 92118',
        32.6987, 
        -117.173,
        'testuser'
        ),
       ('The Fishery',
        'https://www.thefishery.com/',
        '5040 Cass St, San Diego CA, 92118',
        32.80069,
        -117.2547,
        'test2user2'
        );

INSERT INTO jobs (position, hourly_pay, date, company_id)
VALUES ('prep cook',
        14,
        '2021-06-22',
        1),
        ('dishwasher',
        14,
        '2021-06-22',
        1),
        ('line cook',
        16,
        '2021-06-22',
        2);
