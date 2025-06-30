<h1>Data Analasis web app for Hospitals</h1>
<p><i>web app for importing, validating and controling the flow of data withing the labaratory tests that the hospital makes</i></p>
<br>
<h2>Goal</h2>
<p>Full control of the labaratory tests withing the hospital, importing tests, checking and validating, changing and sending back to the main server app.</p>
<br>
<h3>States:</h3>
<p>
1. Login State<br>
2. Home State<br>
3. Kontrolni Uzorci<br>
4. Analizator Testovi<br>
  4.1. Arhiva testova<br>
  4.2. Lista Validiranih Testova<br>
5. Karton Pacijenta<br>
6. Liste<br>
7. Registar pozitivnih Davatelja<br>
8. Šifrarnik
</p><br>
<h2>App Structure</h2>
<br>
<h3>Back-End</h3>
<p>
The back-end is developed with <b>Java</b> in then environment of  <b>spring booth</b>.<br>
Its connected with the local MySQL database. Most of the work in terms of search engines with specific terms is done through the backend system.
</p>
<br>
<h3>Front-End</h3>
<p>
  The front-end is created using <b>Typescript</b> and <b>Angular</b> environment. With the use of HTML and CSS.
</p>
<br>
<h3>Database</h3>
<p>The database is created using MySQL, and its mostly controled using MariaDB. Inside the database system there are multiple triggers that distribute data withing the repositorys. The machines that conduct the tests are sending unfiltered data that with the triggers we can distrubute in the right slots inside the right repository.</p>
<br>
<img src=""
