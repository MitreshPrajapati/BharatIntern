// const Form = document.getElementById('articleForm');

// Form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const markdown = document.getElementById('markdown').value;
//     const article = { title, description, markdown };

//     try {
//         console.log(article);
//         await fetch('http://localhost:7979/newarticle', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(article)
//         }).then(res => res.json()).then(res => { console.log(res) })

//     } catch (error) {
//         console.log(error);
//     }
// })
const Form = document.getElementById('articleForm');

Form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const markdown = document.getElementById('markdown').value;
    const article = { title, description, markdown };

    const formData = new FormData(this);
    const u = {}
    formData.forEach((val, key)=>{
        u[key]= val;
    })
    console.log(u)
    try {
        console.log(article);
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(u)
        }
        const response = await fetch('http://localhost:7979/article/new', options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
});
