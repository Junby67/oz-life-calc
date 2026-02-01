class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');

        const ball = document.createElement('div');
        ball.style.width = '60px';
        ball.style.height = '60px';
        ball.style.borderRadius = '50%';
        ball.style.display = 'flex';
        ball.style.justifyContent = 'center';
        ball.style.alignItems = 'center';
        ball.style.fontSize = '1.8rem';
        ball.style.fontWeight = 'bold';
        ball.style.color = '#000';
        ball.style.boxShadow = 'inset -5px -5px 10px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.5)';
        ball.style.textShadow = '0 2px 3px rgba(0,0,0,0.3)';

        // Color the balls based on the number
        const num = parseInt(number, 10);
        if (num <= 10) ball.style.backgroundColor = '#fbc400'; // Yellow
        else if (num <= 20) ball.style.backgroundColor = '#69c8f2'; // Blue
        else if (num <= 30) ball.style.backgroundColor = '#ff7272'; // Red
        else if (num <= 40) ball.style.backgroundColor = '#aaa'; // Gray
        else ball.style.backgroundColor = '#b0d840'; // Green

        ball.textContent = number;

        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const display = document.querySelector('.display');

generateBtn.addEventListener('click', () => {
    display.innerHTML = ''; // Clear previous numbers
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            display.appendChild(lottoBall);
        }, index * 300); // Add a slight delay for animation
    });
});
