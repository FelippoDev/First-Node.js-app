const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

//  Fetch === Retriving the data
async function load() { 
    const res = await fetch("http://127.0.0.1:9000/").then( (data) =>  data.json() )

    res.urls.map(({name, url}) => addElement({name, url}))
}

load()

// Creating the element
function addElement({ name, url }) {
    
    console.log(url)
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, name, url)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

// Removing the element
function removeElement(el, name, url) {
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()

        fetch(`http://127.0.0.1:9000/?name=${name}&url=${url}&del=1`)
    }
        
    
    
}

// Adding the validation of the element
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    fetch(`http://127.0.0.1:9000/?name=${name}&url=${url}`)

    input.value = ""
})