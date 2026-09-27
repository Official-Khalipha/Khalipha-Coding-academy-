// ============================================================
// KHALIPHA CODING ACADEMY
// COMPLETE SCRIPT.JS
// ============================================================

// ============================================================
// JAVASCRIPT TEST
// ============================================================

// Wannan yana tabbatar da cewa JavaScript ya loda lafiya.
// Idan komai ya yi aiki, za ka ga wannan message sau ɗaya.
// alert("JavaScript is working!");


// ============================================================
// HAMBURGER MENU
// ============================================================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

// Buɗe ko rufe hamburger menu
if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

// ============================================================
// RUFE MENU BAYAN AN DANNA NAV
// ============================================================
if (navLinks) {
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (item) {
        item.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
}

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Your message has been sent successfully!");

        contactForm.reset();
    });
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ============================================================
// DARK MODE
// ============================================================
const darkModeBtn = document.getElementById("dark-mode-btn");
if (darkModeBtn) {

    // Duba ko an taba kunna Dark Mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️";
    }

    // Canza Dark Mode
    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeBtn.textContent = "🌙";
        }
    });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealElements = document.querySelectorAll(
    ".course-card, .about-content, .about-image, .contact-info, .contact-form-container"
);
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.15
        }
    );
    revealElements.forEach(function (element) {
        element.classList.add("scroll-reveal");
        revealObserver.observe(element);
    });
}

// ============================================================
// STUDENT REGISTRATION
// ============================================================
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const fullnameElement = document.getElementById("fullname");
        const emailElement = document.getElementById("register-email");
        const passwordElement = document.getElementById("register-password");
        const confirmPasswordElement = document.getElementById("confirm-password");
        if (
            !fullnameElement ||
            !emailElement ||
            !passwordElement ||
            !confirmPasswordElement
        ) {
            return;
        }
        const fullname = fullnameElement.value.trim();
        const email = emailElement.value.trim();
        const password = passwordElement.value;
        const confirmPassword = confirmPasswordElement.value;

        // Duba ko password ɗin sun yi daidai
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Duba ko akwai wannan email ɗin a baya
        let students = JSON.parse(
            localStorage.getItem("students")
        ) || [];
        const existingStudent = students.find(function (student) {
            return student.email.toLowerCase() === email.toLowerCase();
        });
        if (existingStudent) {
            alert("This email is already registered!");
            return;
        }
        
        // Ƙirƙiri sabon student
        const student = {
            fullname: fullname,
            email: email,
            password: password
        };

        // Ajiye student cikin list
        students.push(student);
        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        // Ajiye current student
        localStorage.setItem(
            "student",
            JSON.stringify(student)
        );
        alert("Registration successful!");
        registerForm.reset();
    });
}

// ============================================================
// STUDENT LOGIN
// ============================================================
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const loginEmailElement = document.getElementById("login-email");
        const loginPasswordElement = document.getElementById("login-password");
        if (!loginEmailElement || !loginPasswordElement) {
            return;
        }
        const email = loginEmailElement.value.trim();
        const password = loginPasswordElement.value;

        // Karɓo duk registered students
        const students = JSON.parse(
            localStorage.getItem("students")
        ) || [];
        
        // Idan babu student
        if (students.length === 0) {
            alert("No registered account found!");
            return;
        }
        
        // Nemo student ɗin da email da password ɗinsa suka dace
        const student = students.find(function (student) {
            return (
                student.email.toLowerCase() === email.toLowerCase() &&
                student.password === password
            );
        });

        // Idan an samu student
        if (student) {
            localStorage.setItem(
                "student",
                JSON.stringify(student)
            );
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );
            alert("Login successful!");
            window.location.hash = "dashboard-section";
        } else {
            alert("Incorrect email or password!");
        }
    });
}

// ============================================================
// STUDENT DASHBOARD
// LOGIN STATE PROTECTION
// ============================================================
const dashboardSection =
    document.getElementById("dashboard-section");
const dashboardName =
    document.getElementById("dashboard-name");
const studentName =
    document.getElementById("student-name");
const studentEmail =
    document.getElementById("student-email");
const dashboardLogout =
    document.getElementById("dashboard-logout");

