## `/signup` POST endpoint

    {
        "username": <username>,
        "rollNo": <rollno>,
        "name": <name>,
        "password": <password>
    }

Some values are redundant and thus need to be dropped after completing the scrapping of user details.

## `/login` POST endpoint

    {
        "username": <username>,
        "password": <password>
    }

## `/course/<courseID>/addReview` POST endpoint

    {
        "review": <review>,
        "rating": <rating>
    }

## `/course/<courseID>/addToFavourite` POST endpoint
 
This endpoint doesn't entertain any request body. 



## `/course/add` endpoint

    {
        "cs253a": "Software Development and Operations",
        "cs220a": "Computer organization",
        "iitk101a": "Kholo Be"
    }