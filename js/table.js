
function Table(sel) {
	
	var dialog = new Dialog(),
		datas = new Datas(),
		container = document.querySelector('.wrapper'),
		table = container.getElementsByTagName('table')[0],
		thead = container.getElementsByTagName('thead')[0],
		tbody = container.getElementsByTagName('tbody')[0],
		input = container.getElementsByTagName('input')[0],
		clearBtn = container.querySelector('.clear'),
		select = container.getElementsByTagName('select')[0],
		addBtn = container.querySelector('#add'),
		sortedOn = -4,
		storedData = {},
		tempObj = {},
		rowArray = [], 
		changed = false
		
		// titles = thead.getElementsByTagName('td')

		console.log('container: ', container)
		// console.log('titles: ', titles)


	function init() {
		// interface Storage { void clear() }; storedData = {}
		storeTabl(datas.datas)
		renderTabl(storedData)
		addListeners()

	}

	function addListeners() {
		thead.addEventListener('click', function(e) { onClickTitle(e) }, true)
		input.addEventListener('focus', function() { onFocus() }, false)
		input.addEventListener('blur', function() { onBlur() }, false)
		input.addEventListener('keyup', function(e) { onEnter(e) }, false)
		clearBtn.addEventListener('click', function(e) { clearInput(e) }, false)
		tbody.addEventListener('click', function(e) {editRow(e)}, false)
		addBtn.addEventListener('click', function() { addUser() }, false)
		
	}

	function storeTabl(obj) {
		localStorage.tableData = JSON.stringify(obj)
		storedData = JSON.parse(localStorage.tableData)
	}

	function isLocalStorageAvailable() {
	    try {
	        return 'localStorage' in window && window['localStorage'] !== null
	    } catch (e) {
	        return false
	    }
	}

	function renderTabl(obj) {
		for (var i = 0, length = obj.length; i < length; i++) {
			tri = document.createElement('tr')
			tbody.appendChild(tri)
			for (var key in obj[i]) {
				tdi = document.createElement('td')
				if (obj[i][key].length > 30) { 
					shortStr = obj[i][key].substr(0, 30) + '...'
					tdi.innerHTML = shortStr
				} else {
					tdi.innerHTML = obj[i][key]
				}
				tri.appendChild(tdi)
			}
			editDiv = document.createElement('div')
			editDiv.className = 'editIcon'
			tdi.appendChild(editDiv)
		}

	}

	function clearTabl() {
		while (tbody.firstChild) {
    		tbody.removeChild(tbody.firstChild)
		}	
	}

	function onClickTitle(e) {
		e.preventDefault()
		var title = e.target.children[0] || e.target
		setArrow(title)
		sortByOrder(e.target)
	}

	function setArrow(title) {
		if (!title.className) {
			removeOtherArrows()
			title.className = 'desc'
		} else {
			if ( title.className == 'desc' ) { 

				title.className = 'asc'
			} else {
				title.className = 'desc'
			}
		}
	}

	function removeOtherArrows() {
		var titles = thead.getElementsByTagName('a')
		for (var i = 0, length = titles.length; i < length; i++) {
			titles[i].removeAttribute('class')
		}
	}

	function sortByOrder(target) {
		
  		var rows = tbody.getElementsByTagName('tr')

  		sortOn = getColNum(target)

  		for (var i=0, length=rows.length; i<length; i++) {  
			rowArray[i] = {}  
			rowArray[i].oldIndex = i
			rowArray[i].value = rows[i].getElementsByTagName('td')[sortOn].firstChild.nodeValue
		}

		if (sortOn == sortedOn) { rowArray.reverse() }  
		else {  
			sortedOn = sortOn
			rowArray.sort(RowCompare)
		}

		var newTbody = document.createElement('tbody')
		for (var i=0, length=rowArray.length ; i<length; i++) {  
			newTbody.appendChild(rows[rowArray[i].oldIndex].cloneNode(true))
		}  
 
		table.replaceChild(newTbody, tbody)
		tbody = newTbody

	}

	function RowCompare(a, b) {
		var aVal = a.value  
		var bVal = b.value
		return (aVal == bVal ? 0 : (aVal > bVal ? 1 : -1))	
	}

	function getColNum(target) {

		var titles = thead.getElementsByTagName('a'),
			colNum = 0
		for (var i = 0, length = titles.length; i < length; i++) {
			if (titles[i].innerHTML == target.innerHTML) colNum = i
		}

		return colNum

	}

	function onFocus() {
		if (input.value == input.defaultValue) input.value = ''
	}

	function onBlur() {
		if (input.value == '') input.value = input.defaultValue
	}

	function clearInput(e) {
		input.value = input.defaultValue
		clearTabl()
		renderTabl(storedData)
	}

	function onEnter(e) {
		var searchWord = input.value.toLowerCase(),
			searchWordLength = input.value.length,
			sortData = []

		console.log(e.keyCode)

		if(e.keyCode == 27) {
			input.blur()
			return
		}

		for (var i = 0, length = storedData.length; i < length; i++) {
			if ( storedData[i].name.toLowerCase().indexOf(searchWord) != -1 || storedData[i].about.toLowerCase().indexOf(searchWord) != -1 ) {
				sortData.push(storedData[i])
			}
		}

		clearTabl()
		renderTabl(sortData)

	}

	function editRow(e) {

		if ( e.target.className == 'editIcon') {
			console.log( e.target.parentNode )
			dialog.edit()
		}
	}

	function addUser() {
		dialog.addUser()
		console.log('newStoredData: ', dialog.newStoredData)

		changed = dialog.dataChanged
		console.log(changed)

		// clearTabl()
		console.log('2: ', storedData, storedData.length)
		storedData = dialog.newStoredData
		// renderTabl(storedData)
		console.log('3: ', storedData, storedData.length)
	}







	init()

}

