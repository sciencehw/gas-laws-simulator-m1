// 전역 변수
let studentNumber = '';
let studentName = '';
let boyleData = [];
let charlesData = [];
let animationFrameId = null;

// 보일의 법칙 퀴즈
const boyleQuizzes = [
    {
        question: "주사기 끝을 막고 피스톤을 누르면 어떻게 될까요?",
        options: ["공기 부피가 늘어난다", "공기 부피가 줄어든다", "공기 부피가 변하지 않는다", "주사기가 터진다"],
        correct: 1
    },
    {
        question: "압력이 2배가 되면 부피는?",
        options: ["2배가 된다", "1/2배가 된다", "4배가 된다", "변하지 않는다"],
        correct: 1
    }
];

// 샤를의 법칙 퀴즈
const charlesQuizzes = [
    {
        question: "뜨거운 날 자동차 타이어가 팽팽해지는 이유는?",
        options: ["압력이 낮아져서", "온도가 올라가 부피가 늘어나서", "공기가 새어나가서", "타이어가 녹아서"],
        correct: 1
    },
    {
        question: "열기구가 하늘로 떠오르는 원리는?",
        options: ["공기를 데워 부피를 늘려 가벼워지기 때문", "바람이 불어서", "헬륨을 넣어서", "마법으로"],
        correct: 0
    }
];

// 형성평가 문제 (15문제)
const assessmentQuestions = [
    {
        question: "보일의 법칙에서 온도가 일정할 때, 압력과 부피의 관계는?",
        options: ["비례한다", "반비례한다", "관계없다", "제곱에 비례한다"],
        correct: 1
    },
    {
        question: "샤를의 법칙에서 압력이 일정할 때, 온도와 부피의 관계는?",
        options: ["반비례한다", "관계없다", "비례한다", "제곱에 반비례한다"],
        correct: 2
    },
    {
        question: "기체의 압력이 높아지면 기체 입자는?",
        options: ["더 멀어진다", "더 가까워진다", "변하지 않는다", "사라진다"],
        correct: 1
    },
    {
        question: "기체의 온도가 올라가면 기체 입자의 움직임은?",
        options: ["느려진다", "빨라진다", "멈춘다", "변하지 않는다"],
        correct: 1
    },
    {
        question: "보일의 법칙을 실험할 때 일정하게 유지해야 하는 것은?",
        options: ["압력", "부피", "온도", "질량"],
        correct: 2
    },
    {
        question: "샤를의 법칙을 실험할 때 일정하게 유지해야 하는 것은?",
        options: ["온도", "부피", "압력", "개수"],
        correct: 2
    },
    {
        question: "압력을 2배로 높이면 부피는 몇 배가 될까요? (온도 일정)",
        options: ["2배", "4배", "1/2배", "1/4배"],
        correct: 2
    },
    {
        question: "풍선을 누르면 부피가 줄어드는 이유는?",
        options: ["온도가 낮아져서", "압력이 높아져서", "공기가 빠져서", "풍선이 약해서"],
        correct: 1
    },
    {
        question: "겨울에 타이어 공기압이 낮아지는 이유는?",
        options: ["압력이 낮아져서", "온도가 낮아져 부피가 줄어서", "공기가 새어서", "타이어가 수축해서"],
        correct: 1
    },
    {
        question: "기체 입자 사이의 거리가 가까워지면?",
        options: ["압력이 낮아진다", "압력이 높아진다", "온도가 낮아진다", "변화없다"],
        correct: 1
    },
    {
        question: "온도를 높이면 기체 입자가 벽에 충돌하는 횟수는?",
        options: ["줄어든다", "늘어난다", "같다", "0이 된다"],
        correct: 1
    },
    {
        question: "보일의 법칙이 적용되는 예는?",
        options: ["열기구", "자전거 펌프", "뜨거운 물 끓이기", "얼음 녹이기"],
        correct: 1
    },
    {
        question: "샤를의 법칙이 적용되는 예는?",
        options: ["주사기 누르기", "풍선 누르기", "뜨거운 날의 타이어", "잠수"],
        correct: 2
    },
    {
        question: "기체의 부피가 줄어들 때 입자 모형에서는?",
        options: ["입자가 멀어진다", "입자가 가까워진다", "입자가 사라진다", "입자가 커진다"],
        correct: 1
    },
    {
        question: "온도가 일정할 때 압력을 낮추면 부피는?",
        options: ["줄어든다", "늘어난다", "같다", "0이 된다"],
        correct: 1
    }
];

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupStudentModal();
    setupTabs();
    setupBoyleSimulation();
    setupCharlesSimulation();
    setupAssessment();
}

