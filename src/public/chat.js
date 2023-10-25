const socketClient = io()

const chatForm = document.getElementById("chatForm")
const userName = document.getElementById("userName")
const message = document.getElementById("message")
const chat = document.getElementById("chat")

let userN = null

if(userN == null){
    Swal.fire({
        title: "Welcome",
        text: "Enter your user",
        input: "text",
        inputValidator: (value)=>{
            if(!value){
                return "Please enter an user"
            }
        },})
    .then(username=>{
        userN = username.value
        userName.innerText = userN
        socketClient.emit("newUser",userN)
    })
}


socketClient.on("chat", messages=>{
    const chatRender = messages.map(el=>{
        return `<p><strong>${el.user}:</strong>${el.message}</p>`
    }).join (" ")
    chat.innerHTML = chatRender
})

chatForm.onsubmit = (e) =>{
    e.preventDefault()
    const info = {
        user: userN,
        message: message.value
    }
    socketClient.emit("message", info)
    message.value = ""
}
