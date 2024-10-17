# Usecase
A reactJs application has following features:
1- Fetching data from TMDB_REST_API and displaying movies on screen along with name, titleimg and release_date...
2- User can search movies by unique ID
3- User can move to next/ previous page along with results
4- User can filter data by release_date, recent_releases, popularity and reviews

# Technical Terms
1- Used axios to for API requests
2- MaterialUI for better User EXperience
3- App Components are Functional based components with useEffect, usestate implementation
4- Parent and Child components exchnaging data & callbacks using props

# Components Used
There are 4 components
1- Interface (Parent)
2- Movie(Child)
3- Pages(Child)
4- SortBy(Child)
# Components Workflow
1- Interface is responsible for initial rendering and fetching data from API, It also implements the searchBar for ID search.
2- Movie is responsible for data display using props along with image URl generation for title images
3- Pages is responsible for checking if we can move next or previous page
4- SortBy is responsible for getting input from user and fetch data accordingly using query_params
