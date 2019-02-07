      
      function searchAll() {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("myInput2");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable2");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else {
                tr[i].style.display = "none";
            }
        }
      }
  
      function searchSelectedColumn() {
        var filter, table, tr, td, i, txtValue, select, selectedIndex;
        filter = document.getElementById("myInput").value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        select = document.getElementById("Alma");
        selectedIndex = select.options[select.selectedIndex].value; // etc 1. this is an index
        console.log(selectedIndex);
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
  
  
      function getTableHeadings(tableId){
          var headings = [];
          var table = document.getElementById(tableId);
          tr = table.getElementsByTagName("tr");
          var heading = tr[0].getElementsByTagName("th");
          for(var i = 0; i < heading.length; i++){
              headings.push(heading[i].innerText);
          }
          return headings;
      }
  
      function createSearchInputField(){
          var inputDiv = document.getElementById("inputDiv");
          var input = document.createElement("input");
          input.type = "text";
          input.id = "myInput";
          input.setAttribute("onkeyup","searchSelectedColumn()");
          input.placeholder="I am a generated field...";
          input.title = "type in a name or something baby";
          inputDiv.appendChild(input);
      }
      
      function createAllSelectOption(index){
        var option = document.createElement("option");
        option.value = index;
        option.text = "All attribute";
        return option;
      }

      function createCustomSelect(headingsList){
          var i;
          var myDiv = document.getElementById("myDiv");
          var select = document.createElement("select");
          select.id = "Alma";
          for(i = 0; i< headingsList.length; i++){
              var option = document.createElement("option");
              option.value = i;
              option.text = headingsList[i];
              select.appendChild(option);
          }
          select.appendChild(createAllSelectOption(i+1));
          myDiv.appendChild(select);
      }
      createCustomSelect(getTableHeadings("myTable"));
      createSearchInputField();