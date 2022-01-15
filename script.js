let addbtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let main = document.querySelector(".main-cont");
let addFlag = false;
let txtarea = document.querySelector(".textarea-cont");
let colors = ["red","yellow","green","blue"];
let modalPriorityColor = colors[colors.length-1];
let allPriorityColor = document.querySelectorAll(".priority-color");
let rm  = document.querySelector(".remove-btn");
let selectedTicketColor = undefined;
let selectedColor = document.querySelectorAll(".color");

//load 1st task to ftech old data
let allTaskData = localStorage.getItem("allTask");

    if(allTaskData != null)
    {
        let data = JSON.parse(allTaskData);
        for(let i=0;i<data.length;i++)
        {
            createTicket(data[i].color,data[i].task,data[i].id);
        }
    }
     let active=1;
//for select color
for(let i=0;i<selectedColor.length;i++)
 {
     
    selectedColor[i].addEventListener("click",function(e)
     {  
         if(e.currentTarget.classList.contains("active"))
         {
             e.currentTarget.classList.remove("active");
             location.reload();

         }
         else{
             e.currentTarget.classList.add("active");
              
             if(active ==1){
             let cont = document.querySelectorAll(".ticket-cont");
             for(let j =0;j<cont.length;j++)
             {
                 if(selectedColor[i].classList[0] != cont[j].childNodes[0].classList[1])
                 {
                     cont[j].remove();
                 }
             }
             active++;
            }
            else{
                
                location.reload();
            }

         }

        });
}
addbtn.addEventListener("click",(e)=>{
    // display modal
    // Generate ticket
    // add flag modal display
    // addFlag  modal none
    addFlag= !addFlag;
    if(addFlag)
    {
        modal.style.display = "flex";
        txtarea.focus();
    }
    else{
        modal.style.display="none";
    }
    
});
allPriorityColor.forEach((colorEle,idx)=>{
    colorEle.addEventListener("click",(e)=>{
        allPriorityColor.forEach((priorityColorEle,idx)=>{
            priorityColorEle.classList.remove("border");
        })
        colorEle.classList.add("border");
        modalPriorityColor = colorEle.classList[0];
    });
});
modal.addEventListener("keydown",(e)=>{ 
    let key = e.key;
    let val = txtarea.value;
    if(key==="Escape")
    {
        modal.style.display="none";
    }
    else if(key === "Enter" && e.shiftKey===false && val.trim() !="" ){
         createTicket(modalPriorityColor,val,shortid());
        modal.style.display = "none";
        addFlag = false;
        txtarea.value= "";
       }
       else if(key ==="Enter" && e.shiftKey === false)
       {
           e.preventDefault();
           alert("Please Enter a valid key");
       }
       
       
});
function createTicket(ticColor,ticTask,ticID) {
    
    let ticGen = document.createElement("div");
    ticGen.setAttribute("class","ticket-cont");
    ticGen.innerHTML=`<div class="ticket-color ${ticColor}"></div><div class="ticket-id" style="color:${ticColor}">#${ticID}</div><div class="task-area">${ticTask}</div>`;
    main.appendChild(ticGen); 
    
    
    if(allTaskData == null)
    {
        let allTaskData = localStorage.getItem("allTask");

        let data = [{"id":ticID,"task":ticTask,"color":ticColor}];
        localStorage.setItem("allTask",JSON.stringify(data));
    }
    
    else{
        let allTaskData = localStorage.getItem("allTask");
        let data = JSON.parse(allTaskData);
            if(isHere(allTaskData,ticID) ==false){
                data.push({"id":ticID,"task":ticTask,"color":ticColor});
            }
        localStorage.setItem("allTask",JSON.stringify(data));
        }

    ticGen.addEventListener("click",function(e){
        if(e.currentTarget.classList.contains("active"))
        {
            e.currentTarget.classList.remove("active");
        }
        else{
            e.currentTarget.classList.add("active");
        }
    });
   
    
}
function isHere(arr,val)
{ 
    arr = JSON.parse(arr);
     
    for(let i =0;i<arr.length;i++)
    {
        if(arr[i].id == val)
        {
            return true;
        }
    }
    
    return false;
}

//remove ticket 
rm.addEventListener("click",function(e){
        let selectActive = document.querySelectorAll(".ticket-cont.active");
    let ids = document.querySelectorAll(".active>.ticket-id");
    let data = JSON.parse(allTaskData);

    for(let i =0;i<ids.length;i++)
    {
        let str = ids[i].childNodes[0].data.split("#")[1];
        
               data = data.filter((item)=>item.id !=str);   
    }
        localStorage.removeItem("allTask");
        localStorage.setItem("allTask",JSON.stringify(data));

    for(let i=0;i<selectActive.length;i++){
        selectActive[i].remove();
    }
     
});

//----------------------------------------------------- moving div textarea
 dragElement(modal);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(".move")) {
    
    document.getElementById(".move").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
     
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
