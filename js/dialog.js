function Dialog() {

	var container = document.querySelector('.wrapper'),
		dialogBox = document.querySelector('.modal'),
		dialogTitle = dialogBox.getElementsByTagName('h1')[0],
		addEditBtn = dialogBox.querySelector('input[data-button="addEdit"]'),
		inputs = dialogBox.getElementsByTagName('input'),
		txtField = dialogBox.getElementsByTagName('textarea')[0]
		// storedData = JSON.parse(localStorage.tableData)
		// table = new Table()


	function edit() {
		console.log('function EDIT from dialog.js')
		console.log(addEditBtn)
		show()
		dialogTitle.innerHTML = 'Редактировать пользователя'
		addEditBtn.value = 'Редактировать'

	}

	function addUser() {
		console.log('function addUser from dialog.js')
		show()
		dialogTitle.innerHTML = 'Добавить пользователя'
		addEditBtn.value = 'Добавить'
		addEditBtn.addEventListener('click', save, false)
	}

	function show() {
		dialogBox.className += ' show'
		container.className += ' fade'
		document.addEventListener('keyup', function(e) { ifEsc(e) }, false)

		console.log('inputs: ', inputs)
		
	}

	function close() {
		dialogBox.className = 'modal'
		container.className = 'wrapper'
		console.log('close')
	}

	function ifEsc(e) {
		if(e.keyCode == 27) {
			close()
		}
	}

	function save() {
		var newArray = {}
		for(var i = 0, length = inputs.length; i < length; i++) {
			if (inputs[i].type == 'text') {
				// console.log( 'attribute', inputs[i].getAttribute("data-name"), typeof inputs[i].getAttribute("data-name") )
				key = inputs[i].getAttribute("data-name")
				// console.log('key: ', key)
				newArray[key] = inputs[i].value
			}
		}
		newArray['about'] = txtField.value
/*		storedData.push(newArray)
		console.log('1: ', storedData, storedData.length)
		localStorage.tableData = JSON.stringify(storedData)
		dataChanged = true
		console.log('newStoredData: ', newStoredData)
*/
		close()
	}

	return {edit: edit, addUser: addUser}

}