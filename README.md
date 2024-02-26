Для запуска проекта необходимо:

1. скачать пакеты npm i
2. запустить проект npm start
3. добавиться в mongodb

API:

1. Sneaks Api https://github.com/druv5319/Sneaks-API
2. MockApi: https://6559fa956981238d054d0040.mockapi.io/users

http://localhost:3000/\*

где \*:
login,register,admin,user,mockApi,sneakers

Обзор маршрутизации приложения
Это веб-приложение создано с использованием Node.js и Express.js, популярного фреймворка для веб-приложений. Система маршрутизации организована для обработки различных функциональностей и взаимодействий с пользователем. Внизу представлено краткое объяснение различных маршрутов в приложении:

Общие маршруты:

app.use("/", registerRouter);: Обрабатывает маршруты, связанные с регистрацией.
app.use("/", loginRouter);: Управляет маршрутами, связанными с входом пользователя.
Маршруты викторин:

app.use("/", quizRouter);: Занимается маршрутами, связанными с викторинами и оценками.
Маршруты администратора:

app.use("/admin", adminRouter);: Специфичные маршруты для административных задач и функциональностей.
Маршруты пользователя:

app.use("/user", requireAuth, userRouter);: Маршруты, специфичные для пользователя, требующие аутентификации.
Маршруты API кроссовок:

app.use("/", requireAuth, sneakersApi);: Маршруты, связанные с данными о кроссовках, требующие аутентификации пользователя.
Маршруты истории:

app.use("/", requireAuth, history);: Управляет маршрутами для истории пользователя, требующей аутентификации.
Маршруты мок-API:

app.use("/", requireAuth, mockApi);: Маршруты для мок-API или тестирования, требующие аутентификации.

Authentication and Authorization: 20%✅


1. User Registration:
   • Create a registration page where users can sign up by providing a username, password, and
   any other required information.✅

   • When a user registers, hash their password using bcrypt before storing it in the database along
   with other information like username, creation date, etc.✅
   • Ensure that the username is unique to avoid conflicts. ✅

2. User Login:
   • Create a login page where users can input their username and password. ✅
   • Retrieve the user's hashed password from the database based on the provided username.✅
   • Use bcrypt to compare the hashed password stored in the database with the password entered
   by the user during login. ✅
   • If the passwords match, authenticate the user and redirect them to the main page. ✅

3. Authentication Middleware:
   • Implement middleware to protect routes that require authentication.✅
   • This middleware should check if the user is logged in by verifying the presence of a session
   token or any other authentication mechanism you're using.✅
   • If the user is not authenticated, redirect them to the login page. ✅

4. Authorization:
   • Define user roles or permissions such as 'admin' or 'regular user'.
   20%✅
   • Store the user's role in the database.✅
   • Implement authorization checks on routes that require specific permissions.
   • For example, only allow administrators to access the admin page or perform administrative ✅
   actions.
   It is essential that your admin username is your name. Additionally, include detailed password
   information in the README file.✅
   Note: Execute your logic within the core JavaScript file of the server

REST API: 35%✅

Implement a functionality within your admin page enabling the addition of new items related to
your topic to your main page. Each item should include three pictures, two names for localization
in different languages, two descriptions for localization, and timestamps for creation, update, and
deletion. Admins should be able to edit, delete, and add these items. On the main page, display
these items in well-designed blocks, each featuring a carousel showcasing the three pictures.
Ensure that each block also displays the name and description of the item. ✅


APIs: 30% ✅
Add two different APIs related to your topic. Implement multi-language support, allowing users
to select their preferred language for a personalized experience.
Note: If your APIs were previously focused on mapping, weather, or geolocation, you'll need to
replace them with new ones that offer valuable data and differ from your API choice.

Project Organization and Design 15%✅
Clean Code and Project Structure:
Keep your code clean, well-documented, and organized. Follow best practices for coding and
maintain a clear project structure that you learned from previous assignment. (readme file)
Responsive Design and User Interface:
• Enhance the user interface with thoughtful design elements, making the application visually
appealing with EJS.

Overall you can get 100%

Bonus task. Add this to your navbar as “Bonus”.✅

To clarify, students must fully implement both parts of the bonus task in order to receive any
marks for it. Each part is considered essential for the completion of the bonus task, and partial
implementation will not be awarded any points.

1. Timed Quizzes (at least 5 questions): 10%
   • Implement a countdown timer for each quiz session, allowing users a limited amount of
   time to complete the quiz.
   • Display the remaining time to users and automatically submit the quiz when the time
   runs out.
   • Provide feedback to users on whether they completed the quiz within the time limit.
2. Social Sharing:
   • Integrate social media sharing buttons (e.g., Facebook, Twitter, LinkedIn) within the
   quiz interface.
   • Enable users to share their quiz results or invite friends to participate in the quiz.
   • Include dynamic sharing content, such as a summary of quiz performance or an
   intriguing quiz question, to encourage engagement.
   Note: Store quiz questions, answer options, correct answers, and related metadata (e.g.,
   category, difficulty level) in MongoDB Atlas.
