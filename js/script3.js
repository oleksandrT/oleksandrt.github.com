var datas = [
	{name: '5 элемент', business: '-', person: 'Константин Рыкин', income: '12323', total: '1023344', deals: '23 11 1'},
	{name: 'Asia Group', business: '-', person: 'Иван Подвязный', income: '12323', total: '1023344', deals: '3 66'},
	{name: 'Альтависта', business: '-', person: 'Ал Иванов', income: '12323', total: '1023344', deals: '1 22 12'},
	{name: 'Devko', business: '-', person: 'Крейзи', income: '12323', total: '1023344', deals: '2 12 12'},
	{name: 'Haker Ltd', business: '-', person: 'Нонейм Нонеймович', income: '12323', total: '1023344', deals: '3 11 12'},
	{name: 'TrueMan', business: '-', person: 'Джим Кар', income: '12323', total: '1023344', deals: '2 4 66'},
	{name: 'Валькирия', business: '-', person: 'Всемогор Третий', income: '12323', total: '1023344', deals: '2 4 '},
	{name: 'Бледный', business: '-', person: 'Какой-то чувак', income: '12323', total: '1023344', deals: '2 2 4'},
	{name: 'Ой-вей', business: '-', person: 'Дядя Вася', income: '12323', total: '1023344', deals: '3'},
	{name: 'Шотонадо', business: '-', person: 'Михаил Олейников', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Трында', business: '-', person: 'Анти Рубаи', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Залото и серебро', business: '-', person: 'Костя Чех', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Макитра', business: '-', person: 'Братишка', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Эпл инк', business: '-', person: 'Стив Дж', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Токотако', business: '-', person: 'Аико Мусаси', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'ЗурабПаблишн', business: '-', person: 'Зараб Цхэвадзе', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Веселка', business: '-', person: 'Жанна Хруст', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Торнадо', business: '-', person: 'Мен Дикаров', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Битлджус', business: '-', person: 'Битлджус', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Буги-вуги', business: '-', person: 'Джон Скотт', income: '12323', total: '1023344', deals: '22 2 1'},
	{name: 'Мучо', business: '-', person: 'Мигель Барилло', income: '12323', total: '1023344', deals: '1 2 3'}
]

var DataTable = {

	titles: ['Название', 'Вид деятельности', 'Контактное лицо', 'Заработано, грн', 'Сумма, грн', 'Сделки'],

	init: function(options) {
		var me = this

		this.setElements()
		this.fillWithData()
		this.titlePosition()
		this.paging()
		this.setEventListeners()

		// this.setURL()

	},

	setElements: function() {
		this.table = document.querySelector('.clients')
		this.thead = this.table.getElementsByTagName('thead')[0]
		var controls = document.querySelector('.controls')
		this.input = controls.getElementsByTagName('input')[0]
		this.select = controls.getElementsByTagName('select')[0]
	},

	setEventListeners: function() {
		var me = this
		this.input.addEventListener( 'focus', function(){me.onFocus(me.input)} )
		this.select.addEventListener( 'change', function(){me.selectChange(me.select.value)} )
		document.addEventListener( 'keyup', function(e){me.handlerSelect(e)} )
		this.thead.addEventListener('click', function(e){me.onClickTitle(e)})
	},

	setURL: function(){
		var query = window.location.pathname
		history.pushState({}, '', query+"?sort=name=desc&page=1&filter=&type=*")
	},


	fillWithData: function() {
		var me = this,
			tri, tdi, icon
		this.tbody = this.table.getElementsByTagName('tbody')[0]
		for (var i = 0, Ntrs = datas.length; i < Ntrs; i++) {
			tri = document.createElement('tr')
			this.tbody.appendChild(tri)
			for(var key in datas[i]) {
				tdi = document.createElement('td')
				tdi.innerHTML = datas[i][key]
				tri.appendChild(tdi)
				
			}
			icon = document.createElement('td')
			icon.innerHTML = '<span class="editIcon"></span>'
			tri.appendChild(icon)

		}
		this.tbody.addEventListener('mouseover', function(e){me.onOverRow(e)})
	},

	paging: function(){
		var me = this,
			wrapper = document.querySelector('.wrapper'),
			pages = document.createElement('div'),
			length = 5
		pages.className = 'pageSelect'
		wrapper.appendChild(pages)

		for (var i = 0; i < length; i++) {
			var pg = document.createElement('span')
			pg.innerHTML = i+1
			pages.appendChild(pg)
		}

		pages.addEventListener('click', function(e){me.onClickPage(e)})
	},

	titlePosition: function() {
		var me = this,
			elem = me.thead, 
			headStart = elem.getBoundingClientRect().top,
			headHeight = elem.offsetHeight

		me.saveColsWidth()

		window.onscroll = function(e) {
			e.preventDefault()

			var box = elem.getBoundingClientRect(),
				scrollTop = window.pageYOffset || document.documentElement.scrollTop,
				firstRow = me.tbody.getElementsByTagName('tr')[0].getElementsByTagName('td')

			if (scrollTop > box.top+headHeight) {
				elem.style.position = 'fixed'
				elem.style.top = 0
				me.setColsWidth(me.tdTitle)
				me.setColsWidth(firstRow)
			} else {
				elem.style.position = 'relative'
			}
		}
	},

	saveColsWidth: function() {
		this.tdTitle = this.thead.getElementsByTagName('tr')[0].getElementsByTagName('td')
		this.widths = []

		for (var i = 0, length = this.tdTitle.length; i < length; i++) {
			this.widths.push(this.tdTitle[i].offsetWidth)
		}
	},

	setColsWidth: function(elem) {
		var attrWidth
		for (var i = 0, length = elem.length; i < length; i++) {
			attrWidth = 'width: ' + (this.widths[i] - 16) + 'px' // last amount is taken from (padding + border-width) of TD element
			elem[i].setAttribute('style', attrWidth);
		}

	},

	onFocus: function(el) {
		var me = this
		this.inputVal = el.value
		el.value = ''
		el.addEventListener('blur', function(){ me.onBlur() } )
	}, 

	onBlur: function(){
		var me = this
		me.input.value = me.inputVal
	},

	handlerSelect: function(e){
		if (e.target == this.input) {
			this.onKeyPressed(e, this.input.value)
		}
		if (e.altKey == true && e.keyCode == 91) {
			console.log('alt pressed')
		}
	},

	onKeyPressed: function(e, val){
		var me = this,
			adress
		if(e.keyCode == 13){
			adress = me.modifyURLinput(val)
			history.pushState({}, '', adress)
		}
		return false
	}, 

	selectChange: function(val) {
		adress = this.modifyURLselect(val)
		history.pushState({}, '', adress)
	},

	onClickTitle: function(e){
		e.preventDefault()
		if(e.target.innerHTML == 'Название'){
			adress = this.modifyURLtitle()
			history.pushState({}, '', adress)
		}
	},

	onClickPage: function(e){
		adress = this.modifyURLpage(e.target.innerHTML)
		history.pushState({}, '', adress)
	},

	onOverRow: function(e) {
		var me = this,
			parent = e.target.parentNode,
			elem = parent.getElementsByTagName('span')[0]

		elem.className += ' visible'
		parent.addEventListener('mouseout', function(){ me.onLeaveRow(elem) })
		elem.addEventListener('click', function(e){ me.onEdit(e) })
	},

	onLeaveRow: function(elem){
		elem.className = 'editIcon'
	},

	onEdit: function(e){
		e.preventDefault
		alert('Save')
	},

	modifyURLinput: function(val){
		var params = window.location.search.toString(1),
			pos, pos2
		pos = params.indexOf('keys')
		if(params.indexOf('keys') < 0 ){
			pos = params.indexOf('filter')
			return params = params.substring(0, pos+7)+'keys='+val+','+params.substring(pos+7)
		}
		pos2 = params.indexOf(',&type')
		return params = params.substring(0, pos+5)+val+params.substring(pos2)
	},

	modifyURLselect: function(val) {
		var params = window.location.search.toString(1),
			val = this.setType(val),
			pos

		if (params == '') {
			params = '?sort=&type='+val
		} else {
			if (params.indexOf('type') < 0) {
				params = params+'&type='+val
			} else {
				pos = params.indexOf('type')
				params = params.substring(0, pos+5)+val
			}
		}
		return params
	},

	setType: function(val) {
		var sel
		switch(val) {
			case 'all':
				sel = '*'
				break
			case 'banks':
				sel = '1'
				break
			case 'shops':
				sel = '2'
				break
			case 'bear':
				sel = '3'
				break
			case 'orgtech':
				sel = '4'
				break
		}
		return sel
	},

	modifyURLtitle: function() {
		var params = window.location.search.toString(1),
			pos1 = params.indexOf('name'), 
			pos2,
			me = this

		if (params == '') { 
			params = '?sort=name=asc'
		}
		else {
			if (params.indexOf('&') == -1) {
				pos2 = params.length

				var val = params.substring(pos1+5, pos2)
				val = me.changeDirect(val)
				params = params.substring(0, pos1+5)+val
			} else {
				pos2 = params.indexOf('&', pos1)
				if(pos1 == -1) {
					pos1 = params.indexOf('sort')
					params = params.substring(0, pos1+5)+'name=asc'+params.substring(pos2)
				} else {
					var val = params.substring(pos1+5, pos2)
					console.log('val: ', val)
					val = me.changeDirect(val)
					console.log('val: ', val)

					params = params.substring(0, pos1+5)+val+params.substring(pos2)
				}

			}

		}

		return params
	},

	changeDirect: function(val){
		if(val == 'desc'){
			val = 'asc'
		} else {
			val = 'desc'
		}
		return val
	},

	modifyURLpage: function(val){
		var params = window.location.search.toString(1),
			pos1, pos2


		

		console.log('params(before): ', params)
		if (params == '') { 
			params = '?sort=&page='+val
		} else {
			if (params.indexOf('&type') == -1) {
				if (params.indexOf('&page') == -1) {
					params = params+'&page='+val
				} else {
					params = params.substring(0, (params.length-1))+val
				}
			} else {
				pos2 = params.indexOf('&type')
				console.log('pos2: ', pos2)

				if (params.indexOf('&page') == -1) {
					params = params.substring(0, pos2-1)+'&page='+val+params.substring(pos2)
				} else {
					pos1 = params.indexOf('page')
					params = params.substring(0, pos1+5)+val+params.substring(pos2)
				}
			}
		}

		console.log('params(after): ', params)

		return params
	}
	
}

window.onload = function() {

	var dataTable = DataTable
	dataTable.init()

}

