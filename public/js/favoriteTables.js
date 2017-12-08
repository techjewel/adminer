// ==UserScript==
// @name Adminer - favorites tables
// @author Ladislav "knedle" Sevcuj
// @namespace https://openuserjs.org/scripts/knedle/Adminer_-_favorites_tables
// @updateURL https://openuserjs.org/meta/knedle/Adminer_-_favorites_tables.meta.js
// @version 1.3
// @description Table on left list can be starred. Starred tabs are pinned up. + filter tables list.
// @copyright 2014, @3knedle
// @require http://code.jquery.com/jquery-latest.js
// @include *
// ==/UserScript==

$(document).ready(function(){

    // star ico
    var $starIco = $('<i class="fa fa-star ajax add" style="margin-right: 5px; cursor: pointer;" title="pin up">');
    $starIco.text('[*]');

    // delete ico
    var $deleteIco = $('<i class="fa fa-times ajax remove" style="margin-right: 5px; cursor: pointer;" title="remove pin up">');
    $deleteIco.text('[x]');

    // check adminer
    if ($('#h1').length && $('#h1').text() == 'Adminer' &&
        ( $('#h1').attr('href') == 'http://www.adminer.org/'  || $('#h1').attr('href') == 'https://www.adminer.org/' ) ) {
        // check list of tables
        if ($('#tables').length) {
            // create area for stared-tables
            var $staredTables = $('<p id="stared-tables" />');

            // create area for search box
            var $searchBox = $('<p id="search-box" />');

            // add new areas
            $('#tables').before($staredTables);
            $('#tables').before($searchBox);

            $('br', $('#tables')).each(function() {
                $tagAtoStructure = $(this).prev();
                $tagAtoStructure.before($starIco.clone().attr('data-id', $tagAtoStructure.text()));
            });


            var staredTables = [];

            if (localStorage.staredTables) {
                staredTables = JSON.parse(localStorage.staredTables);
            }

            if (staredTables.length > 0) {
                // console.log(staredTables.length);
                $div = $('<div>');
                var existujiTab;
                for (i = 0; i < staredTables.length; ++i) {
                    $tagAtoselect = $('[href$="='+staredTables[i]+'"]', $('#tables'));
                    $divTmp = $div.clone();
                    $divTmp.attr('id','table-'+ staredTables[i]);
                    $i = 0;
                    $tagAtoselect.each(function () {
                        $divTmp.append($(this).clone());
                        $divTmp.append(' ');
                        if ($i === 0) {
                            $divTmp.append($deleteIco.clone().attr('data-id', staredTables[i]));
                        }
                        $i = $i + 1;
                    });
                    $staredTables.append($divTmp);
                }
            }
            
            
            // search box content
            $searchBox.append($('<input type="text" id="search-input" style="width:150px" />'));
            $searchBox.append($('<input type="button" id="filter-button" value="Filter" />'));
            $searchBox.append($('<input type="button" id="all-button" value="All" />'));
        }

        $('.ajax.add').click(function(){

            $tagAtoStructure = $(this).next();

            if ($('#table-'+ $tagAtoStructure.text(), $staredTables).length) {

            } else {

                if ($('#'+'table-'+ $tagAtoStructure.text(), $staredTables).length === 0) {

                    $div = $('<div>');

                    $tagAtoselect = $(this).prev();

                    $divTmp = $div.clone();
                    $divTmp.attr('id','table-'+ $tagAtoStructure.text());
                    $divTmp.append($tagAtoselect.clone());
                    $divTmp.append(' ');
                    $divTmp.append($deleteIco.clone().attr('data-id', $tagAtoStructure.text()));
                    $divTmp.append($tagAtoStructure.clone());
                    

                    $staredTables.append($divTmp);

                    staredTables[(staredTables.length)] = $tagAtoStructure.text();
                    // console.log(staredTables);
                    localStorage.staredTables = JSON.stringify(staredTables);

                    // console.log(localStorage.staredTables);
                }

            }

        });

        $('body').on('click', '.ajax.remove', function() {

            var newStaredTables = [];
            var i;
            for (i = 0; i < staredTables.length; ++i) {
                // do something with `substr[i]`
                if (staredTables[i] == $(this).attr('data-id')) {
                    // console.log('preskakuji index '+i)
                } else {
                    newStaredTables[newStaredTables.length] = staredTables[i];
                }
            }

            $(this).closest('div').remove();

            staredTables = newStaredTables;

            localStorage.staredTables = JSON.stringify(staredTables);
        });
        
        $('body').on('keypress', '#search-input',  function (e) {
            if(e.which === 13){
                $('#filter-button').click();
            }
        });        

        $('body').on('click', '#filter-button', function() {
            $searchInputVal = $('#search-input').val();
            $aTags = $('a.select', $("#tables"));
            $aTags.each(function() {
                Href = $(this).attr('href');
                IndexOfSelect = Href.indexOf("select=");                
                IndexOfSelectPlus = IndexOfSelect + 6;
                if (Href.indexOf($searchInputVal, IndexOfSelectPlus) >= 0) {
                    $(this).show(); // select
                    $(this).next().show(); // ico
                    $(this).next().next().show(); // structure
                    $(this).next().next().next().show(); // br
                } else {
                    $(this).hide(); // select
                    $(this).next().hide(); // ico
                    $(this).next().next().hide(); // structure
                    $(this).next().next().next().hide(); // br
                }
            });
        });

        $('body').on('click', '#all-button', function() {
            $aTags = $('a.select', $("#tables"));
            $aTags.each(function() {
                $(this).show(); // select
                $(this).next().show(); // ico
                $(this).next().next().show(); // structure
                $(this).next().next().next().show(); // br
            });
        });

    } // if adminer

}); // document.ready