# A cool recipe app

Created for the Everlywell coding challenge. 

## Technologies
- `create-react-app` - Allows us to quickly bootstrap a React application
- `react-router` - For routing
- `Material UI` - Using a component library lets us scaffold a frontend quickly and affords a high level of future maintainability.
- `Typescript` - Just awesome in general

## Methodologies

### State Management

The state of this application is kept purposefully simple with hooks and passing props. I also considered:

* Context: The Context API is a great solution to prop drilling, however the simplicity of this application allows us to maintain a very flat component structure which makes Context a much less desirable choice for state management.
* Redux: Next step if this app were more complicated in my opinion. I wrote things in a way that would make it relatively easy to extrapolate into Redux reducers. Great for separating state management concerns from the component level.


### Design
`Material UI` was used as a component library, with modifications made to follow given design guidelines using `Material UI`'s implementation of `styled-components`. `styled-components` is a great choice when used along with an existing component library with how it keeps CSS scoped while implementing an extensive featurelist (theming, SCSS, mobile friendly, etc.) I also personally find it much more readable than something like CSS modules (`<DarkHeader />` vs `<Header className={header.dark} />`)


## TODOs:

* Fully flesh out desktop design
* Add accessibility (missing `aria` attributes, some elements need to be replaced with more semantic counterparts like buttons)
* Clean up component files by extrapolating styles and logic
* Add error handling
* Testing!



```                             .,
                     ...,     .+D     `.V!
               ..JgMMMMM!    .M#`  ` .dF       .
            .JMMMMMMMMM%    dMM'    JM#     .+F
         .J,.TMMMMMMMM#    dMMF    JMM:    JMF
       .dMMM@  `TMMMMM@   JMMM:   .MMF    dMM`    .#^`
      .MMMMMr     `TMM# `.MMMM:  .MMM:   JMMF   .dM'       ` .
     .MMMMMML       ..= MMMMMM'JMMMM#!...MMM%  .MM%    `.JNM@'
    .M^,MMMMMe   ` .MMb MMMM3.rdMM#1+,JMMMMY`.JMMM:   .+MM#'
   .MMNbJMMMMMN...MMMM# MMM%.M%?M#.MM;JMMM!d%dMMM=.,.NMMMB
   .MMMMMMMMMMMMMMMMMM% ?Y7.MMr   ,MMr   `JMr,YW'JMFJMM@..,
   .TMMMMMM2    ?TMM9!     .MM@    dMb    `Mb    ?Mr.T9.MMN,
    ...J7TY9   JaJ..        JMN.   .MN.    WN     Wb   .TMMMJ
     dMNJMN.JgMMMMN,         MMr    ,Mb`    Wl     T       `?'
       7MMMMMMMMMMMN,        .MN.    .Wl     7
          ?THMMMMMMMMN,       .Hb      ?
                ?TWMMMMMx       T,`
```