// 학생 정보 모달 설정
function setupStudentModal() {
    const modal = document.getElementById('studentModal');
    const form = document.getElementById('studentForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        studentNumber = document.getElementById('studentNumber').value;
        studentName = document.getElementById('studentName').value;
        
        document.getElementById('studentInfo').textContent = 
            `${studentNumber} ${studentName}`;
        
        modal.style.display = 'none';
    });
}

// 탭 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // 탭 전환 시 퀴즈 로드
            if (targetTab === 'boyle') {
                loadMiniQuiz('boyleQuiz', boyleQuizzes);
            } else if (targetTab === 'charles') {
                loadMiniQuiz('charlesQuiz', charlesQuizzes);
            }
        });
    });

    // 초기 퀴즈 로드
    loadMiniQuiz('boyleQuiz', boyleQuizzes);
}

// 미니 퀴즈 로드
function loadMiniQuiz(containerId, quizPool) {
    const container = document.getElementById(containerId);
    const selectedQuizzes = shuffleArray([...quizPool]).slice(0, 2);

    let html = '<h3>💡 개념 확인 퀴즈</h3>';
    
    selectedQuizzes.forEach((quiz, index) => {
        html += `
            <div class="quiz-question">
                <p><strong>Q${index + 1}.</strong> ${quiz.question}</p>
                <div class="quiz-options">
                    ${quiz.options.map((option, optIndex) => `
                        <div class="quiz-option" data-quiz="${containerId}-${index}" data-option="${optIndex}">
                            ${optIndex + 1}. ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // 퀴즈 옵션 클릭 이벤트
    container.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const quizId = this.dataset.quiz;
            const selectedOption = parseInt(this.dataset.option);
            const quizIndex = parseInt(quizId.split('-')[1]);
            const correctAnswer = selectedQuizzes[quizIndex].correct;

            // 같은 문제의 다른 옵션 초기화
            document.querySelectorAll(`[data-quiz="${quizId}"]`).forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });

            // 선택된 옵션 표시
            this.classList.add('selected');

            // 정답 확인
            if (selectedOption === correctAnswer) {
                this.classList.add('correct');
                setTimeout(() => {
                    alert('🎉 정답입니다! 잘했어요!');
                }, 100);
            } else {
                this.classList.add('incorrect');
                setTimeout(() => {
                    alert('💪 아쉽지만 틀렸어요. 다시 생각해보세요!');
                }, 100);
            }
        });
    });
}

