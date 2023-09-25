const taskId = document.querySelector('.task-edit-id');
const taskName = document.getElementById('eTask');
const taskCompleted = document.getElementById('checkBox');
const editForm = document.getElementById('editForm');
const editBtn = document.getElementById('eBtn');
const alertMsg = document.querySelector('.msg-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

let tempName;

const showTask = async()=>{
    try {
    const {data : task} = await axios.get(`/api/v1/tasks/${id}`);

    const {_id: taskID, name, completed} = task.data;
    
    taskId.textContent = taskID;
    taskName.value = name;
    tempName = name;
    if(completed){
        taskCompleted.checked = true;
    }
   } 
    catch (error) {
        console.log(error);
    }
}

showTask();

editForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    try {
        const tname = taskName.value;
        const tcompleted = taskCompleted.checked;

        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`, {
            name: tname,
            completed: tcompleted
        })

        const { _id: taskID, completed, name} = task.data;

        taskId.textContent = taskID;
        taskName.value = name;
        tempName = name;

        if(completed){
            taskCompleted.checked = true;
        }
        
        alertMsg.style.display = 'block';
        alertMsg.style.color = 'green';
        alertMsg.textContent = `Success, Task edited!`

    } catch (error) {
        console.log(error);
        taskName.value = tempName;
        alertMsg.style.display = 'block';
        alertMsg.style.color = 'red';
        alertMsg.textContent = error.response.data.msg;
    }

    setTimeout(() => {
        alertMsg.style.display = 'none';
    }, 3000);
})