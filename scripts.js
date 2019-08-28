document.addEventListener('DOMContentLoaded', function () {

	
	var board = document.getElementById('board');
	var newNoteBtn = document.querySelector('#addNewNote');
	notesArr = [];

	if(localStorage.getItem('notes')){
		notesArr = JSON.parse(localStorage.getItem('notes'));
	}
  // конструктор объектов (с параметрами)
	function Note(x,y,text){
	this.x = 0;
	this.y = 0;
	this.text = text;
	}

	var deltaX;
	var deltaY;
	var dragNote;
	var dragObj;

		 // +++++++++ обработчик клика по кнопке создания новой заметки
	newNoteBtn.onclick = function(){
		notesArr.push(new Note(10,10,''));
		 // запись данных в localStorage 
		localStorage.setItem('notes',JSON.stringify(notesArr));
		renderHTML(); //запускаем отрисовку
	}

	// функция отрисовки всех объектов
	function renderHTML() {
		board.innerHTML = '';
		notesArr.map(function(item,index){
			var newNote = createOneNoteMarkup(item,index);
			// вешаем обработчик события на каждую заметку
			newNote.onmousedown = function(e){
				window.addEventListener('mousemove', stickToMouse);	
				deltaX = e.pageX - newNote.offsetLeft;
				deltaY = e.pageY - newNote.offsetTop;
				  // текущая заметка - та по которой кликнули
				dragNote = newNote;
				// текущий объект - объект той заметки по которой кликнули
				dragObj = item;
			}

			newNote.onmouseup = function(e){
				window.removeEventListener('mousemove', stickToMouse);
				// запись данных в localStorage 
				localStorage.setItem('notes',JSON.stringify(notesArr));
				}


		// добавляем заметку в html
			board.appendChild(newNote);
		});
	}

		  // функция для создания разметки одной заметки
	function createOneNoteMarkup(object,index){
		var tempNote = document.createElement('div');
		tempNote.classList.add('note');
		tempNote.style.left = object.x + 'px'; 
		tempNote.style.top = object.y + 'px'; 
		
		   // формирование кнопки удаления
		var deleteBtn = document.createElement('button');
		deleteBtn.classList.add('deleteBtn');
		deleteBtn.textContent = 'Delete';
		tempNote.appendChild(deleteBtn);
		// обработчик клика по кнопке удаления
		deleteBtn.onclick = function(){
			notesArr.splice(index,1);
	    	// запись данных в localStorage 
	    	localStorage.setItem('notes',JSON.stringify(notesArr));
	    	renderHTML();
	    }

	    var textDiv = document.createElement('div');
 	    textDiv.textContent = object.text;
	    textDiv.style.color = 'yellow';
	    tempNote.appendChild(textDiv);

	    tempNote.ondblclick = function(){
 			var textarea = document.createElement('textarea');
 			textarea.classList.add('text');
 			tempNote.appendChild(textarea);
 			var buttonYes = document.createElement('button');
 			buttonYes.classList.add('yes');
 			buttonYes.textContent = 'Enter';
 			tempNote.appendChild(buttonYes);
 			var buttonNo = document.createElement('button');
 			buttonNo.classList.add('no');
 			buttonNo.textContent = 'Esc';
 			tempNote.appendChild(buttonNo);

 			buttonYes.onclick = function() {
 				object.text = textarea.value;
 				localStorage.setItem('notes',JSON.stringify(notesArr));
	    		renderHTML();
	    	}
	    	buttonNo.onclick = function() {
 				tempNote.remove(textarea);
 				localStorage.setItem('notes',JSON.stringify(notesArr));
	    		renderHTML();
	    	}
		}
		return tempNote
	}
		

	  // функция для перемещения одной заметки и записи координат в текущий объект
	function stickToMouse(e) {
		dragNote.style.left = (e.pageX - deltaX) + 'px';
		dragNote.style.top = (e.pageY - deltaY) + 'px';

		dragObj.y = e.pageY - deltaY;
		dragObj.x = e.pageX - deltaX;
	}


	renderHTML();//запускаем отрисовку






















});