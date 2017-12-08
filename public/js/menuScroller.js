$(document).ready(function() { 
	
	var menuTablesQuery = $('#menu').find('#tables');

	menuTablesQuery.scroll(function (e) {
		localStorage.setItem('_menuTablesScrollPosition', $(this).scrollTop());
	})

	var scrollPosition = localStorage.getItem('_menuTablesScrollPosition');

	if (scrollPosition) {
		menuTablesQuery.scrollTop(scrollPosition);
	}
});