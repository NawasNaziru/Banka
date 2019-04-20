let cancelButtons = document.getElementsByClassName('cancel_buttons');
Array.from(cancelButtons).forEach(cancelButton=>{
  cancelButton.addEventListener('click', ()=>{
    document.getElementById('modal_2').style.display='none';
    document.getElementById('modal_1').style.display='none';
    document.getElementById('modal_3').style.display='none';
    document.getElementById('modal_4').style.display='none';
  });
});

document.getElementById("button_1").addEventListener('click', ()=>{
  document.getElementById('modal_1').style.display='block';
  document.getElementById('modal_2').style.display='none';
  document.getElementById('modal_3').style.display='none';
});

document.getElementById("button_2").addEventListener('click', ()=>{
  document.getElementById('modal_1').style.display='none';
  document.getElementById('modal_2').style.display='block';
  document.getElementById('modal_3').style.display='none';
});

document.getElementById("button_3").addEventListener('click', ()=>{
  document.getElementById('modal_1').style.display='none';
  document.getElementById('modal_2').style.display='none';
  document.getElementById('modal_3').style.display='block';
});


document.getElementById('activate_button').addEventListener('click', (e)=>{
  e.preventDefault();
  if(document.getElementById('activate_deactivate_button').value==="Nawas Naziru Adam ZinelAbideen"){
    document.getElementById('modal_message').innerHTML="Successful";
    document.getElementById('modal_2').style.display='none';
  }
  document.getElementById('modal_message').innerHTML="Wrong entered name!";
})
