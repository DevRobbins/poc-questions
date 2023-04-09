document.addEventListener('DOMContentLoaded', function () {
    var journey = ["Q1"];
    var infoObj = {
      Q1: {
        question: "This is the first question.",
        content: {
          1: {
            answer: "Answer 1",
            next: "Q2"
          },
          2: {
            answer: "Answer 2",
            next: "Q3"
          },           
          3: {
            answer: "Answer 3",
            next: 'Q4'
          }
        },        
      },
      Q2: {
        question: "This is the second question.",
        content: {
          4: "Answer 4",
          5: "Answer 5",
          6: "Answer 6"
        },
        answers: {
          Q2: 'Answer 4',
          Q3: "Answer 5",
          Q4: "Answer 6"
        }
      },
      Q3: {
        question: "This is the third question.",
        content: {
          7: "Answer 7",
          8: "Answer 8",
          9: "Answer 9"
        },
        answers: {
          Q2: 'Answer 7',
          Q3: "Answer 8",
          Q4: "Answer 9"
        }
      },
      Q4: {
        question: "This is the forth question.",
        content: {
          10: "Answer 10",
          11: "Answer 11",
          12: "Answer 12"
        },
        answers: {
          Q2: 'Answer 10',
          Q3: "Answer 11",
          Q4: "Answer 12"
        }
      }
    };
    
  //  console.log(infoObj.Q1.question);
  //  console.log(infoObj.Q1.content);
  //  console.log(infoObj.Q1.answers);
    
    init();
    
    function init() {
      populateFrontEnd();
    }
    
  function populateFrontEnd() {
      generateContent();
      generateQuestions(true);
    }
    
    function generateContent() {
        let output = ""; 
        let currentItem = journey[journey.length - 1];
        let currentRoute = 'infoObj.' + currentItem + '.content';
        // console.log(eval(currentRoute));
        for(const item in eval(currentRoute)) {
            output += `<div class="content" data-key="${item}" data-next="${eval(currentRoute)[item].next}"><h2>${eval(currentRoute)[item].answer}</h2></div>`;
            // console.log(`${item}: ${eval(currentRoute)[item]}`);
        }
        document.querySelector('.grid.left').insertAdjacentHTML("beforeend", output);
    }

    // addQ is boolean, false is remove
    function generateQuestions(addQ) {
        let output = "";
        let currentItem = journey[journey.length - 1];
        if(addQ) {
            output = `<div class="question-wrapper" data-attribute="${currentItem}">`;
                output += `<div class="question">${eval('infoObj.' + currentItem + '.question')}</div>`;
                output += `<div class="answers"><select name="${currentItem}">`;
                for(const item in eval('infoObj.' + currentItem + '.content')) {
                    output += `<option class="answer" value="${eval('infoObj.' + currentItem + '.content')[item].answer}" data-key="${item}" data-next="${eval('infoObj.' + currentItem + '.content')[item].next}">${eval('infoObj.' + currentItem + '.content')[item].answer}</option>`;
                }
            output += `</select></div></div>`;
            document.querySelector('.right.questions').insertAdjacentHTML("beforeend", output);
        }
        // console.log(output);
    }
    
  }, false);