const isLoggedIn =
    localStorage.getItem("isLoggedIn");

if (dashboardSection) {
    if (isLoggedIn === "true") {
        dashboardSection.style.display = "block";

        // Karɓo bayanan student
        const studentData =
            localStorage.getItem("student");
        if (studentData) {
            const student =
                JSON.parse(studentData);
            
            if (dashboardName) {
                dashboardName.textContent =
                    student.fullname;
            }

            if (studentName) {
                studentName.textContent =
                    student.fullname;
            }

            if (studentEmail) {
                studentEmail.textContent =
                    student.email;
            }
        }

    } else {
        dashboardSection.style.display = "none";
    }
}

// ============================================================
// STUDENT DASHBOARD LOGOUT
// ============================================================
if (dashboardLogout) {
    dashboardLogout.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("student");
        if (dashboardSection) {
            dashboardSection.style.display = "none";
        }
        window.location.hash = "login-section";
    });
}

// ============================================================
// HTML LESSONS
// ============================================================
function showHtmlLesson(lessonNumber) {
    const lesson =
        document.getElementById(
            "html-lesson-" + lessonNumber
        );
    if (lesson) {
        lesson.style.display = "block";
        lesson.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function completeHtmlLesson(lessonNumber) {
    localStorage.setItem(
        "htmlLesson" + lessonNumber,
        "completed"
    );
    alert(
        "HTML Lesson " +
        lessonNumber +
        " completed!"
    );
}

// Nuna lessons da aka kammala
for (let i = 1; i <= 5; i++) {
    const lesson =
        document.getElementById(
            "html-lesson-" + i
        );
    const completed =
        localStorage.getItem(
            "htmlLesson" + i
        );
    if (lesson && completed === "completed") {
        lesson.style.display = "block";
    }
}

// ============================================================
// HTML QUIZ
// ============================================================
const submitHtmlQuiz = document.getElementById("submit-html-quiz");
const htmlQuizResult = document.getElementById("html-quiz-result");

if (submitHtmlQuiz) {
    submitHtmlQuiz.addEventListener("click", function() {

        // =========================
        // CHECK ALL HTML LESSONS
        // =========================
        let allHtmlLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            const completed = localStorage.getItem("htmlLesson" + i);

            if (completed !== "completed") {
                allHtmlLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // STOP QUIZ IF LESSONS ARE NOT COMPLETE
        // =========================
        if (!allHtmlLessonsCompleted) {
            if (htmlQuizResult) {
                htmlQuizResult.textContent =
                    "Complete all HTML lessons before taking the quiz.";
            }

            alert(
                "You must complete HTML Lessons 1–5 before taking the quiz."
            );

            return;
        }

        // =========================
        // CORRECT ANSWERS
        // =========================
        const correctHtmlAnswers = {
            "q1": "a",
            "q2": "b",
            "q3": "c",
            "q4": "a",
            "q5": "b"
        };

        // =========================
        // CALCULATE SCORE
        // =========================
        let htmlScore = 0;

        for (let question in correctHtmlAnswers) {
            const selectedAnswer =
                document.querySelector(
                    `input[name="${question}"]:checked`
                );

            if (
                selectedAnswer &&
                selectedAnswer.value === correctHtmlAnswers[question]
            ) {
                htmlScore++;
            }
        }

        // =========================
        // SHOW SCORE
        // =========================
        if (htmlQuizResult) {
            htmlQuizResult.textContent =
                "Your Score: " + htmlScore + "/5";
        }

        localStorage.setItem("htmlQuizScore", htmlScore);

        // =========================
        // CHECK PASS MARK
        // =========================
        if (htmlScore >= 4) {
            localStorage.setItem("htmlQuizCompleted", "true");

            alert(
                "Congratulations! You passed the HTML Quiz."
            );
        } else {
            localStorage.removeItem("htmlQuizCompleted");

            alert(
                "You scored " +
                htmlScore +
                "/5. Complete your study and try again."
            );
        }
    });
}

// ============================================================
// CSS LESSONS
// ============================================================
function showCssLesson(lessonNumber) {
    const lesson =
        document.getElementById(
            "css-lesson-" + lessonNumber
        );
    if (lesson) {
        lesson.style.display = "block";
        lesson.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function completeCssLesson(lessonNumber) {
    localStorage.setItem(
        "cssLesson" + lessonNumber,
        "completed"
    );
    alert(
        "CSS Lesson " +
        lessonNumber +
        " completed!"
    );
}

// Nuna CSS lessons da aka kammala
for (let i = 1; i <= 5; i++) {
    const lesson =
        document.getElementById(
            "css-lesson-" + i
        );
    const completed =
        localStorage.getItem(
            "cssLesson" + i
        );
    if (lesson && completed === "completed") {
        lesson.style.display = "block";
    }
}


// ============================================================
// CSS QUIZ
// ============================================================
const submitCssQuiz = document.getElementById("submit-css-quiz");
const cssQuizResult = document.getElementById("css-quiz-result");

if (submitCssQuiz) {
    submitCssQuiz.addEventListener("click", function() {

        // =========================
        // CHECK ALL CSS LESSONS
        // =========================
        let allCssLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            const completed = localStorage.getItem("cssLesson" + i);

            if (completed !== "completed") {
                allCssLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // STOP QUIZ IF LESSONS ARE NOT COMPLETE
        // =========================
        if (!allCssLessonsCompleted) {
            if (cssQuizResult) {
                cssQuizResult.textContent =
                    "Complete all CSS lessons before taking the quiz.";
            }

            alert(
                "You must complete CSS Lessons 1–5 before taking the quiz."
            );

            return;
        }

        // =========================
        // CORRECT ANSWERS
        // =========================
        const correctCssAnswers = {
            "css-q1": "a",
            "css-q2": "b",
            "css-q3": "c",
            "css-q4": "b",
            "css-q5": "a"
        };

        // =========================
        // CALCULATE SCORE
        // =========================
        let cssScore = 0;

        for (let question in correctCssAnswers) {
            const selectedAnswer =
                document.querySelector(
                    `input[name="${question}"]:checked`
                );

            if (
                selectedAnswer &&
                selectedAnswer.value === correctCssAnswers[question]
            ) {
                cssScore++;
            }
        }

        // =========================
        // SHOW SCORE
        // =========================
        if (cssQuizResult) {
            cssQuizResult.textContent =
                "Your Score: " + cssScore + "/5";
        }

        localStorage.setItem("cssQuizScore", cssScore);

        // =========================
        // CHECK PASS MARK
        // =========================
        if (cssScore >= 4) {
            localStorage.setItem("cssQuizCompleted", "true");

            alert(
                "Congratulations! You passed the CSS Quiz."
            );
        } else {
            localStorage.removeItem("cssQuizCompleted");

            alert(
                "You scored " +
                cssScore +
                "/5. Complete your study and try again."
            );
        }
    });
}


// ============================================================
// JAVASCRIPT LESSONS
// ============================================================
function showJsLesson(lessonNumber) {
    const lesson =
        document.getElementById(
            "js-lesson-" + lessonNumber
        );
    if (lesson) {
        lesson.style.display = "block";
        lesson.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function completeJsLesson(lessonNumber) {
    localStorage.setItem(
        "jsLesson" + lessonNumber,
        "completed"
    );
    alert(
        "JavaScript Lesson " +
        lessonNumber +
        " completed!"
    );
}

// Nuna JS lessons da aka kammala
for (let i = 1; i <= 5; i++) {
    const lesson =
        document.getElementById(
            "js-lesson-" + i
        );
    const completed =
        localStorage.getItem(
            "jsLesson" + i
        );
    if (lesson && completed === "completed") {

        lesson.style.display = "block";
    }
}

// ============================================================
// JAVASCRIPT QUIZ
// ============================================================
const submitJsQuiz = document.getElementById("submit-js-quiz");
const jsQuizResult = document.getElementById("js-quiz-result");

if (submitJsQuiz) {
    submitJsQuiz.addEventListener("click", function() {

        // =========================
        // CHECK ALL JS LESSONS
        // =========================
        let allJsLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            const completed = localStorage.getItem("jsLesson" + i);

            if (completed !== "completed") {
                allJsLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // STOP QUIZ IF LESSONS ARE NOT COMPLETE
        // =========================
        if (!allJsLessonsCompleted) {

            if (jsQuizResult) {
                jsQuizResult.textContent =
                    "Complete all JavaScript lessons before taking the quiz.";
            }

            alert(
                "You must complete JavaScript Lessons 1–5 before taking the quiz."
            );

            return;
        }

        // =========================
        // CORRECT ANSWERS
        // =========================
        const correctJsAnswers = {
            "js-q1": "b",
            "js-q2": "a",
            "js-q3": "c",
            "js-q4": "a",
            "js-q5": "a"
        };

        // =========================
        // CALCULATE SCORE
        // =========================
        let jsScore = 0;

        for (let question in correctJsAnswers) {

            const selectedAnswer =
                document.querySelector(
                    `input[name="${question}"]:checked`
                );

            if (
                selectedAnswer &&
                selectedAnswer.value === correctJsAnswers[question]
            ) {
                jsScore++;
            }
        }

        // =========================
        // SHOW SCORE
        // =========================
        if (jsQuizResult) {
            jsQuizResult.textContent =
                "Your Score: " + jsScore + "/5";
        }

        localStorage.setItem(
            "jsQuizScore",
            jsScore
        );

        // =========================
        // CHECK PASS MARK
        // =========================
        if (jsScore >= 4) {

            localStorage.setItem(
                "jsQuizCompleted",
                "true"
            );

            alert(
                "Congratulations! You passed the JavaScript Quiz."
            );

        } else {

            localStorage.removeItem(
                "jsQuizCompleted"
            );

            alert(
                "You scored " +
                jsScore +
                "/5. Complete your study and try again."
            );
        }
    });
}

// ============================================================
// CERTIFICATE ELIGIBILITY
// ============================================================
const certificateMessage = document.getElementById("certificate-message");
const certificateBtn = document.getElementById("certificate-btn");

if (certificateBtn) {
    certificateBtn.addEventListener("click", function() {

        // =========================
        // CHECK ALL HTML LESSONS
        // =========================
        let htmlLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("htmlLesson" + i) !== "completed") {
                htmlLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL CSS LESSONS
        // =========================
        let cssLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("cssLesson" + i) !== "completed") {
                cssLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL JAVASCRIPT LESSONS
        // =========================
        let jsLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("jsLesson" + i) !== "completed") {
                jsLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL QUIZZES
        // =========================
        const htmlQuizCompleted =
            localStorage.getItem("htmlQuizCompleted") === "true";

        const cssQuizCompleted =
            localStorage.getItem("cssQuizCompleted") === "true";

        const jsQuizCompleted =
            localStorage.getItem("jsQuizCompleted") === "true";

        // =========================
        // FINAL ELIGIBILITY CHECK
        // =========================
        const allCoursesCompleted =
            htmlLessonsCompleted &&
            cssLessonsCompleted &&
            jsLessonsCompleted &&
            htmlQuizCompleted &&
            cssQuizCompleted &&
            jsQuizCompleted;

        // =========================
        // SHOW ELIGIBILITY RESULT
        // =========================
        if (allCoursesCompleted) {

            certificateMessage.textContent =
                "Congratulations! You have completed all courses and passed all quizzes. You are eligible for your certificate.";

            certificateBtn.textContent =
                "Certificate Eligible";

        } else {

            certificateMessage.textContent =
                "You are not eligible yet. Complete all HTML, CSS and JavaScript lessons and pass all quizzes.";

            certificateBtn.textContent =
                "Not Eligible Yet";
        }
    });
}

// ============================================================
// CERTIFICATE ELEMENTS
// ============================================================
const generateCertificate = document.getElementById("generate-certificate");
const certificate = document.getElementById("certificate");
const certificateName = document.getElementById("certificate-name");
const certificateDate = document.getElementById("certificate-date");
const printCertificate = document.getElementById("print-certificate");


// ============================================================
// GENERATE CERTIFICATE
// ============================================================
if (generateCertificate) {
    generateCertificate.addEventListener("click", function() {

        // =========================
        // CHECK ALL HTML LESSONS
        // =========================
        let htmlLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("htmlLesson" + i) !== "completed") {
                htmlLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL CSS LESSONS
        // =========================
        let cssLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("cssLesson" + i) !== "completed") {
                cssLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL JAVASCRIPT LESSONS
        // =========================
        let jsLessonsCompleted = true;

        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem("jsLesson" + i) !== "completed") {
                jsLessonsCompleted = false;
                break;
            }
        }

        // =========================
        // CHECK ALL QUIZZES
        // =========================
        const htmlQuizCompleted =
            localStorage.getItem("htmlQuizCompleted") === "true";

        const cssQuizCompleted =
            localStorage.getItem("cssQuizCompleted") === "true";

        const jsQuizCompleted =
            localStorage.getItem("jsQuizCompleted") === "true";

        // =========================
        // FINAL ELIGIBILITY CHECK
        // =========================
        const allCompleted =
            htmlLessonsCompleted &&
            cssLessonsCompleted &&
            jsLessonsCompleted &&
            htmlQuizCompleted &&
            cssQuizCompleted &&
            jsQuizCompleted;

        // =========================
        // STOP IF NOT ELIGIBLE
        // =========================
        if (!allCompleted) {
            alert(
                "You are not eligible for the certificate yet. Complete all HTML, CSS and JavaScript lessons and pass all quizzes."
            );

            return;
        }

        // =========================
        // CHECK STUDENT ACCOUNT
        // =========================
        const studentData = localStorage.getItem("student");

        if (!studentData) {
            alert("Student account not found.");
            return;
        }

        const student = JSON.parse(studentData);

        // =========================
        // ADD STUDENT NAME
        // =========================
        if (certificateName) {
            certificateName.textContent = student.fullname;
        }

        // =========================
        // ADD CURRENT DATE
        // =========================
        if (certificateDate) {
            const today = new Date();
            certificateDate.textContent =
                today.toLocaleDateString();
        }

        // =========================
        // SHOW CERTIFICATE
        // =========================
        if (certificate) {
            certificate.style.display = "block";

            certificate.scrollIntoView({
                behavior: "smooth"
            });
        }

        // =========================
        // SHOW PRINT BUTTON
        // =========================
        if (printCertificate) {
            printCertificate.style.display = "block";
        }
    });
}

// ============================================================
// CERTIFICATE PRINT / SAVE
// ============================================================
if (printCertificate) {
    printCertificate.addEventListener(
        "click",
        function () {
            window.print();
        }
    );
}

// ============================================================
// CERTIFICATE ID
// ============================================================
const certificateId =
    document.getElementById(
        "certificate-id"
    );

if (certificateId) {
    let savedCertificateId =
        localStorage.getItem(
            "certificateId"
        );

    if (!savedCertificateId) {
        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );
        
        savedCertificateId =
            "KCA-" +
            new Date().getFullYear() +
            "-" +
            randomNumber;
        
        localStorage.setItem(
            "certificateId",
            savedCertificateId
        );
    }
    
    certificateId.textContent =
        savedCertificateId;
}

// ============================================================
// CERTIFICATE VERIFICATION
// ============================================================
const verifyCertificateId =
    document.getElementById(
        "verify-certificate-id"
    );
const verifyCertificateBtn =
    document.getElementById(
        "verify-certificate-btn"
    );
const verificationResult =
    document.getElementById(
        "verification-result"
    );

if (verifyCertificateBtn) {
    verifyCertificateBtn.addEventListener(
        "click",
        function () {
            const enteredId =
                verifyCertificateId
                    ? verifyCertificateId.value.trim()
                    : "";
            
            const savedId =
                localStorage.getItem(
                    "certificateId"
                );

            const studentData =
                localStorage.getItem(
                    "student"
                );
            
            if (enteredId === "") {
                if (verificationResult) {
                    verificationResult.textContent =
                        "Please enter a Certificate ID.";
                }
                return;
            }
            
            if (
                enteredId === savedId &&
                studentData
            ) {
                const student =
                    JSON.parse(
                        studentData
                    );

                if (verificationResult) {
                    verificationResult.innerHTML = `
                        <strong>Certificate Verified ✓</strong>
                        <p>Student: ${student.fullname}</p>
                        <p>Certificate ID: ${savedId}</p>
                        <p>Academy: Khalipha Coding Academy</p>
                        <p>Course: Web Development</p>
                    `;
                }
            } else {
                if (verificationResult) {
                    verificationResult.textContent =
                    "Certificate not found or invalid ID.";
                }
            }
        }
    );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
const totalStudents =
    document.getElementById(
        "total-students"
    );
const totalCourses =
    document.getElementById(
        "total-courses"
    );
const totalCertificates =
    document.getElementById(
        "total-certificates"
    );
const studentList =
    document.getElementById(
        "student-list"
    );

// Nuna students a Admin Dashboard
function displayStudents() {
    const students =
        JSON.parse(
            localStorage.getItem(
                "students"
            )
        ) || [];

    // Total students
    if (totalStudents) {
        totalStudents.textContent =
          students.length;
    }

    // Total certificates
    if (totalCertificates) {
        const certificateExists =
            localStorage.getItem(
                "certificateId"
            );
        totalCertificates.textContent =
            certificateExists ? "1" : "0";
    }
    if (!studentList) {
        return;
    }
    studentList.innerHTML = "";
    
    if (students.length === 0) {
        studentList.innerHTML = `
            <div class="student-row">
                <span>No students found.</span>
                <span>-</span>
                <span>-</span>
            </div>
        `;
        return;
    }
    
    students.forEach(function (student, index) {
        studentList.innerHTML += `
            <div class="student-row">
                <span>${student.fullname}</span>
                <span>${student.email}</span>
                <span>
                    Active
                    <button class="view-student-btn" onclick="viewStudent(${index})">View</button>
                    <button class="edit-student-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-student-btn" onclick="deleteStudent(${index})">Delete</button>
                </span>
            </div>
        `;
    });
}

// ============================================================
// ADMIN LOGIN
// ============================================================
const adminDashboard =
    document.getElementById(
        "admin-dashboard"
    );
const adminLoginForm = document.getElementById("admin-login-form");
const adminLoginMessage = document.getElementById("admin-login-message");
const adminLoginSection = document.getElementById("admin-login-section");

if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const adminEmailElement = document.getElementById("admin-email");
        const adminPasswordElement = document.getElementById("admin-password");
        if (!adminEmailElement || !adminPasswordElement) return;
        const adminEmail = adminEmailElement.value.trim();
        const adminPassword = adminPasswordElement.value;

        // =========================
        // ADMIN LOGIN DETAILS
        // =========================
        const correctAdminEmail = "admin@khaliphacoding.com";
        const correctAdminPassword = "admin123";
        if (adminEmail === correctAdminEmail && adminPassword === correctAdminPassword) {

            // =========================
            // SAVE ADMIN LOGIN STATUS
            // =========================
            localStorage.setItem("adminLoggedIn", "true");

            if (adminLoginMessage) {
                adminLoginMessage.textContent = "Admin login successful!";
            }

            // =========================
            // HIDE LOGIN
            // SHOW DASHBOARD IMMEDIATELY
            // =========================
            if (adminLoginSection) {
                adminLoginSection.style.display = "none";
            }

            if (adminDashboard) {
                adminDashboard.style.display = "block";
            }

            // =========================
            // OPEN ADMIN DASHBOARD
            // =========================
            window.location.hash = "admin-dashboard";
        } else {
            if (adminLoginMessage) {
                adminLoginMessage.textContent = "Incorrect admin email or password.";
            }
        }
    });
}

// ============================================================
// ADMIN LOGOUT
// ============================================================
const adminLogout =
    document.getElementById(
        "admin-logout"
    );

if (adminLogout) {
    adminLogout.addEventListener(
        "click",
        function () {
            localStorage.removeItem(
                "adminLoggedIn"
            );

            if (adminDashboard) {
                adminDashboard.style.display =
                    "none";
            }

            window.location.hash =
                "admin-login-section";
        }
    );
}

// ============================================================
// VIEW STUDENT
// ============================================================
function viewStudent(index) {
    const students =
        JSON.parse(
            localStorage.getItem(
                "students"
            )
        ) || [];
    
    const student =
        students[index];
    
    if (!student) {
        return;
    }
    
    const studentDetails =
        document.getElementById(
            "student-details"
        );
    
    if (!studentDetails) {
        return;
    }
    
    studentDetails.innerHTML = `
        <div class="student-details-card">
            <h3>Student Details</h3>
            <p><strong>Name:</strong> ${student.fullname}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Status:</strong> Active</p>
        </div>
    `;

    studentDetails.scrollIntoView({
        behavior: "smooth"
    });
}

// ============================================================
// EDIT STUDENT
// ============================================================
function editStudent(index) {
    let students =
        JSON.parse(
            localStorage.getItem(
                "students"
            )
        ) || [];

    const student =
        students[index];
    
    if (!student) {
        return;
    }
    
    const newName =
        prompt(
            "Enter Student Name:",
            student.fullname
        );
    
    if (newName === null) {
        return;
    }

    const newEmail =
        prompt(
            "Enter Student Email:",
            student.email
        );

    if (newEmail === null) {
        return;
    }

    student.fullname =
        newName.trim();
    student.email =
        newEmail.trim();
    
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    
    // Sabunta current student idan shi ne aka gyara
    const currentStudent =
        JSON.parse(
            localStorage.getItem(
                "student"
            )
        );

    if (
        currentStudent &&
        currentStudent.email ===
        student.email
    ) {
        localStorage.setItem(
            "student",
            JSON.stringify(student)
        );
    }

    location.reload();
}

// ============================================================
// DELETE STUDENT
// ============================================================
function deleteStudent(index) {

    let students =
        JSON.parse(
            localStorage.getItem(
                "students"
            )
        ) || [];
    
    const student =
        students[index]

    if (!student) {
        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    } 

    students.splice(
        index,
        1
    );


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    // Idan current student ne aka goge
    const currentStudent =
        JSON.parse(
            localStorage.getItem(
                "student"
            )
        );
    
    if (
        currentStudent &&
        currentStudent.email ===
        student.email
    ) {
        localStorage.removeItem(
            "student"
        );
        localStorage.removeItem(
            "isLoggedIn"
        );
    }
    
    location.reload();
}

// ============================================================
// STUDENT SEARCH
// ============================================================
const studentSearch =
    document.getElementById(
        "student-search"
    );

if (studentSearch) {
    studentSearch.addEventListener(
        "input",
        function () {
            const students =
                JSON.parse(
                    localStorage.getItem(
                        "students"
                    )
                ) || [];
            
            const searchText =
                studentSearch.value
                    .toLowerCase()
                    .trim();
            
            const filteredStudents =
                students.filter(
                    function (student) {
                        return (
                            student.fullname
                                .toLowerCase()
                                .includes(searchText) ||
                            student.email
                                .toLowerCase()
                                .includes(searchText)
                        );
                    }
                );

            if (!studentList) {
                return;
            }

            studentList.innerHTML =
                "";

            filteredStudents.forEach(
                function (student) {
                    const index =
                        students.indexOf(
                            student
                        );

                    studentList.innerHTML += `
                        <div class="student-row">
                            <span>${student.fullname}</span>
                            <span>${student.email}</span>
                            <span>
                                Active
                                <button class="view-student-btn" onclick="viewStudent(${index})">View</button>
                                <button class="edit-student-btn" onclick="editStudent(${index})">Edit</button>
                                <button class="delete-student-btn" onclick="deleteStudent(${index})">Delete</button>
                            </span>
                        </div>
                    `;
                }
            );
            
            if (
                filteredStudents.length ===
                0
            ) {
                studentList.innerHTML = `
                    <div class="student-row">
                        <span>No student found.</span>
                        <span>-</span>
                        <span>-</span>
                    </div>
                `;

            }
        }
    );
}

// ============================================================
// COURSE MANAGEMENT
// ============================================================
const addCourseForm =
    document.getElementById(
        "add-course-form"
    );
const savedCourseList =
    document.getElementById(
        "saved-course-list"
    );
const adminTotalCourses =
    document.getElementById(
        "admin-total-courses"
    );

// Nuna courses da aka ajiye
function displaySavedCourses() {
    const savedCourses =
        JSON.parse(
            localStorage.getItem(
                "savedCourses"
            )
        ) || [];
    
    // Total courses
    if (adminTotalCourses) {
        adminTotalCourses.textContent =
            3 + savedCourses.length;

    }

    if (!savedCourseList) {
        return;
    }
    
    savedCourseList.innerHTML =
        "";

    if (savedCourses.length === 0) {
        savedCourseList.innerHTML = `
            <div class="saved-course-empty">
                No additional courses found.
            </div>
        `;
        return;
    }

    savedCourses.forEach(
        function (course, index) {
            savedCourseList.innerHTML += `
                <div class="saved-course-item">
                    <div>
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                    </div>
                    <div>
                        <button class="edit-course-btn" onclick="editCourse(${index})">Edit</button>
                        <button class="delete-course-btn" onclick="deleteCourse(${index})">Delete</button>
                    </div>
                </div>
            `;
        }
    );
}

// Nuna courses da aka ajiye lokacin load
displaySavedCourses();

// ============================================================
// ADD COURSE
// ============================================================
if (addCourseForm) {
    addCourseForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            
            const courseTitle =
                document.getElementById(
                    "course-title"
                );
            const courseDescription =
                document.getElementById(
                    "course-description"
                );

            if (
                !courseTitle ||
                !courseDescription
            ) {
                return;
            }


            const title =
                courseTitle.value.trim();
            const description =
                courseDescription.value.trim();
            
            if (
                title === "" ||
                description === ""
            ) {
                alert(
                    "Please fill all course fields."
                );
                return;
            }
            
            let savedCourses =
                JSON.parse(
                    localStorage.getItem(
                        "savedCourses"
                    )
                ) || [];

            savedCourses.push({
                title: title,
                description: description

            });
            
            localStorage.setItem(
                "savedCourses",
                JSON.stringify(
                    savedCourses
                )
            );

            alert(
                "Course added successfully!"
            );

            addCourseForm.reset();
            displaySavedCourses();

        }
    );
}


// ============================================================
// EDIT COURSE
// ============================================================
function editCourse(index) {

    let savedCourses =
        JSON.parse(
            localStorage.getItem(
                "savedCourses"
            )
        ) || [];

    const course =
        savedCourses[index];
    if (!course) {
        return;
    }
    
    const newTitle =
        prompt(
            "Enter Course Title:",
            course.title
        );

    if (newTitle === null) {
        return;
    }
    
    const newDescription =
        prompt(
            "Enter Course Description:",
            course.description
        );

    if (newDescription === null) {
        return;
    }

    course.title =
        newTitle.trim();
    course.description =
        newDescription.trim();
    
    localStorage.setItem(
        "savedCourses",
        JSON.stringify(
            savedCourses
        )
    );
    
    displaySavedCourses();
}

// ============================================================
// DELETE COURSE
// ============================================================
function deleteCourse(index) {
    let savedCourses =
        JSON.parse(
            localStorage.getItem(
                "savedCourses"
            )
        ) || [];

    if (!savedCourses[index]) {
        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this course?"
        );


    if (!confirmDelete) {
        return;
    }
    savedCourses.splice(
        index,
        1
    );
    
    localStorage.setItem(
        "savedCourses",
        JSON.stringify(
            savedCourses
        )
    );

    displaySavedCourses();
}

// ============================================================
// UPDATE ADMIN TOTAL COURSES
// ============================================================
if (totalCourses) {
    const savedCourses =
        JSON.parse(
            localStorage.getItem(
                "savedCourses"
            )
        ) || [];

    totalCourses.textContent =
        3 + savedCourses.length;
}

// ============================================================
// PRINT / SAVE CERTIFICATE
// ============================================================
if (printCertificate) {

    // =========================
    // HIDDEN AT START
    // =========================
    printCertificate.style.display = "none";

    // =========================
    // PRINT BUTTON CLICK
    // =========================
    printCertificate.addEventListener("click", function() {
        window.print();
    });
}

// ============================================================
// MAKE LESSON FUNCTIONS AVAILABLE TO HTML BUTTONS
// ============================================================
window.showHtmlLesson = showHtmlLesson;
window.completeHtmlLesson = completeHtmlLesson;

window.showCssLesson = showCssLesson;
window.completeCssLesson = completeCssLesson;

window.showJsLesson = showJsLesson;
window.completeJsLesson = completeJsLesson;

// ============================================================
// END OF KHALIPHA CODING ACADEMY SCRIPT
// ============================================================

