(function ($$1) {
'use strict';

$$1 = 'default' in $$1 ? $$1['default'] : $$1;

//create an object of FilterMenu
var FilterMenu = function () {
    //constructor of FilterMenu
    function FilterMenu(target, th, column, index, options) {
        this.options = options;
        this.th = th;
        this.column = column;
        this.index = index;
        this.tds = target.find('tbody tr td:nth-child(' + (this.column + 1) + ')').toArray();
    }

    //Initialize the search dropdown
    FilterMenu.prototype.initialize = function () {
        this.menu = this.dropdownFilterDropdown();
        this.th.appendChild(this.menu);
        var $trigger = $(this.menu.children[0]);
        var $content = $(this.menu.children[1]);
        var $menu = $(this.menu);
        //the action of looking at the menu content
        $trigger.click(function () {
            return $content.toggle();
        });
        //click the area out of the menu
        $(document).click(function (el) {
            if (!$menu.is(el.target) && $menu.has(el.target).length === 0) {
                $content.hide();
            }
        });
    };

    //??this function should be called whenever the search input is changed??
    FilterMenu.prototype.searchToggle = function (value) {
        if (this.selectAllCheckbox instanceof HTMLInputElement) this.selectAllCheckbox.checked = false;
        if (value.length === 0) {
            //tick all checkboxes when no value input in the search part
            this.toggleAll(true);
            //tick the selectallcheckbox then 
            if (this.selectAllCheckbox instanceof HTMLInputElement) this.selectAllCheckbox.checked = true;
            return;
        }
        //first get all checkboxes into false
        this.toggleAll(false);
        //check those boxes which contain the search input
        this.inputs.filter(function (input) {
            return input.value.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }).forEach(function (input) {
            input.checked = true;
        });
    };

    //update the selectAllCheckbox
    FilterMenu.prototype.updateSelectAll = function () {
            if (this.selectAllCheckbox instanceof HTMLInputElement) {
            //??why clear the searchFilter first?? --initialize the filterCollection
            $(this.searchFilter).val('');
            this.selectAllCheckbox.checked = this.inputs.length === this.inputs.filter(function (input) {
                return input.checked;
            }).length;
        }
    };

    //update all checkbox
    FilterMenu.prototype.selectAllUpdate = function (checked) {
        $(this.searchFilter).val('');
        this.toggleAll(checked);
    };

    //get all checkboxes into the checked value
    FilterMenu.prototype.toggleAll = function (checked) {
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            if (input instanceof HTMLInputElement) input.checked = checked;
        }
    };

    //create an item in the dropdown filter
    FilterMenu.prototype.dropdownFilterItem = function (td, self) {
        var value = td.innerText;
        //create a section for filter item
        var dropdownFilterItem = document.createElement('div');
        dropdownFilterItem.className = 'dropdown-filter-item';
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.value = value.trim().replace(/ +(?= )/g, '');
        input.setAttribute('checked', 'checked');
        input.className = 'dropdown-filter-menu-item item';
        input.setAttribute('data-column', self.column.toString());
        input.setAttribute('data-index', self.index.toString());
        dropdownFilterItem.appendChild(input);
        dropdownFilterItem.innerHTML = dropdownFilterItem.innerHTML.trim() + ' ' + value;
        return dropdownFilterItem;
    };

    //create the selectall item in the dropdown filter
    FilterMenu.prototype.dropdownFilterItemSelectAll = function () {
        var value = this.options.captions.select_all; //??what is it??
        var dropdownFilterItemSelectAll = document.createElement('div');
        dropdownFilterItemSelectAll.className = 'dropdown-filter-item';
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.value = this.options.captions.select_all; // ==value
        input.setAttribute('checked', 'checked');
        input.className = 'dropdown-filter-menu-item select-all';
        input.setAttribute('data-column', this.column.toString());
        input.setAttribute('data-index', this.index.toString());
        dropdownFilterItemSelectAll.appendChild(input);
        dropdownFilterItemSelectAll.innerHTML = dropdownFilterItemSelectAll.innerHTML + ' ' + value;
        return dropdownFilterItemSelectAll;
    };

    //create the textbox in the dropdown filter
    FilterMenu.prototype.dropdownFilterSearch = function () {
        var dropdownFilterItem = document.createElement('div');
        dropdownFilterItem.className = 'dropdown-filter-search';
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'dropdown-filter-menu-search form-control';
        input.setAttribute('data-column', this.column.toString());
        input.setAttribute('data-index', this.index.toString());
        input.setAttribute('placeholder', this.options.captions.search);
        dropdownFilterItem.appendChild(input);
        return dropdownFilterItem;
    };

    FilterMenu.prototype.dropdownFilterSort = function (direction) {
        var dropdownFilterItem = document.createElement('div');
        dropdownFilterItem.className = 'dropdown-filter-sort';
        var span = document.createElement('span');
        span.className = direction.toLowerCase().split(' ').join('-');
        span.setAttribute('data-column', this.column.toString());
        span.setAttribute('data-index', this.index.toString());
        span.innerText = direction;
        dropdownFilterItem.appendChild(span);
        return dropdownFilterItem;
    };
    FilterMenu.prototype.dropdownFilterContent = function () {
        var _this = this;
        var self = this;
        var dropdownFilterContent = document.createElement('div');
        dropdownFilterContent.className = 'dropdown-filter-content';
        //create a section for each td
        var innerDivs = this.tds.reduce(function (arr, el) {
            var values = arr.map(function (el) {
                return el.innerText.trim();
            });

            /*  ORIGINAL HERE
            if (values.indexOf(el.innerText.trim()) < 0) arr.push(el);
            return arr;
            */

            /* split authors here */
            var cells = el.innerHTML.split('/');
            
            for (var i = 0; i < cells.length; i++) {
                var tdCell = document.createElement("td");
                var tdCellText = document.createTextNode(cells[i]);
                tdCell.appendChild(tdCellText);
                if (values.indexOf(cells[i].trim()) < 0) arr.push(tdCell);
            }
            return arr;

        }, []).sort(function (a, b) { //filteritems are sorted from low to high
            var A = a.innerText.toLowerCase();
            var B = b.innerText.toLowerCase();
            if (!isNaN(Number(A)) && !isNaN(Number(B))) {
                if (Number(A) < Number(B)) return -1;
                if (Number(A) > Number(B)) return 1;
            } else {
                if (A < B) return -1;
                if (A > B) return 1;
            }
            return 0;
        }).map(function (td) {
            return _this.dropdownFilterItem(td, self); 
        });
        //create inputs array
        this.inputs = innerDivs.map(function (div) {
            return div.firstElementChild;
        });
        var selectAllCheckboxDiv = this.dropdownFilterItemSelectAll();
        this.selectAllCheckbox = selectAllCheckboxDiv.firstElementChild;
        innerDivs.unshift(selectAllCheckboxDiv); //innerDivs contains selectAll

        //var searchFilterDiv = this.dropdownFilterSearch();
        //this.searchFilter = searchFilterDiv.firstElementChild;

        //create a section for all the divs in innerDivs(tds and selectAll)
        var outerDiv = innerDivs.reduce(function (outerDiv, innerDiv) {
            outerDiv.appendChild(innerDiv);
            return outerDiv;
        }, document.createElement('div'));
        outerDiv.className = 'checkbox-container';

        //return an array for all the things 
        var elements = [];
        //if (this.options.sort) elements = elements.concat([this.dropdownFilterSort(this.options.captions.a_to_z), this.dropdownFilterSort(this.options.captions.z_to_a)]);
        //if (this.options.search) elements.push(searchFilterDiv);
        return elements.concat(outerDiv).reduce(function (html, el) {
            html.appendChild(el);
            return html;
        }, dropdownFilterContent);
    };
    FilterMenu.prototype.dropdownFilterDropdown = function () {
        //create a block here
        var dropdownFilterDropdown = document.createElement('div');
        dropdownFilterDropdown.className = 'dropdown-filter-dropdown';
        var arrow = document.createElement('span');
        var b = document.createElement('span');
        b.innerText = "--- Select ---";
        //arrow.className = 'glyphicon glyphicon-arrow-down dropdown-filter-icon';
        arrow.className = 'dropdown-filter-icon';
        var icon = document.createElement('i');
        icon.className = 'arrow-down';
        arrow.appendChild(b);
        arrow.appendChild(icon);
        dropdownFilterDropdown.appendChild(arrow);
        dropdownFilterDropdown.appendChild(this.dropdownFilterContent());
        
        /*if ($(this.th).hasClass('no-sort')) {
            $(dropdownFilterDropdown).find('.dropdown-filter-sort').remove();
        }
        if ($(this.th).hasClass('no-search')) {
            $(dropdownFilterDropdown).find('.dropdown-filter-search').remove();
        }*/
        if ($(this.th).hasClass('no-filter')) {
            $(dropdownFilterDropdown).find('.checkbox-container').remove();
        }
        
        return dropdownFilterDropdown;
    };
    return FilterMenu;
}();

var FilterCollection = function () {
    function FilterCollection(target, options) {
        this.target = target;
        this.options = options;
        this.ths = target.find('th' + options.columnSelector).toArray(); //??columnSelector??

        //Get rid of repeating filters    
        this.ths = jQuery.unique(this.ths.concat($(".filter").get()));      

        //create a property for filterMenus of each th
        this.filterMenus = this.ths.map(function (th, index) {
            var column = $(th).index();
            return new FilterMenu(target, th, column, index, options);
        });
        //create a property for every row
        this.rows = target.find('tbody').find('tr').toArray();
        this.table = target.get(0);
    }
    //initialize the filter collection
    FilterCollection.prototype.initialize = function () {
        this.filterMenus.forEach(function (filterMenu) {
            filterMenu.initialize();
        });
        this.bindCheckboxes();
        this.bindSelectAllCheckboxes();
        //this.bindSort();
        //this.bindSearch();
    };
    FilterCollection.prototype.bindCheckboxes = function () {
        var filterMenus = this.filterMenus;
        var rows = this.rows;
        var ths = this.ths;
        var updateRowVisibility = this.updateRowVisibility;
        this.target.find('.dropdown-filter-menu-item.item').change(function () {
            var index = $(this).data('index');
            var value = $(this).val();
            filterMenus[index].updateSelectAll();
            updateRowVisibility(filterMenus, rows, ths);
        });
    };
    FilterCollection.prototype.bindSelectAllCheckboxes = function () {
        var filterMenus = this.filterMenus;
        var rows = this.rows;
        var ths = this.ths;
        var updateRowVisibility = this.updateRowVisibility;
        this.target.find('.dropdown-filter-menu-item.select-all').change(function () {
            var index = $(this).data('index');
            var value = this.checked;
            filterMenus[index].selectAllUpdate(value);
            updateRowVisibility(filterMenus, rows, ths);
        });
    };
    /*
    FilterCollection.prototype.bindSort = function () {
        var filterMenus = this.filterMenus;
        var rows = this.rows;
        var ths = this.ths;
        var sort = this.sort;
        var table = this.table;
        var options = this.options;
        var updateRowVisibility = this.updateRowVisibility;
        this.target.find('.dropdown-filter-sort').click(function () {
            var $sortElement = $(this).find('span');
            var column = $sortElement.data('column');
            var order = $sortElement.attr('class');
            sort(column, order, table, options);
            updateRowVisibility(filterMenus, rows, ths);
        });
    };
    FilterCollection.prototype.bindSearch = function () {
        var filterMenus = this.filterMenus;
        var rows = this.rows;
        var ths = this.ths;
        var updateRowVisibility = this.updateRowVisibility;
        this.target.find('.dropdown-filter-search').keyup(function () {
            var $input = $(this).find('input');
            var index = $input.data('index');
            var value = $input.val();
            filterMenus[index].searchToggle(value);
            updateRowVisibility(filterMenus, rows, ths);
        });
    };
    */
    FilterCollection.prototype.updateRowVisibility = function (filterMenus, rows, ths) {
        var showRows = rows;
        var hideRows = [];
        var selectedLists = filterMenus.map(function (filterMenu) {
            return {
                column: filterMenu.column,
                //the text which are checked
                selected: filterMenu.inputs.filter(function (input) {
                    return input.checked;
                }).map(function (input) {
                    return input.value.trim().replace(/ +(?= )/g, '');
                })
            };
        });
        
        //filter each row
        for (var i = 0; i < rows.length; i++) {
            var tds = rows[i].children;
            for (var j = 0; j < selectedLists.length; j++) {             
                /* ORIGINAL HERE
                var content = tds[selectedLists[j].column].innerText.trim(); //.replace(/ +(?= )/g, '');
                if (selectedLists[j].selected.indexOf(content) === -1) {
                    if(i>0)
                       $(rows[i]).hide();
                    break;
                }
                $(rows[i]).show();
                */

                var content = tds[selectedLists[j].column].innerText.trim().split('/');
                //Single choice
                if (content.length === 1) {
                    if (selectedLists[j].selected.indexOf(content[0]) === -1) {
                        if(i>=0)
                           $(rows[i]).hide();
                        break;
                    }
                    $(rows[i]).show();
                }
                //Multiple choices
                else{
                    var hid = 0; // current row hide or not
                    //traverse every element in the array, judge if it exists in the selected lists
                    for (var k = 0; k < content.length; k++) {
                        if (selectedLists[j].selected.indexOf(content[k]) != -1) {
                            //window.alert(content[k] + ' is in ' + selectedLists[j].selected);
                            $(rows[i]).show();
                            break;
                        }
                        //window.alert(content[k] + ' is not in ' + selectedLists[j].selected);
                        $(rows[i]).hide();
                        hid = 1;
                    }
                    if (hid === 1) break;
                }
            }
        }
    };
    
    /*FilterCollection.prototype.sort = function (column, order, table, options) {
        var flip = 1;
        if (order === options.captions.z_to_a.toLowerCase().split(' ').join('-')) flip = -1;
        var tbody = $(table).find('tbody').get(0);
        var rows = $(tbody).find('tr').get();
        rows.sort(function (a, b) {
            var A = a.children[column].innerText.toUpperCase();
            var B = b.children[column].innerText.toUpperCase();
            if (!isNaN(Number(A)) && !isNaN(Number(B))) {
                if (Number(A) < Number(B)) return -1 * flip;
                if (Number(A) > Number(B)) return 1 * flip;
            } else {
                if (A < B) return -1 * flip;
                if (A > B) return 1 * flip;
            }
            return 0;
        });
        for (var i = 0; i < rows.length; i++) {
            tbody.appendChild(rows[i]);
        }
    };*/
    return FilterCollection;
}();

$$1.fn.excelTableFilter = function (options) {
    var target = this;    
    options = $$1.extend({}, $$1.fn.excelTableFilter.options, options);
    if (typeof options.columnSelector === 'undefined') options.columnSelector = '';
    //if (typeof options.sort === 'undefined') options.sort = true;
    //if (typeof options.search === 'undefined') options.search = true;
    if (typeof options.captions === 'undefined') options.captions = {
        //a_to_z: 'A to Z',
        //z_to_a: 'Z to A',
        //search: 'Search',
        select_all: 'Select All'
    };
    
    var filterCollection = new FilterCollection(target, options);
    filterCollection.initialize();
    return target;
};

$$1.fn.excelTableFilter.options = {};

}(jQuery));
//# sourceMappingURL=excel-bootstrap-table-filter-bundle.js.map
