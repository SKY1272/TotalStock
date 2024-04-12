document.addEventListener('DOMContentLoaded', function() {
  let details=[]
  let totalSelling = 0; // Initialize total selling

  function handleSubmit(event){
    event.preventDefault()
    let selling=document.getElementById('sellInput').value; // Changed to sellInput
    let product=document.getElementById('productInput').value; // Changed to productInput
  
    let newData={selling,product}
    details.push(newData);
    totalSelling += parseFloat(selling); // Update total selling
    document.getElementById('sellInput').value='';
    document.getElementById('productInput').value='';
    AddData();
    displayTotalSelling(); // Update total selling in UI
  }
  
  function AddData(){
      let detail=document.getElementById('productDetails'); // Changed to productDetails
      detail.innerHTML='';
      details.forEach((item,index)=>{
        let newDiv=document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML=`
          <p>${item.selling} ${item.product}</p>
          <button onclick='deleteEntry(${index})'>Delete</button>`;
        detail.appendChild(newDiv);
      });
  }

  function deleteEntry(index) {
      totalSelling -= parseFloat(details[index].selling); // Update total selling
      details.splice(index, 1);
      AddData(); // Update UI after deletion
      displayTotalSelling(); // Update total selling in UI
  }

  function displayTotalSelling() {
    document.getElementById('totalSelling').textContent = 'Total Selling: ' + totalSelling.toFixed(2); // Display total selling
  }
});