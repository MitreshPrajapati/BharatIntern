
const getArticelById = async () => {
    const article = JSON.parse(localStorage.getItem('article')) || {};
    
    if (article._id) {
        const response = await fetch(`http://localhost:7979/article/${article._id}`)
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    
}
getArticelById();