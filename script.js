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
        }        
      },
      Q2: {
        question: "This is the second question.",
        content: {
          4: {
            answer: "Answer 4",
            next: "Q3",
          },
          5: {
            answer: "Answer 5",
            next: "Q3"
          },
          6: {
            answer: "Answer 6",
            next: "Q4"
          }
        }
      },
      Q3: {
        question: "This is the third question.",
        content: {
          7: {
            answer: "Answer 7",
            next: 'Q4'
          },
          8: {
            answer: "Answer 8",
            next: 'Q4'
          },
          9: {
            answer: "Answer 9",
            next: 'Q4'
          }
        }        
      },
      Q4: {
        question: "This is the forth question.",
        content: {
          10: {
            answer: "Answer 10",
            next: 'end'
          },
          11: {
            answer: "Answer 11",
            next: 'end'
          },
          12: {
            answer: "Answer 12",
            next: 'end'
          }
        },        
      }
    };
    
  //  console.log(infoObj.Q1.question);
  //  console.log(infoObj.Q1.content);
  //  console.log(infoObj.Q1.answers);
    
    init();
    
    function init() {
      populateFrontEnd();
      nextQuestion(); 
      prevQuestion();
    }

    function prevQuestion() {
      document.querySelector('#prev-question').addEventListener('click', () => {
      // 1. Update Journey
      let oldItem = journey[journey.length - 1]; 
      journey.pop();

      // 2. Remove Left Content
      document.querySelector('.left.grid').querySelectorAll('.content').forEach((element) => {
        element.remove();
      });

      // 3. Remove old Q.
      document.querySelector(`.question-wrapper[data-attribute="${oldItem}"]`).remove();

      // 4. Make previous question changeable
      // console.log(document.querySelector(`select[name="${journey[journey.length - 1]}"]`));
      
      console.log(journey[journey.length - 1]);
      document.querySelector(`select[name="${journey[journey.length - 1]}"]`).disabled = false;
        
        // 5. Show new left Content
        generateContent(); 
        // content has just been re-generated, reapply selected.
        let selectedKey = document.querySelector(`select[name="${journey[journey.length - 1]}"]`).querySelector('option.selected').getAttribute('data-key');
        document.querySelector(`.content[data-key="${selectedKey}"]`).classList.add('selected');
        contentToAnswer();

        // 6. Button Updates
        buttonUpdates(); 
      });
    }

  function nextQuestion() {
      document.querySelector('#next-question').addEventListener('click', () => {
        // 1. Update Journey
        let currentItem = journey[journey.length - 1]; 
        selectedValue = document.querySelector(`select[name="${currentItem}"]`).querySelector('option.selected');
        journey.push(eval('infoObj.' + currentItem + '.content[' + selectedValue.getAttribute('data-key') + '].next'));

        // 2. Remove Left Content.
        document.querySelector('.left.grid').querySelectorAll('.content').forEach((element) => {
          element.remove();
        });

        // 3. Make current Question unchangeable
        document.querySelector(`select[name="${currentItem}"]`).disabled = true;

        // 3. Show new Left content & append Question
        populateFrontEnd(); 
        
        // 4. Button updates (No prev if journey.length = 1, no search if journey.length < 2, etc)
        buttonUpdates();
      });
    }

    function buttonUpdates() {
      if(journey.length >= 2) {
        document.querySelector('#prev-question').classList.remove('d-none');
      } else {
        document.querySelector('#prev-question').classList.add('d-none');
      }
      if(journey.length >= 3) {
        document.querySelector('#search-question').classList.remove('d-none');
      } else {
        document.querySelector('#search-question').classList.add('d-none');
      }
    }
    
  function populateFrontEnd() {
      generateContent();
      generateQuestions();
      contentToAnswer();
    }
    
    function generateContent() {
        let output = ""; 
        let currentItem = journey[journey.length - 1];
        let currentRoute = 'infoObj.' + currentItem + '.content';
        for(const item in eval(currentRoute)) {          
            output += `<div class="content" data-key="${item}" data-current="${currentItem}" data-next="${eval(currentRoute)[item].next}"><h2>${eval(currentRoute)[item].answer}</h2></div>`;
        }
        document.querySelector('.grid.left').insertAdjacentHTML("beforeend", output);
    }

    // addQ is boolean, false is remove
    function generateQuestions() {
        let output = "";
        let currentItem = journey[journey.length - 1];
        output = `<div class="question-wrapper" data-attribute="${currentItem}">`;
            output += `<div class="question">${eval('infoObj.' + currentItem + '.question')}</div>`;
            output += `<div class="answers"><select name="${currentItem}">`;
            for(const item in eval('infoObj.' + currentItem + '.content')) {
                output += `<option class="answer" value="${eval('infoObj.' + currentItem + '.content')[item].answer}" data-key="${item}" data-next="${eval('infoObj.' + currentItem + '.content')[item].next}">${eval('infoObj.' + currentItem + '.content')[item].answer}</option>`;
            }
        output += `</select></div></div>`;
        document.querySelector('.questions').insertAdjacentHTML("beforeend", output);
    }

    function contentToAnswer() {    
      // When you Click Content, update selected class and Option.
      document.querySelectorAll('.content').forEach((contentBlock) => {
        contentBlock.addEventListener('click', () => {
          document.querySelectorAll('.content').forEach((secondLoop) => {
            if( secondLoop.classList.contains('selected')) {
              secondLoop.classList.remove('selected');
            }             
          });
          contentBlock.classList.add('selected');

          document.querySelector(`select[name="${contentBlock.getAttribute('data-current')}"]`).querySelectorAll("option.answer").forEach((answer) => {
            if(answer.classList.contains("selected")) {
              answer.classList.remove("selected");
              answer.selected = false;
            }
          });
          document.querySelector(`option[data-key="${contentBlock.getAttribute('data-key')}"]`).selected = true; 
          document.querySelector(`option[data-key="${contentBlock.getAttribute('data-key')}"]`).classList.add('selected');          
        });                
      });

      // When you click select, update content. 
      document.querySelector(`select[name="${journey[journey.length - 1]}"]`).addEventListener('change', (e) => {
        document.querySelector(`select[name="${journey[journey.length - 1]}"]`).querySelectorAll('option.answer').forEach((answer) => {
          if(answer.classList.contains('selected')) {
            answer.classList.remove('selected');
          }
        });

        document.querySelectorAll('.content').forEach((contentBlock) => {
          if(contentBlock.classList.contains('selected')) {
            contentBlock.classList.remove('selected');
          }
        });
        document.querySelector(`option[value="${e.target.value}"]`).classList.add('selected');
        let currentDataKey = document.querySelector(`option[value="${e.target.value}"]`).getAttribute('data-key');
        document.querySelector(`.content[data-key="${currentDataKey}"]`).classList.add('selected');
      });

      // When you hit next, or first load the browser, the first content item needs to be selected. 
      let anySelected = false;
      document.querySelector(`select[name="${journey[journey.length - 1]}"]`).querySelectorAll('option.answer').forEach((answer) => {
        if(answer.classList.contains('selected')) {
          anySelected = true;
        }
      });

      if(anySelected === false) {
        document.querySelector('.left.grid').querySelector('.content').classList.add("selected");
        document.querySelector(`option[data-key="${document.querySelector('.left.grid').querySelector('.content').getAttribute('data-key')}"]`).classList.add('selected');
        document.querySelector(`option[data-key="${document.querySelector('.left.grid').querySelector('.content').getAttribute('data-key')}"]`).selected = true;
      }
    }
    
  }, false);