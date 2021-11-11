'use strict';

// 익명함수
(() => {
    const actions = {
        birdFlies(key) {

            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
                // window 폭만큼 날아가게 하기
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0];
    let ioIndex;

    // IntersectionObserver API
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; // *1 : numberType으로 변환
    });

    // data-index를 부여한다
    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]); // el.observe(관찰대상)
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    // 현재 graphic-item 보여주기
    function activate(action) {
        currentItem.classList.add('visible');

        // 만약 birdFlies가 들어오면, birdFlies 메소드 실행
        if (action) {
            actions[action](true);
        }
    }

    // 현재 graphic-item 지우기
    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', ()=> {
        let step;
        let boundingRect;

        // for (let i = 0; i < stepElems.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++ ) {
        
            step = stepElems[i];

            //step에 값이 없다면, pass하고다음턴 (step의 초기값0이므로) 
            if(!step) continue; 

            // step.getBoundingClientRect.top을 구한다
            boundingRect = step.getBoundingClientRect();

            // 범위 설정 (창 사이즈 높이가 기준으로 10~80% 사이)
            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {

                inactivate(currentItem.dataset.action);
                // step.dataset의 index번호에 따라 img가 보이게 한다
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }    
        }
    });


    

    activate(); // 처음 graghicElems[0]번째 이미지를 보여준다
})();