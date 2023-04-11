fetch('data.json')
  .then(response => response.json())
  .then(data => {
    let html = '';
    for (const article of data.articles) {
      html += `
        <article class="item">
          <div class="cover">
            <a href="${article.url}" itemprop="url" title="${article.title}">
              <img src="${article.img}">
            </a>
          </div>
          <div class="info">
            <div class="meta">
              <span class="item" title="Created: ${article.date}">
                <span class="icon">
                  <i class="ic i-calendar"></i>
                </span>
                <time itemprop="dateCreated datePublished" datetime="${article.date}">${article.date}</time>
              </span>
            </div>
            <h3><a href="${article.url}" itemprop="url" title="${article.title}">${article.title}</a></h3>
            <div class="excerpt">${article.excerpt}</div>
            <div class="meta footer">
              <span>
                <a href="/categories/${article.category}/" itemprop="url" title="${article.category}">
                  <i class="ic i-flag"></i>${article.category}
                </a>
              </span>
            </div>
            <a href="${article.url}" itemprop="url" title="${article.title}" class="btn">more...</a>
          </div>
        </article>
      `;
    }
    document.getElementById('articles').innerHTML = html;
  })
  .catch(error => console.error(error));