// 보일의 법칙 시뮬레이션 설정
function setupBoyleSimulation() {
    const canvas = document.getElementById('boyleCanvas');
    const ctx = canvas.getContext('2d');
    const pressureSlider = document.getElementById('pressureSlider');
    const pressureValue = document.getElementById('pressureValue');
    const volumeDisplay = document.getElementById('boyleVolume');
    const recordBtn = document.getElementById('boyleRecord');
    const resetBtn = document.getElementById('boyleReset');
    const downloadBtn = document.getElementById('boyleDownload');

    let pressure = 1.0;
    let volume = 100.0;
    let particles = [];

    // 초기 입자 생성
    function initParticles() {
        particles = [];
        const baseCount = 50;
        for (let i = 0; i < baseCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: 4
            });
        }
    }

    initParticles();

    // 슬라이더 이벤트
    pressureSlider.addEventListener('input', (e) => {
        pressure = parseFloat(e.target.value);
        pressureValue.textContent = pressure.toFixed(1);
        
        // 보일의 법칙: P1V1 = P2V2 (초기 압력 1기압, 부피 100mL)
        volume = (1.0 * 100.0) / pressure;
        volumeDisplay.textContent = volume.toFixed(1) + ' mL';
    });

    // 애니메이션
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 용기 그리기 (부피에 따라 크기 변화)
        const containerWidth = (volume / 100) * 400;
        const containerHeight = 300;
        const containerX = (canvas.width - containerWidth) / 2;
        const containerY = (canvas.height - containerHeight) / 2;

        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 4;
        ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);

        // 압력 표시
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`압력: ${pressure.toFixed(1)} 기압`, containerX, containerY - 10);
        ctx.fillText(`부피: ${volume.toFixed(1)} mL`, containerX + containerWidth - 150, containerY - 10);

        // 입자 움직임 및 그리기
        particles.forEach(particle => {
            // 입자 이동
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 벽 충돌 (용기 크기에 맞춰)
            if (particle.x - particle.radius < containerX || 
                particle.x + particle.radius > containerX + containerWidth) {
                particle.vx *= -1;
                particle.x = Math.max(containerX + particle.radius, 
                                     Math.min(containerX + containerWidth - particle.radius, particle.x));
            }
            if (particle.y - particle.radius < containerY || 
                particle.y + particle.radius > containerY + containerHeight) {
                particle.vy *= -1;
                particle.y = Math.max(containerY + particle.radius, 
                                     Math.min(containerY + containerHeight - particle.radius, particle.y));
            }

            // 입자 그리기
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#764ba2';
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // 데이터 기록
    recordBtn.addEventListener('click', () => {
        const data = {
            pressure: pressure.toFixed(1),
            volume: volume.toFixed(1)
        };
        
        // 중복 확인
        const isDuplicate = boyleData.some(d => 
            d.pressure === data.pressure && d.volume === data.volume
        );

        if (!isDuplicate) {
            boyleData.push(data);
            updateBoyleTable();
            alert('✅ 데이터가 기록되었습니다!');
        } else {
            alert('⚠️ 이미 같은 값이 기록되어 있습니다.');
        }
    });

    // 초기화
    resetBtn.addEventListener('click', () => {
        if (confirm('모든 데이터를 초기화하시겠습니까?')) {
            boyleData = [];
            updateBoyleTable();
            pressureSlider.value = 1.0;
            pressure = 1.0;
            volume = 100.0;
            pressureValue.textContent = '1.0';
            volumeDisplay.textContent = '100.0 mL';
            initParticles();
            alert('🔄 초기화되었습니다.');
        }
    });

    // 엑셀 다운로드
    downloadBtn.addEventListener('click', () => {
        if (boyleData.length === 0) {
            alert('⚠️ 기록된 데이터가 없습니다.');
            return;
        }
        downloadExcel(boyleData, `압력부피_${studentNumber}_${studentName}`, 
                     ['순서', '압력 (기압)', '부피 (mL)']);
    });
}

// 보일의 법칙 테이블 업데이트
function updateBoyleTable() {
    const tbody = document.getElementById('boyleTableBody');
    tbody.innerHTML = '';

    boyleData.forEach((data, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = data.pressure;
        row.insertCell(2).textContent = data.volume;
    });
}

// 샤를의 법칙 시뮬레이션 설정
function setupCharlesSimulation() {
    const canvas = document.getElementById('charlesCanvas');
    const ctx = canvas.getContext('2d');
    const temperatureSlider = document.getElementById('temperatureSlider');
    const temperatureValue = document.getElementById('temperatureValue');
    const volumeDisplay = document.getElementById('charlesVolume');
    const recordBtn = document.getElementById('charlesRecord');
    const resetBtn = document.getElementById('charlesReset');
    const downloadBtn = document.getElementById('charlesDownload');

    let temperature = 20; // 섭씨
    let volume = 100.0;
    let particles = [];

    // 초기 입자 생성
    function initParticles() {
        particles = [];
        const baseCount = 50;
        for (let i = 0; i < baseCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: 4
            });
        }
    }

    initParticles();

    // 슬라이더 이벤트
    temperatureSlider.addEventListener('input', (e) => {
        temperature = parseInt(e.target.value);
        temperatureValue.textContent = temperature;
        
        // 샤를의 법칙: V1/T1 = V2/T2 (초기 온도 20°C = 293K, 부피 100mL)
        const T1 = 293; // 20°C + 273
        const V1 = 100;
        const T2 = temperature + 273;
        volume = (V1 * T2) / T1;
        volumeDisplay.textContent = volume.toFixed(1) + ' mL';

        // 온도에 따른 입자 속도 조정
        const speedFactor = Math.sqrt(T2 / T1);
        particles.forEach(particle => {
            const currentSpeed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
            const newSpeed = 2 * speedFactor;
            const angle = Math.atan2(particle.vy, particle.vx);
            particle.vx = Math.cos(angle) * newSpeed;
            particle.vy = Math.sin(angle) * newSpeed;
        });
    });

    // 애니메이션
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 용기 그리기 (부피에 따라 크기 변화)
        const containerWidth = (volume / 100) * 400;
        const containerHeight = 300;
        const containerX = (canvas.width - containerWidth) / 2;
        const containerY = (canvas.height - containerHeight) / 2;

        // 온도에 따른 색상 변화
        const tempRatio = temperature / 100;
        const red = Math.floor(255 * tempRatio);
        const blue = Math.floor(255 * (1 - tempRatio));
        ctx.strokeStyle = `rgb(${red}, 100, ${blue})`;
        ctx.lineWidth = 4;
        ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);

        // 온도 표시
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`온도: ${temperature}°C`, containerX, containerY - 10);
        ctx.fillText(`부피: ${volume.toFixed(1)} mL`, containerX + containerWidth - 150, containerY - 10);

        // 입자 움직임 및 그리기
        particles.forEach(particle => {
            // 입자 이동
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 벽 충돌
            if (particle.x - particle.radius < containerX || 
                particle.x + particle.radius > containerX + containerWidth) {
                particle.vx *= -1;
                particle.x = Math.max(containerX + particle.radius, 
                                     Math.min(containerX + containerWidth - particle.radius, particle.x));
            }
            if (particle.y - particle.radius < containerY || 
                particle.y + particle.radius > containerY + containerHeight) {
                particle.vy *= -1;
                particle.y = Math.max(containerY + particle.radius, 
                                     Math.min(containerY + containerHeight - particle.radius, particle.y));
            }

            // 입자 그리기 (온도에 따른 색상)
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${red}, 100, ${blue})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // 데이터 기록
    recordBtn.addEventListener('click', () => {
        const data = {
            temperature: temperature,
            volume: volume.toFixed(1)
        };
        
        // 중복 확인
        const isDuplicate = charlesData.some(d => 
            parseInt(d.temperature) === temperature && d.volume === data.volume
        );

        if (!isDuplicate) {
            charlesData.push(data);
            updateCharlesTable();
            alert('✅ 데이터가 기록되었습니다!');
        } else {
            alert('⚠️ 이미 같은 값이 기록되어 있습니다.');
        }
    });

    // 초기화
    resetBtn.addEventListener('click', () => {
        if (confirm('모든 데이터를 초기화하시겠습니까?')) {
            charlesData = [];
            updateCharlesTable();
            temperatureSlider.value = 20;
            temperature = 20;
            volume = 100.0;
            temperatureValue.textContent = '20';
            volumeDisplay.textContent = '100.0 mL';
            initParticles();
            alert('🔄 초기화되었습니다.');
        }
    });

    // 엑셀 다운로드
    downloadBtn.addEventListener('click', () => {
        if (charlesData.length === 0) {
            alert('⚠️ 기록된 데이터가 없습니다.');
            return;
        }
        downloadExcel(charlesData, `온도부피_${studentNumber}_${studentName}`, 
                     ['순서', '온도 (°C)', '부피 (mL)']);
    });
}

