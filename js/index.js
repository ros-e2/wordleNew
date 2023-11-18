const 정답 = 'APPLE';

let attempts = 0;
let index = 0;
let timer;

function startTimer() {
  const durationInput = document.getElementById('duration');
  const timerOutput = document.getElementById('timer');

  let duration = parseInt(durationInput.value, 10);

  if (isNaN(duration) || duration <= 0) {
    alert('올바른 숫자를 입력하세요.');
    return;
  }

  // timerOutput.textContent = `타이머 시작: ${duration}초`;

  // const timerInterval = setInterval(() => {
  //   if (duration > 0) {
  //     duration--;
  //     timerOutput.textContent = `남은 시간: ${duration}초`;
  //   } else {
  //     clearInterval(timerInterval);
  //     timerOutput.textContent = '타이머 종료';
  //   }
  // }, 1000);
}

function appStart() {
  const displayGameover = () => {
    const div = document.createElement('div');
    div.innerText = '게임이 종료됐습니다';
    div.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top :40vh; left:45vw; background-color:green;width:200px;height:50px';
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener('keydown', handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    //정답확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = 'black';
      } else if (정답.includes(입력한_글자)) block.style.background = '#B31C1C';
      else block.style.background = '#343542';
      block.style.color = 'white';
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = '';
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    // if (index === 5) return;
    // 5되면 아래 다 주석처리 ㅋ
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    // if (event.key === 'Enter') {
    //   handleEnterKey();
    // } 아래가 더 이쁘고 한 줄로 가능하면 중괄호 빼도 괜찮 ㅎㅎ

    if (event.key === 'Backspace') handleBackspace();
    else if (index === 5) {
      if (event.key === 'Enter') handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      // index =index +1; 아래와 같음
      index += 1;
      // index++; 이건 위와 같음 ㅋ
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, '0');
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, '0');
      const timerDiv = document.querySelector('#timer');
      timerDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
    // console.log(timer);
  };

  startTimer();
  window.addEventListener('keydown', handleKeydown);
}

appStart();
