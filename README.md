# News Application

## Goal

_Create a simple NEWS APPLICATION to showcase your frontend development skills with SEO considerations_

-   Users can perform CRUD
-   Use any technology for the backend

## [Deployed URL](https://news-app-rho-ten.vercel.app/)

-   The website is currently deployed on [Vercel](https://vercel.com/). I particularly chose this provider over others because it provides ease of integration with nextjs and has built-in CI/CD and Preview mode for every pull request that you create from the repo.

## [Documentation](https://www.notion.so/Documentation-4edbda7feacb49ef83d6a14e631370d6)

-   Briefly outlines what the users can do and how to do it

## Tech Stack

-   [NextJs](https://nextjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Chakra UI](https://chakra-ui.com/)
-   [Supabase](https://supabase.com/)
-   [Cloudinary](https://cloudinary.com/)

NextJS and Typescript goes along pretty well and is a deadly combination when used right. I used it for this particular application because of the different fetching it provides which I can use to tailor custom solutions for each of my page. This stack also provides ease support for SEO.

I used Chakra UI for this project because it provides smooth and a rapid development experience. I didn't used styled-components in this situation (which is usually my go to) because of the time constraint. Creating styles from scratch can be quite a lengthy process.

For the backend (database and asset management) I used supabase and cloudinary. Supabase is a firebase alternative which I'm not familiar with but I've been wanting to use. It uses postgres under the hood. And I thought this application might be a perfect excuse to create something with it.

Project Toolings Used:

-   [ESLint](https://eslint.org/) ( Linting )
-   [Prettier](https://prettier.io/) ( Code Consistency)
-   [Husky](https://typicode.github.io/husky/#/) ( pre-commit hooks )
-   [lint-staged](https://github.com/okonet/lint-staged) ( run linter tasks )

## [Design File](<https://www.figma.com/file/r50L1Eex0canW5fiAGCug5/Chakra-UI-Figma-Kit-(Community)?node-id=822%3A9256>)

-   Before I started coding the application, I tried to create a rough design for mobile, tablet, and desktop screens and broke down the requirements into components. I used Chakra UI component library in figma to make the design a lot more consistent

## [Database diagram](https://dbdiagram.io/d/6212ddd6485e433543e778e8)

-   To visualize the relationships of the tables in my database. I created a visual diagram.

## Performance

-   I used lighthouse to assess the performance of my application. Here are the different screens and performance:

### **Home**

![home](https://res.cloudinary.com/dlfecpmkj/image/upload/v1645406788/bvt8vgtsgpkzs3ne5x6u.png)

### **Detail Page**

![detail page](https://res.cloudinary.com/dlfecpmkj/image/upload/v1645407191/zkwtg14ra4umlujiislq.png)

### **Profile Page**

![profile page](https://res.cloudinary.com/dlfecpmkj/image/upload/v1645408319/lomxnryov45lzaqzbamr.png)

-   These metrics are not final and varies depending on the browser, the machine, and the connection speed of the user.

## Security Analysis

-   One of my concern I have at the moment is the parsing of my html text passed in my WYSIWYG editor. It might contain malicious scripts that can be executed at the background. This is entirely possible and definitely there is more room for improvement around this.

-   The authentication I implemented is not rock solid and is only the bare minimum for simple applications, this can be exploited and thus needs more secure improvements.
