const newsItemUI = data => (
  `<div class="cards">
        <h3>${data.title}</h3> 
        <div>${data.url}</div>
    </div>`
);

export default newsItemUI;
