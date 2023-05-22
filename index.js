var url =
"http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const searchBar = document.getElementById("search-box");
searchBar.setAttribute("onkeyup", "search()");
searchBar.addEventListener("onkeyup", search());
 


function search() {
let filter = searchBar.value.toLowerCase();
// console.log(filter ,typeof filter)
let table = document.getElementById("table-data");
// console.log(table)
let tr = table.getElementsByTagName("tr");
// console.log(typeof tr, tr[0])
for (var i = 0; i < tr.length; i++) {
  let td = tr[i].getElementsByTagName("td")[1];
  // console.log(td.innerHTML)
  if (td) {
    let textValue = td.textContent || td.innerHTML;
    if (textValue.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
      tr[i].style.class = "data-row";
    } else {
      tr[i].style.display = "none";
      tr[i].style.class = "active";
      // console.log(tr[i])
    }
  }
}
}   
 

fetch(url)
.then(function (response) {
  return response.json();
})

.then(function (data) {
  // console.log(data)
  let infoContent = document.querySelector("#info-content");
  let tr = document.querySelectorAll("tr");
  tr.forEach((element) => {
    element.addEventListener("click", function () {
      tr.forEach((tr) => tr.classList.remove("active"));
      this.classList.add("active");
      infoContent.style.display = 'block'

      if(element.className.includes('active')){
          let dataName = element.childNodes[3].innerHTML;
          // console.log(dataName);
          data.forEach((val,index)=>{
            if(val.firstName == dataName){
              infoContent.innerHTML = `
              <div><b>User selected:</b> ${data[index].firstName} ${data[index].lastName}</div>
              <div>
                  <b>Description: </b>
                  <textarea cols="50" rows="5" readonly>
                      ${data[index].description}
                  </textarea>
              </div>
              <div><b>Address:</b> ${data[index].address.streetAddress}</div>
              <div><b>City:</b> ${data[index].address.city}</div>
              <div><b>State:</b> ${data[index].address.state}</div>
              <div><b>Zip:</b>${data[index].address.zip}</div>
              `
            }
          })
      } 
      
    }); 

    
  }); 

   
  let id = document.querySelectorAll('.column1');
  let firstName = document.querySelectorAll('.column2');
  let lastName = document.querySelectorAll('.column3');
  let email = document.querySelectorAll('.column4');
  let phone = document.querySelectorAll('.column5');


  for (let i = 1; i < id.length ; i++) {
    id[i].innerHTML = data[i].id
    firstName[i].innerHTML = data[i].firstName
    lastName[i].innerHTML = data[i].lastName
    email[i].innerHTML = data[i].email
    phone[i].innerHTML = data[i].phone
  };
});


 