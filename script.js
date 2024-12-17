// DOM Elements
const semesterButtons = document.querySelectorAll(".semester-btn");
const semesterContinueBtn = document.getElementById("semesterContinueBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

const semesterSection = document.getElementById("semesterSection");
const courseSection = document.getElementById("courseSection");
const transcriptSection = document.getElementById("transcriptSection");

const yearInput = document.getElementById("yearInput");
const courseTitle = document.getElementById("courseTitle");
const courseCredit = document.getElementById("courseCredit");
const courseGPA = document.getElementById("courseGPA");

const submitCourseBtn = document.getElementById("submitCourseBtn");
const courseContinueBtn = document.getElementById("courseContinueBtn");
const transcriptTableBody = document.querySelector("#transcriptTable tbody");
const totalCGPA = document.getElementById("totalCGPA");
const semesterDetailsText = document.getElementById("semesterDetails");

let selectedSemester = null;
let courses = [];

// Theme Toggle
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggleBtn.textContent = document.body.classList.contains("dark-mode") 
        ? "☀️ Light Mode" 
        : "🌙 Dark Mode";
});

// Semester Selection
semesterButtons.forEach(button => {
    button.addEventListener("click", () => {
        semesterButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedSemester = button.dataset.value;
    });
});

// Continue to Course Input Section
semesterContinueBtn.addEventListener("click", () => {
    const year = yearInput.value.trim();
    if (!selectedSemester || !year) {
        alert("Please select a semester and enter a valid year.");
        return;
    }
    semesterDetailsText.textContent = `Semester: ${selectedSemester}, Year: ${year}`;
    semesterSection.classList.add("hidden");
    courseSection.classList.remove("hidden");
});

// Add Course
submitCourseBtn.addEventListener("click", () => {
    const title = courseTitle.value.trim();
    const credit = parseFloat(courseCredit.value);
    const gpa = parseFloat(courseGPA.value);

    if (!title || isNaN(credit) || isNaN(gpa) || credit <= 0 || gpa < 0 || gpa > 4) {
        alert("Please enter valid course details.");
        return;
    }

    courses.push({ title, credit, gpa });
    alert("Course added successfully!");
    courseTitle.value = "";
    courseCredit.value = "";
    courseGPA.value = "";
});

// Generate Transcript
courseContinueBtn.addEventListener("click", () => {
    let totalCredits = 0, weightedSum = 0;

    transcriptTableBody.innerHTML = "";
    courses.forEach(course => {
        transcriptTableBody.innerHTML += `
            <tr>
                <td>${course.title}</td>
                <td>${course.credit}</td>
                <td>${course.gpa}</td>
            </tr>`;
        totalCredits += course.credit;
        weightedSum += course.gpa * course.credit;
    });

    const cgpa = (weightedSum / totalCredits).toFixed(2);
    totalCGPA.textContent = `Total CGPA: ${cgpa}`;
    courseSection.classList.add("hidden");
    transcriptSection.classList.remove("hidden");
});
