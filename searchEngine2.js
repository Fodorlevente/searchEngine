class SearchEngine{

    constructor(_inputId,_tableId,_customSelecttId){  // myInput  myTable myCustomSelect
        this.tableId = _tableId;
        this.inputId = _inputId;
        this.customSelecttId = _customSelecttId;
    }

    searchAll() {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById(this.inputId);
        filter = input.value.toUpperCase();
        table = document.getElementById(this.tableId);
        tr = table.getElementsByTagName("tr");
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }if (found) {
                tr[i].style.display = "";
                found = false;
            } else {
                tr[i].style.display = "none";
            }
        }
      }
  
      searchSelectedColumn() {
        var filter, table, tr, td, i, txtValue, select, selectedIndex;
        filter = document.getElementById(this.inputId).value.toUpperCase();
        table = document.getElementById(this.tableId);
        tr = table.getElementsByTagName("tr");
        select = document.getElementById(this.customSelecttId);
        selectedIndex = select.options[select.selectedIndex].value;
        if((select.options[selectedIndex].innerText) == "All attribute"){
          this.searchAll();
        }else{
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[selectedIndex];
            if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }       
          }
        }
      }
  
      getTableHeadings(tableId){
          var headings = [];
          var table = document.getElementById(tableId);
          var tr = table.getElementsByTagName("tr");
          var heading = tr[0].getElementsByTagName("th");
          for(var i = 0; i < heading.length; i++){
              headings.push(heading[i].innerText);
          }
          return headings;
      }
  
      createSearchInputField(){
          var inputDiv = document.getElementById("inputDiv");
          var input = document.createElement("input");
          input.type = "text";
          input.id = "myInput";
          input.setAttribute("onkeyup","mySeachEngine.searchSelectedColumn()");
          input.placeholder="I am a generated field...";
          input.title = "type in a name or something baby";
          inputDiv.appendChild(input);
      }
      
      createAllSelectOption(index){
        var option = document.createElement("option");
        option.value = index;
        option.text = "All attribute";
        return option;
      }

      createCustomSelect(headingsList){
          var i;
          var myDiv = document.getElementById("myDiv");
          var select = document.createElement("select");
          select.id = this.customSelecttId;
          for(i = 0; i< headingsList.length; i++){
              var option = document.createElement("option");
              option.value = i;
              option.text = headingsList[i];
              select.appendChild(option);
          }
          select.appendChild(this.createAllSelectOption(i));
          myDiv.appendChild(select);
      }
}

let mySeachEngine = new SearchEngine("myInput","myTable","myCustomSelect");
mySeachEngine.createCustomSelect(mySeachEngine.getTableHeadings(mySeachEngine.tableId));
mySeachEngine.createSearchInputField();