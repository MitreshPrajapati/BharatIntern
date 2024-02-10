const articleSection = document.getElementById('articles');

async function displayArticles() {
    const response = await fetch('http://localhost:7979/article')
    const resJson = await response.json();
    const articles = resJson.data;
    console.log(articles)
    if (articles.length > 0) {
        articles.forEach((article, inx) => {
            const title = document.createElement('h2');
            title.textContent = article.title;
            const description = document.createElement('p');
            description.textContent = article.description;
            const markdown = document.createElement('small');
            markdown.textContent = " "+article.markdown;
            const createdAt = document.createElement('small');
            createdAt.textContent = article.createdAt.slice(0,10);
            const readMore = document.createElement('button');
            readMore.classList = ["btn", "read-more"];
            readMore.addEventListener("click", ()=>{
                showArticle(article);
            })
            readMore.innerHTML = 'Read More';

            const articleCard = document.createElement('div');
            articleCard.classList = "article-card";
            articleCard.append(title, createdAt,markdown,readMore );
            articleSection.append(articleCard);
        })
    }

    ;
}
displayArticles();

function showArticle(article){
    localStorage.setItem('article',JSON.stringify(article));
    window.location.href="./showArticle.html";
}