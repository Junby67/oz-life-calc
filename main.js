const generateBtn = document.getElementById('generate-btn');
const display = document.querySelector('.food-display');

const foodList = [
    "치킨", "피자", "삼겹살", "족발", "보쌈", "떡볶이", "햄버거", "초밥", "파스타",
    "김치찌개", "된장찌개", "부대찌개", "순두부찌개", "곱창", "막창", "닭발", "감자탕",
    "해물찜", "아구찜", "라멘", "쌀국수", "마라탕", "양꼬치", "짜장면", "짬뽕", "탕수육"
];

generateBtn.addEventListener('click', () => {
    // Add a class to trigger the animation
    display.classList.remove('reveal');
    
    // Get a random food item
    const randomIndex = Math.floor(Math.random() * foodList.length);
    const recommendedFood = foodList[randomIndex];

    // Update the display after a short delay to allow the animation to reset
    setTimeout(() => {
        display.innerHTML = `<h2>오늘의 추천 메뉴는...</h2><p class="food-item">${recommendedFood}</p>`;
        display.classList.add('reveal');
    }, 100);
});

// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
const themeKey = 'theme-preference';

const applyTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙';
    } else {
        body.classList.remove('light-mode');
        themeToggleBtn.textContent = '☀️';
    }
};

themeToggleBtn.addEventListener('click', () => {
    let currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(themeKey, newTheme);
    applyTheme(newTheme);
});

// Load saved theme on startup
const savedTheme = localStorage.getItem(themeKey) || 'dark';
applyTheme(savedTheme);