// 샤를의 법칙 테이블 업데이트
function updateCharlesTable() {
    const tbody = document.getElementById('charlesTableBody');
    tbody.innerHTML = '';

    charlesData.forEach((data, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = data.temperature;
        row.insertCell(2).textContent = data.volume;
    });
}

// 형성평가 설정
function setupAssessment() {
    const quizContainer = document.getElementById('quizContainer');
    const submitBtn = document.getElementById('submitQuiz');
    const newQuizBtn = document.getElementById('newQuiz');
    const resultDiv = document.getElementById('quizResult');

    let currentQuestions = [];
    let userAnswers = {};

    function loadNewQuiz() {
        currentQuestions = shuffleArray([...assessmentQuestions]).slice(0, 5);
        userAnswers = {};
        resultDiv.innerHTML = '';
        resultDiv.className = '';

        let html = '';
        currentQuestions.forEach((question, index) => {
            html += `
                <div class="quiz-item">
                    <h4>문제 ${index + 1}</h4>
                    <p>${question.question}</p>
                    <div class="quiz-options">
                        ${question.options.map((option, optIndex) => `
                            <div class="quiz-option" data-question="${index}" data-answer="${optIndex}">
                                ${optIndex + 1}. ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        quizContainer.innerHTML = html;

        // 옵션 클릭 이벤트
        quizContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionIndex = this.dataset.question;
                
                // 같은 문제의 다른 옵션 초기화
                document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(opt => {
                    opt.classList.remove('selected');
                });

                // 선택된 옵션 표시
                this.classList.add('selected');
                userAnswers[questionIndex] = parseInt(this.dataset.answer);
            });
        });
    }

    loadNewQuiz();

    // 답안 확인
    submitBtn.addEventListener('click', () => {
        if (Object.keys(userAnswers).length < 5) {
            alert('⚠️ 모든 문제를 풀어주세요!');
            return;
        }

        if (!confirm('답안을 제출하시겠습니까?')) {
            return;
        }

        let correctCount = 0;
        currentQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                correctCount++;
            }
        });

        if (correctCount === 5) {
            resultDiv.className = 'success';
            resultDiv.innerHTML = `🎉 축하합니다! 모든 문제를 맞혔어요! (${correctCount}/5)`;
        } else {
            resultDiv.className = 'error';
            resultDiv.innerHTML = `💪 ${correctCount}개 맞혔어요! 다시 도전해보세요! (${correctCount}/5)`;
        }
    });

    // 새 문제
    newQuizBtn.addEventListener('click', () => {
        if (confirm('새로운 문제를 불러오시겠습니까?')) {
            loadNewQuiz();
        }
    });
}

// 엑셀 다운로드 함수
function downloadExcel(data, filename, headers) {
    let csv = headers.join(',') + '\n';
    
    data.forEach((row, index) => {
        const values = Object.values(row);
        csv += `${index + 1},${values.join(',')}\n`;
    });

    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 배열 셔플 함수
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}