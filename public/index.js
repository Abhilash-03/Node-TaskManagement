const form = document.getElementById('formBox');
const inputVal = document.getElementById('input');
const btn = document.getElementById('btn');
const ul = document.querySelector('ul');
let errMsg = document.getElementById('err-msg');

let TASK_URL = 'api/v1/tasks'

form.addEventListener('submit', async(e)=>{
  e.preventDefault();
  let name = inputVal.value;
  await fetch(TASK_URL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "name" : name
    })
  });
  
  if(name.length > 40){
     errMsg.style.display = 'block';
     errMsg.style.color = 'red';
     errMsg.innerText = 'Name cannot be more than 40 characters.'
  }
  inputVal.value = '';
  
  setTimeout(() => {
    errMsg.style.display = 'none';
  }, 3000);
 showTasks();
})

const showTasks = async()=>{
    let response = await fetch(TASK_URL);
    let json = await response.json();
    const tasks = json.data;
    let list = '';
    tasks.map(item => {
        const {name, _id: id, completed} = item
        list += `
          <li class="single-task ${completed && 'task-complete'}"><span class="title"> ${name}</span> <span style="display: flex"> <button class="editBtn">Edit</button> <button class="delBtn" data-id=${id} >Del</button></span></li>
        `
    });


    ul.innerHTML = list;
}

ul.addEventListener('click', async(e)=>{
    let el = e.target;
    if(el.classList.contains('delBtn')){
        try {
            let id = el.dataset.id;
            await fetch(`${TASK_URL}/${id}`, {
                method : 'DELETE',
                headers : {
                    "Content-Type" : "application/json"
                }
            })

         showTasks();

        } catch (error) {
            console.error(error);
        }
      
    }
    else{
        console.log("something went wrong");
    }
})


showTasks();