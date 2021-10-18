/* loop를 너무 많이 돌고 있어서, 비효율적인 코드, 눈에 보이는 컨텐츠만 컨트롤 할 수 있도록 해야 한다 */


// 익명함수 선언 : 글로벌 변수로 선언하지 않기 위해서
(()=> {

    const stepElems = document.querySelectorAll(".step"); // 텍스트
    const graghicElems = document.querySelectorAll('.graphic-item'); //이미지
    let currentItem = graghicElems[0]; // 현재 활성화 된 (visible 클래스가 붙은) .graghic-item을 지정

    // stepElems에 data-index를 붙여준다 
    for (let i = 0; i < 10; i++) {
        stepElems[i].dataset.index = i;
        graghicElems[i].dataset.index = i;
    }

    window.addEventListener("scroll", ()=> {
        let step; //stepElems 하나하나를 간단하게 변수로 쓰기 위해서 만듬
        let boundingRect;
        for(let i = 0; i < stepElems.length; i++ ) {

            step = stepElems[i]; 

            // step.getBoundingClientRect.top을 구한다
            boundingRect = step.getBoundingClientRect();
            
            // 범위 설정 (창 사이즈 높이가 기준으로 10~80% 사이)
            if ((boundingRect.top > window.innerHeight * 0.1) && (boundingRect.top < window.innerHeight * 0.8)) {
                console.log(step.dataset.index)
                
                // currentItem(활성화된 변수)가 "있으면", 먼저 지운다
                if (currentItem) {
                    currentItem.classList.remove('visible');
                }
                // step.dataset의 index번호에 따라 img가 보이게 한다
                currentItem = graghicElems[step.dataset.index];
                currentItem.classList.add('visible');
            }
        }
    });

    activate(); // 처음 graghicElems[0]번째 이미지를 보여준다
})();

