const allQuestions = [
            {
                question: "What vegetable was originally used to make Jack-o'-lanterns before pumpkins?",
                options: ["Potatoes", "Turnips", "Carrots", "Beets"],
                correct: 1,
                illustration: "🎃",
                background: "bg-pumpkin-patch",
                explanation: "Irish immigrants originally carved Jack-o'-lanterns from turnips and potatoes!"
            },
            {
                question: "In which country did Halloween originate?",
                options: ["United States", "England", "Ireland", "Scotland"],
                correct: 2,
                illustration: "🏰",
                background: "bg-haunted-house",
                explanation: "Halloween originated from the ancient Celtic festival of Samhain in Ireland."
            },
            {
                question: "What does the name 'Dracula' mean?",
                options: ["Night Walker", "Blood Drinker", "Son of the Devil", "Dark Lord"],
                correct: 2,
                illustration: "🧛‍♂️",
                background: "bg-vampire-castle",
                explanation: "Dracula means 'Son of the Devil' or 'Son of the Dragon' in Romanian."
            },
            {
                question: "Which horror movie features the character Michael Myers?",
                options: ["Friday the 13th", "Halloween", "Nightmare on Elm Street", "Scream"],
                correct: 1,
                illustration: "🔪",
                background: "bg-haunted-house",
                explanation: "Michael Myers is the iconic killer from the Halloween movie franchise."
            },
            {
                question: "What is a group of witches called?",
                options: ["A coven", "A circle", "A gathering", "A spell"],
                correct: 0,
                illustration: "🧙‍♀️",
                background: "bg-witch-forest",
                explanation: "A group of witches is called a coven, typically consisting of 13 members."
            },
            {
                question: "In folklore, what can kill a werewolf?",
                options: ["Wooden stake", "Silver bullet", "Holy water", "Garlic"],
                correct: 1,
                illustration: "🐺",
                background: "bg-werewolf-moon",
                explanation: "According to folklore, silver bullets are the traditional way to kill werewolves."
            },
            {
                question: "What is the fear of spiders called?",
                options: ["Arachnophobia", "Entomophobia", "Acarophobia", "Myrmecophobia"],
                correct: 0,
                illustration: "🕷️",
                background: "bg-spider-web",
                explanation: "Arachnophobia is the intense fear of spiders, one of the most common phobias."
            },
            {
                question: "Which Shakespeare play features three witches?",
                options: ["Hamlet", "Macbeth", "King Lear", "Othello"],
                correct: 1,
                illustration: "👻",
                background: "bg-ghost-mansion",
                explanation: "The three witches appear in Macbeth, prophesying his rise to power."
            },
            {
                question: "What do you call a dead body that has been preserved?",
                options: ["Zombie", "Mummy", "Skeleton", "Corpse"],
                correct: 1,
                illustration: "🧟‍♂️",
                background: "bg-zombie-apocalypse",
                explanation: "A mummy is a dead body that has been preserved through mummification."
            },
            {
                question: "In what year was the movie 'The Exorcist' released?",
                options: ["1971", "1973", "1975", "1977"],
                correct: 1,
                illustration: "😈",
                background: "bg-demon-portal",
                explanation: "The Exorcist was released in 1973 and became a horror classic."
            },
            {
                question: "What is the most popular Halloween candy in the US?",
                options: ["Candy Corn", "Chocolate Bars", "Reese's Peanut Butter Cups", "Skittles"],
                correct: 2,
                illustration: "🍬",
                background: "bg-pumpkin-patch",
                explanation: "Reese's Peanut Butter Cups consistently rank as America's favorite Halloween candy."
            },
            {
                question: "Which cemetery is famous for its voodoo queen Marie Laveau?",
                options: ["Père Lachaise", "St. Louis Cemetery", "Hollywood Forever", "Graceland"],
                correct: 1,
                illustration: "⚰️",
                background: "bg-graveyard",
                explanation: "Marie Laveau, the famous voodoo queen, is buried in St. Louis Cemetery in New Orleans."
            },
            {
                question: "What does 'Samhain' mean in Gaelic?",
                options: ["Summer's End", "Dark Night", "Spirit Time", "Harvest Moon"],
                correct: 0,
                illustration: "🌙",
                background: "bg-witch-forest",
                explanation: "Samhain means 'Summer's End' and marked the Celtic new year."
            },
            {
                question: "Which horror author wrote 'Frankenstein'?",
                options: ["Edgar Allan Poe", "Bram Stoker", "Mary Shelley", "H.P. Lovecraft"],
                correct: 2,
                illustration: "⚡",
                background: "bg-demon-portal",
                explanation: "Mary Shelley wrote Frankenstein in 1818 when she was just 18 years old."
            },
            {
                question: "What is the traditional Halloween activity of going door-to-door for candy called?",
                options: ["Trick-or-treating", "Soul caking", "Guising", "All of the above"],
                correct: 3,
                illustration: "🚪",
                background: "bg-haunted-house",
                explanation: "All these terms refer to Halloween traditions of going door-to-door for treats!"
            }
        ];

        // Game state
        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let timeLeft = 20;
        let timer;
        let autoAdvanceTimer;
        let userAnswers = [];
        let questionAnswered = false;
        let playerName = '';
        let leaderboard = [];

        // Leaderboard Management
        class LeaderboardManager {
            constructor() {
                this.loadLeaderboard();
            }

            loadLeaderboard() {
                try {
                    const saved = localStorage.getItem('spookyQuizLeaderboard');
                    this.leaderboard = saved ? JSON.parse(saved) : [];
                } catch (error) {
                    console.warn('Could not load leaderboard from storage');
                    this.leaderboard = [];
                }
            }

            saveLeaderboard() {
                try {
                    localStorage.setItem('spookyQuizLeaderboard', JSON.stringify(this.leaderboard));
                } catch (error) {
                    console.warn('Could not save leaderboard to storage');
                }
            }

            addScore(playerName, score, correctAnswers, totalQuestions, timeBonus) {
                const timestamp = new Date().toISOString();
                const entry = {
                    name: playerName,
                    score: score,
                    correctAnswers: correctAnswers,
                    totalQuestions: totalQuestions,
                    timeBonus: timeBonus,
                    percentage: Math.round((correctAnswers / totalQuestions) * 100),
                    timestamp: timestamp,
                    date: new Date().toLocaleDateString()
                };

                this.leaderboard.push(entry);
                this.leaderboard.sort((a, b) => b.score - a.score);
                
                // Keep only top 100 scores to prevent storage bloat
                if (this.leaderboard.length > 100) {
                    this.leaderboard = this.leaderboard.slice(0, 100);
                }
                
                this.saveLeaderboard();
                return this.getPlayerRank(playerName, score, timestamp);
            }

            getPlayerRank(playerName, score, timestamp) {
                const playerEntry = this.leaderboard.find(entry => 
                    entry.name === playerName && 
                    entry.score === score && 
                    entry.timestamp === timestamp
                );
                
                if (playerEntry) {
                    return this.leaderboard.indexOf(playerEntry) + 1;
                }
                return this.leaderboard.length;
            }

            getTopScores(limit = 10) {
                return this.leaderboard.slice(0, limit);
            }

            getTotalPlayers() {
                const uniquePlayers = new Set(this.leaderboard.map(entry => entry.name));
                return uniquePlayers.size;
            }

            getPlayerBestScore(playerName) {
                const playerScores = this.leaderboard.filter(entry => entry.name === playerName);
                return playerScores.length > 0 ? Math.max(...playerScores.map(entry => entry.score)) : 0;
            }
        }

        const leaderboardManager = new LeaderboardManager();

        // DOM elements
        const startScreen = document.getElementById('startScreen');
        const quizScreen = document.getElementById('quizScreen');
        const resultsScreen = document.getElementById('resultsScreen');
        const questionCard = document.getElementById('questionCard');
        const questionIllustration = document.getElementById('questionIllustration');
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const currentQSpan = document.getElementById('currentQ');
        const totalQSpan = document.getElementById('totalQ');
        const scoreSpan = document.getElementById('score');
        const progressBar = document.getElementById('progressBar');
        const timeLeftSpan = document.getElementById('timeLeft');
        const timerCircle = document.getElementById('timerCircle');
        const autoAdvance = document.getElementById('autoAdvance');
        const advanceTimer = document.getElementById('advanceTimer');

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function startQuiz() {
            const nameInput = document.getElementById('playerName');
            playerName = nameInput.value.trim();
            
            if (!playerName) {
                nameInput.focus();
                nameInput.style.borderColor = '#ff4444';
                nameInput.placeholder = 'Please enter your spooky name first! 👻';
                setTimeout(() => {
                    nameInput.style.borderColor = '';
                    nameInput.placeholder = 'e.g., Ghostly Gamer, Pumpkin King...';
                }, 3000);
                return;
            }
            
            if (playerName.length > 20) {
                nameInput.focus();
                nameInput.style.borderColor = '#ff4444';
                alert('Spooky name must be 20 characters or less! 🎃');
                return;
            }
            
            currentQuestions = shuffleArray(allQuestions).slice(0, 10);
            
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            totalQSpan.textContent = currentQuestions.length;
            loadQuestion();
        }

        function loadQuestion() {
            questionAnswered = false;
            const question = currentQuestions[currentQuestionIndex];
            
            // Change background based on question theme
            document.body.className = `min-h-screen transition-all duration-1000 ${question.background}`;
            
            questionCard.classList.add('slide-out-spooky');
            
            setTimeout(() => {
                questionIllustration.textContent = question.illustration;
                questionText.textContent = question.question;
                currentQSpan.textContent = currentQuestionIndex + 1;
                scoreSpan.textContent = score;
                
                const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
                progressBar.style.width = progress + '%';
                
                optionsContainer.innerHTML = '';
                
                const letters = ['A', 'B', 'C', 'D'];
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option-btn p-4 rounded-2xl text-left font-medium shadow-lg';
                    button.innerHTML = `
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                ${letters[index]}
                            </div>
                            <span class="flex-1">${option}</span>
                        </div>
                    `;
                    button.onclick = () => selectAnswer(index, button);
                    optionsContainer.appendChild(button);
                });
                
                questionCard.classList.remove('slide-out-spooky');
                questionCard.classList.add('slide-in-spooky');
                
                autoAdvance.classList.add('hidden');
                startTimer();
            }, 500);
        }

        function startTimer() {
            timeLeft = 20;
            timeLeftSpan.textContent = timeLeft;
            
            const circumference = 2 * Math.PI * 28;
            timerCircle.style.strokeDasharray = circumference;
            timerCircle.style.strokeDashoffset = 0;
            
            timer = setInterval(() => {
                timeLeft--;
                timeLeftSpan.textContent = timeLeft;
                
                const offset = circumference - (timeLeft / 20) * circumference;
                timerCircle.style.strokeDashoffset = offset;
                
                if (timeLeft <= 5) {
                    timerCircle.style.stroke = '#5b0000';
                } else if (timeLeft <= 10) {
                    timerCircle.style.stroke = '#cc3500';
                } else {
                    timerCircle.style.stroke = '#cc6c00';
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    if (!questionAnswered) {
                        selectAnswer(-1);
                    }
                }
            }, 1000);
        }

        function selectAnswer(selectedIndex, buttonElement = null) {
            if (questionAnswered) return;
            
            questionAnswered = true;
            clearInterval(timer);
            
            const question = currentQuestions[currentQuestionIndex];
            const isCorrect = selectedIndex === question.correct;
            const isTimeout = selectedIndex === -1;
            
            userAnswers.push({
                questionIndex: currentQuestionIndex,
                selectedIndex: selectedIndex,
                isCorrect: isCorrect,
                isTimeout: isTimeout,
                timeBonus: isCorrect ? Math.max(0, timeLeft * 3) : 0
            });
            
            const optionButtons = optionsContainer.querySelectorAll('button');
            optionButtons.forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.7';
            });
            
            optionButtons.forEach((btn, index) => {
                if (index === question.correct) {
                    btn.classList.add('option-correct');
                    if (isCorrect && buttonElement === btn) {
                        createSpookyConfetti();
                    }
                } else if (buttonElement === btn && !isCorrect) {
                    btn.classList.add('option-wrong');
                }
            });
            
            if (isCorrect) {
                const timeBonus = Math.max(0, timeLeft * 3);
                score += 100 + timeBonus;
                scoreSpan.textContent = score;
            }
            
            showAutoAdvance();
        }

        function showAutoAdvance() {
            autoAdvance.classList.remove('hidden');
            let countdown = 3;
            advanceTimer.textContent = countdown;
            
            autoAdvanceTimer = setInterval(() => {
                countdown--;
                advanceTimer.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(autoAdvanceTimer);
                    nextQuestion();
                }
            }, 1000);
        }

        function nextQuestion() {
            clearInterval(autoAdvanceTimer);
            
            if (currentQuestionIndex < currentQuestions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }

        function createSpookyConfetti() {
            const spookyColors = ['#cc6c00', '#cc3500', '#5b0000', '#3b0062', '#1f5b1f', '#ddd700'];
            const spookyShapes = ['🎃', '👻', '🦇', '🕷️', '🍬', '⭐'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti-piece';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    
                    if (Math.random() > 0.5) {
                        confetti.style.backgroundColor = spookyColors[Math.floor(Math.random() * spookyColors.length)];
                    } else {
                        confetti.textContent = spookyShapes[Math.floor(Math.random() * spookyShapes.length)];
                        confetti.style.fontSize = '16px';
                    }
                    
                    confetti.style.animation = `confettiSpook ${2 + Math.random() * 2}s linear forwards`;
                    confetti.style.animationDelay = Math.random() * 1 + 's';
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 4000);
                }, i * 30);
            }
        }

        function showResults() {
            quizScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');
            
            const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
            const totalTimeBonus = userAnswers.reduce((sum, answer) => sum + answer.timeBonus, 0);
            const percentage = Math.round((correctAnswers / currentQuestions.length) * 100);
            
            // Add score to leaderboard
            const playerRank = leaderboardManager.addScore(
                playerName, 
                score, 
                correctAnswers, 
                currentQuestions.length, 
                totalTimeBonus
            );
            
            let resultEmoji, resultTitle, resultMessage, resultColor;
            
            if (percentage >= 90) {
                resultEmoji = '👑';
                resultTitle = 'MASTER OF DARKNESS!';
                resultMessage = 'You are the ultimate Halloween legend!';
                resultColor = 'from-yellow-400 to-orange-500';
            } else if (percentage >= 70) {
                resultEmoji = '🎃';
                resultTitle = 'SPOOK-TACULAR!';
                resultMessage = 'You know your Halloween lore!';
                resultColor = 'from-orange-400 to-red-500';
            } else if (percentage >= 50) {
                resultEmoji = '👻';
                resultTitle = 'GHOSTLY GOOD!';
                resultMessage = 'A decent haunting performance!';
                resultColor = 'from-purple-400 to-pink-500';
            } else {
                resultEmoji = '🦇';
                resultTitle = 'BATTY BEGINNER!';
                resultMessage = 'Time to brush up on your spooky knowledge!';
                resultColor = 'from-gray-400 to-purple-500';
            }
            
            document.getElementById('resultsContent').innerHTML = `
                <div class="illustration mb-6">
                    ${resultEmoji}
                </div>
                <h2 class="text-3xl font-bold bg-gradient-to-r ${resultColor} bg-clip-text text-transparent mb-2 spooky-title">
                    ${resultTitle}
                </h2>
                <div class="text-lg font-bold text-orange-300 mb-4">
                    ${playerName}
                </div>
                <p class="text-lg text-orange-200 mb-6">${resultMessage}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-3 rounded-xl border border-orange-500/30">
                        <div class="text-xl font-bold text-orange-400">${correctAnswers}</div>
                        <div class="text-xs text-orange-300">Correct</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-3 rounded-xl border border-purple-500/30">
                        <div class="text-xl font-bold text-purple-400">${percentage}%</div>
                        <div class="text-xs text-purple-300">Accuracy</div>
                    </div>
                    <div class="bg-gradient-to-br from-red-900/50 to-orange-900/50 p-3 rounded-xl border border-red-500/30">
                        <div class="text-xl font-bold text-red-400">${score}</div>
                        <div class="text-xs text-red-300">Score</div>
                    </div>
                    <div class="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 p-3 rounded-xl border border-yellow-500/30">
                        <div class="text-xl font-bold text-yellow-400">${totalTimeBonus}</div>
                        <div class="text-xs text-yellow-300">Time Bonus</div>
                    </div>
                </div>
            `;
            
            // Update leaderboard displays
            updateLeaderboardDisplay();
            
            // Update player rank
            document.getElementById('playerRank').textContent = `#${playerRank}`;
            document.getElementById('totalPlayersResults').textContent = leaderboardManager.leaderboard.length;
        }

        function updateLeaderboardDisplay() {
            // Update preview leaderboard on start screen
            const previewContainer = document.getElementById('leaderboardPreview');
            const fullContainer = document.getElementById('fullLeaderboard');
            const totalPlayersSpan = document.getElementById('totalPlayers');
            
            const topScores = leaderboardManager.getTopScores(5);
            const allScores = leaderboardManager.getTopScores(50);
            
            // Update total players count
            if (totalPlayersSpan) {
                totalPlayersSpan.textContent = leaderboardManager.getTotalPlayers();
            }
            
            // Update preview leaderboard
            if (previewContainer) {
                if (topScores.length === 0) {
                    previewContainer.innerHTML = `
                        <div class="text-center text-orange-400 py-4">
                            <div class="text-4xl mb-2">👻</div>
                            <div class="text-sm">No brave souls yet...</div>
                            <div class="text-xs text-orange-500">Be the first to haunt!</div>
                        </div>
                    `;
                } else {
                    previewContainer.innerHTML = topScores.map((entry, index) => {
                        const rankEmoji = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎃';
                        const rankColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-orange-400';
                        
                        return `
                            <div class="flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-orange-900/30 p-2 rounded-lg border border-orange-500/20">
                                <div class="flex items-center space-x-2">
                                    <span class="text-lg">${rankEmoji}</span>
                                    <div>
                                        <div class="font-semibold text-orange-300 text-sm truncate max-w-24">${entry.name}</div>
                                        <div class="text-xs text-orange-500">${entry.percentage}% • ${entry.date}</div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold ${rankColor} text-sm">${entry.score}</div>
                                    <div class="text-xs text-orange-500">#${index + 1}</div>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
            
            // Update full leaderboard
            if (fullContainer) {
                if (allScores.length === 0) {
                    fullContainer.innerHTML = `
                        <div class="text-center text-orange-400 py-8">
                            <div class="text-6xl mb-4">👻</div>
                            <div class="text-lg">The leaderboard awaits...</div>
                            <div class="text-sm text-orange-500">Your score will appear here!</div>
                        </div>
                    `;
                } else {
                    fullContainer.innerHTML = allScores.map((entry, index) => {
                        const rankEmoji = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎃';
                        const rankColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-orange-400';
                        const isCurrentPlayer = entry.name === playerName && entry.score === score;
                        const highlightClass = isCurrentPlayer ? 'ring-2 ring-orange-400 bg-gradient-to-r from-orange-900/50 to-red-900/50' : '';
                        
                        return `
                            <div class="flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-orange-900/30 p-3 rounded-xl border border-orange-500/20 ${highlightClass}">
                                <div class="flex items-center space-x-3">
                                    <div class="text-center min-w-8">
                                        <div class="text-lg">${rankEmoji}</div>
                                        <div class="text-xs ${rankColor} font-bold">#${index + 1}</div>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-orange-300 truncate max-w-32">${entry.name}</div>
                                        <div class="text-xs text-orange-500">
                                            ${entry.correctAnswers}/${entry.totalQuestions} • ${entry.percentage}% • ${entry.date}
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold ${rankColor} text-lg">${entry.score}</div>
                                    <div class="text-xs text-orange-500">+${entry.timeBonus} bonus</div>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
        }

        function restartQuiz() {
            resultsScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            document.body.className = 'min-h-screen transition-all duration-1000 bg-demon-portal';
            
            // Clear player name for new game
            document.getElementById('playerName').value = '';
            playerName = '';
            
            // Update leaderboard display
            updateLeaderboardDisplay();
        }

        function shareResults() {
            const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
            const playerRank = document.getElementById('playerRank').textContent;
            const totalPlayers = document.getElementById('totalPlayersResults').textContent;
            const text = `🎃 ${playerName} just survived the Spooky Halloween Quiz! Ranked ${playerRank} out of ${totalPlayers} with ${score} points (${correctAnswers}/${currentQuestions.length} correct). Can you beat my haunting score? 👻`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Spooky Halloween Quiz Results',
                    text: text,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => {
                    alert('Spooky results copied to clipboard! Share the horror! 🎃👻');
                });
            }
        }

        // Create cute Halloween background elements
        function createCuteHalloweenBackground() {
            const cuteContainer = document.getElementById('cuteHalloweenBg');
            
            // Create cute pumpkins
            for (let i = 0; i < 4; i++) {
                const pumpkin = document.createElement('div');
                pumpkin.className = 'cute-pumpkin';
                pumpkin.style.left = Math.random() * 90 + '%';
                pumpkin.style.top = Math.random() * 80 + '%';
                pumpkin.style.animationDelay = Math.random() * 4 + 's';
                pumpkin.style.animationDuration = (3 + Math.random() * 2) + 's';
                cuteContainer.appendChild(pumpkin);
            }
            
            // Create cute ghosts
            for (let i = 0; i < 3; i++) {
                const ghost = document.createElement('div');
                ghost.className = 'cute-ghost';
                ghost.style.left = Math.random() * 85 + '%';
                ghost.style.top = Math.random() * 70 + '%';
                ghost.style.animationDelay = Math.random() * 5 + 's';
                ghost.style.animationDuration = (4 + Math.random() * 2) + 's';
                cuteContainer.appendChild(ghost);
            }
            
            // Create cute bats
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const bat = document.createElement('div');
                    bat.className = 'cute-bat';
                    bat.style.top = Math.random() * 60 + '%';
                    bat.style.animationDelay = Math.random() * 6 + 's';
                    bat.style.animationDuration = (5 + Math.random() * 3) + 's';
                    cuteContainer.appendChild(bat);
                    
                    setTimeout(() => {
                        if (bat.parentNode) {
                            bat.remove();
                        }
                    }, 8000);
                }, i * 3000);
            }
            
            // Create witch hats
            for (let i = 0; i < 2; i++) {
                const hat = document.createElement('div');
                hat.className = 'cute-witch-hat';
                hat.style.left = Math.random() * 80 + '%';
                hat.style.top = Math.random() * 60 + '%';
                hat.style.animationDelay = Math.random() * 3 + 's';
                cuteContainer.appendChild(hat);
            }
            
            // Create rolling candies
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const candy = document.createElement('div');
                    candy.className = 'cute-candy';
                    candy.style.top = 70 + Math.random() * 20 + '%';
                    candy.style.animationDelay = Math.random() * 4 + 's';
                    candy.style.animationDuration = (3 + Math.random() * 2) + 's';
                    cuteContainer.appendChild(candy);
                    
                    setTimeout(() => {
                        if (candy.parentNode) {
                            candy.remove();
                        }
                    }, 6000);
                }, i * 2000);
            }
            
            // Create cute spiders
            for (let i = 0; i < 2; i++) {
                const spider = document.createElement('div');
                spider.className = 'cute-spider';
                spider.style.top = Math.random() * 50 + '%';
                spider.style.animationDelay = Math.random() * 5 + 's';
                cuteContainer.appendChild(spider);
            }
            
            // Create sleepy moon
            const moon = document.createElement('div');
            moon.className = 'cute-moon';
            moon.style.right = '10%';
            moon.style.top = '10%';
            cuteContainer.appendChild(moon);
            
            // Create twinkling stars
            for (let i = 0; i < 8; i++) {
                const star = document.createElement('div');
                star.className = 'cute-star';
                star.style.left = Math.random() * 95 + '%';
                star.style.top = Math.random() * 40 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                star.style.animationDuration = (1.5 + Math.random()) + 's';
                cuteContainer.appendChild(star);
            }
            
            // Refresh cute elements periodically
            setTimeout(() => {
                // Remove old candies and bats, create new ones
                const oldCandies = cuteContainer.querySelectorAll('.cute-candy');
                const oldBats = cuteContainer.querySelectorAll('.cute-bat');
                oldCandies.forEach(candy => candy.remove());
                oldBats.forEach(bat => bat.remove());
                
                // Recreate some elements
                createCuteHalloweenBackground();
            }, 12000);
        }

        // Create floating Halloween elements
        function createFloatingElements() {
            // Create bats
            const batsContainer = document.getElementById('batsContainer');
            const batEmojis = ['🦇', '🦇', '🦇'];
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const bat = document.createElement('div');
                    bat.className = 'bat';
                    bat.textContent = batEmojis[i % batEmojis.length];
                    bat.style.top = Math.random() * 50 + '%';
                    bat.style.animationDelay = Math.random() * 8 + 's';
                    bat.style.animationDuration = (8 + Math.random() * 4) + 's';
                    batsContainer.appendChild(bat);
                    
                    setTimeout(() => {
                        if (bat.parentNode) {
                            bat.remove();
                        }
                    }, 12000);
                }, i * 2000);
            }
            
            // Create ghosts
            const ghostsContainer = document.getElementById('ghostsContainer');
            const ghostEmojis = ['👻', '🤍', '👻'];
            
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const ghost = document.createElement('div');
                    ghost.className = 'ghost';
                    ghost.textContent = ghostEmojis[i % ghostEmojis.length];
                    ghost.style.left = Math.random() * 80 + '%';
                    ghost.style.top = Math.random() * 60 + '%';
                    ghost.style.animationDelay = Math.random() * 6 + 's';
                    ghostsContainer.appendChild(ghost);
                    
                    setTimeout(() => {
                        if (ghost.parentNode) {
                            ghost.remove();
                        }
                    }, 6000);
                }, i * 3000);
            }
            
            // Create spiders
            const spidersContainer = document.getElementById('spidersContainer');
            const spiderEmojis = ['🕷️', '🕸️'];
            
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const spider = document.createElement('div');
                    spider.className = 'spider';
                    spider.textContent = spiderEmojis[i % spiderEmojis.length];
                    spider.style.left = Math.random() * 90 + '%';
                    spider.style.animationDelay = Math.random() * 4 + 's';
                    spidersContainer.appendChild(spider);
                    
                    setTimeout(() => {
                        if (spider.parentNode) {
                            spider.remove();
                        }
                    }, 4000);
                }, i * 2000);
            }
            
            // Continuously create new elements
            setTimeout(createFloatingElements, 8000);
        }

        // Initialize the quiz
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.opacity = '1';
                    createCuteHalloweenBackground();
                    createFloatingElements();
                    updateLeaderboardDisplay();
                }, 500);
            }, 2000);
            
            // Add Enter key support for name input
            document.getElementById('playerName').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    startQuiz();
                }
            });
        });

        // Error handling
        window.addEventListener('error', function(e) {
            console.warn('Spooky Quiz: Non-critical error handled:', e.message);
        });
